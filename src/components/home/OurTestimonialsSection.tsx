import Image from 'next/image';

const OurTestimonialsSection = () => {
  return (
    <div className="our-testimonials">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* Testimonials Content Start */}
            <div className="testimonials-content">
              {/* Section Title Start */}
              <div className="section-title">
                <h3>our testimonials</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">Real voices. real care. real <span>peace of mind.</span></h2>
                <p>From compassionate care to heartfelt connections, their stories reflect the trust and comfort we strive to provide every day.</p>
              </div>
              {/* Section Title End */}

              <div className="testimonials-counter-box">
                <h2><span className="counter">99</span>%</h2>
                <p>Happy to adjust or finish up whatever you need!</p>
              </div>
            </div>
            {/* Testimonials Content End */}
          </div>

          <div className="col-lg-6">
            {/* Testimonial Slider Start */}
            <div className="testimonial-slider">
              <div className="swiper">
                <div className="swiper-wrapper" data-cursor-text="Drag">
                  {/* Testimonial Slide Start */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="testimonial-header">
                        <div className="testimonial-company-logo">
                          <Image src="/images/company-logo-1.svg" alt="company logo" width={150} height={50} />
                        </div>
                        <div className="testimonial-quote">
                          <Image src="/images/testimonial-quote.svg" alt="quote" width={40} height={40} />
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>After my father&apos;s surgery, we were overwhelmed and unsure how to manage his recovery at home. The nurse from your team was a godsend - so kind, patient, and knowledgeable. She made sure he was comfortable, managed his medications & even helped lift his spirits.</p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-image">
                          <figure className="image-anime">
                            <Image src="/images/author-1.jpg" alt="author" width={50} height={50} />
                          </figure>
                        </div>
                        <div className="author-content">
                          <h3>Herman Miller</h3>
                          <p>Lorem ipsum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial Slide End */}

                  {/* Testimonial Slide Start */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="testimonial-header">
                        <div className="testimonial-company-logo">
                          <Image src="/images/company-logo-1.svg" alt="company logo" width={150} height={50} />
                        </div>
                        <div className="testimonial-quote">
                          <Image src="/images/testimonial-quote.svg" alt="quote" width={40} height={40} />
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>After my father&apos;s surgery, we were overwhelmed and unsure how to manage his recovery at home. The nurse from your team was a godsend - so kind, patient, and knowledgeable. She made sure he was comfortable, managed his medications & even helped lift his spirits.</p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-image">
                          <figure className="image-anime">
                            <Image src="/images/author-2.jpg" alt="author" width={50} height={50} />
                          </figure>
                        </div>
                        <div className="author-content">
                          <h3>Margaret Ellis</h3>
                          <p>Lorem ipsum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial Slide End */}

                  {/* Testimonial Slide Start */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="testimonial-header">
                        <div className="testimonial-company-logo">
                          <Image src="/images/company-logo-1.svg" alt="company logo" width={150} height={50} />
                        </div>
                        <div className="testimonial-quote">
                          <Image src="/images/testimonial-quote.svg" alt="quote" width={40} height={40} />
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>After my father&apos;s surgery, we were overwhelmed and unsure how to manage his recovery at home. The nurse from your team was a godsend - so kind, patient, and knowledgeable. She made sure he was comfortable, managed his medications & even helped lift his spirits.</p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-image">
                          <figure className="image-anime">
                            <Image src="/images/author-3.jpg" alt="author" width={50} height={50} />
                          </figure>
                        </div>
                        <div className="author-content">
                          <h3>Eleanor Brooks</h3>
                          <p>Lorem ipsum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial Slide End */}
                </div>
                <div className="testimonial-btn">
                  <div className="testimonial-button-prev"></div>
                  <div className="testimonial-button-next"></div>
                </div>
              </div>
            </div>
            {/* Testimonial Slider End */}
          </div>

          <div className="col-lg-12">
            {/* Comapany Support Slider Start */}
            <div className="company-supports-slider">
              <div className="swiper">
                <div className="swiper-wrapper">
                  {/* Company Support Logo Start */}
                  <div className="swiper-slide">
                    <div className="company-supports-logo">
                      <Image src="/images/company-supports-logo-1.svg" alt="company support 1" width={130} height={40} />
                    </div>
                  </div>
                  {/* Comapany Support Logo End */}

                  {/* Company Support Logo Start */}
                  <div className="swiper-slide">
                    <div className="company-supports-logo">
                      <Image src="/images/company-supports-logo-2.svg" alt="company support 2" width={130} height={40} />
                    </div>
                  </div>
                  {/* Comapany Support Logo End */}

                  {/* Company Support Logo Start */}
                  <div className="swiper-slide">
                    <div className="company-supports-logo">
                      <Image src="/images/company-supports-logo-3.svg" alt="company support 3" width={130} height={40} />
                    </div>
                  </div>
                  {/* Comapany Support Logo End */}

                  {/* Company Support Logo Start */}
                  <div className="swiper-slide">
                    <div className="company-supports-logo">
                      <Image src="/images/company-supports-logo-1.svg" alt="company support 1" width={130} height={40} />
                    </div>
                  </div>
                  {/* Comapany Support Logo End */}

                  {/* Company Support Logo Start */}
                  <div className="swiper-slide">
                    <div className="company-supports-logo">
                      <Image src="/images/company-supports-logo-2.svg" alt="company support 2" width={130} height={40} />
                    </div>
                  </div>
                  {/* Comapany Support Logo End */}

                  {/* Company Support Logo Start */}
                  <div className="swiper-slide">
                    <div className="company-supports-logo">
                      <Image src="/images/company-supports-logo-3.svg" alt="company support 3" width={130} height={40} />
                    </div>
                  </div>
                  {/* Comapany Support Logo End */}
                </div>
              </div>
            </div>
            {/* Comapany Support Slider End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTestimonialsSection;
