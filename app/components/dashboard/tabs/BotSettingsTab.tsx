// src/app/components/dashboard/tabs/BotSettingsTab.tsx - الإصدار المعاد بناؤه
"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Save, Check } from "lucide-react";
import SettingsSkeleton from "./SettingsSkeleton"; // <-- 1. استيراد المكون الجديد
import toast from "react-hot-toast";
import Link from 'next/link';
import { Eye } from 'lucide-react';


// تعريف الألوان المتاحة
const colorOptions = [
  { name: "أزرق", value: "#3b82f6" },
  { name: "أرجواني", value: "#8b5cf6" },
  { name: "أسود", value: "#1f2937" },
];

export default function BotSettingsTab({ projectId }: { projectId: string }) {
  // حالات لتخزين البيانات الحالية
  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [botName, setBotName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [chatColor, setChatColor] = useState(colorOptions[0].value);

  // حالة لتخزين البيانات الأصلية للمقارنة
  const [initialData, setInitialData] = useState({});

  // حالات واجهة المستخدم
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lastSync, setLastSync] = useState("لم تتم المزامنة بعد");
  const [hasChanges, setHasChanges] = useState(false);

  // جلب الإعدادات عند تحميل المكون
  useEffect(() => {
    if (!projectId) return;

    const fetchSettings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/settings?projectId=${projectId}`);
        if (!res.ok) throw new Error("فشل في جلب الإعدادات");

        const data = await res.json();

        const currentData = {
          storeName: data.store_name || "",
          botName: data.bot_name || "",
          storeUrl: data.store_url || "",
          welcomeMessage:
            data.settings?.welcomeMessage ||
            "أهلاً بك في متجرنا كيف يمكننا مساعدتك؟",
          chatColor: data.settings?.chatColor || colorOptions[0].value,
        };

        // تعيين الحالات
        setStoreName(currentData.storeName);
        setStoreUrl(currentData.storeUrl);
        setBotName(currentData.botName);
        setWelcomeMessage(currentData.welcomeMessage);
        setChatColor(currentData.chatColor);

        // حفظ البيانات الأصلية
        setInitialData(currentData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [projectId]);

  // التحقق من وجود تغييرات
  useEffect(() => {
    const currentData = {
      storeName,
      botName,
      storeUrl,
      welcomeMessage,
      chatColor,
    };
    setHasChanges(JSON.stringify(currentData) !== JSON.stringify(initialData));
  }, [storeName, botName, storeUrl, welcomeMessage, chatColor, initialData]);

  // حفظ جميع الإعدادات
  const handleSaveSettings = async () => {
    if (!hasChanges) return;

    const toastId = toast.loading("جاري الحفظ"); // <-- إظهار إشعار التحميل

    setIsSaving(true);
    setError(null);
    try {
      const payload = {
        projectId,
        store_name: storeName,
        bot_name: botName,
        store_url: storeUrl,
        settings: {
          welcomeMessage,
          chatColor,
        },
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      if (!res.ok)
        throw new Error(responseData.message || "فشل في حفظ الإعدادات");

      const updatedData = {
        storeName: responseData.project.store_name,
        botName: responseData.project.bot_name,
        storeUrl: responseData.project.store_url,
        welcomeMessage: responseData.project.settings.welcomeMessage,
        chatColor: responseData.project.settings.chatColor,
      };

      setInitialData(updatedData); // تحديث البيانات الأصلية

      toast.success("تم الحفظ", { id: toastId });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء الحفظ", { id: toastId }); // <-- إظهار إشعار الخطأ
    } finally {
      setIsSaving(false);
    }
  };
const handleSync = async () => {
  if (!storeUrl || storeUrl.trim() === "") {
    toast.error("ادخل رابط متجرك اولاً");
    return;
  }
  
  setIsSyncing(true);
  
  try {
    const crawlApiUrl = process.env.NEXT_PUBLIC_CRAWL_API_URL;
    if (!crawlApiUrl) throw new Error("لم يتم تكوين رابط خدمة الزحف.");

    // ✅ الآن نستخدم await مرة أخرى، لأننا نتوقع ردًا فوريًا
    const response = await fetch(crawlApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, url: storeUrl }),
    });

    // تحقق من أن الخادم قبل الطلب (200 OK أو 202 Accepted)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "فشل الخادم في قبول الطلب." }));
      throw new Error(errorData.message || "حدث خطأ في الخادم");
    }

    // نجاح! الخادم قبل الطلب.
    setLastSync(new Date().toLocaleString("ar-EG"));
    toast.success("تم قبول طلب المزامنة. ستتم معالجة البيانات في الخلفية.");

  } catch (err: any) {
    toast.error(err.message || "فشل إرسال طلب المزامنة");
  } finally {
    setIsSyncing(false);
  }
};


  if (isLoading) return <SettingsSkeleton />;
  if (error)
    return <div className="text-center p-10 text-red-500">خطأ: {error}</div>;

  return (
    <div className=" space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">الإعدادات</h1>
        {hasChanges && (
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isSaving ? "جاري الحفظ..." : "حفظ"}
          </button>
        )}
      </div>
      {/* الحاوية الرئيسية الجديدة لكل الإعدادات */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-8">
        {/* قسم المظهر */}
        <div>
          <h2 className="text-xl font-semibold mb-6">الواجهة</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                الرسالة الترحيبية
              </label>
              <input
                type="text"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-[#FCFCFC] focus:outline-none focus:ring-0 focus:ring-gray-600 focus:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-4">
                لون نافذة الدردشة
              </label>
              <div className="flex items-center gap-4">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setChatColor(option.value)}
                    className={`w-10 h-10 rounded-full transition-all duration-200 ${
                      chatColor === option.value
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: option.value }}
                    title={option.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* فاصل بين الأقسام */}
        <hr className="border-gray-200" />

        {/* قسم الإعدادات العامة */}
        <div>
          <h2 className="text-xl font-semibold mb-6">معلومات</h2>
          <div className="space-y-6">
            <p className="text-gray-700">
              يستخدم اسم المتجر في تخصيص تجربة المستخدم داخل نافذة الدردشة
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                اسم المتجر
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-[#FCFCFC] focus:outline-none focus:ring-0 focus:ring-gray-600 focus:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                اسم البوت
              </label>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-[#FCFCFC] focus:outline-none focus:ring-0 focus:ring-gray-600 focus:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* فاصل بين الأقسام */}
        <hr className="border-gray-200" />

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium">اختبار واجهة الدردشة</h3>
        {/* ... */}
        <div className="mt-4">
          {/* ✅ [تم التعديل هنا] */}
          <Link 
            href={`/chat?projectId=${projectId}`} // <-- الرابط الجديد
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
            >
              <Eye size={16} />
              <span>فتح صفحة اختبار الدردشة</span>
            </button>
          </Link>
        </div>
      </div>

        <hr className="border-gray-200" />

        {/* بطاقة المزامنة */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">الزاحف</h2>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-700">
              اضغط هنا للزحف وجمع المعلومات من متجرك
            </p>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
            >
              <RefreshCw
                className={`inline ml-2 h-4 w-4 ${
                  isSyncing ? "animate-spin" : ""
                }`}
              />
              {isSyncing ? "جاري الزحف..." : "زحف"}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              رابط المتجر
            </label>
            <input
              type="url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-[#FCFCFC] focus:outline-none focus:ring-0 focus:ring-gray-600 focus:border-gray-600"
            />
          </div>
        </div>
      </div>{" "}
      {/* نهاية الحاوية الرئيسية */}
    </div>
  );
}
