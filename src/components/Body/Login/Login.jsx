import React, { useState } from 'react';
import './Login.css';
import Logo from '../../Images/logo.png';
import { FaUserCircle, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../config/apiConfig';

const Login = ({ onLogin }) => { // Nhận hàm từ App qua props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' && password === '') {
      toast.error('Vui lòng điền đầy đủ thông tin tài khoản!', { position: 'top-right' });
    } else if (username === '') {
      toast.error('Vui lòng điền tên đăng nhập!', { position: 'top-right' });
    } else {
      const body = {
        email: username,
        password: password
      }
      fetch(endpoint.login.url, {
        method: endpoint.login.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 1000) {
            if (data.result.manager === false) {
              toast.error("Tài khoản hoặc mật khẩu không chính xác")
              return
            }
            localStorage.setItem('token', data.result.token);
            onLogin(true);
            toast.success('Đăng nhập thành công!', { position: 'top-right' });
          } else {
            toast.error(data.message || 'Đăng nhập thất bại!', { position: 'top-right' });
          }
        })
        .catch(error => {
          console.error("Error during login:", error);
          toast.error('Đã xảy ra lỗi, vui lòng thử lại!', { position: 'top-right' });
        });
    }
  };

  return (
    <div className='wrapper-login'>
      <ToastContainer style={{ zIndex: 9999 }} />
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="container">
              <div className="row container-login">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="login-header">
                    <img src={Logo} alt="" />
                    <span>Parking</span>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="login-input">
                    <span>Tên đăng nhập</span>
                    <div className='ip-relative'>
                      <input
                        type="text"
                        placeholder='Tên đăng nhập...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <i className='login-icon'>
                        <FaUserCircle />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="login-input">
                    <span>Mật khẩu</span>
                    <div className='ip-relative'>
                      <input
                        type="password"
                        placeholder='Mật khẩu...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={16}
                      />
                      <i className='login-icon'>
                        <FaLock />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="btn-login">
                    <button type="submit" onClick={handleLogin}>
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
