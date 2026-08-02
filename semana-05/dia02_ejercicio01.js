let expedicion = {
  id: "EXP001",
  nombre: "Cruce Los Andes",
  tipo: "trekking",
  duracionDias: 5,
  precioBase: 280000,
  cupoMaximo: 12,
  dificultad: "alta",
  guia: {
    nombre: "Roberto Fuentes",
    certificacion: "UIAGM",
    experienciaAnios: 8
  }
};

// 1. Extrae `nombre`, `tipo` y `duracionDias` en variables locales

let { nombre, tipo, duracionDias } = expedicion;

// 2. Extrae `precioBase` pero guárdalo como `precio`

let { precioBase: precio } = expedicion;

// 3. Extrae `cupoMaximo` con valor por defecto de `10` si no existe

let { cupoMaximo = 10 } = expedicion;

// 4. Extrae el nombre del guía en una variable `nombreGuia` (destructuring anidado)

let {
  guia: { nombre: nombreGuia }
} = expedicion;

// 5. Escribe una función `describir({ nombre, dificultad, duracionDias })` que reciba
// el objeto expedición y muestre: `"Cruce Los Andes — Dificultad: alta — 5 días"`

let describir = ({ nombre, dificultad, duracionDias }) =>
  `${nombre} - Dificultad: ${dificultad} - ${duracionDias} días`;

console.log(describir(expedicion));
