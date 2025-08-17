// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegisterSuccess, switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Donor');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        role
      });
      alert('Registration successful! Redirecting to login...');
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
  alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const linkStyle = {
    color: '#007bff',
    cursor: 'pointer',
    marginTop: '15px',
    display: 'block'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#333' }}>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      /><br/>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      /><br/>
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      /><br/>
      <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
        <option value="Donor">Donor</option>
        <option value="Volunteer">Volunteer</option>
        <option value="NGO">NGO</option>
      </select><br/>
      <button onClick={handleRegister} style={buttonStyle}>
        Sign Up
      </button>
      <span style={linkStyle} onClick={switchToLogin}>
        Already have an account? Log in
      </span>
    </div>
  );
}