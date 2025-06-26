import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../models/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true, // Se estiver usando standalone component
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  products: Produto[] = [];

  constructor(
    private service: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  navegarParaCriarProduto(): void {
    this.router.navigate(['/produto/criar']);
  }

  editarProduto(produto: Produto) {
    console.log(produto)
  }

  carregarProdutos(): void {
    this.service.listaProduto().subscribe({
      next: (produtos) => this.products = produtos,
      error: () => alert('Erro ao carregar produtos.')
    });
  }

  excluirProduto(produto: any): void {
    const confirmar = confirm(`Deseja realmente excluir o produto "${produto.nome_produto}"?`);
    if (!confirmar) return;

    this.service.excluirProduto(produto._id).subscribe({
      next: () => {
        alert('Produto excluído com sucesso!');
        this.carregarProdutos();
      },
      error: () => alert('Erro ao excluir produto.')
    });
  }
}
