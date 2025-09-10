import React from 'react';
import Image from 'next/image';

const OurFactsSection = () => {
  return (
    <div className="our-facts">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Our facts</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Our senior care impact in <span>real numbers</span>
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {/* Our Fact Box Start */}
            <div className="our-fact-box">
              {/* Fact Box 1 Start */}
              <div className="fact-box-1">
                {/* Fact Item Start */}
                <div className="fact-item">
                  <div className="icon-box">
                    <Image src="/images/icon-fact-item-1.svg" alt="" width={60} height={60} />
                  </div>
                  <div className="fact-item-content">
                    <h2><span className="counter">15</span>K+</h2>
                    <p>Happy Patients</p>
                  </div>
                </div>
                {/* Fact Item End */}

                {/* Fact Image Start */}
                <div className="fact-image">
                  <figure className="image-anime reveal">
                    <Image src="/images/fact-image-1.jpg" alt="" width={400} height={300} />
                  </figure>
                </div>
                {/* Fact Image End */}
              </div>
              {/* Fact Box 1 End */}

              {/* Fact Box 2 Start */}
              <div className="fact-box-2">
                {/* Fact Image Start */}
                <div className="fact-image">
                  <figure className="image-anime reveal">
                    <Image src="/images/fact-image-2.jpg" alt="" width={400} height={300} />
                  </figure>
                </div>
                {/* Fact Image End */}
              </div>
              {/* Fact Box 2 End */}

              {/* Fact Box 3 Start */}
              <div className="fact-box-3">
                {/* Fact Image Start */}
                <div className="fact-image">
                  <figure className="image-anime reveal">
                    <Image src="/images/fact-image-3.jpg" alt="" width={400} height={300} />
                  </figure>
                </div>
                {/* Fact Image End */}

                {/* Fact Image Content Start */}
                <div className="fact-image-content">
                  {/* Fact Item Start */}
                  <div className="fact-item fact-dark-box">
                    <div className="icon-box">
                      <Image src="/images/icon-fact-item-2.svg" alt="" width={60} height={60} />
                    </div>
                    <div className="fact-item-content">
                      <h2><span className="counter">25</span>Y+</h2>
                      <p>Year Of Experience</p>
                    </div>
                  </div>
                  {/* Fact Item End */}

                  {/* Fact Image Start */}
                  <div className="fact-image">
                    <figure className="image-anime reveal">
                      <Image src="/images/fact-image-4.jpg" alt="" width={300} height={200} />
                    </figure>
                  </div>
                  {/* Fact Image End */}
                </div>
                {/* Fact Image Content End */}
              </div>
              {/* Fact Box 3 End */}
            </div>
            {/* Our Fact Box End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFactsSection;
