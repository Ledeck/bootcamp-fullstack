let precios = [15000, 8500, 32000, 4200, 19800];
let preciosConIVA = precios.map(function (valor) {
  return valor * 1.19;
});
console.log(precios);
console.log(preciosConIVA);
