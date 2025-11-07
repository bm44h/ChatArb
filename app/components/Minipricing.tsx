// app/components/MiniPricing.tsx

import Link from 'next/link';
import Image from 'next/image'; // تم استخدام مكون Image من Next.js لتحسين الأداء

export default function MiniPricing() {
  return (
    <section className="bg-[#0a0a1f] py-8" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* 1. العنوان الرئيسي والفرعي */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          أسعار مرنة تناسب الجميع
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          ابدأ مجانًا، وقم بالترقية لاحقاً
        </p>

        {/* 2. حاوية الصورة والظل المتدرج */}
        <div className="mt-8 relative ">
          {/* الصورة نفسها */}
          <Image 
            src="/images/p.png" // <-- تأكد من أن هذه الصورة موجودة في مجلد public/images
            alt="لمحة عن خطط تسعير ChatArb"
            width={1024} // العرض الأصلي للصورة
            height={350} // الارتفاع الأصلي للصورة
            className="w-full "
            unoptimized
            quality={100}
            priority
          />
          
          {/* الظل المتدرج الذي يخفي الجزء السفلي من الصورة */}
          <div 
            className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-[#0a0a1f] to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* 3. زر الإجراء */}
        <div className="mt-8">
          <Link
            href="/pricing"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors duration-300 "
          >
            اكتشف جميع الخطط
          </Link>
        </div>

      </div>
    </section>
  );
}
