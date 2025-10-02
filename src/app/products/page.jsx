import React from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import { useCart } from '../../context/CartContext';

// Import images
import selling1 from '../../assets/images/selling1.png';
import selling2 from '../../assets/images/selling2.png';
import selling3 from '../../assets/images/selling3.png';
import selling4 from '../../assets/images/selling4.png';
import selling5 from '../../assets/images/selling5.png';
import selling6 from '../../assets/images/selling6.png';
import categories1 from '../../assets/images/categories1.png';
import categories2 from '../../assets/images/categories2.png';
import categories3 from '../../assets/images/categories3.png';
import example1 from '../../assets/images/example1.png';
import example2 from '../../assets/images/example2.png';
import example3 from '../../assets/images/example3.png';

function Products() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Natural Plants', price: 1400, image: selling1 },
    { id: 2, name: 'Artificial Plants', price: 900, image: selling2 },
    { id: 3, name: 'Premium Artificial Plants', price: 3500, image: selling3 },
    { id: 4, name: 'Natural Plants', price: 1400, image: selling4 },
    { id: 5, name: 'Artificial Plants', price: 900, image: selling5 },
    { id: 6, name: 'Premium Artificial Plants', price: 3500, image: selling6 }
  ];

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    addToCart(product);
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
    <div>
      <Header />
      
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₱ {product.price.toLocaleString()}.00</p>
                <button 
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 5H7L10 22H26" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 16.666H25.59C25.7056 16.6661 25.8177 16.6261 25.9072 16.5528C25.9966 16.4795 26.0579 16.3775 26.0806 16.2641L27.8806 7.26414C27.8951 7.19157 27.8934 7.11668 27.8755 7.04487C27.8575 6.97307 27.8239 6.90614 27.7769 6.84891C27.73 6.79169 27.6709 6.7456 27.604 6.71397C27.5371 6.68234 27.464 6.66596 27.39 6.66602H8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="add-to-favorites">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="decor-exp">
        <div className="decor-img">
          <img src={categories1} alt="" />
          <img src={categories2} alt="" />
          <img src={categories3} alt="" />
          <img src={example1} alt="" />
          <img src={example2} alt="" />
          <img src={example3} alt="" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Products;

