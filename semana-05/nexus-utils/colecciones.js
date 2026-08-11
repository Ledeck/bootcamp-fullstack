let expediciones = [
  { nombre: "Cruce Los Andes", tipo: "trekking", dificultad: "alta" },
  { nombre: "Lago Llanquihue", tipo: "kayak", dificultad: "media" },
  { nombre: "Reserva Nonguén", tipo: "trekking", dificultad: "baja" }
];

const agruparPor = (array, clave) => {
  return array.reduce((acc, elemento) => {
    let valorAgrupador = elemento[clave];
    if (acc[valorAgrupador] === undefined) {
      acc[valorAgrupador] = [];
    }
    acc[valorAgrupador].push(elemento);
    return acc;
  }, {});
};

const ordenarpor = (array, clave, (ascendente = true));
