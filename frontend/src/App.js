// src/App.js
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // default page
  const [user, setUser] = useState(null); // store logged-in user info

  const handleLoginSuccess = (userData) => {
    console.log(userData);
    setUser(userData);
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('login'); // after registration, switch to login
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    background: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  };

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.trim().split(' ');
    const initials = names.map(n => n[0].toUpperCase());
    return initials.slice(0, 2).join(''); // max 2 letters
  };

  const getAvatarColor = (role) => {
    switch(role) {
      case 'Donor': return '#28a745';      // green
      case 'Volunteer': return '#17a2b8';  // teal
      case 'NGO': return '#ffc107';        // yellow
      default: return '#007bff';           // blue
    }
  };

  const getRoleMessage = (role) => {
    switch(role) {
      case 'Donor': return 'Thanks for donating!';
      case 'Volunteer': return 'Ready to help?';
      case 'NGO': return 'Helping communities!';
      default: return 'Welcome!';
    }
  };

  const welcomeTextStyle = {
    color: '#333',
    marginBottom: '5px'
  };

  const roleMessageStyle = {
    color: '#555',
    fontStyle: 'italic',
    marginBottom: '15px'
  };

  return (
    <div>
      {!user ? (
        currentPage === 'login' ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            switchToRegister={() => setCurrentPage('register')}
          />
        ) : (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            switchToLogin={() => setCurrentPage('login')}
          />
        )
      ) : (
        <div style={containerStyle}>
          <div
            style={{
              width: '60px',
              height: '60px',
              background: getAvatarColor(user.role),
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 auto 15px'
            }}
          >
            {getInitials(user.name)}
          </div>
          <h2 style={welcomeTextStyle}>Welcome, {user.name}!</h2>
          <p style={roleMessageStyle}>{getRoleMessage(user.role)}</p>
          <p style={{ color: '#555' }}>You are logged in as <strong>{user.role}</strong></p>
          <button style={buttonStyle} onClick={() => setUser(null)}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;