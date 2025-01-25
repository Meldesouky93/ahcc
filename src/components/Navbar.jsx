import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

export default function Navbar() {
  const auth = useAuth(); // Get the context first

  if (!auth) {
    console.error("AuthContext is undefined. Ensure AuthProvider wraps the app.");
    return null; // Prevents rendering a broken navbar
  }

  const { currentUser, logout } = auth; // Now safely destructure

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AHC Manager</Link>
      </div>
      <div className="navbar-links">
        {currentUser ? (
          <>
            <Link to="/create-event">Create Event</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
