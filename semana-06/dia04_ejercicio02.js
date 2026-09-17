const buscarUsuarioPorEmail = async (email) => {
  try {
    const respuestaUser = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuestaUser.ok) {
      throw new Error(`Error HTTP (USERS): ${respuestaUser.status}`);
    }
    const datosUser = (await respuestaUser.json()).find(
      (user) => email.toLowerCase() === user.email.toLowerCase()
    );

    if (datosUser === undefined) return null;
    const respuestaPost = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${datosUser.id}`
    );
    if (!respuestaPost.ok) {
      throw new Error(`Error HTTP (POSTS): ${respuestaPost.status}`);
    }
    const datosPost = await respuestaPost.json();

    return { usuario: datosUser, cantidadPosts: datosPost.length };
  } catch (error) {
    console.error(error.message);
  }
};

console.log(await buscarUsuarioPorEmail("Sincere@april.biz"));
console.log(await buscarUsuarioPorEmail("noexiste@test.com"));
