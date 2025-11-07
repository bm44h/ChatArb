export default function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center justify-center min-h-[50vh] px-6 sm:px-10 bg-gradient-to-b from-[#0a0a1f]/90 via-blue-900/30 to-[#0a0a1f] overflow-hidden z-10">      {/* تدرج لوني من المنتصف */}


      {/* المحتوى */}
      <div className="relative z-10 mt-4">
        {/* العنوان */}
        <h1 className="text-3xl sm:text-6xl font-bold text-white leading-tight mb-4" dir="rtl">
          مدونة ChatArb
        </h1>
        {/* النص الفرعي */}
        <p
          dir="rtl"
          className="text-white/70 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
        >
          مقالات ونصائح لمساعدتك على تنمية أعمالك باستخدام قوة الذكاء الاصطناعي
        </p>
        {/* الأزرار */}
      </div>
    </section>
  );
}
