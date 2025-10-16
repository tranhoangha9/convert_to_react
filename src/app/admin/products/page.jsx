'use client';
import React, { Component } from 'react';
import Link from 'next/link';
import '../admin.css';

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      loading: false,
      showForm: false,
      editingProduct: null,
      formData: {
        name: '',
        price: '',
        originalPrice: '',
        description: '',
        shortDescription: '',
        image: '',
        sku: '',
        stock: 0,
        categoryId: 1,
        isActive: true,
        isFeatured: false,
        imagePreview: ''
      }
    };
    this.imageInputRef = React.createRef();
  }

  async componentDidMount() {
    await Promise.all([
      this.fetchProducts(),
      this.fetchCategories()
    ]);
  }

  fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();

      if (data.success) {
        this.setState({ categories: data.categories });
      } else {
        console.error('Error fetching categories:', data.error);
        this.setState({ categories: [] });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      this.setState({ categories: [] });
    }
  }

  fetchProducts = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (data.success) {
        this.setState({ products: data.products });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Lỗi khi tải danh sách sản phẩm');
    } finally {
      this.setState({ loading: false });
    }
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  }

  handleRemoveImage = () => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        image: '',
        imagePreview: ''
      }
    }));
    if (this.imageInputRef.current) {
      this.imageInputRef.current.value = '';
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData, editingProduct } = this.state;

    try {
      this.setState({ loading: true });

      const url = '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct 
        ? { ...formData, id: editingProduct.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        this.resetForm();
        await this.fetchProducts();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Lỗi khi lưu sản phẩm');
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn tắt kích hoạt sản phẩm này? Sản phẩm sẽ không hiển thị ở trang khách hàng nhưng vẫn có thể kích hoạt lại.')) return;

    try {
      this.setState({ loading: true });
      const response = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: false })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        await this.fetchProducts();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error deactivating product:', error);
      alert('Lỗi khi tắt kích hoạt sản phẩm');
    } finally {
      this.setState({ loading: false });
    }
  }

  handleEdit = (product) => {
    this.setState({
      showForm: true,
      editingProduct: product,
      formData: {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        image: product.image || '',
        sku: product.sku || '',
        stock: product.stock,
        categoryId: product.categoryId || 1,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        imagePreview: product.image || ''
      }
    });
  }

  handleActivate = async (id) => {
    if (!confirm('Bạn có chắc muốn kích hoạt lại sản phẩm này?')) return;

    try {
      this.setState({ loading: true });
      const response = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: true })
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        await this.fetchProducts();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error activating product:', error);
      alert('Lỗi khi kích hoạt sản phẩm');
    } finally {
      this.setState({ loading: false });
    }
  }

  handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          imagePreview: e.target.result
        }
      }));
    };
    reader.readAsDataURL(file);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await response.json();

      if (data.success) {
        this.setState(prevState => ({
          formData: {
            ...prevState.formData,
            image: data.imageUrl
          }
        }));
      } else {
        alert('Lỗi khi upload ảnh: ' + data.error);
        this.setState(prevState => ({
          formData: {
            ...prevState.formData,
            imagePreview: ''
          }
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Lỗi khi upload ảnh');
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          imagePreview: ''
        }
      }));
    }
  }

  resetForm = () => {
    this.setState({
      showForm: false,
      editingProduct: null,
      formData: {
        name: '',
        price: '',
        originalPrice: '',
        description: '',
        shortDescription: '',
        image: '',
        sku: '',
        stock: 0,
        categoryId: 1,
        isActive: true,
        isFeatured: false,
        imagePreview: ''
      }
    });
    if (this.imageInputRef.current) {
      this.imageInputRef.current.value = '';
    }
  }

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
    if (this.state.showForm) {
      this.resetForm();
    }
  }

  render() {
    const { products, loading, showForm, editingProduct, formData } = this.state;

    return (
      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="admin-nav">
            <Link href="/admin/products" className="admin-nav-item active">Quản lý sản phẩm</Link>
          </nav>
        </div>

        <div className="admin-content">
          <div className="admin-header">
            <h1>Quản lý sản phẩm</h1>
            <button className="admin-btn-primary" onClick={this.toggleForm}>
              {showForm ? 'Đóng form' : 'Thêm sản phẩm mới'}
            </button>
          </div>

          {showForm && (
            <div className="admin-card">
              <h3>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
              <form onSubmit={this.handleSubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Danh mục</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId || ''}
                      onChange={this.handleInputChange}
                      disabled={this.state.categories.length === 0}
                    >
                      <option value="">Chọn danh mục</option>
                      {this.state.categories.length === 0 ? (
                        <option value="" disabled>Không thể tải danh mục</option>
                      ) : (
                        this.state.categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>SKU</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={this.handleInputChange}
                      placeholder="Nhập mã SKU"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tên sản phẩm *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={this.handleInputChange}
                      placeholder="Nhập tên sản phẩm"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={this.handleInputChange}
                      placeholder="Nhập giá"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá gốc</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={this.handleInputChange}
                      placeholder="Nhập giá gốc"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={this.handleInputChange}
                      placeholder="Nhập số lượng"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Hoặc tải lên hình ảnh</label>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={this.handleImageUpload}
                      ref={this.imageInputRef}
                    />
                    {formData.imagePreview && (
                      <div className="image-preview">
                        <img src={formData.imagePreview} alt="Preview" />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>URL hình ảnh</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={this.handleInputChange}
                      placeholder="Nhập URL hình ảnh"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả ngắn</label>
                  <input 
                    type="text" 
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={this.handleInputChange}
                    placeholder="Nhập mô tả ngắn" 
                  />
                </div>

                <div className="form-group">
                  <label>Mô tả chi tiết</label>
                  <textarea 
                    rows="4" 
                    name="description"
                    value={formData.description}
                    onChange={this.handleInputChange}
                    placeholder="Nhập mô tả chi tiết"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="isActive"
                        checked={formData.isActive}
                        onChange={this.handleInputChange}
                      />
                      <span>Kích hoạt</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={this.handleInputChange}
                      />
                      <span>Nổi bật</span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="admin-btn-primary" disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
                  </button>
                  <button type="button" className="admin-btn-secondary" onClick={this.resetForm}>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="admin-card" style={{ marginTop: '30px' }}>
            <h3>Danh sách sản phẩm</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                        Chưa có sản phẩm nào
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} style={{ opacity: product.isActive ? 1 : 0.6 }}>
                        <td>{product.id}</td>
                        <td>
                          {product.image && (
                            <img src={product.image} alt={product.name} loading="lazy" />
                          )}
                        </td>
                        <td>{product.name}</td>
                        <td>${parseFloat(product.price).toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '12px',
                            background: product.isActive ? '#d4edda' : '#f8d7da',
                            color: product.isActive ? '#155724' : '#721c24'
                          }}>
                            {product.isActive ? 'Hoạt động' : 'Tắt kích hoạt'}
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => this.handleEdit(product)}
                            style={{ marginRight: '8px', padding: '4px 12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Sửa
                          </button>
                          {product.isActive ? (
                            <button 
                              onClick={() => this.handleDelete(product.id)}
                              style={{ marginRight: '8px', padding: '4px 12px', background: '#ffc107', color: '#212529', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              Tắt kích hoạt
                            </button>
                          ) : (
                            <button 
                              onClick={() => this.handleActivate(product.id)}
                              style={{ marginRight: '8px', padding: '4px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              Kích hoạt lại
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminProducts;
