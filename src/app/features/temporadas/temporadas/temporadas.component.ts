import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemporadasService } from '../../../core/services/temporadas.service';
import { Temporada } from '../../../models/temporada';
import { TemporadaCreate } from '../../../models/temporada-create';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';


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
  guardando = false;

  mensaje = '';
  error = '';

  constructor(
    private temporadasService: TemporadasService,
    private toastService: ToastService,
    private confirm: ConfirmDialogService
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
        this.toastService.show('Error al cargar temporadas.', 'error');
      }
    });
  }

  guardarTemporada(): void {
    this.mensaje = '';
    this.error = '';
    this.guardando = true;

    if (this.modoEdicion && this.temporadaIdEditando !== null) {
      this.temporadasService.update(this.temporadaIdEditando, this.nuevaTemporada)
        .subscribe({
          next: () => {
            this.guardando = false;
            this.toastService.show('Temporada actualizada correctamente.', 'success');
            this.cancelarEdicion();
            this.cargarTemporadas();
          },
          error: () => {
            this.guardando = false;
            this.toastService.show('Error al actualizar temporada.', 'error');
          }
        });

      return;
    }

    this.temporadasService.create(this.nuevaTemporada).subscribe({
      next: () => {
        this.guardando = false;
        this.toastService.show('Temporada creada correctamente.', 'success');
        this.cancelarEdicion();
        this.cargarTemporadas();
      },
      error: () => {
        this.guardando = false;
        this.toastService.show('Error al crear temporada.', 'error');
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

  async eliminarTemporada(id: number): Promise<void> {
    const confirmado = await this.confirm.confirm({
      title: 'Eliminar temporada',
      message: '¿Deseas eliminar esta temporada? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger'
    });

    if (!confirmado) {
      return;
    }

    this.temporadasService.delete(id).subscribe({
      next: () => {
        this.toastService.show('Temporada eliminada correctamente.', 'success');
        this.cargarTemporadas();
      },
      error: () => {
        this.toastService.show('Error al eliminar temporada.', 'error');
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