//función convertida, con Promise
const simularOperacion = (nombre, tiempoMs) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          operacion: nombre,
          completada: true
        }),
      tiempoMs
    );
  });
};

//Lo mismo pero utilizando promises en vez de callbacks, y encadenadas con .then()
simularOperacion("Autenticación", 500)
  .then((resultado) => {
    console.log(resultado.operacion);
    return simularOperacion("Carga de datos", 800);
  })
  .then((resultado) => {
    console.log(resultado.operacion);
    return simularOperacion("Renderizado", 200);
  })
  .then((resultado) => {
    console.log(resultado.operacion);
  })
  .catch((error) => {
    console.log(error);
  });
