let contraseñaUsuario = prompt("Dame tu contraseña:");

if (contraseñaUsuario === null) {
  console.log(`Debes ingresar una contraseña, no presiones cancelar!`);
} else if (contraseñaUsuario === "") {
  console.log(`Error: no ingresaste nada`);
} else {
  function analizarFortaleza(n) {
    let pass = n.length;

    if (pass < 6) {
      return `Muy débil`;
    } else if (pass <= 7) {
      return `Débil`;
    } else if (pass <= 11) {
      return `Aceptable`;
    } else {
      return `fuerte`;
    }
  }

  let mensaje = analizarFortaleza(contraseñaUsuario);
  console.log(
    `Tu contraseña tiene ${contraseñaUsuario.length} caracteres y es: ${mensaje}`,
  );
}
