export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 lg:py-20" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
          سياسة الخصوصية
        </h1>
        <p className="text-sm text-gray-600 text-center mb-10">
          آخر تحديث: 30 أكتوبر 2025
        </p>

        <div className="space-y-10">
          {/* مقدمة */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              أهلاً بك في منصة <span className="font-semibold">ChatArb</span>. نحن نأخذ خصوصيتك على محمل الجد. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا ومشاركتنا وحمايتنا لمعلوماتك عند استخدامك لمنصتنا لإنشاء وإدارة المساعد الرقمي (الشات بوت) لموقعك الإلكتروني.
            </p>
            <p className="mt-4 text-gray-700 border-r-4 border-gray-300 pr-4">
              <span className="font-semibold">ملاحظة هامة:</span> باستخدامك لخدماتنا، فإنك توافق على جمع واستخدام المعلومات وفقًا لهذه السياسة.
            </p>
          </section>

          {/* القسم الأول */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ما هي البيانات التي نجمعها؟
            </h2>
            <p className="text-gray-700 mb-6">
              نحن نجمع أنواعًا مختلفة من المعلومات لتقديم خدماتنا وتحسينها. تنقسم هذه المعلومات إلى ثلاث فئات رئيسية:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  1. معلومات تقدمها لنا مباشرة "معلومات الحساب والمشروع"
                </h3>
                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                  <li>
                    <span className="font-semibold">معلومات الحساب:</span> عند تسجيل حساب جديد، نجمع معلومات مثل اسمك وعنوان بريدك الإلكتروني وكلمة المرور (المخزنة بشكل مشفر وآمن).
                  </li>
                  <li>
                    <span className="font-semibold">معلومات المشروع:</span> عند إنشاء مشروع جديد، نجمع المعلومات التي تقدمها مثل رابط متجرك الإلكتروني، واسم متجرك، والإعدادات المخصصة لمظهر المساعد الرقمي.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  2. معلومات نجمعها تلقائيًا "محتوى موقعك"
                </h3>
                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                  <li>
                    <span className="font-semibold">بيانات الزحف "Crawled Data":</span> لتشغيل المساعد الرقمي، تقوم أنظمتنا بزيارة رابط الموقع الذي قدمته لجمع المحتوى النصي من صفحاته. يتم استخدام هذه البيانات حصريًا لإنشاء قاعدة معرفية.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  3. معلومات يتم إنشاؤها أثناء استخدام الخدمة "زوار المتاجر"
                </h3>
                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                  <li>
                    <span className="font-semibold">محتوى المحادثات:</span> نقوم بتخزين الأسئلة التي يطرحها زوار موقعك على المساعد الرقمي والإجابات التي يتم إنشاؤها. نحن لا نربط هذه المحادثات بهوية شخصية محددة للزوار.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* القسم الثاني */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              كيف نستخدم بياناتك؟
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">لتقديم وتشغيل الخدمة:</span> نستخدم معلومات حسابك لإدارته، ومعلومات مشروعك لتشغيل المساعد الرقمي، وبيانات الزحف لتدريبه.
              </li>
              <li>
                <span className="font-semibold">للتواصل معك:</span> قد نستخدم بريدك الإلكتروني لإرسال إشعارات هامة تتعلق بحسابك أو الخدمة أو تحديثات على سياساتنا.
              </li>
              <li>
                <span className="font-semibold">للأمان والتحسين:</span> نستخدم البيانات لمراقبة أمان المنصة، ومنع الاحتيال، وتحليل اتجاهات الاستخدام لتحسين خدماتنا.
              </li>
            </ul>
          </section>

          {/* القسم الثالث */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              مع من نشارك بياناتك؟
            </h2>
            <p className="text-gray-700 font-semibold border-r-4 border-gray-300 pr-4 mb-4">
              نحن لا نبيع بياناتك الشخصية أبدًا.
            </p>
            <p className="text-gray-700 mb-4">
              نحن نشارك المعلومات مع أطراف ثالثة موثوقة تساعدنا في تشغيل خدمتنا:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Supabase:</span> قاعدة بيانات أساسية لتخزين معلومات حسابك وتفاصيل مشاريعك بشكل آمن.
              </li>
              <li>
                <span className="font-semibold">ChromaDB Cloud:</span> تخزين البيانات المتجهية لمحتوى موقعك للبحث السريع والفعال.
              </li>
            </ul>
          </section>

          {/* باقي الأقسام */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أمان البيانات</h2>
            <p className="text-gray-700">
              نتخذ إجراءات أمنية وتقنية وتنظيمية معقولة لحماية معلوماتك. تشمل التشفير، وتأمين الاتصالات (HTTPS)، وسياسات الوصول الصارمة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">الاحتفاظ بالبيانات</h2>
            <p className="text-gray-700">
              نحتفظ ببياناتك طالما كان حسابك نشطًا. يمكنك حذف حسابك ومشروعك في أي وقت، مما سيؤدي إلى حذف البيانات المرتبطة به.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
            <p className="text-gray-700">
              لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها. يمكنك إدارة معظم معلوماتك مباشرة من لوحة التحكم.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">التغييرات على السياسة</h2>
            <p className="text-gray-700">
              قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية عبر البريد الإلكتروني.
            </p>
          </section>

          {/* قسم التواصل */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">اتصل بنا</h2>
            <p className="text-gray-700">
              إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، فلا تتردد في التواصل معنا عبر البريد الإلكتروني: <a href="mailto:support@chatarb.com" className="text-blue-600 hover:underline">support@chatarb.com</a>
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
          </p>
        </div>
      </div>
    </div>
  );
}
