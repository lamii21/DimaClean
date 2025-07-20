import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/processing" element={
            <div className="min-h-screen relative">
              <div className="connection-lines"></div>
              <div className="p-8 text-white relative z-10">
                <h1 className="text-4xl font-bold text-gradient mb-4">Processing Page</h1>
                <p className="text-white/70">Coming Soon</p>
              </div>
            </div>
          } />
          <Route path="/visualization" element={
            <div className="min-h-screen relative">
              <div className="connection-lines"></div>
              <div className="p-8 text-white relative z-10">
                <h1 className="text-4xl font-bold text-gradient mb-4">Visualization Page</h1>
                <p className="text-white/70">Coming Soon</p>
              </div>
            </div>
          } />
          <Route path="/reports" element={
            <div className="min-h-screen relative">
              <div className="connection-lines"></div>
              <div className="p-8 text-white relative z-10">
                <h1 className="text-4xl font-bold text-gradient mb-4">Reports Page</h1>
                <p className="text-white/70">Coming Soon</p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

