import React from 'react';
import Image from 'next/image';

const OurFeatureSection = () => {
  const features = [
    {
      icon: '/images/icon-feature-1.svg',
      title: 'Healthy Meals & Nutrition Plans',
      description: 'We believe that quality nursing care goes beyond medical assistance.',
      delay: '0.2s'
    },
    {
      icon: '/images/icon-feature-2.svg',
      title: 'Customized Plans',
      description: 'We believe that quality nursing care goes beyond medical assistance.',
      delay: '0.4s'
    },
    {
      icon: '/images/icon-feature-3.svg',
      title: 'Comprehensive Services',
      description: 'We believe that quality nursing care goes beyond medical assistance.',
      delay: '0.6s'
    }
  ];

  return (
    <div className="our-feature bg-section dark-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/* Feature Content Start */}
            <div className="feature-content">
              {/* Section Title Start */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Our feature</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Designed for comfort care <span>and everyday living</span>
                </h2>
              </div>
              {/* Section Title End */}

              {/* Feature Item List Start */}
              <div className="feature-item-list">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item wow fadeInUp" data-wow-delay={feature.delay}>
                    <div className="feature-item-header">
                      <div className="icon-box">
                        <Image src={feature.icon} alt="" width={60} height={60} />
                      </div>
                      <div className="feature-item-title">
                        <h3>{feature.title}</h3>
                      </div>
                    </div>
                    <div className="feature-item-content">
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Feature Item List End */}
            </div>
            {/* Feature Content End */}
          </div>

          <div className="col-lg-6">
            {/* Our Feature images Start */}
            <div className="our-feature-images">
              {/* Feature image Box 1 Start */}
              <div className="feature-image-box-1">
                {/* Feature image Start */}
                <div className="feature-image">
                  <figure className="image-anime reveal">
                    <Image src="/images/feature-image-1.jpg" alt="" width={400} height={300} />
                  </figure>
                </div>
                {/* Feature image End */}

                {/* Review Box Start */}
                <div className="review-box">
                  {/* Review Images Start */}
                  <div className="review-images">
                    <div className="review-image">
                      <figure className="image-anime reveal">
                        <Image src="/images/author-1.jpg" alt="" width={50} height={50} />
                      </figure>
                    </div>
                    <div className="review-image">
                      <figure className="image-anime reveal">
                        <Image src="/images/author-2.jpg" alt="" width={50} height={50} />
                      </figure>
                    </div>
                    <div className="review-image add-more">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  {/* Review Images End */}

                  {/* Review Content Start */}
                  <div className="review-content">
                    <div className="review-rating-star">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <span>4.9</span>
                    </div>
                    <div className="review-rating-content">
                      <p><span className="counter">4.9</span> / 5 Ratings</p>
                    </div>
                  </div>
                  {/* Review Content End */}
                </div>
                {/* Review Box End */}
              </div>
              {/* Feature image Box 1 End */}

              {/* Feature image Box 2 Start */}
              <div className="feature-image-box-2">
                {/* Year Experience Circle Start */}
                <div className="year-experience-circle">
                  <Image src="/images/year-experience-circle.svg" alt="" width={120} height={120} />

                  <div className="year-experience-counter">
                    <h2><span className="counter">25</span>+</h2>
                  </div>
                </div>
                {/* Year Experience Circle End */}

                {/* Feature Image Start */}
                <div className="feature-image">
                  <figure className="image-anime reveal">
                    <Image src="/images/feature-image-2.jpg" alt="" width={300} height={400} />
                  </figure>
                </div>
                {/* Feature Image End */}
              </div>
              {/* Feature image Box 2 End */}
            </div>
            {/* Our Feature images End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatureSection;
