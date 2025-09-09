import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AppRoutesEnum} from '../enums/app-router.enum';
import type {LoginResponseType} from '../types/login-response.type';
import type {Observable} from 'rxjs';
import type {LoginFormType} from '../types/login-form.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  public login(body: LoginFormType): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(environment.api + AppRoutesEnum.LOGIN, body);
  }

}
