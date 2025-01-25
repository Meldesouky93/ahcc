import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'; // Ensure it's imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthProvider> {/* ✅ Ensure it's used here */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  );