function crearExpedicion(nombre, tipo, dificultad, cupoMaximo, activa) {
  tipo = tipo || "trekking";
  dificultad = dificultad || "media";
  cupoMaximo = cupoMaximo !== undefined ? cupoMaximo : 10;
  activa = activa !== undefined ? activa : true;
  return { nombre, tipo, dificultad, cupoMaximo, activa };
}

// Escríbela con default parameters

let crearExpedicion = (
  nombre,
  tipo = "trekking",
  dificultad = "media",
  cupoMaximo = 10,
  activa = true
) => {
  return { nombre, tipo, dificultad, cupoMaximo, activa };
};

// 1. Solo con nombre
crearExpedicion("Torres del Paine");

// 2. Con nombre y tipo
crearExpedicion("Aconcagua", "avistamiento");

// 3. Con todos los parámetros
crearExpedicion("Atacama", "astronómica", "alta", 15, false);

// 4. Con dificultad = ""
crearExpedicion("Chiloé", "trekking", "");

// 5. Con cupoMaximo = 0
crearExpedicion("Torres del Paine", "trekking", "media", 0);
