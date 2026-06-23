import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

import { LoginComponent } from './features/auth/login/login.component';
import { SitiosComponent } from './features/sitios/sitios/sitios.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    children: [

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