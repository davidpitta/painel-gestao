import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly baseUrl = 'https://menu360-backend-production.up.railway.app';

  constructor(protected httpClient: HttpClient) { }

  listaPedido(): Observable<Pedido[]> {
    const restauranteId = localStorage.getItem('restauranteId');
    const url = `${this.baseUrl}/pedido?id_restaurante=${restauranteId}`;
    return this.httpClient.get<Pedido[]>(url);
  }
}
