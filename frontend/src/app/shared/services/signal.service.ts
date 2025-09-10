import {Injectable, signal} from '@angular/core';
import type {WritableSignal} from '@angular/core';
import type {UserDataType} from '../types/user-data.type';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  public isLogin = signal(false);
  public userData: WritableSignal<UserDataType> = signal({id: "", name: "", email: ""});
}
