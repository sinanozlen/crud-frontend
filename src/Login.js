import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, setUsername }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Giriş yapma işlemi
  const handleLogin = (e) => {
    e.preventDefault();

    // Doğru kullanıcı adı ve şifre kontrolü
    if (username === 'sinan' && password === 'RST1212') {
      // Başarılı giriş
      localStorage.setItem('token', 'fake-token');  // Token'ı localStorage'a kaydediyoruz (gerçek bir API isteği yapılacaksa burası değişebilir)
      localStorage.setItem('username', username); // Kullanıcı adını localStorage'a kaydediyoruz
      onLogin(true); // Giriş başarılı
      setUsername(username); // Kullanıcı adını set et
    } else {
      // Hatalı giriş
      setErrorMessage('Kullanıcı adı veya şifre yanlış.');
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Giriş Yap</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
