import {
  formatearCLP,
  calcularConIVA,
  calcularTotal,
  esEmailValido,
  esContrasenaSegura,
  validarCampos,
  agruparPor,
  unicos,
  paginar,
  capitalizar,
  truncar,
  contarPalabras
} from "./index.js";

console.log("--- precios ---");
console.log(formatearCLP(450000));
console.log(formatearCLP(calcularConIVA(100000)));
console.log(
  formatearCLP(
    calcularTotal([
      { precio: 10000, cantidad: 2 },
      { precio: 5000, cantidad: 1 }
    ])
  )
);

console.log("--- validaciones ---");
console.log(esEmailValido("ana@nexus.cl"));
console.log(esContrasenaSegura("12345678"));
console.log(validarCampos({ nombre: "Ana", email: "ana@nexus.cl" }, ["nombre", "email"]));

console.log("--- colecciones ---");
let expediciones = [
  { nombre: "Cruce Los Andes", tipo: "trekking" },
  { nombre: "Lago Llanquihue", tipo: "kayak" }
];
console.log(agruparPor(expediciones, "tipo"));
console.log(unicos([1, 2, 2, 3, 3, 3]));
console.log(paginar(["a", "b", "c", "d", "e"], 1, 2));

console.log("--- texto ---");
console.log(capitalizar("HOLA MUNDO"));
console.log(truncar("Este es un texto largo de verdad", 15));
console.log(contarPalabras("hola  mundo bonito"));
