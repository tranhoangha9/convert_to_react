'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

function BestSelling() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);
  const { addToCart } = useCart();
  
  const plantGroups = [
    [
      { id: 1, name: "Natural Plants", price: 1400, image: "/assets/images/selling1.png" },
      { id: 2, name: "Artificial Plants", price: 900, image: "/assets/images/selling2.png" },
      { id: 3, name: "Plant Accessories", price: 1200, image: "/assets/images/selling3.png" }
    ],
    [
      { id: 4, name: "Natural Plants", price: 1500, image: "/assets/images/selling4.png" },
      { id: 5, name: "Artificial Plants", price: 1000, image: "/assets/images/selling5.png" },
      { id: 6, name: "Plant Accessories", price: 1300, image: "/assets/images/selling6.png" }
    ],
    [
      { id: 7, name: "Natural Plants", price: 1600, image: "/assets/images/selling7.png" },
      { id: 8, name: "Artificial Plants", price: 1100, image: "/assets/images/selling8.png" },
      { id: 9, name: "Plant Accessories", price: 1400, image: "/assets/images/selling9.png" }
    ]
  ];

  const handleAddToCart = (product) => {
    console.log('Adding to cart from BestSelling:', product);
    addToCart(product);
    alert('Đã thêm vào giỏ hàng!');
  };

  useEffect(() => {
    if (!isAutoSlide) return;
    
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % plantGroups.length);
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [plantGroups.length, isAutoSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % plantGroups.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + plantGroups.length) % plantGroups.length);
  };

  const handleMouseEnter = () => {
    setIsAutoSlide(false);
  };

  const handleMouseLeave = () => {
    setIsAutoSlide(true);
  };

  return (
    <section className="best-selling">
      <div className="container">
        <div className="best-selling-content">
          <div className="best-selling-left">
            <h2>Best Selling Plants</h2>
            <p>Easiest way to healthy life by buying your favorite plants </p>
            <button className="see-more-btn">See More →</button>
          </div>
          <div className="best-selling-right">
            <div 
              className="plants-grid-slider"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {plantGroups.map((group, groupIndex) => (
                <div key={groupIndex} className={`plants-group ${groupIndex === currentSlide ? 'active' : ''}`}>
                  <div className="plants-grid">
                    {group.map((plant) => (
                      <div key={plant.id} className="plant-card">
                        <img src={plant.image} alt={plant.name} />
                        <h3>{plant.name}</h3>
                        <p className="price">₱ {plant.price.toLocaleString()}.00</p>
                        <button 
                          className="add-to-cart"
                          onClick={() => handleAddToCart(plant)}
                        >
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 5H7L10 22H26" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 16.666H25.59C25.7056 16.6661 25.8177 16.6261 25.9072 16.5528C25.9966 16.4795 26.0579 16.3775 26.0806 16.2641L27.8806 7.26414C27.8951 7.19157 27.8934 7.11668 27.8755 7.04487C27.8575 6.97307 27.8239 6.90614 27.7769 6.84891C27.73 6.79169 27.6709 6.7456 27.604 6.71397C27.5371 6.68234 27.464 6.66596 27.39 6.66602H8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestSelling;

