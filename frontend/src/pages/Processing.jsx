import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';

const Processing = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingSteps, setProcessingSteps] = useState([
    { id: 1, name: 'Détection de l\'encodage', status: 'completed', time: '0.2s' },
    { id: 2, name: 'Analyse de la structure', status: 'completed', time: '0.5s' },
    { id: 3, name: 'Identification des valeurs manquantes', status: 'processing', time: '1.2s' },
    { id: 4, name: 'Détection des doublons', status: 'pending', time: '-' },
    { id: 5, name: 'Validation des types de données', status: 'pending', time: '-' },
    { id: 6, name: 'Nettoyage automatique', status: 'pending', time: '-' }
  ]);

  const files = [
    {
      id: 1,
      name: 'sales_data_2024.csv',
      rows: 15420,
      columns: 12,
      size: '2.3 MB',
      quality: 87,
      issues: ['Valeurs manquantes', 'Doublons']
    },
    {
      id: 2,
      name: 'customer_database.csv',
      rows: 8950,
      columns: 8,
      size: '1.8 MB',
      quality: 92,
      issues: ['Format de dates']
    },
    {
      id: 3,
      name: 'inventory_report.csv',
      rows: 3200,
      columns: 15,
      size: '890 KB',
      quality: 95,
      issues: ['Valeurs aberrantes']
    }
  ];

  const cleaningOptions = [
    {
      id: 'missing_values',
      name: 'Valeurs manquantes',
      description: 'Supprimer ou remplacer les valeurs manquantes',
      enabled: true,
      method: 'interpolation'
    },
    {
      id: 'duplicates',
      name: 'Doublons',
      description: 'Identifier et supprimer les lignes dupliquées',
      enabled: true,
      method: 'remove_all'
    },
    {
      id: 'outliers',
      name: 'Valeurs aberrantes',
      description: 'Détecter et traiter les valeurs atypiques',
      enabled: false,
      method: 'z_score'
    },
    {
      id: 'data_types',
      name: 'Types de données',
      description: 'Corriger et standardiser les types de colonnes',
      enabled: true,
      method: 'auto_detect'
    }
  ];

  return (
    <MainLayout currentPage="processing">
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Traitement des données</h1>
          <p className="mt-2 text-gray-600">Configurez et lancez le nettoyage de vos fichiers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Selection */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Fichiers disponibles</h2>
              
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedFile?.id === file.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{file.name}</h3>
                        <div className="mt-1 text-xs text-gray-500">
                          {file.rows.toLocaleString()} lignes • {file.columns} colonnes
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs font-medium">Qualité: {file.quality}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 ml-2">
                            <div 
                              className="bg-primary-600 h-1.5 rounded-full" 
                              style={{ width: `${file.quality}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {file.issues.map((issue, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning-100 text-warning-800">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Processing Configuration */}
          <div className="lg:col-span-2">
            {selectedFile ? (
              <div className="space-y-6">
                {/* File Details */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Configuration: {selectedFile.name}
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedFile.rows.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Lignes</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedFile.columns}</div>
                      <div className="text-sm text-gray-600">Colonnes</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedFile.size}</div>
                      <div className="text-sm text-gray-600">Taille</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedFile.quality}%</div>
                      <div className="text-sm text-gray-600">Qualité</div>
                    </div>
                  </div>

                  {/* Cleaning Options */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Options de nettoyage</h3>
                    
                    {cleaningOptions.map((option) => (
                      <div key={option.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={option.enabled}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                        </div>
                        
                        <select className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                          <option value={option.method}>Méthode par défaut</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button className="btn-secondary">
                      Aperçu
                    </button>
                    <button className="btn-primary">
                      Lancer le nettoyage
                    </button>
                  </div>
                </div>

                {/* Processing Steps */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Progression du traitement</h2>
                  
                  <div className="space-y-4">
                    {processingSteps.map((step) => (
                      <div key={step.id} className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'completed' 
                            ? 'bg-success-100 text-success-600'
                            : step.status === 'processing'
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.status === 'completed' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : step.status === 'processing' ? (
                            <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <span className="text-sm font-medium">{step.id}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{step.name}</div>
                          <div className="text-sm text-gray-500">Temps: {step.time}</div>
                        </div>
                        
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          step.status === 'completed' 
                            ? 'bg-success-100 text-success-800'
                            : step.status === 'processing'
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.status === 'completed' ? 'Terminé' : 
                           step.status === 'processing' ? 'En cours' : 'En attente'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun fichier sélectionné</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Sélectionnez un fichier dans la liste pour configurer le traitement
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Processing;