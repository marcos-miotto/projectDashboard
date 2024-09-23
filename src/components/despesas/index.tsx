import { useTransacoes } from '../../context/TransacoesContext';

const Despesas = () => {
    const { transacoes } = useTransacoes();

    const despesas = transacoes.filter(transacao => transacao.tipo === 'despesa');

    return (
        <div>
            <h2>Despesas</h2>
            <ul>
                {despesas.map((transacao, index) => (
                    <li key={index}>
                        {transacao.descricao} - R$ {transacao.valor}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Despesas;
