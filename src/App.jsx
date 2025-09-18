import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Landing from './pages/Landing';
import CivilianDashboard from './pages/CivilianDashboard';
import MunicipalDashboard from './pages/MunicipalDashboard';
import DepartmentDashboard from './pages/DepartmentDashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser } = useApp();
  
  if (!currentUser || currentUser.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/civilian" 
          element={
            <ProtectedRoute allowedRole="civilian">
              <CivilianDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/municipal" 
          element={
            <ProtectedRoute allowedRole="municipal">
              <MunicipalDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/department" 
          element={
            <ProtectedRoute allowedRole="department">
              <DepartmentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;