'use client';
import React, { Component } from 'react';
import './BestSelling.css';

class BestSelling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, brand: "Grande", name: "Blossom Pouch", price: 39.49, image: "/assets/images/newarrival1.png" },
        { id: 2, brand: "Coach", name: "Leather Coach Bag", price: 54.69, image: "/assets/images/newarrival2.png" },
        { id: 3, brand: "Remus", name: "Brown Strap Bag", price: 57.00, image: "/assets/images/newarrival3.png" },
        { id: 4, brand: "Boujee", name: "Black Bag", price: 56.49, image: "/assets/images/newarrival4.png" }
      ]
    };
  }

  addToCart = (product) => {
    if (typeof window !== 'undefined') {
      let cartItems = [];
      const savedCart = localStorage.getItem('cartItems');
      
      if (savedCart) {
        cartItems = JSON.parse(savedCart);
      }
      
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
  }

  render() {
    const { products } = this.state;
    
    return (
      <section className="new-arrivals">
        <div className="arrivals-header">
          <h2>New Arrivals</h2>
          <a href="/products" className="view-all-btn">View All</a>
        </div>
        <div className="arrivals-container">
          {products.map((product) => (
            <div key={product.id} className="new-arrivals-products">
              <img src={product.image} alt={product.name} />
              <div className="arrivals-content">
                <div className="product-header">
                  <p className="name">{product.brand}</p>
                  <div className="product-actions">
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 17.541C11 17.541 1.625 12.291 1.625 5.91602C1.62519 4.78927 2.01561 3.69737 2.72989 2.82594C3.44416 1.95452 4.4382 1.35738 5.54299 1.13603C6.64778 0.914685 7.79514 1.0828 8.78999 1.6118C9.78484 2.1408 10.5658 2.99803 11 4.03774L11 4.03775C11.4342 2.99804 12.2152 2.14081 13.21 1.61181C14.2049 1.08281 15.3522 0.914686 16.457 1.13603C17.5618 1.35737 18.5558 1.95452 19.2701 3.53493C19.9844 3.69737 20.3748 4.78927 20.375 5.91602C20.375 12.291 11 17.541 11 17.541Z" stroke="#13101E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg 
                      className="add-to-cart-icon" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => this.addToCart(product)}
                    >
                      <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#13101E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="3,6 21,6" stroke="#13101E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#13101E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="description">{product.name}</p>
                <ins>${product.price.toFixed(2)}</ins>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default BestSelling;