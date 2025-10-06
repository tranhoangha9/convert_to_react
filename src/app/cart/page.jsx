'use client';
import React, { Component } from 'react';
import './cart.css';

class Cart extends Component {
  state = {
    cartItems: [
      { id: 1, name: "Blossom Pouch", description: "Grande", price: 39.49, quantity: 1, image: "/assets/images/newarrival1.png" },
      { id: 2, name: "Leather Coach Bag", description: "Coach", price: 54.69, quantity: 2, image: "/assets/images/newarrival2.png" },
      { id: 3, name: "Brown Strap Bag", description: "Remus", price: 57.00, quantity: 1, image: "/assets/images/newarrival3.png" },
      { id: 4, name: "Black Bag", description: "Boujee", price: 56.49, quantity: 1, image: "/assets/images/newarrival4.png" }
    ],
    shipping: 0,
    discount: 0,
    isCouponApplied: false
  };

  componentDidMount() {
    this.loadCartFromStorage();
  }

  loadCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        this.setState({ cartItems: JSON.parse(savedCart) });
      }
    }
  }

  applyCoupon = () => {
    const couponInput = document.getElementById('coupon-input');
    if (couponInput && couponInput.value === 'giamgia') {
      const { cartItems } = this.state;
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = subtotal * 0.5;
      
      this.setState({
        discount: discount,
        isCouponApplied: true
      });
      
      const removeBtn = document.querySelector('.coupon-remove-btn');
      if (removeBtn) {
        removeBtn.style.display = 'inline-block';
      }
      
      alert('Áp dụng coupon thành công! Giảm 50%');
    } else {
      alert('Mã coupon không đúng!');
    }
  }

  removeCoupon = () => {
    this.setState({
      discount: 0,
      isCouponApplied: false
    });
    
    const removeBtn = document.querySelector('.coupon-remove-btn');
    if (removeBtn) {
      removeBtn.style.display = 'none';
    }
    
    const couponInput = document.getElementById('coupon-input');
    if (couponInput) {
      couponInput.value = '';
    }
  }

  removeFromCart = (id) => {
    this.setState(prev => {
      const newCartItems = prev.cartItems.filter(item => item.id !== id);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      }
      
      return { cartItems: newCartItems };
    });
  }

  placeOrder = () => {
    const { cartItems } = this.state;
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    
    const confirmOrder = window.confirm('Bạn xác nhận muốn đặt hàng?');
    if (confirmOrder) {
      alert('Đặt hàng thành công!');
      this.setState({ cartItems: [] });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cartItems');
      }
    }
  }

  render() {
    const { cartItems, discount } = this.state;
    const displayTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = displayTotal > 200 ? 0 : (displayTotal > 0 ? 10 : 0);
    const displayGrandTotal = displayTotal + shipping - discount;

    return (
      <>
        <section className="cart-breadcrumbs">
          <a href="/">Home</a>
          <span className="breadcrumb-separator">&gt;</span>
          <a className="breadcrumb-current" href="/cart">My Cart</a>
        </section>

        <section className="cart-header">
          <div className="cart-title">
            <h1>My Cart</h1>
          </div>
        </section>

        <section className="cart-main-layout">
          <div className="cart-items-section">
            <div className="cart-table">
              <div className="cart-table-header">
                <div className="header-product">Product</div>
                <div className="header-price">Price</div>
                <div className="header-qty">Qty</div>
                <div className="header-subtotal">Subtotal</div>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="cart-item-wrapper">
                  <div className="cart-item-row">
                    <div className="cart-product-info">
                      <img src={item.image} alt={item.name} />
                      <div className="product-details">
                        <h4 className="cart-brand">{item.name}</h4>
                        <p className="cart-product-name">{item.description || 'Product Description'}</p>
                        <p className="cart-qty-text">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    <div className="cart-item-qty">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <div className="cart-item-actions">
                    <a href="#" className="cart-move-wishlist">Move to Wishlist</a>
                    <a href="#" className="cart-remove-item" onClick={() => this.removeFromCart(item.id)}>Remove</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="order-summary-box">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-item">
                <span className="summary-label">Sub Total</span>
                <span className="summary-value">${displayTotal.toFixed(2)}</span>
              </div>

            <div className="summary-item">
              <span className="summary-label">Discount</span>
              <span className="summary-value discount-value">-${discount.toFixed(2)}</span>
            </div>

              <div className="summary-item">
                <span className="summary-label">Delivery Fee</span>
                <span className="summary-value delivery-value">${shipping.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span className="total-label">Grand Total</span>
                <span className="total-amount">${displayGrandTotal.toFixed(2)}</span>
              </div>

              <div className="order-buttons">
                <button className="btn-place-order" onClick={this.placeOrder}>Place Order</button>
                <button className="btn-continue">Continue Shopping</button>
              </div>
            </div>
          </div>
        </section>

        <div className="cart-coupon-wrapper">
          <div className="coupon-section">
            <div className="coupon-dropdown">
              <input type="checkbox" className="coupon-toggle" id="coupon-toggle" />
              <label htmlFor="coupon-toggle" className="coupon-header">
                Apply Coupon Code
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 1L9 8.5L1.5 1" stroke="#13101E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </label>
              <div className="coupon-form">
                <input type="text" id="coupon-input" className="coupon-input" placeholder="Enter coupon code" />
                <button className="coupon-btn" onClick={this.applyCoupon}>CHECK</button>
                <button className="coupon-remove-btn" onClick={this.removeCoupon} style={{display: 'none'}}>REMOVE COUPON</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Cart;