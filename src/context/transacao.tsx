export interface Transacao {
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
}
