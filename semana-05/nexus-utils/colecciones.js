export const agruparPor = (array, clave) => {
  return array.reduce((acc, elemento) => {
    let valorAgrupador = elemento[clave];
    if (acc[valorAgrupador] === undefined) {
      acc[valorAgrupador] = [];
    }
    acc[valorAgrupador].push(elemento);
    return acc;
  }, {});
};

export const ordenarPor = (array, clave, ascendente = true) => {
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

export const paginar = (array, pagina = 1, porPagina = 10) => {
  let inicio = porPagina * (pagina - 1);
  let fin = porPagina * pagina;
  return array.slice(inicio, fin);
};

export const unicos = (array) => array.filter((item, index) => index === array.indexOf(item));

export const combinar = (...array) => {
  let arrayCombinado = array.reduce((acc, arr) => [...acc, ...arr], []);

  return arrayCombinado.filter((item, index) => index === arrayCombinado.indexOf(item));
};

export const masFrecuente = (array) => {
  const conteo = array.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
};
