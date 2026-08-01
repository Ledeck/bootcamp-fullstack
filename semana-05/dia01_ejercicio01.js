function cuadrado(n) {
  return n * n;
}

const cuadrado = (n) => n * n;

function esPar(n) {
  return n % 2 === 0;
}
const esPar = (n) => n % 2 === 0;

function saludar(nombre, saludo) {
  return saludo + ", " + nombre + "!";
}

const saludar = (nombre, saludo) => `${saludo}, ${nombre}!`;

function mayorDeTres(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= c) return b;
  return c;
}

const mayorDeTres = (a, b, c) => {
  if (a >= b && a >= c) return a;
  if (b >= c) return b;
  return c;
};
