// src/app/api/public-chat/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, messages } = body;

    if (!projectId || !messages) {
      return NextResponse.json({ error: 'projectId and messages are required' }, { status: 400 });
    }

    // 1. إنشاء عميل Supabase بدور الخدمة للوصول الآمن
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. جلب مفتاح API السري المرتبط بالمشروع
    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('api_key')
      .eq('id', projectId)
      .single();

    if (error || !project || !project.api_key) {
      return NextResponse.json({ error: 'Project not found or API key is missing' }, { status: 404 });
    }

    const apiKey = project.api_key;
    

    const internalChatUrl = new URL('/api/chat', request.url);

    const internalChatResponse = await fetch(internalChatUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // <-- تمرير المفتاح السري هنا
      },
      body: JSON.stringify({ messages }), // تمرير الرسائل فقط
    });

    // 4. التحقق من الرد وإعادته إلى الواجهة الأمامية
    if (!internalChatResponse.ok) {
      // إذا فشل الطلب الداخلي، أعد تمرير الخطأ
      const errorBody = await internalChatResponse.json();
      return NextResponse.json(errorBody, { status: internalChatResponse.status });
    }

    const responseBody = await internalChatResponse.json();
    return NextResponse.json(responseBody, { status: 200 });

  } catch (error: any) {
    console.error('Public Chat Proxy Error:', error);
    return NextResponse.json({ error: 'Internal proxy error', details: error.message }, { status: 500 });
  }
}
