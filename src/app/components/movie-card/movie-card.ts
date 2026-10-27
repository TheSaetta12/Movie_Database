import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../core/types';
import { UserService } from '../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input() movieInput!: Movie;
  @Output() movieClicked = new EventEmitter<number>();

  movieClick(){
    this.movieClicked.emit(this.movieInput.id);
  }

  // Inietto il servizio per accedere allo stato globale
  protected userService = inject(UserService);
}
