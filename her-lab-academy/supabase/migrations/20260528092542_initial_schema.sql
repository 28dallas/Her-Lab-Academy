-- Users table (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  email text,
  role text check (role in ('admin', 'teacher', 'student')),
  avatar_url text,
  phone text,
  created_at timestamptz default now()
);

-- Courses
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  cover_image_url text,
  cover_emoji text, -- fallback emoji icon per course if no image uploaded
  teacher_id uuid references profiles(id),
  duration_weeks int,
  is_published boolean default false,
  enrollment_code text unique,
  created_at timestamptz default now()
);

-- Course Modules / Outline
create table course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  description text,
  order_index int,
  is_collapsed boolean default false,
  created_at timestamptz default now()
);

-- Resources (files, videos, links, inline text)
create table resources (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references course_modules(id) on delete cascade,
  title text not null,
  type text check (type in ('pdf', 'video', 'doc', 'link', 'image', 'text')),
  url text, -- nullable: not required for 'text' type resources
  text_content text, -- nullable: only used when type = 'text'
  file_size text,
  order_index int,
  created_at timestamptz default now()
);

-- Student Enrollments
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  course_id uuid references courses(id),
  enrolled_at timestamptz default now(),
  completed boolean default false,
  completed_at timestamptz,
  progress_percent int default 0
);
-- PERFORMANCE: Add indexes after table creation:
create index idx_enrollments_student_id on enrollments(student_id);
create index idx_enrollments_course_id on enrollments(course_id);

-- Progress Tracking (which resources a student has viewed)
create table student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  resource_id uuid references resources(id),
  viewed_at timestamptz default now()
);
-- PERFORMANCE: Add indexes after table creation:
create index idx_student_progress_student_id on student_progress(student_id);
create index idx_student_progress_resource_id on student_progress(resource_id);

-- Discussion Forum
create table forum_posts (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id),
  author_id uuid references profiles(id),
  parent_id uuid references forum_posts(id), -- null = top-level post
  type text default 'post' check (type in ('post', 'announcement')),
  content text not null,
  is_answered boolean default false,
  created_at timestamptz default now()
);

-- Certificates
create table certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  course_id uuid references courses(id),
  issued_at timestamptz default now(),
  certificate_url text
);

-- Private Complaints (student → admin)
create table complaints (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  subject text not null,
  message text not null,
  status text default 'open' check (status in ('open', 'replied', 'closed')),
  created_at timestamptz default now()
);

-- Complaint Replies (admin → student)
create table complaint_replies (
  id uuid primary key default gen_random_uuid(),
  complaint_id uuid references complaints(id) on delete cascade,
  author_id uuid references profiles(id),
  message text not null,
  created_at timestamptz default now()
);

-- Lecturer Evaluations (student submits after course completion)
create table evaluations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  course_id uuid references courses(id),
  teacher_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  feedback text,
  submitted_at timestamptz default now()
);

-- Satisfaction Surveys (end-of-course, optional)
create table surveys (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id),
  student_id uuid references profiles(id),
  responses jsonb, -- flexible key-value for survey answers
  submitted_at timestamptz default now()
);

-- RLS POLICIES --

alter table student_progress enable row level security;
alter table resources enable row level security;
alter table complaints enable row level security;
alter table evaluations enable row level security;

-- Students see only their own progress
create policy "Students see own progress"
on student_progress for select
using (auth.uid() = student_id);

-- Students can insert their own progress rows (required for progress bar updates)
create policy "Students can insert own progress"
on student_progress for insert
with check (auth.uid() = student_id);

-- Teachers see progress for students in their courses
create policy "Teachers see course progress"
on student_progress for select
using (
  exists (
    select 1 from courses c
    join course_modules m on m.course_id = c.id
    join resources r on r.module_id = m.id
    where r.id = student_progress.resource_id
    and c.teacher_id = auth.uid()
  )
);

-- Only teachers can manage resources in their own courses
create policy "Teacher manages resources"
on resources for all
using (
  exists (
    select 1 from course_modules m
    join courses c on c.id = m.course_id
    where m.id = resources.module_id
    and c.teacher_id = auth.uid()
  )
);

-- Students can only see and submit their own complaints
create policy "Students manage own complaints"
on complaints for all
using (auth.uid() = student_id);

-- Students can only submit evaluations for courses they completed
create policy "Students submit own evaluations"
on evaluations for insert
with check (
  auth.uid() = student_id and
  exists (
    select 1 from enrollments
    where student_id = auth.uid()
    and course_id = evaluations.course_id
    and completed = true
  )
);
