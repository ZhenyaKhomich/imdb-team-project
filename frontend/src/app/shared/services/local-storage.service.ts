import {inject, Injectable} from '@angular/core';
import {LOCALE_STORAGE_TOKEN} from '../injection-tokens/local-storage.token';
import {TokensEnum} from '../enums/tokens.enum';
import type {LoginResponseType} from '../types/login-response.type';

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
}
