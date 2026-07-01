import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasService } from '../../../core/services/reservas.service';
import { ReservaListado } from '../../../models/reserva-listado';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

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
    private reservasService: ReservasService,
    private toastService: ToastService,
    private confirm: ConfirmDialogService
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
        this.toastService.show('Error al cargar reservas.', 'error');
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
async cancelarReserva(id: number): Promise<void> {
 const confirmado = await this.confirm.confirm({
  title: 'Cancelar reserva',
  message: 'La reserva cambiará al estado Cancelada. Esta acción puede afectar la disponibilidad del alojamiento.',
  confirmText: 'Cancelar reserva',
  cancelText: 'Volver',
  type: 'warning'
});

if (!confirmado) {
  return;
}
  this.reservasService.cancelarReserva(id).subscribe({
    next: () => {
      this.cargarReservas();
    },
    error: () => {
      this.toastService.show('Error al cancelar la reserva.', 'error');
    }
  });
}
}