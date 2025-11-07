// src/app/dashboard/new-project/actions.ts
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { randomBytes } from 'crypto';

// [تم التعديل] الدالة الآن تستقبل project_name بدلاً من storeName
export async function createFreeProject({ projectName }: { projectName: string; }) {
  const supabase = createServerActionClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { throw new Error('غير مصرح به: يجب تسجيل الدخول.'); }

  // [منطق إضافي] التأكد من أن المستخدم ليس لديه مشاريع بالفعل لمنع استغلال الخطة المجانية
  const { data: existingProjects, error: countError } = await supabase
    .from('projects')
    .select('id', { count: 'exact' })
    .eq('user_id', user.id);

  if (countError) { throw new Error('فشل في التحقق من المشاريع الحالية'); }
  if (existingProjects && existingProjects.length > 0) {
    throw new Error('لقد حصلت بالفعل على مشروعك المجاني');
  }

  // 1. إنشاء مفتاح API
  const apiKey = `sk_${randomBytes(24).toString('hex')}`;

  // 2. إنشاء المشروع
  const { data: newProject, error: projectError } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      project_name: projectName, // <-- استخدام الحقل الصحيح
      bot_name: 'المساعد الذكي', // <-- اسم افتراضي
      api_key: apiKey,
    })
    .select()
    .single();

  if (projectError) { throw new Error(`فشل في إنشاء المشروع: ${projectError.message}`); }
  if (!newProject) { throw new Error("لم يتم إرجاع بيانات المشروع الجديد"); }

  // 3. [جديد] إنشاء الاشتراك المجاني المرتبط بالمشروع
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .insert({
      project_id: newProject.id,
      plan_id: 'plan_free',
      status: 'active',
    });

  if (subscriptionError) {
    // (مهم) إذا فشل إنشاء الاشتراك، يجب حذف المشروع الذي تم إنشاؤه للتو
    await supabase.from('projects').delete().eq('id', newProject.id);
    throw new Error(`فشل في ربط الخطة المجانية: ${subscriptionError.message}`);
  }

  // 4. تحديث الكاش وإعادة البيانات
  revalidatePath('/dashboard');
  return newProject;
}
