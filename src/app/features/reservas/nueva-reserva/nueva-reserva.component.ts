import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SitiosService } from '../../../core/services/sitios.service';
import { ReservasService } from '../../../core/services/reservas.service';
import { Sitio } from '../../../models/sitio';
import { AlojamientoDisponible } from '../../../models/alojamiento-disponible';

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
    private reservasService: ReservasService
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
        this.error = 'Error al cargar los sitios turísticos.';
      }
    });
  }

  buscarDisponibilidad(): void {
    this.error = '';
    this.alojamientosDisponibles = [];
    this.alojamientoSeleccionado = undefined;

    if (!this.reserva.sitioId || !this.reserva.fechaLlegada || !this.reserva.fechaSalida) {
      this.error = 'Debe seleccionar sitio, fecha de llegada y fecha de salida.';
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
          this.error = 'No hay alojamientos disponibles que cumplan con los criterios.';
        }
      },
      error: () => {
        this.error = 'Error al consultar la disponibilidad de alojamientos.';
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
      this.error = 'Debe seleccionar un alojamiento.';
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
        this.error = error.error || 'Error al crear la reserva.';
      }
    });
  }

  siguientePaso(): void {
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