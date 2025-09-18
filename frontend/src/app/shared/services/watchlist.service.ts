import {inject, Injectable} from '@angular/core';
import type {FilmDataType, TitlesDataType} from '../types/movies-response.type';
import {SignalService} from './signal.service';
import {HttpClient} from '@angular/common/http';
import type {Observable} from 'rxjs';
import type {ErrorResponseType} from '../types/error-response.type';
import {environment} from '../../../environments/environment';
import {RequestsEnum} from '../enums/requests.enum';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private signalService = inject(SignalService);
  private http = inject(HttpClient);

  public addMovieWatchList(movie: FilmDataType): Observable<ErrorResponseType> {
    return this.http.post<ErrorResponseType>(environment.api + RequestsEnum.WATCHLIST, {titleData: movie});
  }

  public getWatchList(): Observable<TitlesDataType> {
    return this.http.get<TitlesDataType>(environment.api + RequestsEnum.WATCHLIST);
  }

  public deleteWatchListElement(id: string): Observable<ErrorResponseType> {
    return this.http.delete<ErrorResponseType>(environment.api + RequestsEnum.WATCHLIST + '/' + id);
  }

  public getMovies(): void {
    this.getWatchList().subscribe(
      (data) => {
        this.signalService.watchlistData.set(data);
        data.titles?.forEach((movie)=> {
          this.signalService.idForCheckElementInWatchlist.set([
            ...this.signalService.idForCheckElementInWatchlist(),
            movie.id
          ])
        })
      }
    )
  }

  public addMovie(movie: FilmDataType): void {
    const idForCheckElementInWatchlist =  this.signalService.idForCheckElementInWatchlist();
    this.signalService.idForCheckElementInWatchlist.set([
      ...idForCheckElementInWatchlist,
      movie.id
    ]);
    this.addMovieWatchList(movie).subscribe(
      () => {
        this.getMovies();
      }
    );
  }

  public deleteMovie(id: string): void {
    const idForCheckElementInWatchlist =  this.signalService.idForCheckElementInWatchlist().filter(movieId => movieId !== id);

    this.signalService.idForCheckElementInWatchlist.set(idForCheckElementInWatchlist);
    this.deleteWatchListElement(id).subscribe(
      (data) => {
        if(!data.error) {
          this.getMovies();
        }
      }
    )
  }
}
