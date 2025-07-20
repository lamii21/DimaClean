import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Sidebar = ({ currentPage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      path: '/upload', 
      label: 'Upload', 
      icon: '🚀',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      path: '/processing', 
      label: 'Processing', 
      icon: '⚡',
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      path: '/visualization', 
      label: 'Visualization', 
      icon: '📈',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      path: '/reports', 
      label: 'Reports', 
      icon: '📋',
      gradient: 'from-indigo-500 to-purple-500'
    },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-72'} glass-card h-screen transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          {!isCollapsed ? (
            <Logo size="md" showText={true} use3D={true} />
          ) : (
            <Logo size="sm" showText={false} use3D={true} className="mx-auto" />
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <span className="text-white/70 text-lg">
              {isCollapsed ? '→' : '←'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''} group`
            }
          >
            <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
              <span className="text-lg">{item.icon}</span>
            </div>
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        {!isCollapsed && (
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">LE</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Lamiae El Jabri</p>
                <p className="text-xs text-white/60">Premium Plan</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;


