'use client';
import React, { Component } from 'react';
import '../auth.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    this.setState({ loading: true, error: '' });
    if (!username || !password) {
      this.setState({ 
        error: 'Vui lòng nhập đầy đủ thông tin',
        loading: false 
      });
      return;
    }

    if (username === 'admin' && password === '123123') {
      localStorage.setItem('user', JSON.stringify({
        username: 'admin',
        role: 'admin',
        loginTime: new Date().toISOString()
      }));
      window.location.href = '/account';
    } else {
      this.setState({ 
        error: 'Tên đăng nhập hoặc mật khẩu không đúng',
        loading: false 
      });
    }
  }

  render() {
    const { username, password, error, loading } = this.state;
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Đăng nhập</h1>
          </div>
          
          <form onSubmit={this.handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Demo: admin / 123123</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
