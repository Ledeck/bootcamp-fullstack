let ventas = [45000, 32000, 67000, 28000, 91000, 15000, 53000];

let total = ventas.reduce(function (resultado, precio) {
  return resultado + precio;
}, 0);

let promedio = Math.round(total / ventas.length);

console.log(`Total: $${total.toLocaleString("es-CL")}`);
console.log(`Promedio Ventas: $${promedio.toLocaleString("es-CL")}`);
