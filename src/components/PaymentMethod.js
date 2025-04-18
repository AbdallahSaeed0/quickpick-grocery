import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AccountSidebar from '../components/AccountSidebar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentMethod.css';

function PaymentMethod() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: null,
    cvc: '',
    holderName: '',
    type: 'Visa',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load cards from local storage
  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(
      savedCards.map((card) => ({
        ...card,
        expiry: card.expiry
          ? new Date(`20${card.expiry.split('/')[1]}-${card.expiry.split('/')[0]}-01`)
          : null,
      }))
    );
  }, []);

  // Save cards to local storage
  const saveCards = (updatedCards) => {
    localStorage.setItem(
      'cards',
      JSON.stringify(
        updatedCards.map((card) => ({
          ...card,
          expiry: card.expiry
            ? `${String(card.expiry.getMonth() + 1).padStart(2, '0')}/${card.expiry
                .getFullYear()
                .toString()
                .slice(-2)}`
            : '',
        }))
      )
    );
    setCards(updatedCards);
  };

  // Handle modal open/close
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewCard({ number: '', expiry: null, cvc: '', holderName: '', type: 'Visa' });
    setError('');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date picker change
  const handleDateChange = (date) => {
    setNewCard((prev) => ({ ...prev, expiry: date }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!newCard.number || newCard.number.length < 12) {
      setError('Please enter a valid card number.');
      return;
    }
    if (!newCard.expiry) {
      setError('Please select an expiry date.');
      return;
    }
    if (!newCard.cvc.match(/^\d{3,4}$/)) {
      setError('Please enter a valid CVC (3-4 digits).');
      return;
    }
    if (!newCard.holderName) {
      setError('Please enter the cardholder name.');
      return;
    }

    const maskedNumber = `**** **** **** ${newCard.number.slice(-4)}`;
    const updatedCards = [
      ...cards,
      { ...newCard, number: maskedNumber, expiry: newCard.expiry, id: Date.now() },
    ];
    saveCards(updatedCards);
    setSuccess('Card added successfully!');
    setError('');
    handleCloseModal();
  };

  // Handle remove card
  const handleRemove = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    saveCards(updatedCards);
    setSuccess('Card removed successfully!');
    setError('');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="my-account-page">
      <Container className="py-5">
        <h2 className="section-title mb-4">Payment Method</h2>
        <Row>
          <Col md={3}>
            <AccountSidebar />
          </Col>
          <Col md={9}>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="payment-methods">
              <p className="security-note mb-3">
                Your card details are safe and secure encrypted with us.
              </p>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <Card key={card.id} className="payment-card mb-3">
                    <Card.Body className="d-flex align-items-center">
                      <div className="card-logo me-3">
                      {card.type === 'Mastercard' ? (
                          <img
                          src={process.env.PUBLIC_URL + '/assets/mastercard-logo.png'}
                          alt="mastercard"
                        />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + '/assets/visa-logo.png'}
                            alt="Visa"
                          />
                        )}
                      </div>
                      <div className="card-details flex-grow-1">
                        <p className="card-number mb-1">{card.number}</p>
                        <p className="card-expiry mb-0">
                          Expires{' '}
                          {card.expiry
                            ? `${String(card.expiry.getMonth() + 1).padStart(2, '0')}/${card.expiry
                                .getFullYear()
                                .toString()
                                .slice(-2)}`
                            : 'N/A'}
                        </p>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(card.id)}
                        aria-label={`Remove card ending in ${card.number.slice(-4)}`}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No payment methods saved.</p>
              )}
              <Button variant="success" onClick={handleShowModal}>
                Add a new card
              </Button>
            </div>

            {/* Add Card Modal */}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              dialogClassName="custom-modal"
            >
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Credit or Debit Card Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="number"
                      value={newCard.number}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                      required
                      aria-label="Credit or Debit Card Number"
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Expiry Date *</Form.Label>
                        <DatePicker
                          selected={newCard.expiry}
                          onChange={handleDateChange}
                          dateFormat="MM/yy"
                          showMonthYearPicker
                          placeholderText="MM/YY"
                          className="form-control custom-datepicker"
                          wrapperClassName="custom-datepicker-wrapper"
                          required
                          aria-label="Select card expiry date"
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
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          aria-label="CVC"
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
                      onChange={handleInputChange}
                      placeholder="Cardholder Name"
                      required
                      aria-label="Cardholder Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Card Type *</Form.Label>
                    <Form.Select
                      name="type"
                      value={newCard.type}
                      onChange={handleInputChange}
                      required
                      aria-label="Card Type"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Save changes
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PaymentMethod;