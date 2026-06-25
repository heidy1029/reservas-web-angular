export interface ReservaDetalle {
  id: number;

  huesped: string;
  documentoHuesped: string;
  telefonoHuesped: string;
  correoHuesped: string;

  sitio: string;
  alojamiento: string;

  fechaReserva: string;
  fechaLlegada: string;
  fechaSalida: string;

  numeroPersonas: number;
  numeroHabitaciones: number;

  valorNoche: number;
  valorTotal: number;

  estado: string;
}