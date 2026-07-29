let expediciones = [
  {
    id: "EXP001",
    nombre: "Cruce Los Andes",
    tipo: "trekking",
    duracionDias: 5,
    precioBase: 280000,
    cupoMaximo: 12,
    dificultad: "alta"
  },
  {
    id: "EXP002",
    nombre: "Lago Llanquihue",
    tipo: "kayak",
    duracionDias: 3,
    precioBase: 195000,
    cupoMaximo: 8,
    dificultad: "media"
  },
  {
    id: "EXP003",
    nombre: "Torres del Paine",
    tipo: "trekking",
    duracionDias: 7,
    precioBase: 450000,
    cupoMaximo: 10,
    dificultad: "alta"
  },
  {
    id: "EXP004",
    nombre: "Río Futaleufú",
    tipo: "rafting",
    duracionDias: 2,
    precioBase: 150000,
    cupoMaximo: 15,
    dificultad: "alta"
  },
  {
    id: "EXP005",
    nombre: "Reserva Nonguén",
    tipo: "trekking",
    duracionDias: 1,
    precioBase: 45000,
    cupoMaximo: 20,
    dificultad: "baja"
  },
  {
    id: "EXP006",
    nombre: "Volcán Villarrica",
    tipo: "escalada",
    duracionDias: 2,
    precioBase: 320000,
    cupoMaximo: 6,
    dificultad: "alta"
  },
  {
    id: "EXP007",
    nombre: "Lago Conguillio",
    tipo: "kayak",
    duracionDias: 2,
    precioBase: 130000,
    cupoMaximo: 10,
    dificultad: "baja"
  },
  {
    id: "EXP008",
    nombre: "Atacama Extremo",
    tipo: "trekking",
    duracionDias: 6,
    precioBase: 520000,
    cupoMaximo: 8,
    dificultad: "alta"
  }
];

let reservas = [
  {
    id: "RES001",
    expedicionId: "EXP001",
    cliente: "Carlos Mendoza",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES002",
    expedicionId: "EXP003",
    cliente: "Ana Torres",
    personas: 4,
    estado: "confirmada",
    metodoPago: "transferencia"
  },
  {
    id: "RES003",
    expedicionId: "EXP001",
    cliente: "Pedro Soto",
    personas: 3,
    estado: "cancelada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES004",
    expedicionId: "EXP005",
    cliente: "María González",
    personas: 1,
    estado: "confirmada",
    metodoPago: "efectivo"
  },
  {
    id: "RES005",
    expedicionId: "EXP002",
    cliente: "Juan Pérez",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES006",
    expedicionId: "EXP006",
    cliente: "Sofía Ramírez",
    personas: 2,
    estado: "confirmada",
    metodoPago: "transferencia"
  },
  {
    id: "RES007",
    expedicionId: "EXP003",
    cliente: "Diego Fuentes",
    personas: 3,
    estado: "pendiente",
    metodoPago: "tarjeta"
  },
  {
    id: "RES008",
    expedicionId: "EXP008",
    cliente: "Valentina Cruz",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES009",
    expedicionId: "EXP001",
    cliente: "Andrés Morales",
    personas: 4,
    estado: "confirmada",
    metodoPago: "transferencia"
  },
  {
    id: "RES010",
    expedicionId: "EXP004",
    cliente: "Lucía Vega",
    personas: 5,
    estado: "confirmada",
    metodoPago: "efectivo"
  },
  {
    id: "RES011",
    expedicionId: "EXP005",
    cliente: "Roberto Silva",
    personas: 3,
    estado: "cancelada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES012",
    expedicionId: "EXP007",
    cliente: "Camila Herrera",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  }
];

// MÓDULO 1 — Catálogo de Expediciones

// **1.1** Lista todas las expediciones de tipo `"trekking"` ordenadas por precio de
// menor a mayor: .filter .sort

let expTrekkingOrdenadas = expediciones
  .filter(function (expedicion) {
    return expedicion.tipo === "trekking";
  })
  .sort(function (a, b) {
    return a.precioBase - b.precioBase;
  });

// **1.2** Encuentra la expedición más cara y la más económica del catálogo completo:

let expedicionMasCara = expediciones.reduce(function (acc, expedicion) {
  if (acc.precioBase > expedicion.precioBase) return acc;
  return expedicion;
}, expediciones[0]);

let expedicionMasEconomica = expediciones.reduce(function (acc, expedicion) {
  if (acc.precioBase < expedicion.precioBase) return acc;
  return expedicion;
}, expediciones[0]);

// **1.3** Calcula el precio promedio de todas las expediciones:

let totalPrecioExpediciones = expediciones.reduce(function (acc, expedicion) {
  return acc + expedicion.precioBase;
}, 0);

