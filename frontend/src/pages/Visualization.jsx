import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Visualization = () => {
  const [selectedChart, setSelectedChart] = useState('quality-trend');
  const [selectedFile, setSelectedFile] = useState('sales_data_2024.csv');

  const qualityTrendData = [
    { month: 'Jan', quality: 85, files: 12 },
    { month: 'Fév', quality: 88, files: 15 },
    { month: 'Mar', quality: 92, files: 18 },
    { month: 'Avr', quality: 89, files: 22 },
    { month: 'Mai', quality: 94, files: 25 },
    { month: 'Jun', quality: 96, files: 28 }
  ];

  const issuesData = [
    { name: 'Valeurs manquantes', value: 35, color: '#ef4444' },
    { name: 'Doublons', value: 25, color: '#f59e0b' },
    { name: 'Format incorrect', value: 20, color: '#3b82f6' },
    { name: 'Valeurs aberrantes', value: 15, color: '#10b981' },
    { name: 'Autres', value: 5, color: '#6b7280' }
  ];

  const processingTimeData = [
    { file: 'sales_data.csv', time: 2.3, size: 2.1 },
    { file: 'customers.csv', time: 1.8, size: 1.5 },
    { file: 'inventory.csv', time: 0.9, size: 0.8 },
    { file: 'orders.csv', time: 3.2, size: 2.8 },
    { file: 'products.csv', time: 1.2, size: 1.0 }
  ];

  const dataQualityMetrics = [
    { metric: 'Complétude', before: 78, after: 95 },
    { metric: 'Cohérence', before: 82, after: 98 },
    { metric: 'Validité', before: 85, after: 97 },
    { metric: 'Unicité', before: 88, after: 99 }
  ];

  const chartTypes = [
    { id: 'quality-trend', name: 'Évolution qualité', icon: '📈' },
    { id: 'issues-distribution', name: 'Répartition des problèmes', icon: '🥧' },
    { id: 'processing-time', name: 'Temps de traitement', icon: '⏱️' },
    { id: 'quality-metrics', name: 'Métriques qualité', icon: '📊' }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'quality-trend':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={qualityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="quality" stroke="#0284c7" strokeWidth={3} name="Score qualité (%)" />
              <Line type="monotone" dataKey="files" stroke="#10b981" strokeWidth={2} name="Nombre de fichiers" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'issues-distribution':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={issuesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {issuesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'processing-time':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processingTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="file" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="#0284c7" name="Temps (secondes)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'quality-metrics':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataQualityMetrics} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="metric" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="before" fill="#ef4444" name="Avant nettoyage" />
              <Bar dataKey="after" fill="#10b981" name="Après nettoyage" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <MainLayout currentPage="visualization">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visualisation des données</h1>
            <p className="mt-2 text-gray-600">Analysez vos données avec des graphiques interactifs</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="input-field w-64"
            >
              <option value="sales_data_2024.csv">sales_data_2024.csv</option>
              <option value="customer_database.csv">customer_database.csv</option>
              <option value="inventory_report.csv">inventory_report.csv</option>
            </select>
            
            <button className="btn-primary">
              Exporter graphiques
            </button>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartTypes.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setSelectedChart(chart.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedChart === chart.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{chart.icon}</div>
              <div className="font-medium text-sm">{chart.name}</div>
            </button>
          ))}
        </div>

        {/* Main Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {chartTypes.find(c => c.id === selectedChart)?.name}
            </h2>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          
          {renderChart()}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">94.2%</div>
            <div className="text-sm font-medium text-gray-900">Score qualité moyen</div>
            <div className="text-xs text-gray-500 mt-1">+2.1% ce mois</div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">1.2M</div>
            <div className="text-sm font-medium text-gray-900">Lignes traitées</div>
            <div className="text-xs text-gray-500 mt-1">+15% ce mois</div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-warning-600 mb-2">2.3s</div>
            <div className="text-sm font-medium text-gray-900">Temps moyen</div>
            <div className="text-xs text-gray-500 mt-1">-0.5s ce mois</div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-error-600 mb-2">156</div>
            <div className="text-sm font-medium text-gray-900">Problèmes résolus</div>
            <div className="text-xs text-gray-500 mt-1">+8% ce mois</div>
          </div>
        </div>

        {/* Data Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights automatiques</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg">
                <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-success-900">Amélioration significative</div>
                  <div className="text-sm text-success-700">
                    La qualité des données a augmenté de 12% ce mois grâce aux nouveaux algorithmes
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-warning-50 rounded-lg">
                <div className="w-6 h-6 bg-warning-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-warning-900">Attention requise</div>
                  <div className="text-sm text-warning-700">
                    Les fichiers de plus de 10MB prennent 40% plus de temps à traiter
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-primary-900">Recommandation</div>
                  <div className="text-sm text-primary-700">
                    Activez la détection automatique des valeurs aberrantes pour améliorer la qualité
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des traitements</h3>
            
            <div className="space-y-3">
              {[
                { file: 'sales_data_2024.csv', time: '14:32', quality: 96, status: 'success' },
                { file: 'customer_db.csv', time: '13:45', quality: 89, status: 'success' },
                { file: 'inventory.csv', time: '12:18', quality: 92, status: 'success' },
                { file: 'orders_jan.csv', time: '11:30', quality: 87, status: 'warning' },
                { file: 'products.csv', time: '10:15', quality: 94, status: 'success' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'success' ? 'bg-success-500' : 'bg-warning-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.file}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{item.quality}%</div>
                    <div className="text-xs text-gray-500">qualité</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Visualization;