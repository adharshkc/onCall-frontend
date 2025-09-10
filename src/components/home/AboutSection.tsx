import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* About Us Images Start */}
            <div className="about-us-images">
              {/* About Us Image Start */}
              <div className="about-image-1">
                <figure className="image-anime">
                  <Image src="/images/about-us-image-1.jpg" alt="About Us" width={350} height={400} />
                </figure>
              </div>
              {/* About Us Image End */}

              {/* About Us Image Start */}
              <div className="about-image-2">
                <figure className="image-anime">
                  <Image src="/images/about-us-image-2.jpg" alt="About Us" width={250} height={300} />
                </figure>
              </div>
              {/* About Us Image End */}
            </div>
            {/* About Us Images End */}
          </div>

          <div className="col-lg-6">
            {/* About Us Content Start */}
            <div className="about-us-content">
              {/* Section Title Start */}
              <div className="section-title">
                <h3 className="wow fadeInUp">About us</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Dedicated to quality elderly care with compassion <span>and respect always</span>
                </h2>
              </div>
              {/* Section Title End */}

              {/* About Us Body Start */}
              <div className="about-us-body">
                <div className="about-us-circle">
                  <Link href="/about">
                    <Image src="/images/about-us-circle.svg" alt="About Circle" width={100} height={100} />
                  </Link>
                </div>
                <div className="about-body-content wow fadeInUp" data-wow-delay="0.2s">
                  <p>
                    We believe that aging should be embraced with dignity right level of care. 
                    That&apos;s why we provide more assistance we offer welcoming environment.
                  </p>
                </div>
              </div>
              {/* About Us Body End */}

              {/* About Us List Start */}
              <div className="about-us-list wow fadeInUp" data-wow-delay="0.4s">
                <ul>
                  <li>Personalized Care for Each</li>
                  <li>Memory & Dementia Care</li>
                </ul>
              </div>
              {/* About Us List End */}
            </div>
            {/* About Us Content End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
