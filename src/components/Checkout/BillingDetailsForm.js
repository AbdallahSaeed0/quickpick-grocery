import React, { useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function BillingDetailsForm({ billingDetails, setBillingDetails, handleBillingChange, user }) {
  // Prefill billing details with user account information if available
  useEffect(() => {
    if (user) {
      // Split fullName into firstName and lastName
      const [firstName, ...lastNameParts] = (user.fullName || '').split(' ');
      const lastName = lastNameParts.join(' ') || ''; // Handle case where there's no last name

      setBillingDetails({
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email || '',
        phone: user.phone || billingDetails.phone || '', // Use phone from user, fallback to existing value
      });
    }
  }, [user, setBillingDetails]);

  return (
    <>
      <h2 className="section-title mb-4">Billing Details</h2>
      {user && (
        <p className="text-muted mb-3">
          Using account details for {user.email}. You can edit the fields below if needed.
        </p>
      )}
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
    </>
  );
}

export default BillingDetailsForm;