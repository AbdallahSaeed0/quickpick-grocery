import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/PopularProducts.css';
import productData from '../data/products.json'; // Import the JSON file

function PopularProducts() {
  const [products, setProducts] = useState([]);

  // Load products from the JSON file on component mount
  useEffect(() => {
    // Set products from JSON data, limiting to the first 6
    const limitedProducts = productData.slice(0, 6); // Take only the first 6 products
    setProducts(limitedProducts);
  }, []);

  const handleAddToCart = (product) => {
    // Placeholder for add-to-cart functionality
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    <div className="popular-products py-5">
      <Container>
        {/* Title */}
        <h2 className="section-title mb-4">QuickPick Popular Products</h2>

        {/* Product Cards */}
        <Row>
          {products.map((product) => (
            <Col md={2} key={product.id} className="mb-4">
              <Link to={`/product/${product.id}`} className="product-link">
                <Card className="product-card">
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + product.image} // Prepend PUBLIC_URL to the image path
                    alt={product.name}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="product-title">
                      <Card.Title className="product-title">{product.name}</Card.Title>
                    </Card.Title>
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
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PopularProducts;