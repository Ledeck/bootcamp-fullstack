let producto = { nombre: "Carpa", precio: 45000 };

function describir(objeto, clave) {
  if (clave in objeto) {
    return objeto[clave];
  }
  return "Propiedad no encontrada";
}

describir(producto, "precio");
