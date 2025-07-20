import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, currentPage }) => {
  return (
    <div className="flex min-h-screen relative">
      {/* Lignes de connexion dynamiques */}
      <div className="connection-lines"></div>
      
      <Sidebar currentPage={currentPage} />
      <main className="flex-1 overflow-auto relative z-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

