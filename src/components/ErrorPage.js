import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import CustomNavbar from './Navbar';
import FooterSection from './FooterSection';
import '../styles/ErrorPage.css';

function ErrorPage() {
  return (
    <div className="error-page">
      {/* Header */}
      <CustomNavbar />

      {/* Main Content */}
      <Container className="text-center py-5">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">oops! Page not found</h2>
        <p className="error-subtitle">
          The page you are looking for cannot be found. Take a break before trying again
        </p>
        <Button as={Link} to="/" variant="success" className="back-to-home-button">
          Back to Home
        </Button>
      </Container>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

export default ErrorPage;