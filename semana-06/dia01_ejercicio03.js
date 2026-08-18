const simularOperacion = (nombre, tiempoMs, callback) => {
  setTimeout(() => {
    callback({ operacion: nombre, completada: true });
  }, tiempoMs);
};

// Callback hell
simularOperacion("Autenticación", 500, (resultado1) => {
  console.log(resultado1);

  if (resultado1.completada) {
    simularOperacion("Carga de datos", 800, (resultado2) => {
      console.log(resultado2);

      if (resultado2.completada) {
        simularOperacion("Renderizado", 200, (resultado3) => {
          console.log(resultado3);
          // Aquí se ve claramente el callback hell
        });
      }
    });
  }
});
