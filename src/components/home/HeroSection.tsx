'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from '@/lib/api';
import { API_URL } from '@/config/api';

interface Service {
  id: string;
  name: string;
  description?: string;
  slug: string;
  category: 'home-care' | 'specialist-care';
  icon?: string;
}

interface SearchResults {
  postcode: string;
  services: Array<{
    service: Service;
    location: {
      name: string;
      county?: string;
    };
    postcode: string;
  }>;
  nearby?: Array<{
    service: Service;
    location: {
      name: string;
      county?: string;
    };
    postcode: string;
  }>;
}

const HeroSection = () => {
  const [zipcode, setZipcode] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!zipcode.trim()) {
      setSearchError('Please enter a postcode');
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResults(null);

    try {
      // Try to search for services by postcode using the existing API
      const response = await axios.post(`${API_URL}/check-availability`, {
        postcode: zipcode.trim().toUpperCase(),
        includeNearby: true
      });

     console.log(response.data) 
      setSearchResults(response.data);
      setShowResults(true);
    } catch (err) {
      console.error('Search failed:', err);
      // Fallback to mock data if API is not available
      const mockResults: SearchResults = {
        postcode: zipcode.trim().toUpperCase(),
        services: [
          {
            service: {
              id: 'mock1',
              name: 'Domiciliary Care',
              description: 'Professional care services in your home',
              slug: 'domiciliary-care',
              category: 'home-care',
              icon: '/images/icon-care-1.svg'
            },
            location: { name: 'Care Center', county: 'Local Area' },
            postcode: zipcode.trim().toUpperCase()
          },
          {
            service: {
              id: 'mock2',
              name: 'Memory & Dementia Care',
              description: 'Specialized dementia and memory care services',
              slug: 'dementia-care',
              category: 'specialist-care',
              icon: '/images/icon-care-2.svg'
            },
            location: { name: 'Specialist Care Unit', county: 'Local Area' },
            postcode: zipcode.trim().toUpperCase()
          }
        ]
      };
      setSearchResults(mockResults);
      setShowResults(true);
    } finally {
      setIsSearching(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setSearchResults(null);
    setSearchError(null);
  };
  return (
    <div className="hero bg-section dark-section">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-12">
            {/* Hero Section Start */}
            <div className="hero-section">
              {/* Hero Content Start */}
              <div className="hero-content">
                {/* Hero Content Box Start */}
                <div className="hero-content-box">
                  {/* Section Title Start */}
                  <div className="section-title">
                    <h3 className="wow fadeInUp">Discover the power of premium</h3>
                    <h1 className="text-anime-style-2" data-cursor="-opaque">
                      Delivering compassionate, memorable care in the comfort of your own home — because your home is your life.
                    </h1>
                  </div>
                  {/* Section Title End */}

                  {/* Hero Content Circle Start */}
                  <div className="hero-content-circle">
                    <p className="wow fadeInUp" data-wow-delay="0.2s">
                      At our senior care community, we understand that aging is a deeply personal journey. 
                      That&apos;s why we focus on a holistic, resident-centered care that nurtures the mind, body, and spirit.
                    </p>
                    
                    {/* Search Box Start */}
                    <div className="search-box-container wow fadeInUp" data-wow-delay="0.3s" style={{ marginBottom: '20px' }}>
                      <div className="search-box" style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        padding: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '15px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        <input
                          type="text"
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your postcode (e.g., M1 1AA)"
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '10px',
                            fontSize: '16px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: '#333',
                            outline: 'none'
                          }}
                        />
                        <button
                          onClick={handleSearch}
                          disabled={isSearching}
                          style={{
                            padding: '12px 24px',
                            backgroundColor: '#FF6B35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: isSearching ? 'not-allowed' : 'pointer',
                            opacity: isSearching ? 0.7 : 1,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isSearching ? 'Searching...' : 'Search Services'}
                        </button>
                      </div>
                      
                      {/* Search Error */}
                      {searchError && (
                        <div style={{
                          marginTop: '10px',
                          padding: '10px',
                          backgroundColor: 'rgba(255, 0, 0, 0.1)',
                          border: '1px solid rgba(255, 0, 0, 0.3)',
                          borderRadius: '8px',
                          color: '#d63384'
                        }}>
                          {searchError}
                        </div>
                      )}
                    </div>
                    {/* Search Box End */}

                    <Link href="/book-appointment" className="book-appointment-circle">
                      <Image src="/images/book-appointment-circle.svg" alt="Book Appointment" width={120} height={120} />
                    </Link>
                  </div>
                  {/* Hero Content Circle End */}
                </div>
                {/* Hero Content Box End */}

                {/* Working Hours Box Start */}
                <div className="working-hours-box">
                  {/* Working Hour Image Start */}
                  <div className="working-hour-image">
                    <figure className="image-anime">
                      <Image src="/images/hero-content-image.jpg" alt="Hero Content" width={400} height={300} />
                    </figure>
                  </div>
                  {/* Working Hour Image End */}

                  {/* Working Hours Item Start */}
                  <div className="working-hours-item wow fadeInUp" data-wow-delay="0.4s">
                    <div className="working-hours-header">
                      <h3>Working Hours</h3>
                      <p>We believe that aging should be embraced with dignity, joy, and the right level.</p>
                    </div>
                    <div className="working-hours-body">
                      <ul>
                        <li>Monday - Friday <span>8:00 AM - 8:00 PM</span></li>
                        <li>Saturday - Sunday <span>Closed</span></li>
                      </ul>
                    </div>
                  </div>
                  {/* Working Hours Item End */}
                </div>
                {/* Working Hours Box End */}
              </div>

              {/* Hero Image Start */}
              <div className="hero-image">
                <figure className="image-anime">
                  <Image src="/images/hero-image.jpg" alt="Hero" width={600} height={700} priority />
                </figure>
              </div>
              {/* Hero Image End */}
            </div>
            {/* Hero Section End */}

            {/* Search Results Modal/Overlay Start */}
            {showResults && searchResults && (
              <div 
                className="search-results-overlay"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}
                onClick={closeResults}
              >
                <div 
                  className="search-results-modal"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '30px',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    position: 'relative'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeResults}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '20px',
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    ×
                  </button>

                  {/* Results Header */}
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                      Available Services for {searchResults?.zipcode}
                    </h2>
                    <p style={{ color: '#666', fontSize: '16px' }}>
                      {searchResults?.data?.length + (searchResults?.length || 0)} services found in your area
                    </p>
                  </div>

                  {/* Direct Services */}
                  {searchResults?.data?.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                        Direct Services in Your Area
                      </h3>
                      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {searchResults?.data?.map((result, index) => (
                          <div
                            key={index}
                            style={{
                              border: '2px solid #FF6B35',
                              borderRadius: '15px',
                              padding: '20px',
                              backgroundColor: '#fff'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                              {result?.image && (
                                <Image
                                  src={result?.image}
                                  alt=""
                                  width={50}
                                  height={70}
                                  style={{ borderRadius: '8px' }}
                                />
                              )}
                              <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                  {result?.name}
                                </h4>
                                {result?.description && (
                                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                    {result?.description}
                                  </p>
                                )}
                                <Link
                                  href={`/services/${result?.slug}`}
                                  style={{
                                    display: 'inline-block',
                                    marginTop: '12px',
                                    padding: '8px 16px',
                                    backgroundColor: '#FF6B35',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                  }}
                                >
                                  Learn More
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nearby Services */}
                  {searchResults.nearby && searchResults.nearby.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                        Nearby Services
                      </h3>
                      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {searchResults.nearby.map((result, index) => (
                          <div
                            key={index}
                            style={{
                              border: '1px solid #ddd',
                              borderRadius: '15px',
                              padding: '20px',
                              backgroundColor: '#f8f9fa'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                              {result.service.icon && (
                                <Image 
                                  src={result.service.icon} 
                                  alt="" 
                                  width={50} 
                                  height={50}
                                  style={{ borderRadius: '8px' }}
                                />
                              )}
                              <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                  {result.service.name}
                                </h4>
                                {result.service.description && (
                                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                    {result.service.description}
                                  </p>
                                )}
                                <div style={{ fontSize: '13px', color: '#888' }}>
                                  <div><strong>Area:</strong> {result.location.name}</div>
                                  {result.location.county && (
                                    <div><strong>County:</strong> {result.location.county}</div>
                                  )}
                                  <div><strong>Postcode:</strong> {result.postcode}</div>
                                </div>
                                <Link 
                                  href={`/services/${result.service.slug}`}
                                  style={{
                                    display: 'inline-block',
                                    marginTop: '12px',
                                    padding: '8px 16px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                  }}
                                >
                                  Learn More
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Services Found */}
                  {searchResults?.services?.length === 0 && (!searchResults?.nearby || searchResults?.nearby?.length === 0) && (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                        No services available
                      </h3>
                      <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>
                        No services are currently available for postcode {searchResults.postcode}.
                      </p>
                      <Link 
                        href="/contact"
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          backgroundColor: '#FF6B35',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '10px',
                          fontSize: '16px',
                          fontWeight: '600'
                        }}
                      >
                        Contact Us
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Search Results Modal/Overlay End */}
          </div>

          <div className="col-lg-12">
            {/* Hero Benefit List Start */}
            <div className="hero-benefit-list wow fadeInUp" data-wow-delay="0.6s">
              {/* Hero Benefit Item Start */}
              <div className="hero-benefit-item">
                <div className="icon-box">
                  <Image src="/images/icon-hero-benefit-1.svg" alt="" width={60} height={60} />
                </div>
                <div className="hero-benefit-item-content">
                  <h3>Family-Like Bonds, Not Just Staff and Residents</h3>
                </div>
              </div>
              {/* Hero Benefit Item End */}

              {/* Hero Benefit Item Start */}
              <div className="hero-benefit-item">
                <div className="icon-box">
                  <Image src="/images/icon-hero-benefit-2.svg" alt="" width={60} height={60} />
                </div>
                <div className="hero-benefit-item-content">
                  <h3>Comfort That Never Compromises on Dignity</h3>
                </div>
              </div>
              {/* Hero Benefit Item End */}

              {/* Hero Benefit Item Start */}
              <div className="hero-benefit-item">
                <div className="icon-box">
                  <Image src="/images/icon-hero-benefit-3.svg" alt="" width={60} height={60} />
                </div>
                <div className="hero-benefit-item-content">
                  <h3>Every Detail Designed with Seniors in Mind</h3>
                </div>
              </div>
              {/* Hero Benefit Item End */}
            </div>
            {/* Hero Benefit List End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
