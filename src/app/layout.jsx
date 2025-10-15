import React from 'react';
import ClientWrapper from '../components/ClientWrapper';
import Header from '../components/Header/page';
import Footer from '../components/Footer/page';
import '../styles/globals.css';
import '../components/Header/Header.css';
import '../components/Footer/Footer.css';
import './client/homepage/Notification/Notification.css';
import './client/homepage/Banner/Banner.css';
import './client/homepage/BestSelling/BestSelling.css';
import './client/homepage/Collection/Collection.css';
import './client/homepage/Brands/Brands.css';

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