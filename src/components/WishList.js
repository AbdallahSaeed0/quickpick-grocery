import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronRight } from 'react-icons/fa';
import productData from '../data/products.json'; // Import products.json
import '../styles/WishList.css';

// Simulated list of product IDs in the wishlist (replace with actual wishlist data from your backend or state management)
const wishlistProductIds = [1, 2, 3, 4, 5]; // First 5 products for testing

// Map the wishlist product IDs to full product data from products.json
const wishlistItems = wishlistProductIds.map((id) => {
  const product = productData.find((p) => p.id === id);
  if (!product) return null; // Skip if product not found

  return {
    id: product.id,
    name: product.name,
    brand: 'QuickPick Brand', // Placeholder, as brand is not in products.json
    price: `${parseFloat(product.price).toFixed(2)} EGP`, // Format price
    originalPrice: `${(parseFloat(product.price) + 20).toFixed(2)} EGP`, // Placeholder: add 20 LE as original price
    stockStatus: id % 2 === 0 ? 'Low Stock' : 'In Stock', // Placeholder: alternate between "In Stock" and "Low Stock"
    savedTime: '3 days ago', // Placeholder
    image: product.image, // Use the product image
  };
}).filter((item) => item !== null); // Filter out any null items

function Wishlist() {
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="wishlist-page">
      {/* Main Content */}
      <Container className="py-5 wishlist-section">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">
          {wishlistItems.length} Items to purchase later
        </p>
        <div className="wishlist-actions mb-4">
          <Button variant="danger" className="delete-all-button me-3">
            Delete all list
          </Button>
          <Button variant="success" className="add-all-button">
            Add all list to cart
          </Button>
        </div>

        {wishlistItems.length > 4 ? (
          // Use Slider if there are more than 4 items
          <Slider {...settings}>
            {wishlistItems.map((item, index) => (
              <div key={item.id} className="wishlist-slide px-2">
                <Row>
                  <Col md={12}>
                    <Card className="wishlist-card">
                      <div className="wishlist-image-wrapper">
                        <Card.Img
                          variant="top"
                          src={process.env.PUBLIC_URL + item.image}
                          alt={item.name}
                          className="wishlist-image"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="wishlist-item-name">{item.name}</Card.Title>
                        <Card.Text className="wishlist-brand">{item.brand}</Card.Text>
                        <Card.Text className="wishlist-price">
                          {item.price}{' '}
                          <span className="original-price">{item.originalPrice}</span>
                        </Card.Text>
                        <Card.Text
                          className={`wishlist-stock ${
                            item.stockStatus === 'Low Stock' ? 'low-stock' : 'in-stock'
                          }`}
                        >
                          {item.stockStatus}
                        </Card.Text>
                        <div className="wishlist-buttons">
                          <Button variant="success" className="add-to-cart-button me-2">
                            Add to Cart
                          </Button>
                          <Button variant="danger" className="remove-button">
                            Remove from Wishlist
                          </Button>
                        </div>
                        <Card.Text className="wishlist-saved-time">
                          Saved {item.savedTime}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        ) : (
          // Static layout if 4 or fewer items
          <Row>
            {wishlistItems.map((item) => (
              <Col md={3} key={item.id} className="mb-4">
                <Card className="wishlist-card">
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + item.image}
                    alt={item.name}
                    className="wishlist-image"
                  />
                  <Card.Body>
                    <Card.Title className="wishlist-item-name">{item.name}</Card.Title>
                    <Card.Text className="wishlist-brand">{item.brand}</Card.Text>
                    <Card.Text className="wishlist-price">
                      {item.price}{' '}
                      <span className="original-price">{item.originalPrice}</span>
                    </Card.Text>
                    <Card.Text
                      className={`wishlist-stock ${
                        item.stockStatus === 'Low Stock' ? 'low-stock' : 'in-stock'
                      }`}
                    >
                      {item.stockStatus}
                    </Card.Text>
                    <div className="wishlist-buttons">
                      <Button variant="success" className="add-to-cart-button me-2">
                        Add to Cart
                      </Button>
                      <Button variant="danger" className="remove-button">
                        Remove from Wishlist
                      </Button>
                    </div>
                    <Card.Text className="wishlist-saved-time">
                      Saved {item.savedTime}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Wishlist;