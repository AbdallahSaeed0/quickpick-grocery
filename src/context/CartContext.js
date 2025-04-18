import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    // Mock data; replace with actual cart logic
    { id: 1, name: 'Apple', price: 2.99, quantity: 5 },
    { id: 2, name: 'Milk', price: 3.49, quantity: 3 },
  ]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, setCart, itemCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};