let validador = {
  esEMail: function (texto) {
    if (texto.includes("@") && (texto.endsWith(".com") || texto.endsWith(".cl"))) {
      return true;
    }
    return false;
  },
  esContrasenaSegura: function (texto) {
    if (texto.length >= 8) {
      return true;
    }
    return false;
  },
  esMayorDeEdad: function (edad) {
    if (edad >= 18) {
      return true;
    }
    return false;
  }
};

validador.esEMail("ocastillo.cl@gmail.com");
validador.esEMail("ocastillo.cl");
validador.esContrasenaSegura("euppoqwekndhggayqioieyuwtgb");
validador.esContrasenaSegura("123");
validador.esMayorDeEdad(32);
validador.esMayorDeEdad(15);
