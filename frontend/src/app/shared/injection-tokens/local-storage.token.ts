import {InjectionToken} from '@angular/core';

export const LOCALE_STORAGE_TOKEN = new InjectionToken<Storage>('Locale Storage', {
  providedIn: 'root',
  factory: (): Storage => localStorage
});
