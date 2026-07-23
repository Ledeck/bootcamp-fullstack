let precios = [15000, 8500, 32000, 4200, 19800, 7600, 25000];
for (let i = 0; i < precios.length; i++) {
  console.log(precios[i]);
}

let total = 0;

for (let i = 0; i < precios.length; i++) {
  total = total + precios[i];
}
console.log(`Total: ${total}`);

let promedio = total / precios.length;

console.log(`Promedio: ${promedio}`);

let precioMax = precios[0];

for (let i = 0; i < precios.length; i++) {
  if (precioMax < precios[i]) {
    precioMax = precios[i];
  }
}
console.log(`Precio más alto: ${precioMax}`);

let precioMin = precios[0];

for (let i = 0; i < precios.length; i++) {
  if (precioMin > precios[i]) {
    precioMin = precios[i];
  }
}
console.log(`Precio más bajo: ${precioMin}`);
