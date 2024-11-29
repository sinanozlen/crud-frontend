import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Şifreler uyuşmuyor!');
      return;
    }

    try {
      // API'ye post isteği göndermeden önce log atabiliriz
      console.log('Kullanıcı Adı:', username);
      console.log('Şifre:', password);
      
      const response = await axios.post('https://your-backend-api-url/register', {
        username: username,
        password: password,
      });

      // Backend'den gelen cevaba göre başarılı olup olmadığını kontrol et
      if (response.data.success) {
        setSuccessMessage('Kayıt başarıyla tamamlandı!');
        onRegister(username); // Kayıt başarılı, kullanıcıyı giriş yapmaya yönlendir
      } else {
        setErrorMessage('Kayıt başarısız. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      // Hata mesajlarını ayrıntılı şekilde gösterelim
      console.error('API Hatası:', error);
      if (error.response) {
        setErrorMessage(`Hata: ${error.response.data.message || 'Bilinmeyen bir hata oluştu'}`);
      } else if (error.request) {
        setErrorMessage('Sunucuya bağlanırken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        setErrorMessage(`Bir hata oluştu: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="form-group">
          <label>Şifreyi Onayla</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Kaydol</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Register;
