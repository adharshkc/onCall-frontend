'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
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
