'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);

  // Helpers
  const isDesktop = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 992px)').matches; // Bootstrap lg breakpoint
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  // Sticky on scroll to match template header behavior
  useEffect(() => {
    const stickyEl = navRef.current;
    if (!stickyEl) return;
    const onScroll = () => {
      const shouldStick = window.scrollY > 10;
      stickyEl.classList.toggle('active', shouldStick);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const toggleMobileMenu = () => {
    // Toggle mobile menu and always collapse mega menu when opening
    setIsMenuOpen((open) => {
      const next = !open;
      if (next) setIsMegaMenuOpen(false);
      return next;
    });
  };

  const handleMegaMenuClick = (e: React.MouseEvent) => {
    // On mobile, prevent navigation to allow expanding the mega menu
    if (!isDesktop()) {
      e.preventDefault();
      setIsMegaMenuOpen((v) => !v);
    } else {
      // On desktop, follow the link; ensure hover state closes
      setIsMegaMenuOpen(false);
    }
  };

  // Keyboard support for toggle on mobile
  const handleMegaMenuKeyDown = (e: React.KeyboardEvent) => {
    if (!isDesktop() && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsMegaMenuOpen((v) => !v);
    }
  };

  const isActiveLink = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <header className="main-header bg-section">
      <div className="header-sticky" ref={navRef}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            {/* Logo Start */}
            <Link className={`navbar-brand ${isMenuOpen ? 'd-none d-lg-block' : ''}`} href="/">
              <Image src="/public/images/logo.png" alt="On Call" width={150} height={50} priority />
            </Link>
            {/* Logo End */}

            {/* Main Menu Start */}
            <div className={`collapse navbar-collapse main-menu ${isMenuOpen ? 'show' : ''}`}>
              <div className="nav-menu-wrapper">
                {/* Mobile Menu Header (Close button) */}
                <div className="d-lg-none d-flex justify-content-between align-items-center px-3 py-2">
                  <Link className="navbar-brand m-0" href="/" onClick={() => { setIsMenuOpen(false); setIsMegaMenuOpen(false); }}>
                    <Image src="/public/images/logo.png" alt="On Call" width={120} height={40} />
                  </Link>
                  <button
                    type="button"
                    className="btn btn-link text-dark p-0 mobile-close-btn"
                    aria-label="Close menu"
                    onClick={() => { setIsMenuOpen(false); setIsMegaMenuOpen(false); }}
                    style={{
                      fontSize: '2rem',
                      lineHeight: 1,
                      width: 48,
                      height: 48,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%'
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path 
                        d="M18 6L6 18M6 6L18 18" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="navbar-nav mr-auto" id="menu">
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${isActiveLink('/') ? 'active' : ''}`} 
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    
                  </li>
                  <li
                    className={`nav-item submenu mega-menu ${isMegaMenuOpen ? 'show' : ''}`}
                    onMouseEnter={() => {
                      if (isDesktop()) setIsMegaMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (isDesktop()) setIsMegaMenuOpen(false);
                    }}
                  >
                    <Link 
                      className={`nav-link ${isActiveLink('/services') ? 'active' : ''}`} 
                      href="/services"
                      onClick={handleMegaMenuClick}
                      onKeyDown={handleMegaMenuKeyDown}
                      aria-haspopup="true"
                      aria-expanded={isMegaMenuOpen}
                      role="button"
                    >
                      Types Of Care
                      <span className="dropdown-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                    <div
                      className="mega-menu-content"
                      hidden={!isMegaMenuOpen}
                      style={{ display: isMegaMenuOpen ? 'block' : 'none' }}
                    >
                      <div className="mega-menu-columns">
                        <div className="mega-menu-column">
                          <h4 className="mega-menu-title">
                            <i className="fas fa-home"></i> Home Care
                          </h4>
                          <ul>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/domiciliary-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-user-friends"></i> Domiciliary Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/night-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-moon"></i> Night Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/respite-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-clock"></i> Respite Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/home-help"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-broom"></i> Home help and housekeeping
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/companionship"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-handshake"></i> Companionship Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/daytime-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-sun"></i> Daytime Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/live-in-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-bed"></i> Live in Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/health-wellbeing"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-heartbeat"></i> Health and wellbeing check
                              </Link>
                            </li>
                            <li className="nav-item explore-all-link">
                              <Link 
                                className="nav-link" 
                                href="/services"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Explore all home care →
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="mega-menu-column">
                          <h4 className="mega-menu-title">
                            <i className="fas fa-brain"></i> Specialist Care
                          </h4>
                          <ul>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/dementia-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-head-side-virus"></i> Dementia Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/cancer-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-ribbon"></i> Cancer Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/parkinsons-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-hand-rock"></i> Parkinson&apos;s Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/neurological-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-brain"></i> Neurological Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/palliative-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-dove"></i> Palliative Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/arthritis-mobility"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-bone"></i> Arthritis and mobility Care
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link 
                                className="nav-link" 
                                href="/services/diabetes-care"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-tint"></i> Diabetes Care
                              </Link>
                            </li>
                            <li className="nav-item explore-all-link">
                              <Link 
                                className="nav-link" 
                                href="/services"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Explore all specialized care →
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${isActiveLink('/why-us') ? 'active' : ''}`} 
                      href="/why-us"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Why Us?
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`} 
                      href="/about"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link 
                      className={`nav-link ${isActiveLink('/careers') ? 'active' : ''}`} 
                      href="/careers"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Careers
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`} 
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item highlighted-menu">
                    <Link 
                      className="nav-link" 
                      href="/book-appointment"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Header Btn Start */}
              <div className="header-btn">
                <Link href="/book-appointment" className="btn-default">
                  Book Appointment
                </Link>
              </div>
              {/* Header Btn End */}
            </div>
            {/* Main Menu End */}

            {/* Mobile Menu Toggle */}
            {!isMenuOpen && (
              <button
                className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
          </div>
        </nav>
        <div className="responsive-menu"></div>
      </div>
    </header>
  );
};

export default Header;
