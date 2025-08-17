import React, { useEffect, useState } from 'react';

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load user from localStorage when component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>You are logged in as {user.email}</p>
      <button onClick={onLogout} style={{ marginTop: '20px' }}>
       Logout
      </button>
    </div>
  );
}
