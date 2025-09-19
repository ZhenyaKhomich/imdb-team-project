import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {tap} from 'rxjs';
import type {Observable} from 'rxjs';
import type {TitlesDataType} from '../types/movies-response.type';
import { RequestsEnum } from '../enums/requests.enum';
import {environment} from '../../../environments/environment';
import type {TrailerDataType} from '../types/trailer-data.type';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private snakeBar = inject(MatSnackBar);

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
    })
  }

  public searchTitles(word: string): Observable<TitlesDataType> {
    return this.http.get<TitlesDataType>(environment.baseUrl + RequestsEnum.SEARCH + word);
  }

  public getTrailer(id: string): Observable<TrailerDataType> {
    return this.http.get<TrailerDataType>(environment.baseUrl + RequestsEnum.TITLES + '/' + id + '/videos' ).pipe(
      tap(data => {
        if (!data.videos) {
          this.snakeBar.open('The trailer was not found','', {duration: 4000})
        }
      })
    )
  }
}
