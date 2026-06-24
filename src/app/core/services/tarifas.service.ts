import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Tarifa } from '../../models/tarifa';
import { TarifaCreate } from '../../models/tarifa-create';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  private apiUrl = `${environment.apiUrl}/Tarifas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.apiUrl);
  }

  create(model: TarifaCreate): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.apiUrl, model);
  }

  update(id: number, model: TarifaCreate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}