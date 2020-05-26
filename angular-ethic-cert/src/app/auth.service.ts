import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User = null;
  public oldUrl: string;

  constructor(private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router) {
  }

  listenLogin() {
    this.afAuth.auth.getRedirectResult().then(result => this.ngZone.run(() => {
      if (result.user) {
         this.user = result.user;
         console.log(this.user.displayName);
         this.router.navigate(['/products']);
         console.log(this.user.displayName);
      }
   }));

  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  getUser(): User {
    return this.user;
  }

  getUserName(): string {
    return this.user.displayName;
  }

  logout() {
    this.afAuth.auth.signOut().then((res) => this.ngZone.run(() => { this.router.navigate(['/'])}));
  }

  login() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }
}
