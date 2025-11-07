import { useState, useEffect, useMemo, useCallback } from "react"; // إضافة useCallback و useMemo لتحسين الأداء
import SettingsSkeleton from '@/app/components/dashboard/tabs/SettingsSkeleton';


// دالة مخصصة لحركة الأرقام (Counter Animation Hook)
const useCounterAnimation = (targetValue: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // إعادة تعيين العداد إلى الصفر لتشغيل الحركة الجديدة
    setCount(0); 

    if (targetValue === 0) {
      return;
    }

    const start = 0;
    const end = targetValue;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // حساب القيمة الحالية للعداد
      const currentValue = Math.floor(start + (end - start) * percentage);
      setCount(currentValue);

      if (percentage < 1) {
        // استمر في الحلقة إذا لم تصل إلى النهاية
        requestAnimationFrame(animate);
      }
    };

    // ابدأ الحركة بعد تأخير بسيط (ليتماشى مع حركة الدائرة)
    const animationStartTimer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(animationStartTimer);
  }, [targetValue, duration]); // تعتمد على targetValue لتشغيل الحركة عند التحديث

  return count;
};

interface StatCardProps {
  title: string;
  current: number;
  total: number;
}

/**
 * مكون StatCard (بطاقة الإحصائية) مع حركة ملء الدائرة وحركة العداد.
 */
