'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const FAQSection = () => {
  const [activeItem, setActiveItem] = useState(1); // Default to second item being open

  const faqItems = [
    {
      id: 0,
      question: "Q1. What types of care services do you offer?",
      answer: "We offer a variety of care options, including assisted living, memory care, services, and palliative care. Our care plans are customized to meet the unique needs of each resident, ensuring that they receive."
    },
    {
      id: 1,
      question: "Q2. How do you ensure the safety of residents?",
      answer: "We offer a variety of care options, including assisted living, memory care, services, and palliative care. Our care plans are customized to meet the unique needs of each resident, ensuring that they receive."
    },
    {
      id: 2,
      question: "Q3. Can I schedule a tour of your facility?",
      answer: "We offer a variety of care options, including assisted living, memory care, services, and palliative care. Our care plans are customized to meet the unique needs of each resident, ensuring that they receive."
    },
    {
      id: 3,
      question: "Q4. How do you personalize care for each resident?",
      answer: "We offer a variety of care options, including assisted living, memory care, services, and palliative care. Our care plans are customized to meet the unique needs of each resident, ensuring that they receive."
    },
    {
      id: 4,
      question: "Q5. What types of activities are available for residents?",
      answer: "We offer a variety of care options, including assisted living, memory care, services, and palliative care. Our care plans are customized to meet the unique needs of each resident, ensuring that they receive."
    }
  ];

  const toggleAccordion = (id: number) => {
    setActiveItem(activeItem === id ? -1 : id);
  };

  return (
    <div className="our-faqs">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/* FAQs Content Start */}
            <div className="faqs-content">
              {/* Section Title Start */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Frequently asked questions</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Get the answers you need about <span>our senior care</span>
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Reach out today to learn more about our personalized services, schedule a free visit, or speak with a care specialist.
                </p>
              </div>
              {/* Section Title End */}

              {/* Our Faqs Button Start */}
              <div className="our-faqs-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link href="/contact" className="btn-default">Contact Us Now</Link>
              </div>
              {/* Our Faqs Button End */}
            </div>
            {/* FAQs Content End */}
          </div>

          <div className="col-lg-6">
            {/* FAQ Accordion Start */}
            <div className="faq-accordion" id="accordion">
              {faqItems.map((item, index) => (
                <div key={item.id} className={`accordion-item wow fadeInUp`} data-wow-delay={`${index * 0.2}s`}>
                  <h2 className="accordion-header" id={`heading${item.id + 1}`}>
                    <button
                      className={`accordion-button ${activeItem === item.id ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={activeItem === item.id}
                      aria-controls={`collapse${item.id + 1}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${item.id + 1}`}
                    className={`accordion-collapse collapse ${activeItem === item.id ? 'show' : ''}`}
                    aria-labelledby={`heading${item.id + 1}`}
                    data-bs-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* FAQ Accordion End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
