'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from '@/lib/api';
import { Service } from '@/types/service';

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/all-services');
        const servicesData = response.data.data || response.data || [];
        
        // Get active services and limit to 5 for homepage
        const activeServices = servicesData
          .filter((service: Partial<Service>) => service && service.active && service.id && service.name)
          .slice(0, 5);
        
        setServices(activeServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        // Use fallback services
        setServices(getFallbackServices());
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fallback services for homepage
  const getFallbackServices = [
    {
      id: 'h1',
      name: "Home care and housing support",
      description: "We provide comprehensive home care and housing support services to assist with daily living. Our services include personal care (such as washing and dressing), household tasks (like cooking and cleaning), as well as equipment and home adaptations. These services are typically arranged through a local council needs assessment to help individuals remain independent at home. We offer a range of options, including paid carers, meal delivery, safety alarms, and supported living, ensuring flexible, tailored support to meet both temporary and long-term needs.",
      slug: 'home-care-and-housing-support',
      category: 'home-care' as const,
      active: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 'h2',
      name: "Recruitment Agency",
      description: "Oncall Care Service is one of the leading service providers in the Health Care Sector. We are providing high quality care through ethical, efficient & effective staffing solution. Oncall care service has a well sophisticated and dedicated team who offer professional service throughout. We are registered with Care Inspectorate since August 2015 and operate within the confines of National Care Standards & Care Inspectorate Regulations 2009 Oncall Care Service operate 24 hours a day, 7 days a week. We guarantee to only provide the most qualified, robust nurses and  carers to our clients. Reliable person-centred care is at the heart of what we practice. Our services are tailored to meet your individual needs.",
      slug: 'https://www.oncallcareservice.co.uk/nursing-agency-services',
      category: 'specialist-care' as const,
      active: true,
      createdAt: '',
      updatedAt: ''
    },
    // {
    //   id: 'h3',
    //   name: "Healthy Meals & Nutrition Plans",
    //   description: "Isolation & loneliness can be as harmful as physical illness. Our companion services & design to provide emotional support.",
    //   slug: 'nutrition-plans',
    //   category: 'home-care' as const,
    //   active: true,
    //   createdAt: '',
    //   updatedAt: ''
    // },
    // {
    //   id: 'h4',
    //   name: "24/7 Skilled Nursing Care",
    //   description: "Care need don't follow a 9-to-5 schedule, and family caregivers need support too. We offer flexible around-the-clock care",
    //   slug: 'nursing-care',
    //   category: 'specialist-care' as const,
    //   active: true,
    //   createdAt: '',
    //   updatedAt: ''
    // },
    // {
    //   id: 'h5',
    //   name: "Assisted Living Support",
    //   description: "we believe that quality nursing care goes beyond medical assistance—it's about delivering comfort,",
    //   slug: 'assisted-living',
    //   category: 'home-care' as const,
    //   active: true,
    //   createdAt: '',
    //   updatedAt: ''
    // }
  ];

  // Transform services for display
  const displayServices = getFallbackServices.map((service, index) => ({
    id: service.id,
    title: service.name,
    description: service.description || 'Professional care service tailored to your needs.',
    icon: service.icon || `/images/icon-service-${(index % 6) + 1}.svg`,
    image: '/images/service-1.jpg',
    active: index === 0,
    delay: index * 0.2,
    slug: service.slug
  }));

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
          {loading ? (
            <div className="col-12 text-center">
              <div style={{ padding: '60px 0' }}>
                <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
                <p className="mt-3">Loading services...</p>
              </div>
            </div>
          ) : displayServices.length === 0 ? (
            <div className="col-12 text-center">
              <div style={{ padding: '60px 0' }}>
                <i className="fas fa-info-circle fa-2x text-info"></i>
                <p className="mt-3">No services available at the moment.</p>
              </div>
            </div>
          ) : (
            <>
              {displayServices.map((service) => (
                <div key={service.id} className="col-lg-6 col-md-6">
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
                          <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </h3>
                        <p>{service.description}</p>
                      </div>
                      {/* Service Content End */}

                      {/* Service Readmore Button Start */}
                      <div className="service-readmore-btn">
                        <Link href={`/services/${service.slug}`} className="readmore-btn">
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

              {/* <div className="col-lg-4 col-md-6">
                <div className="service-cta-box wow fadeInUp" data-wow-delay="1s">
                 
                  <div className="service-cta-image">
                    <figure>
                      <Image src="/images/service-cta-image.jpg" alt="CTA" width={400} height={250} />
                    </figure>
                  </div>
                  <div className="service-cta-content">
                    <h3>Ready to start your journey to recovery</h3>
                    <Link href="/book-appointment" className="btn-default btn-highlighted">
                      Book appointment
                    </Link>
                  </div>
                </div>
              </div> */}
            </>
          )}

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
