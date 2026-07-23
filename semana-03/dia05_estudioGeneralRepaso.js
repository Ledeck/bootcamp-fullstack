let arr = [1, 2, 3, 4, 5];

let resultado = arr.reduce(function (acumulador, elemento) {
  return acumulador + elemento;
}, 0);

console.log(resultado); // 15

let temperaturas = [32, 18, 25, 40, 15, 28];

for (let temperatura of temperaturas) {
  if (temperatura > 25) {
    console.log(temperatura);
  }
}

let precios = [45000, 28000, 12000, 8500];

let nombres = ["Carpa", "Sleeping bag", "Linterna", "Brújula"];

nombres.forEach(function (nombre, indice) {
  console.log(`${indice + 1}. ${nombre} - $${precios[indice].toLocaleString("es-CL")}`);
});

let nombres = ["oscar", "ana", "pedro", "maría", "juan"];

let nombresEnMayusculas = nombres.map(function (nombre) {
  return `${nombre.toUpperCase()}!`;
});

console.log(nombresEnMayusculas);

let palabras = ["sol", "programación", "mar", "javascript", "paz", "developer"];

let palabras4Letras = palabras.filter(function (palabra) {
  return palabra.length > 4;
});

console.log(palabras4Letras);

let ventas = [45000, 32000, 67000, 28000, 91000, 15000, 53000];

let total = ventas.reduce(function (resultado, precio) {
  return resultado + precio;
}, 0);

let promedio = Math.round(total / ventas.length);

console.log(`$${total.toLocaleString("es-CL")}`);
console.log(`$${promedio.toLocaleString("es-CL")}`);
