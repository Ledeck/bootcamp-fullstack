import { obtenerDeCache, guardarEnCache } from "./cache.js";

export async function fetchJSON(url, opciones) {
  try {
    const timeOut = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout"));
      }, 5000);
    });

    const respuesta = await Promise.race([fetch(url, opciones), timeOut]);

    if (!respuesta.ok) {
      const error = new Error(`Error HTTP ${respuesta.status}`);
      error.status = respuesta.status;
      throw error;
    }

    return await respuesta.json();
  } catch (error) {
    if (error.message === "Timeout") {
      console.error("La API tardó demasiado");
    } else if (error.status) {
      console.error(`Error HTTP ${error.status}`);
    } else {
      console.error("Error de red u otro error");
    }
    throw error;
  }
}

export async function obtenerConCache(url, ttlSegundos = 60) {
  const resultado = obtenerDeCache(url);
  if (resultado !== null) {
    return resultado;
  }
  const datosNuevos = await fetchJSON(url);
  guardarEnCache(url, datosNuevos, ttlSegundos);
  return datosNuevos;
}
