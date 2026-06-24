import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { SitiosComponent } from './features/sitios/sitios/sitios.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';


export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
   children: [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'sitios',
    component: SitiosComponent
  }

]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];