import React, { useState } from 'react';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FooterSection.css';
import { FaFacebookF, FaTwitter, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';

function FooterSection() {
  const [showGetHelpModal, setShowGetHelpModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleGetHelpModalShow = () => setShowGetHelpModal(true);
  const handleGetHelpModalClose = () => setShowGetHelpModal(false);

  const handleSignUpModalShow = () => setShowSignUpModal(true);
  const handleSignUpModalClose = () => setShowSignUpModal(false);

  const handlePrivacyModalShow = () => setShowPrivacyModal(true);
  const handlePrivacyModalClose = () => setShowPrivacyModal(false);

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
              <li><Link to="/terms-and-conditions">Terms and conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy</Link></li>
              <li><Link to="/cookies-policy">Cookies</Link></li>
            </ul>
          </Col>

          {/* Part 4: Important Links */}
          <Col md={2} className="mb-4">
            <h5 className="footer-title">Important Links</h5>
            <ul className="footer-links">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleGetHelpModalShow(); }}>
                  Get help
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleSignUpModalShow(); }}>
                  Sign-up to deliver
                </a>
              </li>
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
              <Link to="/privacy-policy" className="bottom-link">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="bottom-link">Terms</Link>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handlePrivacyModalShow(); }}
                className="bottom-link"
              >
                Do not sell or share my personal information
              </a>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Get Help Modal */}
      <Modal show={showGetHelpModal} onHide={handleGetHelpModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Get Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <p>
                Need assistance with your order, account, or delivery?
                <br />
                Our support team is here to help you 7 days a week.
              </p>
              <ul className="help-list">
                <li><strong>Customer Support:</strong> 189xx</li>
                <li><strong>Email:</strong> support@quickpick.com.eg</li>
                <li><strong>Live Chat:</strong> Available 9 AM – 9 PM (Cairo Time)</li>
                <li><strong>Help Center:</strong> <a href="#">Browse FAQs</a></li>
              </ul>
              <p>
                We’re committed to making your experience smooth and stress-free.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <img src={process.env.PUBLIC_URL + '/assets/get-help-image.png'} alt="Get Help Illustration" className="modal-image" />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGetHelpModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sign Up to Deliver Modal */}
      <Modal show={showSignUpModal} onHide={handleSignUpModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up to Deliver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <p>
                Want to earn money by delivering with QuickPick?
                <br />
                Join our growing network of delivery partners and enjoy:
              </p>
              <ul className="signup-list">
                <li>Flexible working hours</li>
                <li>Weekly payouts</li>
                <li>Support from our dedicated team</li>
                <li>In-app navigation and order management</li>
              </ul>
              <p>
                <strong>Apply now at</strong> quickpick.com.ag/deliver
                <br />
                <strong>Questions?</strong> Email us at delivery@quickpick.com.eg
              </p>
            </Col>
            <Col md={4} className="text-center">
              <img src={process.env.PUBLIC_URL + '/assets/sign-up-deliver-image.png'} alt="Sign Up to Deliver Illustration" className="modal-image" />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignUpModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Do Not Sell or Share My Personal Information Modal */}
      <Modal show={showPrivacyModal} onHide={handlePrivacyModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Do Not Sell or Share My Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            At QuickPick, we respect your privacy and are committed to protecting your personal information.
            <br />
            We do not sell or share your personal information with third parties for marketing purposes without your consent.
          </p>
          <p>
            To learn more about how we handle your data, please review our <Link to="/privacy-policy">Privacy Policy</Link>.
            <br />
            If you have any questions or wish to opt out of data sharing, contact us at <a href="mailto:support@quickpick.com.eg">support@quickpick.com.eg</a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePrivacyModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
}

export default FooterSection;