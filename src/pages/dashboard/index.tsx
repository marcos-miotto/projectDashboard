import { useState } from 'react';
import Despesas from '../../components/despesas/index';
import Receitas from '../../components/receitas/index';
import { Transacao } from '../../context/transacao';
import { useTransacoes } from '../../context/TransacoesContext';
import './styles.css';

const Dashboard = () => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [erro, setErro] = useState('');

    const { transacoes, adicionarTransacao } = useTransacoes();

    const handleAdicionar = () => {
        const valorNumerico = parseFloat(valor);

        if (!descricao || !tipo || !valor) {
            setErro('Todos os campos são obrigatórios!');
            return;
        }

        if (valorNumerico <= 0) {
            setErro('O valor deve ser maior que zero!');
            return;
        }

        if (descricao.length > 50) {
            setErro('A descrição deve ter no máximo 50 caracteres!');
            return;
        }

        setErro('');

        const novaTransacao: Transacao = { descricao, valor: valorNumerico, tipo: tipo as 'receita' | 'despesa' };

        adicionarTransacao(novaTransacao);
        setDescricao('');
        setValor('');
        setTipo('');
    };

    // Calculando os totais de receitas e despesas
    const totalReceitas = transacoes
        .filter(transacao => transacao.tipo === 'receita')
        .reduce((acc, transacao) => acc + transacao.valor, 0);

    const totalDespesas = transacoes
        .filter(transacao => transacao.tipo === 'despesa')
        .reduce((acc, transacao) => acc + transacao.valor, 0);

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
                        maxLength={50}
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

            <div className="transacoes-container">
                <div className="transacoes-col">
                    <Receitas />
                    <h3>Total de Receitas: R$ {totalReceitas.toFixed(2)}</h3>
                </div>
                <div className="transacoes-col">
                    <Despesas />
                    <h3>Total de Despesas: R$ {totalDespesas.toFixed(2)}</h3>
                </div>
            </div>

            <div className="total">
                <h3>Total Geral: R$ {(totalReceitas - totalDespesas).toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Dashboard;
