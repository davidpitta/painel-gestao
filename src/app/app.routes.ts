import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { AuthCallbackComponent } from './components/auth-callback.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },

  // rotas protegidas
  { path: 'pedido', component: PedidoComponent, canActivate: [AuthGuard] },
  { path: 'cardapio', component: ProdutoComponent, canActivate: [AuthGuard] },
  {
    path: 'produto/criar',
    loadComponent: () => import('./pages/produto/formulario/formulario.component').then(m => m.FormularioComponent),
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: 'pedido', pathMatch: 'full' }
];
