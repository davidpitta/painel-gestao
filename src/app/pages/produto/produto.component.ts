import { Component } from '@angular/core';
import { ListaComponent } from "./lista/lista.component";

@Component({
  selector: 'app-produto',
  imports: [ListaComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {

}
