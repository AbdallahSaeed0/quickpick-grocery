import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext'; // New import
import '../styles/Navbar.css';
import '../styles/Main.css';

function CustomNavbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { itemCount, totalPrice } = useContext(CartContext); // Use cart context

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Top Bar */}
      <div>
        <Container>
          <div className="top-bar row justify-content-between align-items-center">
            <div className="two-sec text-center col-lg-9 d-flex justify-content-between align-items-center">
              <div className="me-3 text-dark">
                <i className="bi bi-star-fill text-warning me-1"></i> Get 5% Off your first order,{' '}
                <strong className="theme-color orders">Promo:ORDER5</strong>
              </div>
              <div className="me-3 text-dark">
                <i className="bi bi-geo-alt-fill text-dark me-1"></i> 1234 Market Street, Countryland{' '}
                <a href="/location" className="ms-2 orders">Change Location</a>
              </div>
            </div>

            <Link to="/cart" className="col-lg-3 cart-section text-white">
              <div className="row align-items-center">
                <div className="first-section col-3">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/cart.png'}
                    alt="cart"
                    className="d-inline-block cart align-top"
                  />
                </div>
                <div className="second-section col-3">{itemCount} items</div>
                <div className="third-section col-3">EGP {totalPrice}</div>
                <div className="fourth-section col-3">
                  <i className="bi bi-translate"></i>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <BootstrapNavbar bg="light" expand="lg" className="navbar py-3">
        <Container>
          {/* Logo */}
          <BootstrapNavbar.Brand as={Link} to="/" className="me-4">
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
              <Nav.Link as={Link} to="/" className="btn btn-warning text-white mx-2">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/search" className="mx-2">
                Browse products
              </Nav.Link>
              <Nav.Link as={Link} to="/offers" className="mx-2">
                Special Offers
              </Nav.Link>
              <Nav.Link as={Link} to="/categories" className="mx-2">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/track" className="mx-2">
                Track Order
              </Nav.Link>
              <Nav.Link as={Link} to="/wishlist" className="mx-2">
                Wishlist
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              {/* Dark Mode Toggle */}
              <Button
                variant="link"
                onClick={toggleTheme}
                className="theme-toggle-btn mx-2"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
              </Button>
              {user ? (
                <>
                  <Link to="/myaccount" className="user-icon-btn">
                    <img
                      src={process.env.PUBLIC_URL + '/assets/icon-user.png'}
                      alt="User Profile"
                      className="d-inline-block align-top me-2"
                    />
                  </Link>
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    className="ms-2 logout-btn"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" className="btn btn-success rounded-pill">
                  <i className="bi bi-person-circle me-1"></i> Login/Signup
                </Link>
              )}
            </div>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default CustomNavbar;