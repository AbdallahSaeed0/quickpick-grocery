import React from 'react';
import CustomNavbar from '../components/Navbar';
import Banner from '../components/Banner';
import DealsSection from '../components/DealsSection';
import PopularProducts from '../components/PopularProducts';
import CategoriesSection from '../components/CategoriesSection';
import PromoSection from '../components/PromoSection';
import HowItWorksSection from '../components/HowItWorksSection';
import PromoBannerSection from '../components/PromoBannerSection';
import CounterSection from '../components/CounterSection';
import FooterSection from '../components/FooterSection';

function Home() {
  console.log('Home rendering');
  return (
    <div>
      <CustomNavbar />
      <Banner />
      <DealsSection />
      <PopularProducts />
      <CategoriesSection />
      <PromoSection />
      <PromoBannerSection />
      <HowItWorksSection />
      
      <CounterSection />
      <FooterSection />
    </div>
  );
}

export default Home;