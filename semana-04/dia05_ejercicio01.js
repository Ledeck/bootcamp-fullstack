let biblioteca = {
  libros: [
    { titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", año: 1954, leido: true },
    { titulo: "El Hobbit", autor: "J.R.R. Tolkien", año: 1937, leido: true },
    { titulo: "Dune", autor: "Frank Herbert", año: 1965, leido: true },
    { titulo: "El Mesías de Dune", autor: "Frank Herbert", año: 1969, leido: false },
    { titulo: "Fundación", autor: "Isaac Asimov", año: 1951, leido: false },
    { titulo: "Yo, Robot", autor: "Isaac Asimov", año: 1950, leido: true },
    { titulo: "Neuromante", autor: "William Gibson", año: 1984, leido: false },
    { titulo: "1984", autor: "George Orwell", año: 1949, leido: true },
    { titulo: "Rebelión en la Granja", autor: "George Orwell", año: 1945, leido: false },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", año: 1953, leido: true }
  ],
  buscarPorAutor: function (autor) {
    return biblioteca.libros.filter(function (libro) {
      return libro.autor === autor;
    });
  },

  librosLeidos: function () {
    return biblioteca.libros.filter(function (libro) {
      return libro.leido;
    }).length;
  },

  libroMasReciente: function () {
    return biblioteca.libros.reduce(function (acc, libro) {
      if (acc.año > libro.año) {
        return acc;
      }
      return libro;
    }, biblioteca.libros[0]);
  }
};

console.log(biblioteca.buscarPorAutor("J.R.R. Tolkien"));
console.log(biblioteca.librosLeidos());
console.log(biblioteca.libroMasReciente());
