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

//**2. `filtrarExpediciones(expediciones, { tipo, dificultad, precioMax = Infinity })`**

const expediciones = [
  { nombre: "Cruce Los Andes", tipo: "trekking", dificultad: "alta", precioBase: 280000 },
  { nombre: "Lago Llanquihue", tipo: "kayak", dificultad: "media", precioBase: 195000 },
  { nombre: "Reserva Nonguén", tipo: "trekking", dificultad: "baja", precioBase: 45000 }
];


let filtrarExpediciones = (expediciones, { tipo, dificultad, precioMax = Infinity }) => {return expediciones.filter((exp) => (!tipo || exp.tipo === tipo) &&
    (!dificultad || exp.dificultad === dificultad) &&
    exp.precioBase <= precioMax);
  }

  filtrarExpediciones(expediciones, {});