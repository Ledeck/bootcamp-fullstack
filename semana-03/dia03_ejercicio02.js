let nombres = ["oscar", "ana", "pedro", "maría", "juan"];

let nombresConMayuscula = nombres.map(function (nombre) {
  let textoMayuscula = `${nombre[0].toUpperCase()}`;

  for (let i = 1; i < nombre.length; i++) {
    textoMayuscula += `${nombre[i]}`;
  }
  return textoMayuscula;
});

console.log(nombresConMayuscula);
