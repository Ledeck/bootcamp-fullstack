let numero = Number(prompt("Dame un número para multiplicarlo del 1 al 10"));

function tablaMultiplicar(n) {
  let tabla = "";

  for (let multiplicador = 1; multiplicador <= 10; multiplicador++) {
    let resultado = n * multiplicador;

    tabla = `${tabla}${n} X ${multiplicador} = ${resultado}\n`;
  }

  return tabla;
}

let tablaResultadofinal = tablaMultiplicar(numero);
console.log(tablaResultadofinal);
