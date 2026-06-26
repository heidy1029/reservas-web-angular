import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasService } from '../../../core/services/reservas.service';
import { ReservaListado } from '../../../models/reserva-listado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {

  reservas: ReservaListado[] = [];
  error = '';

  constructor(
    private reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservasService.getAll().subscribe({
      next: (response) => {
        this.reservas = response;
      },
      error: () => {
        this.error = 'Error al cargar reservas.';
      }
    });
  }
  obtenerValorTotal(): number {
  return this.reservas.reduce((total, reserva) => total + reserva.valorTotal, 0);
}

obtenerPendientes(): number {
  return this.reservas.filter(reserva => reserva.estado === 'Pendiente').length;
}
exportarReservas(): void {
  if (this.reservas.length === 0) {
    return;
  }

  const encabezados = [
    'ID',
    'Huesped',
    'Sitio',
    'Fecha Llegada',
    'Fecha Salida',
    'Personas',
    'Total',
    'Estado'
  ];

  const filas = this.reservas.map(reserva => [
    reserva.id,
    reserva.huesped,
    reserva.sitio,
    reserva.fechaLlegada,
    reserva.fechaSalida,
    reserva.personas,
    reserva.valorTotal,
    reserva.estado
  ]);

  const contenido = [
    encabezados,
    ...filas
  ]
    .map(fila => fila.join(';'))
    .join('\n');

  const blob = new Blob([contenido], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'reservas-electroreserve.csv';
  a.click();

  window.URL.revokeObjectURL(url);
}
cancelarReserva(id: number): void {
  const confirmar = confirm('¿Está seguro de cancelar esta reserva?');

  if (!confirmar) {
    return;
  }

  this.reservasService.cancelarReserva(id).subscribe({
    next: () => {
      this.cargarReservas();
    },
    error: () => {
      this.error = 'Error al cancelar la reserva.';
    }
  });
}
}