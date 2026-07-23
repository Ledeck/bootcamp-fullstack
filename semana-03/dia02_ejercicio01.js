//for Clásico

let productos = ["Carpa", "Sleeping bag", "Linterna", "Brújula", "Navaja"];

let item = "";
for (let i = 0; i < productos.length; i++) {
  item = `${item}${i + 1}.${productos[i]}, `;
}
console.log(item);

//for...of

let alerta = "";
let contador = 1;

for (let producto of productos) {
  if (contador < productos.length) {
    alerta = `${alerta}${contador}.${producto}, `;
  } else {
    alerta = `${alerta}${contador}.${producto}`;
  }
  contador = contador + 1;
}

console.log(alerta);

//forEach
let resultado = "";

productos.forEach(function (producto, index) {
  resultado = `${resultado}${index + 1}.${producto}, `;
});
console.log(resultado);
