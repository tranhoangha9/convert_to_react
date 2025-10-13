'use client';
import React, { Component } from 'react';
import Notification from './homepage/Notification/page';
import Banner from './homepage/Banner/page';
import BestSelling from './homepage/BestSelling/page';
import Brands from './homepage/Brands/page';
import Collection from './homepage/Collection/page';

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