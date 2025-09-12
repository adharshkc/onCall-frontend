"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import ScrollAnimator from '@/components/utils/ScrollAnimator';

/**
 * SiteChrome wraps public pages with global UI while skipping it for /admin routes.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <ScrollAnimator />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
