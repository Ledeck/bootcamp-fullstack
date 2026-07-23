let nombres = ["oscar", "ana", "pedro", "maría", "juan"];

let nombresConMayuscula = nombres.map(function (nombre) {
  let textoMayuscula = `${nombre[0].toUpperCase()}${nombre.slice(1)}`;

  return textoMayuscula;
});

console.log(nombresConMayuscula);
