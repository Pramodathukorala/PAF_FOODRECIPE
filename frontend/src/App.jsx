import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Profile from './components/profile/Profile';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/profile" />} />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/profile/:username" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/auth"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
