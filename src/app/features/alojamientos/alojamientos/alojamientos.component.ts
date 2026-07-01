import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlojamientosService } from '../../../core/services/alojamientos.service';
import { SitiosService } from '../../../core/services/sitios.service';

import { Alojamiento } from '../../../models/alojamiento';
import { AlojamientoCreate } from '../../../models/alojamiento-create';
import { Sitio } from '../../../models/sitio';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-alojamientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alojamientos.component.html',
  styleUrl: './alojamientos.component.css'
})
export class AlojamientosComponent implements OnInit {

  alojamientos: Alojamiento[] = [];
  sitios: Sitio[] = [];

  nuevoAlojamiento: AlojamientoCreate = {
    nombre: '',
    tipo: '',
    capacidad: 0,
    sitioId: 0
  };

  modoEdicion = false;
  alojamientoIdEditando: number | null = null;
  guardando = false;

  mensaje = '';
  error = '';

  constructor(
    private alojamientosService: AlojamientosService,
    private sitiosService: SitiosService,
    private toastService: ToastService,
    private confirm: ConfirmDialogService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.cargarAlojamientos();
    this.cargarSitios();
  }

  cargarAlojamientos(): void {
    this.alojamientosService.getAll().subscribe({
      next: (response) => {
        this.alojamientos = response;
      },
      error: () => {
        this.toastService.show('Error al cargar alojamientos.', 'error');
      }
    });
  }

  cargarSitios(): void {
    this.sitiosService.getAll().subscribe({
      next: (response) => {
        this.sitios = response;
      },
      error: () => {
              this.toastService.show('Error al cargar sitios.', 'error');
      }
    });
  }

  guardarAlojamiento(): void {
    this.guardando = true;

    if (this.modoEdicion && this.alojamientoIdEditando !== null) {
      this.alojamientosService.update(this.alojamientoIdEditando, this.nuevoAlojamiento)
        .subscribe({
          next: () => {
            this.guardando = false;
            this.toastService.show('Alojamiento actualizado correctamente.', 'success');
            this.cancelarEdicion();
            this.cargarAlojamientos();
          },
          error: () => {
            this.guardando = false;
            this.toastService.show('Error al actualizar alojamiento.', 'error');
          }
        });

      return;
    }

    this.alojamientosService.create(this.nuevoAlojamiento).subscribe({
      next: () => {
        this.guardando = false;
        this.toastService.show('Alojamiento creado correctamente.', 'success');
        this.cancelarEdicion();
        this.cargarAlojamientos();
      },
      error: () => {
        this.guardando = false;
        this.toastService.show('Error al crear alojamiento.', 'error');
      }
    });
  }

  editarAlojamiento(alojamiento: Alojamiento): void {
    this.modoEdicion = true;
    this.alojamientoIdEditando = alojamiento.id;

    this.nuevoAlojamiento = {
      nombre: alojamiento.nombre,
      tipo: alojamiento.tipo,
      capacidad: alojamiento.capacidad,
      sitioId: alojamiento.sitioId
    };
  }

 async eliminarAlojamiento(id: number): Promise<void> {
  const confirmado = await this.confirm.confirm({
    title: 'Eliminar alojamiento',
    message: '¿Deseas eliminar este alojamiento? Esta acción no se puede deshacer.',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'danger'
  });

  if (!confirmado) return;

  this.loadingService.show('Eliminando alojamiento...');

  this.alojamientosService.delete(id).subscribe({
    next: () => {
      this.loadingService.hide();
      this.toastService.success('Alojamiento eliminado correctamente.');

      this.alojamientos = this.alojamientos.filter(x => x.id !== id);

      this.cargarAlojamientos();
    },
    error: () => {
      this.loadingService.hide();
      this.toastService.error('No fue posible eliminar el alojamiento.');
    }
  });
}

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.alojamientoIdEditando = null;

    this.nuevoAlojamiento = {
      nombre: '',
      tipo: '',
      capacidad: 0,
      sitioId: 0
    };
  }

  obtenerNombreSitio(sitioId: number): string {
    const sitio = this.sitios.find(x => x.id === sitioId);
    return sitio ? sitio.nombre : 'Sin sitio';
  }
  obtenerCapacidadTotal(): number {
  return this.alojamientos.reduce((total, alojamiento) => total + alojamiento.capacidad, 0);
}

obtenerTotalPorSitio(sitioId: number): number {
  return this.alojamientos.filter(x => x.sitioId === sitioId).length;
}
}