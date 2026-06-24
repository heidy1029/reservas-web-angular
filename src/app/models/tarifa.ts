export interface Tarifa {
  id: number;
  sitioId: number;
  sitio: string;
  alojamientoId?: number;
  alojamiento?: string;
  temporadaId: number;
  temporada: string;
  numeroPersonasDesde: number;
  numeroPersonasHasta: number;
  valorNoche: number;
  valorPersonaAdicional: number;
  activa: boolean;
}