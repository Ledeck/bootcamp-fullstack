// 1. `formatearDinero({ monto, moneda = "CLP", decimales = 0 })` — retorna el monto formateado

let formatearDinero = ({ monto, moneda = "CLP", decimales = 0 }) =>
  `${monto.toLocaleString("es-CL", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
    style: "currency",
    currency: moneda
  })} ${decimales} decimales`;

let resultado = formatearDinero({ monto: 450000, moneda: "USD", decimales: 2 });
console.log(resultado);
