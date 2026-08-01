//1. `calcularDescuento` — recibe precio y porcentaje, retorna el precio con descuento

let calcularDescuento = (precio, porcentaje) => precio - precio * (porcentaje / 100);

// 2. `esMayorDeEdad` — recibe edad, retorna true/false

let esMayorDeEdad = (edad) => edad >= 18;

// 3. `formatearPrecio` — recibe un número, retorna el string formateado con `toLocaleString("es-CL")`

let formatearPrecio = (numero) => numero.toLocaleString("es-CL");

// 4. `crearProducto` — recibe nombre y precio, retorna un objeto `{ nombre, precio, activo: true }`

let crearProducto = (nombre, precio) => ({ nombre: nombre, precio: precio, activo: true });
