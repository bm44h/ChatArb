// Footer.tsx (النسخة النهائية مع أيقونات صور مخصصة)

import React from 'react';
import Link from 'next/link'; 
// 🚫 تم إزالة استيراد أيقونات lucide-react (مثل X, Facebook, Instagram)
import { ChevronDown } from 'lucide-react'; // يمكن إبقاء هذه إذا كنت تستخدمها لاحقًا
import Image from "next/image";


// 🔗 قائمة بالروابط (المجموعات الثلاث العربية)
const links = {
  product: [
    { name: 'الرئيسية', href: '/' },
    { name: 'المميزات', href: '/features' },
    { name: 'التسعير', href: '/pricing' },
    { name: 'الأسئلة الشائعة', href: '/fag' },
  ],
  company: [
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'شروط الاستخدام', href: '/usa' },
  ],
  resources: [
    { name: 'تواصل معنا', href: '/contact' },
    { name: 'المدونة', href: '/blog' },
    // { name: 'المستندات', href: '/docs' },
  ],
};


// 🔄 مكون عنصر قائمة الروابط (LinkGroup) - لم يتغير
interface LinkGroupProps {
  title: string;
  links: { name: string; href: string }[];
}

const LinkGroup: React.FC<LinkGroupProps> = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="text-white text-base font-semibold">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// 📸 تعريف مكون أيقونات التواصل الاجتماعي الجديد لاستخدام <img />
interface SocialIconProps {
  src: string; // المسار إلى ملف الصورة المخصص
  label: string;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, label, href }) => (
  <a
    href={href}
    target="_blank" // افتح الروابط في علامة تبويب جديدة
    rel="noopener noreferrer"
    aria-label={label}
    // يمكنك تعديل هذه الفئة لتناسب حجم وشكل أيقوناتك
    className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:opacity-80 transition-opacity duration-200"
  >
    <img src={src} alt={label} className="w-5 h-5 md:w-6 md:h-6 object-contain"
 />
  </a>
);

// المكون الرئيسي للـ Footer
const Footer: React.FC = () => {
    
    // ⚙️ مسارات الأيقونات المخصصة
    // تأكد من وضع ملفاتك في مجلد /public لتنجح هذه المسارات
    const socialIconsData = [
        { label: "X", src: "/icons/x-icon.svg", href: "https://x.com/chatarb1" },
        { label: "Facebook", src: "/icons/tiktok-icon.svg", href: "https://facebook.com/YourPage" },
        { label: "Instagram", src: "/icons/instagram-icon.svg", href: "https://instagram.com/YourProfile" },
        // أضف أيقونات أخرى هنا (مثل: { label: "LinkedIn", src: "/icons/linkedin.svg", href: "..." })
    ];

    return (
        <footer className="bg-black text-white p-10 md:p-16 rounded-t-4xl">
            <div className="max-w-7xl mx-auto">
                {/* 1. الجزء العلوي: الشعار وأيقونات التواصل الاجتماعي */}
                <div className="flex justify-between items-center mb-12">
                    {/* الشعار */}
                    <div className="flex items-center">
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          width={140}
                          height={100}
                          unoptimized
                          quality={100}  
                          priority
                        />
                    </div>
                    
                    {/* أيقونات التواصل الاجتماعي - استخدام الأيقونات المخصصة */}
                    <div className="flex  space-x-3">

                        {socialIconsData.map((icon) => (
                            <SocialIcon 
                                key={icon.label}
                                src={icon.src} 
                                label={icon.label} 
                                href={icon.href} 
                            />
                        ))}
                    </div>
                </div>

                {/* خط فاصل */}
                <div className="w-full h-[1px] bg-gray-700 my-8 hidden md:block" />

                {/* 2. الجزء الأوسط: الروابط (ثلاث مجموعات عربية) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mt-10" dir="rtl">
                    <LinkGroup title="روابط سريعه" links={links.product} />
                    <LinkGroup title="الشركه" links={links.company} />
                    <LinkGroup title="الموارد" links={links.resources} />
                </div>

                {/* خط فاصل سفلي */}
                <div className="w-full h-[1px] bg-gray-700 my-5" />

                {/* 3. الجزء السفلي: حقوق النشر (في المنتصف وبالعربية) */}
                <div 
                    className="flex justify-center items-center text-sm"
                    dir="rtl"
                >
                    <p className="text-gray-400 text-center">
                        © جميع الحقوق محفوظة لـ ChatArb {new Date().getFullYear()}

                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;