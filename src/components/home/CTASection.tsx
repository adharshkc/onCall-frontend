import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CTASection = () => {
  return (
    <div className="cta-box bg-section my-5">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* CTA Box Content Start */}
            <div className="cta-box-content">
              {/* Section Title Start */}
              <div className="section-title section-title-center">
                <h3 className="wow fadeInUp">Join us today</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Schedule a personalized tour or <span>care consultation</span>
                </h2>
              </div>
              {/* Section Title End */}

              {/* CTA Box Button Start */}
              <div className="cta-box-btn wow fadeInUp" data-wow-delay="0.2s">
                <Link href="/book-appointment" className="btn-default">
                  Book appointment
                </Link>
              </div>
              {/* CTA Box Button End */}
            </div>
            {/* CTA Box Content End */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {/* CTA Box Image Start */}
            <div className="cta-box-image">
              <figure>
                <Image 
                  src="/images/cta-box-image.png" 
                  alt="CTA Box" 
                  width={800} 
                  height={400}
                />
              </figure>
            </div>
            {/* CTA Box Image End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
