import { obtenerConCache } from "./cliente.js";

export async function cargarDashboard() {
  const [guias, reportes, todos] = await Promise.all([
    obtenerConCache(`https://jsonplaceholder.typicode.com/users`),
    obtenerConCache(`https://jsonplaceholder.typicode.com/posts`),
    obtenerConCache(`https://jsonplaceholder.typicode.com/todos`)
  ]);

  const tareasPendientes = todos.filter((todo) => todo.completed === false);
  return { guias, reportes, tareasPendientes };
}

export async function obtenerReporteGuia(guiaId) {
  const [datosGuia, reportesGuia] = await Promise.all([
    obtenerConCache(`https://jsonplaceholder.typicode.com/users/${guiaId}`),
    obtenerConCache(`https://jsonplaceholder.typicode.com/posts?userId=${guiaId}`)
  ]);
  return { datosGuia, reportesGuia };
}
