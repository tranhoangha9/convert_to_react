'use client';
import React, { Component } from 'react';
import './CartModal.css';
import Link from 'next/link';

class CartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            couponCode: '',
            tax: 2.00
        };
        this.checkCartInterval = null;
    }

    async componentDidMount() {
        await this.loadCartItems();
        this.checkCartInterval = setInterval(() => {
            this.loadCartItems();
        }, 2000);
    }

    componentWillUnmount() {
        if (this.checkCartInterval) {
            clearInterval(this.checkCartInterval);
        }
    }

    loadCartItems = async () => {
        try {
            const { getCart } = await import('@/lib/cartService');
            const items = await getCart();
            
            if (JSON.stringify(this.state.items) !== JSON.stringify(items)) {
                this.setState({ items });
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }

    updateQuantity = async (id, change) => {
        try {
            const item = this.state.items.find(i => i.id === id);
            if (!item) return;

            const newQuantity = Math.max(1, item.quantity + change);
            const { updateCartItemQuantity } = await import('@/lib/cartService');
            await updateCartItemQuantity(id, newQuantity);
            await this.loadCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    removeItem = async (id) => {
        try {
            const { removeFromCart } = await import('@/lib/cartService');
            await removeFromCart(id);
            await this.loadCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    getSubtotal = () => {
        return this.state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    handleCouponSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { isOpen, onClose } = this.props;
        const subtotal = this.getSubtotal();
        const total = subtotal + this.state.tax;

        if (!isOpen) return null;

        return (
            <div className="cart-modal-overlay"
            onClick={(e) => {
                if(e.target.className === 'cart-modal-overlay') {
                    onClose();
                }}
            }
            >
                <div className="cart-modal">
                    <div className="cart-modal-header">
                        <button onClick={onClose} className="back-button">
                            ← Back
                        </button>
                    </div>

                    <div className="cart-items">
                        {this.state.items.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <div className="item-details-bottom">
                                        <div className="quantity-controls">
                                            <button onClick={() => this.updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => this.updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <div className="item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => this.removeItem(item.id)}
                                    className="remove-item"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>${this.state.tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        
                        <form onSubmit={this.handleCouponSubmit} className="modal-coupon-form">
                            <input
                                type="text"
                                placeholder="Apply Coupon Code"
                                value={this.state.couponCode}
                                onChange={(e) => this.setState({ couponCode: e.target.value })}
                            />
                            <button type="submit">Apply</button>
                        </form>

                     
                        <div className="cart-actions">
                            <Link 
                                href="/client/cart"
                                onClick={onClose}
                                className="place-order-btn"
                            >
                                Place Order
                            </Link>
                            <button onClick={onClose} className="continue-shopping-btn">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartModal;