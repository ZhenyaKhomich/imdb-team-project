import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import type {OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {DOCUMENT, NgForOf} from '@angular/common';
import {SignalService} from '../../../shared/services/signal.service';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../shared/services/auth.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import type {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import type {TitlesDataType} from '../../../shared/types/movies-response.type';
import {MoviesService} from '../../../shared/services/movies.service';
import {debounceTime, filter, switchMap, takeUntil} from 'rxjs/operators';
import {Subject, tap} from 'rxjs';

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
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchValue = new FormControl('');
  public isOpenMenu = false;
  public foundMovies: TitlesDataType | null = null;
  public signalService = inject(SignalService);
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private snakeBar = inject(MatSnackBar);
  private moviesService = inject(MoviesService);
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.searchValue.valueChanges.pipe(
      tap(() => {
        if(this.searchValue.value === ''){
          this.foundMovies = null;
        }
      }),
      takeUntil(this.destroy$),
      debounceTime(500),
      filter((value): value is string => !!value && value.trim() !== ''),
      switchMap(value => this.moviesService.searchTitles(value))
    ).subscribe(titles => {
      this.foundMovies = titles;
      this.cdr.detectChanges();
    });
  }

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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly Math = Math;
  protected readonly Number = Number;
}
