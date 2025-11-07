// /app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/app/lib/blog"; // تأكد من صحة المسار
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Blog from "@/app/components/blogc";

export default function BlogPage() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "excerpt",
    "imageUrl",
  ]);

  return (
    <div className="bg-[#0a0a1f] min-h-screen flex flex-col">
      {/* الهيدر */}
      <Header />

      {/* المحتوى الرئيسي */}
      <main className="flex-grow py-12 lg:py-20">
        <Blog />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                // --- هذا هو السطر الذي تم تعديله ---
                className="group block rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg hover:bg-white/10 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover" // تم إزالة تأثير التحويم من الصورة لثبات أفضل
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-300 mb-2">{post.date}</p>
                  <h2 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-blue-500 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="font-semibold text-blue-500 group-hover:underline">
                    اقرأ المزيد ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
