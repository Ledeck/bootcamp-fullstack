let estado = {
  cargando: false,
  datos: null,
  error: null
};

async function fetchJSON(url, opciones) {
  const respuesta = await fetch(url, opciones);

  if (!respuesta.ok) {
    const error = new Error(`Error HTTP ${respuesta.status}`);
    error.status = respuesta.status;
    throw error;
  }

  return respuesta.json();
}

async function cargarConEstado(url) {
  try {
    estado.cargando = true;
    estado.error = null;
    console.log(estado);
    const datos = await fetchJSON(url);
    estado.datos = datos;
    console.log(estado);
    return datos;
  } catch (error) {
    estado.error = error;
    console.log(estado);
  } finally {
    estado.cargando = false;
    console.log(estado);
  }
}

console.log(await cargarConEstado("https://jsonplaceholder.typicode.com/users/1234"));
