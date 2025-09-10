import type {HttpInterceptorFn} from '@angular/common/http';
import {LocalStorageService} from '../services/local-storage.service';
import {inject} from '@angular/core';
import {tap} from 'rxjs';
import {Router} from '@angular/router';
import {AppRoutesEnum} from '../enums/app-router.enum';

export const authInterceptorFunction: HttpInterceptorFn = (request, next) => {
  const localStorageService = inject(LocalStorageService);
  const accessToken = localStorageService.getRefreshToken();
  const router = inject(Router);

  if(accessToken) {
    const newRequest = request.clone({
      setHeaders: {'x-auth': accessToken},
    })

    return next(newRequest).pipe(
      tap({
        error: () => {
          localStorageService.removeTokens();
          router.navigate(['/' + AppRoutesEnum.MAIN])
        }
      })
    );
  }
  return next(request);
}
