import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CategoriesSection.css';

function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: 'fruits and vegetables',
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

  return (
    <div className="categories-section py-5">
      <Container>
        {/* Title and See More Link */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">QuickPick categories</h2>
          <Link to="/categories" className="see-more-link">
            see more
          </Link>
        </div>

        {/* Category Cards */}
        <Row>
          {categories.map((category) => (
            <Col md={2} key={category.id} className="mb-4">
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
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CategoriesSection;