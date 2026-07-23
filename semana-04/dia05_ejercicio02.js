let transacciones = [
  { id: 1, tipo: "ingreso", monto: 500000, categoria: "salario", mes: "enero" },
  { id: 2, tipo: "egreso", monto: 120000, categoria: "arriendo", mes: "enero" },
  { id: 3, tipo: "egreso", monto: 45000, categoria: "supermercado", mes: "enero" },
  { id: 4, tipo: "ingreso", monto: 80000, categoria: "freelance", mes: "enero" },
  { id: 5, tipo: "egreso", monto: 35000, categoria: "transporte", mes: "febrero" },
  { id: 6, tipo: "ingreso", monto: 500000, categoria: "salario", mes: "febrero" },
  { id: 7, tipo: "egreso", monto: 120000, categoria: "arriendo", mes: "febrero" },
  { id: 8, tipo: "egreso", monto: 55000, categoria: "supermercado", mes: "febrero" }
];

//1. Total de ingresos

let totalIngresos = transacciones
  .filter(function (transaccion) {
    return transaccion.tipo === "ingreso";
  })
  .reduce(function (acc, transaccion) {
    return acc + transaccion.monto;
  }, 0);

console.log(totalIngresos);

//2. Total de egresos

let totalEgresos = transacciones
  .filter(function (transaccion) {
    return transaccion.tipo === "egreso";
  })
  .reduce(function (acc, transaccion) {
    return acc + transaccion.monto;
  }, 0);

console.log(totalEgresos);

//3. Balance final (ingresos - egresos)

let balanceFinal = totalIngresos - totalEgresos;
console.log(balanceFinal);

//4. El egreso más alto y su categoría

let egresos = transacciones.filter(function (transaccion) {
  return transaccion.tipo === "egreso";
});

let egresoMasAlto = egresos.reduce(function (acc, transaccion) {
  if (acc.monto > transaccion.monto) return acc;
  return transaccion;
}, egresos[0]);

console.log(`Egreso más alto: ${egresoMasAlto.monto}
Categoría: ${egresoMasAlto.categoria}`);

//5. Total gastado en enero vs febrero

let gastosEnero = transacciones
  .filter(function (transaccion) {
    return transaccion.tipo === "egreso" && transaccion.mes === "enero";
  })
  .reduce(function (acc, transaccion) {
    return acc + transaccion.monto;
  }, 0);

let gastosFebrero = transacciones
  .filter(function (transaccion) {
    return transaccion.tipo === "egreso" && transaccion.mes === "febrero";
  })
  .reduce(function (acc, transaccion) {
    return acc + transaccion.monto;
  }, 0);

console.log(`Gastos Enero: $${gastosEnero}
Gastos Febrero: $${gastosFebrero}`);
