"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServicesSection = () => {
  return (
    <div className="our-services bg-section">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            {/* Section Title Start */}
            <div className="section-title">
              <h3 className="wow fadeInUp">Our services</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Personalized support for a better <span>quality of life</span>
              </h2>
            </div>
            {/* Section Title End */}
          </div>

          <div className="col-lg-6">
            {/* Section Button Start */}
            <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
              <Link href="/services" className="btn-default">
                View All Services
              </Link>
            </div>
            {/* Section Button End */}
          </div>
        </div>

        <div className="row service-list">
          <div className="col-lg-6 col-md-6">
            <div className="service-item active wow fadeInUp" data-wow-delay="0s">
              <div className="service-image">
                <Image
                  src="/images/service-1.jpg"
                  alt="Home care and housing support"
                  width={400}
                  height={300}
                />
              </div>
              <div className="service-body">
                <div className="icon-box">
                  <Image
                    src="/images/icon-service-1.svg"
                    alt="Home care icon"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="service-content">
                  <h3>
                    <Link href="/services/">
                      Home care and housing support
                    </Link>
                  </h3>
                  <p>
                    We provide comprehensive home care and housing support services to assist with daily living. Our services include personal care (such as washing and dressing), household tasks (like cooking and cleaning), as well as equipment and home adaptations. These services are typically arranged through a local council needs assessment to help individuals remain independent at home. We offer a range of options, including paid carers, meal delivery, safety alarms, and supported living, ensuring flexible, tailored support to meet both temporary and long-term needs.
                  </p>
                </div>
                <div className="service-readmore-btn">
                  <Link
                    href="/services/"
                    className="readmore-btn"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
              <div className="service-image">
                <Image
                  src="/images/service-1.jpg"
                  alt="Recruitment Agency"
                  width={400}
                  height={300}
                />
              </div>
              <div className="service-body">
                <div className="icon-box">
                  <Image
                    src="/images/icon-service-2.svg"
                    alt="Recruitment icon"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="service-content">
                  <h3>
                    <a
                      href="/staffing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Recruitment Agency
                    </a>
                  </h3>
                  <p>
                    Oncall Care Service is one of the leading service providers in the Health Care Sector. We are providing high quality care through ethical, efficient & effective staffing solution. Oncall care service has a well sophisticated and dedicated team who offer professional service throughout. We are registered with Care Inspectorate since August 2015 and operate within the confines of National Care Standards & Care Inspectorate Regulations 2009 Oncall Care Service operate 24 hours a day, 7 days a week. We guarantee to only provide the most qualified, robust nurses and  carers to our clients. Reliable person-centred care is at the heart of what we practice. Our services are tailored to meet your individual needs.
                  </p>
                </div>
                <div className="service-readmore-btn">
                  <a
                    href="/staffing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="readmore-btn"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            {/* Section Footer Text Start*/}
            <div className="section-footer-text wow fadeInUp" data-wow-delay="1.2s">
              <p>
                <span>Free</span>Discover the care you deserve - {" "}
                <Link href="/book-appointment">book your free visit today!</Link>
              </p>
            </div>
            {/* Section Footer Text End*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
