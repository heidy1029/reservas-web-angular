import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TarifasService } from '../../../core/services/tarifas.service';
import { SitiosService } from '../../../core/services/sitios.service';
import { AlojamientosService } from '../../../core/services/alojamientos.service';
import { TemporadasService } from '../../../core/services/temporadas.service';

import { Tarifa } from '../../../models/tarifa';
import { TarifaCreate } from '../../../models/tarifa-create';
import { Sitio } from '../../../models/sitio';
import { Alojamiento } from '../../../models/alojamiento';
import { Temporada } from '../../../models/temporada';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.css'
})
export class TarifasComponent implements OnInit {

  tarifas: Tarifa[] = [];
  sitios: Sitio[] = [];
  alojamientos: Alojamiento[] = [];
  temporadas: Temporada[] = [];

  nuevaTarifa: TarifaCreate = {
    sitioId: 0,
    alojamientoId: null,
    temporadaId: 0,
    numeroPersonasDesde: 1,
    numeroPersonasHasta: 4,
    valorNoche: 0,
    valorPersonaAdicional: 0
  };

  modoEdicion = false;
  tarifaIdEditando: number | null = null;

  mensaje = '';
  error = '';

  constructor(
    private tarifasService: TarifasService,
    private sitiosService: SitiosService,
    private alojamientosService: AlojamientosService,
    private temporadasService: TemporadasService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.tarifasService.getAll().subscribe({
      next: r => this.tarifas = r,
      error: () => this.error = 'Error al cargar tarifas.'
    });

    this.sitiosService.getAll().subscribe({
      next: r => this.sitios = r
    });

    this.alojamientosService.getAll().subscribe({
      next: r => this.alojamientos = r
    });

    this.temporadasService.getAll().subscribe({
      next: r => this.temporadas = r
    });
  }

  guardarTarifa(): void {
    this.mensaje = '';
    this.error = '';

    if (this.modoEdicion && this.tarifaIdEditando !== null) {
      this.tarifasService.update(this.tarifaIdEditando, this.nuevaTarifa)
        .subscribe({
          next: () => {
            this.mensaje = 'Tarifa actualizada correctamente.';
            this.cancelarEdicion();
            this.cargarDatos();
          },
          error: () => this.error = 'Error al actualizar tarifa.'
        });

      return;
    }

    this.tarifasService.create(this.nuevaTarifa).subscribe({
      next: () => {
        this.mensaje = 'Tarifa creada correctamente.';
        this.cancelarEdicion();
        this.cargarDatos();
      },
      error: () => this.error = 'Error al crear tarifa.'
    });
  }

  editarTarifa(tarifa: Tarifa): void {
    this.modoEdicion = true;
    this.tarifaIdEditando = tarifa.id;

    this.nuevaTarifa = {
      sitioId: tarifa.sitioId,
      alojamientoId: tarifa.alojamientoId ?? null,
      temporadaId: tarifa.temporadaId,
      numeroPersonasDesde: tarifa.numeroPersonasDesde,
      numeroPersonasHasta: tarifa.numeroPersonasHasta,
      valorNoche: tarifa.valorNoche,
      valorPersonaAdicional: tarifa.valorPersonaAdicional
    };
  }

  eliminarTarifa(id: number): void {
    if (!confirm('¿Deseas eliminar esta tarifa?')) {
      return;
    }

    this.tarifasService.delete(id).subscribe({
      next: () => {
        this.mensaje = 'Tarifa eliminada correctamente.';
        this.cargarDatos();
      },
      error: () => this.error = 'Error al eliminar tarifa.'
    });
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.tarifaIdEditando = null;

    this.nuevaTarifa = {
      sitioId: 0,
      alojamientoId: null,
      temporadaId: 0,
      numeroPersonasDesde: 1,
      numeroPersonasHasta: 4,
      valorNoche: 0,
      valorPersonaAdicional: 0
    };
  }
}