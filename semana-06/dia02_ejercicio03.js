const cargaDashboard = (dato, tiempo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ datos: dato }), tiempo);
  });
};

//1. Con await secuencial (mide el tiempo total con `console.time`)

console.time("tiempo total");
cargaDashboard("Lista de expediciones", 1200)
  .then((resultado) => {
    console.log(resultado);
    return cargaDashboard("Total de reservas del mes", 800);
  })
  .then((resultado) => {
    console.log(resultado);
    return cargaDashboard("Ingresos del trimestre", 1000);
  })
  .then((resultado) => {
    console.log(resultado);
    console.timeEnd("tiempo total");
  })
  .catch((error) => {
    console.log(error);
  });

//2. Con `Promise.all` (mide el tiempo total)

const promesa1 = new Promise((resolve) => setTimeout(() => resolve("Lista de expediciones"), 1200));
const promesa2 = new Promise((resolve) =>
  setTimeout(() => resolve("Total de reservas del mes"), 800)
);
const promesa3 = new Promise((resolve) =>
  setTimeout(() => resolve("Ingresos del trimestre"), 1000)
);

console.time("tiempo");
Promise.all([promesa1, promesa2, promesa3]).then(([p1, p2, p3]) => {
  console.log(p1);
  console.log(p2);
  console.log(p3);
  console.timeEnd("tiempo");
});
