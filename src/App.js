import React, { useState, useEffect } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import PersonCrud from './components/PersonCrud'; // Eğer gerekliyse

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcı giriş durumu
  const [username, setUsername] = useState(''); // Kullanıcı adı

  // Çıkış yapma fonksiyonu
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
  };

  // Uygulama ilk yüklendiğinde, localStorage'dan token kontrolü
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  return (
    <div>
      {/* Navbar yalnızca giriş yapıldığında görüntülenir */}
      {isLoggedIn && <Navbar username={username} logout={logout} />}
      
      {/* Kullanıcı giriş yapmadıysa Login ekranını göster */}
      {!isLoggedIn ? (
        <Login onLogin={setIsLoggedIn} setUsername={setUsername} />
      ) : (
        // Giriş yapıldıysa kişisel sayfa veya içerik burada gösterilebilir
        <div>
          <h2>Hoş geldiniz, {username}!</h2>
          <PersonCrud /> {/* Buraya istediğiniz içeriği ekleyebilirsiniz */}
        </div>
      )}
    </div>
  );
}

export default App;
