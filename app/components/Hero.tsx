export default function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center justify-center min-h-[80vh] px-6 sm:px-10 bg-gradient-to-b from-[#0a0a1f]/90 via-blue-900/30 to-[#0a0a1f] overflow-hidden z-10">      {/* تدرج لوني من المنتصف */}


      {/* المحتوى */}
      <div className="relative z-10 mt-12">
        {/* العنوان */}
        <h1 className="text-3xl sm:text-6xl font-bold text-white leading-tight mb-4">
          خدمة عملاء أسرع وأسهل
          <br className="hidden sm:block" />
          لمتجرك الإلكتروني
        </h1>
        {/* النص الفرعي */}
        <p
          dir="rtl"
          className="text-white/70 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
        >
          حوّل زوار موقعك إلى عملاء سعداء مع بوت دردشة ذكي يفهم لهجتهم ويرد على
          استفساراتهم فورًا
        </p>
        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/signup"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-full font-medium text-white shadow-md"
          >
            ابدأ مجانا الان
          </a>
          <a
            href="/features"
            className="px-8 py-3 border border-white/20 hover:border-blue-700 transition-all rounded-full font-medium text-white"
          >
            استكشف المميزات
          </a>
        </div>
      </div>
    </section>
  );
}
