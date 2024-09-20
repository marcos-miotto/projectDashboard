import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

    const handleGoogleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <button className="buttonGoogle" onClick={handleGoogleLogin}>
                Login com Google!
            </button>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
