import React from 'react';
import ClientWrapper from '../components/ClientWrapper';
import '../styles/globals.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/banner.css';
import '../styles/best-selling.css';
import '../styles/about-us.css';
import '../styles/categories.css';
import '../styles/testimonials.css';
import '../styles/products.css';
import '../styles/cart.css';

export const metadata = {
  title: 'GREENMIND - Plant Store',
  description: 'We help you find the best plants for your home, garden & office.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}

