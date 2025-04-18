import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaBuilding, FaHome, FaBriefcase, FaMapMarkerAlt, FaEdit } from 'react-icons/fa'; // Added FaEdit
import AccountSidebar from '../components/AccountSidebar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageAddress.css';

function ManageAddress() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [view, setView] = useState('saved'); // 'saved', 'new', or 'edit'
  const [addresses, setAddresses] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null); // Track address being edited
  const [formData, setFormData] = useState({
    label: '',
    type: 'Apartment',
    aptNo: '',
    floor: '',
    street: '',
    description: '',
    isDefault: false,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load addresses from local storage
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(savedAddresses);
  }, []);

  // Save addresses to local storage
  const saveAddresses = (updatedAddresses) => {
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle address type selection
  const handleTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  // Handle form submission (new or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.label || !formData.street) {
      setError('Label and Street are required.');
      setSuccess('');
      return;
    }

    let updatedAddresses;
    if (view === 'edit') {
      // Update existing address
      updatedAddresses = addresses.map((addr) =>
        addr.id === editAddressId ? { ...formData, id: addr.id } : addr
      );
    } else {
      // Add new address
      updatedAddresses = [...addresses, { ...formData, id: Date.now() }];
    }

    // Handle default address logic
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === (view === 'edit' ? editAddressId : updatedAddresses[updatedAddresses.length - 1].id),
      }));
    }

    saveAddresses(updatedAddresses);
    setSuccess(view === 'edit' ? 'Address updated successfully!' : 'Address saved successfully!');
    setError('');
    resetForm();
    setView('saved');
  };

  // Reset form and edit state
  const resetForm = () => {
    setFormData({
      label: '',
      type: 'Apartment',
      aptNo: '',
      floor: '',
      street: '',
      description: '',
      isDefault: false,
    });
    setEditAddressId(null);
  };

  // Handle edit button click
  const handleEdit = (address) => {
    setFormData(address);
    setEditAddressId(address.id);
    setView('edit');
  };

  // Handle setting default address
  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    saveAddresses(updatedAddresses);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="my-account-page">
      <Container className="py-5">
        <h2 className="section-title mb-4">Manage Address</h2>
        <Row>
          <Col md={3}>
            <AccountSidebar />
          </Col>
          <Col md={9}>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {view === 'saved' ? (
              <div className="saved-addresses">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Saved Addresses</h4>
                  <Button variant="success" size="sm" onClick={() => setView('new')}>
                    Add New Address
                  </Button>
                </div>
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <Card key={address.id} className="address-card mb-3">
                      <Card.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Label</Form.Label>
                            <Form.Control type="text" value={address.label} readOnly />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={address.description}
                              readOnly
                            />
                          </Form.Group>
                          <div className="d-flex justify-content-between align-items-center">
                            <Form.Check
                              type="checkbox"
                              label="Default"
                              checked={address.isDefault}
                              onChange={() => handleSetDefault(address.id)}
                            />
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleEdit(address)}
                            >
                              <FaEdit /> Edit
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <Card className="address-card mb-3">
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Label</Form.Label>
                          <Form.Control type="text" placeholder="e.g., Home" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="No addresses saved"
                            disabled
                          />
                        </Form.Group>
                        <Form.Check type="checkbox" label="Default" disabled />
                      </Form>
                    </Card.Body>
                  </Card>
                )}
              </div>
            ) : (
              <div className={view === 'edit' ? 'edit-address' : 'new-address'}>
                <h4>{view === 'edit' ? 'Edit Address' : 'New Address'}</h4>
                <div className="map-placeholder mb-3">
                  <div className="map-image"></div>
                </div>
                <div className="address-type mb-3">
                  <Button
                    variant={formData.type === 'Apartment' ? 'success' : 'outline-success'}
                    className="type-button me-2"
                    onClick={() => handleTypeChange('Apartment')}
                  >
                    <FaBuilding /> Apartment
                  </Button>
                  <Button
                    variant={formData.type === 'House' ? 'success' : 'outline-success'}
                    className="type-button me-2"
                    onClick={() => handleTypeChange('House')}
                  >
                    <FaHome /> House
                  </Button>
                  <Button
                    variant={formData.type === 'Work' ? 'success' : 'outline-success'}
                    className="type-button me-2"
                    onClick={() => handleTypeChange('Work')}
                  >
                    <FaBriefcase /> Work
                  </Button>
                  <Button
                    variant={formData.type === 'Other' ? 'success' : 'outline-success'}
                    className="type-button"
                    onClick={() => handleTypeChange('Other')}
                  >
                    <FaMapMarkerAlt /> Other
                  </Button>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Label *</Form.Label>
                    <Form.Control
                      type="text"
                      name="label"
                      value={formData.label}
                      onChange={handleInputChange}
                      placeholder="e.g., Home"
                      required
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Apt No.</Form.Label>
                        <Form.Control
                          type="text"
                          name="aptNo"
                          value={formData.aptNo}
                          onChange={handleInputChange}
                          placeholder="Apartment Number"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Floor</Form.Label>
                        <Form.Control
                          type="text"
                          name="floor"
                          value={formData.floor}
                          onChange={handleInputChange}
                          placeholder="Floor Number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Street *</Form.Label>
                    <Form.Control
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Street Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Additional details"
                    />
                  </Form.Group>
                  <Form.Check
                    type="checkbox"
                    name="isDefault"
                    label="Set as Default"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={() => setView('saved')}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="success">
                      {view === 'edit' ? 'Update Address' : 'Save Address'}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManageAddress;