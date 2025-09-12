import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Data } from '../types/movies';
import { RequestsEnum } from '../enums/requests.enum';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.imdbapi.dev/';

  public getTitles(
    queryParameters?: Record<string, string | number | string[]>
  ): Observable<Data> {
    let parameters = new HttpParams();

    if (queryParameters) {
      Object.entries(queryParameters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(
            (v) => (parameters = parameters.append(key, String(v)))
          );
        } else {
          parameters = parameters.set(key, String(value));
        }
      });
    }

    return this.http.get<Data>(this.baseUrl + RequestsEnum.TITLES, {
      params: parameters,
    });
    /* return this.http.get<Data>(environment.api + RequestsEnum.TITLES, {
      params: parameters,
    }); */
  }
}
