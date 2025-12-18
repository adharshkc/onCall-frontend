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
import WelcomePopup from '@/components/Modal/WelcomePopup';
import ServiceCopy from '@/components/home/ServiceCopy';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true); 
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    isOpen && setIsOpen(false);
    setShowPopup(false);
  };

  return (
    <>
      {/* {showPopup && <WelcomePopup onClose={handleClosePopup} isOpen={true} />} */}
      
      <HeroSection />
      {/* <AboutSection /> */}
      <ServicesSection />
      {/* <ServiceCopy /> */}
      <WhyChooseSection />
      {/* <CTASection /> */}
      {/* <FAQSection /> */}
      {/* <HowItWorkSection /> */}
      {/* <OurFactsSection /> */}
      {/* <OurPricingSection /> */}
      {/* <OurFeatureSection /> */}
      {/* <OurTestimonialsSection /> */}
      {/* <OurBlogSection /> */}
    </>
  );
}
