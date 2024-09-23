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
            <button className="button-google" onClick={handleGoogleLogin}>
                Login com Google
            </button>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <input type="email" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Senha" className="input-field" />
            </form>
            <button type="submit" className="button-submit" onClick={handleGoogleLogin}>Entrar</button>
        </div>
    );
};

export default Login;
