import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FooterSection.css';

// Import social media icons
import { FaFacebookF, FaTwitter, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';

function FooterSection() {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="py-5">
          {/* Part 1: Logo, App Store Buttons, and Address */}
          <Col md={4} className="mb-4">
            <div className="footer-logo mb-3">
              <img src={process.env.PUBLIC_URL + '/assets/quickpick-logo.png'} alt="QuickPick Logo" className="logo-image" />
            </div>
            <div className="app-store-buttons mb-3">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src={process.env.PUBLIC_URL + '/assets/app-store.png'}
                  alt="App Store"
                  className="store-button"
                />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img
                  src={process.env.PUBLIC_URL + '/assets/google-play.png'}
                  alt="Google Play"
                  className="store-button"
                />
              </a>
            </div>
            <p className="footer-address">
              1234 Market Street, Suite 500<br />
              Downtown City, QC 56789<br />
              Countryland
            </p>
          </Col>

          {/* Part 2: Newsletter Subscription and Social Links */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Get Exclusive Deals in your Inbox</h5>
            <Form className="newsletter-form mb-3">
              <div className="subscribe-container">
                <div className="subscribe-input-wrapper">
                  <Form.Control
                    type="email"
                    placeholder="youremail@gmail.com"
                    className="newsletter-input"
                  />
                </div>
                <button type="submit" className="subscribe-button">
                  Subscribe
                </button>
              </div>
            </Form>
            <p className="small-text">
              we won't spam, read our <a href="#" className="email-policy-link">email policy</a>
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="social-icon" />
              </a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer">
                <FaSnapchatGhost className="social-icon" />
              </a>
            </div>
          </Col>

          {/* Part 3: Legal Pages */}
          <Col md={2} className="mb-4">
            <h5 className="footer-title">Legal Pages</h5>
            <ul className="footer-links">
              <li><a href="#">Terms and conditions</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </Col>

          {/* Part 4: Important Links */}
          <Col md={2} className="mb-4">
            <h5 className="footer-title">Important Links</h5>
            <ul className="footer-links">
              <li><a href="#">Get help</a></li>
              <li><a href="#">Sign-up to deliver</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      {/* Bottom Bar */}
      <div className="bottom-bar py-3">
        <Container>
            <Row>
            <Col md={6} className="text-md-left">
                <p className="copyright-text">
                QuickPick Copyright 2025, All Rights Reserved.
                </p>
            </Col>
            <Col md={6} className="bottom-right">
                <a href="#" className="bottom-link">Privacy Policy</a>
                <a href="#" className="bottom-link">Terms</a>
                <a href="#" className="bottom-link">Pricing</a>
                <a href="#" className="bottom-link">Do not sell or share my personal information</a>
            </Col>
            </Row>
            
        </Container>
          
        </div>
    </footer>
  );
}

export default FooterSection;