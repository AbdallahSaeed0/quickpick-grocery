// In Checkout.js
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Checkout.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import BillingDetailsForm from '../components/Checkout/BillingDetailsForm';
import AddressSelector from '../components/Checkout/AddressSelector';
import DeliveryOptions from '../components/Checkout/DeliveryOptions';
import PaymentMethods from '../components/Checkout/PaymentMethod';
import OrderSummary from '../components/Checkout/OrderSummary';

// Utility function to generate a simple order ID
const generateOrderId = () => {
  const prefix = 'SDGT';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const suffix = 'FD';
  return `${prefix}${randomNum}${suffix}`;
};

function Checkout() {
  const { cart, totalPrice, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [useAnotherAddress, setUseAnotherAddress] = useState(false);
  const [instantDelivery, setInstantDelivery] = useState(false);
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('Earliest Available');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [newAddress, setNewAddress] = useState({
    label: '',
    type: 'Apartment',
    aptNo: '',
    floor: '',
    street: '',
    description: '',
  });
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    holderName: '',
    type: 'Visa',
  });
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not logged in
      return;
    }

    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(savedAddresses);
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);

    const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
      setUseDefaultAddress(true);
    }
  }, [user, navigate]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseDefaultAddressChange = (e) => {
    const isChecked = e.target.checked;
    setUseDefaultAddress(isChecked);
    if (isChecked) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddress || null);
      setUseAnotherAddress(false);
      setShowAddressModal(false);
    } else {
      setSelectedAddress(null);
    }
  };

  const handleInstantDeliveryChange = (e) => {
    const isChecked = e.target.checked;
    setInstantDelivery(isChecked);
    if (isChecked) {
      setScheduleDelivery(false);
      setShowScheduleModal(false);
      setDeliveryDate('As soon as possible');
      setDeliveryTime('');
    }
  };

  const handleScheduleDeliveryChange = (e) => {
    const isChecked = e.target.checked;
    setScheduleDelivery(isChecked);
    if (isChecked) {
      setInstantDelivery(false);
      setShowScheduleModal(true);
    }
  };

  const handleUseAnotherAddressChange = (e) => {
    const isChecked = e.target.checked;
    setUseAnotherAddress(isChecked);
    if (isChecked) {
      setUseDefaultAddress(false);
      setShowAddressModal(true);
    } else {
      setShowAddressModal(false);
      setShowAddAddressForm(false);
    }
  };

  const handleModalClose = () => {
    setShowScheduleModal(false);
    if (!deliveryTime) {
      setScheduleDelivery(false);
    }
  };

  const handleModalSave = () => {
    setShowScheduleModal(false);
  };

  const handleAddressModalClose = () => {
    setShowAddressModal(false);
    setUseAnotherAddress(false);
    setShowAddAddressForm(false);
    setNewAddress({
      label: '',
      type: 'Apartment',
      aptNo: '',
      floor: '',
      street: '',
      description: '',
    });
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressTypeChange = (type) => {
    setNewAddress((prev) => ({ ...prev, type }));
  };

  const handleSaveNewAddress = () => {
    if (!newAddress.label || !newAddress.street) {
      alert('Label and Street are required.');
      return;
    }
    const updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
    setSelectedAddress(newAddress);
    setShowAddressModal(false);
    setShowAddAddressForm(false);
    setNewAddress({
      label: '',
      type: 'Apartment',
      aptNo: '',
      floor: '',
      street: '',
      description: '',
    });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
    setShowAddAddressForm(false);
  };

  const handleSaveCardChange = (e) => {
    setSaveCard(e.target.checked);
  };

  const handleCardModalClose = () => {
    setShowCardModal(false);
    setNewCard({
      number: '',
      expiry: '',
      cvc: '',
      holderName: '',
      type: 'Visa',
    });
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewCard = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.holderName) {
      alert('All card fields are required.');
      return;
    }
    const maskedNumber = `**** **** **** ${newCard.number.slice(-4)}`;
    const updatedCards = [...cards, { ...newCard, number: maskedNumber, id: Date.now() }];
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    setCards(updatedCards);
    setSelectedCard(updatedCards[updatedCards.length - 1]);
    setShowCardModal(false);
    setNewCard({
      number: '',
      expiry: '',
      cvc: '',
      holderName: '',
      type: 'Visa',
    });
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setShowCardModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    if (!selectedAddress) {
      alert('Please select a shipping address.');
      return;
    }
    if (paymentMethod === 'card' && !selectedCard) {
      alert('Please select or add a card for payment.');
      return;
    }

    console.log('Cart at checkout:', cart, 'Total Price:', totalPrice);

    const orderId = generateOrderId();
    const parsedTotalPrice = parseFloat(totalPrice) || 0;
    const subtotal = !isNaN(parsedTotalPrice) ? parsedTotalPrice : 0;
    const shipping = 0.00;
    const cashHandlingFee = paymentMethod === 'cash' ? 10.00 : 0.00;
    const total = (subtotal + shipping + cashHandlingFee).toFixed(2);

    const order = {
      id: orderId,
      title: cart.length > 0 ? cart[0].name : 'Unknown Item',
      description: cart.length > 0 ? `Order with ${cart.length} items` : 'Empty Order',
      price: parseFloat(totalPrice) + (paymentMethod === 'cash' ? 10 : 0) || 0,
      date: new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
      status: 'Order placed',
      items: cart || [],
      shipping: shipping,
      total: total,
      address: selectedAddress,
      paymentMethod: paymentMethod,
      card: paymentMethod === 'card' ? selectedCard : null,
      tracking: [
        {
          status: 'Order placed',
          date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
        },
      ],
    };

    console.log('Order to be saved:', order);

    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || { past: [], upcoming: [] };
      savedOrders.upcoming.push(order);
      console.log('Saving orders to local storage:', savedOrders);
      localStorage.setItem('orders', JSON.stringify(savedOrders));

      // Clear the cart after successfully saving the order
      setCart([]);
    } catch (error) {
      console.error('Error saving order to local storage:', error);
      alert('Failed to save order. Please try again.');
      return;
    }

    navigate('/order-confirmation', {
      state: {
        orderDetails: {
          orderId: orderId,
          paymentMethod: paymentMethod || 'Cash',
          transactionId: 'TRG4295FFE',
          estimatedDelivery: '29 July 2024',
          cartItems: cart || [],
          subtotal: subtotal,
          shipping: shipping,
          total: total,
          tracking: order.tracking,
        },
      },
    });
  };

  const parsedTotalPrice = parseFloat(totalPrice) || 0;
  const subtotal = !isNaN(parsedTotalPrice) ? parsedTotalPrice : 0;
  const shipping = 0.00;
  const cashHandlingFee = paymentMethod === 'cash' ? 10.00 : 0.00;
  const total = (subtotal + shipping + cashHandlingFee).toFixed(2);

  if (!user) {
    return null; // Render nothing while redirecting to login
  }

  return (
    <div className="checkout-page">
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit} id="checkoutForm">
              <BillingDetailsForm
                billingDetails={billingDetails}
                setBillingDetails={setBillingDetails} // Pass setBillingDetails for useEffect
                handleBillingChange={handleBillingChange}
                user={user} // Pass user to BillingDetailsForm
              />
              <AddressSelector
                useDefaultAddress={useDefaultAddress}
                setUseDefaultAddress={setUseDefaultAddress}
                useAnotherAddress={useAnotherAddress}
                setUseAnotherAddress={setUseAnotherAddress}
                showAddressModal={showAddressModal}
                setShowAddressModal={setShowAddressModal}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                addresses={addresses}
                setAddresses={setAddresses}
                newAddress={newAddress}
                setNewAddress={setNewAddress}
                showAddAddressForm={showAddAddressForm}
                setShowAddAddressForm={setShowAddAddressForm}
                handleUseDefaultAddressChange={handleUseDefaultAddressChange}
                handleUseAnotherAddressChange={handleUseAnotherAddressChange}
                handleAddressModalClose={handleAddressModalClose}
                handleNewAddressChange={handleNewAddressChange}
                handleAddressTypeChange={handleAddressTypeChange}
                handleSaveNewAddress={handleSaveNewAddress}
                handleSelectAddress={handleSelectAddress}
              />
              <DeliveryOptions
                instantDelivery={instantDelivery}
                setInstantDelivery={setInstantDelivery}
                scheduleDelivery={scheduleDelivery}
                setScheduleDelivery={setScheduleDelivery}
                showScheduleModal={showScheduleModal}
                setShowScheduleModal={setShowScheduleModal}
                deliveryDate={deliveryDate}
                setDeliveryDate={setDeliveryDate}
                deliveryTime={deliveryTime}
                setDeliveryTime={setDeliveryTime}
                deliveryInstructions={deliveryInstructions}
                setDeliveryInstructions={setDeliveryInstructions}
                handleInstantDeliveryChange={handleInstantDeliveryChange}
                handleScheduleDeliveryChange={handleScheduleDeliveryChange}
                handleModalClose={handleModalClose}
                handleModalSave={handleModalSave}
              />
              <PaymentMethods
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                showCardModal={showCardModal}
                setShowCardModal={setShowCardModal}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                saveCard={saveCard}
                setSaveCard={setSaveCard}
                cards={cards}
                setCards={setCards}
                newCard={newCard}
                setNewCard={setNewCard}
                handleSaveCardChange={handleSaveCardChange}
                handleCardModalClose={handleCardModalClose}
                handleNewCardChange={handleNewCardChange}
                handleSaveNewCard={handleSaveNewCard}
                handleSelectCard={handleSelectCard}
              />
            </Form>
          </Col>
          <Col md={4}>
            <OrderSummary
              cart={cart}
              totalPrice={totalPrice}
              subtotal={subtotal}
              shipping={shipping}
              cashHandlingFee={cashHandlingFee}
              total={total}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;