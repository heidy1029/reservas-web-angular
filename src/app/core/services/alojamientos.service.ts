import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Alojamiento } from '../../models/alojamiento';
import { AlojamientoCreate } from '../../models/alojamiento-create';
import { ReservaDetalle } from '../../models/reserva-detalle';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alojamiento[]> {
    return this.http.get<Alojamiento[]>(
      `${environment.apiUrl}/Alojamientos`
    );
  }

  create(model: AlojamientoCreate): Observable<Alojamiento> {
    return this.http.post<Alojamiento>(
      `${environment.apiUrl}/Alojamientos`,
      model
    );
  }

  update(id: number, model: AlojamientoCreate): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/Alojamientos/${id}`,
      model
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/Alojamientos/${id}`
    );
  }

}