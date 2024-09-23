import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import { TransacoesProvider } from './context/TransacoesContext';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Sobre from './pages/sobre';

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}

function App() {
  return (
    <TransacoesProvider>
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
    </TransacoesProvider>
  );
}

export default App;
