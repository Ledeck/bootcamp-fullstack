// 1. Obtén todos los usuarios y muestra: id, nombre y email de cada uno

const usuarios = async () => {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.error(error.message);
  }
};

const resultado = (await usuarios()).map((dato) => {
  return { id: dato.id, nombre: dato.name, email: dato.email };
});
console.log(resultado);

// 2. Obtén el usuario con id 3 y muestra todos sus datos

const usuario3 = async () => {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/3");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.error(error.message);
  }
};

const resultado2 = await usuario3();

console.log(resultado2);

// 3. Obtén los posts del usuario con id 1 y cuenta cuántos tiene

const usuario1 = async () => {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.error(error.message);
  }
};

console.log((await usuario1()).length);
