// src/app/api/settings/route.ts - الإصدار المصحح النهائي باستخدام المكتبة الصحيحة
import { NextResponse } from 'next/server';
// [تم الإصلاح] العودة إلى المكتبة الأصلية الصحيحة
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'; 
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// --- دالة GET: لجلب إعدادات المشروع ---
export async function GET(request: Request) {
  // [تم الإصلاح] النمط الصحيح لاستخدام createRouteHandlerClient
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ message: 'غير مصرح به' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    if (!projectId) return NextResponse.json({ message: 'معرف المشروع مطلوب' }, { status: 400 });

    const { data: project, error } = await supabase
      .from('projects')
      .select('store_name, bot_name, store_url, settings')
      .eq('id', projectId)
      .eq('user_id', session.user.id)
      .single();

    if (error || !project) return NextResponse.json({ message: 'المشروع غير موجود' }, { status: 404 });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'حدث خطأ داخلي في الخادم' }, { status: 500 });
  }
}

// --- دالة POST: باستخدام عميل الخدمة (Service Client) ---
export async function POST(request: Request) {
  // 1. التحقق من جلسة المستخدم أولاً
  // [تم الإصلاح] النمط الصحيح لاستخدام createRouteHandlerClient
  const supabaseUserClient = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabaseUserClient.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: 'غير مصرح به' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { projectId, store_name, bot_name, store_url, settings } = body;
    if (!projectId) return NextResponse.json({ message: 'معرف المشروع مطلوب' }, { status: 400 });

    // 2. إنشاء عميل Supabase بدور الخدمة (Service Role)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. التحقق من الملكية (خطوة أمان)
    const { error: ownerError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', session.user.id)
      .single();

    if (ownerError) {
      return NextResponse.json({ message: 'لا تملك الصلاحية لتحديث هذا المشروع' }, { status: 403 });
    }

    // 4. تنفيذ التحديث باستخدام عميل الخدمة
    const { data: updatedProject, error: updateError } = await supabaseAdmin
      .from('projects')
      .update({
        store_name,
        bot_name,
        store_url,
        settings,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select()
      .single();

    if (updateError) {
      // طباعة الخطأ الحقيقي من Supabase
      console.error("Supabase Update Error with admin client:", updateError);
      return NextResponse.json({ message: 'فشل في تحديث الإعدادات', details: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'تم تحديث الإعدادات بنجاح', project: updatedProject }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: 'حدث خطأ داخلي في الخادم' }, { status: 500 });
  }
}
