import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

  loading = false;

  constructor(public authService: AuthService) { 
  }

  ngOnInit() {
    this.authService.listenLogin();

  }

  login() {
    this.loading = true;
    this.authService.login();
    
  }

}
