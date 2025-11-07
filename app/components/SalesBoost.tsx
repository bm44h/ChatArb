"use client";

import React from "react";

// هذا المكون يعرض قسمًا جذابًا يبرز زيادة المبيعات بنسبة 30% مع تأثير بصري متحرك.

const SalesBoost: React.FC = () => {
  // اللون الجديد الذي طلبه المستخدم
  const mainColor = "#2563EB";

  // مسار SVG الجديد الذي يحتوي على ارتفاع وانخفاضات متتالية
  // Path: Start (50, 280) -> Rise (250, 180) -> Dip (400, 230) -> Final Peak (700, 80)
  // هذا المسار يمثل نمواً متذبذباً قبل الوصول إلى القمة
  const growthPath =
    "M50 280 C150 280, 150 180, 250 180 C300 180, 350 230, 400 230 C500 230, 600 80, 700 80";
  const pathLength = 900; // قيمة تقديرية لطول المسار الجديد
  const animationDuration = 3.5; // زيادة مدة الحركة

  return (
    <section className="py-24 md:py-24 bg-[#0a0a1f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* العنوان الرئيسي بالعربي */}
        <h2
          dir="rtl"
          className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold mb-6 relative"
        >
          زد مبيعاتك{" "}
          <span
            style={{
              color: mainColor,
              direction: "ltr",
              display: "inline-block",
            }}
          >
            30%
          </span>
        </h2>

        {/* الرسم البياني المتحرك */}
        <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 flex items-end justify-center">
          {/* تعريف الإطار المتحرك (Keyframes) */}
          <style jsx global>{`
            @keyframes arrowRise {
              0% {
                transform: translateY(100%) scale(0.5);
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                transform: translateY(0%) scale(1);
                opacity: 1;
              }
            }

            /* تم تحديث طول الشريط ليتناسب مع المسار الجديد */
            @keyframes lineGrow {
              from {
                stroke-dashoffset: ${pathLength};
              }
              to {
                stroke-dashoffset: 0;
              }
            }

            /* حركة ظهور رأس السهم */
            @keyframes arrowheadFadeIn {
              0%,
              90% {
                opacity: 0;
                transform: scale(0.5);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            /* حركة ظهور نقاط البيانات */
            @keyframes dataPointFadeIn {
              0%,
              80% {
                opacity: 0;
                transform: scale(0);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            /* حركة ظهور الشبكة */
            @keyframes gridFadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            /* حركة السهم المتحرك */
            @keyframes movingArrow {
              0% {
                stroke-dashoffset: ${pathLength};
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              100% {
                stroke-dashoffset: 0;
                opacity: 1;
              }
            }

            /* الفئات التي تطبق الحركات */
            .animate-arrow-rise {
              animation: arrowRise 1.5s ease-out forwards;
              animation-delay: 0.5s;
            }
            .animate-line-grow {
              animation: lineGrow ${animationDuration}s ease-in-out forwards;
            }
            .animate-arrow-head {
              animation: arrowheadFadeIn 0.5s ease-out forwards;
              animation-delay: ${animationDuration}s; /* يظهر بعد اكتمال رسم الخط */
            }
            .animate-data-point {
              animation: dataPointFadeIn 0.5s ease-out forwards;
            }
            .animate-grid {
              animation: gridFadeIn 1s ease-out forwards;
            }
            .animate-moving-arrow {
              animation: movingArrow ${animationDuration}s ease-in-out forwards;
            }
          `}</style>

          {/* SVG للرسم البياني */}
          <svg
            className="w-full h-full absolute top-0 left-0"
            viewBox="0 0 800 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* الشبكة الخلفية */}
            <g className="animate-grid" style={{ animationDelay: "0.2s" }}>
              {/* الخطوط الأفقية */}
              <line
                x1="50"
                y1="80"
                x2="750"
                y2="80"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="50"
                y1="130"
                x2="750"
                y2="130"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="50"
                y1="180"
                x2="750"
                y2="180"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="50"
                y1="230"
                x2="750"
                y2="230"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="50"
                y1="280"
                x2="750"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />

              {/* الخطوط العمودية */}
              <line
                x1="150"
                y1="80"
                x2="150"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="250"
                y1="80"
                x2="250"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="350"
                y1="80"
                x2="350"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="450"
                y1="80"
                x2="450"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="550"
                y1="80"
                x2="550"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="650"
                y1="80"
                x2="650"
                y2="280"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </g>

            {/* خط الأساس (Baseline) */}
            <line
              x1="50"
              y1="280"
              x2="750"
              y2="280"
              stroke="#4B5563"
              strokeWidth="4"
            />

            {/* خط النمو المائل (يمثل الزيادة 30%) - مسار متذبذب */}
            <path
              d={growthPath}
              stroke={mainColor} // اللون البنفسجي الجديد
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength} // طول المسار
              strokeDashoffset={pathLength} // ابدأ بإخفاء الخط
              className="animate-line-grow"
            />

            {/* السهم المتحرك على طول الخط */}
            <path
              d="M-10,-5 L0,0 L-10,5" // شكل رأس السهم
              fill={mainColor}
              stroke="none"
            >
              {/* حركة السهم على طول المسار */}
              <animateMotion
                dur="${animationDuration}s"
                repeatCount="1"
                fill="freeze"
                path={growthPath}
                rotate="auto"
              />
            </path>

            {/* نقاط البيانات على طول الخط */}
            <circle
              cx="50"
              cy="280"
              r="6"
              fill={mainColor}
              stroke="#0a0a1f"
              strokeWidth="2"
              className="animate-data-point"
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="250"
              cy="180"
              r="6"
              fill={mainColor}
              stroke="#0a0a1f"
              strokeWidth="2"
              className="animate-data-point"
              style={{ animationDelay: "1.5s" }}
            />
            <circle
              cx="400"
              cy="230"
              r="6"
              fill={mainColor}
              stroke="#0a0a1f"
              strokeWidth="2"
              className="animate-data-point"
              style={{ animationDelay: "2.5s" }}
            />
            <circle
              cx="700"
              cy="80"
              r="6"
              fill={mainColor}
              stroke="#0a0a1f"
              strokeWidth="2"
              className="animate-data-point"
              style={{ animationDelay: "3.5s" }}
            />

            {/* رأس السهم في نهاية الخط (700, 80) */}
            <path
              d="M700 80 L690 95 L710 95 Z" // شكل مثلث بسيط يقع على نقطة نهاية المسار
              fill={mainColor}
              stroke="none"
              className="animate-arrow-head"
              style={{ transformOrigin: "700px 80px" }} // لتوسيط الحركة
            />

            {/* تعريف التدرج اللوني (Gradient) */}
            <linearGradient
              id="gradient-custom"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: mainColor, stopOpacity: 0.5 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: mainColor, stopOpacity: 0 }}
              />
            </linearGradient>

            {/* ظل متدرج تحت الخط لإضافة عمق - يظهر بعد اكتمال رسم الخط */}
            <path
              // استخدام مسار النمو ثم إغلاقه إلى الأسفل (L700 280) والعودة إلى نقطة البداية (Z)
              d={`${growthPath} L700 280 Z`}
              fill="url(#gradient-custom)"
              className="transition-opacity duration-1000"
              // يتم تعيين الشفافية هنا لتظهر بعد اكتمال رسم الخط
              style={{ transitionDelay: `${animationDuration}s`, opacity: 1 }}
            />
          </svg>

          {/* علامة +30% المتحركة في نهاية الرسم البياني */}
          <div
            className="absolute right-0 top-[10%] text-white font-bold px-4 py-2 rounded-lg shadow-lg transform translate-y-full scale-50 opacity-0 animate-arrow-rise"
            // استخدام اللون الجديد للخلفية
            style={{ right: "5%", top: "20%", backgroundColor: mainColor }}
          >
            +30%
          </div>
        </div>

        {/* شرح إضافي */}
        <p className="text-gray-400 mt-16 text-lg max-w-3xl mx-auto">
          ارفع مبيعات متجرك الإلكتروني مع بوت الدردشة الذكي الذي يحسن
          تجربة العملاء ويزيد من رضاهم.
        </p>
      </div>
    </section>
  );
};

export default SalesBoost;