const StatCard = ({ title, current, total }: StatCardProps) => {
  const targetPercentage = Math.round((current / total) * 100);
  // حركة ملء الدائرة
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // حركة العداد للعدد الحالي
  const animatedCurrentCount = useCounterAnimation(current, 1000);

  // تشغيل حركة الدائرة
  useEffect(() => {
    // يتم إعادة تعيين النسبة المئوية للصفر قبل تطبيق القيمة الجديدة لتشغيل الـ transition
    setAnimatedPercentage(0);
    
    const timer = setTimeout(() => {
      setAnimatedPercentage(targetPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetPercentage]); // تشغيل الحركة عند تغيير النسبة المئوية

  // قيمة محيط الدائرة
  const circumference = 100;
  // قيمة الإزاحة (offset)
  const dashOffset = circumference - animatedPercentage;

  return (
    <div className="bg-[#FCFCFC] p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-between h-56">
      {/* العنوان */}
      <h3 className="text-gray-700 font-medium text-xl text-center">{title}</h3>

      {/* الدائرة */}
      <div className="relative w-24 h-24">
        <svg
          // دوران -90 درجة لجعل بداية الدائرة من الأعلى (نقطة الساعة 12)
          className="w-full h-full transform -rotate"
          viewBox="0 0 36 36"
        >
          {/* المسار الخلفي (Track) */}
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            d="M18 2.5
              a 15.5 15.5 0 0 1 0 31
              a 15.5 15.5 0 0 1 0 -31"
          />
          {/* المسار الأمامي (الذي يمتلئ بالحركة) */}
          <path
            // إضافة خاصية الانتقال (transition) من Tailwind لتطبيق الحركة
            className="text-blue-500 transition-all duration-1000 ease-out"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            // strokeDasharray = محيط الدائرة بالكامل
            strokeDasharray={`${circumference}, ${circumference}`}
            // strokeDashoffset = القيمة التي تحدد كمية الجزء المملوء
            strokeDashoffset={dashOffset}
            d="M18 2.5
              a 15.5 15.5 0 0 1 0 31
              a 15.5 15.5 0 0 1 0 -31"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 leading-none">
            {/* استخدام العداد المتحرك */}
            {animatedCurrentCount}
          </span>
          <span className="text-xs text-gray-500">/ {total}</span>
        </div>
      </div>

      {/* النسبة */}
      <p className="text-sm text-gray-600">{targetPercentage}% من الإجمالي</p>
    </div>
  );
};

interface AccuracyCardProps {
  accuracy: number;
}

/**
 * مكون AccuracyCard (بطاقة تقييم الدقة والأداء) مع حركة ملء الدائرة وحركة العداد.
 */
const AccuracyCard = ({ accuracy }: AccuracyCardProps) => {
  const targetPercentage = accuracy;
  // حركة ملء الدائرة
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // حركة العداد للنسبة المئوية
  const animatedAccuracyPercentage = useCounterAnimation(targetPercentage, 1000);

  // تشغيل حركة الدائرة
  useEffect(() => {
    // يتم إعادة تعيين النسبة المئوية للصفر قبل تطبيق القيمة الجديدة لتشغيل الـ transition
    setAnimatedPercentage(0);

    const timer = setTimeout(() => {
      setAnimatedPercentage(targetPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [targetPercentage]); // تشغيل الحركة عند تغيير النسبة المئوية

  const circumference = 100;
  const dashOffset = circumference - animatedPercentage;
  
  const performanceLevel = useMemo(() => {
    if (accuracy >= 90) return "ممتاز";
    if (accuracy >= 70) return "جيد جدًا";
    if (accuracy >= 60) return "جيد";
    return "يحتاج للتحسين";
  }, [accuracy]);

  return (
    <div className="bg-[#FCFCFC] p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-between h-56">
      <h3 className="text-gray-800 text-xl font-medium text-center">
        تقييم العملاء
      </h3>

      <div className="relative w-24 h-24">
        <svg
          className="w-full h-full transform -rotate"
          viewBox="0 0 36 36"
        >
          {/* المسار الخلفي (Track) */}
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            d="M18 2.5
              a 15.5 15.5 0 0 1 0 31
              a 15.5 15.5 0 0 1 0 -31"
          />
          {/* المسار الأمامي (الذي يمتلئ بالحركة) */}
          <path
            // استخدام لون أخضر إذا كانت الدقة عالية، وإلا استخدم لون تحذيري
            className={`transition-all duration-1000 ease-out ${accuracy >= 80 ? 'text-green-500' : 'text-yellow-500'}`}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            // strokeDasharray = محيط الدائرة بالكامل
            strokeDasharray={`${circumference}, ${circumference}`}
            // strokeDashoffset = القيمة التي تحدد كمية الجزء المملوء
            strokeDashoffset={dashOffset}
            d="M18 2.5
              a 15.5 15.5 0 0 1 0 31
              a 15.5 15.5 0 0 1 0 -31"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900 leading-none">
            {/* استخدام العداد المتحرك */}
            {animatedAccuracyPercentage}%
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600">{performanceLevel}</p>
    </div>
  );
};

const SummaryCard = () => (
  <div className="bg-[#FCFCFC] p-6 rounded-xl border border-gray-200 flex flex-col  h-56 col-span-1 md:col-span-2">
    <h3 className="text-gray-800 text-xl font-medium ">
      ملخص محادثات اليوم
    </h3>
    <p className="text-gray-800 text-sm mt-4  leading-relaxed">
      هنا سوف يقوم البوت بتوليد ملخص يومي عن المحادثات التي قام بإتمامها، مثل:
      <br />
      <span className="text-gray-600">
        "هناك 22 شخصًا يعانون من تأخير في الشحن، يرجى تحسين وسيلة الشحن."
      </span>
    </p>
  </div>
);

const ActivityChartCard = () => (
  <div className="bg-[#FCFCFC] p-6 rounded-xl border border-gray-200 col-span-1 md:col-span-4">
    <h3 className="text-gray-800 text-xl font-medium">أوقات المحادثات</h3>
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg mt-4">
      <p className="text-gray-500">سيتم عرض الرسم البياني هنا</p>
    </div>
  </div>
);

export default function OverviewTab() {
  // حالة لحفظ بيانات الإحصائيات
  const [stats, setStats] = useState({
    totalChats: 340,
    totalCapacity: 1000,
    accuracy: 92,
  });
  const [loading, setLoading] = useState(false);

  // دالة لجلب البيانات الجديدة (محاكاة)
  const fetchNewData = useCallback(async () => {
    setLoading(true);
    // محاكاة عملية جلب البيانات من الخادم
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // توليد قيم عشوائية جديدة للمحاكاة
    const newTotalChats = Math.floor(Math.random() * 800) + 100; // بين 100 و 900
    const newAccuracy = Math.floor(Math.random() * 20) + 75; // بين 75 و 95

    setStats({
      totalChats: newTotalChats,
      totalCapacity: 1000,
      accuracy: newAccuracy,
    });

    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">نظرة عامة</h1>
        {/* زر تحديث البيانات */}
        <button
          onClick={fetchNewData}
          disabled={loading}
          className={`
            flex items-center space-x-2 space-x-reverse
            px-2 py-1.5 bg-black text-white text-sm font-medium rounded-[8px] 
            hover: transition duration-300
            disabled:bg-blue-400 disabled:cursor-not-allowed
            transform active:scale-[0.98]
          `}
        >
          <span>{loading ? 'جاري التحديث...' : 'تحديث '}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي المحادثات"
          current={stats.totalChats}
          total={stats.totalCapacity}
        />
        <AccuracyCard accuracy={stats.accuracy} />
        <SummaryCard />
        <ActivityChartCard />
      </div>
    </div>
  );
}
