let estudiantes = ["Ana", "Pedro", "María", "Juan", "Sofía"];

estudiantes.forEach(function (nombre, i) {
  if (nombre.endsWith("a")) {
    console.log(
      `¡Hola ${nombre}! Bienvenida al bootcamp. Eres la estudiante número ${i + 1}.`,
    );
  } else {
    console.log(
      `¡Hola ${nombre}! Bienvenido al bootcamp. Eres el estudiante número ${i + 1}.`,
    );
  }
});
console.log(estudiantes);
