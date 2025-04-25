import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Navbar from './components/navigation/Navbar';

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={!isAuthenticated ? <Auth /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <AuthenticatedRoute>
              <Dashboard />
            </AuthenticatedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          } 
        />
        <Route 
          path="/profile/:username" 
          element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
