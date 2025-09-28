import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject} from '@angular/core';
import type {OnInit, OnDestroy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {DOCUMENT} from '@angular/common';
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
import {ThemeService} from '../../../shared/services/theme.service';

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
  public moviesService = inject(MoviesService);
  protected readonly AppRoutesEnum = AppRoutesEnum;
  protected readonly Math = Math;
  protected readonly Number = Number;
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private snakeBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  @HostListener('document:click')
  public change(): void {
     this.searchValue.reset();
      this.foundMovies = null;
  }

  @HostListener('click', ['$event'])
  public onElementClick(event: MouseEvent): void {
    const target = event.target;
    let liElement: HTMLElement | null = null;
    if (target instanceof HTMLElement) {
     liElement = target.closest('li');
    }

    if (liElement) {
      this.actionsToMenu();
    }
  }

  public ngOnInit(): void {
    this.searchValue.valueChanges.pipe(
      tap(() => {
        if(this.searchValue.value === '') {
          this.foundMovies = null;
        }
      }),
      takeUntil(this.destroy$),
      debounceTime(300),
      filter((value): value is string => !!value && value.trim() !== ''),
      switchMap(value => this.moviesService.searchTitles(value))
    ).subscribe(titles => {
      this.foundMovies = titles;
      this.cdr.detectChanges();
    });

    this.themeService.initTheme();
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

  public scrollToElement(adress: string, fragment: string): void {
    this.router.navigate(['/' + adress]);

    if(fragment) {
      setTimeout(() => {
        this.scrollToFragment(fragment);
      }, 2000);
    }
  }

  public scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public themeToggle(): void {
    this.themeService.toggleTheme();
  }
}
