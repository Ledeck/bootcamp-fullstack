export const IVA_CHILE = 0.19;

export const formatearCLP = (monto) => `$${monto.toLocaleString("es-CL")}`;

export const calcularConIVA = (precio, iva = IVA_CHILE) => Math.round(precio + precio * iva);

export const calcularDescuento = (precio, porcentaje = 0) => precio - precio * (porcentaje / 100);

export const calcularTotal = (items) => {
  let subTotal = items.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  return calcularConIVA(subTotal);
};
