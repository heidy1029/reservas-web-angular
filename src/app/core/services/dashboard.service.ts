import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DashboardResumen } from '../../models/dashboard-resumen';
import { UltimaReserva } from '../../models/ultima-reserva';
import { ProximaLlegada } from '../../models/proxima-llegada';
import { ReservaMensual } from '../../models/reserva-mensual';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'https://localhost:7079/api/Dashboard';

  constructor(private http: HttpClient) { }

  getResumen(): Observable<DashboardResumen> {
    return this.http.get<DashboardResumen>(`${this.api}/resumen`);
  }

  getUltimasReservas(): Observable<UltimaReserva[]> {
    return this.http.get<UltimaReserva[]>(`${this.api}/ultimas-reservas`);
  }

  getProximasLlegadas(): Observable<ProximaLlegada[]> {
    return this.http.get<ProximaLlegada[]>(`${this.api}/proximas-llegadas`);
  }

  getReservasMensuales(): Observable<ReservaMensual[]> {
    return this.http.get<ReservaMensual[]>(`${this.api}/reservas-mensuales`);
  }
}