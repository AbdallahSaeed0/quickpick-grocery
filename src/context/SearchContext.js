import React, { createContext, useContext } from 'react';
import productsData from '../data/products.json';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // Parse prices for consistency
  const parsedProducts = productsData.map((product) => ({
    ...product,
    price: parseFloat(product.price.replace(' LE', '')),
  }));

  return (
    <SearchContext.Provider value={{ parsedProducts }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);