import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly baseUrl = 'https://menu360-backend-production.up.railway.app';
  private isBrowser: boolean;

  constructor(
    protected httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  listaPedido(): Observable<Pedido[]> {
    if (!this.isBrowser) {
      return of([]);
    }

    const restauranteId = localStorage.getItem('restauranteId');
    const url = `${this.baseUrl}/pedido?id_restaurante=${restauranteId}`;
    return this.httpClient.get<Pedido[]>(url);
  }
}
