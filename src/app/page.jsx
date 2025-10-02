import React from 'react';
import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';
import Banner from '../components/Banner/Banner';
import BestSelling from '../components/BestSelling/BestSelling';
import AboutUs from '../components/AboutUs/AboutUs';
import Categories from '../components/Categories/Categories';
import Testimonials from '../components/Testimonials/Testimonials';

function Home() {
  return (
    <div className="home">
      <Header />
      <Banner />
      <BestSelling />
      <AboutUs />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;

