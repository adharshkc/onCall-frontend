import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const OurPricingSection = () => {
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic plan',
      price: '$29.00',
      period: '/monthly',
      features: [
        '24/7 Professional Nursing Support',
        'Nutritious Daily Meals & Snacks',
        'Wellness & Fitness Programs',
        'Personalized Care Plans'
      ],
      highlighted: false,
      delay: '0s'
    },
    {
      id: 2,
      name: 'Standard plan',
      price: '$39.00',
      period: '/monthly',
      features: [
        '24/7 Professional Nursing Support',
        'Nutritious Daily Meals & Snacks',
        'Wellness & Fitness Programs',
        'Personalized Care Plans'
      ],
      highlighted: true,
      delay: '0.2s'
    },
    {
      id: 3,
      name: 'Premium plan',
      price: '$49.00',
      period: '/monthly',
      features: [
        '24/7 Professional Nursing Support',
        'Nutritious Daily Meals & Snacks',
        'Wellness & Fitness Programs',
        'Personalized Care Plans'
      ],
      highlighted: false,
      delay: '0.4s'
    }
  ];

  const benefits = [
    {
      icon: '/images/icon-pricing-benefit-1.svg',
      text: 'Get 30 day free trial'
    },
    {
      icon: '/images/icon-pricing-benefit-2.svg',
      text: 'No any hidden fees pay'
    },
    {
      icon: '/images/icon-pricing-benefit-3.svg',
      text: 'You can cancel anytime'
    }
  ];

  return (
    <div className="our-pricing">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Pricing plan</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Senior care plans that offer <span>real value</span>
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="col-lg-4 col-md-6">
              {/* Pricing Box Start */}
              <div className={`pricing-box ${plan.highlighted ? 'highlighted-box' : ''} wow fadeInUp`} data-wow-delay={plan.delay}>
                {/* Pricing Header Start */}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                </div>
                {/* Pricing Header End */}

                {/* Pricing Price Start */}
                <div className="pricing-price">
                  <h2>{plan.price}<sub>{plan.period}</sub></h2>
                </div>
                {/* Pricing Price End */}

                {/* Pricing Box Body Start */}
                <div className="pricing-body">
                  <h3>What included feature:</h3>
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {/* Pricing Box Body End */}

                {/* Pricing Button Start */}
                <div className="pricing-btn">
                  <Link href="/contact" className={`btn-default ${plan.highlighted ? 'btn-highlighted' : ''}`}>
                    get started
                  </Link>
                </div>
                {/* Pricing Button End */}
              </div>
              {/* Pricing Box End */}
            </div>
          ))}

          <div className="col-lg-12">
            {/* Pricing Benefit List Start */}
            <div className="pricing-benefit-list wow fadeInUp" data-wow-delay="0.6s">
              <ul>
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <Image src={benefit.icon} alt="" width={24} height={24} />
                    {benefit.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Pricing Benefit List End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPricingSection;
