import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasService } from '../../../core/services/reservas.service';
import { ReservaListado } from '../../../models/reserva-listado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {

  reservas: ReservaListado[] = [];
  error = '';

  constructor(
    private reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservasService.getAll().subscribe({
      next: (response) => {
        this.reservas = response;
      },
      error: () => {
        this.error = 'Error al cargar reservas.';
      }
    });
  }
}