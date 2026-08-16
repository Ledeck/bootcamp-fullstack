export const capitalizar = (texto) =>
  `${texto.slice(0, 1).toUpperCase()}${texto.slice(1).toLowerCase()}`;

export const capitalizarPalabras = (texto) => {
  let textoSeparado = texto.split(" ");
  let palabrasConMayuscula = textoSeparado.map(capitalizar);
  return palabrasConMayuscula.join(" ");
};

export const truncar = (texto, longitud = 100, sufijo = "...") => {
  if (texto.length > longitud) return `${texto.slice(0, longitud)}${sufijo}`;

  return `${texto}`;
};

export const slugify = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const contarPalabras = (texto) => {
  let arraySinFiltrar = texto.split(" ");
  let arrayFiltrado = arraySinFiltrar.filter((palabra) => palabra !== "");
  return arrayFiltrado.length;
};
