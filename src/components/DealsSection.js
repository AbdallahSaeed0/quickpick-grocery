import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DealsSection.css';

function DealsSection() {
  return (
    <div className="deals-section py-5">
      <Container>
        {/* Title */}
        <h2 className="section-title mb-4">
        Up to -40% QuickPick exclusive deals
        </h2>

        <Row className="align-items-start">
          {/* Left Side: Three Cards */}
          <Col md={12}>
            <Row className="justify-content-center">
              {/* Card 1: Snacks */}
              <Col md={6} lg={4} className="mb-4 col-9">
                <Card className="deal-card shadow-top-left">
                  <div className="layout-back"></div>
                  <div className="discount-badge">-17%</div>
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + '/assets/snacks.jpg'}
                    alt="Snacks"
                  />
                  <div className="name-deal">
                    <Card.Title>Snacks</Card.Title>
                  </div>
                </Card>
              </Col>

              {/* Card 2: Babies Care */}
              <Col md={6} lg={4} className="mb-4 col-9">
                <Card className="deal-card">
                  <div className="layout-back"></div>
                  <div className="discount-badge">-10%</div>
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + '/assets/babies-care.jpg'}
                    alt="Babies Care"
                  />
                  <div className="name-deal">
                    <Card.Title>Babies care</Card.Title>
                  </div>
                </Card>
              </Col>

              {/* Card 3: Personal Care */}
              <Col md={6} lg={4} className="mb-4 col-9">
                <Card className="deal-card">
                  <div className="layout-back"></div>
                  <div className="discount-badge">-40%</div>
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + '/assets/personal-care.jpg'}
                    alt="Personal Care"
                  />
                  <div className="name-deal">
                    <Card.Title>Personal care</Card.Title>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DealsSection;