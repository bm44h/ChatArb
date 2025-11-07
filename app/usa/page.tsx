// src/app/terms-of-service/page.tsx

export default function TermsOfServicePage() {
  return (
    <div className="py-12 lg:py-20" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
          شروط الاستخدام
        </h1>
        <p className="text-sm text-gray-600 text-center mb-10">
          آخر تحديث: 30 أكتوبر 2025
        </p>

        <div className="space-y-10">
          {/* مقدمة */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              أهلاً بك في منصة <span className="font-semibold">ChatArb</span>. هذه الشروط والأحكام "الشروط" تحكم استخدامك لمنصتنا التي تتيح لك إنشاء وإدارة مساعد رقمي "شات بوت" لمتجرك الإلكتروني.
            </p>
            <p className="mt-4 text-gray-700 border-r-4 border-gray-300 pr-4">
              <span className="font-semibold">ملاحظة هامة:</span> بوصولك إلى خدمتنا أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من الشروط، فلا يجوز لك الوصول إلى الخدمة.
            </p>
          </section>

          {/* الأقسام المرقمة */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. وصف الخدمة</h2>
            <p className="text-gray-700">
              توفر منصة ChatArb الأدوات اللازمة لإنشاء مساعد رقمي يعتمد على الذكاء الاصطناعي. يقوم المساعد الرقمي بالرد على استفسارات زوار موقعك بناءً على المحتوى الذي يتم جمعه بواسطة الزاحف من موقعك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. الحسابات والتسجيل</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">متطلبات الأهلية:</span> يجب أن تكون في السن القانوني 18 عامًا على الأقل لإبرام عقد ملزم من أجل إنشاء حساب.
              </li>
              <li>
                <span className="font-semibold">دقة المعلومات:</span> أنت توافق على تقديم معلومات دقيقة وكاملة وحديثة أثناء عملية التسجيل والحفاظ على تحديثها.
              </li>
              <li>
                <span className="font-semibold">أمان الحساب:</span> أنت مسؤول مسؤولية كاملة عن الحفاظ على سرية كلمة المرور الخاصة بك وعن جميع الأنشطة التي تحدث تحت حسابك.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. مسؤوليات المستخدم</h2>
            <p className="text-gray-700 mb-4">
              بصفتك مستخدمًا لمنصة ChatArb، فإنك توافق على ما يلي:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">الاستخدام المحظور:</span> لا يجوز لك استخدام الخدمة في أي نشاط غير قانوني أو احتيالي، أو للترويج للكراهية أو التمييز أو العنف. يشمل ذلك، على سبيل المثال لا الحصر، مواقع التصيد الاحتيالي (Phishing) أو نشر البرامج الضارة.
              </li>
              <li>
                <span className="font-semibold">المحتوى الخاص بك:</span> أنت المسؤول الوحيد عن محتوى موقعك الإلكتروني وعن أي بيانات أو معلومات يتم توفيرها للمنصة. أنت تقر وتضمن أن لديك جميع الحقوق والتراخيص اللازمة لاستخدام هذا المحتوى.
              </li>
              <li>
                <span className="font-semibold">دقة إجابات المساعد الرقمي:</span> أنت تدرك أن دقة وجودة إجابات المساعد الرقمي تعتمد كليًا على وضوح وجودة المحتوى الموجود على موقعك. ChatArb ليست مسؤولة عن أي معلومات غير دقيقة أو مضللة يقدمها المساعد الرقمي.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. الملكية الفكرية</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                    <span className="font-semibold">ملكية المنصة:</span> جميع الحقوق والعناوين والمصالح في الخدمة، بما في ذلك الكود البرمجي، والتصميم، والعلامة التجارية ChatArb، هي وستظل ملكية حصرية لـ ChatArb.
                </li>
                <li>
                    <span className="font-semibold">ملكية المحتوى الخاص بك:</span> أنت تحتفظ بجميع حقوق الملكية لمحتوى موقعك الإلكتروني. من خلال استخدام خدمتنا، فإنك تمنحنا ترخيصًا محدودًا لاستخدامه فقط لغرض تقديم وتشغيل الخدمة لك.
                </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. الرسوم والمدفوعات</h2>
            <p className="text-gray-700 mb-4">
              نقدم مجموعة من خطط الاشتراك لتلبية الاحتياجات المختلفة، بما في ذلك خطة مجانية وخطط مدفوعة متعددة.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">الفوترة:</span> يتم إصدار فواتير الخطط المدفوعة على أساس دوري (شهريًا أو سنويًا).
              </li>
              <li>
                <span className="font-semibold">التغييرات في الأسعار:</span> نحتفظ بالحق في تعديل أسعار اشتراكاتنا. سنقوم بإخطارك بأي تغييرات قبل 30 يومًا على الأقل.
              </li>
              <li>
                <span className="font-semibold">سياسة استرداد الأموال:</span> نقدم ضمان استرداد الأموال لمدة 3 أيام للمشتركين في الخطط المدفوعة. بعد انقضاء هذه الفترة، تصبح المدفوعات غير قابلة للاسترداد.
              </li>
            </ul>
          </section>

                    <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. الإنهاء</h2>
            <p className="text-gray-700 mb-4">
              نحتفظ بالحق في تعليق أو إنهاء حسابك ووصولك إلى الخدمة فورًا، دون إشعار مسبق أو مسؤولية، لأي سبب من الأسباب، بما في ذلك على سبيل المثال لا الحصر، إذا قمت بانتهاك هذه الشروط.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">الإنهاء من قبل المستخدم:</span> يمكنك إنهاء حسابك في أي وقت عن طريق حذف حسابك من لوحة التحكم أو عن طريق التواصل معنا.
              </li>
              <li>
                <span className="font-semibold">أثر الإنهاء:</span> عند إنهاء حسابك، يتوقف حقك في استخدام الخدمة فورًا. سيتم حذف بياناتك وفقًا لسياسة الخصوصية الخاصة بنا.
              </li>
              <li>
                <span className="font-semibold">البنود السارية:</span> جميع أحكام الشروط التي بطبيعتها يجب أن تظل سارية بعد الإنهاء، ستظل سارية، بما في ذلك أحكام الملكية، وإخلاء المسؤولية عن الضمان، وتحديد المسؤولية.
              </li>
            </ul>
          </section>


          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. إخلاء المسؤولية</h2>
            <p className="text-gray-700">
              يتم توفير الخدمة "كما هي" و "كما هي متاحة" دون أي ضمانات من أي نوع. نحن لا نضمن أن الخدمة ستكون دون انقطاع أو خالية من الأخطاء.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. تحديد المسؤولية</h2>
            <p className="text-gray-700">
              إلى أقصى حد يسمح به القانون، لن تكون ChatArb مسؤولة عن أي أضرار غير مباشرة أو عرضية تنشأ عن استخدامك للخدمة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. التغييرات على الشروط</h2>
            <p className="text-gray-700">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. إذا كان التعديل جوهريًا، فسنقدم إشعارًا مسبقًا.
            </p>
          </section>

          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. القانون الحاكم</h2>
            <p className="text-gray-700">
              تخضع هذه الشروط وتُفسر وفقًا لقوانين [اذكر اسم دولتك أو ولايتك هنا]، دون اعتبار لتعارضها مع أحكام القوانين.
            </p>
          </section> */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. اتصل بنا</h2>
            <p className="text-gray-700">
              إذا كان لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا عبر البريد الإلكتروني: <a href="mailto:support@chatarb.com" className="text-blue-600 hover:underline">support@chatarb.com</a>
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            شكرًا لاستخدامك منصة ChatArb
          </p>
        </div>
      </div>
    </div>
  );
}
