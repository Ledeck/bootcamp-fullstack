//Crea una función `calcularDescuento` que reciba:

//- Un precio original
//- Un porcentaje de descuento

//Y **retorne** el precio final con el descuento aplicado.

let precio = Number(
  prompt("Dame un precio al cual quieras hacer el descuento"),
);
let descuento = Number(prompt("y ahora dame el descuento"));

function calcularDescuento(precioOriginal, porcentajeDescuento) {
  if (porcentajeDescuento < 0 || porcentajeDescuento > 100) {
    return "Error: El descuento debe estar entre 0 y 100";
  }

  let precioFinal =
    precioOriginal - precioOriginal * (porcentajeDescuento / 100);

  return precioFinal;
}

let resultado = calcularDescuento(precio, descuento);

console.log(resultado);
