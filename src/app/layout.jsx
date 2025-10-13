import React from 'react';
import ClientWrapper from '../components/ClientWrapper';
import Header from '../components/Header/page';
import Footer from '../components/Footer/page';
import '../styles/globals.css';
import '../components/Header/Header.css';
import '../components/Footer/Footer.css';
import './homepage/Notification/Notification.css';
import './homepage/Banner/Banner.css';
import './homepage/BestSelling/BestSelling.css';
import './homepage/Collection/Collection.css';
import './homepage/Brands/Brands.css';

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