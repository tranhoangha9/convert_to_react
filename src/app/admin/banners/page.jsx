'use client';
import React, { Component } from 'react';
import '../admin.css';

class AdminBanners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: []
    };
  }

  render() {
    return (
      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="admin-nav">
            <a href="/admin/products" className="admin-nav-item">Quản lý sản phẩm</a>
            <a href="/admin/banners" className="admin-nav-item active">Quản lý Banner</a>
            <a href="/admin/notifications" className="admin-nav-item">Quản lý Thông báo</a>
          </nav>
        </div>

        <div className="admin-content">
          <div className="admin-header">
            <h1>Quản lý Banner</h1>
            <button className="admin-btn-primary">Thêm banner mới</button>
          </div>

          <div className="admin-card">
            <div className="admin-form">
              <div className="form-group">
                <label>Tiêu đề Banner</label>
                <input type="text" placeholder="Nhập tiêu đề banner (tùy chọn)" />
              </div>

              <div className="form-group">
                <label>Link đích</label>
                <input type="text" placeholder="Nhập URL khi click vào banner (tùy chọn)" />
              </div>

              <div className="form-group">
                <label>Hình ảnh Banner</label>
                <input type="file" accept="image/*" />
                <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                  Kích thước khuyến nghị: 1920x600px
                </small>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Kích hoạt banner</span>
                </label>
              </div>

              <div className="form-actions">
                <button className="admin-btn-primary">Lưu banner</button>
                <button className="admin-btn-secondary">Hủy</button>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '30px' }}>
            <h3>Danh sách Banner</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hình ảnh</th>
                  <th>Tiêu đề</th>
                  <th>Link</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    Chưa có banner nào
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminBanners;
