import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../core/types';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../../core/services/movie.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-movie-detail',
  imports: [MatButtonModule, MatChipsModule, MatIconModule, DatePipe, MatDialogModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  movieService = inject(MovieService);
  // Recupero il film caricato dal resolver all'interno dei dati della route
  movie = this.route.snapshot.data[`movie`] as Movie
  // Iniezione del servizio utente per gestire lo stato del film
  userService = inject(UserService); 

  // Metodo per gestire il clic sul pulsante "Preferiti"
  toggleFavorite() {
    if (this.userService.isFavorite(this.movie.id)) {
      this.userService.removeFavorite(this.movie.id);
    } else {
      this.userService.addFavorite(this.movie);
    }
  }

  // Metodo per gestire il clic sul pulsante "Visti"
  toggleSeen() {
    if (this.userService.isSeen(this.movie.id)) {
      this.userService.removeSeen(this.movie.id);
    } else {
      this.userService.addSeen(this.movie);
    }
  }

  openTrailer(){
    this.movieService.getTrailer(this.movie.id.toString()).subscribe({
      next: (videos:any) => {
        const trailer = videos.results.find((video: any) => video.type === `Trailer`);

        if(!trailer) return; // Se non c'è trailer esce dalla funzione

        this.dialog.open(TrailerDialog, {
          data: `https://www.youtube.com/embed/${trailer.key}`
        })
      }
    })
  }
}

@Component({
  template: `
    <iframe width="800" height="400" frameborder="0"[src]="safeUrl" allowfullscreen></iframe>
  `
})
export class TrailerDialog {
  safeUrl: any;
  sanitizer = inject(DomSanitizer)

  constructor(@Inject(MAT_DIALOG_DATA) public url: string){
    // Andiamo a sanitizzare l'url ricevuto
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}