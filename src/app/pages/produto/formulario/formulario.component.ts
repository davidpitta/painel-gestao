import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../models/produto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  produtoForm: FormGroup;
  idProduto: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
  private route: ActivatedRoute
  ) {
    this.produtoForm = this.fb.group({
      nome_produto: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      preco_atual: [0, [Validators.required, Validators.min(0.01)]],
      imagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.idProduto = this.route.snapshot.paramMap.get('id');

  if (this.idProduto) {
    this.produtoService.buscarProdutoPorId(this.idProduto).subscribe({
      next: (produto) => {
        this.produtoForm.patchValue(produto);
      },
      error: () => {
        alert('Erro ao carregar produto.');
        this.router.navigate(['/produto']);
      }
    });
  }
}

  onSubmit(): void {
  if (this.produtoForm.invalid) return;

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

  if (this.idProduto) {
    // Modo edição
    this.produtoService.atualizarProduto(this.idProduto, produto).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/cardapio']);
      },
      error: () => {
        alert('Erro ao atualizar produto.');
      }
    });
  } else {
    // Modo criação
    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.router.navigate(['/cardapio']);
      },
      error: () => {
        alert('Erro ao criar produto. Tente novamente.');
      }
    });
  }
}

formatarMoeda(valor: any): string {
  if (!valor && valor !== 0) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

onPrecoInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const valorDigitado = input.value.replace(/\D/g, ''); // remove tudo que não é número
  const valor = parseFloat(valorDigitado) / 100;

  this.produtoForm.get('preco_atual')?.setValue(valor, { emitEvent: false });

  input.value = this.formatarMoeda(valor);
}

permitirSomenteNumeros(event: KeyboardEvent): void {
  const charCode = event.key;

  // Permitir apenas números (0–9)
  if (!/^\d$/.test(charCode)) {
    event.preventDefault();
  }
}


  cancelar(): void {
    this.router.navigate(['/cardapio']);
  }
}