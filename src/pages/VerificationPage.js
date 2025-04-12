import React from 'react';
import CustomNavbar from '../components/Navbar';
import Verification from '../components/Verification';
import FooterSection from '../components/FooterSection';

function VerificationPage() {
  console.log('Home rendering');
  return (
    <div>
      <CustomNavbar />
      <Verification />
      <FooterSection />
    </div>
  );
}

export default VerificationPage;