import {inject, Injectable} from '@angular/core';
import {SignalService} from './signal.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private signalService = inject(SignalService);
  private localStorageService = inject(LocalStorageService);

  public initTheme(): void {
    const savedTheme = this.localStorageService.getTheme();
    if(savedTheme === 'dark' || savedTheme === 'light') {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('dark');
    }
  }

  public setTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.signalService.darkTheme.set(theme === 'dark');
    this.localStorageService.setTheme(theme);
  }

  public toggleTheme(): void {
    const current = document.documentElement.getAttribute('data-theme');
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
}
