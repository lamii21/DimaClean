
import React from 'react';
import { Link } from 'react-router-dom';
import Logo3DBlue from '../components/Logo/Logo3DBlue';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Lignes de connexion animées */}
      <div className="connection-lines"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Logo 3D Bleu */}
        <div className="mb-8">
          <Logo3DBlue size="xl" showText={false} />
        </div>
        
        {/* Titre principal */}
        <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-6 floating-element">
          DimaClean
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl">
          Transformez vos données brutes en insights précieux
        </p>
        
        <p className="text-lg text-white/60 mb-12 max-w-2xl">
          Application web moderne de nettoyage et visualisation de données CSV
        </p>
        
        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <Link to="/upload" className="btn-primary text-lg px-8 py-4">
            <span className="mr-3">🚀</span>
            Commencer maintenant
          </Link>
          <Link to="/dashboard" className="btn-secondary text-lg px-8 py-4">
            <span className="mr-3">📊</span>
            Voir le tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
























