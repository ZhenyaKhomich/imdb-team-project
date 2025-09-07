import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import type {FormGroup} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    MatIconModule
  ],
  templateUrl: './signin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  public showPasswordValue = false;
  public signInForm!: FormGroup;
  private fb = inject(FormBuilder);

  public ngOnInit(): void {
    this.signInForm = this.fb.group({
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
