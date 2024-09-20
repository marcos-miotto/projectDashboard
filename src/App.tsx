import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Sobre from './pages/sobre';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Navbar from './components/navbar';

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}

function App() {
  
  return (
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<RedirectToLogin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
