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

const ordenarPor = (array, clave, ascendente = true) => {
  return [...array].sort((a, b) => {
    if (ascendente) {
      if (a[clave] < b[clave]) return -1;
      if (a[clave] > b[clave]) return 1;
      return 0;
    } else {
      if (a[clave] > b[clave]) return -1;
      if (a[clave] < b[clave]) return 1;
      return 0;
    }
  });
};

let items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

const paginar = (array, pagina = 1, porPagina = 10) => {
  return array.slice((inicio, fin) => {
    inicio = porPagina * (pagina - 1);
    fin = porPagina * pagina;
  });
};

paginar(items, 2, 5);
