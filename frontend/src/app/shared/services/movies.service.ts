import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import type { TrailerDataType } from '../types/trailer-data.type';
import { MatSnackBar } from '@angular/material/snack-bar';

import { inject, Injectable, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type {
  CompanyCreditData,
  ErrorTypes,
  FilmDataType,
  TitlesDataType,
  TitleTypes,
  VideosData,
} from '../types/movies-response.type';
import { RequestsEnum } from '../enums/requests.enum';
import { environment } from '../../../environments/environment';
import { SignalService } from './signal.service';
import { WatchlistService } from './watchlist.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public favoriteId = signal<string[]>([]);

  private http = inject(HttpClient);
  private snakeBar = inject(MatSnackBar);
  private signalService = inject(SignalService);
  private watchlistService = inject(WatchlistService);

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

    return this.http.get<TitlesDataType>(
      environment.baseUrl + RequestsEnum.TITLES,
      {
        params: parameters,
      }
    );
  }

  public getTitle(id: string): Observable<TitleTypes | ErrorTypes> {
    return this.http.get<TitleTypes | ErrorTypes>(
      environment.baseUrl + RequestsEnum.TITLES + '/' + id
    );
  }

  public getVideos(id: string): Observable<VideosData> {
    return this.http.get<VideosData>(
      environment.baseUrl + RequestsEnum.TITLES + '/' + id + '/videos'
    );
  }

  public getCompanies(id: string): Observable<CompanyCreditData> {
    return this.http.get<CompanyCreditData>(
      environment.baseUrl + RequestsEnum.TITLES + '/' + id + '/companyCredits'
    );
  }

  public getImages(id: string): Observable<ImageData> {
    return this.http.get<ImageData>(
      environment.baseUrl + RequestsEnum.TITLES + '/' + id + '/images'
    );
  }

  public toggleFavorite(id: string, data: FilmDataType[]): void {
    if (this.signalService.idForCheckElementInWatchlist().includes(id)) {
      this.watchlistService.deleteMovie(id);
    } else {
      const currentData = data.find((element) => element.id === id);
      if (currentData && 'primaryTitle' in currentData) {
        const movieData = {
          id: currentData.id,
          type: currentData.type,
          primaryTitle: currentData.primaryTitle,
          primaryImage: currentData.primaryImage,
          startYear: currentData.startYear,
          endYear: currentData.endYear,
          runtimeSeconds: currentData.runtimeSeconds || 0,
          genres: currentData.genres,
          rating: currentData.rating,
          plot: currentData.plot,
        };
        this.watchlistService.addMovie(movieData);
      }
    }
  }

  public searchTitles(word: string): Observable<TitlesDataType> {
    return this.http.get<TitlesDataType>(
      environment.baseUrl + RequestsEnum.SEARCH + word
    );
  }

  public getTrailer(id: string): Observable<TrailerDataType> {
    return this.http
      .get<TrailerDataType>(
        environment.baseUrl + RequestsEnum.TITLES + '/' + id + '/videos'
      )
      .pipe(
        tap((data) => {
          if (!data.videos) {
            this.snakeBar.open('The trailer was not found', '', {
              duration: 4000,
            });
          }
        })
      );
  }
}
