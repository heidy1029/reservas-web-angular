import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
constructor(private toastService: ToastService) {}
  configuracion = {

    empresa: 'ElectroReserve SAS',
    nit: '901234567-8',
    correo: 'info@electroreserve.com',
    telefono: '3001234567',

    direccion: 'Cali, Colombia',

    moneda: 'COP',

    iva: 19,

    checkIn: '15:00',

    checkOut: '12:00',

    logo: ''

  };

  mensaje = '';

 guardar(): void {
  this.toastService.show('Configuración guardada correctamente.', 'success');
}

}