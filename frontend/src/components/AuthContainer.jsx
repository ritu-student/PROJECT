import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthContainer({ onLoginSuccess }) {
  const [showLogin, setShowLogin] = useState(true);

  const switchToRegister = () => {
    console.log("switchToRegister called");
    setShowLogin(false);
  };

  const switchToLogin = () => {
    console.log("switchToLogin called");
    setShowLogin(true);
  };

  return (
    <>
      {showLogin ? (
        <Login switchToRegister={switchToRegister} onLoginSuccess={onLoginSuccess} />
      ) : (
        <Register switchToLogin={switchToLogin} />
      )}
    </>
  );
}
