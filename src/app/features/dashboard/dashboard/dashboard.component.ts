import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

import { DashboardService } from '../../../core/services/dashboard.service';

import { DashboardResumen } from '../../../models/dashboard-resumen';
import { UltimaReserva } from '../../../models/ultima-reserva';
import { ProximaLlegada } from '../../../models/proxima-llegada';
import { ReservaMensual } from '../../../models/reserva-mensual';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

 resumen: DashboardResumen = {

  totalSitios: 0,
  totalAlojamientos: 0,
  totalReservas: 0,

  ingresosMes: 0,

  reservasPendientes: 0,
  reservasConfirmadas: 0,
  llegadasHoy: 0,
  salidasHoy: 0,

  sitiosMes: 0,
  alojamientosMes: 0,

  porcentajeReservasMes: 0,
  porcentajeIngresosMes: 0

};
  barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Reservas'
    }
  ]
};

barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
};

  ultimasReservas: UltimaReserva[] = [];
  proximasLlegadas: ProximaLlegada[] = [];
  reservasMensuales: ReservaMensual[] = [];

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    this.dashboardService.getResumen().subscribe({
      next: response => this.resumen = response,
      error: error => console.error(error)
    });

    this.dashboardService.getUltimasReservas().subscribe({
      next: response => this.ultimasReservas = response,
      error: error => console.error(error)
    });

    this.dashboardService.getProximasLlegadas().subscribe({
      next: response => this.proximasLlegadas = response,
      error: error => console.error(error)
    });

   this.dashboardService.getReservasMensuales().subscribe({
  next: response => {
    this.reservasMensuales = response;

    this.barChartData = {
      labels: response.map(x => x.mes),
      datasets: [
        {
          data: response.map(x => x.totalReservas),
          label: 'Reservas'
        }
      ]
    };
  },
  error: error => console.error(error)
});
  }
}