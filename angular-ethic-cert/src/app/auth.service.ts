import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User = null;
  public oldUrl: string;
  public inDatabase = false;

  constructor(private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router, private firestore: AngularFirestore) {
  }

  reset() {
    this.logout();
    this.inDatabase = false;
    this.user = null;
  }

  listenLogin() {
    this.afAuth.auth.getRedirectResult().then(result => this.ngZone.run(async () => {
      if (result.user) {
        this.user = result.user;
        
        var docRef = this.firestore.collection('users').doc(this.user.email).ref;
        var b: boolean;
        await docRef.get().then(function(doc) {
          b = doc.exists;
          console.log("b inside" + b);
        });
        console.log("b after" + b);
        this.router.navigate(['/products']);
        this.inDatabase = b;
      }
   }));

  }


  isLoggedIn(): boolean {
    return this.user != null && this.inDatabase;
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
