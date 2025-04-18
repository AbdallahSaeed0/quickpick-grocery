import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CategoriesPage.css';

function CategoriesPage() {
  const categories = [
    { id: 1, name: 'Fruits and Vegetables', image: '/assets/fruits-vegetables.png' },
    { id: 2, name: 'Dairy', image: '/assets/dairy.png' },
    { id: 3, name: 'Bakery', image: '/assets/bakery.png' },
    { id: 4, name: 'Meat & Poultry', image: '/assets/meat-poultry.png' },
    { id: 5, name: 'Seafood', image: '/assets/seafood.png' },
    { id: 6, name: 'Beverages', image: '/assets/beverages.png' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Placeholder logic for tab filtering
  const filteredCategories = categories.filter((category) => {
    // Search filter
    if (searchTerm && !category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Tab filter
    if (activeTab === 'all') return true;
    if (activeTab === 'mostPopular') {
      return ['Fruits and Vegetables', 'Dairy', 'Beverages'].includes(category.name);
    }
    if (activeTab === 'essentials') {
      return ['Meat & Poultry', 'Seafood'].includes(category.name);
    }
    return true;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="categories-page">
      <Container className="py-5">
        {/* Title */}
        <h1 className="categories-title mb-4">Categories</h1>

        {/* Search Bar and Tabs */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Control
            type="text"
            placeholder="Search for categories"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        {/* Tabs */}
        <Nav variant="tabs" activeKey={activeTab} onSelect={(key) => setActiveTab(key)} className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="all">All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="mostPopular">Most Popular</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="essentials">Essentials</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Categories Grid */}
        <Row>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Col md={4} lg={3} key={category.id} className="mb-4">
                <Link to={`/category/${category.id}`} className="category-link">
                  <Card className="category-card">
                    <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + category.image}
                      alt={category.name}
                      className="category-image"
                    />
                    <Card.Body>
                      <Card.Title className="category-name">{category.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <p>No categories found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default CategoriesPage;