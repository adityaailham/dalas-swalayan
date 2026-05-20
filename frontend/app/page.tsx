import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProductHighlight from "@/components/landing/ProductHighlight";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import ContactLocationSection from "@/components/landing/ContactLocationSection";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navbar />
      <main className="grow overflow-hidden">
        <FadeIn delay={0.1} direction="none">
          <HeroSection />
        </FadeIn>
        
        <FadeIn delay={0.4} direction="up">
          <FeaturesSection />
        </FadeIn>
        
        <FadeIn delay={0.2} direction="up">
          <ProductHighlight />
        </FadeIn>
        
        <FadeIn delay={0.2} direction="up">
          <WhyChooseUsSection />
        </FadeIn>
        
        <FadeIn delay={0.2} direction="up">
          <ContactLocationSection />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
