import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor(){
    const savedTheme = localStorage.getItem("theme");
    this.isDarkMode.set(savedTheme !== `light`);
  }

  toggle() {
    this.isDarkMode.update((prevValue: boolean) => {
      localStorage.setItem(`theme`, prevValue ? `light` : `dark`);
      return !prevValue;
    })
  }
}
