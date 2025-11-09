// src/app/api/knowledge/route.ts - الإصدار النهائي باستخدام Supabase

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // 1. التحقق من جلسة المستخدم
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ message: 'غير مصرح به' }, { status: 401 });
    }
    const userId = session.user.id;

    // 2. الحصول على معرف المشروع من الرابط
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    if (!projectId) {
      return NextResponse.json({ message: 'معرف المشروع مطلوب' }, { status: 400 });
    }

    // 3. التحقق من أن المستخدم يملك هذا المشروع
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ message: 'الوصول مرفوض أو المشروع غير موجود' }, { status: 403 });
    }

    // ✅ [الحل] 4. جلب البيانات مباشرة من جدول 'documents' في Supabase
    const { data: documents, error: documentsError } = await supabase
      .from('documents')
      .select('content, metadata')
      .eq('metadata->>projectId', projectId); // <-- فلترة حسب معرف المشروع

    if (documentsError) {
      console.error("Error fetching knowledge from Supabase:", documentsError);
      throw documentsError;
    }

    // 5. إعادة هيكلة البيانات لتناسب الشكل الذي تتوقعه الواجهة الأمامية
    const knowledge = {
      documents: documents.map(doc => doc.content),
      metadatas: documents.map(doc => doc.metadata),
    };

    // 6. إرجاع البيانات
    return NextResponse.json({ knowledge }, { status: 200 });

  } catch (error) {
    console.error('API GET /knowledge error:', error);
    return NextResponse.json({ message: 'حدث خطأ داخلي في الخادم' }, { status: 500 });
  }
}
