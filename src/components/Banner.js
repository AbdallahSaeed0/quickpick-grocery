import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Banner.css';

function Banner() {
  return (
    <div className="banner-section d-flex align-items-center container">
      <Container className="p-0">
        <Row className="align-items-center m-0">
          {/* Left Side: Text and Search Input */}
          <Col md={6} className="text-left">
            <h1 className="banner-title">
              Make healthy life with <span className="text-success">Fresh Grocery.</span> Product.
            </h1>
            <p className="banner-subtitle">
              Enter a postcode to see what we deliver
            </p>
            <Form>
              <InputGroup className="custom-input-group">
                <Form.Control
                  type="text"
                  placeholder="e.g. EC4R 3TE"
                  className="custom-input"
                />
                <Button variant="success" className="custom-button">
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>

          {/* Right Side: Empty since image is now a background */}
          <Col md={6}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;