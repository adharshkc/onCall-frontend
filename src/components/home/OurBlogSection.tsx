import Image from 'next/image';
import Link from 'next/link';

const OurBlogSection = () => {
  return (
    <div className="our-blog">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Our blog</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Explore articles that nurture,
                <span>educate, and inspire</span>
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            {/* Post Item Start */}
            <div className="post-item wow fadeInUp">
              {/* Post Featured Image Start */}
              <div className="post-featured-image">
                <Link href="/blog-single" data-cursor-text="View">
                  <figure className="image-anime">
                    <Image src="/images/post-1.jpg" alt="blog post" width={400} height={300} />
                  </figure>
                </Link>
              </div>
              {/* Post Featured Image End */}

              {/* Post Item Body Start */}
              <div className="post-item-body">
                {/* Post Item Content Start */}
                <div className="post-item-content">
                  <h2>
                    <Link href="/blog-single">
                      Simple Activities That Boost Senior Mental Health
                    </Link>
                  </h2>
                </div>
                {/* Post Item Content End */}

                {/* Post Item Readmore Button Start */}
                <div className="post-item-btn">
                  <Link href="/blog-single" className="readmore-btn">
                    learn more
                  </Link>
                </div>
                {/* Post Item Readmore Button End */}
              </div>
              {/* Post Item Body End */}
            </div>
            {/* Post Item End */}
          </div>

          <div className="col-lg-4 col-md-6">
            {/* Post Item Start */}
            <div className="post-item wow fadeInUp" data-wow-delay="0.2s">
              {/* Post Featured Image Start */}
              <div className="post-featured-image">
                <Link href="/blog-single" data-cursor-text="View">
                  <figure className="image-anime">
                    <Image src="/images/post-2.jpg" alt="blog post" width={400} height={300} />
                  </figure>
                </Link>
              </div>
              {/* Post Featured Image End */}

              {/* Post Item Body Start */}
              <div className="post-item-body">
                {/* Post Item Content Start */}
                <div className="post-item-content">
                  <h2>
                    <Link href="/blog-single">
                      Family Involvement in Senior Care Staying Connected
                    </Link>
                  </h2>
                </div>
                {/* Post Item Content End */}

                {/* Post Item Readmore Button Start */}
                <div className="post-item-btn">
                  <Link href="/blog-single" className="readmore-btn">
                    learn more
                  </Link>
                </div>
                {/* Post Item Readmore Button End */}
              </div>
              {/* Post Item Body End */}
            </div>
            {/* Post Item End */}
          </div>

          <div className="col-lg-4 col-md-6">
            {/* Post Item Start */}
            <div className="post-item wow fadeInUp" data-wow-delay="0.4s">
              {/* Post Featured Image Start */}
              <div className="post-featured-image">
                <Link href="/blog-single" data-cursor-text="View">
                  <figure className="image-anime">
                    <Image src="/images/post-3.jpg" alt="blog post" width={400} height={300} />
                  </figure>
                </Link>
              </div>
              {/* Post Featured Image End */}

              {/* Post Item Body Start */}
              <div className="post-item-body">
                {/* Post Item Content Start */}
                <div className="post-item-content">
                  <h2>
                    <Link href="/blog-single">
                      Navigating the Costs of Senior Care What You Need to Know
                    </Link>
                  </h2>
                </div>
                {/* Post Item Content End */}

                {/* Post Item Readmore Button Start */}
                <div className="post-item-btn">
                  <Link href="/blog-single" className="readmore-btn">
                    learn more
                  </Link>
                </div>
                {/* Post Item Readmore Button End */}
              </div>
              {/* Post Item Body End */}
            </div>
            {/* Post Item End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBlogSection;
