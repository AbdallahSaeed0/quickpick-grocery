import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OrderConfirmation.css';
import { useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const { state } = useLocation();
  const { orderDetails } = state || {};

  if (!orderDetails) {
    return <div>No order details available.</div>;
  }

  const { orderId, paymentMethod, transactionId, estimatedDelivery, cartItems, subtotal, shipping, couponDiscount, total } = orderDetails;

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
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-detail">
                    {item.name} - {item.quantity} x {(parseFloat(item.price) * item.quantity).toFixed(2)} EGP
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Sub Total</span>
                <span>{subtotal.toFixed(2)} EGP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)} EGP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes</span>
                <span>0.00 EGP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Coupon Discount</span>
                <span>-{couponDiscount.toFixed(2)} EGP</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>{total} EGP</strong>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderConfirmation;