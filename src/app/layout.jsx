import React from 'react';
import ClientWrapper from '../components/ClientWrapper';
import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';
import './globals.css';
import '../layouts/Header/Header.css';
import '../layouts/Footer/Footer.css';
import '../components/Notification/Notification.css';
import '../components/Banner/Banner.css';
import '../components/BestSelling/BestSelling.css';
import '../components/Collection/Collection.css';
import '../components/Brands/Brands.css';
import '../styles/cart.css';

export const metadata = {
  title: "Cora'l - Fashion Store",
  description: 'Shop the latest fashion trends and accessories.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <Header />
          {children}
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}