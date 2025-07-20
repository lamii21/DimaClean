import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    cleanedRecords: 0,
    savedTime: 0,
    accuracy: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with animation
    setTimeout(() => {
      setStats({
        totalFiles: 1247,
        cleanedRecords: 892456,
        savedTime: 156,
        accuracy: 98.7
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const MetricCard = ({ title, value, suffix, icon, gradient, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!isLoading) {
        const timer = setTimeout(() => {
          let start = 0;
          const end = parseInt(value);
          const duration = 2000;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setDisplayValue(end);
              clearInterval(counter);
            } else {
              setDisplayValue(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(counter);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [isLoading, value, delay]);

    return (
      <div className={`metric-card floating-element pulse-glow`} style={{ animationDelay: `${delay}ms` }}>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}>
            <span className="text-xl">{icon}</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                `${displayValue.toLocaleString()}${suffix}`
              )}
            </div>
            <p className="text-white/60 text-sm">{title}</p>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: isLoading ? '0%' : '100%',
              transitionDelay: `${delay}ms`
            }}
          ></div>
        </div>
      </div>
    );
  };

  const ActivityItem = ({ action, file, time, status }) => (
    <div className="flex items-center space-x-4 p-4 glass-card rounded-xl hover:bg-white/10 transition-all duration-300 group">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        status === 'completed' ? 'bg-green-500/20 text-green-400' :
        status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
        'bg-blue-500/20 text-blue-400'
      }`}>
        {status === 'completed' ? '✅' : status === 'processing' ? '⚡' : '📁'}
      </div>
      <div className="flex-1">
        <p className="font-medium text-white group-hover:text-gradient transition-all duration-300">{action}</p>
        <p className="text-sm text-white/60">{file}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-white/80">{time}</p>
        <div className={`inline-block px-2 py-1 rounded-full text-xs ${
          status === 'completed' ? 'bg-green-500/20 text-green-400' :
          status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {status}
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout currentPage="dashboard">
      <div className="space-y-8 p-8 relative">
        {/* Header with animated title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4 floating-element">
            Tableau de bord
          </h1>
          <p className="text-xl text-white/70">
            Vue d'ensemble de vos activités de nettoyage de données
          </p>
          <div className="mt-6">
            <button className="btn-primary mr-4">
              <span className="mr-2">🚀</span>
              Nouveau projet
            </button>
            <button className="btn-secondary">
              <span className="mr-2">📊</span>
              Voir les rapports
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Fichiers traités"
            value={stats.totalFiles}
            suffix=""
            icon="📁"
            gradient="from-blue-500 to-cyan-500"
            delay={0}
          />
          <MetricCard
            title="Enregistrements nettoyés"
            value={stats.cleanedRecords}
            suffix=""
            icon="🧹"
            gradient="from-purple-500 to-pink-500"
            delay={200}
          />
          <MetricCard
            title="Heures économisées"
            value={stats.savedTime}
            suffix="h"
            icon="⏰"
            gradient="from-yellow-500 to-orange-500"
            delay={400}
          />
          <MetricCard
            title="Précision"
            value={stats.accuracy}
            suffix="%"
            icon="🎯"
            gradient="from-green-500 to-emerald-500"
            delay={600}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gradient">Activité récente</h2>
                <button className="btn-secondary text-sm">Voir tout</button>
              </div>
              <div className="space-y-4">
                <ActivityItem
                  action="Nettoyage terminé"
                  file="sales_data_2024.csv"
                  time="Il y a 2 min"
                  status="completed"
                />
                <ActivityItem
                  action="Analyse en cours"
                  file="customer_database.csv"
                  time="Il y a 5 min"
                  status="processing"
                />
                <ActivityItem
                  action="Fichier uploadé"
                  file="inventory_report.csv"
                  time="Il y a 10 min"
                  status="uploaded"
                />
                <ActivityItem
                  action="Export terminé"
                  file="cleaned_transactions.csv"
                  time="Il y a 15 min"
                  status="completed"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gradient mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary text-left">
                  <span className="mr-3">📤</span>
                  Importer des données
                </button>
                <button className="w-full btn-secondary text-left">
                  <span className="mr-3">🔍</span>
                  Analyser la qualité
                </button>
                <button className="w-full btn-secondary text-left">
                  <span className="mr-3">📊</span>
                  Créer un rapport
                </button>
                <button className="w-full btn-secondary text-left">
                  <span className="mr-3">⚙️</span>
                  Configurer les règles
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gradient mb-4">Conseils du jour</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                  <p className="text-sm text-white/90">
                    💡 Utilisez les règles de validation automatique pour accélérer le nettoyage de vos données.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                  <p className="text-sm text-white/90">
                    🚀 Planifiez vos tâches de nettoyage pour traiter automatiquement vos fichiers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;


