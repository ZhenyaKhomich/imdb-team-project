import type { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { AppRoutesEnum } from './shared/enums/app-router.enum';
import {isLoginGuard} from './shared/guards/is-login.guard';
import {isNotLoginGuard} from './shared/guards/is-not-login.guard';

export const routes: Routes = [
  {
    path: AppRoutesEnum.MAIN,
    redirectTo: AppRoutesEnum.MAIN,
    pathMatch: 'full',
  },
  {
    path: AppRoutesEnum.MAIN,
    component: LayoutComponent,
    children: [
      {
        path: AppRoutesEnum.MAIN,
        loadComponent: () =>
          import('./components/pages/main/main.component').then(
            (m) => m.MainComponent
          ),
      },
      {
        path: AppRoutesEnum.LOGIN,
        loadComponent: () =>
          import('./components/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [isLoginGuard]
      },
      {
        path: AppRoutesEnum.SIGNUP,
        loadComponent: () =>
          import('./components/auth/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
        canActivate: [isLoginGuard]
      },
      {
        path: AppRoutesEnum.MOVIES,
        loadComponent: () =>
          import('./components/pages/movies/movies.component').then(
            (m) => m.MoviesComponent
          ),
      },
      {
        path: `${AppRoutesEnum.MOVIES}/:id`,
        title: 'Movie',
        loadComponent: () =>
          import('./components/pages/movie/movie.component').then(
            (m) => m.MovieComponent
          ),
      },
      {
        path: AppRoutesEnum.WATCHLIST,
        title: 'Watch List',
        loadComponent: () =>
          import('./components/pages/watchlist/watchlist.component').then(
            (m) => m.WatchlistComponent
          ),
        canActivate: [isNotLoginGuard]
      },
      {
        path: `${AppRoutesEnum.TRAILER}/:id`,
        loadComponent: () =>
          import('./components/pages/trailer/trailer.component').then(
            (m) => m.TrailerComponent
          ),
      },
      {
        path: `${AppRoutesEnum.TRAILER}/:id`,
        loadComponent: () =>
          import('./components/pages/trailer/trailer.component').then(
            (m) => m.TrailerComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./components/pages/error-404/error-404.component').then(
            (m) => m.Error404Component
          ),
      },
    ],
  },
];
