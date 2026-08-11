export const esEmailValido = (email) => email.includes("@") && email.includes(".");

export const esContrasenaSegura = (password) => password.length >= 8;

export const esRutChileno = (rut) => {
  const validacionLongitud = [9, 10].includes(rut.length);
  const digitoVerificador = rut.slice(-1);
  const guion = rut.slice(-2, -1);

  return (
    validacionLongitud &&
    (!isNaN(Number(digitoVerificador)) || digitoVerificador.toLowerCase() === "k") &&
    guion === "-"
  );
};

export const esTelefonoChileno = (tel) => tel.startsWith("+56") && tel.length === 11;

export const validarCampos = (objeto, camposRequeridos) =>
  camposRequeridos.every((campo) => objeto[campo] !== "" && objeto[campo] !== undefined);
