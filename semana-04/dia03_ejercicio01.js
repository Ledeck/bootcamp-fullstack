let inventario = {
  carpas: 8,
  bolsasDormir: 12,
  linternas: 25,
  brujulas: 6,
  cuerdas: 15
};

Object.keys(inventario).forEach(function (claves) {
  console.log(`${claves}`);
});

let total = Object.values(inventario).reduce(function (acc, valores) {
  return acc + valores;
}, 0);
console.log(total);

Object.entries(inventario).forEach(function (entrada) {
  console.log(`${entrada[0]}: ${entrada[1]}`);
});
