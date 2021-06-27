import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user$: Observable<any>;
  user: any;
  sub: Subscription;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
    this.sub = this.afAuth.authState.subscribe((afUser) => (this.user = afUser));
  }

  signInWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  createUserWithEmail(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  passwordReset(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  // currentUser() {
  //   console.log(this.afAuth.currentUser);
  //   return this.afAuth.currentUser;
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
