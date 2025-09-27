import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, of} from 'rxjs';
import type {Observable} from 'rxjs';
import type { ActorsDataType} from '../types/actors-data.type';
import {environment} from '../../../environments/environment';
import {RequestsEnum} from '../enums/requests.enum';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private http = inject(HttpClient);

  public getAllActors(requestCount = 20): Observable<ActorsDataType> {
    const allActors: ActorsDataType = {names:[]};

    const loadPages = (token?: string, pageCount = 1): Observable<ActorsDataType> => {
      if(pageCount > requestCount) return of(allActors);

      return this.http.get<ActorsDataType>(environment.baseUrl + RequestsEnum.ALL_ACTORS, {params: token ? {pageToken: token} :  {pageToken: ''}}).pipe(
        delay(200),
        switchMap((response: ActorsDataType): Observable<ActorsDataType> => {

          allActors.names.push(...response.names);
          return response.nextPageToken ? loadPages(response.nextPageToken, ++pageCount) : of(allActors);
        })
      );
    }

    return loadPages();
  }
}
