import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SitiosService } from '../../../core/services/sitios.service';
import { Sitio } from '../../../models/sitio';
import { SitioCreate } from '../../../models/sitio';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { LoadingService } from '../../../core/services/loading.service';
@Component({
  selector: 'app-sitios',
  standalone: true,
  imports: [CommonModule, FormsModule, 
    
  ],
  templateUrl: './sitios.component.html',
  styleUrl: './sitios.component.css'
})
export class SitiosComponent implements OnInit {

  sitios: Sitio[] = [];

  nuevoSitio: SitioCreate = {
    nombre: '',
    tipo: '',
    ubicacion: '',
    descripcion: '',
    capacidadMaxima: 0
  };

  mensaje = '';
  error = '';
  modoEdicion = false;
  sitioIdEditando: number | null = null;
  guardando = false;

  constructor(
    private sitiosService: SitiosService,
   private toast: ToastService,
     private confirm: ConfirmDialogService,
     private loadingService: LoadingService

  ) {}

  ngOnInit(): void {
    this.cargarSitios();
  }

  cargarSitios(): void {
    this.sitiosService.getAll().subscribe({
      next: (response) => {
        this.sitios = response;
      },
      error: (error) => {
        console.error(error);
        this.error = 'Error al cargar los sitios.';
      }
    });
  }

  guardarSitio(): void {
    this.guardando = true;

    if (this.modoEdicion && this.sitioIdEditando !== null) {
      this.sitiosService.update(this.sitioIdEditando, this.nuevoSitio).subscribe({
        next: () => {
          this.guardando = false;
          this.toast.success('Sitio actualizado correctamente.');
          this.cancelarEdicion();
          this.cargarSitios();
        },
        error: () => {
          this.guardando = false;
          this.toast.error('No fue posible actualizar el sitio.');
        }
      });

      return;
    }

    this.sitiosService.create(this.nuevoSitio).subscribe({
      next: () => {
        this.guardando = false;
        this.toast.success('Sitio creado correctamente.');
        this.cancelarEdicion();
        this.cargarSitios();
      },
      error: () => {
        this.guardando = false;
        this.toast.error('No fue posible crear el sitio.');
      }
    });
  }
  editarSitio(sitio: Sitio): void {
  this.modoEdicion = true;
  this.sitioIdEditando = sitio.id;

  this.nuevoSitio = {
    nombre: sitio.nombre,
    tipo: sitio.tipo,
    ubicacion: sitio.ubicacion,
    descripcion: sitio.descripcion ?? '',
    capacidadMaxima: sitio.capacidadMaxima
  };
}
obtenerCapacidadTotal(): number {
  return this.sitios.reduce((total, sitio) => total + sitio.capacidadMaxima, 0);
}
cancelarEdicion(): void {
  this.modoEdicion = false;
  this.sitioIdEditando = null;

  this.nuevoSitio = {
    nombre: '',
    tipo: '',
    ubicacion: '',
    descripcion: '',
    capacidadMaxima: 0
  };
}
async eliminarSitio(id: number): Promise<void> {

  const confirmado = await this.confirm.confirm({
    title: 'Eliminar sitio',
    message: '¿Deseas eliminar este sitio? Esta acción no se puede deshacer.',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'danger'
  });

  if (!confirmado) {
    return;
  }

  this.loadingService.show('Eliminando sitio...');

  this.sitiosService.delete(id).subscribe({
    next: () => {
      this.loadingService.hide();
      this.toast.success('Sitio eliminado correctamente.');
      this.cargarSitios();
    },
    error: () => {
      this.loadingService.hide();
      this.toast.error('No fue posible eliminar el sitio.');
    }
  });
}
}