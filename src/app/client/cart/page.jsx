'use client';
import React, { Component } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './cart.css';

function withRouter(Component) {
  return function WrappedComponent(props) {
    const router = useRouter();
    return <Component {...props} router={router} />;
  };
}

class Cart extends Component {
  state = {
    cartItems: [],
    shipping: 0,
    discount: 0,
    isCouponApplied: false,
    loading: false
  };

  async componentDidMount() {
    await this.loadCartFromService();
  }

  loadCartFromService = async () => {
    try {
      const { getCart } = await import('@/lib/cartService');
      const cartItems = await getCart();
      this.setState({ cartItems });
    } catch (error) {
      console.error('Error loading cart:', error);
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

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cartDiscount', discount.toString());
      }

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

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('cartDiscount');
    }

    const removeBtn = document.querySelector('.coupon-remove-btn');
    if (removeBtn) {
      removeBtn.style.display = 'none';
    }

    const couponInput = document.getElementById('coupon-input');
    if (couponInput) {
      couponInput.value = '';
    }
  }

  removeFromCart = async (id) => {
    try {
      const { removeFromCart } = await import('@/lib/cartService');
      await removeFromCart(id);
      await this.loadCartFromService();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  handlePlaceOrder = async () => {
    const { getCurrentUser } = await import('@/lib/authService');
    const user = getCurrentUser();

    if (!user || !user.id) {
      const currentUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/client/auth/login?redirect=${currentUrl}`;
      return;
    }

    const { cartItems } = this.state;
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }

    this.props.router.push('/client/checkout');
  }

  render() {
    const { cartItems, discount, loading } = this.state;
    const displayTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = displayTotal > 200 ? 0 : (displayTotal > 0 ? 10 : 0);
    const displayGrandTotal = displayTotal + shipping - discount;

    return (
      <>
        <section className="cart-breadcrumbs">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">My Cart</span>
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
              <span className="summary-value discount-value">${discount.toFixed(2)}</span>
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
                <button
                  className="btn-place-order"
                  onClick={this.handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Proceed to Checkout'}
                </button>
                <Link href="/" className="btn-continue">Continue Shopping</Link>
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
                <input type="text" id="coupon-input" className="coupon-input" placeholder="Apply coupon code" />
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

export default withRouter(Cart);