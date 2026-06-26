export interface CrearReservaRequest {
  sitioId: number;
  alojamientoId: number;
  fechaLlegada: string;
  fechaSalida: string;
  numeroPersonas: number;
  numeroHabitaciones: number;
  nombreHuesped: string;
  documentoHuesped: string;
  telefonoHuesped: string;
  correoHuesped: string;
}