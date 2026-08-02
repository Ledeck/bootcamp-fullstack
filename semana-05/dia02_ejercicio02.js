let top3Ventas = [891000, 654000, 432000];
let coordenadas = [33.4489, 70.6693]; // Santiago: [latitud, longitud]
let rgb = [255, 128, 0];

// 1. Extrae el primer y segundo lugar de ventas en variables `primero` y `segundo`

let [primero, segundo] = top3Ventas;

// 2. Extrae las coordenadas en variables `latitud` y `longitud`

let [latitud, longitud] = coordenadas;

// 3. Extrae solo el valor verde (posición 1) del array RGB en una variable `verde`

let [, verde] = rgb;

// 4. Intercambia los valores de `primero` y `segundo` usando destructuring
[primero, segundo] = [segundo, primero];
