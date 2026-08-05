let equipoA = ["Ana", "Pedro", "María"];
let equipoB = ["Juan", "Sofía", "Carlos"];
let nuevosIntegrantes = ["Lucía", "Diego"];

// 1. Crea un array `equipoCompleto` que combine ambos equipos

let equipoCompleto = [...equipoA, ...equipoB];

// 2. Crea un array `equipoAmpliado` con `equipoA` + los nuevos integrantes al final

let equipoAmpliado = [...equipoA, ...nuevosIntegrantes];

// 3. Crea una copia de `equipoA` y agrega "Roberto" sin modificar el original

let copiaEquipoA = [...equipoA, "Roberto"];

// 4. Encuentra el nombre más largo de `equipoCompleto` usando spread con `Math.max` y `.length`

let longitudNombres = equipoCompleto.map((nombres) => nombres.length);

let longitudMax = Math.max(...longitudNombres);

let nombreMasLargo = equipoCompleto.find((nombres) => nombres.length === longitudMax);

console.log(nombreMasLargo);
