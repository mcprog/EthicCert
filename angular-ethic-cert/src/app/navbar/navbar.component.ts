import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuardGuard } from '../auth-guard.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  
  loggedIn: boolean = false;
  user: firebase.User = null;

  constructor(private authService: AuthService, private authGuard: AuthGuardGuard) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  getUserName(): string {
    if (this.authService.isLoggedIn) {
      return this.authService.getUserName();
    } else {
      return "Unknown";
    }
  }

  logout() {
    this.authService.reset();
    this.authGuard.kickout();
  }

}
