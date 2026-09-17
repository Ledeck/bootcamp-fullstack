const validarTarjeta = async (numero) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (String(numero).length < 16) {
    const error = new Error("el número tiene menos de 16 digitos");
    error.paso = "validacion";
    throw error;
  }
  return { valida: true, numero };
};

const verificarFondos = async (monto) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (monto > 500000) {
    const error = new Error("monto mayor a máximo permitido");
    error.paso = "fondos";
    throw error;
  }
  return monto;
};

const procesarPago = async (datos) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `TRX-${Date.now()}`;
};

const realizarPago = async (numeroTarjeta, monto) => {
  try {
    const tarjeta = await validarTarjeta(numeroTarjeta);
    const fondos = await verificarFondos(monto);
    const procesar = await procesarPago({ numeroTarjeta, monto });
    return { tarjeta, fondos, procesar };
  } catch (error) {
    if (error.paso === "validacion") {
      console.error(`Revisa el número de tarjeta,`, error.message);
    } else if (error.paso === "fondos") {
      console.error(`Intenta otro medio,`, error.message);
    } else {
      console.error("Error inesperado");
    }
    return null;
  } finally {
    console.log("Proceso de pago finalizado");
  }
};

realizarPago("1234567890123456", 100000);
