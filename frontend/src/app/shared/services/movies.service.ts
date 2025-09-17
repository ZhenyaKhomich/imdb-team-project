import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type {
  CompanyCreditData,
  Data,
  ErrorTypes,
  TitleTypes,
  TrillerData,
  VideosData,
} from '../types/movies';
import { RequestsEnum } from '../enums/requests.enum';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public favoriteId = signal<string[]>([]);

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
  }

  public getTrillers(search: string): Observable<TrillerData> {
    return this.http.get<TrillerData>(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=AIzaSyD6BPolFqadEkCkmgn5HT7SynK3igkrm6M&maxResults=20`
    );
  }

  public getTitle(id: string): Observable<TitleTypes | ErrorTypes> {
    return this.http.get<TitleTypes | ErrorTypes>(
      this.baseUrl + RequestsEnum.TITLES + '/' + id
    );
  }

  public getVideos(id: string): Observable<VideosData> {
    return this.http.get<VideosData>(
      this.baseUrl + RequestsEnum.TITLES + '/' + id + '/videos'
    );
  }

  public getCompanies(id: string): Observable<CompanyCreditData> {
    return this.http.get<CompanyCreditData>(
      this.baseUrl + RequestsEnum.TITLES + '/' + id + '/companyCredits'
    );
  }

  public getImages(id: string): Observable<ImageData> {
    return this.http.get<ImageData>(
      this.baseUrl + RequestsEnum.TITLES + '/' + id + '/images'
    );
  }

  public toggleFavorite(id: string): void {
    this.favoriteId.update((element) => {
      return element.includes(id)
        ? element.filter((item) => item !== id)
        : [...element, id];
    });
  }
}
