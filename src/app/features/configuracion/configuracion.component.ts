import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {

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

  guardar() {

    this.mensaje = 'Configuración guardada correctamente.';

    setTimeout(() => {

      this.mensaje = '';

    }, 3000);

  }

}