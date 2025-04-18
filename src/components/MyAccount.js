import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Tab, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';
import MyOrders from './MyOrders'; // Import the new MyOrders component
import '../styles/MyAccountPage.css';

function MyAccount() {
  const [activeTab, setActiveTab] = useState('personalInfo');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Initialize form fields with user data
  useEffect(() => {
    if (user) {
      const fullName = user.fullName || '';
      const nameParts = fullName.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setGender(user.gender || '');
    }
  }, [user]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        fullName: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        gender,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess('Changes saved successfully!');
      setError('');
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      setSuccess('');
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="my-account-page">
      <Container className="py-5">
        {/* Title */}
        <h2 className="section-title mb-4">My Account</h2>

        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
          <Row className="my-account-section">
            {/* Left Side: Sidebar */}
            <Col md={3}>
              <AccountSidebar activeTab={activeTab} onSelect={(key) => setActiveTab(key)} />
            </Col>

            {/* Right Side: Tab Content */}
            <Col md={9}>
              <Tab.Content>
                {/* Tab 1: Personal Information */}
                <Tab.Pane eventKey="personalInfo">
                  <div className="personal-info">
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="photo-placeholder mb-4">
                      <div className="photo-circle"></div>
                    </div>
                    <Form onSubmit={handleSaveChanges}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          as="select"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="success" className="save-changes-btn">
                        Save Changes
                      </Button>
                    </Form>
                  </div>
                </Tab.Pane>

                {/* Tab 2: My Orders */}
                <Tab.Pane eventKey="myOrders">
                  <MyOrders />
                </Tab.Pane>

                {/* Tab 3: Manage Address */}
                <Tab.Pane eventKey="manageAddress">
                  <h4>Manage Address</h4>
                  <p>This section will allow you to manage your addresses. (Placeholder)</p>
                </Tab.Pane>

                {/* Tab 4: Payment Method */}
                <Tab.Pane eventKey="paymentMethod">
                  <h4>Payment Method</h4>
                  <p>This section will allow you to manage your payment methods. (Placeholder)</p>
                </Tab.Pane>

                {/* Tab 5: Change Password */}
                <Tab.Pane eventKey="changePassword">
                  <h4>Change Password</h4>
                  <p>This section will allow you to change your password. (Placeholder)</p>
                </Tab.Pane>

                {/* Tab 6: Logout (handled by AccountSidebar) */}
                <Tab.Pane eventKey="logout"></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default MyAccount;