import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type {
  CompanyCreditData,
  ErrorTypes,
  TitlesDataType,
  TitleTypes,
  VideosData,
} from '../types/movies-response.type';
import { RequestsEnum } from '../enums/requests.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public favoriteId = signal<string[]>([]);

  private http = inject(HttpClient);

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

  public toggleFavorite(id: string): void {
    this.favoriteId.update((element) => {
      return element.includes(id)
        ? element.filter((item) => item !== id)
        : [...element, id];
    });
  }

  public searchTitles(word: string): Observable<TitlesDataType> {
    return this.http.get<TitlesDataType>(
      environment.baseUrl + RequestsEnum.SEARCH + word
    );
  }
}
