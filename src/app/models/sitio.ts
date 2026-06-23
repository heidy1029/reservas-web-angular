export interface Sitio {
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
  descripcion?: string;
  capacidadMaxima: number;
  activo: boolean;
}
export interface SitioCreate {
  nombre: string;
  tipo: string;
  ubicacion: string;
  descripcion: string;
  capacidadMaxima: number;
}