import {InjectionToken} from '@angular/core';

export const WINDOW = new InjectionToken<Window>('window', {
  providedIn: 'root',
  factory: (): Window => window
});
