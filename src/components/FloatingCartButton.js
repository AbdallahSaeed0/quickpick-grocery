import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/FloatingCartButton.css';

function FloatingCartButton() {
  const { itemCount, totalPrice } = useContext(CartContext);

  return (
    <Link to="/cart" className="floating-cart-button">
      <div className="cart-content">
        <img
          src={process.env.PUBLIC_URL + '/assets/cart.png'}
          alt="cart"
          className="cart-icon"
        />
        <span className="cart-info">{itemCount} items</span>
        <span className="cart-total">EGP {totalPrice}</span>
      </div>
    </Link>
  );
}

export default FloatingCartButton;