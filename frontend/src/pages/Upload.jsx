import React from 'react';
import MainLayout from '../components/Layout/MainLayout';

const Upload = () => {
  return (
    <MainLayout currentPage="upload">
      <div className="p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4 floating-element">
            Upload de Fichiers
          </h1>
          <p className="text-xl text-white/70">
            Importez vos fichiers CSV pour commencer le nettoyage
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="upload-zone">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold mb-2">Glissez-déposez vos fichiers ici</h3>
            <p className="text-white/60 mb-6">ou cliquez pour sélectionner</p>
            <button className="btn-primary">
              Choisir un fichier
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Upload;


