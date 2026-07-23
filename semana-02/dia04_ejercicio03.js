let nombreUsuario = prompt("Hola cómo te llamas?");

let horadelDia = Number(
  prompt("Me puedes decir la hora? Los primeros dos dígitos?"),
);

function generarSaludo(h) {
  if (h > 23 || h < 0) {
    return `Esa no es una hora correcta`;
  } else if (h <= 11) {
    return `Buenos días`;
  } else if (h <= 19) {
    return `Buenas tardes`;
  } else if (h <= 23) {
    return `Buenas noches`;
  }
}

let saludo = generarSaludo(horadelDia);

if (horadelDia > 23 || horadelDia < 0) {
  console.log(saludo);
} else {
  console.log(`${saludo}, ${nombreUsuario}`);
}
