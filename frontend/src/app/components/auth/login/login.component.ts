import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import type {FormGroup} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {AuthService} from '../../../shared/services/auth.service.service';
import type {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {SignalService} from '../../../shared/services/signal.service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public showPasswordValue = false;
  public loginForm!: FormGroup;
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snakeBar = inject(MatSnackBar);
  private signalService = inject(SignalService);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    })
  }

  public showPassword(): void {
    this.showPasswordValue = !this.showPasswordValue;
  }

  public login(): void {
    if (this.loginForm.valid) {
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe,
      }

      this.authService.login(body).subscribe({
          next: (data): void => {
            if(data.accessToken && data.refreshToken && data.userId) {
              this.snakeBar.open('Login to account was completed successfully', '', {duration: 4000});
              this.localStorageService.setTokens(data);
              this.router.navigate([AppRoutesEnum.MAIN]);
              this.loginForm.reset();
              this.signalService.isLogin.set(true);
              console.log(this.localStorageService.getRefreshToken());
            }
          },
          error: (error: HttpErrorResponse) => {
            this.snakeBar.open(error.error.message, '', {duration: 4000});
          }
        }
      )
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
