import React from 'react';

const Navbar = ({ username, logout }) => {
  return (
    <nav style={{ backgroundColor: '#4CAF50', padding: '10px' }}>
      <div style={{ color: 'white', fontSize: '20px' }}>
        <span>Hoş geldiniz, {username} </span>
        <button onClick={logout} style={{ float: 'right', backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
