import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkWithHref
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  theme = inject(ThemeService);

  constructor(){
    effect(() => {
      // Applicare la classe dark o light al cambio del signal isDarkMode presente in theme.service.ts
      document.body.classList.toggle(`dark-theme`, this.theme.isDarkMode());
      document.body.classList.toggle(`light-theme`,!this.theme.isDarkMode());
    })
  }
}
