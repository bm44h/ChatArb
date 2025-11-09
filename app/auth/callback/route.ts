// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // هنا نستخدم URL من الطلب الأصلي لاستخراج الـ code
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // بعد تسجيل الدخول، توجه المستخدم إلى لوحة التحكم على الرابط النهائي
  const redirectUrl = process.env.NEXT_PUBLIC_APP_URL + '/dashboard';
  return NextResponse.redirect(redirectUrl);
}
