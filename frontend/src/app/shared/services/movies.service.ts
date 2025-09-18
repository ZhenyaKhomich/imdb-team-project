import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type {TitlesDataType} from '../types/movies-response.type';
import { RequestsEnum } from '../enums/requests.enum';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  // private readonly baseUrl = 'https://api.imdbapi.dev/';

  public getTitles(
    queryParameters?: Record<string, string | number | string[]>
  ): Observable<TitlesDataType> {
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

    return this.http.get<TitlesDataType>(environment.baseUrl + RequestsEnum.TITLES, {
      params: parameters,
    });
    /* return this.http.get<Data>(environment.api + RequestsEnum.TITLES, {
      params: parameters,
    }); */
  }

  public searchTitles(word: string): Observable<TitlesDataType> {
    return this.http.get<TitlesDataType>(environment.baseUrl + RequestsEnum.SEARCH + word);
  }
}
