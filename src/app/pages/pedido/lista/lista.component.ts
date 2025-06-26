import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../service/pedido.service';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedido-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  Pedidos: Pedido[] = [];
  pedidosPendentes: Pedido[] = [];
  pedidosPreparando: Pedido[] = [];
  pedidosProntos: Pedido[] = [];
  pedidosConcluidos: Pedido[] = [];
  loading = false;
  error = '';

  constructor(private service: PedidoService) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.loading = true;
    this.error = '';
    
    this.service.listaPedido().subscribe({
      next: (data) => {
        this.Pedidos = data;
        this.organizarPedidosPorStatus();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar pedidos';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  organizarPedidosPorStatus(): void {
    this.pedidosPendentes = this.Pedidos.filter(p => p.status === 'pendente');
    this.pedidosPreparando = this.Pedidos.filter(p => p.status === 'preparando');
    this.pedidosProntos = this.Pedidos.filter(p => p.status === 'pronto');
    this.pedidosConcluidos = this.Pedidos.filter(p => p.status === 'entregue' || p.status === 'confirmado');
  }

  formatarHorario(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  formatarValor(valor: number): string {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pendente': return 'status-pendente';
      case 'preparando': return 'status-preparando';
      case 'pronto': return 'status-pronto';
      case 'entregue': return 'status-entregue';
      case 'cancelado': return 'status-cancelado';
      default: return 'status-default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'preparando': return 'Em Preparo';
      case 'pronto': return 'Pronto';
      case 'entregue': return 'Entregue';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  }

  marcarComoConcluido(pedido: Pedido): void {
    // Implementar quando tiver o método no service
    console.log('Marcar como concluído:', pedido._id);
    pedido.status = 'entregue';
    this.organizarPedidosPorStatus();
  }

  iniciarPreparo(pedido: Pedido): void {
    // Implementar quando tiver o método no service
    console.log('Iniciar preparo:', pedido._id);
    pedido.status = 'preparando';
    this.organizarPedidosPorStatus();
  }

  marcarComoPronto(pedido: Pedido): void {
    // Implementar quando tiver o método no service
    console.log('Marcar como pronto:', pedido._id);
    pedido.status = 'pronto';
    this.organizarPedidosPorStatus();
  }

  cancelarPedido(pedido: Pedido): void {
    if (confirm('Tem certeza que deseja cancelar este pedido?')) {
      // Implementar quando tiver o método no service
      console.log('Cancelar pedido:', pedido._id);
      this.carregarPedidos();
    }
  }

  obterNomesProdutos(pedido: Pedido): string {
    // Como só temos o ID do produto, vou simular por enquanto
    return pedido.itens.map(item => `Produto (${item.quantidade}x)`).join(', ');
  }

  formatarDataConclusao(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}