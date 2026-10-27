import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserProfile } from '../../core/types';
import { UserService } from '../../core/services/user.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule, MatChipsModule,
    MatSelectModule, MatIconModule, MatCardModule, FormsModule, ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  // Iniettiamo il servizio utente che contiene i Signals favorites e seenMovies
  public userService = inject(UserService);

  // --- LOGICA PROFILO (Dati utente) ---
  profileDraft: UserProfile = { ...this.userService.profile() };
  profileSaved: boolean = false;

  saveProfile(form: NgForm) {
    if (form.invalid) return;
    this.userService.updateProfile({ ...this.profileDraft });
    this.profileSaved = true;
    setTimeout(() => {
      this.profileSaved = false;
    }, 3000);
  }

  resetForm(form: NgForm) {
    this.profileDraft = { ...this.userService.profile() };
    form.resetForm(this.profileDraft);
  }

  // --- LOGICA PREFERENZE (Reactive Form) ---
  private fb = inject(FormBuilder);

  prefsForm = this.fb.group({
    minRating: [6, [Validators.required, Validators.min(0), Validators.max(10)]],
    language: [`it`, Validators.required],
    genres: [[] as string[]]
  });

  availableGenres: string[] = [
    `Azione`, `Commedia`, `Dramma`, `Horror`, `Sci-Fi`, `Thriller`, `Animazione`, `Documentario`
  ];

  savePrefs() {
    if (this.prefsForm.invalid) return;
    localStorage.setItem(`prefs`, JSON.stringify(this.prefsForm.value));
  }

  toggleGenre(genre: string) {
    const current: string[] = (this.prefsForm.get(`genres`)?.value as string[]) ?? [];
    const updated = current.includes(genre) ?
      current.filter(g => g !== genre) :
      [...current, genre];

    this.prefsForm.patchValue({ genres: updated });
  }

  isGenreSelected(genre: string): boolean {
    return (this.prefsForm.get(`genres`)?.value as string[])?.includes(genre) ?? false;
  }

  // Nota: Le funzioni di rimozione dei film non sono necessarie qui 
  // perché verranno richiamate direttamente dal template usando userService.removeFavorite(id) 
  // e userService.removeSeen(id), sfruttando la logica .update() del servizio.
}