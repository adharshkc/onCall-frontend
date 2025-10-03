import Image from 'next/image';
import Link from 'next/link';

export default function ServiceDetailPage() {
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
                  Domiciliary <span>Care</span>
                </h1>
                <nav>
                  {/* <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">home</Link></li>
                    <li className="breadcrumb-item"><Link href="/services">services</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Domiciliary Care</li>
                  </ol> */}
                </nav>
              </div>
              {/* Page Header Box End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Page Service Single Start */}
      <div className="page-service-single">
        <div className="container">
          <div className="row">
            {/* Sidebar Start */}
            <div className="col-lg-4 order-2 order-lg-1">
              <div className="page-single-sidebar">
                {/* Page Category List Start */}
                <div className="page-catagory-list wow fadeInUp">
                  <h3>Explore Our Services</h3>
                  <ul>
                    <li><a href="#">Domiciliary Care</a></li>
                    <li><a href="#">Memory &amp; Dementia Care</a></li>
                    <li><a href="#">Healthy Meals &amp; Nutrition Plans</a></li>
                    <li><a href="#">24/7 Skilled Nursing Care</a></li>
                    <li><a href="#">Assisted Living Support</a></li>
                  </ul>
                </div>
                {/* Page Category List End */}

                {/* Sidebar Cta Box Start */}
                <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.2s">
                  {/* Sidebar CTA Image Start */}
                  <div className="sidebar-cta-image">
                    <figure className="image-anime">
                      <Image src="/images/sidebar-cta-image.jpg" alt="CTA" width={600} height={800} />
                    </figure>
                  </div>
                  {/* Sidebar CTA Image End */}

                  {/* Sidebar CTA Content Start */}
                  <div className="sidebar-cta-content">
                    {/* Icon Box Start */}
                    <div className="icon-box">
                      <Image src="/images/icon-hours.svg" alt="Opening Hours" width={48} height={48} />
                    </div>
                    {/* Icon Box End */}

                    <div className="cta-item-content">
                      <h3>Opening Hours</h3>
                      <p>Monday - Friday (8am to 5pm)</p>
                      <p>Sunday - Closed</p>
                    </div>
                  </div>
                  {/* Sidebar CTA Content End */}

                  {/* Sidebar CTA Contact Start */}
                  <div className="sidebar-cta-contact">
                    <a href="tel:+001232548963">
                      <Image src="/images/icon-phone.svg" alt="Phone" width={24} height={24} />
                      +00-123-2548-963
                    </a>
                  </div>
                  {/* Sidebar CTA Contact End */}
                </div>
                {/* Sidebar Cta Box End */}
              </div>
            </div>
            {/* Sidebar End */}

            {/* Main Content Start */}
            <div className="col-lg-8 order-1 order-lg-2">
              <div className="service-single-content">
                {/* Page Single image Start */}
                <div className="page-single-image">
                  <figure className="image-anime reveal">
                    <Image src="/images/service-1.jpg" alt="Domiciliary care" width={1200} height={700} />
                  </figure>
                </div>
                {/* Page Single image End */}

                {/* Service Entry Start */}
                <div className="service-entry">
                  <h2 className="text-anime-style-2">
                    Trusted and Caring Home Care <span>Domiciliary Services</span>
                  </h2>
                  <p className="wow fadeInUp">
                    Domiciliary care makes this possible. It allows your loved ones to receive the support they need in the place they cherish most—their own home. A safe, familiar space that&apos;s proven to help people remain physically and emotionally stronger for longer.
                  </p>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    This is why we do what we do—to help parents, grandparents, aunts, and uncles live healthier, more fulfilling lives without leaving the comfort of home. We offer friendly, professional domiciliary care tailored to each individual&apos;s needs, helping you or your loved ones stay independent and at ease. Our compassionate care team provides personalised support, giving you peace of mind every step of the way.
                  </p>

                  {/* What is Domiciliary Care Section Start */}
                  <div className="compassionate-box">
                    <h2 className="text-anime-style-2">What is <span>Domiciliary Care?</span></h2>
                    <p className="wow fadeInUp">
                      Domiciliary care—also known as home care—means receiving the support you need while continuing to live in the comfort of your own home. From help with personal care and meal preparation to companionship and conversation, we&apos;re here to make daily life easier, safer, and more enjoyable.
                    </p>
                  </div>
                  {/* What is Domiciliary Care Section End */}

                  {/* Typical Visit Box Start */}
                  <div className="compassionate-box">
                    <h2 className="text-anime-style-2">A Typical Domiciliary <span>Care Visit</span></h2>
                    <p className="wow fadeInUp">
                      Truthfully, there&apos;s no such thing as a &quot;typical&quot; domiciliary care visit with us—because every visit is shaped around the unique needs and preferences of your loved one. No two people are the same, and neither is the care we provide.
                    </p>
                    <p className="wow fadeInUp" data-wow-delay="0.2s">
                      That said, here are some of the things our highly trained Care Experts are often asked to do:
                    </p>

                    {/* Care Services List Start */}
                    <div className="service-support-list wow fadeInUp" data-wow-delay="0.4s">
                      <ul>
                        <li>Gently help them wake up, wash, and get dressed for the day</li>
                        <li>Share conversation and reminisce over treasured memories</li>
                        <li>Prepare healthy, well-balanced meals</li>
                        <li>Organise and administer medication</li>
                        <li>Take care of the shopping</li>
                        <li>Lighten the load by managing everyday household chores</li>
                        <li>Accompany them on visits to friends and family</li>
                        <li>Help them settle comfortably into bed at night</li>
                        <li>Enjoy walks together for fresh air and exercise</li>
                      </ul>
                    </div>
                    {/* Care Services List End */}
                  </div>
                  {/* Typical Visit Box End */}

                  {/* Compassionate Box Start */}
                  <div className="compassionate-box">
                    <h2 className="text-anime-style-2">The Benefits of <span>Domiciliary Care</span></h2>
                    <p className="wow fadeInUp">
                      With us, the greatest benefit is simple—your loved one gets to remain in the place they love, for longer. But it&apos;s so much more than that. They&apos;ll receive dedicated one-to-one support, help with daily errands, assistance with bathing and personal care, and freshly prepared, nutritious meals.
                    </p>
                    <p className="wow fadeInUp" data-wow-delay="0.2s">
                      They&apos;ll have someone to share stories with, a companion to help them reconnect with old friends, and a safe environment with familiar routines—something that can even help slow the effects of age-related conditions such as dementia.
                    </p>

                    <div className="compassionate-body-box">
                      <div className="compassionate-item-list">
                        {/* Approach Body Item 1 */}
                        <div className="approach-body-item wow fadeInUp" data-wow-delay="0.2s">
                          <div className="icon-box">
                            <Image src="/images/icon-approach-body-1.svg" alt="" width={56} height={56} />
                          </div>
                          <div className="approach-body-item-content">
                            <h3>Dedicated one-to-one support tailored to individual needs</h3>
                          </div>
                        </div>

                        {/* Approach Body Item 2 */}
                        <div className="approach-body-item wow fadeInUp" data-wow-delay="0.4s">
                          <div className="icon-box">
                            <Image src="/images/icon-approach-body-2.svg" alt="" width={56} height={56} />
                          </div>
                          <div className="approach-body-item-content">
                            <h3>Safe, familiar environment with personalized care routines</h3>
                          </div>
                        </div>
                      </div>

                      {/* Compassionate Content Box */}
                      <div className="compassionate-content-box wow fadeInUp" data-wow-delay="0.6s">
                        <div className="icon-box">
                          <Image src="/images/icon-fact-item-2.svg" alt="" width={56} height={56} />
                        </div>
                        <div className="compassionate-content">
                          <h3>Professional Home Care</h3>
                          <p>Comprehensive support that helps maintain independence and dignity at home.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Compassionate Box End */}

                  {/* Service Support Box Start */}
                  <div className="service-support-box">
                    <h2 className="text-anime-style-2">Getting <span>Started</span></h2>
                    <p className="wow fadeInUp">
                      If you feel our domiciliary care services could be right for your loved one, simply give us a call. We&apos;ll take the time to understand your needs and create a personalised care plan tailored just for them. We&apos;ll also match you with a Care Expert we believe will be the perfect fit—someone who can help your loved one feel comfortable and supported from day one.
                    </p>

                    <div className="service-support-body">
                      {/* Bullet list */}
                      <div className="service-support-list wow fadeInUp" data-wow-delay="0.2s">
                        <ul>
                          <li>Personalised care plans tailored to individual needs</li>
                          <li>Matched with the perfect Care Expert</li>
                          <li>Comfortable and supported from day one</li>
                        </ul>
                      </div>

                      {/* Stats */}
                      <div className="service-support-item-list">
                        <div className="service-support-item">
                          <div className="icon-box">
                            <Image src="/images/icon-hero-benefit-2.svg" alt="" width={56} height={56} />
                          </div>
                          <div className="service-support-item-content">
                            <h3><span className="counter">95</span>%</h3>
                            <p>Client Satisfaction</p>
                          </div>
                        </div>

                        <div className="service-support-item">
                          <div className="icon-box">
                            <Image src="/images/icon-hero-benefit-1.svg" alt="" width={56} height={56} />
                          </div>
                          <div className="service-support-item-content">
                            <h3><span className="counter">24</span>/7</h3>
                            <p>Available Support</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image + Video */}
                    <div className="service-support-image-video">
                      <div className="service-support-image">
                        <figure className="image-anime reveal">
                          <Image src="/images/service-support-image-1.jpg" alt="Care support" width={900} height={700} />
                        </figure>
                      </div>

                      <div className="service-support-video">
                        <figure className="image-anime">
                          <Image src="/images/service-support-image-2.jpg" alt="Care video" width={900} height={700} />
                        </figure>
                        <div className="video-play-button">
                          <a href="#" className="popup-video" data-cursor-text="Play">
                            <i className="fa-solid fa-play" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Service Support Box End */}
                </div>
                {/* Service Entry End */}
              </div>
            </div>
            {/* Main Content End */}
          </div>
        </div>
      </div>
      {/* Page Service Single End */}
    </div>
  );
}
