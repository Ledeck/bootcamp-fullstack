let celsius = [0, 15, 22, 30, 37, 100];

let fahrenheit = celsius.map(function (grados) {
  return grados * (9 / 5) + 32;
});

console.log(fahrenheit);
