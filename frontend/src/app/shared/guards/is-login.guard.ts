import {Router} from '@angular/router';
import type {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {AppRoutesEnum} from '../enums/app-router.enum';
import {LocalStorageService} from '../services/local-storage.service';

export const isLoginGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const accessToken = localStorageService.getAccessToken();

  if(accessToken) {
    router.navigate(['/' + AppRoutesEnum.MAIN])
    return false;
  }

  return true;
};
