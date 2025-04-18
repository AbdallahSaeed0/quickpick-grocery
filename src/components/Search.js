import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Dropdown, Pagination, Carousel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SearchPage.css';
import { useSearch } from '../context/SearchContext';

function Search() {
  const { parsedProducts } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Best Selling');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const location = useLocation();

  // Initialize searchTerm from navigation state if provided
  useEffect(() => {
    if (location.state?.fromSearch && location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    } else {
      setSearchTerm(''); // Clear search term for direct navigation
      setCurrentPage(1);
    }
  }, [location]);

  // Extract unique categories
  const categories = [
    'All',
    ...new Set(parsedProducts.map((product) => product.category)),
  ];

  // Filter products based on search term and category
  const filteredProducts = parsedProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'Price Low to High':
        return a.price - b.price;
      case 'Price High to Low':
        return b.price - a.price;
      case 'Best Selling':
      default:
        return 0; // No sorting for Best Selling (use original order)
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on submit
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to page 1 when sort option changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Slider data
  const slides = [
    {
      image: `${process.env.PUBLIC_URL}/assets/offer-banner3.jpeg`,
      title: 'Glow with Unstoppable Beauty!',
      text: 'The Countdown is on! Grab the best deals while stock lasts.',
      buttonText: 'Order Now',
      buttonLink: '/products',
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/offer-banner1.jpeg`,
      title: 'Save Up to 60% Off the Grocery Deals!',
      text: 'The Countdown is on! Grab the best deals while stock lasts.',
      buttonText: 'Order Now',
      buttonLink: '/products',
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/offer-banner2.jpeg`,
      title: 'A Sparkling Homeware Deal!',
      text: 'The Countdown is on! Grab the best deals while stock lasts.',
      buttonText: 'Order Now',
      buttonLink: '/products',
    },
  ];

  return (
    <div className="search-page">
      <Container className="py-5">
        {/* Search Bar with Button */}
        <Form onSubmit={handleSearchSubmit} className="search-form mb-4">
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

        {/* Slider */}
        <Row className="mb-5">
          <Col>
            <Carousel className="custom-carousel">
              {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                  <div
                    className="slider-image"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                    }}
                  >
                    <div className="slider-overlay">
                      <div className="slider-content">
                        <h2 className="slider-title">{slide.title}</h2>
                        <p className="slider-text">{slide.text}</p>
                        <Button
                          as={Link}
                          to={slide.buttonLink}
                          className="slider-btn"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        {/* Filters and Products */}
        <Row>
          <Col>
            {/* Filters */}
            <Row className="mb-4 align-items-center">
              <Col md={6} className="mb-2 mb-md-0">
                <Dropdown onSelect={handleCategorySelect}>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="category-dropdown"
                  >
                    Category: {selectedCategory}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories.map((category) => (
                      <Dropdown.Item key={category} eventKey={category}>
                        {category}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={6} className="text-md-end">
                <Dropdown onSelect={handleSortSelect}>
                  <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
                    Sort by: {sortOption}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Best Selling">
                      Best Selling
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Price Low to High">
                      Price Low to High
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Price High to Low">
                      Price High to Low
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Products Grid */}
            <Row>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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
                          <Card.Title className="product-name">
                            {product.name}
                          </Card.Title>
                          <Card.Text className="product-price">
                            EGP {product.price.toFixed(2)}
                          </Card.Text>
                          <Button className="add-to-cart-btn">Add to cart</Button>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <Row className="mt-4">
                <Col className="text-center">
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages).keys()].map((page) => (
                      <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Search;