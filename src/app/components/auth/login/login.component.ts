import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import type {FormGroup} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

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
  private fb = inject(FormBuilder);

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

}
