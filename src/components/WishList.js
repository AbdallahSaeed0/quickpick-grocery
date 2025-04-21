import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/WishList.css';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

function Wishlist() {
  const { addToCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist, setWishlist } = useContext(WishlistContext);

  const getTimeDifference = (addedAt) => {
    const now = new Date();
    const addedTime = new Date(addedAt);
    const diffInMs = now - addedTime;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    }
  };

  const wishlistItems = wishlist.map((product) => ({
    id: product.id,
    name: product.name,
    brand: 'QuickPick Brand',
    price: `${parseFloat(product.price).toFixed(2)} EGP`,
    originalPrice: `${(parseFloat(product.price) + 20).toFixed(2)} EGP`,
    stockStatus: product.id % 2 === 0 ? 'Low Stock' : 'In Stock',
    savedTime: getTimeDifference(product.addedAt),
    image: product.image,
  }));

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
      <Container className="py-5 wishlist-section">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">
          {wishlistItems.length} Items to purchase later
        </p>
        <div className="wishlist-actions mb-4">
          <Button
            variant="danger"
            className="delete-all-button me-3"
            onClick={() => {
              setWishlist([]); // Clear the wishlist
              console.log('Wishlist cleared'); // Debug log
            }}
            disabled={wishlistItems.length === 0}
          >
            Delete all list
          </Button>
          <Button
            variant="success"
            className="add-all-button"
            onClick={() => {
              wishlistItems.forEach((item) => {
                const product = wishlist.find((p) => p.id === item.id);
                if (product) addToCart(product, 1);
              });
            }}
            disabled={wishlistItems.length === 0}
          >
            Add all list to cart
          </Button>
        </div>

        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : wishlistItems.length > 4 ? (
          <Slider {...settings}>
            {wishlistItems.map((item) => (
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
                          <Button
                            variant="success"
                            className="add-to-cart-button me-2"
                            onClick={() => {
                              const product = wishlist.find((p) => p.id === item.id);
                              if (product) addToCart(product, 1);
                            }}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="danger"
                            className="remove-button"
                            onClick={() => removeFromWishlist(item.id)}
                          >
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
                      <Button
                        variant="success"
                        className="add-to-cart-button me-2"
                        onClick={() => {
                          const product = wishlist.find((p) => p.id === item.id);
                          if (product) addToCart(product, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="danger"
                        className="remove-button"
                        onClick={() => removeFromWishlist(item.id)}
                      >
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