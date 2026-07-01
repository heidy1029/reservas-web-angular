import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  rol: string;
  estado: string;
  ultimoAcceso: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/Usuarios`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.map(user => this.mapToFrontend(user)))
    );
  }

  create(model: any): Observable<Usuario> {
    const requestBody = {
      nombre: `${model.nombre} ${model.apellido}`.trim(),
      email: model.correo,
      usuario: model.usuario,
      password: model.password,
      rol: model.rol
    };
    return this.http.post<any>(this.apiUrl, requestBody).pipe(
      map(user => this.mapToFrontend(user))
    );
  }

  update(id: string, model: any): Observable<void> {
    const requestBody = {
      nombre: `${model.nombre} ${model.apellido}`.trim(),
      email: model.correo,
      usuario: model.usuario,
      rol: model.rol,
      estado: model.estado
    };
    return this.http.put<void>(`${this.apiUrl}/${id}`, requestBody);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapToFrontend(user: any): Usuario {
    const nombreCompleto = user.nombre || '';
    const firstSpaceIndex = nombreCompleto.indexOf(' ');
    let nombre = nombreCompleto;
    let apellido = '';
    
    if (firstSpaceIndex !== -1) {
      nombre = nombreCompleto.substring(0, firstSpaceIndex);
      apellido = nombreCompleto.substring(firstSpaceIndex + 1);
    }

    return {
      id: user.id,
      nombre: nombre,
      apellido: apellido,
      correo: user.email,
      usuario: user.usuario,
      rol: user.rol,
      estado: user.estado,
      ultimoAcceso: user.ultimoAcceso
    };
  }
}
