import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/auth/auth.interceptor';
import { authGuard } from './app/auth/auth.guard'; // Import functional guard

const routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./app/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard], // Use functional guard
  },
  { path: '**', redirectTo: 'login' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
      // Remove withFetch() unless you specifically need it
    ),
  ],
}).catch((err) => console.error(err));
