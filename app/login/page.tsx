// src/app/login/page.tsx
"use client"; // هذا المكون يتفاعل مع المستخدم

import { useState } from "react";
import { supabase } from "@/app//lib/supabaseClient"; // استيراد عميل المتصفح
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"; // لاستخدامه في الروابط
import { GoogleIcon } from '@/public/icons/GoogleIcon';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // دالة تسجيل الدخول بالبريد الإلكتروني
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // إذا نجح تسجيل الدخول، سيتم تشغيل onAuthStateChange تلقائيًا
      // أو يمكننا التوجيه مباشرة
      router.push("/dashboard");
      router.refresh(); // تحديث حالة الخادم
    } catch (error: any) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      console.error("Error logging in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // دالة تسجيل الدخول بجوجل
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50" dir="rtl">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          تسجيل الدخول
        </h1>

        {/* نموذج البريد الإلكتروني */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </div>
        </form>

        {/* فاصل "أو" */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-500">أو</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* زر جوجل */}
        <button
        type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <GoogleIcon className="h-5 w-5" />
          <span>المتابعة بـ Google</span>
        </button>

        {/* رابط لإنشاء حساب جديد */}
        <div className="text-sm text-center text-gray-600">
          ليس لديك حساب؟{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            أنشئ حسابًا جديدًا
          </Link>
        </div>
      </div>
    </div>
  );
}
