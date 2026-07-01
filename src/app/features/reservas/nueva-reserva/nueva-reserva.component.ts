import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SitiosService } from '../../../core/services/sitios.service';
import { ReservasService } from '../../../core/services/reservas.service';
import { Sitio } from '../../../models/sitio';
import { AlojamientoDisponible } from '../../../models/alojamiento-disponible';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-nueva-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  
  pasoActual = 1;
  buscando = false;
  guardando = false;
  error = '';
  reservaCreadaId?: number;
  
  sitios: Sitio[] = [];
  alojamientosDisponibles: AlojamientoDisponible[] = [];
  alojamientoSeleccionado?: AlojamientoDisponible;

  reserva = {
    sitioId: '',
    alojamientoId: 0,
    fechaLlegada: '',
    fechaSalida: '',
    numeroPersonas: 1,
    nombreHuesped: '',
    documentoHuesped: '',
    telefonoHuesped: '',
    correoHuesped: ''
  };

  constructor(
    private sitiosService: SitiosService,
    private reservasService: ReservasService,
    private toastService: ToastService,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.cargarSitios();
  }

  cargarSitios(): void {
    // Tipamos explícitamente el response que viene del servicio
    this.sitiosService.getAll().subscribe({
      next: (response: Sitio[]) => {
        this.sitios = response;
      },
      error: () => {
        this.toastService.show('Error al cargar los sitios turísticos.', 'error');
      }
    });
  }

  buscarDisponibilidad(): void {
    this.alojamientosDisponibles = [];
    this.alojamientoSeleccionado = undefined;

    if (!this.reserva.sitioId || !this.reserva.fechaLlegada || !this.reserva.fechaSalida) {
      this.toastService.show('Debe seleccionar sitio, fecha de llegada y fecha de salida.', 'error');
      return;
    }

    this.buscando = true;

    this.reservasService.consultarDisponibilidad(
      Number(this.reserva.sitioId),
      this.reserva.fechaLlegada,
      this.reserva.fechaSalida
    ).subscribe({
      next: (response: AlojamientoDisponible[]) => {
        this.alojamientosDisponibles = response.filter(x => x.disponible && x.capacidad >= this.reserva.numeroPersonas);
        this.buscando = false;

        if (this.alojamientosDisponibles.length === 0) {
          this.toastService.show('No hay alojamientos disponibles que cumplan con los criterios.', 'error');
        }
      },
      error: () => {
        this.toastService.show('Error al consultar la disponibilidad de alojamientos.', 'error');
        this.buscando = false;
      }
    });
  }

  seleccionarAlojamiento(alojamiento: AlojamientoDisponible): void {
    this.alojamientoSeleccionado = alojamiento;
    this.reserva.alojamientoId = alojamiento.id;
  }

  calcularNoches(): number {
    if (!this.reserva.fechaLlegada || !this.reserva.fechaSalida) {
      return 0;
    }
    const llegada = new Date(this.reserva.fechaLlegada);
    const salida = new Date(this.reserva.fechaSalida);
    const diferencia = salida.getTime() - llegada.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  obtenerNombreSitio(): string {
    const sitio = this.sitios.find(x => x.id == Number(this.reserva.sitioId));
    return sitio?.nombre ?? '';
  }

  confirmarReserva(): void {
    this.error = '';

    if (!this.alojamientoSeleccionado) {
      this.toastService.show('Debe seleccionar un alojamiento.', 'error');
      return;
    }

    this.guardando = true;

    const request = {
      sitioId: Number(this.reserva.sitioId),
      alojamientoId: this.reserva.alojamientoId,
      fechaLlegada: this.reserva.fechaLlegada,
      fechaSalida: this.reserva.fechaSalida,
      numeroPersonas: this.reserva.numeroPersonas,
      numeroHabitaciones: 1,
      nombreHuesped: this.reserva.nombreHuesped,
      documentoHuesped: this.reserva.documentoHuesped,
      telefonoHuesped: this.reserva.telefonoHuesped,
      correoHuesped: this.reserva.correoHuesped
    };

    // Tipamos explícitamente (response: any) y (error: any) para corregir el TS7006
    this.reservasService.crearReserva(request).subscribe({
      next: (response: any) => {
        this.guardando = false;
        this.reservaCreadaId = response.reservaId;
        this.pasoActual = 4;
      },
      error: (error: any) => {
        this.guardando = false;
        this.toastService.show(error.error || 'Error al crear la reserva.', 'error');
      }
    });
  }

  siguientePaso(): void {
    if (this.pasoActual === 1) {
      if (!this.reserva.sitioId || !this.reserva.fechaLlegada || !this.reserva.fechaSalida) {
        this.toastService.show('⚠ Sitio, fecha de llegada y fecha de salida son obligatorios', 'error');
        return;
      }
      if (this.reserva.numeroPersonas < 1) {
        this.toastService.show('⚠ Debe ingresar mínimo una persona', 'error');
        return;
      }
      if (!this.alojamientoSeleccionado) {
        this.toastService.show('⚠ Debe seleccionar un alojamiento', 'error');
        return;
      }
    }

    if (this.pasoActual === 2) {
      if (!this.reserva.nombreHuesped) {
        this.toastService.show('⚠ El nombre es obligatorio', 'error');
        return;
      }
      if (!this.reserva.documentoHuesped) {
        this.toastService.show('⚠ El documento es obligatorio', 'error');
        return;
      }
      if (!this.reserva.telefonoHuesped) {
        this.toastService.show('⚠ El teléfono es obligatorio', 'error');
        return;
      }
      if (!this.reserva.correoHuesped) {
        this.toastService.show('⚠ El correo es obligatorio', 'error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.reserva.correoHuesped)) {
        this.toastService.show('⚠ El correo no es válido', 'error');
        return;
      }
    }

    if (this.pasoActual < 4) {
      this.pasoActual++;
    }
  }

  anteriorPaso(): void {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }
}