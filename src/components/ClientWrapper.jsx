'use client';

import React from 'react';
import { CartProvider } from '../context/CartContext';
import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';

export default function ClientWrapper({ children }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
}
