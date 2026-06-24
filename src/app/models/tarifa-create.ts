export interface TarifaCreate {
  sitioId: number;
  alojamientoId?: number | null;
  temporadaId: number;
  numeroPersonasDesde: number;
  numeroPersonasHasta: number;
  valorNoche: number;
  valorPersonaAdicional: number;
}