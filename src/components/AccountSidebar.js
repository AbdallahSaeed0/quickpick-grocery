import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AccountSidebar.css';

function AccountSidebar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to homepage after logout
  };

  // Determine active link based on current path
  const getActiveKey = () => {
    if (location.pathname.includes('personal-information')) return 'personalInfo';
    if (location.pathname.includes('my-orders')) return 'myOrders';
    if (location.pathname.includes('manage-address')) return 'manageAddress';
    if (location.pathname.includes('payment-method')) return 'paymentMethod';
    if (location.pathname.includes('change-password')) return 'changePassword';
    if (location.pathname.includes('logout')) return 'logout';
    return 'personalInfo'; // Default
  };

  return (
    <Nav variant="pills" className="flex-column account-sidebar" activeKey={getActiveKey()}>
      <Nav.Item>
        <Nav.Link as={Link} to="/account/personal-information" eventKey="personalInfo">
          Personal Information
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/account/my-orders" eventKey="myOrders">
          My Orders
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/account/manage-address" eventKey="manageAddress">
          Manage Address
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/account/payment-method" eventKey="paymentMethod">
          Payment Method
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/account/change-password" eventKey="changePassword">
          Change Password
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="logout" onClick={handleLogout}>
          Logout
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AccountSidebar;