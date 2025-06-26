import { HistoricoPreco } from "./historico-preco";

export interface Produto {
  _id?: string; // ID opcional, útil para quando o MongoDB gerar o _id
  restaurante_id: string; // O ObjectId vem como string no frontend
  nome_produto: string;
  descricao: string;
  preco_atual: number;
  imagem: string;
  historico_precos: HistoricoPreco[];
}