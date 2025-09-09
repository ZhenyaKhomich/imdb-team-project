import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import type {FormGroup} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';

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
}
