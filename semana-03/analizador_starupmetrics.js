let transacciones = [
  { id: 1, producto: "Plan Básico", monto: 29000, region: "RM", mes: "enero" },
  { id: 2, producto: "Plan Pro", monto: 79000, region: "Valparaíso", mes: "enero" },
  { id: 3, producto: "Plan Básico", monto: 29000, region: "RM", mes: "febrero" },
  { id: 4, producto: "Plan Enterprise", monto: 199000, region: "RM", mes: "enero" },
  { id: 5, producto: "Plan Pro", monto: 79000, region: "Biobío", mes: "febrero" },
  { id: 6, producto: "Plan Básico", monto: 29000, region: "Valparaíso", mes: "febrero" },
  { id: 7, producto: "Plan Enterprise", monto: 199000, region: "RM", mes: "marzo" },
  { id: 8, producto: "Plan Pro", monto: 79000, region: "RM", mes: "marzo" },
  { id: 9, producto: "Plan Básico", monto: 29000, region: "Biobío", mes: "marzo" },
  { id: 10, producto: "Plan Pro", monto: 79000, region: "RM", mes: "enero" }
];

let montos = transacciones.reduce(function (suma, transaccion) {
  return suma + transaccion.monto;
}, 0);

let promedio = montos / transacciones.length;

let transaccionesRM = transacciones.filter(function (regiones) {
  return regiones.region === "RM";
});

let planesEnterprise = transacciones.filter(function (planes) {
  return planes.producto === "Plan Enterprise";
});

let montosConIva = transacciones.map(function (transaccion) {
  return transaccion.monto * 1.19;
});

let mayorMonto = transacciones.reduce(function (acumulador, transaccion) {
  if (acumulador.monto > transaccion.monto) {
    return acumulador;
  }
  return transaccion;
}, transacciones[0]);

let transaccionesEnero = transacciones.filter(function (meses) {
  return meses.mes === "enero";
});

let totalVentasEnero = transaccionesEnero.reduce(function (total, valor) {
  return total + valor.monto;
}, 0);

console.log(`=== STARTUPMETRICS — REPORTE DE VENTAS ===
Total ingresos: $${montos.toLocaleString("es-CL")}
Promedio por transacción: $${promedio.toLocaleString("es-CL")}
Transacciones RM: ${transaccionesRM.length}
Plan Enterprise: ${planesEnterprise.length} transacciones
Mayor venta: ${mayorMonto.producto} - $${mayorMonto.monto.toLocaleString("es-CL")} (id: ${mayorMonto.id})
Ventas Enero: ${transaccionesEnero.length} transacciones - Total: $${totalVentasEnero.toLocaleString("es-CL")}`);
