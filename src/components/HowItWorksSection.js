import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HowItWorksSection.css';

function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState('variant1');

  const variants = {
    variant1: {
      cards: [
        {
          title: 'Place an Order!',
          image: process.env.PUBLIC_URL + '/assets/howit-3.png',
          subtitle: 'Place order through ourwebsite or Mobile app',
        },
        {
          title: 'Track Progress',
          image: process.env.PUBLIC_URL + '/assets/howit-1.png',
          subtitle: "Your can track your order status with delivery time",
        },
        {
          title: 'Get your Order!',
          image: process.env.PUBLIC_URL + '/assets/howit-2.png',
          subtitle: 'Receive your order at alighting fast speed!',
        },
      ],
      description: 'QuickPick makes grocery shopping effortless!  Browse a wide selection of products, pick your favorite items, and checkout in seconds. Your essentials will be delivered straight to your doorstep—fast, fresh, and hassle-free!',
    },
    variant2: {
      cards: [
        {
          title: 'Pay with Ease',
          image: process.env.PUBLIC_URL + '/assets/payment-methods-1.png',
          subtitle: 'Securely checkout using Visa, Mastercard, and more! Fast, safe, and hassle-free',
        },
        {
          title: 'Mobile Payments',
          image: process.env.PUBLIC_URL + '/assets/payment-methods-2.png',
          subtitle: 'Use Apple Pay or Google Pay for a one-click, ultra-fast checkout experience.',
        },
        {
          title: 'Pay When You Receive!',
          image: process.env.PUBLIC_URL + '/assets/payment-methods-3.png',
          subtitle: 'Prefer cash? No problem! Pay upon delivery, stress-free.',
        },
      ],
      description: 'QuickPick makes grocery shopping effortless! Browse a wide selection of products, pick your favorite items, and checkout in seconds. Your essentials will be delivered straight to your doorstep—fast, fresh, and hassle-free!',
    },
    variant3: {
      cards: [
        {
          title: 'Yes!',
          image: process.env.PUBLIC_URL + '/assets/order-1.png',
          subtitle: 'You can track your order in real-time!',
        },
        {
          title: 'Once your order is confirmed',
          image: process.env.PUBLIC_URL + '/assets/order-2.png',
          subtitle: "You'll see every step of the process, from preparation to delivery.",
        },
        {
          title: 'Stay in the loop',
          image: process.env.PUBLIC_URL + '/assets/howit-2.png',
          subtitle: 'Stay updated as your order speeds its way to your doorstep!',
        },
      ],
      description: 'QuickPick makes grocery shopping effortless! Browse a wide selection of products, pick your favorite items, and checkout in seconds. Your essentials will be delivered straight to your doorstep—fast, fresh, and hassle-free!',
    },
    variant4: {
      title: 'Yes, we have some exciting discounts and promotions just for you!',
      description: 'QuickPick offers special deals, seasonal offers, and exclusive discounts on your favorite products. Stay tuned for flash sales and surprise deals to make your shopping even better!',
      image: process.env.PUBLIC_URL + '/assets/dicounts.png',
      descriptionBelow: 'QuickPick makes grocery shopping effortless! Browse a wide selection of products, pick your favorite items, and checkout in seconds. Your essentials will be delivered straight to your doorstep—fast, fresh, and hassle-free!',
    },
    variant5: {
      title: "We're expanding fast!",
      description: 'To check QuickPick deliveries in your location, if we’re not in your area yet, don’t worry! Stay tuned as we’re constantly adding new locations.',
      image: process.env.PUBLIC_URL + '/assets/expanding.png',
      descriptionBelow: 'QuickPick makes grocery shopping effortless! Browse a wide selection of products, pick your favorite items, and checkout in seconds. Your essentials will be delivered straight to your doorstep—fast, fresh, and hassle-free!',
    },
  };

  return (
    <div className="py-5">
      <Container className="how-it-works-div">
        {/* Title */}
        <h2 className="section-title mb-4">How does QuickPick work?</h2>

        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
          <Row className="how-it-works-section justify-content-center">
            {/* Left Side: Questions (Tabs) */}
            <Col md={9} lg={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="variant1">How does QuickPick work?</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="variant2">What payment methods are accepted?</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="variant3">Can I track my order in real-time?</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="variant4">Are there any special discounts or promotions available?</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="variant5">Is QuickPick available in my area?</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            {/* Right Side: Tab Content */}
            <Col md={9}>
              <Tab.Content>
                {/* Tab 1: Three Cards */}
                <Tab.Pane eventKey="variant1">
                  <Row className="justify-content-center">
                    {variants.variant1.cards.map((card, index) => (
                      <Col md={10} lg={4} key={index} className="mb-4">
                        <Card className="how-it-works-card">
                          <Card.Title className="card-title">{card.title}</Card.Title>
                          <Card.Img
                            src={card.image}
                            alt={card.title}
                            className="card-image"
                          />
                          <Card.Subtitle className="card-subtitle">
                            {card.subtitle}
                          </Card.Subtitle>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <p className="description">{variants.variant1.description}</p>
                </Tab.Pane>

                {/* Tab 2: Three Cards */}
                <Tab.Pane eventKey="variant2">
                  <Row className="justify-content-center">
                    {variants.variant2.cards.map((card, index) => (
                      <Col md={10} lg={4} key={index} className="mb-4">
                        <Card className="how-it-works-card">
                          <Card.Title className="card-title">{card.title}</Card.Title>
                          <Card.Img
                            src={card.image}
                            alt={card.title}
                            className="card-image"
                          />
                          <Card.Subtitle className="card-subtitle">
                            {card.subtitle}
                          </Card.Subtitle>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <p className="description">{variants.variant2.description}</p>
                </Tab.Pane>

                {/* Tab 3: Three Cards */}
                <Tab.Pane eventKey="variant3">
                  <Row className="justify-content-center">
                    {variants.variant3.cards.map((card, index) => (
                      <Col md={10} lg={4} key={index} className="mb-4">
                        <Card className="how-it-works-card">
                          <Card.Title className="card-title">{card.title}</Card.Title>
                          <Card.Img
                            src={card.image}
                            alt={card.title}
                            className="card-image"
                          />
                          <Card.Subtitle className="card-subtitle">
                            {card.subtitle}
                          </Card.Subtitle>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <p className="description">{variants.variant3.description}</p>
                </Tab.Pane>

                {/* Tab 4: Single Large Card with Image */}
                <Tab.Pane eventKey="variant4">
                  <Row className="align-items-center">
                    <Col md={12} className="mb-4">
                      <Card className="large-card">
                        <Card.Body className="row">
                        <Col md={12} lg={8} className="mb-4">
                        <Card.Title className="large-card-title">
                            {variants.variant4.title}
                          </Card.Title>
                          <Card.Text className="large-card-description">
                            {variants.variant4.description}
                          </Card.Text>
                        </Col>
                        <Col md={12} lg={4} className="mb-4">
                        <img
                            src={variants.variant4.image}
                            alt="Discounts"
                            className="large-card-image"
                            />
                        </Col>
                          
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <p className="description">{variants.variant4.descriptionBelow}</p>
                </Tab.Pane>

                {/* Tab 5: Single Large Card with Image */}
                <Tab.Pane eventKey="variant5">
                  <Row className="align-items-center">
                    <Col md={12} className="mb-4">
                      <Card className="large-card">
                        <Card.Body className="row">
                        <Col md={12} lg={8} className="mb-4">
                        <Card.Title className="large-card-title">
                            {variants.variant5.title}
                          </Card.Title>
                          <Card.Text className="large-card-description">
                            {variants.variant5.description}
                          </Card.Text>
                        </Col>
                        <Col md={12} lg={4} className="mb-4">
                        <img
                            src={variants.variant5.image}
                            alt="Discounts"
                            className="large-card-image"
                            />
                        </Col>
                          
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <p className="description">{variants.variant5.descriptionBelow}</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default HowItWorksSection;