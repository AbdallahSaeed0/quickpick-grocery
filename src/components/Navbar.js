import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';
import '../styles/Main.css';
import { useLocation } from 'react-router-dom';

function CustomNavbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Helper to determine if a route or its sub-routes are active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Top Bar */}
      <div>
        <Container>
          <div className="top-bar row justify-content-between align-items-center">
            <div className="two-sec text-center col-lg-9 d-flex justify-content-between align-items-center">
              <div className="me-3 header-text">
                <i className="bi bi-star-fill text-warning me-1"></i> Get 5% Off your first order,{' '}
                <a href="/location" className="ms-2 orders"><strong className="theme-color ms-2 orders">Promo:ORDER5</strong></a>
              </div>
              <div className="me-3 header-text">
                <i className="bi bi-geo-alt-fill me-1"></i> 1234 Market Street, Countryland{' '}
                <a href="/location" className="ms-2 orders">Change Location</a>
              </div>
            </div>

            <div className="col-lg-2 cart-section text-white">
              <div className="row align-items-center">
                <div className="first-section col-4">
                  <Button
                    variant="link"
                    onClick={toggleTheme}
                    className="theme-toggle-btn-icon"
                    title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                  >
                    <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
                  </Button>
                </div>
                <div className="second-section col-4">
                  <Link to="/wishlist" className="wishlist-icon-link">
                    <i className="bi bi-heart-fill"></i>
                  </Link>
                </div>
                <div className="third-section col-4">
                  <i className="bi bi-translate"></i>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <BootstrapNavbar bg="light" expand="lg" className="navbar py-3">
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/" className="me-4">
            <img
              src={process.env.PUBLIC_URL + '/assets/quickpick-logo.png'}
              alt="QuickPick Logo"
              className="d-inline-block align-top me-2"
            />
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={`mx-2 ${isActive('/') ? 'active' : ''}`}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/search" className={`mx-2 ${isActive('/search') ? 'active' : ''}`}>
                Browse products
              </Nav.Link>
              <Nav.Link as={Link} to="/offers" className={`mx-2 ${isActive('/offers') ? 'active' : ''}`}>
                Special Offers
              </Nav.Link>
              <Nav.Link as={Link} to="/categories" className={`mx-2 ${isActive('/categories') ? 'active' : ''}`}>
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/track" className={`mx-2 ${isActive('/track') ? 'active' : ''}`}>
                Track Order
              </Nav.Link>
              <Nav.Link as={Link} to="/wishlist" className={`mx-2 ${isActive('/wishlist') ? 'active' : ''}`}>
                Wishlist
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
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