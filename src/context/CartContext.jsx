'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Tạo Context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0,
  shipping: 0,
  tax: 0,
  grandTotal: 0
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        ...calculateTotals(action.payload)
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        // Tăng số lượng nếu đã có
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Thêm mới
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0); // Xóa item nếu quantity = 0
      
      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems)
      };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        ...calculateTotals(filteredItems)
      };
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
};

// Hàm tính toán tổng tiền
const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Logic tính phí ship và tax
  let shipping = 0;
  let tax = 0;
  
  if (items.length > 0) {
    // Nếu tổng tiền >= 5000 thì ship = 0
    shipping = subtotal >= 5000 ? 0 : 15;
    // Tax = 8% của subtotal
    tax = subtotal * 0.08;
  }
  
  const grandTotal = subtotal + shipping + tax;
  
  return {
    total: subtotal,
    shipping,
    tax,
    grandTotal
  };
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart từ localStorage khi component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart vào localStorage mỗi khi state thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

