// src/app/components/dashboard/tabs/SettingsSkeleton.tsx

// هذا المكون لا يحتاج إلى 'use client' لأنه مجرد واجهة عرض
export default function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      {/* الهيدر */}
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded-md w-48"></div>
      </div>

      {/* الحاوية الرئيسية */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-8">
        
        {/* قسم المظهر */}
        <div>
          <div className="h-6 bg-gray-200 rounded-md w-32 mb-6"></div>
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded-md w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded-md w-20 mb-2"></div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* فاصل */}
        <hr className="border-gray-200" />

        {/* قسم الإعدادات العامة */}
        <div>
          <div className="h-6 bg-gray-200 rounded-md w-28 mb-6"></div>
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded-md w-20 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded-md w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
        </div>
        
        {/* فاصل */}
        <hr className="border-gray-200" />

        {/* بطاقة المزامنة */}
        <div>
          <div className="h-6 bg-gray-200 rounded-md w-40 mb-4"></div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-64"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
