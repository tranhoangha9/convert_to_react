'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';

function Cart() {
  const { items, total, shipping, tax, grandTotal, updateQuantity, removeItem, clearCart } = useCart();
  
  console.log('Cart items:', items);
  console.log('Cart totals:', { total, shipping, tax, grandTotal });

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      removeItem(id);
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    alert('Đặt hàng thành công!');
    clearCart();
  };

  return (
    <main className="cart-main">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>Review your items before checkout</p>
          </div>

          <div className="cart-content">
            <div className="payment-info">
              <h3>Payment Information</h3>
              
              <div className="payment-method">
                <label>
                  <input type="radio" name="payment" value="online" defaultChecked />
                  Online Payment
                </label>
                <label>
                  <input type="radio" name="payment" value="cod" />
                  Cash on Delivery
                </label>
              </div>

              <form className="payment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter your phone" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" />
                </div>

                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea placeholder="Enter your full address"></textarea>
                </div>

                <div className="online-payment-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
              </form>
            </div>

            <div className="cart-items">
              <h3>Your Items</h3>
              {items.length === 0 ? (
                <div className="empty-cart">
                  <p>Giỏ hàng trống</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-category">₱ {item.price.toLocaleString()}.00</p>
                    </div>
                    <div className="item-quantity">
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <div className="item-total">
                      <span className="total">₱ {(item.price * item.quantity).toLocaleString()}.00</span>
                    </div>
                    <div className="item-remove">
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₱ {total.toLocaleString()}.00</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>₱ {shipping.toLocaleString()}.00</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>₱ {tax.toLocaleString()}.00</span>
              </div>
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>₱ {grandTotal.toLocaleString()}.00</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
  );
}

export default Cart;

