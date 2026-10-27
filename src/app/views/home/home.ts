import { Component, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, AsyncPipe, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  movieService = inject(MovieService);
  movies$ = this.movieService.loadPopular();
  router = inject(Router);

  constructor() {
    // this.movieService.loadPopular().subscribe({
    //   next: (risultatoChiamata) => {
    //     console.log(risultatoChiamata);
    //   },
    // });
  }

  openDetail(movieId: number){
    this.router.navigate(["/movie", movieId]);
   }
}
