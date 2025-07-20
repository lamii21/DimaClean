import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Plateforme de Nettoyage de Données
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84L3.93 8.96M2 12h4M5.84 16.95l3.12-3.12M12 22v-4M16.95 18.16l3.12 3.12M22 12h-4M18.16 7.05l-3.12 3.12" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">LE</span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">Lamiae El Jabri</div>
              <div className="text-xs text-gray-500">Développeur</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;