import React from 'react';

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="categories-header">
          <h2>Categories</h2>
          <p>Find what you are looking for</p>
        </div>
        <div className="categories-grid">
          <div className="category-item category-left">
            <img src="/assets/images/categories1.png" alt="Natural Plants" />
            <div className="category-overlay">
              <h3>Natural Plants</h3>
            </div>
          </div>
          <div className="category-item category-center">
            <img src="/assets/images/categories2.png" alt="Plant Accessories" />
            <div className="category-overlay">
              <h3>Plant Accessories</h3>
              <p>Everything you need for your plants</p>
              <button className="explore-btn">Explore</button>
            </div>
          </div>
          <div className="category-item category-right">
            <img src="/assets/images/categories3.png" alt="Artificial Plants" />
            <div className="category-overlay">
              <h3>Artificial Plants</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;

