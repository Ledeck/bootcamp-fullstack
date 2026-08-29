//1. `esperarSegundos(n)` — Promise que se resuelve después de `n` segundos con el mensaje `"Esperé ${n} segundos"`

const esperarSegundos = async (n) => {
  await new Promise((resolve) => setTimeout(resolve, n * 1000));
  return `Esperé ${n} segundos`;
};

//2. `dividirSeguro(a, b)` — Promise que se resuelve con `a/b` si `b !== 0`, o se rechaza con `"División por cero"` si `b === 0`

const dividirSeguro = async (a, b) => {
  if (b === 0) throw new Error("División por cero");
  return a / b;
};

//3. `validarEdad(edad)` — Promise que se resuelve con `"Acceso permitido"` si edad >= 18, o se rechaza con `"Acceso denegado: menor de edad"` si no

const validarEdad = async (edad) => {
  if (edad < 18) throw new Error("Acceso denegado: menor de edad");
  return "Acceso permitido";
};

const procesarTodo = async (n, a, b, edad) => {
  try {
    const espera = await esperarSegundos(n);
    const dividir = await dividirSeguro(a, b);
    const anos = await validarEdad(edad);

    return { espera, dividir, anos };
  } catch (error) {
    console.error("Error al procesar todo", error.message);
  }
};

console.log(await procesarTodo(1, 7, 3, 15));
