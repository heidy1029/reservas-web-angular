import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReservaListado } from '../../models/reserva-listado';
import { ReservaDetalle } from '../../models/reserva-detalle';

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
}