function calcularTotal(reserva) {
  return reserva.precioBase * reserva.personas;
}

function calcularTotal2({ precioBase, personas }) {
  return precioBase * personas;
}

function mostrarReserva(reserva) {
  console.log(`${reserva.cliente} — ${reserva.expedicion} — $${reserva.total}`);
}

function mostrarReserva2({ cliente, expedicion, total }) {
  console.log(`${cliente} - ${expedicion} - $${total}`);
}

function aplicarDescuento(config) {
  let descuento = config.porcentaje / 100;
  return config.precio - config.precio * descuento;
}

function aplicarDescuento2({ porcentaje, precio }) {
  let descuento = porcentaje / 100;
  return precio - precio * descuento;
}
