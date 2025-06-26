import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Redirecionando...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.route.snapshot.queryParamMap.get('token');

      if (token) {
        const payload = jwtDecode<{ restauranteId: string }>(token);
        console.log('Payload:', payload);
        localStorage.setItem('token', token);
        localStorage.setItem('restauranteId', payload.restauranteId);
        this.router.navigate(['/pedido']);
      }
    }
  }
}
