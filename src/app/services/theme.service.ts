import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const savedTheme = await this._storage.get('darkMode');
    if (savedTheme !== null) {
      this.darkMode.next(savedTheme);
      this.applyTheme(savedTheme);
    } else {
      // Verificar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode.next(prefersDark);
      await this._storage.set('darkMode', prefersDark);
      this.applyTheme(prefersDark);
    }
  }

  toggleTheme() {
    const newTheme = !this.darkMode.value;
    this.darkMode.next(newTheme);
    this.applyTheme(newTheme);
    this._storage?.set('darkMode', newTheme);
  }

  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }

  isDarkMode() {
    return this.darkMode.asObservable();
  }
} 