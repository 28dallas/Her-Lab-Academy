import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Clock, BookOpen, ChevronDown, CheckCircle2 } from "lucide-react";

export default function PublicCoursePage({ params }: { params: { id: string } }) {
  // Temporary mock data based on ID
  const courseId = params.id;

  const courseMap: Record<string, { title: string; category: string; icon: string; duration: string; color: string; teacher: string; description: string; modules: { id: string; title: string; resourceCount: number }[] }> = {
    '1': { title: 'Electrical Installation', category: 'Trades', icon: '⚡', duration: '10 weeks', color: 'bg-yellow-50 text-yellow-600', teacher: 'James O.', description: 'Learn domestic and commercial electrical installation, circuit wiring, load calculations, and safety standards. Practical, hands-on training aligned with Kenya Power standards.', modules: [{ id: 'm1', title: 'Electrical Safety & Tools', resourceCount: 4 }, { id: 'm2', title: 'Wiring & Circuit Basics', resourceCount: 5 }, { id: 'm3', title: 'Installation Practicals', resourceCount: 3 }] },
    '2': { title: 'Solar PV Installation', category: 'Trades', icon: '☀️', duration: '10 weeks', color: 'bg-orange-50 text-orange-500', teacher: 'Peter N.', description: 'Install and maintain solar photovoltaic systems for homes and small businesses. Covers panel mounting, battery systems, inverters, and off-grid design.', modules: [{ id: 'm1', title: 'Solar Energy Fundamentals', resourceCount: 3 }, { id: 'm2', title: 'Panel & Battery Systems', resourceCount: 4 }, { id: 'm3', title: 'Installation & Maintenance', resourceCount: 4 }] },
    '3': { title: 'Plumbing', category: 'Trades', icon: '🔧', duration: '10 weeks', color: 'bg-slate-50 text-slate-600', teacher: 'John D.', description: 'Master domestic plumbing installation, pipe fitting, water supply systems, and sanitation. Practical training for real-world plumbing jobs.', modules: [{ id: 'm1', title: 'Plumbing Tools & Safety', resourceCount: 3 }, { id: 'm2', title: 'Pipe Fitting & Joints', resourceCount: 5 }, { id: 'm3', title: 'Water Supply Systems', resourceCount: 4 }] },
    '4': { title: 'Cosmetology', category: 'Vocational', icon: '✂️', duration: '8 weeks', color: 'bg-pink-50 text-pink-600', teacher: 'Jane M.', description: 'Professional hair, skin, and beauty therapy training. Learn cutting, styling, braiding, skincare, and salon business management.', modules: [{ id: 'm1', title: 'Hair Care & Styling', resourceCount: 4 }, { id: 'm2', title: 'Skincare & Beauty Therapy', resourceCount: 3 }, { id: 'm3', title: 'Salon Business Skills', resourceCount: 3 }] },
    '5': { title: 'Fashion Design', category: 'Vocational', icon: '🧵', duration: '16 weeks', color: 'bg-purple-50 text-purple-600', teacher: 'Grace W.', description: 'Design and sew garments from scratch. Covers pattern making, fabric selection, hand and machine sewing, and building a small fashion business.', modules: [{ id: 'm1', title: 'Design Principles & Sketching', resourceCount: 3 }, { id: 'm2', title: 'Pattern Making & Cutting', resourceCount: 4 }, { id: 'm3', title: 'Sewing & Finishing', resourceCount: 5 }, { id: 'm4', title: 'Fashion Business', resourceCount: 2 }] },
    '6': { title: 'Regenerative Agriculture', category: 'Agriculture', icon: '🌍', duration: '12 weeks', color: 'bg-green-50 text-green-600', teacher: 'Sarah K.', description: 'Sustainable farming practices that restore soil health, increase yields, and protect the environment. Covers composting, agroforestry, and water harvesting.', modules: [{ id: 'm1', title: 'Soil Health & Composting', resourceCount: 4 }, { id: 'm2', title: 'Water Harvesting', resourceCount: 3 }, { id: 'm3', title: 'Agroforestry Practices', resourceCount: 4 }] },
    '7': { title: 'Core Agriculture', category: 'Agriculture', icon: '🌱', duration: '12 weeks', color: 'bg-lime-50 text-lime-600', teacher: 'Mary W.', description: 'Foundational crop and livestock farming skills. Covers planting, pest control, animal husbandry, and market-ready food production.', modules: [{ id: 'm1', title: 'Crop Production', resourceCount: 4 }, { id: 'm2', title: 'Pest & Disease Management', resourceCount: 3 }, { id: 'm3', title: 'Livestock Basics', resourceCount: 3 }] },
    '8': { title: 'Reproductive Health', category: 'Health', icon: '🩺', duration: '6 weeks', color: 'bg-red-50 text-red-500', teacher: 'Dr. Aisha M.', description: 'Essential reproductive health education covering family planning, maternal health, FGM awareness, and accessing healthcare services in rural Kenya.', modules: [{ id: 'm1', title: 'Reproductive Health Basics', resourceCount: 3 }, { id: 'm2', title: 'Maternal & Child Health', resourceCount: 4 }, { id: 'm3', title: 'Rights & Healthcare Access', resourceCount: 3 }] },
    '9': { title: 'ICT', category: 'Technology', icon: '💻', duration: '10 weeks', color: 'bg-blue-50 text-blue-600', teacher: 'Kevin O.', description: 'Intermediate computer skills including word processing, spreadsheets, internet use, email, and introduction to coding concepts.', modules: [{ id: 'm1', title: 'Computer Fundamentals', resourceCount: 3 }, { id: 'm2', title: 'Office Applications', resourceCount: 5 }, { id: 'm3', title: 'Internet & Email', resourceCount: 3 }, { id: 'm4', title: 'Intro to Coding', resourceCount: 3 }] },
    '10': { title: 'Basic Digital Literacy', category: 'Technology', icon: '📱', duration: '6 weeks', color: 'bg-cyan-50 text-cyan-600', teacher: 'Kevin O.', description: 'First steps into the digital world. Learn to use a smartphone, browse the internet safely, use WhatsApp, and access online services like M-Pesa.', modules: [{ id: 'm1', title: 'Using a Smartphone', resourceCount: 3 }, { id: 'm2', title: 'Internet Safety', resourceCount: 3 }, { id: 'm3', title: 'Digital Financial Services', resourceCount: 3 }] },
    '11': { title: 'Entrepreneurship', category: 'Business', icon: '💼', duration: '8 weeks', color: 'bg-amber-50 text-amber-600', teacher: 'Ruth N.', description: 'Start and grow a small business. Covers business planning, budgeting, marketing, record keeping, and accessing micro-finance in Kenya.', modules: [{ id: 'm1', title: 'Business Idea & Planning', resourceCount: 4 }, { id: 'm2', title: 'Finance & Budgeting', resourceCount: 3 }, { id: 'm3', title: 'Marketing & Sales', resourceCount: 3 }] },
    '12': { title: 'Beadwork', category: 'Vocational', icon: '📿', duration: '8 weeks', color: 'bg-rose-50 text-rose-500', teacher: 'Esther K.', description: 'Traditional and contemporary Pokot beadwork. Learn bead selection, pattern design, necklace and bracelet making, and selling your crafts at market.', modules: [{ id: 'm1', title: 'Bead Types & Tools', resourceCount: 3 }, { id: 'm2', title: 'Pattern Design', resourceCount: 4 }, { id: 'm3', title: 'Jewellery Making & Finishing', resourceCount: 3 }, { id: 'm4', title: 'Selling Your Craft', resourceCount: 2 }] },
  };

  const course = {
    ...(courseMap[courseId] ?? courseMap['1']),
    id: courseId,
    features: [
      'Practical, hands-on training',
      'Taught by experienced instructors',
      'Certificate of completion',
      'Access to Her Lab Academy network',
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Course Header */}
        <div className="bg-gray-50 border-b border-gray-200 pt-16 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              
              {/* Left Column (Info) */}
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                  {course.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text-dark)] mb-6">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                      {course.teacher.charAt(0)}
                    </div>
                    <span>Instructor: <span className="font-medium text-gray-900">{course.teacher}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Right Column (Card) */}
              <div className="w-full md:w-80 lg:w-96 flex-shrink-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative top-0 md:-mb-32">
                <div className={`h-48 flex items-center justify-center text-7xl ${course.color}`}>
                  {course.icon}
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Free</div>
                  <Link 
                    href="/register" 
                    className="block w-full py-3 px-4 bg-[var(--color-primary)] hover:bg-[#cf5626] text-white text-center font-medium rounded-lg transition-colors mb-4"
                  >
                    Enroll Now
                  </Link>
                  <p className="text-xs text-center text-gray-500 mb-6">Requires an enrollment code from your administrator.</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">This course includes:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Course Outline Preview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-8">Course Syllabus</h2>
            
            <div className="space-y-4">
              {course.modules.map((mod, idx) => (
                <div key={mod.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <div className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-[var(--color-primary)] flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 hidden sm:flex items-center gap-1">
                        <BookOpen className="w-4 h-4" /> {mod.resourceCount} resources
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-6 bg-orange-50 rounded-xl border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Ready to start learning?</h4>
                <p className="text-sm text-gray-600">Get your enrollment code from your local admin and register today.</p>
              </div>
              <Link href="/register" className="whitespace-nowrap px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
