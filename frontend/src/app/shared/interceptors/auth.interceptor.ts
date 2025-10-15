import type {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {LocalStorageService} from '../services/local-storage.service';
import {inject} from '@angular/core';
import {EMPTY, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AppRoutesEnum} from '../enums/app-router.enum';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

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
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('ошибка в интерcепторe 401')
          localStorageService.removeTokens();
          router.navigate(['/' + AppRoutesEnum.MAIN])
        }
        if (error.status === 400 && error.error?.message === 'Title уже есть в просмотренных') {
          console.warn('Title уже есть в просмотренных');
          return EMPTY;
        }
        return throwError(() => error);
      })
    );
  }
  return next(request);
}
