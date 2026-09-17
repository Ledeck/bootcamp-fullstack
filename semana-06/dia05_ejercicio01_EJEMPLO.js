async function fetchJSON(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    const error = new Error(`Error HTTP ${respuesta.status}`);
    error.status = respuesta.status;
    throw error;
  }

  return respuesta.json();
}

async function conReintentos(fn, maxIntentos = 3, baseMs = 500) {
  for (let intento = 1; intento <= maxIntentos; intento++) {
    try {
      const resultado = await fn();
      return resultado;
    } catch (error) {
      console.error(`Falló intento ${intento}`);

      if (intento === maxIntentos) throw error;

      const espera = baseMs * 2 ** (intento - 1);

      await new Promise((resolve) => setTimeout(resolve, espera));
    }
  }
}
