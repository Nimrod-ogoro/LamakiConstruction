import { Hammer, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo">
              <img src="logo.png" alt="logo"  className="logo"/>
              <h1>Lamaki Designs</h1>
            </div>
            <p className="footer-description">
              Professional construction services for residential and commercial projects.
              Building excellence since 1998 with quality craftsmanship and exceptional service.
            </p>
            <div className="footer-socials">
              <Facebook className="social-icon" />
              <Twitter className="social-icon" />
              <Instagram className="social-icon" />
              <Linkedin className="social-icon" />
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-list">
              <li><a href="#">Residential Construction</a></li>
              <li><a href="#">Commercial Building</a></li>
              <li><a href="#">Renovations</a></li>
              <li><a href="#">Project Management</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-list">
              <li>(254) 0796643331</li>
              <li>nimrodogoro@gmail.com</li>
              <li>123 Construction Ave<br />Nairobi, Kenya</li>
            </ul>
          </div>

          {/* Small Map */}
          <div className="footer-map">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.82607323815!2d36.98881607448303!3d-1.277850335615928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f6b4d8c0516e9%3A0x417dc538f5da6fad!2sLamaki%20Designs%20and%20Construction!5e0!3m2!1sen!2ske!4v1754943738247!5m2!1sen!2ske" 
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 build by Nimrod Ogoro. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

