import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./shared/layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/home/home.component').then((m) => m.HomeComponent),
            },
            {
                path: 'jobs',
                loadComponent: () =>
                    import('./features/job/job-list/job-list.component').then((m) => m.JobListComponent),
            },
            {
                path: 'jobs/:id',
                loadComponent: () =>
                    import('./features/job/job-detail/job-detail.component').then((m) => m.JobDetailComponent),
            },
            {
                path: 'companies',
                loadComponent: () =>
                    import('./features/company/company-list/company-list.component').then((m) => m.CompanyListComponent),
            },
            {
                path: 'companies/:id',
                loadComponent: () =>
                    import('./features/company/company-detail/company-detail.component').then((m) => m.CompanyDetailComponent),
            },
        ],
    },
    {
        path: 'auth',
        loadComponent: () =>
            import('./features/auth/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./features/auth/login/login.component').then((m) => m.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
            },
        ],
    },
    {
        path: 'admin',
        loadComponent: () =>
            import('./features/admin/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'jobs',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'companies',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
