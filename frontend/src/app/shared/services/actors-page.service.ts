import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RequestsEnum } from '../enums/requests.enum';
import type { ActorData, ActorsData } from '../types/actors-page';
import type { ErrorTypes } from '../types/movies-response.type';

@Injectable({
  providedIn: 'root',
})
export class ActorsPageService {
  private http = inject(HttpClient);

  public getActors(
    queryParameters?: Record<string, string>
  ): Observable<ActorsData> {
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

    return this.http.get<ActorsData>(
      environment.baseUrl + RequestsEnum.ALL_ACTORS,
      {
        params: parameters,
      }
    );
  }

  public getActor(id: string): Observable<ActorData | ErrorTypes> {
    return this.http.get<ActorData | ErrorTypes>(
      environment.baseUrl + RequestsEnum.ACTOR + '/' + id
    );
  }
}
