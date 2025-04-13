import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp';
import VerificationPage from './pages/VerificationPage';
import ErrorPage from './components/ErrorPage';
import WishlistPage from './pages/WishListPage';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 */}
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;