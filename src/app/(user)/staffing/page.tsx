import Image from 'next/image';
import './staffing.css';

export default function StaffingPage() {
  return (
    <section className="staffing-section">
      <div className="staffing-container">
        {/* Section Header */}
        <div className="section-header">
          <h1 className="section-title">
            Our Staffing Solutions
          </h1>
          <p className="section-subtitle">
            Flexible staffing solutions tailored to meet your healthcare and social care needs
          </p>
        </div>

        {/* Grid Layout */}
        <div className="staffing-grid">
          {/* Nursing Agency Service Card */}
          <div className="staff-card">
            <div className="staff-card-image-wrapper">
              <Image
                src="/images/nursing-agency.jpg"
                alt="Nursing Agency Service - Professional home care"
                fill
                className="staff-card-image"
                priority
              />
              <div className="image-overlay"></div>
              <div className="card-title-wrapper">
                <h2 className="card-title">
                  Nursing Agency Service
                </h2>
              </div>
            </div>
            <div className="card-content">
              <p className="card-description">
                Oncall Care is a leading home care service provider which offers care services at your home where you have the option to stay at home with support tailored to meet your needs. Whether you are elderly, convalescing or disabled or just in need of a little extra assistance with tasks you find tough, our fully trained, experienced staff will be there to help. We focus on making a difference every day to our clients, keeping them happy and independent right in their own homes where they belong. Our management team is highly skilled and have years of experience in home care services, and we provide high quality care service.
              </p>
              <div className="card-button-wrapper">
                <button className="card-button">
                  Learn More
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Temporary Staff Card */}
          <div className="staff-card">
            <div className="staff-card-image-wrapper">
              <Image
                src="/images/temporary-staff.jpg"
                alt="Temporary Staff - Healthcare worker assisting elderly patient"
                fill
                className="staff-card-image"
                priority
              />
              <div className="image-overlay"></div>
              <div className="card-title-wrapper">
                <h2 className="card-title">
                  Temporary Staff
                </h2>
              </div>
            </div>
            <div className="card-content">
              <p className="card-description">
                Our temporary staff can be deployed in quick time to meet your interim needs to
                address immediate staff shortages arising from unexpected absentee workers.
                Our temporary staff services are an ideal way of finding skilled staff to start work
                immediately on an interim basis. When a client requires a member of staff to
                work with them on a flexible basis which is typically for a fixed term to cover
                increases in unexpected workload of the organisation, or to replace staff who
                may be ill or on maternity/paternity leave.
              </p>
              <div className="card-button-wrapper">
                <button className="card-button">
                  Learn More
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Fixed Term Contract Staff Card */}
          <div className="staff-card">
            <div className="staff-card-image-wrapper">
              <Image
                src="/images/fixed-term-staff.jpg"
                alt="Fixed Term Contract Staff - Healthcare professional in uniform"
                fill
                className="staff-card-image"
                priority
              />
              <div className="image-overlay"></div>
              <div className="card-title-wrapper">
                <h2 className="card-title">
                  Fixed Term Contract Staff
                </h2>
              </div>
            </div>
            <div className="card-content">
              <p className="card-description">
                We have qualified staff across various categories of health and social care to meet
                fixed term contract staffing requirements for a specified period of time. Our fixed
                term contract staff are ideal for getting the job done in any area of work. Oncall
                offers professionals from a wide range of backgrounds with current industry
                knowledge and practice. We have a fair and equitable policy for fixed term
                contracts that has both the interests of the employee as well as the client. We do
                not treat fixed term contract staff any less favourably than permanent employees.
              </p>
              <div className="card-button-wrapper">
                <button className="card-button">
                  Learn More
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <svg className="feature-icon blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Quick Deployment</h3>
            <p className="feature-description">Staff available at short notice</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper green">
              <svg className="feature-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Qualified Professionals</h3>
            <p className="feature-description">Experienced and vetted staff</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper purple">
              <svg className="feature-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Flexible Solutions</h3>
            <p className="feature-description">Tailored to your needs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
