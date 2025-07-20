import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reports = [
    {
      id: 1,
      name: 'Rapport mensuel - Janvier 2024',
      type: 'Mensuel',
      date: '2024-01-31',
      size: '2.3 MB',
      status: 'Généré',
      downloads: 12
    },
    {
      id: 2,
      name: 'Analyse qualité - Semaine 4',
      type: 'Hebdomadaire',
      date: '2024-01-28',
      size: '890 KB',
      status: 'Généré',
      downloads: 8
    },
    {
      id: 3,
      name: 'Rapport personnalisé - Ventes',
      type: 'Personnalisé',
      date: '2024-01-25',
      size: '1.5 MB',
      status: 'En cours',
      downloads: 0
    }
  ];

  const reportTemplates = [
    {
      id: 'quality-summary',
      name: 'Résumé qualité',
      description: 'Vue d\'ensemble de la qualité des données traitées',
      icon: '📊',
      sections: ['Métriques générales', 'Tendances', 'Problèmes identifiés']
    },
    {
      id: 'processing-performance',
      name: 'Performance de traitement',
      description: 'Analyse des temps de traitement et optimisations',
      icon: '⚡',
      sections: ['Temps de traitement', 'Ressources utilisées', 'Recommandations']
    },
    {
      id: 'data-insights',
      name: 'Insights des données',
      description: 'Analyse approfondie des patterns et anomalies',
      icon: '🔍',
      sections: ['Patterns détectés', 'Anomalies', 'Suggestions d\'amélioration']
    },
    {
      id: 'compliance-audit',
      name: 'Audit de conformité',
      description: 'Vérification de la conformité aux standards de données',
      icon: '✅',
      sections: ['Standards respectés', 'Non-conformités', 'Actions correctives']
    }
  ];

  const quickStats = [
    { label: 'Rapports générés', value: '47', change: '+12%', color: 'primary' },
    { label: 'Téléchargements', value: '156', change: '+8%', color: 'success' },
    { label: 'Temps moyen génération', value: '3.2s', change: '-15%', color: 'warning' },
    { label: 'Taille moyenne', value: '1.8MB', change: '+5%', color: 'secondary' }
  ];

  return (
    <MainLayout currentPage="reports">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rapports et analyses</h1>
            <p className="mt-2 text-gray-600">Générez et consultez vos rapports de traitement de données</p>
          </div>
          
          <button className="btn-primary">
            Nouveau rapport
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className={`text-3xl font-bold mb-2 ${
                stat.color === 'primary' ? 'text-primary-600' :
                stat.color === 'success' ? 'text-success-600' :
                stat.color === 'warning' ? 'text-warning-600' :
                'text-secondary-600'
              }`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-900">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.change} ce mois</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Generator */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Générateur de rapports</h2>
              
              {/* Report Templates */}
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-gray-900">Modèles de rapports</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportTemplates.map((template) => (
                    <div key={template.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{template.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                          <div className="mt-2">
                            <div className="text-xs text-gray-500">Sections incluses:</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.sections.map((section, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {section}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Configuration du rapport</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Période
                    </label>
                    <select 
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="input-field"
                    >
                      <option value="week">Cette semaine</option>
                      <option value="month">Ce mois</option>
                      <option value="quarter">Ce trimestre</option>
                      <option value="year">Cette année</option>
                      <option value="custom">Période personnalisée</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <select 
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="input-field"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                      <option value="html">HTML</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fichiers à inclure
                  </label>
                  <div className="space-y-2">
                    {['sales_data_2024.csv', 'customer_database.csv', 'inventory_report.csv'].map((file) => (
                      <label key={file} className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">{file}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="btn-secondary">
                    Aperçu
                  </button>
                  <button className="btn-primary">
                    Générer rapport
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Rapports récents</h2>
              
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{report.name}</h3>
                        <div className="mt-1 text-xs text-gray-500">
                          {report.type} • {report.date}
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>{report.size}</span>
                          <span>{report.downloads} téléchargements</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          report.status === 'Généré' 
                            ? 'bg-success-100 text-success-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {report.status}
                        </span>
                        
                        {report.status === 'Généré' && (
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm">
                Voir tous les rapports
              </button>
            </div>

            {/* Scheduled Reports */}
            <div className="card mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Rapports programmés</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                  <div>
                    <div className="font-medium text-primary-900 text-sm">Rapport hebdomadaire</div>
                    <div className="text-xs text-primary-700">Chaque lundi à 9h00</div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Rapport mensuel</div>
                    <div className="text-xs text-gray-500">Le 1er de chaque mois</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <button className="w-full mt-4 btn-secondary text-sm">
                Programmer nouveau rapport
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;