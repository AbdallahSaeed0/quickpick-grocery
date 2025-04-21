// src/components/Checkout/OrderSummary.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function OrderSummary({ cart, totalPrice, subtotal, shipping, cashHandlingFee, total }) {
  return (
    <Card className="order-summary">
      <Card.Body>
        <h3 className="summary-title mb-4">Order Summary</h3>
        <div className="summary-details">
          <div className="d-flex justify-content-between mb-2">
            <span>Items</span>
            <span>{cart?.length || 0}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Sub Total</span>
            <span>{subtotal.toFixed(2)} EGP</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span>{shipping.toFixed(2)} EGP</span>
          </div>
          {cashHandlingFee > 0 && (
            <div className="d-flex justify-content-between mb-2">
              <span>Cash Handling Fee</span>
              <span>{cashHandlingFee.toFixed(2)} EGP</span>
            </div>
          )}
          <hr />
          <div className="d-flex justify-content-between summary-total">
            <strong>Total</strong>
            <strong>{total} EGP</strong>
          </div>
        </div>
        <Button
          variant="success"
          className="proceed-btn w-100 mt-4"
          type="submit"
          form="checkoutForm"
        >
          Proceed to Payment
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrderSummary;