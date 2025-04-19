import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/CartContext';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp';
import VerificationPage from './pages/VerificationPage';
import ErrorPage from './components/ErrorPage';
import WishlistPage from './pages/WishListPage';
import OffersPage from './pages/OffersPage';
import ProductPage from './components/ProductPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PersonalInformation from './pages/PersonalInformation';
import MyOrdersPage from './pages/MyOrdersPage';
import ManageAddressPage from './pages/ManageAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import ChangePassword from './pages/ChangePassword';
import MyAccountPage from './pages/MyAccountPage';
import Layout from './pages/Layout';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function App() {
  return (
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>
            <CartProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:id" element={<CategoryPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/verify" element={<VerificationPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  {/* CheckOut Routes */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  {/* Account Routes */}
                  <Route path="/myaccount" element={<MyAccountPage />} />
                  <Route path="/account/personal-information" element={<PersonalInformation />} />
                  <Route path="/account/my-orders" element={<MyOrdersPage />} />
                  <Route path="/account/manage-address" element={<ManageAddressPage />} />
                  <Route path="/account/payment-method" element={<PaymentMethodPage />} />
                  <Route path="/account/change-password" element={<ChangePassword />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </CartProvider>
          </ThemeProvider>
        </SearchProvider>
      </AuthProvider>
  );
}

export default App;