"use client";

export default function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a1f] via-blue-900/10 to-[#0a0a1f] py-20 px-6 overflow-hidden">
      <style>{`
        @keyframes moveBeam {
          0% {
            left: 0%;
          }
          100% {
            left: 100%;
          }
        }
        
        .beam-animation {
          animation: moveBeam 3s linear infinite;
          position: absolute;
        }

        /* تأثيرات إضافية للزجاج الواقعي */
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 1px rgba(255, 255, 255, 0.2),
            inset 0 -1px 1px rgba(0, 0, 0, 0.1);
        }

        .glass-card:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 
            0 12px 40px 0 rgba(0, 0, 0, 0.45),
            inset 0 1px 1px rgba(255, 255, 255, 0.3),
            inset 0 -1px 1px rgba(0, 0, 0, 0.1);
        }

        .number-circle {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.8) 0%,
            rgba(147, 51, 234, 0.8) 100%
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 4px 20px rgba(59, 130, 246, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* عنوان القسم */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          فقط 3 خطوات ليصبح بوتك جاهز
        </h2>
      </div>

      {/* الخطوات */}
      <div className="max-w-5xl mx-auto relative" dir="rtl">
        {/* الخط المتصل بين البطاقات */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 hidden md:block">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>
        
        {/* الحاوية للشعاع المتحرك */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 hidden md:block pointer-events-none overflow-hidden">
          <div className="beam-animation h-full w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* الخطوة 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="glass-card rounded-2xl p-6 w-full transition-all duration-500 hover:scale-105">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-3xl font-bold">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">سجل</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                أنشئ حسابك المجاني 
              </p>
            </div>
          </div>

          {/* الخطوة 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="glass-card rounded-2xl p-6 w-full transition-all duration-500 hover:scale-105">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-3xl font-bold">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">انسخ</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                انسخ الكود البسيط وضعه في المتجر 
              </p>
            </div>
          </div>

          {/* الخطوة 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="glass-card rounded-2xl p-6 w-full transition-all duration-500 hover:scale-105">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">الصق</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                الصق الكود وابدأ بالتحدث مع عملائك فورًا
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}