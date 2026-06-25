import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { SitiosComponent } from './features/sitios/sitios/sitios.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AlojamientosComponent } from './features/alojamientos/alojamientos/alojamientos.component';
import { TemporadasComponent } from './features/temporadas/temporadas/temporadas.component';
import { TarifasComponent } from './features/tarifas/tarifas/tarifas.component';
import { ReservasComponent } from './features/reservas/reservas/reservas.component';
import { ReservaDetalleComponent } from './features/reservas/reserva-detalle/reserva-detalle.component';


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
  },
  {
  path: 'alojamientos',
  component: AlojamientosComponent
},
{
  path: 'temporadas',
  component: TemporadasComponent
},
{
  path: 'tarifas',
  component: TarifasComponent
},
{
  path: 'reservas',
  component: ReservasComponent
},
{
  path: 'reservas/:id',
  component: ReservaDetalleComponent
}

]
  },

  {
    path: '**',
    redirectTo: 'login'
  },
  

];