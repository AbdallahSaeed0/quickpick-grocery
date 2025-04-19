import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Checkout.css';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [useAnotherAddress, setUseAnotherAddress] = useState(false);
  const [instantDelivery, setInstantDelivery] = useState(false);
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('Earliest Available');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleDeliveryChange = (e) => {
    const isChecked = e.target.checked;
    setScheduleDelivery(isChecked);
    if (isChecked) {
      setShowScheduleModal(true);
    }
  };

  const handleModalClose = () => {
    setShowScheduleModal(false);
    // If the user closes the modal without saving, uncheck the "Delivery schedule" option
    if (!deliveryTime) {
      setScheduleDelivery(false);
    }
  };

  const handleModalSave = () => {
    setShowScheduleModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout submitted:', {
      billingDetails,
      useDefaultAddress,
      useAnotherAddress,
      instantDelivery,
      scheduleDelivery,
      deliveryDate,
      deliveryTime,
      deliveryInstructions,
      paymentMethod,
      saveCard,
    });
    // Redirect to Order Confirmation page
    navigate('/order-confirmation', {
      state: {
        orderDetails: {
          orderId: 'SD1254FD', // Hardcoded for now
          paymentMethod: paymentMethod || 'Cash',
          transactionId: 'TRG4295FFE', // Hardcoded for now
          estimatedDelivery: '29 July 2024', // Hardcoded for now
          cartItems: cart,
          subtotal: parseFloat(totalPrice),
          shipping: 0.00,
          couponDiscount: 10.00,
          total: (parseFloat(totalPrice) - 10.00).toFixed(2),
        },
      },
    });
  };

  // Order summary calculations
  const subtotal = parseFloat(totalPrice);
  const shipping = 0.00;
  const couponDiscount = 10.00;
  const total = (subtotal - couponDiscount).toFixed(2);

  return (
    <div className="checkout-page">
      <Container className="py-5">
        <Row>
          {/* Left Side: Billing Details, Delivery Options, Payment Methods */}
          <Col md={8}>
            {/* Billing Details */}
            <h2 className="section-title mb-4">Billing Details</h2>
            <Form onSubmit={handleSubmit} id="checkoutForm">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="firstName">
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      value={billingDetails.firstName}
                      onChange={handleBillingChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="lastName">
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={billingDetails.lastName}
                      onChange={handleBillingChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="email" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={billingDetails.email}
                  onChange={handleBillingChange}
                />
              </Form.Group>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={billingDetails.phone}
                  onChange={handleBillingChange}
                />
              </Form.Group>

              {/* Address Options */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Use default address"
                    checked={useDefaultAddress}
                    onChange={(e) => setUseDefaultAddress(e.target.checked)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Use another address"
                    checked={useAnotherAddress}
                    onChange={(e) => setUseAnotherAddress(e.target.checked)}
                  />
                </Col>
              </Row>

              {/* Delivery Options */}
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Instant delivery"
                    checked={instantDelivery}
                    onChange={(e) => setInstantDelivery(e.target.checked)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Delivery schedule"
                    checked={scheduleDelivery}
                    onChange={handleScheduleDeliveryChange}
                  />
                </Col>
              </Row>

              {/* Payment Methods */}
              <h2 className="section-title mb-4">Select Payment Method</h2>
              <p className="payment-note mb-3">All payments are secured and encrypted.</p>

              {/* Credit/Debit Card */}
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
                      <Form.Group controlId="cardNumber" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Card Number"
                          required={paymentMethod === 'card'}
                        />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="cardExpiry" className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="MM/YY"
                              required={paymentMethod === 'card'}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="cardCVV" className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="CVV"
                              required={paymentMethod === 'card'}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="cardHolder" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Cardholder Name"
                          required={paymentMethod === 'card'}
                        />
                      </Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="Save card for future purchases"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                      />
                    </>
                  )}
                </Card.Body>
              </Card>

              {/* Mobile Wallets */}
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

              {/* Cash on Delivery */}
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
            </Form>
          </Col>

          {/* Right Side: Order Summary */}
          <Col md={4}>
            <Card className="order-summary">
              <Card.Body>
                <h3 className="summary-title mb-4">Order Summary</h3>
                <div className="summary-details">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Items</span>
                    <span>{cart.length}</span>
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
                    <span>Coupon Discount</span>
                    <span>-{couponDiscount.toFixed(2)} EGP</span>
                  </div>
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
          </Col>
        </Row>
      </Container>

      
      <Modal show={showScheduleModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Delivery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="deliveryDate">
                <Form.Label>Select Delivery Date</Form.Label>
                <Form.Control
                  as="select"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                >
                  <option>Earliest Available</option>
                  <option disabled>Holidays disabled</option>
                  {/* Add more date options as needed */}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Label>Select Time Slot</Form.Label>
              <div>
                {['on 9:00 AM - 12:00 PM', 'on 12:00 PM - 3:00 PM', 'on 3:00 PM - 6:00 PM', 'on 6:00 PM - 9:00 PM'].map((slot) => (
                  <Form.Check
                    key={slot}
                    type="radio"
                    name="deliveryTime"
                    label={slot}
                    value={slot}
                    checked={deliveryTime === slot}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Col>
          </Row>
          <p className="text-muted">
            on Delivery anytime on selected day <br />
            This option allows for flexibility in delivery timing.
          </p>
          <Form.Group controlId="deliveryInstructions">
            <Form.Label>Delivery Instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Leave at door, Call when arriving"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Checkout;