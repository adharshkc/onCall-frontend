'use client';
import { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';
import OurBlogSection from '@/components/home/OurBlogSection';
import ToastWelcomePopup from '@/components/Modal/ToastWelcomePopup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <ToastWelcomePopup onClose={handleClosePopup} />}
      
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
