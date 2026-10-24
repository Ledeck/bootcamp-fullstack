async function fetchJSON(url, opciones) {
  const respuesta = await fetch(url, opciones);

  if (!respuesta.ok) {
    const error = new Error(`Error HTTP ${respuesta.status}`);
    error.status = respuesta.status;
    throw error;
  }

  return respuesta.json();
}

//1. Obtener datos válidos de JSONPlaceholder

async function datosValidos(url, opciones) {
  try {
    const resultado = await fetchJSON(url, opciones);
    return resultado;
  } catch (error) {}
}

console.log(await datosValidos("https://jsonplaceholder.typicode.com/users"));

//2. Intentar obtener `https://jsonplaceholder.typicode.com/users/999` (no existe → 404)

console.log(await datosValidos("https://jsonplaceholder.typicode.com/users/999"));

//3. Manejar cada caso de error con un mensaje diferente

async function datosValidos(url, opciones) {
  try {
    const resultado = await fetchJSON(url, opciones);
    return resultado;
  } catch (error) {
    if (error.status === 404) {
      console.error("recurso no encontrado");
    } else if (error.status) {
      console.error("HTTP genérico");
    } else {
      console.error("Error de red u otro error");
    }
  }
}
