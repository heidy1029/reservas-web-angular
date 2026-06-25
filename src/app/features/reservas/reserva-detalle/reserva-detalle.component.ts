import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ReservasService } from '../../../core/services/reservas.service';
import { ReservaDetalle } from '../../../models/reserva-detalle';

@Component({
  selector: 'app-reserva-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reserva-detalle.component.html',
  styleUrl: './reserva-detalle.component.css'
})
export class ReservaDetalleComponent implements OnInit {

  reserva?: ReservaDetalle;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.reservasService.getById(id).subscribe({
      next: (response) => {
        this.reserva = response;
      },
      error: () => {
        this.error = 'No se pudo cargar la reserva.';
      }
    });
  }
}