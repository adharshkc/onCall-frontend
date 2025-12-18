import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const WhyChooseSection = () => {
  const features = [
    {
      icon: '/images/icon-why-choose-1.svg',
      title: 'Compassionate & Experienced Staff',
      description: 'Our modern, fully-equipped facility is designed with senior comfort and safety in mind. With advanced health monitoring.',
      delay: '0.2s'
    },
    {
      icon: '/images/icon-why-choose-2.svg',
      title: 'State-of-the-Art Facilities and Services',
      description: 'Our modern, fully-equipped facility is designed with senior comfort and safety in mind. With advanced health monitoring.',
      delay: '0.4s'
    },
    {
      icon: '/images/icon-why-choose-3.svg',
      title: 'Holistic Approach to Senior Well-Being',
      description: 'Our modern, fully-equipped facility is designed with senior comfort and safety in mind. With advanced health monitoring.',
      delay: '0.6s'
    }
  ];

  return (
    <div className="why-choose-us">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* Why Choose Content Start */}
            <div className="why-choose-content">
              {/* Section Title Start */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Why On Call</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  A community where seniors thrive, <span>not just survive</span>
                </h2>
              </div>
              {/* Section Title End */}

              {/* Why Choose Item List Start */}
              <div className="why-choose-item-list">
                {features.map((feature, index) => (
                  <div key={index} className="why-choose-item wow fadeInUp" data-wow-delay={feature.delay}>
                    <div className="icon-box">
                      <Image src={feature.icon} alt="" width={60} height={60} />
                    </div>
                    <div className="why-choose-item-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Why Choose Item List End */}
            </div>
            {/* Why Choose Content End */}
          </div>

          <div className="col-lg-6">
            {/* Why Choose Images Start */}
            <div className="why-choose-images">
              {/* Why Choose Image 1 Start */}
              <div className="why-choose-img-1">
                <figure className="image-anime reveal">
                  <Image src="/images/why-choose-img-1.jpg" alt="Why Choose Us" width={400} height={500} />
                </figure>

                {/* Contact Us Circle Start */}
                <div className="contact-us-circle">
                  <Link href="/contact">
                    <Image src="/images/contact-us-circle.svg" alt="Contact Circle" width={100} height={100} />
                  </Link>
                </div>
                {/* Contact Us Circle End */}
              </div>
              {/* Why Choose Image 1 End */}

              {/* Why Choose Image 2 Start */}
              <div className="why-choose-img-2">
                <figure className="image-anime">
                  <Image src="/images/why-choose-img-2.jpg" alt="Why Choose Us" width={300} height={350} />
                </figure>
              </div>
              {/* Why Choose Image 2 End */}
            </div>
            {/* Why Choose Images End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
