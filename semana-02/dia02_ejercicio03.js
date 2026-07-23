let edadPersona = Number(prompt("Dame tu edad para clasificarla"));

function clasificarEdad(edad) {
  if (edad < 12) {
    return "Niño";
  } else if (edad < 18) {
    return "Joven";
  } else if (edad < 65) {
    return "Adulto";
  } else {
    return "Senior";
  }
}

console.log(clasificarEdad(edadPersona));
