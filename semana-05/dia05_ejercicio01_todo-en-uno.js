const IVA = 0.19;
const DESCUENTO_GRUPO = 0.1;

function calcularPrecioConIVA(precio) {
  return Math.round(precio * (1 + IVA));
}

function calcularDescuentoGrupo(precio, personas) {
  if (personas >= 5) return Math.round(precio * (1 - DESCUENTO_GRUPO));
  return precio;
}

function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

function validarTelefono(telefono) {
  return telefono.length >= 8 && !isNaN(Number(telefono));
}

function crearReserva(cliente, expedicionId, personas) {
  return { cliente, expedicionId, personas, fecha: new Date().toLocaleDateString("es-CL") };
}

function confirmarReserva(reserva) {
  return { ...reserva, estado: "confirmada" };
}
