import { Injectable } from '@angular/core';
import { ReservasService } from './reservas.service';
import { SitiosService } from './sitios.service';
import { AlojamientosService } from './alojamientos.service';
import { TarifasService } from './tarifas.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    public reservasService: ReservasService,
    public sitiosService: SitiosService,
    public alojamientosService: AlojamientosService,
    public tarifasService: TarifasService
  ) {}
}