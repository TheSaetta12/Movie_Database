import { Injectable, signal } from '@angular/core';
import { Movie, UserProfile } from '../types';

const PROFILE_KEY = `UserProfile`
const FAVORITES_KEY = `FavoriteMovies`;
const SEEN_KEY = `SeenMovies`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  profile = signal<UserProfile>(this.loadFromStorage(PROFILE_KEY, {
    name : `Utente text`,
    bio: `Biografia`,
    avatarUrl: ``
  }))

  updateProfile(updateProfile: UserProfile){
    this.profile.set(updateProfile); // Aggiornamento dello stato dell'app
    this.saveToStorage(PROFILE_KEY, updateProfile) // Salvataggio sullo storage
  }

  private saveToStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private loadFromStorage<T>(key: string, fallback: T){
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  }

  // Nuovi Signals per la gestione dei film
  favorites = signal<Movie[]>(this.loadFromStorage(FAVORITES_KEY, []));
  seenMovies = signal<Movie[]>(this.loadFromStorage(SEEN_KEY, []));

  // --- GESTIONE PREFERITI ---

  isFavorite(movieId: number): boolean {
    // Verifica se il film è presente nella lista dei preferiti
    return this.favorites().some(m => m.id === movieId);
  }

  addFavorite(movie: Movie) {
    // Aggiunge un film usando lo spread operator
    this.favorites.update(list => [...list, movie]);
    this.saveToStorage(FAVORITES_KEY, this.favorites());
  }

  removeFavorite(movieId: number) {
    // Rimuove un film filtrando per ID
    this.favorites.update(list => list.filter(m => m.id !== movieId));
    this.saveToStorage(FAVORITES_KEY, this.favorites());
  }

  // --- GESTIONE FILM VISTI ---

  isSeen(movieId: number): boolean {
    // Verifica se il film è presente nella lista dei visti
    return this.seenMovies().some(m => m.id === movieId);
  }

  addSeen(movie: Movie) {
    // Aggiunge un film alla lista dei visti
    this.seenMovies.update(list => [...list, movie]);
    this.saveToStorage(SEEN_KEY, this.seenMovies());
  }

  removeSeen(movieId: number) {
    // Rimuove un film dalla lista dei visti
    this.seenMovies.update(list => list.filter(m => m.id !== movieId));
    this.saveToStorage(SEEN_KEY, this.seenMovies());
  }
}
