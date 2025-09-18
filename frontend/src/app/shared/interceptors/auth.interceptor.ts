import type {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {LocalStorageService} from '../services/local-storage.service';
import {inject} from '@angular/core';
import {tap} from 'rxjs';
import {Router} from '@angular/router';
import {AppRoutesEnum} from '../enums/app-router.enum';
import {environment} from '../../../environments/environment';

export const authInterceptorFunction: HttpInterceptorFn = (request, next) => {
  const localStorageService = inject(LocalStorageService);
  const accessToken = localStorageService.getRefreshToken();
  const router = inject(Router);

  const myRequest = request.url.startsWith(environment.api);

  if (accessToken && myRequest) {
    const newRequest = request.clone({
      setHeaders: {'x-auth': accessToken},
    })

    return next(newRequest).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          console.log('ошибка в интерcепторe');
          console.log(error);
          if (error.status === 401) {
            console.log('ошибка в интерcепторe 401')
            localStorageService.removeTokens();
            router.navigate(['/' + AppRoutesEnum.MAIN])
          }
        }
      })
    );
  }
  return next(request);
}
