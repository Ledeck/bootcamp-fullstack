let precios = {
  trekking: 45000,
  kayak: 65000,
  escalada: 80000,
  cicloturismo: 35000,
  rafting: 55000
};

Object.entries(precios).forEach(function (valor) {
  if (valor[1] > 50000) {
    console.log(`${valor[0]}: ${valor[1]}`);
  }
});

let total = Object.values(precios).reduce(function (acc, valor) {
  return acc + valor;
}, 0);

console.log(total);

let promedio = total / Object.values(precios).length;
console.log(`El precio promedio de todas las actividades es: ${promedio}`);

let actividadMasCara = Object.entries(precios).reduce(function (acc, valor) {
  if (acc[1] > valor[1]) {
    return acc;
  }
  return valor;
}, Object.entries(precios)[0]);

console.log(`${actividadMasCara[0]}: ${actividadMasCara[1]}`);
