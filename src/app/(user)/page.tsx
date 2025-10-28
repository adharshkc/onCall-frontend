'use client';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';
import OurBlogSection from '@/components/home/OurBlogSection';
import WelcomePopup from '@/components/Modal/WelcomePopup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when page loads
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <WelcomePopup isOpen={showPopup} onClose={handleClosePopup} />
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
