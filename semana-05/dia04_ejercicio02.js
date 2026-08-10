// 1. `formatearDinero({ monto, moneda = "CLP", decimales = 0 })` — retorna el monto formateado

let formatearDinero = ({ monto, moneda = "CLP", decimales = 0 }) =>
  `${monto.toLocaleString("es-CL", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
    style: "currency",
    currency: moneda
  })}`;

formatearDinero({ monto: 450000 });

formatearDinero({ monto: 1234.567, decimales: 2 });

formatearDinero({ monto: 450000, moneda: "USD", decimales: 2 });

//**2. `filtrarExpediciones(expediciones, { tipo, dificultad, precioMax = Infinity })`**

const expediciones = [
  { nombre: "Cruce Los Andes", tipo: "trekking", dificultad: "alta", precioBase: 280000 },
  { nombre: "Lago Llanquihue", tipo: "kayak", dificultad: "media", precioBase: 195000 },
  { nombre: "Reserva Nonguén", tipo: "trekking", dificultad: "baja", precioBase: 45000 }
];

let filtrarExpediciones = (expediciones, { tipo, dificultad, precioMax = Infinity }) => {
  return expediciones.filter(
    (exp) =>
      (!tipo || exp.tipo === tipo) &&
      (!dificultad || exp.dificultad === dificultad) &&
      exp.precioBase <= precioMax
  );
};

filtrarExpediciones(expediciones, {});

filtrarExpediciones(expediciones, { tipo: "trekking" });

filtrarExpediciones(expediciones, { tipo: "trekking", precioMax: 100000 });

// **3. `generarResumen({ nombre, ventas = [], meta = 100000 })`**

const generarResumen = ({ nombre, ventas = [], meta = 100000 }) => {
  let totalVentas = ventas.reduce((suma, venta) => suma + venta, 0);

  let cumplioMeta = totalVentas >= meta;

  return { nombre, totalVentas: totalVentas, meta, cumplioMeta: cumplioMeta };
};

generarResumen({ nombre: "Ana", ventas: [40000, 35000, 50000] });

generarResumen({ nombre: "Luis" });
