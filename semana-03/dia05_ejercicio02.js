let ventas = [45000, 32000, 67000, 28000, 91000, 15000, 53000];

let ventaMasAlta = ventas.reduce(function (acumulador, precio) {
  if (acumulador > precio) {
    return acumulador;
  }

  return precio;
}, ventas[0]);

console.log(`Venta más alta: ${ventaMasAlta.toLocaleString("es-CL")}`);

let ventaMasBaja = ventas.reduce(function (acumulador, precio) {
  if (acumulador < precio) {
    return acumulador;
  }
  return precio;
}, ventas[0]);

console.log(`Venta más baja: ${ventaMasBaja.toLocaleString("es-CL")}`);
