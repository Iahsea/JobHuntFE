import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    // Home page - Không có header riêng, dùng hero-wrapper
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

        ],
    },
    // Các trang khác - Có header thường
    {
        path: '',
        loadComponent: () =>
            import('./shared/layouts/page-layout/page-layout.component').then((m) => m.PageLayoutComponent),
        children: [
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
    // Full width layout (toàn màn hình)
    {
        path: 'explore',
        loadComponent: () => import('./shared/layouts/full-width-layout/full-width-layout.component').then((m) => m.FullWidthLayoutComponent),
        children: [

        ]
    },
    // AuthLayoutComponent - Không có header/footer
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
        path: 'authenticate',
        loadComponent: () =>
            import('./features/auth/authenticate/authenticate.component').then((m) => m.AuthenticateComponent),
        children: [

        ],
    },
    // AdminLayoutComponent
    {
        path: 'admin',
        loadComponent: () =>
            import('./features/admin/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
        // canActivate: [adminGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'messages',
                loadComponent: () =>
                    import('./features/admin/messages/messages.component').then((m) => m.MessagesComponent),
            },
            {
                path: 'applications',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'jobs',
                loadComponent: () =>
                    import('./features/admin/manage-jobs/manage-jobs.component').then((m) => m.ManageJobsComponent),
            },
            {
                path: 'companies',
                loadComponent: () =>
                    import('./features/admin/manage-companies/manage-companies.component').then((m) => m.ManageCompaniesComponent),
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./features/admin/manage-users/manage-users.component').then((m) => m.ManageUsersComponent),
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'help',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
        ],
    },
    // {
    //     path: '**',
    //     redirectTo: '',
    // },
];
