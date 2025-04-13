import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Import slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS
import '../styles/CategoriesSection.css';

function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: 'Fruits and Vegetables',
      image: process.env.PUBLIC_URL + '/assets/fruits-vegetables.png',
    },
    {
      id: 2,
      name: 'Dairy',
      image: process.env.PUBLIC_URL + '/assets/dairy.png',
    },
    {
      id: 3,
      name: 'Bakery',
      image: process.env.PUBLIC_URL + '/assets/bakery.png',
    },
    {
      id: 4,
      name: 'Meat & Poultry',
      image: process.env.PUBLIC_URL + '/assets/meat-poultry.png',
    },
    {
      id: 5,
      name: 'Seafood',
      image: process.env.PUBLIC_URL + '/assets/seafood.png',
    },
    {
      id: 6,
      name: 'Beverages',
      image: process.env.PUBLIC_URL + '/assets/beverages.png',
    },
  ];

  // Slider settings
  const settings = {
    dots: true, // Show dots below the slider
    infinite: true, // Loop the slider
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 4, // Show 4 categories at a time on large screens
    slidesToScroll: 4, // Scroll 4 categories at a time
    arrows: true, // Show navigation arrows
    responsive: [
      {
        breakpoint: 1200, // Extra-large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992, // Large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="categories-section py-5">
      <Container>
        {/* Title and See More Link */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">QuickPick Categories</h2>
          <Link to="/categories" className="see-more-link">
            See More
          </Link>
        </div>

        {/* Category Slider */}
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.id} className="category-slide">
              <Row className="justify-content-center">
                <Col xl={12} lg={12} md={12} className="col-12 mb-4">
                  <Link to={`/category/${category.id}`} className="text-decoration-none">
                    <Card className="category-card">
                      <Card.Img
                        variant="top"
                        src={category.image}
                        alt={category.name}
                        className="category-image"
                      />
                      <div className="category-name-wrapper">
                        <Card.Title className="category-name">{category.name}</Card.Title>
                      </div>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
}

export default CategoriesSection;