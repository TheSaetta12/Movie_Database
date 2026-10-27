import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Movie, MovieList } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private key: string = "ac33b3271c2b40beab187c3a15681d30";
  private api: string = "https://api.themoviedb.org/3";

  constructor(private http: HttpClient){}

  // Operazioni CRUD (Create, Read, Update, Delete)
  // Create: POST
  // Read: GET
  // Update: PATCH
  // Delete: DELETE

  loadPopular() {
    return this.http.get<MovieList>(`${this.api}/movie/popular?api_key=${this.key}`);
  }

  /**
   * Funzione che recupera i dettagli di un film
   * @param id id del film da passare come paramentro all'API
  */
  
  getMovie(id: string) {
    return this.http.get<Movie>(`${this.api}/movie/${id}?api_key=${this.key}&append_to_response=credits`);
  }

  getTrailer(id: string){
    return this.http.get(`${this.api}/movie/${id}/videos?api_key=${this.key}`)
  }
}
