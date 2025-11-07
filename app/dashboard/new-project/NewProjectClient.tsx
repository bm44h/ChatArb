// src/app/dashboard/new-project/NewProjectClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PlanData } from "./page";
import { createFreeProject } from "./actions";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { initializePaddle, Paddle } from "@paddle/paddle-js"; // <-- [جديد] استيراد نوع الحدث

// ... (staticPlansFeatures and colorClasses remain the same)
const staticPlansFeatures = {
  plan_free: {
    features: [
      { text: "100 محادثة شهرياً" },
      { text: "نموذج 7 مليار معامل" },
      { text: "زاحف ذكي لـ 50 صفحة" },
      { text: "متابعة الطلبات" },
    ],
  },
  plan_basic: {
    features: [
      { text: "1,000 محادثة شهرياً" },
      { text: "نموذج 30 مليار معامل" },
      { text: "زاحف ذكي لـ 200 صفحة" },
      { text: "إزالة العلامة المائية" },
    ],
  },
  plan_pro: {
    features: [
      { text: "5,000 محادثة شهرياً" },
      { text: "نموذج 235 مليار معامل" },
      { text: "فهرسة غير محدودة" },
      { text: "جمع بيانات العملاء" },
    ],
  },
};

export default function NewProjectClient({
  plansData,
}: {
  plansData: PlanData[];
}) {
  const [projectName, setProjectName] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    plansData[0]?.id || ""
  );
  const [paddle, setPaddle] = useState<Paddle | undefined>();
  const supabase = createClientComponentClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (PADDLE_CLIENT_TOKEN) {
      initializePaddle({
        token: PADDLE_CLIENT_TOKEN,
        environment: "sandbox",
        // [جديد] إضافة قسم الأحداث
        eventCallback: function (event: any) {
          // التحقق من أن الحدث هو إكمال الدفع
          if (event.name === "checkout.completed") {
            // [تم التعديل] الحصول على نسخة من كائن paddle لإغلاق النافذة

            // 1. عرض رسالة النجاح
            toast.success(<b>تم إنشاء مشروعك بنجاح!</b>, {
              position: "top-center",
              style: { direction: "rtl", fontWeight: "bold" },
            });

            // 2. إعادة التوجيه إلى لوحة التحكم بعد فترة قصيرة
            setTimeout(() => {
              router.push("/dashboard");
              // تحديث الصفحة بالكامل لضمان جلب المشاريع الجديدة
              router.refresh();
            }, 1500); // الانتظار 1.5 ثانية قبل التوجيه
          }
        },
      }).then((paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      });
    }
  }, [router]); // <-- إضافة router إلى مصفوفة الاعتماديات

  const plans = useMemo(() => {
    return plansData.map((plan) => ({
      ...plan,
      ...staticPlansFeatures[plan.id as keyof typeof staticPlansFeatures],
    }));
  }, [plansData]);

  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId);
  }, [selectedPlanId, plans]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedPlan) {
      setError("الرجاء اختيار خطة صالحة.");
      setLoading(false);
      return;
    }

    if (selectedPlan.price === 0) {
      const promise = createFreeProject({ projectName });
      toast.promise(
        promise,
        { loading: "جاري الإنشاء", success: <b>تم الإنشاء بنجاح</b> },
        {
          position: "top-center",
          style: { direction: "rtl", fontWeight: "bold" },
        }
      );
      try {
        const newProject = await promise;
        if (newProject) router.push("/dashboard");
      } catch (err: any) {
        const message = err.message || "حدث خطأ غير متوقع";
        setError(message);
        toast.error(message, {
          position: "top-center",
          style: { direction: "rtl", fontWeight: "bold" },
        });
      }
      setLoading(false);
    } else {
      if (!paddle) {
        setError("نظام الدفع غير جاهز. يرجى المحاولة مرة أخرى.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !selectedPlan.paddle_price_id) {
        setError("المستخدم غير موجود أو معرف الخطة غير صالح.");
        setLoading(false);
        return;
      }

      paddle.Checkout.open({
        items: [{ priceId: selectedPlan.paddle_price_id, quantity: 1 }],
        customer: user.email ? { email: user.email } : undefined,
        customData: {
          user_id: user.id,
          project_name: projectName,
          plan_id: selectedPlan.id,
        },
      });

      // لا نعرف متى سيغلق المستخدم النافذة، لذا نوقف التحميل فورًا
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-4xl bg-white mx-auto  p-4 sm:p-8 border border-gray-200 rounded-lg"
        dir="rtl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            أنشئ بوتًا جديدًا
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            اختر الخطة التي تناسب احتياجاتك
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="bg-[#FCFCFC] p-6 rounded-lg border border-gray-200">
            <label
              htmlFor="project-name"
              className="block text-lg font-semibold text-gray-800 mb-2"
            >
              اسم المشروع
            </label>
            <input
              id="project-name"
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="مثلاً: مساعد متجري "
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          <div className="bg-[#FCFCFC] p-6 rounded-lg border border-gray-200">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              اختر نوع البوت
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                return (
                  <button
                    type="button"
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-6 text-right rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 ring-1 ring-blue-500 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <h3
                      className={`text-xl font-bold ${
                        isSelected ? "text-blue-600" : "text-gray-800"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      ${plan.price}{" "}
                      <span className="text-base font-normal text-gray-500">
                        / شهريًا
                      </span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      {plan.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${
                              isSelected ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            ✓
                          </span>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !projectName}
              className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading
                ? "جاري المعالجة..."
                : selectedPlan?.price === 0
                ? "أنشئ المشروع وابدأ"
                : `الترقية إلى ${selectedPlan?.name}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
