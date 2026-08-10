const IVA = 0.19;
const DESCUENTO_GRUPO = 0.1;

export function calcularPrecioConIVA(precio) {
  return Math.round(precio * (1 + IVA));
}

export function calcularDescuentoGrupo(precio, personas) {
  if (personas >= 5) return Math.round(precio * (1 - DESCUENTO_GRUPO));
  return precio;
}
