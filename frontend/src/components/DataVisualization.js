import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

// Enregistrer les composants Chart.js
Chart.register(...registerables);

const DataVisualization = ({ datasetId }) => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [columns, setColumns] = useState([]);
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');
  
  useEffect(() => {
    if (datasetId) {
      fetchDatasetColumns();
    }
  }, [datasetId]);
  
  const fetchDatasetColumns = async () => {
    try {
      const response = await axios.get(`/api/datasets/${datasetId}/columns/`);
      setColumns(response.data.columns);
      if (response.data.columns.length > 0) {
        setSelectedXAxis(response.data.columns[0]);
        setSelectedYAxis(response.data.columns.length > 1 ? response.data.columns[1] : response.data.columns[0]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des colonnes:', error);
    }
  };
  
  const generateChart = async () => {
    try {
      const response = await axios.get(`/api/datasets/${datasetId}/chart-data/`, {
        params: { x_axis: selectedXAxis, y_axis: selectedYAxis }
      });
      
      setChartData({
        labels: response.data.labels,
        datasets: [{
          label: `${selectedYAxis} par ${selectedXAxis}`,
          data: response.data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      });
    } catch (error) {
      console.error('Erreur lors de la génération du graphique:', error);
    }
  };
  
  const renderChart = () => {
    if (!chartData) return <div>Sélectionnez les axes et générez un graphique</div>;
    
    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: `${selectedYAxis} par ${selectedXAxis}` }
      }
    };
    
    switch (chartType) {
      case 'bar': return <Bar data={chartData} options={options} />;
      case 'line': return <Line data={chartData} options={options} />;
      case 'pie': return <Pie data={chartData} options={options} />;
      default: return <Bar data={chartData} options={options} />;
    }
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Visualisation des Données</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Axe X</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedXAxis}
            onChange={(e) => setSelectedXAxis(e.target.value)}
          >
            {columns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Axe Y</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedYAxis}
            onChange={(e) => setSelectedYAxis(e.target.value)}
          >
            {columns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Type de Graphique</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Histogramme</option>
            <option value="line">Courbe</option>
            <option value="pie">Camembert</option>
          </select>
        </div>
      </div>
      
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={generateChart}
      >
        Générer le Graphique
      </button>
      
      <div className="h-80">
        {renderChart()}
      </div>
    </div>
  );
};

export default DataVisualization;