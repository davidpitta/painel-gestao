import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private isBrowser: boolean;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  listaProduto(): Observable<Produto[]> {
    let restauranteId = '';

    if (this.isBrowser) {
      restauranteId = localStorage.getItem('restauranteId') || '';
    }

    return this.httpClient.get<Produto[]>(`https://menu360-backend-production.up.railway.app/produto/listar?id_restaurante=${restauranteId}`);
  }

  criarProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>('https://menu360-backend-production.up.railway.app/produto/criar', produto);
  }
}
