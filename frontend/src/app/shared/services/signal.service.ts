import {Injectable, signal} from '@angular/core';
import type {WritableSignal} from '@angular/core';
import type {UserDataType} from '../types/user-data.type';
import type {TitlesDataType} from '../types/movies-response.type';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  public isLogin = signal(false);
  public userData: WritableSignal<UserDataType> = signal({id: "", name: "", email: ""});
  public refreshSlider = signal(false);
  public refreshSliderWatchList = signal(false);
  public watchlistData: WritableSignal<TitlesDataType> = signal({titles:[]});
  public changeWatchlist: WritableSignal<boolean> = signal(true);
}
