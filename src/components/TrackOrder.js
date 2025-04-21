import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Alert, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TrackOrder.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function TrackOrder() {
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSearch = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || { past: [], upcoming: [] };
    const allOrders = [...savedOrders.past, ...savedOrders.upcoming];
    const foundOrder = allOrders.find((o) => o.id === orderId);

    if (foundOrder) {
      console.log('Found order:', foundOrder); // Debug the order
      setOrder(foundOrder);
      setError('');
    } else {
      setOrder(null);
      setError('Order not found. Please check the Order ID and try again.');
    }
  };

  const trackingStatuses = [
    { status: 'Order placed', date: '28 July 2024, 11:00 PM' },
    { status: 'Accepted', date: '29 July 2024, 11:15 PM' },
    { status: 'In Progress', date: '30 July 2024' },
    { status: 'On the Way', date: '30 July 2024' },
    { status: 'Delivered', date: '30 July 2024' },
  ];

  const getProgress = () => {
    if (!order || !order.tracking) return 0;
    const latestStatus = order.tracking[order.tracking.length - 1].status;
    const statusIndex = trackingStatuses.findIndex((s) => s.status === latestStatus);
    return ((statusIndex + 1) / trackingStatuses.length) * 100;
  };

  const canEditOrder = () => {
    if (!order || !order.tracking) return false;
    const latestStatus = order.tracking[order.tracking.length - 1].status;
    return latestStatus === 'Order placed';
  };

  const handleEditOrder = () => {
    setShowEditModal(true);
  };

  const confirmEditOrder = () => {
    if (order && order.items) {
      setCart(order.items);
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || { past: [], upcoming: [] };
      savedOrders.upcoming = savedOrders.upcoming.filter((o) => o.id !== order.id);
      savedOrders.past = savedOrders.past.filter((o) => o.id !== order.id);
      localStorage.setItem('orders', JSON.stringify(savedOrders));
      navigate('/cart', { state: { fromEditOrder: true } });
    }
    setShowEditModal(false);
  };

  return (
    <div className="track-order-page">
      <Container className="py-5">
        <h2 className="section-title mb-4">Track Your Order</h2>
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <Form inline className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter Order ID (e.g., SDGT1254FD)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="mr-2 flex-grow-1"
              />
              <Button variant="success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {order && (
          <>
            <h4 className="order-status-title mb-3">
              ORDER STATUS
              <br />
              OrderID: #{order.id}
            </h4>
            <Row className="mb-4">
              <Col>
                <ProgressBar now={getProgress()} className="mb-2" />
                <div className="tracking-timeline d-flex justify-content-between text-center">
                  {trackingStatuses.map((status, index) => {
                    const orderTracking = order.tracking.find((t) => t.status === status.status);
                    const isCompleted = order.tracking.some((t) => t.status === status.status);
                    const isFuture = !isCompleted && trackingStatuses.findIndex((s) => s.status === order.tracking[order.tracking.length - 1].status) < index;

                    return (
                      <div key={index} className="tracking-step">
                        <div className={`tracking-icon ${isCompleted ? 'completed' : ''}`}>
                          {status.status === 'Order placed' && <i className="bi bi-hand-index-thumb"></i>}
                          {status.status === 'Accepted' && <i className="bi bi-check-circle"></i>}
                          {status.status === 'In Progress' && <i className="bi bi-hourglass-split"></i>}
                          {status.status === 'On the Way' && <i className="bi bi-truck"></i>}
                          {status.status === 'Delivered' && <i className="bi bi-check-circle-fill"></i>}
                        </div>
                        <p className="tracking-status">{status.status}</p>
                        {(isCompleted || isFuture) && (
                          <p className="tracking-date">
                            {isFuture ? 'Expected at ' : ''}{isCompleted ? orderTracking.date : status.date}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <h5 className="mb-3">Products</h5>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="product-item d-flex align-items-center mb-3">
                      <div
                        className="product-image-placeholder mr-3"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (item.image || '/assets/placeholder.jpg')})` }}
                      ></div>
                      <div className="flex-grow-1">
                        <p className="mb-0">{item.name}</p>
                        <p className="text-muted mb-0">
                          {item.quantity} x EGP {parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found in this order.</p>
                )}
              </Col>
              <Col md={4} className="text-right">
                {canEditOrder() && (
                  <Button variant="outline-success" onClick={handleEditOrder}>
                    Edit Order
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Hi there, you can still make changes to your order as long as it has not shipped.
          </p>
          <div className="d-flex justify-content-center mb-3">
            <Button variant="success" disabled>
              preparing
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => setShowEditModal(false)}>
            Keep as is
          </Button>
          <Button variant="success" onClick={confirmEditOrder}>
            Edit order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TrackOrder;