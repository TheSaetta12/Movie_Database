import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user =  signal<string | null>(null);
  isLogged = computed(() => this._user() !== null);
  user = this._user.asReadonly();

  login(username: string) {
    this._user.set(username);
  }

  logout() {
    this._user.set(null);
  }
}
