import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import SalesBoost from "@/app/components/SalesBoost";
import Howitworks from "@/app/components/howitworks";
import Integration from "@/app/components/integration";
import Minipricing from "@/app/components/Minipricing";




import Footer from "@/app/components/Footer";
// لا حاجة لاستيراد Hero مرتين بنفس الاسم
// import Hero1 from "@/app/components/Hero" 

export default function Home() {
  return (
    // الخلفية الرئيسية للصفحة
    <div className="bg-[#0a0a1f]">
      {/* 
        استخدام flexbox لترتيب المكونات عمودياً
        وإزالة أي مسافات بينها.
      */}
      <main className="flex flex-col">
        <Header />
        <Hero />
        <SalesBoost/>
        <Howitworks />
        <Integration />
        <Minipricing />
        <Footer />
      </main>
    </div>
  );
}
