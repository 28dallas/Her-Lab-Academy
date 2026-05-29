'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message));
  }

  // Fetch the user's role from profiles
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single();

  revalidatePath('/', 'layout');

  // Redirect to the correct portal based on role
  const role = profile?.role;
  if (role === 'admin') redirect('/admin');
  if (role === 'teacher') redirect('/teacher');
  redirect('/dashboard');
}
