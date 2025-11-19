// src/app/admin/page.tsx

"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AnalysisCard from "@/app/components/admin/AnalysisCard"; // استيراد المكون الجديد

// واجهة لتمثيل بيانات كل طلب تحليل
interface AnalysisRequest {
  id: string;
  hostname: string;
  status: string;
  product_name_selector: string | null;
  product_description_selector: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<AnalysisRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // التحقق من وجود الدور في بيانات المستخدم الوصفية
      if (user && user.user_metadata?.roles?.includes("admin")) {
        setIsAdmin(true);
      } else {
        // إذا لم يكن مسؤولاً، يمكنك إعادة توجيهه أو عرض رسالة خطأ
        window.location.href = "/"; // إعادة توجيه للصفحة الرئيسية
      }
    };
    checkAdmin();
  }, [supabase]);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      // جلب الطلبات التي تحتاج إلى تحليل يدوي
      const { data, error } = await supabase
        .from("store_structures")
        .select("*")
        .eq("status", "pending_analysis")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching analysis requests:", error);
        setError("فشل في جلب طلبات التحليل.");
      } else {
        setRequests(data as AnalysisRequest[]);
      }
      setIsLoading(false);
    };

    fetchRequests();
  }, [supabase]);

  // دالة لإزالة الطلب من القائمة بعد اكتماله
  const handleRequestCompletion = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  if (!isAdmin) {
    return <div className="p-8 text-center">...جاري التحقق من الصلاحيات</div>;
  }

  if (isLoading) {
    return <div className="p-8 text-center">جاري تحميل لوحة التحكم...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div dir="ltr" className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard - Analysis Requests
        </h1>

        {requests.length === 0 ? (
          <p className="text-gray-600">
            لا توجد طلبات تحليل معلقة حاليًا. عمل رائع!
          </p>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <AnalysisCard
                key={req.id}
                request={req}
                onComplete={handleRequestCompletion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
