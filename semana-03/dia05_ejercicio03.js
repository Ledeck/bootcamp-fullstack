let calificaciones = [6, 4, 7, 3, 5, 6, 2, 7, 4, 6, 5, 3, 7, 6, 4];

let aprobadosReprobados = calificaciones.reduce(
  function (contador, nota) {
    if (nota >= 4) {
      contador[0] += 1;
    }

    if (nota < 4) {
      contador[1] += 1;
    }
    return contador;
  },
  [0, 0],
);

console.log(`Aprobados: ${aprobadosReprobados[0]}
Reprobados: ${aprobadosReprobados[1]}`);
