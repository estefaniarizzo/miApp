import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Asegúrate de usar compat
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('user', JSON.stringify(user.user?.email));
      this.router.navigate(['/home']);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}