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
    this.service.listaProduto().subscribe((data) => {
      this.products = data;
    });
  }

  navegarParaCriarProduto(): void {
    this.router.navigate(['/produto/criar']);
  }
}
