import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlojamientosService } from '../../../core/services/alojamientos.service';
import { SitiosService } from '../../../core/services/sitios.service';

import { Alojamiento } from '../../../models/alojamiento';
import { AlojamientoCreate } from '../../../models/alojamiento-create';
import { Sitio } from '../../../models/sitio';

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

  mensaje = '';
  error = '';

  constructor(
    private alojamientosService: AlojamientosService,
    private sitiosService: SitiosService
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
        this.error = 'Error al cargar alojamientos.';
      }
    });
  }

  cargarSitios(): void {
    this.sitiosService.getAll().subscribe({
      next: (response) => {
        this.sitios = response;
      },
      error: () => {
        this.error = 'Error al cargar sitios.';
      }
    });
  }

  guardarAlojamiento(): void {
    this.mensaje = '';
    this.error = '';

    if (this.modoEdicion && this.alojamientoIdEditando !== null) {
      this.alojamientosService.update(this.alojamientoIdEditando, this.nuevoAlojamiento)
        .subscribe({
          next: () => {
            this.mensaje = 'Alojamiento actualizado correctamente.';
            this.cancelarEdicion();
            this.cargarAlojamientos();
          },
          error: () => {
            this.error = 'Error al actualizar alojamiento.';
          }
        });

      return;
    }

    this.alojamientosService.create(this.nuevoAlojamiento).subscribe({
      next: () => {
        this.mensaje = 'Alojamiento creado correctamente.';
        this.cancelarEdicion();
        this.cargarAlojamientos();
      },
      error: () => {
        this.error = 'Error al crear alojamiento.';
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

  eliminarAlojamiento(id: number): void {
    if (!confirm('¿Deseas eliminar este alojamiento?')) {
      return;
    }

    this.alojamientosService.delete(id).subscribe({
      next: () => {
        this.mensaje = 'Alojamiento eliminado correctamente.';
        this.cargarAlojamientos();
      },
      error: () => {
        this.error = 'Error al eliminar alojamiento.';
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
}