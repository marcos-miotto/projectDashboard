import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Sobre from './pages/sobre';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
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
