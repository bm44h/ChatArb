// src/app/chat/page.tsx
'use client'; // هذه الصفحة تحتوي على مكونات عميل

import ChatWidget from '@/app/components/chat/ChatWidget';

export default function ChatTestPage() {
  // --- [مهم جدًا] ---
  // استبدل هذا بالـ projectId الحقيقي الذي تريد اختبار الـ Widget عليه
  // يجب أن يكون هذا المشروع موجودًا في Supabase ولديه بيانات في ChromaDB
  const TEST_PROJECT_ID = "6228b0c6-ae94-4a6d-a22d-cdfd7e6b02f7"; 

  return (
    <div className="w-full h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">مختبر الشات بوت</h1>
        <p className="mt-2 text-gray-600">
          هذه الصفحة مخصصة لاختبار وتطوير واجهة الدردشة (Widget).
        </p>
        <p className="mt-1 text-sm text-gray-500">
          الـ Widget في الزاوية السفلية يستخدم معرف المشروع: 
          <span className="font-mono bg-gray-200 px-2 py-1 rounded-md text-xs mx-1">
            {TEST_PROJECT_ID}
          </span>
        </p>

        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">محتوى الصفحة الوهمي</h2>
          <p className="mt-4 text-gray-700">
            هذا مجرد نص عشوائي لملء الصفحة ومحاكاة موقع حقيقي. يمكنك التفاعل مع أيقونة الدردشة في الزاوية السفلية اليمنى لبدء الاختبار.
          </p>
        </div>
      </div>

      {/* === هنا يتم استدعاء الـ Widget === */}
      <ChatWidget 
        projectId={TEST_PROJECT_ID}
        // يمكنك تخصيص هذه الخصائص لاحقًا من إعدادات المشروع
        
      />
    </div>
  );
}
