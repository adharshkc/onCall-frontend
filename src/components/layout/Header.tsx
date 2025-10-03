'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from '@/lib/api';
import { Service } from '@/types/service';

/**
 * Header Component
 * 
 * Features:
 * - Dynamic service fetching from backend API (/all-services endpoint)
 * - Categorized mega menu for "Types of Care" (home-care vs specialist-care)
 * - Fallback services if API is unavailable
 * - Responsive design with mobile menu support
 * - Proper loading states and error handling
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
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
  
  // Add scrollable class to mega menu content when content exceeds container height
  useEffect(() => {
    if (!isMegaMenuOpen) return;
    
    const checkScrollable = () => {
      const megaMenuContent = document.querySelector('.mega-menu-content');
      if (!megaMenuContent) return;
      
      const isScrollable = megaMenuContent.scrollHeight > megaMenuContent.clientHeight;
      if (isScrollable) {
        megaMenuContent.classList.add('scrollable');
      } else {
        megaMenuContent.classList.remove('scrollable');
      }
    };
    
    // Check initially and on window resize
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => window.removeEventListener('resize', checkScrollable);
  }, [isMegaMenuOpen]);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const response = await axios.get('/all-services');
        const servicesData = response.data.data || response.data || [];
        
        // Ensure we have valid service objects
        const validServices = servicesData.filter((service: Partial<Service>) => 
          service && service.id && service.name && service.slug
        );
        
        setServices(validServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Use fallback services if API fails
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
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

  // Helper functions to categorize services
  const getHomeCareServices = () => {
    return services.filter(service => 
      service.active && (service.category === 'home-care' || !service.category)
    );
  };

  const getSpecialistCareServices = () => {
    return services.filter(service => 
      service.active && service.category === 'specialist-care'
    );
  };

  // Fallback services in case API is not available
  const fallbackHomeCareServices = [
    { id: 'fallback-1', name: 'Domiciliary Care', slug: 'domiciliary-care', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-2', name: 'Night Care', slug: 'night-care', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-3', name: 'Respite Care', slug: 'respite-care', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-4', name: 'Home Help and Housekeeping', slug: 'home-help-housekeeping', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-5', name: 'Companionship Care', slug: 'companionship-care', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-6', name: 'Daytime Care', slug: 'daytime-care', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-7', name: 'Live in Care', slug: 'live-in-care', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' },
    // { id: 'fallback-8', name: 'Health and Wellbeing Check', slug: 'health-wellbeing', category: 'home-care' as const, active: true, createdAt: '', updatedAt: '' }
  ];

  const fallbackSpecialistServices = [
    { id: 'fallback-s1', name: 'Dementia Care', slug: 'dementia-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s2', name: 'Alzheimer\'s Care', slug: 'alzheimers-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s3', name: 'Cancer Care', slug: 'cancer-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s4', name: 'Parkinson\'s Care', slug: 'parkinsons-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s5', name: 'Neurological Care', slug: 'neurological-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s6', name: 'Palliative Care', slug: 'palliative-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s7', name: 'Arthritis & Mobility Care', slug: 'arthritis-mobility-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' },
    { id: 'fallback-s8', name: 'Diabetes Care', slug: 'diabetes-care', category: 'specialist-care' as const, active: true, createdAt: '', updatedAt: '' }
  ];

  const displayHomeCareServices = services.length > 0 ? getHomeCareServices() : fallbackHomeCareServices;
  const displaySpecialistServices = services.length > 0 ? getSpecialistCareServices() : fallbackSpecialistServices;

  // Map service names to FontAwesome icons
  const getServiceIcon = (serviceName: string) => {
    const iconMap: { [key: string]: string } = {
      'domiciliary care': 'user-friends',
      'night care': 'moon',
      'respite care': 'clock',
      'home help': 'broom',
      'housekeeping': 'broom',
      'companionship': 'handshake',
      'companionship care': 'handshake',
      'daytime care': 'sun',
      'live in care': 'bed',
      'live-in care': 'bed',
      'health and wellbeing': 'heartbeat',
      'health wellbeing': 'heartbeat',
      'dementia care': 'head-side-virus',
      'cancer care': 'ribbon',
      'parkinsons care': 'hand-rock',
      'parkinson\'s care': 'hand-rock',
      'neurological care': 'brain',
      'palliative care': 'dove',
      'arthritis': 'bone',
      'mobility care': 'bone',
      'diabetes care': 'tint'
    };
    
    const lowerName = serviceName.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return 'heart'; // Default icon
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
                    data-mobile-scrollable="true" /* Add attribute to identify this as a scrollable section */
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
                      style={{ 
                        display: isMegaMenuOpen ? 'block' : 'none',
                        WebkitOverflowScrolling: 'touch' // Enable smooth scrolling on iOS
                      }}
                    >
                      <div className="mega-menu-columns">
                        <div className="mega-menu-column">
                          <h4 className="mega-menu-title">
                            <i className="fas fa-home"></i> Home Care
                          </h4>
                          {servicesLoading ? (
                            <ul>
                              <li className="nav-item">
                                <span className="nav-link">
                                  <i className="fas fa-spinner fa-spin"></i> Loading services...
                                </span>
                              </li>
                            </ul>
                          ) : displayHomeCareServices.length === 0 ? (
                            <ul>
                              <li className="nav-item">
                                <span className="nav-link">No services available</span>
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              {displayHomeCareServices.slice(0, 8).map((service) => (
                                <li key={service.id} className="nav-item">
                                  <Link 
                                    className="nav-link" 
                                    href={`/services/${service.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <i className={`fas fa-${getServiceIcon(service.name)}`}></i> {service.name}
                                  </Link>
                                </li>
                              ))}
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
                          )}
                        </div>
                        <div className="mega-menu-column">
                          <h4 className="mega-menu-title">
                            <i className="fas fa-brain"></i> Specialist Care
                          </h4>
                          {servicesLoading ? (
                            <ul>
                              <li className="nav-item">
                                <span className="nav-link">
                                  <i className="fas fa-spinner fa-spin"></i> Loading services...
                                </span>
                              </li>
                            </ul>
                          ) : displaySpecialistServices.length === 0 ? (
                            <ul>
                              <li className="nav-item">
                                <span className="nav-link">No services available</span>
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              {displaySpecialistServices.slice(0, 7).map((service) => (
                                <li key={service.id} className="nav-item">
                                  <Link 
                                    className="nav-link" 
                                    href={`/services/${service.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <i className={`fas fa-${getServiceIcon(service.name)}`}></i> {service.name}
                                  </Link>
                                </li>
                              ))}
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
                          )}
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
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${isActiveLink('/careers') ? 'active' : ''}`} 
                      href="/careers"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Careers
                    </Link>
                  </li>
                  <li className="nav-item highlighted-menu">
                    <Link 
                      className="nav-link" 
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact Us 
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Header Btn Start */}
              <div className="header-btn">
                <Link href="/contact" className="btn-default">
                  Contact Us 
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
