import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import type {FormGroup} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import type {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {SignalService} from '../../../shared/services/signal.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  public showPasswordValue = false;
  public signUpForm!: FormGroup;
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snakeBar = inject(MatSnackBar);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private signalService = inject(SignalService);

  public ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^([A-Z][a-z]+)(\\s[A-Z][a-z]+)*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      rules: [false, Validators.requiredTrue],
    })
  }

  public showPassword(): void {
    this.showPasswordValue = !this.showPasswordValue;
  }

  public signup(): void {
    if (this.signUpForm.valid) {
      const body = {
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      }

      this.authService.signup(body).subscribe({
          next: (data): void => {
            if (data.accessToken && data.refreshToken && data.userId) {

              const body = {
                email: this.signUpForm.value.email,
                password: this.signUpForm.value.password,
                rememberMe: false,
              }

              this.authService.login(body).subscribe({
                  next: (data): void => {
                    if(data.accessToken && data.refreshToken && data.userId) {
                      this.snakeBar.open('Registration was successful', '', {duration: 4000});
                      this.localStorageService.setTokens(data);
                      this.router.navigate([AppRoutesEnum.MAIN]);
                      this.signalService.isLogin.set(true);
                      this.signUpForm.reset();
                      this.authService.getUser().subscribe((data) => {
                        this.signalService.userData.set(data);
                      })
                    }
                  },
                  error: (error: HttpErrorResponse) => {
                    this.snakeBar.open(error.error.message, '', {duration: 4000});
                  }
                }
              )
            }
          },
          error: (error: HttpErrorResponse) => {
            this.snakeBar.open(error.error.message, '', {duration: 4000});
          }
        }
      )
    } else {
      this.signUpForm.markAllAsTouched()
    }
  }
}
