import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {DOCUMENT} from '@angular/common';
import {SignalService} from '../../../shared/services/signal.service.service';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../shared/services/auth.service.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import type {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public isOpenMenu = false;
  public signalService = inject(SignalService);
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private snakeBar = inject(MatSnackBar);

  public actionsToMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
    this.document.body.style.overflow = this.isOpenMenu ? 'hidden' : '';
  }

  public logout(): void {
    const refreshToken = this.localStorageService.getRefreshToken();

    if(refreshToken) {
      const body = {
        refreshToken: refreshToken,
      }
      this.authService.logout(body).subscribe({
        next: (data): void => {
          if(data.error) {
            this.snakeBar.open(data.message, '', {duration: 4000});
            return;
          }

          this.localStorageService.removeTokens();
          this.snakeBar.open(data.message, '', {duration: 4000});
          this.signalService.isLogin.set(false);

        },
        error: (error:HttpErrorResponse) => {
          this.snakeBar.open(error.error.message, '', {duration: 4000});
        }
      })
    }
  }
}
