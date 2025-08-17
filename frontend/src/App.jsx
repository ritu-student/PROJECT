import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContainer from "./components/AuthContainer"; // ✅ new import
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
export default function App() {
  const [user, setUser] = useState(null);

  console.log("App user state:", user);

  return (
    <Routes>
    
      <Route
        path="/login"
        element={<AuthContainer onLoginSuccess={(userData) => setUser(userData)} />}
      />


      <Route
        path="/welcome"
        element={user ? <Welcome user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
      />
      {/* redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}
