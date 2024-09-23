import React, { createContext, useContext, useState } from 'react';
import { Transacao } from '../context/transacao'; // Ajuste o caminho conforme necessário

interface TransacoesContextData {
    transacoes: Transacao[];
    adicionarTransacao: (transacao: Transacao) => void;
    editarTransacao: (index: number, transacaoAtualizada: Transacao) => void;
    removerTransacao: (index: number) => void;
    total: number;
}

const TransacoesContext = createContext<TransacoesContextData | undefined>(undefined);

export const useTransacoes = () => {
    const context = useContext(TransacoesContext);
    if (!context) {
        throw new Error('useTransacoes deve ser usado dentro de um TransacoesProvider');
    }
    return context;
};

export const TransacoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    const adicionarTransacao = (transacao: Transacao) => {
        setTransacoes((prevTransacoes) => [...prevTransacoes, transacao]);
    };

    const editarTransacao = (index: number, transacaoAtualizada: Transacao) => {
        setTransacoes((prevTransacoes) =>
            prevTransacoes.map((transacao, i) => (i === index ? transacaoAtualizada : transacao))
        );
    };

    const removerTransacao = (index: number) => {
        setTransacoes((prevTransacoes) => prevTransacoes.filter((_, i) => i !== index));
    };

    const total = transacoes.reduce((acc, transacao) => {
        return transacao.tipo === 'receita' ? acc + transacao.valor : acc - transacao.valor;
    }, 0);

    return (
        <TransacoesContext.Provider value={{ transacoes, adicionarTransacao, editarTransacao, removerTransacao, total }}>
            {children}
        </TransacoesContext.Provider>
    );
};
