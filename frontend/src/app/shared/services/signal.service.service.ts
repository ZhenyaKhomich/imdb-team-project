import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  public isLogin = signal(false);
}
