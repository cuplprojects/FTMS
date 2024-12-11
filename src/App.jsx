import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from "./layout/layout";
import Login from './pages/user/login';
import Forgot from './pages/user/Forgot';
import Dashboard from './pages/Dashboard';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import ChangePassword from './pages/user/ChangePassword';
import UploadFile from './UploadFile/UploadFile';
import DownloadFile from './DownloadFile/DownloadFile';
import AddUsers from './pages/Masters/AddUsers';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Public Routes - with redirect if authenticated */}
        <Route path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />} 
        />
        <Route path="/forgot-password" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Forgot />} 
        />

        {/* Protected Routes */}
        <Route
          element={!isAuthenticated ? <Navigate to="/login" replace /> : <Layout />}
          path="/"
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="download-file" element={<DownloadFile />} />
          <Route path="upload-file" element={<UploadFile />} />
          <Route path="add-user" element={<AddUsers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="change-password" element={<ChangePassword />} />
          
          {/* Masters Routes */}
          

          {/* Catch all route for authenticated users */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Catch all route for non-authenticated users */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
