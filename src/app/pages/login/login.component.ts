import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: string;
  nome: string;
  email: string;
  restauranteId: string;
}

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor (private router: Router, protected service: LoginService) {}

  login() {
    window.location.href = 'https://menu360-backend-production.up.railway.app/auth/google';
  }
}
