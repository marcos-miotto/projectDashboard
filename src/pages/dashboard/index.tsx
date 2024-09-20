import React, { useState } from 'react';
import './styles.css';

interface Transacao {
    descricao: string;
    valor: number;
    tipo: string;
}

const Dashboard = () => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [erro, setErro] = useState('');

    const handleAdicionar = () => {
        if (!descricao || !tipo || !valor) {
            setErro('Todos os campos são obrigatórios!');
            return;
        }
        setErro('');
        const novaTransacao: Transacao = { descricao, valor: parseFloat(valor), tipo };
        setTransacoes([...transacoes, novaTransacao]);
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
                <h2>Transações</h2>
                <ul>
                    {transacoes.map((transacao, index) => (
                        <li key={index}>
                            {transacao.descricao} - {transacao.tipo} - R$ {transacao.valor}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
