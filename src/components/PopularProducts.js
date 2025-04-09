import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PopularProducts.css';

function PopularProducts() {
  const products = [
    {
      id: 1,
      name: 'Helwa mixed oil - 2.25 l',
      price: '158.25 LE',
      image: process.env.PUBLIC_URL + '/assets/product-1.jpg',
    },
    {
      id: 2,
      name: 'Lipton Black Tea Soft, 500 gm',
      price: '94.95 LE',
      image: process.env.PUBLIC_URL + '/assets/product-2.jpg',
    },
    {
      id: 3,
      name: 'Lamar full fat milk - 1 liter',
      price: '42.95 LE',
      image: process.env.PUBLIC_URL + '/assets/product-3.jpg',
    },
    {
      id: 4,
      name: 'Nescafe Classic Instant Coffee Pouch 200g',
      price: '212.95 LE',
      image: process.env.PUBLIC_URL + '/assets/product-4.jpg',
    },
    {
      id: 5,
      name: 'Al Doha Egyptian Rice - 1 kg',
      price: '63.95 LE',
      image: process.env.PUBLIC_URL + '/assets/product-5.jpg',
    },
    {
      id: 6,
      name: 'Organo Natural Vinegar With 5% Acidity 900 ML - Clear',
      price: '11.00 LE',
      image: process.env.PUBLIC_URL + '/assets/product-6.jpg',
    },
  ];

  const handleAddToCart = (product) => {
    // Placeholder for add-to-cart functionality
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    <div className="popular-products py-5">
      <Container>
        {/* Title */}
        <h2 className="section-title mb-4">QuickPick Popular products</h2>

        {/* Product Cards */}
        <Row>
          {products.map((product) => (
            <Col md={2} key={product.id} className="mb-4">
              <Card className="product-card">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="product-title">{product.name}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="product-price">{product.price}</span>
                    <Button
                      variant="success"
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PopularProducts;