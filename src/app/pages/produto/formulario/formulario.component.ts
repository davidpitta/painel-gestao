import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../models/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  produtoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome_produto: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      preco_atual: [0, [Validators.required, Validators.min(0.01)]],
      imagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
  if (this.produtoForm.valid) {
    const restauranteId = localStorage.getItem('restauranteId');

    const produto: Produto = {
      ...this.produtoForm.value,
      restaurante_id: restauranteId || '',
      historico_precos: [{
        preco: this.produtoForm.value.preco_atual,
        data_inicio: new Date(),
        data_fim: null
      }]
    };

    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.router.navigate(['/produto']);
      },
      error: (err) => {
        console.error('Erro ao criar produto:', err);
        alert('Erro ao criar produto. Tente novamente.');
      }
    });
  }
}


  cancelar(): void {
    this.router.navigate(['/produto']);
  }
}