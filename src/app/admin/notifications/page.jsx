'use client';
import React, { Component } from 'react';
import '../admin.css';

class AdminNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }

  render() {
    return (
      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="admin-nav">
            <a href="/admin/products" className="admin-nav-item">Quản lý sản phẩm</a>
            <a href="/admin/banners" className="admin-nav-item">Quản lý Banner</a>
            <a href="/admin/notifications" className="admin-nav-item active">Quản lý Thông báo</a>
          </nav>
        </div>

        <div className="admin-content">
          <div className="admin-header">
            <h1>Quản lý Thông báo</h1>
            <button className="admin-btn-primary">Thêm thông báo mới</button>
          </div>

          <div className="admin-card">
            <div className="admin-form">
              <div className="form-group">
                <label>Nội dung thông báo</label>
                <textarea 
                  rows="3" 
                  placeholder="Nhập nội dung thông báo (hiển thị trên marquee)"
                ></textarea>
                <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                  Nội dung này sẽ hiển thị trên thanh thông báo chạy ở đầu trang
                </small>
              </div>

              <div className="form-group">
                <label>Loại thông báo</label>
                <select>
                  <option value="info">Thông tin</option>
                  <option value="warning">Cảnh báo</option>
                  <option value="success">Thành công</option>
                  <option value="error">Lỗi</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Kích hoạt thông báo</span>
                </label>
              </div>

              <div className="form-actions">
                <button className="admin-btn-primary">Lưu thông báo</button>
                <button className="admin-btn-secondary">Hủy</button>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '30px' }}>
            <h3>Danh sách Thông báo</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nội dung</th>
                  <th>Loại</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                    Chưa có thông báo nào
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

export default AdminNotifications;
