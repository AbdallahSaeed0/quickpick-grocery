// src/components/Checkout/PaymentMethods.js
import React from 'react';
import { Row, Col, Form, Card, Modal, Button } from 'react-bootstrap';

function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  showCardModal,
  setShowCardModal,
  selectedCard,
  setSelectedCard,
  saveCard,
  setSaveCard,
  cards,
  setCards,
  newCard,
  setNewCard,
  handleSaveCardChange,
  handleCardModalClose,
  handleNewCardChange,
  handleSaveNewCard,
  handleSelectCard,
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

      <Modal show={showCardModal} onHide={handleCardModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select or Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cards.length > 0 ? (
            <>
              <h5>Saved Cards</h5>
              {cards.map((card) => (
                <Card key={card.id} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{card.number}</strong>
                        <p>Expires {card.expiry}</p>
                      </div>
                      <Button variant="success" onClick={() => handleSelectCard(card)}>
                        Select
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <p>No saved cards found.</p>
          )}
          <h5>Add New Card</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Number *</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={newCard.number}
                onChange={handleNewCardChange}
                placeholder="0000 0000 0000 0000"
                required
              />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Expiry Date *</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiry"
                    value={newCard.expiry}
                    onChange={handleNewCardChange}
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CVC *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvc"
                    value={newCard.cvc}
                    onChange={handleNewCardChange}
                    placeholder="123"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Holder Name *</Form.Label>
              <Form.Control
                type="text"
                name="holderName"
                value={newCard.holderName}
                onChange={handleNewCardChange}
                placeholder="Cardholder Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Type *</Form.Label>
              <Form.Select
                name="type"
                value={newCard.type}
                onChange={handleNewCardChange}
                required
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCardModalClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveNewCard}>
            Save Card
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaymentMethod;