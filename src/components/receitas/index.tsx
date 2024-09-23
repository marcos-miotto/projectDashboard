import { useTransacoes } from '../../context/TransacoesContext';

const Receitas = () => {
    const { transacoes } = useTransacoes();

    const receitas = transacoes.filter(transacao => transacao.tipo === 'receita');

    return (
        <div>
            <h2>Receitas</h2>
            <ul>
                {receitas.map((transacao, index) => (
                    <li key={index}>
                        {transacao.descricao} - R$ {transacao.valor}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Receitas;
