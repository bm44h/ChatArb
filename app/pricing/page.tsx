"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import FaqItemDark from "@/app/components/FaqItemDark"; // <-- 1. تغيير الاستيراد

// ... (كود حساب الوقت المتبقي يبقى كما هو)
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +targetDate - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};


export default function PricingPage() {
  const [targetDate] = useState(new Date("2025-11-15T00:00:00"));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => { setTimeLeft(calculateTimeLeft(targetDate)); }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, isMounted]);

  const plans = [
    // ... (بيانات الخطط تبقى كما هي)
    {
      name: "مجاني",
      description: "للمتاجر الناشئة",
      price: "مجاناً",
      showPeriod: false,
      popular: false,
      features: [
        { text: "100 محادثة شهرياً", included: true },
        { text: "نموذج 7 مليار معامل", included: true },
        { text: "متابعة الطلبات", included: true },
        { text: "زاحف ذكي لـ 50 صفحة", included: true },
        { text: "لوحة تحكم أساسية", included: true },
        { text: "دعم عبر البريد الإلكتروني", included: true },
      ],
      buttonText: "ابدأ مجاناً",
      buttonVariant: "secondary",
    },
    {
      name: "الاساسية",
      description: "للمتاجر الصغيرة",
      price: "$15",
      showPeriod: true,
      popular: false,
      features: [
        { text: "1,000 محادثة شهرياً", included: true },
        { text: "نموذج 30 مليار معامل", included: true },
        { text: "متابعة الطلبات/تعديل", included: true },
        { text: "زاحف ذكي لـ 200 صفحة", included: true },
        { text: "تحليلات أساسية", included: true },
        { text: "دعم عبر الدردشه الحيه", included: true },
        { text: "إزالة العلامة المائية", included: true },
      ],
      buttonText: "ابدأ مجاناً",
      buttonVariant: "primary",
    },
    {
      name: "الاحترافية",
      description: "للمتاجر المتوسطة",
      price: "$30",
      showPeriod: true,
      popular: false,
      features: [
        { text: "5,000 محادثة شهرياً", included: true },
        { text: "نموذج 235 مليار معامل", included: true },
        { text: "متابعة الطلبات/تعديل", included: true },
        { text: "فهرسة غير محدودة", included: true },
        { text: "تحليلات متقدمة", included: true },
        { text: "إزالة العلامة المائية", included: true },
        { text: "جمع بيانات العملاء", included: true },
        { text: "دعم عبر الدردشه الحيه", included: true },
      ],
      buttonText: "ابدأ مجاناً",
      buttonVariant: "primary",
    },
    {
      name: "الشركات",
      description: "للمتاجر الكبيرة والشركات",
      price: "$199",
      showPeriod: true,
      popular: false,
      features: [
        { text: "15,000 محادثة شهرياً", included: true },
        { text: "نموذج 235 مليار معامل", included: true },
        { text: "3 بوتات شات متزامنة", included: true },
        { text: "API مخصص", included: true },
        { text: "زحف كامل للموقع", included: true },
        { text: "دعم فني 24/7", included: true },
      ],
      buttonText: "اشترك الآن",
      buttonVariant: "primary",
    },
  ];

  // --- 2. تم إنشاء قائمة الأسئلة والأجوبة الخاصة بالتسعير ---
  const pricingFaqData = [
    {
      question: "هل يمكنني ترقية أو تخفيض خطتي لاحقًا؟",
      answer: "نعم بالطبع. يمكنك تغيير خطتك في أي وقت من خلال لوحة التحكم الخاصة بك. سيتم احتساب الفروقات بشكل تلقائي في دورة الفوترة التالية.",
    },
    {
      question: "ماذا يحدث إذا تجاوزت حد المحادثات الشهري؟",
      answer: "عندما تقترب من الحد الأقصى للمحادثات في خطتك، سنقوم بإعلامك. إذا تجاوزت الحد، قد يتوقف البوت عن العمل حتى بداية الشهر التالي أو يمكنك الترقية إلى خطة أعلى للاستمرار في الخدمة دون انقطاع.",
    },
    {
      question: "هل التجربة المجانية تتطلب بطاقة ائتمانية؟",
      answer: "لا، يمكنك البدء بالخطة المجانية أو تجربة الخطط المدفوعة دون الحاجة إلى إدخال أي معلومات دفع. نطلب معلومات الدفع فقط عندما تقرر الاشتراك في خطة مدفوعة.",
    },
    {
      question: "ما هي سياسة استرداد الأموال؟",
      answer: "نحن نقدم ضمان استرداد الأموال لمدة 3 أيام للمشتركين الجدد في الخطط المدفوعة. إذا لم تكن راضيًا تمامًا عن الخدمة خلال هذه الفترة، يمكنك طلب استرداد كامل المبلغ.",
    },
    {
      question: "هل هناك عقود طويلة الأمد؟",
      answer: "لا توجد أي عقود ملزمة. جميع خططنا تعمل بنظام الاشتراك الشهري أو السنوي، ويمكنك إلغاء اشتراكك في أي وقت تشاء.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a1f] text-gray-200 relative">
      <Header />

      {/* ... (الأقسام الأخرى تبقى كما هي) ... */}
      <div className="absolute inset-0 min-h-screen opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* قسم البطل */}
      <section className="relative bg-gradient-to-b from-blue-900/20 via-[#0a0a1f]/80 to-[#0a0a1f]/90 pt-40 pb-20 overflow-hidden z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            جرب مجاناً، واختر الخطة التي تناسبك لاحقاً
          </h1>
        </div>
      </section>

      {/* عرض العد التنازلي */}
      <section className="py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-block bg-[rgba(255,255,255,0.2)] backdrop-blur-sm px-6 py-2 rounded-full mb-4">
                  <span className="text-white text-sm font-medium">
                    🎉 عرض محدود
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  تجربة مجانية لمدة شهر كامل
                </h2>
                <p className="text-blue-100 text-lg">
                  ابدأ الآن واستمتع بجميع المميزات مجاناً
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 md:gap-6">
                <div className="text-center">
                  <div className="bg-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg border border-white border-opacity-30">
                    <div className="font-sans text-3xl md:text-5xl font-bold text-white mb-1 tabular-nums">
                      {String(timeLeft.days || 0).padStart(2, "0")}
                    </div>
                    <div className="text-blue-100 text-xs md:text-sm font-medium">
                      يوم
                    </div>
                  </div>
                </div>

                <div className="text-white text-3xl md:text-4xl font-bold">
                  :
                </div>

                <div className="text-center">
                  <div className="bg-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg border border-white border-opacity-30">
                    <div className="font-sans text-3xl md:text-5xl font-bold text-white mb-1 tabular-nums">
                      {String(timeLeft.hours || 0).padStart(2, "0")}
                    </div>
                    <div className="text-blue-100 text-xs md:text-sm font-medium">
                      ساعة
                    </div>
                  </div>
                </div>

                <div className="text-white text-3xl md:text-4xl font-bold">
                  :
                </div>

                <div className="text-center">
                  <div className="bg-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg border border-white border-opacity-30">
                    <div className="font-sans text-3xl md:text-5xl font-bold text-white mb-1 tabular-nums">
                      {String(timeLeft.minutes || 0).padStart(2, "0")}
                    </div>
                    <div className="text-blue-100 text-xs md:text-sm font-medium">
                      دقيقة
                    </div>
                  </div>
                </div>

                <div className="text-white text-3xl md:text-4xl font-bold">
                  :
                </div>

                <div className="text-center">
                  <div className="bg-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg border border-white border-opacity-30">
                    <div className="font-sans text-3xl md:text-5xl font-bold text-white mb-1 tabular-nums">
                      {String(timeLeft.seconds || 0).padStart(2, "0")}
                    </div>
                    <div className="text-blue-100 text-xs md:text-sm font-medium">
                      ثانية
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-8 px-4 pb-20 relative z-10" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="bg-gradient-to-r from-sky-300/50 to-blue-500/90 backdrop-blur-md text-white text-center py-2 text-sm font-medium rounded-t-2xl mb-0 border border-white/20">
                    الأكثر شيوعاً
                  </div>
                )}
                <div
                  className={`backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl h-full flex flex-col ${
                    plan.popular
                      ? "border-2 border-blue-400/50 rounded-b-2xl border-t-0"
                      : "rounded-2xl"
                  }`}
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-center mb-2 text-white">
                      {plan.name}
                    </h3>
                    <p className="text-blue-300 text-sm text-center mb-4">
                      {plan.description}
                    </p>
                    <div className="border-t border-white/20 pt-4 mb-6"></div>
                    <div className="text-center mb-6">
                      <span className="text-4xl font-medium text-white">
                        {plan.price}
                      </span>
                      {plan.showPeriod && (
                        <span className="text-gray-200 text-sm mr-1">/شهر</span>
                      )}
                    </div>
                    <div className="border-t border-white/20 pt-4 mb-6"></div>
                    <ul className="space-y-4 mb-8 flex-grow min-h-[300px]">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 text-sm">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "text-gray-200" : "text-gray-500"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 rounded-[8px] font-medium transition ${
                        plan.buttonVariant === "primary"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white/10  text-white border-1 border-blue-600 hover:border-blue-700"
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. هذا هو القسم الجديد للأسئلة الشائعة --- */}
      <section className="py-20 px-4 relative z-10" dir="rtl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              أسئلة شائعة حول التسعير
            </h2>
            <p className="text-lg text-gray-300">
              إجابات سريعة لاستفساراتك حول خططنا واشتراكاتنا.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            {pricingFaqData.map((item, index) => (
              // لقد قمت بتعديل FaqItem ليتناسب مع التصميم الداكن
              <div key={index} className="border-b border-white/20 py-2 last:border-b-0">
                <FaqItemDark question={item.question} answer={item.answer} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- نهاية القسم الجديد --- */}

      {/* قسم الدعوة لاتخاذ إجراء */}
      <section className="relative bg-gradient-to-b from-[#0a0a1f]/90 via-blue-900/20 to-[#0a0a1f] py-20 overflow-hidden z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              لا تفوت الفرصة!
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              ابدأ تجربتك المجانية اليوم ولا حاجة لبطاقة ائتمانية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-10 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                ابدأ الآن مجاناً
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
