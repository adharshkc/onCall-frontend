import Link from 'next/link';
import Image from 'next/image';
import CTASection from '@/components/home/CTASection';

type Job = {
  title: string;
  type: string;
  blurb: string;
  requirements: string[];
};

const jobs: Job[] = [
  {
    title: 'Registered Nurse (RN)',
    type: 'Full-time',
    blurb: 'We are seeking a compassionate and skilled Registered Nurse to join our care team.',
    requirements: ['Current RN license', '2+ years experience in senior care', 'Strong communication skills', 'Compassionate and patient-focused approach'],
  },
  {
    title: 'Certified Nursing Assistant (CNA)',
    type: 'Full-time / Part-time',
    blurb: 'Provide direct care to residents in a supportive, team-first environment.',
    requirements: ['Current CNA certification', 'Experience in senior care preferred', 'Excellent interpersonal skills', 'Ability to work flexible schedules'],
  },
  {
    title: 'Activities Coordinator',
    type: 'Full-time',
    blurb: 'Plan and coordinate engaging activities to enhance residents’ quality of life.',
    requirements: ["Bachelor's degree preferred", 'Experience in recreation or activities', 'Creative and energetic', 'Strong organizational skills'],
  },
  {
    title: 'Social Worker',
    type: 'Part-time',
    blurb: 'Provide social services and support to residents and their families.',
    requirements: ['MSW or BSW degree', 'State licensure preferred', 'Experience with elderly population', 'Strong advocacy skills'],
  },
];

export default function CareersPage() {
  return (
    <div className="page-content">
      {/* Page Header Start */}
      <div className="page-header bg-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Join our <span>team</span>
                </h1>
                <nav>
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      careers
                    </li> */}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Culture Intro Section Start */}
      <div className="about-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-us-images">
                <div className="about-image-1">
                  <figure className="image-anime reveal">
                    <Image src="/images/team-1.jpg" alt="Our team at work" width={520} height={600} />
                  </figure>
                </div>
                <div className="about-image-2">
                  <figure className="image-anime reveal">
                    <Image src="/images/team-2.jpg" alt="Caring moments" width={420} height={520} />
                  </figure>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">Careers at On Call</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Build a meaningful career in <span>senior care</span>
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    We’re always looking for compassionate, dedicated professionals. If you’re passionate about making a difference in the lives of seniors, we’d love to hear from you.
                  </p>
                </div>
                <div className="about-us-list wow fadeInUp" data-wow-delay="0.4s">
                  <ul>
                    <li>Supportive, values-led culture</li>
                    <li>Growth and development opportunities</li>
                    <li>Empathy-first, person-centred care</li>
                    <li>Flexible schedules and fair pay</li>
                  </ul>
                </div>
                <div className="our-care-btn wow fadeInUp" data-wow-delay="0.6s">
                  <Link href="#open-roles" className="btn-default">View open roles</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Culture Intro Section End */}

      {/* Open Roles Section Start */}
      <div id="open-roles" className="page-services">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title section-title-center">
                <h3 className="wow fadeInUp">We’re hiring</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Current <span>openings</span>
                </h2>
                <p className="wow fadeInUp">Find a role where your compassion creates daily impact.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {jobs.map((job) => (
              <div className="col-lg-6 mb-4" key={job.title}>
                <div className="job-card wow fadeInUp">
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <div className="job-content">
                    <p>{job.blurb}</p>
                    <ul className="job-requirements">
                      {job.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="job-footer">
                    <Link href="/contact" className="btn-default btn-sm">Apply now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Open Roles Section End */}

      {/* Perks & Benefits Section Start */}
      <div className="our-approach bg-section">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title section-title-center">
                <h3 className="wow fadeInUp">Perks & Benefits</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">Why you’ll <span>love</span> working here</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {[
              { icon: '/images/icon-feature-1.svg', title: 'Competitive salary', text: 'Fair, transparent pay with regular reviews.' },
              { icon: '/images/icon-feature-2.svg', title: 'Health benefits', text: 'Comprehensive health, dental and vision coverage.' },
              { icon: '/images/icon-feature-3.svg', title: 'Growth & training', text: 'Ongoing learning and professional development.' },
              { icon: '/images/icon-why-choose-1.svg', title: 'Flexible scheduling', text: 'Rotas designed to fit your life.' },
              { icon: '/images/icon-approach-body-1.svg', title: 'Supportive culture', text: 'A team that’s got your back, always.' },
              { icon: '/images/icon-approach-body-2.svg', title: 'Meaningful impact', text: 'Make a real difference every single day.' },
            ].map((b, i) => (
              <div className="col-lg-4 col-md-6" key={b.title}>
                <div className="approach-body-item wow fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`}>
                  <div className="icon-box">
                    <Image src={b.icon} alt="" width={60} height={60} />
                  </div>
                  <div className="approach-body-item-content">
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Perks & Benefits Section End */}

      {/* Call to Action */}
      <CTASection />
    </div>
  );
}
