let nombreUsuario = prompt("Hola, cual es tu nombre");

function saludar(nombre) {
  let mensaje = `Hola, ${nombre}. Bienvenido al bootcamp.`;
  return mensaje;
}
console.log(saludar(nombreUsuario));
