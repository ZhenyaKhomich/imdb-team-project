import {inject, Injectable} from '@angular/core';
import {LOCALE_STORAGE_TOKEN} from '../injection-tokens/local-storage.token';
import {TokensEnum} from '../enums/tokens.enum';
import type {LoginResponseType} from '../types/login-response.type';
import type {ActorsDataType} from '../types/actors-data.type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage = inject(LOCALE_STORAGE_TOKEN);

  public setTokens(data: LoginResponseType): void {
    this.localStorage.setItem(TokensEnum.AccessToken, data.accessToken);
    this.localStorage.setItem(TokensEnum.RefreshToken, data.refreshToken);
    this.localStorage.setItem(TokensEnum.UserId, data.userId);
  }

  public getAccessToken(): string | null {
    return this.localStorage.getItem(TokensEnum.AccessToken);
  }

  public getRefreshToken(): string | null {
    return this.localStorage.getItem(TokensEnum.RefreshToken);
  }

  public removeTokens(): void {
    this.localStorage.removeItem(TokensEnum.AccessToken);
    this.localStorage.removeItem(TokensEnum.RefreshToken);
    this.localStorage.removeItem(TokensEnum.UserId);
  }

  public setActors(actors: ActorsDataType, data:string): void {
    this.localStorage.setItem(TokensEnum.Actors, JSON.stringify(actors));
    this.localStorage.setItem(TokensEnum.Data, data);
  }

  public getActors(): ActorsDataType | null {
    const actors =  this.localStorage.getItem(TokensEnum.Actors);
    if(actors) {
      return JSON.parse(actors);
    }
    return null;
  }

  public getData(): string | null {
    return this.localStorage.getItem(TokensEnum.Data);
  }

  public getTheme(): string | null {
    return this.localStorage.getItem(TokensEnum.Theme);
  }

  public setTheme(theme: 'light' | 'dark'): void {
    this.localStorage.setItem(TokensEnum.Theme, theme);
  }
}
