import type { HttpInterceptorFn } from '@angular/common/http';
import { throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const youtubeInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error) => {
      if (
        error.url?.includes('youtube.com') ||
        error.url?.includes('googleads.g.doubleclick.net') ||
        error.url?.includes('youtubei/v1/log_event')
      ) {
        return EMPTY;
      }
      return throwError(() => error);
    })
  );
};
