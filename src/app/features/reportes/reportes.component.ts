import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasService } from '../../core/services/reservas.service';
import { SitiosService } from '../../core/services/sitios.service';
import { AlojamientosService } from '../../core/services/alojamientos.service';
import { TarifasService } from '../../core/services/tarifas.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {

  reservas: any[] = [];
  sitios: any[] = [];
  alojamientos: any[] = [];
  tarifas: any[] = [];

  error = '';

  ngOnInit(): void {
    this.cargarDatos();
  }

  constructor(
    private reservasService: ReservasService,
    private sitiosService: SitiosService,
    private alojamientosService: AlojamientosService,
    private tarifasService: TarifasService
  ) {}

  cargarDatos(): void {
    this.reservasService.getAll().subscribe({
      next: r => this.reservas = r,
      error: () => this.error = 'Error al cargar reservas.'
    });

    this.sitiosService.getAll().subscribe({
      next: r => this.sitios = r
    });

    this.alojamientosService.getAll().subscribe({
      next: r => this.alojamientos = r
    });

    this.tarifasService.getAll().subscribe({
      next: r => this.tarifas = r
    });
  }

  obtenerIngresosTotales(): number {
    return this.reservas
      .filter(r => r.estado !== 'Cancelada')
      .reduce((total, r) => total + r.valorTotal, 0);
  }

  obtenerPendientes(): number {
    return this.reservas.filter(r => r.estado === 'Pendiente').length;
  }

  obtenerConfirmadas(): number {
    return this.reservas.filter(r => r.estado === 'Confirmada').length;
  }

  obtenerCanceladas(): number {
    return this.reservas.filter(r => r.estado === 'Cancelada').length;
  }

  obtenerOcupacionReferencial(): number {
    if (this.alojamientos.length === 0) return 0;

    const reservasActivas = this.reservas.filter(r => r.estado !== 'Cancelada').length;
    const porcentaje = (reservasActivas / this.alojamientos.length) * 100;

    return Math.min(Math.round(porcentaje), 100);
  }

  exportarReporte(): void {
    const encabezados = [
      'Reserva',
      'Huesped',
      'Sitio',
      'Llegada',
      'Salida',
      'Personas',
      'Total',
      'Estado'
    ];

    const filas = this.reservas.map(r => [
      r.id,
      r.huesped,
      r.sitio,
      r.fechaLlegada,
      r.fechaSalida,
      r.personas,
      r.valorTotal,
      r.estado
    ]);

    const contenido = [encabezados, ...filas]
      .map(fila => fila.join(';'))
      .join('\n');

    const blob = new Blob([contenido], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte-electroreserve.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}