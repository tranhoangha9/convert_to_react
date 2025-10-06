import React from 'react';
import ClientWrapper from '../components/ClientWrapper';
import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';
import '../styles/globals.css';
import '../layouts/Header/Header.css';
import '../layouts/Footer/Footer.css';
import '../components/Notification/Notification.css';
import '../components/Banner/Banner.css';
import '../components/BestSelling/BestSelling.css';
import '../components/Collection/Collection.css';
import '../components/Brands/Brands.css';

export const metadata = {
  title: "Cora'l ",
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