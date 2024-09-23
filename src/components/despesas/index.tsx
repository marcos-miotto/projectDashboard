import { useState } from 'react';
import { useTransacoes } from '../../context/TransacoesContext';
import { Transacao } from '../../context/transacao'; // Importando a interface

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
        const transacaoAtualizada: Transacao = {
            descricao: descricaoEdit,
            valor: parseFloat(valorEdit),
            tipo: 'despesa', // Garantir o tipo 'despesa' aqui
        };
        editarTransacao(indiceReal, transacaoAtualizada);
        setEditando(null);
    };

    return (
        <div>
            <h2>Despesas</h2>
            <ul>
                {despesas.map((transacao, index) => (
                    <li key={index}>
                        {editando === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={descricaoEdit}
                                    onChange={(e) => setDescricaoEdit(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={valorEdit}
                                    onChange={(e) => setValorEdit(e.target.value)}
                                />
                                <button onClick={() => handleSalvarEdicao(index)}>Salvar</button>
                            </div>
                        ) : (
                            <>
                                {transacao.descricao} - R$ {transacao.valor}
                                <button onClick={() => handleEditar(index, transacao)}>Editar</button>
                                <button onClick={() => removerTransacao(getIndiceReal(index))}>Excluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Despesas;
