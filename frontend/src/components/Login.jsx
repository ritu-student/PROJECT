import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ Decode token from localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded from localStorage:', decoded);
      } catch (err) {
        console.warn('Failed to decode stored token:', err);
      }
    } else {
      console.warn('Token not found in localStorage');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      if (token) {
        // Decode token if user object is missing
        let userData = user;
        if (!userData) {
          try {
            userData = jwtDecode(token);
            console.log("Decoded user data:", userData);
          } catch (err) {
            console.warn("Failed to decode token:", err);
          }
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        if (onLoginSuccess) onLoginSuccess(userData);

        navigate("/welcome");
      } else {
        console.error("Invalid login response:", res.data);
        alert("Login failed: Invalid server response.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      background: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#333' }}>Login</h2>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '90%',
          padding: '10px',
          margin: '8px 0',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '90%',
          padding: '10px',
          margin: '8px 0',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      /><br />
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
        Log In
      </button>
      <span
        style={{
          color: '#28a745',
          cursor: 'pointer',
          marginTop: '15px',
          display: 'block'
        }}
          onClick={() => {
    console.log("Register button clicked");
    switchToRegister();
  }}
>
        Don't have an account? Register
      </span>
    </div>
  );
}
