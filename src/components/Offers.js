import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OffersPage.css';
import { useSearch } from '../context/SearchContext';
import { CartContext } from '../context/CartContext';

function OffersPage() {
  const { parsedProducts } = useSearch();
  const { addToCart } = useContext(CartContext); // Add CartContext
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const productsSection1 = parsedProducts.slice(0, 4);
  const productsSection2 = parsedProducts.slice(4, 8);
  const productsSection3 = parsedProducts.slice(8, 12);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/search', { state: { searchTerm, fromSearch: true } });
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="offers-page">
      <Container className="py-5">
        <Form onSubmit={handleSearchSubmit} className="search-form mb-5">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <div className="search-container">
                <Form.Control
                  type="text"
                  placeholder="Search for products"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-bar"
                />
                <Button type="submit" className="search-btn">
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </Form>

        <Row className="banner banner-1 mb-5 align-items-center">
          <Col md={6}>
            <h2 className="banner-title">Save Up to 60% Off the Grocery Deals!</h2>
            <p className="banner-text">
              The Countdown is on! Grab the best deals while stock lasts.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <Button as={Link} to="/products" className="banner-btn">
              Order Now
            </Button>
          </Col>
        </Row>

        <h3 className="section-title mb-4">View Products</h3>
        <Row className="mb-5">
          {productsSection1.length > 0 ? (
            productsSection1.map((product) => (
              <Col md={3} key={product.id} className="mb-4">
                <Link to={`/product/${product.id}`} className="product-link">
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <Card.Body>
                      <Card.Title className="product-name">{product.name}</Card.Title>
                      <Card.Text className="product-price">
                        EGP {product.price.toFixed(2)}
                      </Card.Text>
                      <Button
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <p>No products found.</p>
            </Col>
          )}
        </Row>

        <Row className="banner banner-2 mb-5 align-items-center">
          <Col md={6}>
            <h2 className="banner-title">A Sparkling Homeware Deal!</h2>
            <p className="banner-text">
              The Countdown is on! Grab the best deals while stock lasts.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <Button as={Link} to="/products" className="banner-btn">
              Order Now
            </Button>
          </Col>
        </Row>

        <h3 className="section-title mb-4">View Products</h3>
        <Row className="mb-5">
          {productsSection2.length > 0 ? (
            productsSection2.map((product) => (
              <Col md={3} key={product.id} className="mb-4">
                <Link to={`/product/${product.id}`} className="product-link">
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <Card.Body>
                      <Card.Title className="product-name">{product.name}</Card.Title>
                      <Card.Text className="product-price">
                        EGP {product.price.toFixed(2)}
                      </Card.Text>
                      <Button
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <p>No products found.</p>
            </Col>
          )}
        </Row>

        <Row className="banner banner-3 mb-5 align-items-center">
          <Col md={6}>
            <h2 className="banner-title">Glow with Unstoppable Beauty!</h2>
            <p className="banner-text">
              The Countdown is on! Grab the best deals while stock lasts.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <Button as={Link} to="/products" className="banner-btn">
              Order Now
            </Button>
          </Col>
        </Row>

        <h3 className="section-title mb-4">View Products</h3>
        <Row className="mb-5">
          {productsSection3.length > 0 ? (
            productsSection3.map((product) => (
              <Col md={3} key={product.id} className="mb-4">
                <Link to={`/product/${product.id}`} className="product-link">
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <Card.Body>
                      <Card.Title className="product-name">{product.name}</Card.Title>
                      <Card.Text className="product-price">
                        EGP {product.price.toFixed(2)}
                      </Card.Text>
                      <Button
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <p>No products found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default OffersPage;