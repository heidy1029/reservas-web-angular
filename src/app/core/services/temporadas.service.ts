import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Temporada } from '../../models/temporada';
import { TemporadaCreate } from '../../models/temporada-create';

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {

  private apiUrl = 'https://localhost:7079/api/Temporadas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Temporada[]> {
    return this.http.get<Temporada[]>(this.apiUrl);
  }

  create(model: TemporadaCreate): Observable<Temporada> {
    return this.http.post<Temporada>(this.apiUrl, model);
  }

  update(id: number, model: TemporadaCreate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}