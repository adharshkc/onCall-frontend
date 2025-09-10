import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Social & Recreational Activities",
      description: "Daily programs including games, crafts, music, fitness, and outings Daily programs including games, crafts, music.",
      icon: "/images/icon-service-1.svg",
      image: "/images/service-1.jpg",
      active: true,
      delay: 0
    },
    {
      id: 2,
      title: "Memory & Dementia Care",
      description: "Nutritious, chef-prepared meals tailored to individual dietary needs. Nutritious, chef-prepared meals tailored.",
      icon: "/images/icon-service-2.svg",
      image: "/images/service-1.jpg",
      active: false,
      delay: 0.2
    },
    {
      id: 3,
      title: "Healthy Meals & Nutrition Plans",
      description: "Isolation & loneliness can be as harmful as physical illness. Our companion services & design to provide emotional support.",
      icon: "/images/icon-service-3.svg",
      image: "/images/service-1.jpg",
      active: false,
      delay: 0.4
    },
    {
      id: 4,
      title: "24/7 Skilled Nursing Care",
      description: "Care need don't follow a 9-to-5 schedule, and family caregivers need support too. We offer flexible around-the-clock care",
      icon: "/images/icon-service-4.svg",
      image: "/images/service-1.jpg",
      active: false,
      delay: 0.6
    },
    {
      id: 5,
      title: "Assisted Living Support",
      description: "we believe that quality nursing care goes beyond medical assistance—it's about delivering comfort,",
      icon: "/images/icon-service-5.svg",
      image: "/images/service-1.jpg",
      active: false,
      delay: 0.8
    }
  ];

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
          {services.map((service) => (
            <div key={service.id} className="col-lg-4 col-md-6">
              {/* Service Item Start */}
              <div className={`service-item ${service.active ? 'active' : ''} wow fadeInUp`} data-wow-delay={service.delay}>
                {/* Service Image Start */}
                <div className="service-image">
                  <Image src={service.image} alt={service.title} width={400} height={300} />
                </div>
                {/* Service Image End */}

                {/* Service Body Start */}
                <div className="service-body">
                  {/* Icon Box Start */}
                  <div className="icon-box">
                    <Image src={service.icon} alt="" width={60} height={60} />
                  </div>
                  {/* Icon Box End */}

                  {/* Service Content Start */}
                  <div className="service-content">
                    <h3>
                      <Link href="/services/service-detail">{service.title}</Link>
                    </h3>
                    <p>{service.description}</p>
                  </div>
                  {/* Service Content End */}

                  {/* Service Readmore Button Start */}
                  <div className="service-readmore-btn">
                    <Link href="/services/service-detail" className="readmore-btn">
                      Learn more
                    </Link>
                  </div>
                  {/* Service Readmore Button End */}
                </div>
                {/* Service Body End */}
              </div>
              {/* Service Item End */}
            </div>
          ))}

          <div className="col-lg-4 col-md-6">
            {/* Service CTA Box Start */}
            <div className="service-cta-box wow fadeInUp" data-wow-delay="1s">
              {/* Service CTA Image Start */}
              <div className="service-cta-image">
                <figure>
                  <Image src="/images/service-cta-image.jpg" alt="CTA" width={400} height={250} />
                </figure>
              </div>
              {/* Service CTA Image End */}

              {/* Service CTA Content Start */}
              <div className="service-cta-content">
                <h3>Ready to start your journey to recovery</h3>
                <Link href="/book-appointment" className="btn-default btn-highlighted">
                  Book appointment
                </Link>
              </div>
              {/* Service CTA Content End */}
            </div>
            {/* Service CTA Box End */}
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
