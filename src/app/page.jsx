import React from 'react';
import Banner from '../components/Banner/Banner';
import BestSelling from '../components/BestSelling/BestSelling';
import AboutUs from '../components/AboutUs/AboutUs';
import Categories from '../components/Categories/Categories';
import Testimonials from '../components/Testimonials/Testimonials';

function Home() {
  return (
    <div className="home">

      <Banner />
      <BestSelling />
      <AboutUs />
      <Categories />
      <Testimonials />
   
    </div>
  );
}

export default Home;

