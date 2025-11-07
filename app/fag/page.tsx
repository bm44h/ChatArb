// app/faq/page.tsx
import FaqItem from '../components/FaqItem'; // استيراد المكون الذي أنشأناه

// 1. تعريف قائمة الأسئلة والأجوبة
const faqData = [
  {
    question: 'كيف أقوم بإنشاء حساب جديد؟',
    answer: 'يمكنك إنشاء حساب جديد بسهولة عن طريق النقر على زر "ابدأ الآن" في الصفحة الرئيسية واتباع التعليمات. كل ما تحتاجه هو بريد إلكتروني وكلمة مرور.',
  },
  {
    question: 'كيف أضيف الشات بوت إلى موقعي؟',
    answer: 'بعد إنشاء مشروعك، اذهب إلى تبويب "التثبيت" في لوحة التحكم. ستجد هناك سطرًا واحدًا من الكود. قم بنسخه ولصقه في HTML الخاص بموقعك قبل إغلاق وسم </body>.',
  },
  {
    question: 'هل يمكنني تخصيص مظهر الشات بوت؟',
    answer: 'نعم بالتأكيد. من خلال إعدادات المشروع، يمكنك تغيير الألوان الأساسية، الرسالة الترحيبية، وحتى أيقونة المساعد الرقمي ليتناسب تمامًا مع هوية علامتك التجارية.',
  },
  {
    question: 'ما هي مصادر المعرفة التي يعتمد عليها البوت؟',
    answer: 'يعتمد البوت بشكل أساسي على المحتوى النصي الذي يقوم بجلبه من رابط الموقع الذي قدمته عند إنشاء المشروع. كلما كان محتوى موقعك واضحًا ومنظمًا، كانت إجابات البوت أكثر دقة.',
  },
  {
    question: 'هل بياناتي ومحادثاتي آمنة؟',
    answer: 'نحن نأخذ الخصوصية والأمان على محمل الجد. جميع بيانات حسابك مخزنة بشكل مشفر، ونحن لا نربط محادثات الزوار بهوياتهم الشخصية. يمكنك مراجعة سياسة الخصوصية لمزيد من التفاصيل.',
  },
];

export default function FaqPage() {
  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <div className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2. عنوان الصفحة */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h1>
            <p className="text-lg text-gray-600">
              هل لديك سؤال؟ لقد قمنا بتجميع إجابات للأسئلة الأكثر شيوعًا هنا.
            </p>
          </div>

          {/* 3. عرض قائمة الأسئلة باستخدام المكون */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {faqData.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>

          {/* 4. قسم للمساعدة الإضافية */}
          <div className="text-center mt-10">
            <p className="text-gray-700 mb-3">هل لم تجد إجابة لسؤالك؟</p>
            <a
              href="mailto:support@chat-arb.com"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              تواصل مع فريق الدعم
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
