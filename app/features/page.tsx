// src/app/(with-header)/features/page.tsx

import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";



// مكون الميزة التفصيلية
const DetailedFeature = ({
  number,
  title,
  description,
  icon,
  highlight,
  reverse = false,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
  reverse?: boolean;
}) => {
  const directionClass = reverse ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    
    <div
      className={`flex flex-col ${directionClass} items-center gap-8 lg:gap-12 mb-20`}
    >
      {/* الأيقونة والرقم */}
      <div className="w-full lg:w-5/12 flex justify-center">
        <div className="relative">
          {/* الأيقونة الرئيسية */}
          <div className="w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
            <span className="text-8xl">{icon}</span>
          </div>
          {/* رقم الميزة */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#0065F8] text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl transform rotate-12">
            {number}
          </div>
          {/* عنصر ديكوري */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#0065F8] to-purple-500 rounded-full opacity-10 blur-2xl"></div>
        </div>
      </div>

      {/* المحتوى النصي */}
      <div className="w-full lg:w-7/12">
        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h3>
          {highlight && (
            <div className="inline-block bg-blue-50 text-[#0065F8] px-4 py-2 rounded-lg text-sm font-semibold mb-4">
              {highlight}
            </div>
          )}
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesPage() {
  return (
    <main className="bg-[#0a0a1f] min-h-screen">
        <Header />
      {/* قسم البطل - Hero Section */}
      <section className="relative bg-[#0a0a1f] py-20 overflow-hidden">
        {/* خلفية ديناميكية */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* شارة */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>⚡</span>
            قوة تقنية متقدمة
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            مميزات تجعل بوتك
            <br />
            <span className="text-[#0065F8]">الأذكى في السوق</span>
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            اكتشف كيف تساعدك تقنياتنا المتقدمة على تقديم تجربة عملاء استثنائية
            وزيادة مبيعاتك
          </p>

          {/* أزرار CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="bg-[#0065F8] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ابدأ مجاناً الآن
            </Link>
          </div>
        </div>
      </section>

      {/* قسم المميزات التفصيلية */}
      <section className="bg-[#0a0a1f] py-20">
        <div className="container mx-auto px-4">
          {/* الميزة 1 */}
          <DetailedFeature
            number="01"
            icon="🚀"
            title="الإعداد الفوري، والمعرفة الشاملة"
            highlight="بدون إدخال يدوي"
            description="انسَ الإدخال اليدوي الممل. بمجرد ربط البوت بموقعك، يقوم ’الزاحف الذكي’ الخاص بنا بفهرسة كل صفحاتك ومنتجاتك وأسعارك تلقائيًا. في دقائق، يصبح البوت خبيرًا بموقعك وجاهزًا للرد على استفسارات العملاء بدقة، مع تحديث معلوماته باستمرار وبدون أي تدخل منك."
          />

          {/* الميزة 2 */}
          <DetailedFeature
            number="02"
            icon="💬"
            title="تحدث مع عملائك بلهجتهم"
            highlight="فهم عميق للهجة السعودية والفصحى"
            description="نماذجنا اللغوية تم صقلها وتدريبها خصيصًا على آلاف المحادثات العربية الفريدة باللغة الفصحى واللهجة السعودية. سيستطيع البوت فهم استفسارات العملاء والرد بطريقة طبيعية ومألوفة تعزز الثقة وتزيد من رضا العملاء."
            reverse={true}
          />

          {/* الميزة 3 */}
          <DetailedFeature
            number="03"
            icon="💎"
            title='حوّل "غير متوفر" إلى فرصة ذهبية'
            highlight="تحليلات وفرص مبيعات"
            description="لا تدع عميلاً يغادر موقعك خالي الوفاض. عندما يبحث عميل عن منتج غير متوفر، يقوم البوت بجمع بياناته (بريده الإلكتروني أو رقمه) لإعلامه عند توفره. لوحة التحكم ستمنحك تقارير لا تقدر بثمن عن المنتجات الأكثر طلبًا، مما يساعدك على اتخاذ قرارات مستنيرة لتنمية مخزونك ومبيعاتك."
          />

          {/* الميزة 4 */}
          <DetailedFeature
            number="04"
            icon="🎨"
            title="بوت يحمل هوية علامتك التجارية"
            highlight="تخصيص كامل"
            description="من خلال لوحة تحكم بسيطة وواضحة باللغة العربية، يمكنك تخصيص كل شيء. غيّر اسم البوت، عدّل رسائل الترحيب، واختر الألوان التي تتناسب مع تصميم موقعك. اجعل البوت جزءًا لا يتجزأ من تجربة علامتك التجارية الفريدة."
            reverse={true}
          />

          {/* الميزة 5 */}
          <DetailedFeature
            number="05"
            icon="🔗"
            title="متصل بعالمك، جاهز للعمل"
            highlight="تكامل مع منصات التجارة الإلكترونية"
            description="البوت الخاص بنا ليس مجرد نافذة دردشة، بل هو محرك ذكي جاهز للتكامل. بفضل بنية النية أولاً  يمكننا ربطه مباشرة بأنظمة التجارة الإلكترونية مثل زد، سلة، وشوبيفاي لجلب بيانات حقيقية عن حالة الطلبات والشحنات، وتقديم إجابات حية ودقيقة لعملائك."
          />
        </div>
      </section>

      {/* قسم الدعوة لاتخاذ إجراء - CTA */}
      <section className="relative bg-gradient-to-b from-[#0a0a1f] via-[#0a0a1f] to-[#0a0a1f] py-20 overflow-hidden">
        {/* خلفية ديناميكية */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 mb-6 leading-tight">
              هل انت جاهز لترقية خدمة عملائك؟
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              ابدأ تجربتك المجانية اليوم ولا حاجة لبطاقة ائتمانية
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                ابدأ الآن مجاناً
              </Link>
            </div>

            {/* شارات الثقة */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-green-500">✓</span>
                <span>تجربة مجانية 7 يوم</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-green-500">✓</span>
                <span>بدون بطاقة ائتمانية</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-green-500">✓</span>
                <span>جميع الميزات</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
