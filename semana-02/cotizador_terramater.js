let nombreCliente = prompt("Ingresa tu nombre");
if (nombreCliente === null || nombreCliente === "") nombreCliente = "Cliente";

let tipoActividad = prompt(
  "Ingresa el tipo de expedición que requieres: Trekking / Kayak / Escalada ",
);
if (tipoActividad === null) tipoActividad = "";

let numeroPersonas = Number(prompt("Para cuantas personas quieres cotizar?"));

function obtenerPrecio(actividad) {
  let actividadNormalizada = actividad.toLowerCase();

  if (actividadNormalizada === "trekking") {
    return 45000;
  } else if (actividadNormalizada === "kayak") {
    return 65000;
  } else if (actividadNormalizada === "escalada") {
    return 80000;
  }
  return undefined;
}

function obtenerDescuento(personas) {
  if (personas < 5) {
    return 0;
  } else if (personas < 10) {
    return 10 / 100;
  } else if (personas >= 10) {
    return 20 / 100;
  }
  return undefined;
}

function calcularTotal(valorPrecioBase, personas, porcentajeDescuento) {
  return (
    valorPrecioBase * personas -
    valorPrecioBase * personas * porcentajeDescuento
  );
}

let precioBase = obtenerPrecio(tipoActividad);

let subTotal = precioBase * numeroPersonas;
let descuento = obtenerDescuento(numeroPersonas);
let total = calcularTotal(precioBase, numeroPersonas, descuento);
let menosDescuento = subTotal * descuento;

alert(`=== TERRAMATER EXPEDICIONES ===
=== COTIZACIÓN OFICIAL ===
Cliente: ${nombreCliente}
Expedición:${tipoActividad}
Personas:${numeroPersonas}
Precio por persona: $${precioBase.toLocaleString("es-CL")}
Subtotal: $${subTotal.toLocaleString("es-CL")} 
Descuento: -$${menosDescuento.toLocaleString("es-CL")}
________________________________
TOTAL: $${total.toLocaleString("es-CL")}
       
Válido por 7 días.
¡Gracias por elegir TerraMater!`);
