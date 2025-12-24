import Link from 'next/link';
import CTASection from '@/components/home/CTASection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import OurFeatureSection from '@/components/home/OurFeatureSection';
import OurFactsSection from '@/components/home/OurFactsSection';

export default function WhyUsPage() {
  return (
    <div className="page-content">
      {/* Page Header Start */}
      <div className="page-header bg-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              {/* Page Header Box Start */}
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Why <span>choose us</span>
                </h1>
                <nav>
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      why us
                    </li> */}
                  </ol>
                </nav>
              </div>
              {/* Page Header Box End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Why Choose Section */}
      <WhyChooseSection />

      {/* Features Highlight Section */}
      <OurFeatureSection />

      {/* Impact / Facts Section */}
      {/* <OurFactsSection /> */}

      {/* Testimonials Section */}
      {/* <OurTestimonialsSection /> */}

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
