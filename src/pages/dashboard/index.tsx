import { useState } from 'react';
import Despesas from '../../components/despesas/index';
import Receitas from '../../components/receitas/index';
import { useTransacoes } from '../../context/TransacoesContext';
import './styles.css';

const Dashboard = () => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [erro, setErro] = useState('');

    const { adicionarTransacao, total } = useTransacoes();

    const handleAdicionar = () => {
        if (!descricao || !tipo || !valor) {
            setErro('Todos os campos são obrigatórios!');
            return;
        }
        setErro('');
        const novaTransacao = { descricao, valor: parseFloat(valor), tipo: tipo as 'receita' | 'despesa' };
        adicionarTransacao(novaTransacao);
        setDescricao('');
        setValor('');
        setTipo('');
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="form">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="input-descricao"
                    />
                    <div className="radio-group">
                        <label><strong>Tipo da transação:</strong></label>
                        <label>
                            <input
                                type="radio"
                                value="receita"
                                checked={tipo === 'receita'}
                                onChange={() => setTipo('receita')}
                            />
                            Receita
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="despesa"
                                checked={tipo === 'despesa'}
                                onChange={() => setTipo('despesa')}
                            />
                            Despesa
                        </label>
                    </div>
                    <input
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="input-valor"
                    />
                </div>
                {erro && <p className="erro">{erro}</p>}
                <button className='dashboard-button' onClick={handleAdicionar}>Adicionar</button>
            </div>

            <div className="transacoes">
                <Receitas />
                <Despesas />
            </div>

            <div className="total">
                <h3>Total: R$ {total.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Dashboard;
