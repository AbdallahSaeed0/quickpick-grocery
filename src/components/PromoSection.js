import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PromoSection.css';

function PromoSection() {
  return (
    <div className="promo-section py-5">
      <Container>
        <Row>
          {/* Card 1: Cooking Ideas */}
          <Col md={6} className="mb-4">
            <div
              className="promo-card"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/cooking-ideas.jpg)`,
              }}
            >
              <div className="badge badge-primary">Looking for cooking ideas?</div>
              <h3 className="promo-title">
                We’re here to help you save with no fees!
              </h3>
              <Button variant="warning" className="promo-button">
                Get Started
              </Button>
            </div>
          </Col>

          {/* Card 2: Fast Delivery */}
          <Col md={6} className="mb-4">
            <div
              className="promo-card"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/fast-delivery.jpg)`,
              }}
            >
              <div className="badge badge-primary">Need groceries ASAP?</div>
              <h3 className="promo-title">
                With QuickPick’s lightning-fast delivery, your essentials arrive at
                your doorstep in no time—fresh, reliable, and hassle-free!
              </h3>
              <Button variant="warning" className="promo-button">
                Get Started
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PromoSection;