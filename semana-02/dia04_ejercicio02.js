let contraseña = prompt("Ingresar contraseña: ");

function validarContraseña(n) {
  let largoContraseña = n.length;

  while (largoContraseña >= 8) {
    return true;
  }
  return false;
}
let passorNot = validarContraseña(contraseña);
console.log(passorNot);
