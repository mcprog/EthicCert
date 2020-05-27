import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  checkLogin(oldUrl: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.authService.oldUrl = oldUrl;

    this.kickout();

    return false;
  }

  kickout() {
    this.router.navigate(['/login']);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }
  
}
