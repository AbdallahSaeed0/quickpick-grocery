import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart.css';
import { CartContext } from '../context/CartContext';
import BorderHeader from '../components/BorderHeader';
import productData from '../data/products.json';

function Cart() {
  const { cart, removeFromCart, updateQuantity, itemCount, totalPrice, addToCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const deliveryFee = 4.89;
  const freeDeliveryThreshold = 32.23;
  const remainingForFreeDelivery = (freeDeliveryThreshold - parseFloat(totalPrice)).toFixed(2);
  const progress = (parseFloat(totalPrice) / freeDeliveryThreshold) * 100;

  // Select a suggestion product from productData
  const suggestionProduct = productData[0]; // "Orange Juice - Freshly Squeezed"
  const suggestionPrice = parseFloat(suggestionProduct.price).toFixed(2);

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    console.log('Promo code submitted:', promoCode);
  };

  return (
    <div className="cart-page">
        <div className='border-header'>
        <h1 className="cart-title text-center mb-5">Cart</h1>
      </div>
      <Container className="py-5">
        <Row>
          {/* Left Side: Cart Items */}
          <Col md={8}>
            <h2 className="section-title mb-4">Your Cart</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <Card className="cart-item mb-3" key={item.id}>
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img
                          src={process.env.PUBLIC_URL + item.image}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </Col>
                      <Col xs={9} md={6}>
                        <h5 className="cart-item-name">{item.name}</h5>
                        <p className="cart-item-price">
                          EGP {(parseFloat(item.price) * item.quantity).toFixed(2)} x {item.quantity}
                        </p>
                        <p className="cart-item-brand">{item.brand || 'Garden Fresh'}</p>
                        {item.stockStatus === 'Low Stock' && (
                          <p className="cart-item-stock low-stock">
                            Limited Stock! Only a few left in stock. Order soon.
                          </p>
                        )}
                      </Col>
                      <Col xs={6} md={2} className="text-center">
                        <div className="quantity-selector d-flex align-items-center justify-content-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="quantity mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col xs={6} md={2} className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </Col>

          {/* Right Side: Order Summary */}
          <Col md={4}>
            <Card className="order-summary mb-4">
              <Card.Body>
                <h3 className="summary-title mb-4">
                  {remainingForFreeDelivery > 0
                    ? `Almost there! Add ${remainingForFreeDelivery} EGP for free delivery`
                    : 'Free delivery unlocked!'}
                </h3>
                <ProgressBar now={progress} className="mb-3" />
                <p className="estimated-delivery mb-2">
                  Estimated delivery: 4 PM - 6 PM
                </p>
                <h4 className="summary-subtitle">Order Summary</h4>
                <div className="summary-details">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{totalPrice} EGP</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee.toFixed(2)} EGP</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span>To be determined</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between summary-total">
                    <strong>Estimated total</strong>
                    <strong>{(parseFloat(totalPrice) + deliveryFee).toFixed(2)} EGP</strong>
                  </div>
                </div>
                <Form onSubmit={handlePromoCodeSubmit} className="promo-code-form mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="mb-2"
                  />
                  {promoCode && (
                    <Button variant="outline-secondary" type="submit" className="w-100">
                      Apply
                    </Button>
                  )}
                </Form>
                <Button
                  variant="success"
                  className="checkout-btn w-100 mt-3"
                  as={Link}
                  to="/checkout"
                  disabled={cart.length === 0} // Disable button if cart is empty
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Suggestions Section */}
        <Row className="mt-5">
          <Col md={8}>
            <h2 className="section-title mb-4">Other Suggestion</h2>
            <Row>
              <Col md={12}>
                <div className="suggestion-card d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + suggestionProduct.image}
                    alt={suggestionProduct.name}
                    className="suggestion-image me-3"
                  />
                  <div className="suggestion-details d-flex align-items-center justify-content-between flex-grow-1">
                    <div>
                      <h5 className="suggestion-name">{suggestionProduct.name}</h5>
                      <p className="suggestion-price">
                        EGP {suggestionPrice}
                      </p>
                    </div>
                    <Button
                      variant="success"
                      className="add-to-cart-btn"
                      onClick={() => addToCart(suggestionProduct, 1)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="text-center">
                <Button variant="link" as={Link} to="/products">
                  See More Suggestions
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;