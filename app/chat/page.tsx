// src/app/chat/page.tsx - الإصدار الديناميكي الجديد

'use client';

import ChatWidget from '@/app/components/chat/ChatWidget';
import { useSearchParams } from 'next/navigation'; // 1. استيراد Hook جديد
import { Suspense } from 'react'; // 2. استيراد Suspense

// المكون الرئيسي الذي يحتوي على المنطق
function ChatPageContent() {
  // 3. استخدم الـ Hook لقراءة معلمات الرابط
  const searchParams = useSearchParams();
  
  // 4. اقرأ 'projectId' من الرابط، أو استخدم القيمة الافتراضية إذا لم يكن موجودًا
  const projectIdFromUrl = searchParams.get('projectId');
  const projectIdToUse = projectIdFromUrl || "6228b0c6-ae94-4a6d-a22d-cdfd7e6b02f7"; // قيمة افتراضية للاختبار

  return (
    <div className="w-full h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">مختبر الشات بوت</h1>
        <p className="mt-2 text-gray-600">
          هذه الصفحة مخصصة لاختبار وتطوير واجهة الدردشة (Widget).
        </p>
        
        {projectIdFromUrl ? (
          <p className="mt-1 text-sm text-green-700 bg-green-100 p-2 rounded-md">
            ✅ يتم الآن اختبار المشروع ذو المعرف: 
            <span className="font-mono bg-green-200 px-2 py-1 rounded-md text-xs mx-1">
              {projectIdToUse}
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-yellow-700 bg-yellow-100 p-2 rounded-md">
            ⚠️ لم يتم تحديد مشروع. يتم استخدام المشروع الافتراضي للاختبار: 
            <span className="font-mono bg-yellow-200 px-2 py-1 rounded-md text-xs mx-1">
              {projectIdToUse}
            </span>
          </p>
        )}

        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">محتوى الصفحة الوهمي</h2>
          <p className="mt-4 text-gray-700">
            تفاعل مع أيقونة الدردشة في الزاوية السفلية اليمنى لبدء الاختبار.
          </p>
        </div>

        <div className="mt-12 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">محتوى الصفحة الوهمي</h2>
          <p className="mt-4 text-gray-700">
            تفاعل مع أيقونة الدردشة في الزاوية السفلية اليمنى لبدء الاختبار.
          </p>
        </div>
        <div className="mt-12 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">محتوى الصفحة الوهمي</h2>
          <p className="mt-4 text-gray-700">
            تفاعل مع أيقونة الدردشة في الزاوية السفلية اليمنى لبدء الاختبار.
          </p>
        </div>
        <div className="mt-12 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">محتوى الصفحة الوهمي</h2>
          <p className="mt-4 text-gray-700">
            تفاعل مع أيقونة الدردشة في الزاوية السفلية اليمنى لبدء الاختبار.
          </p>
        </div>
      </div>

      {/* === هنا يتم استدعاء الـ Widget بالـ projectId الصحيح === */}
      <ChatWidget projectId={projectIdToUse} />
    </div>
  );
}

// 5. قم بتغليف المكون الرئيسي بـ <Suspense>
// هذا ضروري لأن useSearchParams تتطلب ذلك
export default function ChatTestPage() {
  return (
    <Suspense fallback={<div>جاري تحميل الصفحة...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
