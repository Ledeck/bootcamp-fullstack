export function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

export function validarTelefono(telefono) {
  return telefono.length >= 8 && !isNaN(Number(telefono));
}
