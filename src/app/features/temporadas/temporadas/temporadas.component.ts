import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemporadasService } from '../../../core/services/temporadas.service';
import { Temporada } from '../../../models/temporada';
import { TemporadaCreate } from '../../../models/temporada-create';

@Component({
  selector: 'app-temporadas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './temporadas.component.html',
  styleUrl: './temporadas.component.css'
})
export class TemporadasComponent implements OnInit {

  temporadas: Temporada[] = [];

  nuevaTemporada: TemporadaCreate = {
    nombre: '',
    fechaInicio: '',
    fechaFin: ''
  };

  modoEdicion = false;
  temporadaIdEditando: number | null = null;

  mensaje = '';
  error = '';

  constructor(
    private temporadasService: TemporadasService
  ) {}

  ngOnInit(): void {
    this.cargarTemporadas();
  }

  cargarTemporadas(): void {
    this.temporadasService.getAll().subscribe({
      next: (response) => {
        this.temporadas = response;
      },
      error: () => {
        this.error = 'Error al cargar temporadas.';
      }
    });
  }

  guardarTemporada(): void {
    this.mensaje = '';
    this.error = '';

    if (this.modoEdicion && this.temporadaIdEditando !== null) {
      this.temporadasService.update(this.temporadaIdEditando, this.nuevaTemporada)
        .subscribe({
          next: () => {
            this.mensaje = 'Temporada actualizada correctamente.';
            this.cancelarEdicion();
            this.cargarTemporadas();
          },
          error: () => {
            this.error = 'Error al actualizar temporada.';
          }
        });

      return;
    }

    this.temporadasService.create(this.nuevaTemporada).subscribe({
      next: () => {
        this.mensaje = 'Temporada creada correctamente.';
        this.cancelarEdicion();
        this.cargarTemporadas();
      },
      error: () => {
        this.error = 'Error al crear temporada.';
      }
    });
  }

  editarTemporada(temporada: Temporada): void {
    this.modoEdicion = true;
    this.temporadaIdEditando = temporada.id;

    this.nuevaTemporada = {
      nombre: temporada.nombre,
      fechaInicio: temporada.fechaInicio.substring(0, 10),
      fechaFin: temporada.fechaFin.substring(0, 10)
    };
  }

  eliminarTemporada(id: number): void {
    if (!confirm('¿Deseas eliminar esta temporada?')) {
      return;
    }

    this.temporadasService.delete(id).subscribe({
      next: () => {
        this.mensaje = 'Temporada eliminada correctamente.';
        this.cargarTemporadas();
      },
      error: () => {
        this.error = 'Error al eliminar temporada.';
      }
    });
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.temporadaIdEditando = null;

    this.nuevaTemporada = {
      nombre: '',
      fechaInicio: '',
      fechaFin: ''
    };
  }
  calcularDiasTemporada(temporada: Temporada): number {
  const inicio = new Date(temporada.fechaInicio);
  const fin = new Date(temporada.fechaFin);

  const diferencia = fin.getTime() - inicio.getTime();

  return Math.ceil(diferencia / (1000 * 60 * 60 * 24)) + 1;
}

obtenerTemporadasActivas(): number {
  const hoy = new Date();

  return this.temporadas.filter(t => {
    const inicio = new Date(t.fechaInicio);
    const fin = new Date(t.fechaFin);

    return hoy >= inicio && hoy <= fin;
  }).length;
}
}