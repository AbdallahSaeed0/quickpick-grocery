// src/components/Checkout/DeliveryOptions.js
import React from 'react';
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';

function DeliveryOptions({
  instantDelivery,
  setInstantDelivery,
  scheduleDelivery,
  setScheduleDelivery,
  showScheduleModal,
  setShowScheduleModal,
  deliveryDate,
  setDeliveryDate,
  deliveryTime,
  setDeliveryTime,
  deliveryInstructions,
  setDeliveryInstructions,
  handleInstantDeliveryChange,
  handleScheduleDeliveryChange,
  handleModalClose,
  handleModalSave,
}) {
  return (
    <>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Check
            type="checkbox"
            label="Instant delivery"
            checked={instantDelivery}
            onChange={handleInstantDeliveryChange}
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
    </>
  );
}

export default DeliveryOptions;