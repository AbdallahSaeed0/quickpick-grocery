import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Navbar.css';
import '../styles/Main.css';

function CustomNavbar() {
  return (
    <>
      {/* Top Bar */}
      <div>
        <Container>
          <div className="top-bar row justify-content-between align-items-center">
            <div className="two-sec col-lg-9 d-flex justify-content-between align-items-center ">
              <div className="me-3 text-dark">
              <i className="bi bi-star-fill text-warning me-1"></i> Get 5% Off your first order, <strong className='theme-color orders'>Promo:ORDER5</strong>
            </div>
            <div className="me-3 text-dark">
              <i className="bi bi-geo-alt-fill text-dark me-1"></i> 1234 Market Street, Countryland{' '}
              <a href="home" className="ms-2 orders">Change Location</a>
            </div>
            </div>
            
            <div className="col-lg-3 d-flex  justify-content-center align-items-center cart-section text-white">
              <div className='first-section'>
              <img
              src={process.env.PUBLIC_URL + '/assets/cart.png'}
              alt="cart"
              className="d-inline-block cart align-top"
            />
              </div>
              <div className='second-section'>
              23 items
              </div>
              <div className='third-section'>
              EGP 79.89
              </div>
              <div className='fourth-section'>
              <i class="bi bi-translate"></i>
              </div>
            
               
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <BootstrapNavbar bg="light" expand="lg" className="py-3">
        <Container>
          {/* Logo */}
          <BootstrapNavbar.Brand href="#home" className="me-4">
            <img
              src={process.env.PUBLIC_URL + '/assets/quickpick-logo.png'}
              alt="QuickPick Logo"
              className="d-inline-block align-top me-2"
            />
          </BootstrapNavbar.Brand>

          {/* Toggle Button for Mobile */}
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Nav Content */}
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className="btn btn-warning text-white mx-2">Home</Nav.Link>
              <Nav.Link href="#browse" className="mx-2">Browse products</Nav.Link>
              <Nav.Link href="#offers" className="mx-2">Special Offers</Nav.Link>
              <Nav.Link href="#categories" className="mx-2">Categories</Nav.Link>
              <Nav.Link href="#track" className="mx-2">Track Order</Nav.Link>
            </Nav>
            <Button variant="success" className="rounded-pill">
            <i class="bi bi-person-circle"></i> Login/Signup
            </Button>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default CustomNavbar;