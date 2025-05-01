import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sider.jsx';
import WarehouseDashboard from './Dashboard.jsx';
import Login from './login.jsx';
import TaskManager from './TaskManager.jsx';
import Monitoring from './components/Monitoring';
import Notification from './components/Notification';
import Products from './components/products';
// import Product from './components/products.jsx';
// import Login from './login.jsx';

const App = () => {
  return (
    <Router>
      <div className="d-flex" style={{ backgroundColor: '#121826', minHeight: '100vh' }}>
        {/* Fixed sidebar - use position fixed to keep it in place */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: 1000, 
          height: '100vh',
          width: '280px' // Match the width of your Sidebar component
        }}>
          <Sidebar />
        </div>
        
        {/* Main content area with margin to prevent overlap with fixed sidebar */}
        <div className="flex-grow-1" style={{ 
          marginLeft: '280px', // Match the width of your Sidebar component
          width: 'calc(100% - 280px)', 
          minHeight: '100vh',
          overflowX: 'hidden'
        }}>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<WarehouseDashboard />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/products" element={<Products />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;