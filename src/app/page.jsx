'use client';
import React, { Component } from 'react';
import Notification from '../components/Notification/Notification';
import Banner from '../components/Banner/Banner';
import BestSelling from '../components/BestSelling/BestSelling';
import Brands from '../components/Brands/Brands';
import Collection from '../components/Collection/Collection';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Notification />
        <Banner />
        <BestSelling />
        <Collection />
        <Brands />
      </div>
    );
  }
}

export default Home;