// src/app/api/widget-settings/route.ts - الإصدار المصحح
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    

    if (!projectId) {
      return NextResponse.json({ error: 'معرف المشروع مطلوب' }, { status: 400 });
    }

    // --- [تم الإصلاح] ---
    // استخدام مفتاح الخدمة السري للوصول إلى البيانات من الخادم
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // <-- هذا هو المفتاح الصحيح
    );
    // --- [نهاية الإصلاح] ---

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('store_name, settings')
      .eq('id', projectId)
      .single();

    if (error || !project) {
      console.error("Widget settings fetch error:", error);
      return NextResponse.json({ error: 'المشروع غير موجود' }, { status: 404 });
    }

    const settings = project.settings || {};
    const responseData = {
      storeName: project.store_name || 'مساعد المتجر',
      welcomeMessage: settings.welcomeMessage || 'أهلاً بك! كيف يمكنني مساعدتك اليوم؟',
      chatColor: settings.chatColor || '#3b82f6',
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    console.error('API /widget-settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ داخلي في الخادم', details: error.message }, { status: 500 });
  }
}
