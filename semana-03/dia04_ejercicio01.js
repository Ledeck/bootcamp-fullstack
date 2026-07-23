let numeros = [1, 7, 3, 12, 5, 18, 9, 24, 6, 15, 2, 20];
let mayoresA10 = numeros.filter(function (n) {
  return n > 10;
});
console.log(mayoresA10);

let pares = numeros.filter(function (p) {
  return p % 2 === 0;
});
console.log(pares);

let imparesMenoresA10 = numeros.filter(function (i) {
  return i < 10 && i % 2 !== 0;
});
console.log(imparesMenoresA10);
