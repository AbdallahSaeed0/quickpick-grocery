import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/'); // Redirect to homepage on successful login
    } else {
      setError('Invalid email or password');
    }
  };

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
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
              <p className="register-text text-center">
                Don't have an account yet?{' '}
                <Link to="/signup" className="register-link">
                  Register here!!!
                </Link>
              </p>
            </div>
          </Col>

          {/* Right Side: Image */}
          <Col md={6} className="d-none d-md-flex login-image-col">
            <div className="loginbackground"></div>
            <img
              src={process.env.PUBLIC_URL + '/assets/login.png'}
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