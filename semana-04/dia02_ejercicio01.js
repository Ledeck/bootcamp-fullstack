let conversor = {
  celsiusAFahrenheit: function (c) {
    return (c * 9) / 5 + 32;
  },

  fahrenheitACelsius: function (f) {
    return (f - 32) * (5 / 9);
  },

  kgALibras: function (kg) {
    return kg * 2.2046;
  },

  librasAKg: function (lb) {
    return lb * 0.4536;
  }
};

console.log(conversor.celsiusAFahrenheit(25));
console.log(conversor.fahrenheitACelsius(77));
console.log(conversor.kgALibras(10));
console.log(conversor.librasAKg(22.046));
