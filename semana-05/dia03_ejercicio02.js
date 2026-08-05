let configBase = {
  idioma: "es",
  moneda: "CLP",
  tema: "claro",
  notificaciones: true
};

let configUsuario = {
  tema: "oscuro",
  notificaciones: false
};

// 1. Crea `configFinal` combinando `configBase` con `configUsuario` (usuario sobreescribe base)

let configFinal = { ...configBase, ...configUsuario };

console.log(configFinal);

// 2. Crea `configSinNotificaciones` igual a `configFinal` pero con `notificaciones: false`

let configSinNotificaciones = { ...configFinal, notificaciones: false };

console.log(configSinNotificaciones);

// 3. Escribe una función `actualizarConfig(config, cambios)` que retorne la config actualizada sin modificar la original

let configuracion = {
  idioma: "es",
  moneda: "CLP",
  tema: "neonCat",
  notificaciones: true
};

let actualizacion = {
  tema: "amarillo",
  notificaciones: false
};

let actualiarConfig = (config, cambios) => ({ ...config, ...cambios });

console.log(actualiarConfig(configuracion, actualizacion));
