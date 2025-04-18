import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Banner.css';

function Banner() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/search', { state: { searchTerm, fromSearch: true } });
    } else {
      navigate('/search'); // Navigate without search term if empty
    }
  };

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
              Enter a product name to see what we deliver
            </p>
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup className="custom-input-group">
                <Form.Control
                  type="text"
                  placeholder="Search for products"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="custom-input"
                />
                <Button type="submit" variant="success" className="custom-button">
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