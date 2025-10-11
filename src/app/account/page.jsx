'use client';
import React, { Component } from 'react';
import './account.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      profileImage: null,
      profileImageUrl: null,
      loading: false,
      error: ''
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    try {
      const userData = JSON.parse(user);
      this.setState({ user: userData });
      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) {
        this.setState({ profileImageUrl: savedImage });
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      window.location.href = '/auth/login';
    }
  }

  handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.setState({ error: 'Chỉ chấp nhận file ảnh (JPG, PNG, WEBP)' });
      return;
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      this.setState({ error: 'Kích thước file không được vượt quá 2MB' });
      return;
    }

    this.setState({ error: '' });
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        profileImage: file,
        profileImageUrl: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSaveProfile = () => {
    const { profileImageUrl } = this.state;

    if (profileImageUrl) {
      localStorage.setItem('profileImage', profileImageUrl);
      alert('Ảnh đại diện đã được lưu!');
    }
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    window.location.href = '/auth/login';
  }

  render() {
    const { user, profileImageUrl, error } = this.state;

    if (!user) {
      return <div>Đang kiểm tra đăng nhập...</div>;
    }

    return (
      <div className="account-container">
        <div className="account-sidebar">
          <div className="sidebar-card">
            <nav className="sidebar-menu">
              <a href="#personal-info" className="menu-item active">
                Personal Information
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#refer-earn" className="menu-item">
                Refer and Earn
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#my-orders" className="menu-item">
                My Orders
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#my-wishlist" className="menu-item">
                My Wishlist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#my-reviews" className="menu-item">
                My Reviews
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#my-address" className="menu-item">
                My Address Book
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#my-cards" className="menu-item">
                My Saved Cards
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </nav>
          </div>
        </div>

        <div className="account-main">
          <div className="main-header">
            <h1>Personal Information</h1>
            <button onClick={this.handleLogout} className="logout-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Logout
            </button>
          </div>
          <hr className="main-divider" />
          <div className="profile-picture-area">
            <div className="profile-avatar">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>

            <div className="profile-actions">
              <input
                type="file"
                id="profileImage"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={this.handleImageChange}
                className="file-input"
              />
              <label htmlFor="profileImage" className="upload-btn">
                Upload
              </label>
              {profileImageUrl && (
                <button className="delete-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </div>

          <div className="info-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" />
              </div>
            </div>

            <div className="form-row form-row-contact">
              <div className="form-group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <div className="phone-input">
                  <input type="text" className="country-code" />
                  <input type="text" className="phone-number" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of birth</label>
                <div className="date-input">
                  <input type="text" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider">
            <h2>Change Password</h2>
            <hr />
          </div>

          <div className="password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-input">
                <input type="password" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" />
            </div>
          </div>

          <div className="save-section">
            <button className="save-changes-btn">
              Save Changes
            </button>
          </div>

        
        </div>
      </div>
    );
  }
}

export default Account;
