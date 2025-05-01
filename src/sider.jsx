import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsGrid, BsListTask, BsBox, BsEye, BsBell, BsChevronRight, BsShieldLock } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Function to determine active item based on current path
  const getActiveItem = (path) => {
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/tasks') return 'Task Assignment';
    if (path === '/products') return 'Product Entry';
    if (path === '/monitoring') return 'Monitoring';
    if (path === '/notifications') return 'Notifications';
    return 'Dashboard'; // Default
  };
  
  const activeItem = getActiveItem(location.pathname);
  
  const menuItems = [
    { name: 'Dashboard', icon: BsGrid, notifications: 0, path: '/dashboard' },
    { name: 'Task Assignment', icon: BsListTask, notifications: 0, path: '/tasks' },
    { name: 'Product Entry', icon: BsBox, notifications: 0, path: '/products' },
    { name: 'Monitoring', icon: BsEye, notifications: 0, path: '/monitoring' },
    { name: 'Notifications', icon: BsBell, notifications: 3, path: '/notifications' }
  ];

  return (
    <div className="d-flex flex-column p-3 text-white" 
      style={{ 
        width: '280px', 
        backgroundColor: '#0f172a', 
        height: '100vh',
        boxShadow: '0 0 25px rgba(0, 0, 0, 0.4), 0 0 50px rgba(13, 138, 240, 0.06)',
        position: 'relative',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundImage: 'radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.08) 0%, transparent 30%)'
      }}>
      {/* Logo section */}
      <Link to="/dashboard" className="d-flex align-items-center mb-4 mt-2 text-white text-decoration-none">
        <div style={{ 
          width: '42px', 
          height: '42px', 
          background: 'linear-gradient(135deg, #0dcaf0 0%, #0d8af0 100%)', 
          borderRadius: '12px', 
          marginRight: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 5px 15px rgba(13, 202, 240, 0.3), 0 0 30px rgba(13, 202, 240, 0.1)',
          animation: 'subtle-pulse 3s ease-in-out infinite'
        }}>
          <BsShieldLock size={22} color="white" />
        </div>
        <div className="d-flex flex-column">
          <span className="fs-4 fw-bold lh-1" style={{ 
            background: 'linear-gradient(90deg, #ffffff, #94a3b8)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>AutoFleet</span>
          <span style={{ 
            fontSize: '12px', 
            color: '#94a3b8',
            letterSpacing: '0.5px'
          }}>WAREHOUSE MANAGEMENT</span>
        </div>
      </Link>
      
      {/* Gradient separator */}
      <div className="mb-4" style={{ 
        height: '2px', 
        background: 'linear-gradient(90deg, rgba(13, 202, 240, 0.3), rgba(13, 138, 240, 0.1), rgba(255,255,255,0))' 
      }}></div>
      
      {/* Menu items */}
      <div className="mb-2 ps-3" style={{ 
        fontSize: '12px', 
        color: '#64748b', 
        fontWeight: '600',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        Main Menu
      </div>
      
      <ul className="nav nav-pills flex-column mb-auto gap-2" style={{ padding: '0 8px' }}>
        {menuItems.map((item) => (
          <li key={item.name} className="nav-item">
            <Link 
              to={item.path}
              className={`nav-link d-flex align-items-center ${activeItem === item.name ? 'active' : 'text-white'}`}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ 
                padding: '14px 16px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                position: 'relative',
                background: activeItem === item.name ? 
                  'linear-gradient(90deg, rgba(13, 202, 240, 0.8), rgba(13, 138, 240, 0.5))' : 
                  hoveredItem === item.name ?
                  'rgba(255, 255, 255, 0.05)' :
                  'transparent',
                boxShadow: activeItem === item.name ? 
                  '0 4px 12px rgba(13, 202, 240, 0.25)' : 
                  'none',
                transform: hoveredItem === item.name && activeItem !== item.name ? 
                  'translateX(5px)' : 
                  'translateX(0)',
                overflow: 'hidden',
                textDecoration: 'none'
              }}
            >
              {/* Active indicator */}
              {activeItem === item.name && (
                <div className="position-absolute" style={{
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '60%',
                  background: 'white',
                  borderRadius: '0 4px 4px 0'
                }}></div>
              )}
              
              <div className="d-flex align-items-center justify-content-center me-3" style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: activeItem === item.name ? 
                  'rgba(255, 255, 255, 0.2)' : 
                  'rgba(13, 202, 240, 0.1)',
                transition: 'all 0.2s ease'
              }}>
                <item.icon style={{ 
                  color: activeItem === item.name ? 'white' : '#0dcaf0',
                  fontSize: '18px'
                }} />
              </div>
              
              <span style={{ 
                fontWeight: activeItem === item.name ? '600' : '500',
                fontSize: '15px'
              }}>
                {item.name}
              </span>
              
              {activeItem === item.name && (
                <BsChevronRight 
                  className="ms-auto" 
                  style={{ 
                    opacity: 0.7,
                    fontSize: '14px'
                  }} 
                />
              )}
              
              {item.notifications > 0 && (
                <span className="ms-auto badge rounded-pill d-flex align-items-center justify-content-center" 
                  style={{ 
                    background: 'linear-gradient(135deg, #dc3545, #fd7e14)',
                    boxShadow: '0 2px 6px rgba(220, 53, 69, 0.4)',
                    fontSize: '10px',
                    height: '20px',
                    minWidth: '20px'
                  }}>
                  {item.notifications}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Status section */}
      <div className="mb-4 mt-4">
        <div className="d-flex align-items-center px-3 mb-2">
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#10b981',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)'
          }}></div>
          <span className="ms-2" style={{ fontSize: '13px', color: '#94a3b8' }}>System Status: Online</span>
        </div>
        <div className="px-3" style={{ 
          fontSize: '12px', 
          color: '#64748b' 
        }}>
          Last updated: 29 Mar, 2025
        </div>
      </div>

      {/* Bottom profile section */}
      <div className="mt-auto mb-2" style={{ 
        padding: '16px', 
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7))',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}>
        <div className="d-flex align-items-center">
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #0dcaf0, #6610f2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            marginRight: '12px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 10px rgba(13, 202, 240, 0.2)'
          }}>
            AW
          </div>
          <div>
            <div className="fw-bold" style={{ 
              fontSize: '15px',
              background: 'linear-gradient(90deg, #ffffff, #cbd5e1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Admin Workspace</div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Fleet Manager</div>
          </div>
          <BsChevronRight className="ms-auto" style={{ color: '#64748b', fontSize: '14px' }} />
        </div>
      </div>

      <style>
        {`
          @keyframes subtle-pulse {
            0% { box-shadow: 0 5px 15px rgba(13, 202, 240, 0.3), 0 0 30px rgba(13, 202, 240, 0.1); }
            50% { box-shadow: 0 5px 20px rgba(13, 202, 240, 0.4), 0 0 40px rgba(13, 202, 240, 0.2); }
            100% { box-shadow: 0 5px 15px rgba(13, 202, 240, 0.3), 0 0 30px rgba(13, 202, 240, 0.1); }
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;