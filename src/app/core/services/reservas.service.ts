import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReservaListado } from '../../models/reserva-listado';
import { ReservaDetalle } from '../../models/reserva-detalle';
import { AlojamientoDisponible } from '../../models/alojamiento-disponible';
import { CrearReservaRequest } from '../../models/crear-reserva-request';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = `${environment.apiUrl}/Reservas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ReservaListado[]> {
    return this.http.get<ReservaListado[]>(this.apiUrl);
  }
  getById(id: number): Observable<ReservaDetalle> {
  return this.http.get<ReservaDetalle>(
    `${this.apiUrl}/${id}`
  );
}
consultarDisponibilidad(
  sitioId: number,
  fechaLlegada: string,
  fechaSalida: string
): Observable<AlojamientoDisponible[]> {

  return this.http.get<AlojamientoDisponible[]>(
    `${this.apiUrl}/disponibilidad?sitioId=${sitioId}&fechaLlegada=${fechaLlegada}&fechaSalida=${fechaSalida}`
  );
}
crearReserva(request: CrearReservaRequest): Observable<any> {
  return this.http.post<any>(this.apiUrl, request);
}
confirmarReserva(id: number): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}/confirmar`, {});
}
cancelarReserva(id: number): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}/cancelar`, {});
}


}