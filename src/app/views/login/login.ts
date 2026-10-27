import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);
  username = ``;

  login() {
    if(!this.username) return;
    // Se l'utente invece ha inserito l'username richiamo authservice per salvarlo sullo stato
    this.auth.login(this.username);
    // Una volta salvato, navigo sul profilo
    this.router.navigate([`/profile`]);
  }
}
