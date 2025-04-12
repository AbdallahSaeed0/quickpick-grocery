import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp';
import VerificationPage from './pages/VerificationPage';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 */}
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;