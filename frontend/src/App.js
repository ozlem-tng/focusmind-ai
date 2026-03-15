import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataEntry from './pages/DataEntry';
import History from './pages/History';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veri-girisi" element={<DataEntry />} />
          <Route path="/gecmis-kayitlar" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
