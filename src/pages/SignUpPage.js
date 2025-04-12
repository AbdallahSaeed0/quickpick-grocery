import React from 'react';
import CustomNavbar from '../components/Navbar';
import SignUp from '../components/SignUp';
import FooterSection from '../components/FooterSection';

function SignUpPage() {
  console.log('Home rendering');
  return (
    <div>
      <CustomNavbar />
      <SignUp />
      <FooterSection />
    </div>
  );
}

export default SignUpPage;