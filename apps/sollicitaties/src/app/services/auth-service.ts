import { inject, Injectable } from '@angular/core';
import { Auth, authState, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  readonly user$: Observable<User | null> = authState(this.auth);

  async signInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  
  async signOut() {
    return this.auth.signOut();
  }

  async signInWithEmail(email: string, password: string) {
    // Implement email/password sign-in logic here
  }

  async registerWithEmail(email: string, password: string) {
    // Implement email/password registration logic here
  }

  async sendPasswordResetEmail(email: string) {
    // Implement password reset email logic here
  } 

}