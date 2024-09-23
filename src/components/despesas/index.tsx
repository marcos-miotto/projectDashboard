import { useState } from 'react';
import { useTransacoes } from '../../context/TransacoesContext';
import { Transacao } from '../../context/transacao';

const Despesas = () => {
    const { transacoes, editarTransacao, removerTransacao } = useTransacoes();
    const [editando, setEditando] = useState<number | null>(null);
    const [descricaoEdit, setDescricaoEdit] = useState('');
    const [valorEdit, setValorEdit] = useState('');

    const despesas = transacoes.filter((transacao: Transacao) => transacao.tipo === 'despesa');

    const getIndiceReal = (despesaIndex: number) => {
        return transacoes.findIndex((transacao) => transacao === despesas[despesaIndex]);
    };

    const handleEditar = (index: number, transacao: Transacao) => {
        setEditando(index);
        setDescricaoEdit(transacao.descricao);
        setValorEdit(transacao.valor.toString());
    };

    const handleSalvarEdicao = (index: number) => {
        const indiceReal = getIndiceReal(index);
        const valorNumerico = parseFloat(valorEdit);

        if (valorNumerico < 0) {
            alert('O valor não pode ser negativo!');
            return;
        }
    
        const transacaoAtualizada: Transacao = {
            descricao: descricaoEdit,
            valor: valorNumerico,
            tipo: 'despesa',
        };
        editarTransacao(indiceReal, transacaoAtualizada);
        setEditando(null);
    };
    

    return (
        <div>
            <h2>Despesas</h2>
            <ul>
                {despesas.map((transacao, index) => (
                    <li key={index} className="transacao-item">
                        {editando === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={descricaoEdit}
                                    onChange={(e) => setDescricaoEdit(e.target.value)}
                                    className="descricao-edit"
                                />
                                <input
                                    type="number"
                                    value={valorEdit}
                                    onChange={(e) => setValorEdit(e.target.value)}
                                    className="valor-edit"
                                />
                                <button className="edit-button" onClick={() => handleSalvarEdicao(index)}>Salvar</button>
                            </div>
                        ) : (
                            <>
                                <span className="descricao">{transacao.descricao}</span>
                                <span className="valor">R$ {transacao.valor.toFixed(2)}</span>
                                <div className="botoes">
                                    <button className="edit-button" onClick={() => handleEditar(index, transacao)}>Editar</button>
                                    <button className="delete-button" onClick={() => removerTransacao(getIndiceReal(index))}>Excluir</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Despesas;
