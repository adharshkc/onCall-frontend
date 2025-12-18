'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServiceCopy = () => {
  return (
    <div className="our-services bg-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-12 text-center">
            <div className="section-title mx-auto">
              <h3 className="wow fadeInUp">Our services</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Personalized support for a better <span>quality of life</span>
              </h2>
            </div>

            <div className="section-btn wow fadeInUp mt-4" data-wow-delay="0.2s">
              <Link href="/services" className="btn-default">
                View All Services
              </Link>
            </div>
          </div>
        </div>

        <div className="row service-list">

          {/* -------- SERVICE #1 -------- */}
          <div className="col-lg-6 col-md-6">
            <div className="service-item active wow fadeInUp d-flex flex-column align-items-center justify-content-center" data-wow-delay="0s">
              <div className="service-image">
                <Image src="/images/service-1.jpg" alt="Home care and housing support" width={400} height={300} />
              </div>

              <div className="service-body">

                <div className="service-content text-center">
                  <h4 style={{color:"white"}}>
                    <Link href="/services/home-care-and-housing-support" className="readmore-btn" style={{color:"white"}}>
                      Home care and housing support
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* -------- SERVICE #2 -------- */}
          <div className="col-lg-6 col-md-6">
            <div className="service-item wow fadeInUp d-flex flex-column align-items-center justify-content-center" data-wow-delay="0.2s">
              <div className="service-image">
                <Image src="/images/service-1.jpg" alt="Recruitment Agency" width={400} height={300} />
              </div>

              <div className="service-body">

                <div className="service-content text-center">
                  <h4>
                    <Link href="/services/home-care-and-housing-support" className="readmore-btn" style={{color:"white"}}>
                      Recruitment Agency
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>


          {/* Footer */}
          <div className="col-lg-12">
            <div className="section-footer-text wow fadeInUp" data-wow-delay="1.2s">
              <p>
                <span>Free</span>Discover the care you deserve —{" "}
                <Link href="/book-appointment">book your free visit today!</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceCopy;
