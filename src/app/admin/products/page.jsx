'use client';
import React, { Component } from 'react';
import '../admin.css';

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="admin-nav">
            <a href="/admin/products" className="admin-nav-item active">Quản lý sản phẩm</a>
            <a href="/admin/banners" className="admin-nav-item">Quản lý Banner</a>
            <a href="/admin/notifications" className="admin-nav-item">Quản lý Thông báo</a>
          </nav>
        </div>

        <div className="admin-content">
          <div className="admin-header">
            <h1>Quản lý sản phẩm</h1>
            <button className="admin-btn-primary">Thêm sản phẩm mới</button>
          </div>

          <div className="admin-card">
            <div className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input type="text" placeholder="Nhập tên sản phẩm" />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input type="text" placeholder="Nhập mã SKU" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá gốc</label>
                  <input type="number" placeholder="Nhập giá gốc" />
                </div>
                <div className="form-group">
                  <label>Giá khuyến mãi</label>
                  <input type="number" placeholder="Nhập giá khuyến mãi" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Danh mục</label>
                  <select>
                    <option>Chọn danh mục</option>
                    <option>Handbags</option>
                    <option>Watches</option>
                    <option>Skincare</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <input type="number" placeholder="Nhập số lượng" />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả ngắn</label>
                <input type="text" placeholder="Nhập mô tả ngắn" />
              </div>

              <div className="form-group">
                <label>Mô tả chi tiết</label>
                <textarea rows="4" placeholder="Nhập mô tả chi tiết"></textarea>
              </div>

              <div className="form-group">
                <label>Hình ảnh</label>
                <input type="file" accept="image/*" />
              </div>

              <div className="form-actions">
                <button className="admin-btn-primary">Lưu sản phẩm</button>
                <button className="admin-btn-secondary">Hủy</button>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '30px' }}>
            <h3>Danh sách sản phẩm</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    Chưa có sản phẩm nào
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

export default AdminProducts;
