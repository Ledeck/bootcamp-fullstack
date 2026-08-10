export function crearReserva(cliente, expedicionId, personas) {
  return { cliente, expedicionId, personas, fecha: new Date().toLocaleDateString("es-CL") };
}

export function confirmarReserva(reserva) {
  return { ...reserva, estado: "confirmada" };
}
