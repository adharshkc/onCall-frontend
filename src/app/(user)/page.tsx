import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';
import HowItWorkSection from '@/components/home/HowItWorkSection';
import OurFactsSection from '@/components/home/OurFactsSection';
import OurPricingSection from '@/components/home/OurPricingSection';
import OurFeatureSection from '@/components/home/OurFeatureSection';
import OurTestimonialsSection from '@/components/home/OurTestimonialsSection';
import OurBlogSection from '@/components/home/OurBlogSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <CTASection />
      <FAQSection />
      {/* <HowItWorkSection /> */}
      {/* <OurFactsSection /> */}
      {/* <OurPricingSection /> */}
      {/* <OurFeatureSection /> */}
      {/* <OurTestimonialsSection /> */}
      <OurBlogSection />
    </>
  );
}
