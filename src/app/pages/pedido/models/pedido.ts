import { ItemPedido } from "./Item-pedido";

export interface Pedido {
  _id: string;
  id_restaurante: string;
  mesa: number;
  itens: ItemPedido[];
  valor_total: number;
  status: 'pendente' | 'confirmado' | 'preparando' | 'pronto' | 'entregue' | 'cancelado';
  data_criacao: string;
  data_atualizacao: string;
  __v: number;
}