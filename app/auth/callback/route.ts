// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // استيراد نوع الطلب

// يجب أن تكون الدالة async
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // نقوم بإنشاء الكوكيز أولاً
    const cookieStore = cookies(); 
    // ثم نمررها لإنشاء عميل Supabase
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // توجيه المستخدم إلى لوحة التحكم بعد تسجيل الدخول الناجح
  return NextResponse.redirect(requestUrl.origin + '/dashboard');
}