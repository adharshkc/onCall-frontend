import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import OurTestimonialsSection from "@/components/home/OurTestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  image: string;
  delay?: number;
  active?: boolean;
};

const homeCareServices: ServiceItem[] = [
  {
    title: "Domiciliary Care",
    description:
      "Professional care services provided in the comfort and familiarity of your own home, maintaining your independence while receiving the support you need.",
    icon: "/images/icon-service-1.svg",
    image: "/images/service-1.jpg",
    active: true,
    delay: 0,
  },
  {
    title: "Night Care",
    description:
      "Overnight care services providing peace of mind for families while ensuring your loved one receives professional supervision and assistance during nighttime hours.",
    icon: "/images/icon-service-2.svg",
    image: "/images/service-1.jpg",
    delay: 0.2,
  },
  {
    title: "Respite Care",
    description:
      "Temporary care services designed to give family caregivers a much-needed break while ensuring continuity of high-quality care for your loved one.",
    icon: "/images/icon-service-3.svg",
    image: "/images/service-1.jpg",
    delay: 0.4,
  },
  {
    title: "Home Help and Housekeeping",
    description:
      "Comprehensive home assistance including cleaning, organizing, meal preparation, and general housekeeping to maintain a safe and comfortable living environment.",
    icon: "/images/icon-service-4.svg",
    image: "/images/service-1.jpg",
    delay: 0.6,
  },
  {
    title: "Companionship Care",
    description:
      "Social companionship and emotional support to combat loneliness and isolation, including conversation, activities, and assistance with daily routines.",
    icon: "/images/icon-service-5.svg",
    image: "/images/service-1.jpg",
    delay: 0.8,
  },
  {
    title: "Daytime Care",
    description:
      "Daytime supervision and assistance with daily activities, personal care, and social engagement while family members are at work or need time away.",
    icon: "/images/icon-service-6.svg",
    image: "/images/service-1.jpg",
    delay: 1,
  },
  {
    title: "Live in Care",
    description:
      "Round-the-clock care with a dedicated caregiver living in your home, providing continuous support while allowing you to remain in familiar surroundings.",
    icon: "/images/icon-service-1.svg",
    image: "/images/service-1.jpg",
    delay: 1.2,
  },
];

const specialistCareServices: ServiceItem[] = [
  {
    title: "Dementia Care",
    description:
      "Specialized care for individuals with dementia and Alzheimer's disease, focusing on cognitive support, safety, and maintaining quality of life through personalized approaches.",
    icon: "/images/icon-service-2.svg",
    image: "/images/service-1.jpg",
  },
  {
    title: "Cancer Care",
    description:
      "Compassionate support for cancer patients and their families, including symptom management, emotional support, and assistance with treatment-related needs.",
    icon: "/images/icon-service-3.svg",
    image: "/images/service-1.jpg",
    delay: 0.2,
  },
  {
    title: "Parkinson's Care",
    description:
      "Specialized care for individuals with Parkinson's disease, focusing on mobility assistance, medication management, and maintaining independence through adaptive strategies.",
    icon: "/images/icon-service-4.svg",
    image: "/images/service-1.jpg",
    delay: 0.4,
  },
  {
    title: "Neurological Care",
    description:
      "Expert care for individuals with neurological conditions, providing specialized support for complex needs and helping maintain optimal function and quality of life.",
    icon: "/images/icon-service-5.svg",
    image: "/images/service-1.jpg",
    delay: 0.6,
  },
  {
    title: "Palliative Care",
    description:
      "Comfort-focused care for individuals with serious illnesses, emphasizing pain management, symptom relief, and emotional support for patients and families.",
    icon: "/images/icon-service-6.svg",
    image: "/images/service-1.jpg",
    delay: 0.8,
  },
  {
    title: "Arthritis and Mobility Care",
    description:
      "Specialized support for individuals with arthritis and mobility challenges, including pain management, physical assistance, and adaptive equipment guidance.",
    icon: "/images/icon-service-1.svg",
    image: "/images/service-1.jpg",
    delay: 1,
  },
  {
    title: "Diabetes Care",
    description:
      "Comprehensive diabetes management including blood sugar monitoring, medication administration, dietary guidance, and education to help maintain optimal health.",
    icon: "/images/icon-service-2.svg",
    image: "/images/service-1.jpg",
    delay: 1.2,
  },
];

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
      <div className="page-services">
        <div className="container">
          {/* Home Care Section */}
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title section-title-center">
                <h2 className="text-anime-style-2 wow fadeInUp" data-cursor="-opaque">
                  Home Care
                </h2>
                <p className="wow fadeInUp">
                  Our home care services give you the flexibility to live each day with independence
                </p>
              </div>
            </div>
          </div>

          <div className="row service-list">
            {homeCareServices.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.title}>
                {/* Service Item Start */}
                <div
                  className={`service-item ${service.active ? "active" : ""} wow fadeInUp`}
                  data-wow-delay={service.delay}
                >
                  {/* Service Image Start */}
                  <div className="service-image">
                    <Image src={service.image} alt={service.title} width={600} height={400} />
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
          </div>

          {/* Specialist & Complex Care Section */}
          <div className="row section-row" style={{ marginTop: 80 }}>
            <div className="col-lg-12">
              <div className="section-title section-title-center">
                <h2 className="text-anime-style-2 wow fadeInUp" data-cursor="-opaque">
                  Specialist & Complex Care
                </h2>
                <p className="wow fadeInUp">
                  Our Specialist & complex care services give you the flexibility to live each day with independence
                </p>
              </div>
            </div>
          </div>

          <div className="row service-list">
            {specialistCareServices.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.title}>
                {/* Service Item Start */}
                <div className={`service-item wow fadeInUp`} data-wow-delay={service.delay}>
                  {/* Service Image Start */}
                  <div className="service-image">
                    <Image src={service.image} alt={service.title} width={600} height={400} />
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
          </div>
        </div>
      </div>
      {/* Page Services End */}

      {/* CTA, Why Choose Us, Testimonials, FAQs */}
      <CTASection />
      {/* <WhyChooseSection />
      <OurTestimonialsSection />
      <FAQSection /> */}
    </div>
  );
}

