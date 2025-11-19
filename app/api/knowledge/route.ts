// src/app/api/knowledge/route.ts - الإصدار المحسن

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    if (!projectId) return new Response('Project ID is required', { status: 400 });

    // استخدم استدعاء دالة RPC للتحقق من الملكية وجلب البيانات في خطوة واحدة
    // هذا يتطلب إنشاء دالة RPC في Supabase، لكنه أكثر كفاءة.
    // كحل أبسط الآن، سنبقي على التحقق المنفصل.
    const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('id', projectId).eq('user_id', session.user.id);
    if (count !== 1) return new Response('Forbidden', { status: 403 });

    const { data: documents, error } = await supabase
      .from('documents')
      .select('content, metadata')
      .eq('project_id', projectId); // <-- تم التعديل لاستخدام project_id مباشرة

    if (error) throw error;

    return NextResponse.json({ documents }, { status: 200 });

  } catch (error: any) {
    console.error('API GET /knowledge error:', error);
    return new Response(error.message, { status: 500 });
  }
}
