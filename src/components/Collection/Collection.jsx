'use client';
import React, { Component } from 'react';
import './Collection.css';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [
        { id: 1, name: "Handbags", image: "/assets/images/collection1.png" },
        { id: 2, name: "Watches", image: "/assets/images/collection2.png" },
        { id: 3, name: "Skincare", image: "/assets/images/collection3.png" },
        { id: 4, name: "Jewellery", image: "/assets/images/collection4.png" }
      ]
    };
  }

  render() {
    const { collections } = this.state;
    
    return (
      <section className="collection">
        <h3>Collection</h3>
        <div className="collection-content">
          {collections.map((item) => (
            <div key={item.id} className="collection-items">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Collection;