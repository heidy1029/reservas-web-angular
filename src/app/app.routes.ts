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
import { NuevaReservaComponent } from './features/reservas/nueva-reserva/nueva-reserva.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { ConfiguracionComponent } from './features/configuracion/configuracion.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión | ElectroReserve'
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
        component: DashboardComponent,
        title: 'Dashboard | ElectroReserve'
      },

      {
        path: 'sitios',
        component: SitiosComponent,
        title: 'Sitios | ElectroReserve'
      },
      {
        path: 'alojamientos',
        component: AlojamientosComponent,
        title: 'Alojamientos | ElectroReserve'
      },
      {
        path: 'temporadas',
        component: TemporadasComponent,
        title: 'Temporadas | ElectroReserve'
      },
      {
        path: 'tarifas',
        component: TarifasComponent,
        title: 'Tarifas | ElectroReserve'
      },
      {
        path: 'reservas',
        component: ReservasComponent,
        title: 'Reservas | ElectroReserve'
      },
      {
        path: 'reservas/nueva',
        component: NuevaReservaComponent,
        title: 'Nueva Reserva | ElectroReserve'
      },
      {
        path: 'reservas/:id',
        component: ReservaDetalleComponent,
        title: 'Detalle de Reserva | ElectroReserve'
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        title: 'Reportes | ElectroReserve'
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        title: 'Configuración | ElectroReserve'
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        title: 'Usuarios | ElectroReserve'
      },
      {
        path: '404',
        component: NotFoundComponent,
        title: '404 No Encontrado | ElectroReserve'
      },
      {
        path: '**',
        redirectTo: '404'
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];