"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user scrolls more than 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-2 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className=" flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={180}
              unoptimized
              quality={100}
              priority
            />
          </div>

          {/* Desktop Menu with Glass Effect */}
          <div
            className={`hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 px-8 py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
                : "bg-transparent"
            }`}
          >
            <ul className="flex flex-row-reverse items-center gap-8">
              <li>
                <Link
                  href="/"
                  className="relative text-white/90 font-medium text-lg font-[600] 
        after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] 
        after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="relative text-white/90 font-medium text-lg font-[600] 
        after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] 
        after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
                >
                  المميزات
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="relative text-white/90 font-medium text-lg font-[600]
        after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] 
        after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
                >
                  التسعير
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="relative text-white/90 font-medium text-lg font-[600]
        after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] 
        after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
                >
                  المدونه
                </Link>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="bg-white/10 backdrop-blur-sm hover:border-blue-700 text-white px-6 py-2 rounded-full transition-all duration-200 border border-white/30"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/signup"
              className="bg-blue-600 backdrop-blur-sm hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-200 border border-white/30"
            >
              ابدأ مجانا
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-lg py-2"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-lg py-2"
                >
                  المميزات
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-lg py-2"
                >
                  التسعير
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-lg py-2"
                >
                  المدونة
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="w-full block bg-transparent hover:bg-white/10 text-white px-6 py-2 rounded-full transition-all duration-200 border border-white/30 text-center"
                >
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="w-full block bg-[#8C00FF] hover:bg-[#7a00e6] text-white px-6 py-2 rounded-full transition-all duration-200 text-center"
                >
                  ابدأ مجانا
                </Link>
              </li>
            </ul>
            j
          </div>
        )}
      </nav>
    </header>
  );
}
