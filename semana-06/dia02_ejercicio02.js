//1. `esperarSegundos(n)` — Promise que se resuelve después de `n` segundos con el mensaje `"Esperé ${n} segundos"`

const esperarSegundos = (n) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Esperé ${n} segundos`), n * 1000);
  });
};

esperarSegundos(3).then((resultado) => {
  console.log(resultado);
});

//2. `dividirSeguro(a, b)` — Promise que se resuelve con `a/b` si `b !== 0`, o se rechaza con `"División por cero"` si `b === 0`

const dividirSeguro = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b !== 0) {
      resolve(a / b);
    } else {
      reject("División por cero");
    }
  });
};

dividirSeguro(5, 0)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log(error);
  });

//3. `validarEdad(edad)` — Promise que se resuelve con `"Acceso permitido"` si edad >= 18, o se rechaza con `"Acceso denegado: menor de edad"` si no

const validarEdad = (edad) => {
  return new Promise((resolve, reject) => {
    if (edad < 18) return reject("Acceso denegado: menor de edad");
    resolve("Acceso permitido");
  });
};

validarEdad(15)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log(error);
  });
