'use client';
import React, { Component } from 'react';
import Notification from './client/homepage/Notification/page';
import Banner from './client/homepage/Banner/page';
import BestSelling from './client/homepage/BestSelling/page';
import Brands from './client/homepage/Brands/page';
import Collection from './client/homepage/Collection/page';

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