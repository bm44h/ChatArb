// src/app/dashboard/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

type Project = {
  id: string;
  project_name: string | null;
  created_at: string;
};

export const revalidate = 60; // إعادة التحقق كل 60 ثانية


export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { redirect('/login'); }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, project_name, created_at')
    .order('created_at', { ascending: false });

  if (error) { console.error('Error fetching projects:', error); }

  const isNewUserWithNoProjects = !projects || projects.length === 0;

  return (
    <div className="min-h-screen bg-[#FCFCFC]" dir='rtl'>
      <header className="bg-[#FCFCFC] border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">بوتاتي</h1>
          {/* [تم التعديل] نعرض دائمًا زر "بوت جديد" ولكن برابط مختلف للمستخدم الجديد */}
          {!isNewUserWithNoProjects && (
            // المستخدم الحالي يذهب إلى صفحة شراء البوتات (التي سنبنيها لاحقًا)
            <Link href="/dashboard/new-project?plan=paid">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <span>بوت جديد</span>
                <FaPlus />
              </button>
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isNewUserWithNoProjects ? (
          <div className="text-center bg-white p-12 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">أهلاً بك في ChatArb</h2>
            <p className="mt-4 text-gray-600">أنت على بعد خطوة واحدة من إطلاق مساعدك الذكي. ابدأ الآن واحصل على أول بوت لك مجانًا</p>
            {/* [تم التعديل] المستخدم الجديد يذهب إلى نفس الصفحة ولكن مع معلمة plan=free */}
            <Link href="/dashboard/new-project?plan=free">
               <button className="mt-6 flex items-center gap-2 mx-auto px-4 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <span>أنشئ أول بوت مجاني</span>
                <FaPlus />
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {projects?.map((project) => (
              <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
                <div className="bg-white p-6 rounded-lg cursor-pointer h-48 flex flex-col justify-between border border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.project_name || 'مشروع بدون اسم'}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-auto">تاريخ الإنشاء: {new Date(project.created_at).toLocaleDateString('ar-EG')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
