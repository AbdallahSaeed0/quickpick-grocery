import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left Side: Login Form */}
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <div className="login-form">
              <h2 className="login-title">
                Hi there! Welcome back to{' '}
                <span className="quickpick-logo">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/quickpick-logo.png'}
                    alt="QuickPick Logo"
                    className="inline-logo"
                  />
                </span>
              </h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    className="login-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="login-input"
                  />
                </Form.Group>
                <div className="text-end mb-3">
                  <Link to="#" className="forgot-password-link">
                    Forgot your password?
                  </Link>
                </div>
                <Button variant="success" type="submit" className="login-button w-100">
                  Log in
                </Button>
              </Form>
              <div className="separator my-4">or</div>
              <div className="social-login d-flex justify-content-center gap-3 mb-4">
                <Button variant="outline-dark" className="social-button">
                  <FaGoogle />
                </Button>
                <Button variant="outline-dark" className="social-button">
                  <FaFacebookF />
                </Button>
                <Button variant="outline-dark" className="social-button">
                  <FaApple />
                </Button>
              </div>
              <p className="register-text text-center">
                Don't have an account yet?{' '}
                <Link to="/signup" className="register-link">
                  Register here!!!
                </Link>
              </p>
            </div>
          </Col>

          {/* Right Side: Image */}
          <Col md={6} className="d-none d-md-block login-image-col">
            <img
              src={process.env.PUBLIC_URL + '/assets/login-image.png'}
              alt="Groceries"
              className="login-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;