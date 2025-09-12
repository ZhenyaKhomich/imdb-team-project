import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import type {LoginResponseType} from '../types/login-response.type';
import type {Observable} from 'rxjs';
import type {LoginFormType} from '../types/login-form.type';
import type {ErrorResponseType} from '../types/error-response.type';
import {RequestsEnum} from '../enums/requests.enum';
import type {UserDataType} from '../types/user-data.type';
import type {SignupFormType} from '../types/signup-form.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  public signup(body: SignupFormType): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(environment.api + RequestsEnum.SIGNUP, body);
  }

  public login(body: LoginFormType): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(environment.api + RequestsEnum.LOGIN, body);
  }

  public logout(body: {refreshToken: string}): Observable<ErrorResponseType> {
    return this.http.post<ErrorResponseType>(environment.api + RequestsEnum.LOGOUT, body);
  }

  public getUser(): Observable<UserDataType> {
    return this.http.get<UserDataType>(environment.api + RequestsEnum.USERS);
  }
}
