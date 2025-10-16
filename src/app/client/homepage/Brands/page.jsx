'use client';
import React, { Component } from 'react';
import './Brands.css';

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [
        { id: 1, image: "/assets/images/logo1.png" },
        { id: 2, image: "/assets/images/logo2.png" },
        { id: 3, image: "/assets/images/logo3.png" },
        { id: 4, image: "/assets/images/logo4.png" },
        { id: 5, image: "/assets/images/logo5.png" },
        { id: 6, image: "/assets/images/logo6.png" }
      ],
      bannerImages: [
        { id: 1, image: "/assets/images/image1.png" },
        { id: 2, image: "/assets/images/image2.png" },
        { id: 3, image: "/assets/images/image3.png" }
      ]
    };
  }

  render() {
    const { brands, bannerImages } = this.state;
    
    return (
      <section className="brands">
        <h2 className="brands-title">Shop By Brands</h2>
        <div className="brands-images">
          {brands.map((brand) => (
            <div key={brand.id} className="brand-logo">
              <img src={brand.image} alt={`Brand ${brand.id}`} loading="lazy" />
            </div>
          ))}
        </div>
        
        <div className="image-banner">
          <div className="collection-images">
            <div className="collection-image-up">
              <img src={bannerImages[0].image} alt="Banner Image 1" loading="lazy" />
            </div>
            <div className="collection-image-down">
              <img src={bannerImages[1].image} alt="Banner Image 2" loading="lazy" />
              <img src={bannerImages[2].image} alt="Banner Image 3" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Brands;