import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isLogged()){
    // Se l'utente non è loggato lo porto alla login
    router.navigateByUrl(`/login`);
    return false;
  }

  return true;
};
