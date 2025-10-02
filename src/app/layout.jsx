import React from 'react';
import ClientWrapper from '../components/ClientWrapper';
import './globals.css';
import '../layouts/Header/Header.css';
import '../layouts/Footer/Footer.css';
import '../components/Banner/Banner.css';
import '../components/BestSelling/BestSelling.css';
import '../components/Categories/Categories.css';
import '../components/AboutUs/AboutUs.css';
import '../components/Testimonials/Testimonials.css';

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

