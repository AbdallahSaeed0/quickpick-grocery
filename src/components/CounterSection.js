import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CounterSection.css';

function CounterSection() {
  return (
      <Container className="counter-section">
        <Row>
          <Col md={4} className="text-center counter-border">
            <div className="counter-box">
              <h2 className="counter-number">546+</h2>
              <p className="counter-label">Registered</p>
            </div>
          </Col>
          <Col md={4} className="text-center counter-border">
            <div className="counter-box">
              <h2 className="counter-number">789,900+</h2>
              <p className="counter-label">Orders Delivered</p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="counter-box">
              <h2 className="counter-number">17,457+</h2>
              <p className="counter-label">Food Items</p>
            </div>
          </Col>
        </Row>
      </Container>
  );
}

export default CounterSection;