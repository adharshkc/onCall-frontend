'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const animationClasses = new Set([
  'fadeIn',
  'fadeInUp',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'zoomIn',
  'bounceIn',
  'slideInUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
]);

function getAnimationClass(el: Element): string {
  const classes = (el.getAttribute('class') || '').split(/\s+/);
  for (const c of classes) {
    if (animationClasses.has(c)) return c;
  }
  return 'fadeInUp';
}

function animateCountersOnce(root: Document | HTMLElement) {
  const counters = Array.from(root.querySelectorAll<HTMLElement>('.counter'));
  const seen = new WeakSet<Element>();

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.innerText.replace(/[^0-9.]/g, '')) || 0;
          const duration = 1200;
          const start = performance.now();
          const startVal = 0;

          function step(now: number) {
            const p = Math.min(1, (now - start) / duration);
            const val = Math.floor(startVal + (target - startVal) * p);
            el.innerText = val.toString();
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((el) => obs.observe(el));
  return () => obs.disconnect();
}

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // WOW-like animations for elements with .wow
    const wowElements = Array.from(document.querySelectorAll<HTMLElement>('.wow'));
    const wowSeen = new WeakSet<Element>();

    const wowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || wowSeen.has(entry.target)) return;
          wowSeen.add(entry.target);
          const el = entry.target as HTMLElement;
          const delay = el.getAttribute('data-wow-delay') || undefined;
          const anim = getAnimationClass(el);
          if (delay) el.style.animationDelay = delay;
          el.classList.add('animated', anim);
        });
      },
      { threshold: 0.2 }
    );

    wowElements.forEach((el) => wowObserver.observe(el));

    // Reveal animations for figures/images with .reveal or .reveal-in-up
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-in-up')
    );
    const revealSeen = new WeakSet<Element>();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || revealSeen.has(entry.target)) return;
          revealSeen.add(entry.target);
          const el = entry.target as HTMLElement;
          // Make visible and animate in
          el.style.visibility = 'visible';
          el.classList.add('animated', 'fadeInUp');
        });
      },
      { threshold: 0.2 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // Counter animations
    const teardownCounters = animateCountersOnce(document);

    return () => {
      wowObserver.disconnect();
      revealObserver.disconnect();
      teardownCounters();
    };
  }, [pathname]);

  return null;
}
