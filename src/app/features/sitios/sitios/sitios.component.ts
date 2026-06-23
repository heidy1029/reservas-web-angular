import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SitiosService } from '../../../core/services/sitios.service';
import { Sitio } from '../../../models/sitio';
import { SitioCreate } from '../../../models/sitio';

@Component({
  selector: 'app-sitios',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  constructor(
    private sitiosService: SitiosService
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
  this.mensaje = '';
  this.error = '';

  if (this.modoEdicion && this.sitioIdEditando !== null) {
    this.sitiosService.update(this.sitioIdEditando, this.nuevoSitio).subscribe({
      next: () => {
        this.mensaje = 'Sitio actualizado correctamente.';
        this.cancelarEdicion();
        this.cargarSitios();
      },
      error: () => {
        this.error = 'Error al actualizar el sitio.';
      }
    });

    return;
  }

  this.sitiosService.create(this.nuevoSitio).subscribe({
    next: () => {
      this.mensaje = 'Sitio creado correctamente.';
      this.cancelarEdicion();
      this.cargarSitios();
    },
    error: () => {
      this.error = 'Error al crear el sitio.';
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
eliminarSitio(id: number): void {
  if (!confirm('¿Deseas eliminar este sitio?')) {
    return;
  }

  this.sitiosService.delete(id).subscribe({
    next: () => {
      this.mensaje = 'Sitio eliminado correctamente.';
      this.cargarSitios();
    },
    error: () => {
      this.error = 'Error al eliminar el sitio.';
    }
  });
}
}