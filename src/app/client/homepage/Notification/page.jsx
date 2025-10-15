'use client';
import React, { Component } from 'react';
import './Notification.css';

class Notification extends Component {
  render() {
    return (
      <section className="notification">
        <div className="container">
          <marquee behavior="" direction=""> <p>
            We are currently experiencing local customs clearance delays. For the
            latest updates, please check your order status <a href="#" style={{color: '#1B4B66'}}>here</a>
          </p> </marquee>
        </div>
      </section>
    );
  }
}

export default Notification;