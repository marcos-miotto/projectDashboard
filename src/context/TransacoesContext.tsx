import React, { createContext, useContext, useState } from 'react';

interface Transacao {
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
}

interface TransacoesContextData {
    transacoes: Transacao[];
    adicionarTransacao: (transacao: Transacao) => void;
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

    const total = transacoes.reduce((acc, transacao) => {
        return transacao.tipo === 'receita' ? acc + transacao.valor : acc - transacao.valor;
    }, 0);

    return (
        <TransacoesContext.Provider value={{ transacoes, adicionarTransacao, total }}>
            {children}
        </TransacoesContext.Provider>
    );
};
