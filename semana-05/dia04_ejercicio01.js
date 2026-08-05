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
  return (nombre, tipo, dificultad, cupoMaximo, activa);
};

console.log(crearExpedicion("Torres del Paine"));
