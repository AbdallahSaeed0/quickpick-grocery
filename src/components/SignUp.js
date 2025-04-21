import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../styles/SignUpPage.css';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const success = signup(fullName, email, password);
    if (success) {
      navigate('/home'); // Redirect to homepage on successful signup
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="signup-page">
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left Side: Sign Up Form */}
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <div className="signup-form">
              <div className="d-flex align-items-center">
                <h2 className="signup-title">
                  Hi there! Welcome to{' '}
                  <span className="quickpick-logo">
                    <img
                      src={process.env.PUBLIC_URL + '/assets/quickpick-logo.png'}
                      alt="QuickPick Logo"
                      className="inline-logo"
                    />
                  </span>
                </h2>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <label>Full Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    className="signup-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <label>E-mail</label>
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    className="signup-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <label>Password</label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <label>Confirm Password</label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="signup-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        By continuing you agree to our{' '}
                        <Link to="#" className="terms-link">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="#" className="terms-link">
                          Privacy Policy
                        </Link>.
                      </span>
                    }
                    className="signup-checkbox"
                    required
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="signup-button w-100">
                  Sign Up
                </Button>
              </Form>
              <div className="separator my-4">or</div>
              <div className="social-login d-flex justify-content-center gap-3 mb-4">
                <Button variant="outline-dark" className="social-button google">
                  <FaGoogle />
                </Button>
                <Button variant="outline-dark" className="social-button facebook">
                  <FaFacebookF />
                </Button>
                <Button variant="outline-dark" className="social-button apple">
                  <FaApple />
                </Button>
              </div>
              <p className="login-text text-center">
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Sign in
                </Link>
              </p>
            </div>
          </Col>

          {/* Right Side: Image */}
          <Col md={6} className="d-none d-md-block signup-image-col">
            <img
              src={process.env.PUBLIC_URL + '/assets/login.png'}
              alt="Groceries"
              className="signup-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;