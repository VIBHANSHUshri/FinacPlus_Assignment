import React, { useState, lazy, Suspense } from "react";
import './App.css';
import Login from "./login";
import { login, logout, getRole, getName } from "./auth";

// Lazy-load remote app
const MusicLibrary = lazy(() => import("musicLibraryApp/musiclibrary"));

export default function App() {
  const [role, setRole] = useState(getRole());
  const [name, setName] = useState(getName());

  const handleLogin = (selectedRole, username) => {
    login(selectedRole, username);
    setRole(selectedRole);
    setName(username);
  };

  const handleLogout = () => {
    logout();
    setRole(null);
    setName(null);
  };

  if (!role) return <Login onLogin={handleLogin} />;

  return (
    <div>
      <header className="app-header">
        <h1>Music App</h1>
        <div className="user-info">
          Logged in as: {name} ({role})
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <Suspense fallback={<div className="SuspenseFallback">Loading Music Library...</div>}>
      
          <MusicLibrary role={role} username={name} />
       
      </Suspense>
    </div>
  );
}
