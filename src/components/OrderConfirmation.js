import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OrderConfirmation.css';
import { useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const { state } = useLocation();
  const { orderDetails } = state || {};

  // If orderDetails is not available, show a fallback message
  if (!orderDetails) {
    return <div>No order details available.</div>;
  }

  // Destructure with default values to prevent undefined errors
  const {
    orderId = 'N/A',
    paymentMethod = 'N/A',
    transactionId = 'N/A',
    estimatedDelivery = 'N/A',
    cartItems = [], // Default to empty array
    subtotal = 0,
    shipping = 0,
    total = 0,
  } = orderDetails;

  return (
    <div className="order-confirmation-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-4">
              <i className="bi bi-check-circle-fill check-icon"></i>
              <h1 className="confirmation-title">Your order is completed!</h1>
              <p className="confirmation-message">Thank you. Your Order has been received.</p>
            </div>

            <div className="order-info d-flex justify-content-between align-items-center flex-wrap mb-4">
              <div>
                <strong>Order</strong><br />
                #{orderId}
              </div>
              <div>
                <strong>Payment Method</strong><br />
                {paymentMethod}
              </div>
              <div>
                <strong>Transaction ID</strong><br />
                {transactionId}
              </div>
              <div>
                <strong>Estimated Delivery</strong><br />
                {estimatedDelivery}
              </div>
              <Button variant="warning" className="download-btn">
                Download Invoice
              </Button>
            </div>

            <div className="order-details">
              <h3 className="details-title mb-3">Order Details</h3>
              <div className="mb-3">
                <strong>Products</strong>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="cart-item-detail">
                      {item.name} - {item.quantity} x {(parseFloat(item.price) * item.quantity).toFixed(2)} EGP
                    </div>
                  ))
                ) : (
                  <div>No items in this order.</div>
                )}
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Sub Total</span>
                <span>{parseFloat(subtotal).toFixed(2)} EGP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>{parseFloat(shipping).toFixed(2)} EGP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes</span>
                <span>0.00 EGP</span>
              </div>
              {/* Removed Coupon Discount */}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>{parseFloat(total).toFixed(2)} EGP</strong>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderConfirmation;