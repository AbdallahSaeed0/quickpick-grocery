import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

function PaymentMethodForm({
  paymentMethod,
  setPaymentMethod,
  showCardModal,
  setShowCardModal,
  selectedCard,
  saveCard,
  handleSaveCardChange,
}) {
  return (
    <>
      <h2 className="section-title mb-4">Select Payment Method</h2>
      <p className="payment-note mb-3">All payments are secured and encrypted.</p>

      <Card className="payment-method-card mb-3">
        <Card.Body>
          <Form.Check
            type="radio"
            name="paymentMethod"
            label="Credit / Debit Card"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mb-3"
          />
          {paymentMethod === 'card' && (
            <>
              <Button
                variant="outline-success"
                className="mb-3"
                onClick={() => setShowCardModal(true)}
              >
                {selectedCard ? 'Change Card' : 'Select or Add Card'}
              </Button>
              {selectedCard && (
                <div className="selected-card mb-3">
                  <h5>Selected Card</h5>
                  <p>{selectedCard.number} (Expires {selectedCard.expiry})</p>
                </div>
              )}
              <Form.Check
                type="checkbox"
                label="Save card for future purchases"
                checked={saveCard}
                onChange={handleSaveCardChange}
              />
            </>
          )}
        </Card.Body>
      </Card>

      <Card className="payment-method-card mb-3">
        <Card.Body>
          <Form.Check
            type="radio"
            name="paymentMethod"
            label="Mobile Wallets"
            value="mobile"
            checked={paymentMethod === 'mobile'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mb-3"
          />
          {paymentMethod === 'mobile' && (
            <Row>
              <Col md={6}>
                <Button variant="outline-secondary" className="w-100">
                  Apple Pay
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-secondary" className="w-100">
                  Google Pay
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <Card className="payment-method-card mb-3">
        <Card.Body>
          <Form.Check
            type="radio"
            name="paymentMethod"
            label="Cash on Delivery"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <p className="payment-note mt-2">
            Please prepare the exact amount if possible. <br />
            +10 EGP cash handling fee
          </p>
        </Card.Body>
      </Card>
    </>
  );
}

export default PaymentMethodForm;