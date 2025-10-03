import CTASection from "@/components/home/CTASection";
import ServicesContent from "@/components/services/ServicesContent";

export default function Services() {
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
                  Our <span>services</span>
                </h1>
                <nav>
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      our services
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

      {/* Page Services Start */}
      <ServicesContent />
      {/* Page Services End */}

      {/* CTA, Why Choose Us, Testimonials, FAQs */}
      <CTASection />
      {/* <WhyChooseSection />
      <OurTestimonialsSection />
      <FAQSection /> */}
    </div>
  );
}

