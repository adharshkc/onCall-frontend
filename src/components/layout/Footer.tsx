import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer bg-section dark-section" style={{ background: "#1a1a2e" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            {/* About Footer Start */}
            <div className="about-footer">
              {/* Footer Logo Start */}
              <div className="footer-logo">
                <Image src="/images/logo.png" alt="On Call Footer Logo" width={150} height={50} />
              </div>
              {/* Footer Logo End */}

              {/* About Footer Content Start */}
              <div className="about-footer-content">
                <p>Providing compassionate, professional, reliable home nursing care tailored to your needs.</p>
              </div>
              {/* About Footer Content End */}

              {/* Footer Social Link Start */}

              {/* Footer Social Link End */}
            </div>
            {/* About Footer End */}
          </div>

          <div className="col-lg-3 col-md-6">
            {/* Footer Contact Details Start */}
            <div className="footer-contact-details footer-links">
              {/* Footer Contact Item Start */}
              <div className="footer-contact-item">
                <h3>Contact Information</h3>
                <p>123 Maplewood Drive, Pinehill, CA 90210</p>
              </div>
              {/* Footer Contact Item End */}

              {/* Footer Contact Item Start */}
              <div className="footer-contact-item">
                <h3>Email Address</h3>
                <p>
                  <a href="homecare@oncallcareservice.co.uk">homecare@oncallcareservice.co.uk</a>
                </p>
              </div>
              {/* Footer Contact Item End */}
            </div>
            {/* Footer Contact Details End */}
          </div>

          <div className="col-lg-2 col-md-6">
            {/* Footer Links Start */}
            <div className="footer-links" style={{}}>
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact us</Link></li>
              </ul>
            </div>
            {/* Footer Links End */}
          </div>

          <div className="col-lg-3">
            {/* Footer Newsletter Box Start */}
            <div className="footer-newsletter-box footer-links">
              <h3>Social Links</h3>
              <div className="footer-social-links">
                <ul>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaDribbble />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Footer Links End */}
          </div>

          <div className="col-lg-12">
            {/* Footer Copyright Start */}
            <div className="footer-copyright">
              <p style={{ color: "#fff" }}>Developed by Qubyt Codes</p>
              {/* Footer Copyright Text Start */}
              <div className="footer-copyright-text">
                <p>Copyright © 2025 On Call Services All Rights Reserved.</p>
              </div>
              {/* Footer Copyright Text End */}

              {/* Footer Privacy Policy Start */}
              <div className="footer-privacy-policy">
                <ul>
                  <li><Link href="/privacy-policy">privacy policy</Link></li>
                  <li><Link href="/terms-conditions">terms & condition</Link></li>
                </ul>
              </div>
              {/* Footer Privacy Policy End */}
            </div>
            {/* Footer Copyright End */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
