import React, { useState, useContext } from 'react'; // Added useContext
import { Nav, Tab, Row, Col, Button, Container } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import AccountSidebar from '../components/AccountSidebar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MyOrders.css';

// Sample order data (replace with actual data source)
const ordersData = {
  past: [
    {
      id: 1,
      title: 'Mix cheese corissant',
      description: 'Buttery corissant filled with mozzarella cheese',
      price: 60,
      date: 'June 3 at 12:30 pm',
      image: '/assets/mix-cheese-corissant.jpg',
    },
    {
      id: 2,
      title: 'Mix cheese corissant',
      description: 'Buttery corissant filled with mozzarella cheese',
      price: 40,
      date: 'June 3 at 12:30 pm',
      image: '/assets/mix-cheese-corissant.jpg',
    },
  ],
  upcoming: [
    {
      id: 3,
      title: 'Mix cheese corissant',
      description: 'Buttery corissant filled with mozzarella cheese',
      price: 60,
      date: 'June 16 at 12:30 pm',
      image: '/assets/mix-cheese-corissant.jpg',
    },
  ],
};

function MyOrders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orderTab, setOrderTab] = useState('past');

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="my-account-page">
      <Container className="py-5">
        <h2 className="section-title mb-4">My Orders</h2>
        <Row>
          <Col md={3}>
            <AccountSidebar />
          </Col>
          <Col md={9}>
            <div className="my-orders">
              <Nav
                variant="tabs"
                activeKey={orderTab}
                onSelect={(key) => setOrderTab(key)}
                className="mb-4 justify-content-center"
              >
                <Nav.Item>
                  <Nav.Link eventKey="past">PAST</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="upcoming">UPCOMING</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="past">
                  {ordersData.past.length > 0 ? (
                    ordersData.past.map((order) => (
                      <div key={order.id} className="order-item mb-3 p-3">
                        <Row className="align-items-center">
                          <Col xs={3} md={2}>
                            <div className="order-image-placeholder"></div>
                          </Col>
                          <Col xs={6} md={7}>
                            <h5 className="order-title">{order.title}</h5>
                            <p className="order-description">{order.description}</p>
                            <p className="order-date">{order.date}</p>
                          </Col>
                          <Col xs={3} md={3} className="text-md-end position-relative">
                            <p className="order-price">EGP {order.price.toFixed(2)}</p>
                            <Button variant="outline-success" size="sm">
                              Order delivered
                            </Button>
                            <FaChevronDown className="order-dropdown-icon" />
                          </Col>
                        </Row>
                      </div>
                    ))
                  ) : (
                    <p>No past orders found.</p>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="upcoming">
                  {ordersData.upcoming.length > 0 ? (
                    ordersData.upcoming.map((order) => (
                      <div key={order.id} className="order-item mb-3 p-3">
                        <Row className="align-items-center">
                          <Col xs={3} md={2}>
                            <div className="order-image-placeholder"></div>
                          </Col>
                          <Col xs={6} md={7}>
                            <h5 className="order-title">{order.title}</h5>
                            <p className="order-description">{order.description}</p>
                            <p className="order-date">{order.date}</p>
                          </Col>
                          <Col xs={3} md={3} className="text-md-end position-relative">
                            <p className="order-price">EGP {order.price.toFixed(2)}</p>
                            <Button variant="outline-success" size="sm">
                              Order delivered
                            </Button>
                            <FaChevronDown className="order-dropdown-icon" />
                          </Col>
                        </Row>
                      </div>
                    ))
                  ) : (
                    <p>No upcoming orders found.</p>
                  )}
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyOrders;