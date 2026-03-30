import React from 'react';

import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DataEntry from './pages/DataEntry';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';


function App() {
  const isLoggedIn = !!localStorage.getItem('user_id');

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = '/giris';
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-title">FocusMind AI</div>

        <div className="navbar-links">
          <NavLink to="/" className="nav-link">
            Ana Sayfa
          </NavLink>

          <NavLink to="/veri-girisi" className="nav-link">
            Veri Girişi
          </NavLink>

          <NavLink to="/gecmis-kayitlar" className="nav-link">
            Geçmiş Kayıtlar
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/giris" className="nav-link">
                Giriş Yap
              </NavLink>

              <NavLink to="/kayit-ol" className="nav-link">
                Kayıt Ol
              </NavLink>
            </>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              Çıkış Yap
            </button>
          )}
        </div>
      </nav>

      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/giris" />}
          />
          <Route path="/veri-girisi" element={<DataEntry />} />
          <Route path="/gecmis-kayitlar" element={<History />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit-ol" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
