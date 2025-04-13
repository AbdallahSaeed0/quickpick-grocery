import React from 'react';
import CustomNavbar from '../components/Navbar';
import WishList from '../components/WishList';
import FooterSection from '../components/FooterSection';


function WishListPage() {
  console.log('Home rendering');
  return (
    <div>
      <CustomNavbar />
      <WishList />
      <FooterSection />
    </div>
  );
}

export default WishListPage;