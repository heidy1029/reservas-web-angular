import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Sitio, SitioCreate } from '../../models/sitio';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  constructor(private http: HttpClient) {}

    getAll(): Observable<Sitio[]> {
  return this.http.get<Sitio[]>(`${environment.apiUrl}/Sitios`);
}

create(model: any) {
  return this.http.post(
    `${environment.apiUrl}/Sitios`,
    model
  );
  
}
update(id: number, model: SitioCreate): Observable<void> {
  return this.http.put<void>(
    `${environment.apiUrl}/Sitios/${id}`,
    model
  );
}

delete(id: number): Observable<void> {
  return this.http.delete<void>(
    `${environment.apiUrl}/Sitios/${id}`
  );
}
  }
