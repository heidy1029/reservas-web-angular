import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ReservasService } from '../../../core/services/reservas.service';
import { ReservaDetalle } from '../../../models/reserva-detalle';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-reserva-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reserva-detalle.component.html',
  styleUrl: './reserva-detalle.component.css'
})
export class ReservaDetalleComponent implements OnInit {

  reserva?: ReservaDetalle;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private reservasService: ReservasService,
    private toastService: ToastService,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.cargarReserva();
  }

  private cargarReserva(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.reservasService.getById(id).subscribe({
      next: (response) => {
        this.reserva = response;
      },
      error: () => {
        this.error = 'No se pudo cargar la reserva.';
      }
    });
  }

  confirmarReserva(): void {
    if (!this.reserva) return;

  this.reservasService.confirmarReserva(this.reserva.id).subscribe({
    next: () => {
      this.cargarReserva();
    },
    error: () => {
      this.toastService.show('Error al confirmar la reserva.', 'error');
    }
  });
}

cancelarReserva(): void {
  if (!this.reserva) return;

  const confirmar = confirm('¿Está seguro de cancelar esta reserva?');

  if (!confirmar) return;

  this.reservasService.cancelarReserva(this.reserva.id).subscribe({
    next: () => {
      this.cargarReserva();
    },
    error: () => {
      this.toastService.show('Error al cancelar la reserva.', 'error');
    }
  });
}

imprimir(): void {
  window.print();
}
}