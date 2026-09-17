const users = async () => {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) {
      throw new Error(`ERROR HTTP (USERS): ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(error.message);
  }
};

const posts = async () => {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!respuesta.ok) {
      throw new Error(`ERROR HTTP (POSTS): ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(error.message);
  }
};

const comments = async () => {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/comments");
    if (!respuesta.ok) {
      throw new Error(`ERROR HTTP (COMMENTS): ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(error.message);
  }
};

const [usuarios, post, comentarios] = await Promise.all([users(), posts(), comments()]);

const promedio = post.length / usuarios.length;

console.log(`
📊 Dashboard JSONPlaceholder
Usuarios: ${usuarios.length}
Post: ${post.length}
Comments: ${comentarios.length}
Promedio de posts por usuario: ${promedio}`);