let promedioExpediciones = totalPrecioExpediciones / expediciones.length;

// **1.4** Lista las expediciones con dificultad `"alta"` que duren 3 días o menos:

let expedicionesDificultadAltaMenosTresDias = expediciones.filter(function (expedicion) {
  return expedicion.dificultad === "alta" && expedicion.duracionDias <= 3;
});

// ### MÓDULO 2 — Análisis de Reservas

// **2.1** Separa las reservas en tres grupos: confirmadas, pendientes y canceladas:

let reservasConfirmadas = reservas.filter(function (reserva) {
  return reserva.estado === "confirmada";
});

let reservasPendientes = reservas.filter(function (reserva) {
  return reserva.estado === "pendiente";
});

let reservasCanceladas = reservas.filter(function (reserva) {
  return reserva.estado === "cancelada";
});

// **2.2** Calcula el ingreso total generado por reservas confirmadas:

let ingresoPorExpedicion = reservasConfirmadas.map(function (reserva) {
  let expedicion = expediciones.find(function (exp) {
    return exp.id === reserva.expedicionId;
  });
  return reserva.personas * expedicion.precioBase;
});

let ingresoTotal = ingresoPorExpedicion.reduce(function (acc, ingreso) {
  return acc + ingreso;
}, 0);

// **2.3** Cuenta cuántas personas en total participarán en expediciones confirmadas.

let personasConfirmadas = reservasConfirmadas.reduce(function (acc, persona) {
  return acc + persona.personas;
}, 0);

// **2.4** Encuentra cuál es el método de pago más usado en reservas confirmadas.

let metodosPagoConfirmadas = reservasConfirmadas.reduce(function (acc, reserva) {
  let metodo = reserva.metodoPago;
  if (acc[metodo] === undefined) {
    acc[metodo] = 0;
  }
  acc[metodo] += 1;
  return acc;
}, {});

let metodoMasUsado = Object.keys(metodosPagoConfirmadas).reduce(function (acc, metodo) {
  if (metodosPagoConfirmadas[acc] > metodosPagoConfirmadas[metodo]) return acc;
  return metodo;
}, Object.keys(metodosPagoConfirmadas)[0]);

//**3.1** Para cada expedición, calcula cuántos cupos están ocupados (suma de personas en
// reservas confirmadas de esa expedición):

let cuposPorExpId = reservasConfirmadas.reduce(function (acc, reserva) {
  let expId = reserva.expedicionId;
  let nPersonas = reserva.personas;
  if (acc[expId] === undefined) {
    acc[expId] = 0;
  }
  acc[expId] += nPersonas;
  return acc;
}, {});

// **3.2** Identifica qué expediciones tienen el 50% o más de su cupo ocupado.

let exp50PorCientoMas = Object.keys(cuposPorExpId).filter(function (Id) {
  let cupos = expediciones.find(function (expedicion) {
    return expedicion.id === Id;
  }).cupoMaximo;

  return cuposPorExpId[Id] / cupos >= 0.5;
});

// **3.3** Identifica qué expediciones no tienen ninguna reserva confirmada.

let expedicionesSinReserva = expediciones.filter(function (exp) {
  return !(exp.id in cuposPorExpId);
});

// MÓDULO 4 — Reporte de Gerencia

//Nombre de la expedición con más ingresos generados:

let expedicionMasIngresos = Object.keys(cuposPorExpId).map(function(expId){
  let montoTotalPorExpedicion = expediciones.find(function(exp){
    return exp.id === expId;
  });
  return cuposPorExpId[expId]*expediciones.id;

});


console.log(`
=== TERRAMATER PRO — REPORTE EJECUTIVO ===
📋 CATÁLOGO
Expediciones disponibles: ${expediciones.length}
Precio promedio: $${promedioExpediciones.toLocaleString("es-CL")}
Más cara: ${expedicionMasCara.nombre} ($${expedicionMasCara.precioBase.toLocaleString("es-CL")}) 
Más económica: ${expedicionMasEconomica.nombre} ($${expedicionMasEconomica.precioBase.toLocaleString("es-CL")}) 
Expediciones de trekking: ${expTrekkingOrdenadas.length}

💰 INGRESOS
Reservas confirmadas: ${reservasConfirmadas.length}
Ingresos totales: $${ingresoTotal.toLocaleString("es-CL")}
Personas confirmadas: ${personasConfirmadas}  
Método de pago más usado: ${metodoMasUsado}

📊 OCUPACIÓN
Expediciones con 50%+ de ocupación: ${exp50PorCientoMas.length}
Expediciones sin reservas confirmadas: ${expedicionesSinReserva.length}

🏆 TOP EXPEDICIÓN
[nombre de la expedición con más ingresos generados]
Ingresos: $[monto]`);
