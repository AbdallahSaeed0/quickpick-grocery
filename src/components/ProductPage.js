import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons
import CustomNavbar from './Navbar'; // Adjusted import path
import FooterSection from './FooterSection'; // Adjusted import path
import productData from '../data/products.json'; // Import the JSON file
import '../styles/ProductPage.css';

function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(null); // Track the current main image
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current thumbnail index

  useEffect(() => {
    // Find the product by ID
    const foundProduct = productData.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    // Set the initial main image
    if (foundProduct) {
      setCurrentImage(process.env.PUBLIC_URL + foundProduct.image);
      // Find related products (same category, excluding the current product)
      const related = productData
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4); // Limit to 4 related products
      setRelatedProducts(related);
    }
  }, [id]);

  // Array of thumbnail images for the product
  const thumbnails = product
    ? [
        process.env.PUBLIC_URL + product.image,
        process.env.PUBLIC_URL + (product.image2 || product.image), // Use image2 if available, fallback to image
        process.env.PUBLIC_URL + product.image,
      ]
    : [];

  // Handle thumbnail click to update the main image
  const handleThumbnailClick = (image, index) => {
    setCurrentImage(image);
    setCurrentIndex(index);
  };

  // Handle sliding to the previous thumbnail
  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(thumbnails[newIndex]);
  };

  // Handle sliding to the next thumbnail
  const handleNextClick = () => {
    const newIndex = currentIndex === thumbnails.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentImage(thumbnails[newIndex]);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart!`);
  };

  const handleBuyNow = () => {
    console.log(`Proceeding to buy ${quantity} of ${product?.name} now!`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">

      <Container className="py-5">
        <Row>
          {/* Left Side: Product Image and Thumbnails */}
          <Col md={5}>
            <div className="main-image-container">
              <img
                src={currentImage}
                alt={product.name}
                className="main-product-image"
              />
              {/* Arrow buttons for sliding */}
              <Button
                variant="light"
                className="carousel-arrow carousel-arrow-left"
                onClick={handlePrevClick}
              >
                <FaChevronLeft />
              </Button>
              <Button
                variant="light"
                className="carousel-arrow carousel-arrow-right"
                onClick={handleNextClick}
              >
                <FaChevronRight />
              </Button>
            </div>
            <div className="thumbnails mt-3 d-flex gap-2 justify-content-center">
              {thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-image ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(thumb, index)}
                />
              ))}
            </div>
          </Col>

          {/* Right Side: Product Details */}
          <Col md={7}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="product-title">{product.name}</h1>
              <FaHeart className="wishlist-icon" />
            </div>
            <p className="product-price">
              EGP {parseFloat(product.price).toFixed(2)}{' '}
              <span className="original-price">
                EGP {(parseFloat(product.price) + 25).toFixed(2)}
              </span>
            </p>
            <div className="product-rating mb-3">
              <FaStar className="star filled" />
              <FaStar className="star filled" />
              <FaStar className="star filled" />
              <FaStar className="star filled" />
              <FaStar className="star" />
              <span className="review-count">(100 reviews)</span>
            </div>
            <InputGroup className="quantity-selector mb-3" style={{ maxWidth: '150px' }}>
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </Button>
              <Form.Control
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="text-center"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </InputGroup>
            <div className="product-actions d-flex gap-3">
              <Button
                variant="outline-success"
                className="add-to-cart-btn w-50"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="success"
                className="buy-now-btn w-50"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>

        {/* Product Description */}
        <Row className="mt-5">
          <Col>
            <h2 className="section-title">Product Description</h2>
            <div className="description-section">
              <h5>Ingredients / Material</h5>
              <p>Ingredients, material go here.</p>
              <h5>How to Use / Instructions</h5>
              <p>Instructions go here.</p>
              <h5>Weight, Dimensions, etc.</h5>
              <p>Weight, dimensions, etc. go here.</p>
              <h5>Return Policy</h5>
              <p>Return policy also go here.</p>
            </div>
          </Col>
        </Row>

        {/* Related Products */}
        <Row className="mt-5">
          <Col>
            <h2 className="section-title">Related Products</h2>
            <Row className="justify-content-center">
              {relatedProducts.map((relatedProduct) => (
                <Col sm={6} md={3} key={relatedProduct.id} className="mb-4 col-9">
                  <Card className="related-product-card">
                    <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + relatedProduct.image}
                      alt={relatedProduct.name}
                      className="related-product-image"
                    />
                    <Card.Body>
                      <Card.Title className="related-product-title">
                        <Link to={`/product/${relatedProduct.id}`}>
                          {relatedProduct.name}
                        </Link>
                      </Card.Title>
                      <Card.Text className="related-product-price">
                        EGP {parseFloat(relatedProduct.price).toFixed(2)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Reviews Section */}
        <Row className="mt-5">
          <Col>
            <h2 className="section-title">Reviews</h2>
            <Card className="review-card mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="review-rating">
                    <FaStar className="star filled" />
                    <FaStar className="star filled" />
                    <FaStar className="star filled" />
                    <FaStar className="star filled" />
                    <FaStar className="star" />
                  </div>
                  <span className="review-date">March 1, 2023</span>
                </div>
                <Card.Title className="reviewer-name">John Doe (Verified Purchase)</Card.Title>
                <Card.Text className="review-text">
                  This is the amazing product! I’m loving it.
                </Card.Text>
                <Button variant="link" className="helpful-btn">
                  Was this helpful? <FaHeart className="ms-1" />
                </Button>
              </Card.Body>
            </Card>

            {/* Add a Review Form */}
            <h3 className="add-review-title">Add a Review</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Your Rating</Form.Label>
                <div className="review-rating-input">
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star" />
                  <FaStar className="star" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Write your review</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Write your review here..." />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default ProductPage;