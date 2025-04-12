import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../styles/Verification.css';

function Verification() {
  return (
    <div className="verification-page">
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left Side: Image */}
          <Col md={6} className="d-none d-md-block verification-image-col">
            <img
              src={process.env.PUBLIC_URL + '/assets/verification-image.png'}
              alt="Hand holding grocery bag"
              className="verification-image"
            />
          </Col>

          {/* Right Side: Verification Form */}
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <div className="verification-form">
              <h2 className="verification-title">verify</h2>
              <p className="verification-subtitle">
                Please enter the code we sent you your E-mail
              </p>
              <Form className="d-flex justify-content-center gap-2 mb-4">
                <Form.Control
                  type="text"
                  maxLength="1"
                  className="code-input"
                  placeholder=""
                />
                <Form.Control
                  type="text"
                  maxLength="1"
                  className="code-input"
                  placeholder=""
                />
                <Form.Control
                  type="text"
                  maxLength="1"
                  className="code-input"
                  placeholder=""
                />
                <Form.Control
                  type="text"
                  maxLength="1"
                  className="code-input"
                  placeholder=""
                />
              </Form>
              <p className="resend-text text-center">
                Didn't receive the code?{' '}
                <Link to="#" className="resend-link">
                  Resend Code
                </Link>
              </p>
              <Button variant="success" type="submit" className="verify-button w-100">
                Verify
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Verification;