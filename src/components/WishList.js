import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/WishList.css';

// Sample wishlist data (replace with actual data from your backend or state management)
const wishlistItems = [
  {
    id: 1,
    name: 'Item name',
    brand: 'Brand Name',
    price: '49.99 EGP',
    originalPrice: '69.99 EGP',
    stockStatus: 'In Stock',
    savedTime: '3 days ago',
  },
  {
    id: 2,
    name: 'Item name',
    brand: 'Brand Name',
    price: '49.99 EGP',
    originalPrice: '69.99 EGP',
    stockStatus: 'Low Stock',
    savedTime: '3 days ago',
  },
  {
    id: 3,
    name: 'Item name',
    brand: 'Brand Name',
    price: '49.99 EGP',
    originalPrice: '69.99 EGP',
    stockStatus: 'In Stock',
    savedTime: '3 days ago',
  },
  {
    id: 4,
    name: 'Item name',
    brand: 'Brand Name',
    price: '49.99 EGP',
    originalPrice: '69.99 EGP',
    stockStatus: 'In Stock',
    savedTime: '3 days ago',
  },
];

function Wishlist() {
  return (
    <div className="wishlist-page">

      {/* Main Content */}
      <Container className="py-5">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">Save items to purchase later</p>
        <p className="wishlist-count">{wishlistItems.length} items saved</p>
        <div className="wishlist-actions mb-4">
          <Button variant="danger" className="delete-all-button me-3">
            Delete all list
          </Button>
          <Button variant="success" className="add-all-button">
            Add all list to cart
          </Button>
        </div>
        <Row>
          {wishlistItems.map((item) => (
            <Col md={3} key={item.id} className="mb-4">
              <Card className="wishlist-card">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300x200.png?text=300+x+200"
                  alt={item.name}
                  className="wishlist-image"
                />
                <Card.Body>
                  <Card.Title className="wishlist-item-name">{item.name}</Card.Title>
                  <Card.Text className="wishlist-brand">{item.brand}</Card.Text>
                  <Card.Text className="wishlist-price">
                    {item.price} <span className="original-price">{item.originalPrice}</span>
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
      </Container>


    </div>
  );
}

export default Wishlist;