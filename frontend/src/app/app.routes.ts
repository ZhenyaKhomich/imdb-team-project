import type { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { AppRoutesEnum } from './shared/enums/app-router.enum';

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
      },
      {
        path: AppRoutesEnum.SIGNUP,
        loadComponent: () =>
          import('./components/auth/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
      },
      {
        path: AppRoutesEnum.MOVIES,
        title: 'Movies',
        loadComponent: () =>
          import('./components/pages/movies/movies.component').then(
            (m) => m.MoviesComponent
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
