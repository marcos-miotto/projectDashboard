import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Sobre from './pages/sobre';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const App = () => {
  const location = useLocation();
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            </li>
            <li>
              <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
            </li>
            <li>
              <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''}>Sobre</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
