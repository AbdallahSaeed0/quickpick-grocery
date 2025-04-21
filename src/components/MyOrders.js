import React, { useState, useContext, useEffect } from 'react';
import { Nav, Tab, Row, Col, Button, Container, Collapse } from 'react-bootstrap';
import AccountSidebar from '../components/AccountSidebar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MyOrders.css';

function MyOrders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [orderTab, setOrderTab] = useState('upcoming');
  const [orders, setOrders] = useState({ past: [], upcoming: [] });
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || { past: [], upcoming: [] };
    console.log('Loaded orders in MyOrders:', savedOrders);
    setOrders(savedOrders);
  }, [location]);

  useEffect(() => {
    console.log('orders.upcoming changed:', orders.upcoming);
  }, [orders.upcoming]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const toggleDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

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
              <Tab.Container
                id="order-tabs"
                activeKey={orderTab}
                onSelect={(key) => setOrderTab(key)}
              >
                <Nav variant="tabs" className="mb-4 justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="past">PAST</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="upcoming">UPCOMING</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="past">
                    {orders.past && orders.past.length > 0 ? (
                      orders.past.map((order) => (
                        <div key={order.id} className="order-item mb-3 p-3">
                          <Row className="align-items-center">
                            <Col xs={12}>
                              <h5 className="order-title">Order #{order.id}</h5>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <p className="order-status mb-0">
                                    {order.status || 'Order delivered'}
                                  </p>
                                  <p className="order-total mb-0">
                                    Total: EGP {parseFloat(order.total || order.price || 0).toFixed(2)}
                                  </p>
                                </div>
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => toggleDetails(order.id)}
                                  aria-controls={`collapse-details-${order.id}`}
                                  aria-expanded={openOrderId === order.id}
                                >
                                  {openOrderId === order.id ? 'Hide Details' : 'Show Details'}
                                </Button>
                              </div>
                              <Collapse in={openOrderId === order.id}>
                                <div id={`collapse-details-${order.id}`} className="mt-3">
                                  <p className="order-description">{order.description}</p>
                                  <p className="order-date">{order.date}</p>
                                  <p className="order-shipping">
                                    Shipping fees: EGP {parseFloat(order.shipping || 0).toFixed(2)}
                                  </p>
                                  <p className="order-subtotal">
                                    Subtotal: EGP {(parseFloat(order.price || 0) - parseFloat(order.shipping || 0)).toFixed(2)}
                                  </p>
                                  {order.items && order.items.length > 0 && (
                                    <div className="order-items">
                                      <strong>Items:</strong>
                                      {order.items.map((item, index) => (
                                        <p key={index} className="mb-0">
                                          {item.name} - {item.quantity} x EGP {parseFloat(item.price).toFixed(2)}
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Collapse>
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p>No past orders found.</p>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="upcoming">
                    {orders.upcoming && orders.upcoming.length > 0 ? (
                      orders.upcoming.map((order) => (
                        <div key={order.id} className="order-item mb-3 p-3">
                          <Row className="align-items-center">
                            <Col xs={12}>
                              <h5 className="order-title">Order #{order.id}</h5>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <p className="order-status mb-0">
                                    {order.status || 'Order placed'}
                                  </p>
                                  <p className="order-total mb-0">
                                    Total: EGP {parseFloat(order.total || order.price || 0).toFixed(2)}
                                  </p>
                                </div>
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => toggleDetails(order.id)}
                                  aria-controls={`collapse-details-${order.id}`}
                                  aria-expanded={openOrderId === order.id}
                                >
                                  {openOrderId === order.id ? 'Hide Details' : 'Show Details'}
                                </Button>
                              </div>
                              <Collapse in={openOrderId === order.id}>
                                <div id={`collapse-details-${order.id}`} className="mt-3">
                                  <p className="order-description">{order.description}</p>
                                  <p className="order-date">{order.date}</p>
                                  <p className="order-shipping">
                                    Shipping fees: EGP {parseFloat(order.shipping || 0).toFixed(2)}
                                  </p>
                                  <p className="order-subtotal">
                                    Subtotal: EGP {(parseFloat(order.price || 0) - parseFloat(order.shipping || 0)).toFixed(2)}
                                  </p>
                                  {order.items && order.items.length > 0 && (
                                    <div className="order-items">
                                      <strong>Items:</strong>
                                      {order.items.map((item, index) => (
                                        <p key={index} className="mb-0">
                                          {item.name} - {item.quantity} x EGP {parseFloat(item.price).toFixed(2)}
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Collapse>
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p>No upcoming orders found.</p>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyOrders;