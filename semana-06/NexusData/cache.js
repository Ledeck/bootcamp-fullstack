const cache = new Map();

export function guardarEnCache(clave, datos, ttlSegundos) {
  const expiracion = Date.now() + ttlSegundos * 1000;

  cache.set(clave, { datos: datos, expiracion: expiracion });
}

export function obtenerDeCache(clave) {
  const entrada = cache.get(clave);
  if (entrada === undefined) {
    return null;
  }

  return entrada.datos;
}

export function invalidarCache(clave) {
  cache.delete(clave);
}

export function listarCache() {
  const entradas = [...cache.entries()];

  const entradasActivas = entradas.filter((entrada) => entrada[1].expiracion > Date.now());

  const listaUrl = entradasActivas.map((entrada) => [
    entrada[0],
    (entrada[1].expiracion - Date.now()) / 1000
  ]);

  return listaUrl;
}
