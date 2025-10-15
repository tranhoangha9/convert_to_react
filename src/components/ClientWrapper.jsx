'use client';
import React, { Component } from 'react';

class ClientWrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Clear session khi app khởi tạo lần đầu
    if (typeof window !== 'undefined' && !sessionStorage.getItem('appStarted')) {
      // Chỉ clear nếu không phải là reload trang
      const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
      if (!isReload) {
        localStorage.removeItem('user');
        sessionStorage.setItem('appStarted', 'true');
      }
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default ClientWrapper;