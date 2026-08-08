# 📘 BOOTCAMP SEMANA 05

## ES6+ Moderno · Arrow Functions · Destructuring · Spread · Módulos

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_05.md` completa.
> **Recuerda:** Cuando termines cada día, avísame para validar antes de continuar.
>
> **Nota sobre esta semana:** ES6+ no introduce conceptos radicalmente nuevos.
> Introduce formas más concisas y expresivas de hacer lo que ya sabes.
> El objetivo no es reemplazar lo que aprendiste — es expandir tu vocabulario como developer.

---

## 🗓 DÍA 1 — ARROW FUNCTIONS

### 🎯 Objetivo

Dominar la sintaxis de arrow functions y entender cuándo usarlas y cuándo no.

---

### 📖 El problema que resuelven las arrow functions

Llevas semanas escribiendo callbacks dentro de `map`, `filter` y `reduce`:

```javascript0
let precios = [45000, 28000, 12000]

let preciosConIVA = precios.map(function(precio) {
    return precio * 1.19
})
```

Esa función anónima `function(precio) { return precio * 1.19 }` existe solo para hacer una cosa simple: multiplicar por 1.19. En código real, escribirás cientos de callbacks así. La cantidad de código que no aporta significado (la palabra `function`, las llaves, el `return`) empieza a dificultar la lectura.

Las arrow functions reducen el ruido visual en exactamente estos casos.

---

### 📖 La sintaxis paso a paso

**Paso 1 — Función tradicional:**

```javascript
function sumar(a, b) {
  return a + b;
}
```

**Paso 2 — Función anónima equivalente:**

```javascript
const sumar = function (a, b) {
  return a + b;
};
```

**Paso 3 — Arrow function (quitar `function`, agregar `=>`):**

```javascript
const sumar = (a, b) => {
  return a + b;
};
```

**Paso 4 — Return implícito (cuando el cuerpo es una sola expresión):**

```javascript
const sumar = (a, b) => a + b;
```

Todos los pasos producen exactamente la misma función. La diferencia es solo visual.

---

### 📖 Las tres variantes según los parámetros

```javascript
// Sin parámetros — paréntesis obligatorios
const saludar = () => "Hola mundo";

// Un parámetro — paréntesis opcionales (convención: omitirlos)
const doble = (n) => n * 2;

// Dos o más parámetros — paréntesis obligatorios
const sumar = (a, b) => a + b;
```

---

### 📖 Return implícito — la regla exacta

El return implícito funciona cuando el cuerpo de la función es **una sola expresión**. Si necesitas más de una línea, debes usar llaves y `return` explícito:

```javascript
// ✅ Una sola expresión — return implícito
const doble = (n) => n * 2;

// ✅ Varias líneas — llaves + return explícito
const procesarPrecio = (n) => {
  let conIVA = n * 1.19;
  return Math.round(conIVA);
};
```

**El caso especial de los objetos:**

Si quieres retornar un objeto con return implícito, debes envolverlo en paréntesis. Sin ellos, JavaScript interpreta las llaves `{}` como el cuerpo de la función, no como un objeto:

```javascript
// ❌ JavaScript lee esto como función con cuerpo vacío y label "nombre"
const crearUsuario = (nombre) => {
  nombre: nombre;
}; // retorna undefined

// ✅ Los paréntesis indican que las llaves son un objeto literal
const crearUsuario = (nombre) => ({ nombre: nombre }); // retorna { nombre: nombre }
```

---

### 📖 Arrow functions en map, filter y reduce

Aquí es donde las arrow functions brillan — exactamente en los callbacks que ya dominas:

```javascript
let precios = [45000, 28000, 12000];

// Antes
let preciosConIVA = precios.map(function (precio) {
  return precio * 1.19;
});

// Con arrow function
let preciosConIVA = precios.map((precio) => precio * 1.19);

// filter
let caros = precios.filter((precio) => precio > 20000);

// reduce
let total = precios.reduce((suma, precio) => suma + precio, 0);
```

La lógica es idéntica. El código es más legible porque el ruido visual desaparece y lo que queda es solo la transformación.

---

### 📖 Cuándo NO usar arrow functions

Las arrow functions tienen una diferencia técnica importante con las funciones tradicionales: **no tienen su propio `this`**. En cambio, heredan el `this` del contexto donde fueron creadas.

Para el nivel actual, esto significa una regla práctica concreta:

```javascript
// ❌ NO usar arrow functions como métodos de objetos
let calculadora = {
  valor: 0,
  sumar: (n) => {
    // this.valor no funciona como esperas aquí
  }
};

// ✅ Usar función tradicional como método de objeto
let calculadora = {
  valor: 0,
  sumar: function (n) {
    this.valor += n; // this funciona correctamente aquí
  }
};
```

Aprenderás el comportamiento completo de `this` cuando llegues a clases y programación orientada a objetos. Por ahora, la regla es: **métodos de objetos → función tradicional. Callbacks → arrow function.**

---

### 💼 Código real vs código de bootcamp

En código profesional moderno, casi todos los callbacks usan arrow functions:

```javascript
// Código de bootcamp (aprendizaje) — ambos correctos
let nombres = usuarios.map(function (u) {
  return u.nombre;
});

// Código profesional — más conciso
let nombres = usuarios.map((u) => u.nombre);

// Con múltiples operaciones
let reportes = ventas
  .filter((v) => v.estado === "confirmada")
  .map((v) => ({ id: v.id, monto: v.monto * 1.19 }))
  .reduce((total, v) => total + v.monto, 0);
```

---

### 🔗 Conexión con Next.js

En React/Next.js, las arrow functions son omnipresentes. Cada event handler, cada callback, cada componente funcional simple:

```javascript
// Event handler en React (Mes 4-5)
<button onClick={() => setContador(contador + 1)}>Incrementar</button>;

// Renderizar lista (Mes 4-5)
{
  productos.map((p) => <TarjetaProducto key={p.id} producto={p} />);
}

// Componente funcional simple (Mes 4)
const Titulo = ({ texto }) => <h1>{texto}</h1>;
```

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `dia01_ejercicio01.js`

Convierte estas funciones tradicionales a arrow functions. Mantén exactamente el mismo comportamiento:

```javascript
function cuadrado(n) {
  return n * n;
}

function esPar(n) {
  return n % 2 === 0;
}

function saludar(nombre, saludo) {
  return saludo + ", " + nombre + "!";
}

function mayorDeTres(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= c) return b;
  return c;
}
```

Prueba cada arrow function con al menos dos casos para verificar que funcionan igual.

---

**Ejercicio 2** — `dia01_ejercicio02.js`

Usa arrow functions en todos los métodos de array:

```javascript
let empleados = [
  { nombre: "Ana", salario: 1800000, depto: "Dev", activo: true },
  { nombre: "Pedro", salario: 1500000, depto: "Diseño", activo: true },
  { nombre: "María", salario: 2100000, depto: "Dev", activo: false },
  { nombre: "Juan", salario: 1300000, depto: "Marketing", activo: true },
  { nombre: "Sofía", salario: 1950000, depto: "Dev", activo: true }
];
```

Con arrow functions:

1. Filtra solo los empleados activos
2. Obtén un array con solo los nombres de los activos
3. Calcula el salario promedio de los activos
4. Encuentra el empleado activo con mayor salario

---

**Ejercicio 3** — `dia01_ejercicio03.js`

Escribe estas funciones directamente como arrow functions (no las conviertas — escríbelas desde cero):

1. `calcularDescuento` — recibe precio y porcentaje, retorna el precio con descuento
2. `esMayorDeEdad` — recibe edad, retorna true/false
3. `formatearPrecio` — recibe un número, retorna el string formateado con `toLocaleString("es-CL")`
4. `crearProducto` — recibe nombre y precio, retorna un objeto `{ nombre, precio, activo: true }`

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — DESTRUCTURING

### 🎯 Objetivo

Dominar el destructuring de arrays y objetos — una de las características más usadas en código React moderno.

---

### 📖 El problema que resuelve el destructuring

Con lo que sabes hasta ahora, extraer múltiples valores de un objeto o array requiere repetición:

```javascript
let usuario = {
  nombre: "Oscar",
  edad: 28,
  ciudad: "Penco",
  plan: "Pro"
};

// Sin destructuring — repetitivo
let nombre = usuario.nombre;
let edad = usuario.edad;
let ciudad = usuario.ciudad;
```

Si necesitas 5 propiedades, escribes `usuario.` cinco veces. El destructuring elimina esa repetición.

---

### 📖 Destructuring de objetos

```javascript
let usuario = { nombre: "Oscar", edad: 28, ciudad: "Penco" };

// Extrae propiedades por nombre de clave
let { nombre, edad } = usuario;
// nombre = "Oscar"
// edad = 28

// Equivale exactamente a:
let nombre = usuario.nombre;
let edad = usuario.edad;
```

**Renombrar al desestructurar:**

```javascript
// La clave del objeto es "nombre", la variable local será "nombreCompleto"
let { nombre: nombreCompleto, edad: años } = usuario;
// nombreCompleto = "Oscar"
// años = 28
```

**Valor por defecto:**

```javascript
let { nombre, telefono = "Sin teléfono" } = usuario;
// nombre = "Oscar"
// telefono = "Sin teléfono" (la propiedad no existe en el objeto)
```

**Destructuring en parámetros de función:**

Esta es la forma más común en React — en vez de recibir un objeto completo y acceder a sus propiedades dentro, las extraes directamente en la firma de la función:

```javascript
// Sin destructuring en parámetros
function mostrarUsuario(usuario) {
  console.log(`${usuario.nombre} — ${usuario.ciudad}`);
}

// Con destructuring en parámetros
function mostrarUsuario({ nombre, ciudad }) {
  console.log(`${nombre} — ${ciudad}`);
}

// Ambas se llaman igual
mostrarUsuario(usuario);
```

**Destructuring anidado:**

```javascript
let empresa = {
  nombre: "Nexus",
  sede: {
    ciudad: "Santiago",
    pais: "Chile"
  }
};

let {
  nombre,
  sede: { ciudad }
} = empresa;
// nombre = "Nexus"
// ciudad = "Santiago"
// Nota: "sede" no queda como variable — solo "ciudad"
```

---

### 📖 Destructuring de arrays

```javascript
let colores = ["rojo", "verde", "azul"];

// Extrae por posición
let [primero, segundo] = colores;
// primero = "rojo"
// segundo = "verde"
```

**Saltar elementos:**

```javascript
let [, , tercero] = colores;
// tercero = "azul" (los primeros dos se ignoran con comas vacías)
```

**Valor por defecto:**

```javascript
let numeros = [1, 2];
let [a, b, c = 0] = numeros;
// a = 1, b = 2, c = 0 (no hay tercer elemento)
```

**Intercambiar variables — el truco clásico:**

```javascript
let x = 1;
let y = 2;

// Sin destructuring — necesitas variable temporal
let temp = x;
x = y;
y = temp;

// Con destructuring — una sola línea
[x, y] = [y, x];
// x = 2, y = 1
```

---

### 📖 La diferencia clave entre destructuring de array y objeto

```
Array  → asigna por POSICIÓN — el primer elemento va a la primera variable
Objeto → asigna por NOMBRE   — el nombre de la variable debe coincidir con la clave
```

```javascript
let arr = [10, 20, 30];
let [a, b] = arr; // a=10 (posición 0), b=20 (posición 1)

let obj = { x: 10, y: 20 };
let { x, y } = obj; // x=10 (clave "x"), y=20 (clave "y")
let { y: valorY } = obj; // valorY=20 (clave "y", variable "valorY")
```

---

### 🔗 Conexión con Next.js

El destructuring es ubicuo en React. Los props de un componente son un objeto — siempre se desestructuran:

```javascript
// Sin destructuring — más verboso
function TarjetaProducto(props) {
  return (
    <div>
      {props.nombre} - ${props.precio}
    </div>
  );
}

// Con destructuring — estándar en React
function TarjetaProducto({ nombre, precio, categoria = "General" }) {
  return (
    <div>
      {nombre} - ${precio} ({categoria})
    </div>
  );
}

// useState retorna un array — siempre se desestructura
const [contador, setContador] = useState(0);
//     ^valor    ^función para actualizar
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — `dia02_ejercicio01.js`

Dado este objeto, usa destructuring para extraer las variables indicadas:

```javascript
let expedicion = {
  id: "EXP001",
  nombre: "Cruce Los Andes",
  tipo: "trekking",
  duracionDias: 5,
  precioBase: 280000,
  cupoMaximo: 12,
  dificultad: "alta",
  guia: {
    nombre: "Roberto Fuentes",
    certificacion: "UIAGM",
    experienciaAnios: 8
  }
};
```

1. Extrae `nombre`, `tipo` y `duracionDias` en variables locales
2. Extrae `precioBase` pero guárdalo como `precio`
3. Extrae `cupoMaximo` con valor por defecto de `10` si no existe
4. Extrae el nombre del guía en una variable `nombreGuia` (destructuring anidado)
5. Escribe una función `describir({ nombre, dificultad, duracionDias })` que reciba el objeto expedición y muestre: `"Cruce Los Andes — Dificultad: alta — 5 días"`

---

**Ejercicio 2** — `dia02_ejercicio02.js`

Usa destructuring de arrays:

```javascript
let top3Ventas = [891000, 654000, 432000];
let coordenadas = [33.4489, 70.6693]; // Santiago: [latitud, longitud]
let rgb = [255, 128, 0];
```

1. Extrae el primer y segundo lugar de ventas en variables `primero` y `segundo`
2. Extrae las coordenadas en variables `latitud` y `longitud`
3. Extrae solo el valor verde (posición 1) del array RGB en una variable `verde`
4. Intercambia los valores de `primero` y `segundo` usando destructuring

---

**Ejercicio 3** — `dia02_ejercicio03.js`

Reescribe estas funciones usando destructuring en los parámetros:

```javascript
// Versión actual — sin destructuring
function calcularTotal(reserva) {
  return reserva.precioBase * reserva.personas;
}

function mostrarReserva(reserva) {
  console.log(`${reserva.cliente} — ${reserva.expedicion} — $${reserva.total}`);
}

function aplicarDescuento(config) {
  let descuento = config.porcentaje / 100;
  return config.precio - config.precio * descuento;
}
```

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — SPREAD Y REST

### 🎯 Objetivo

Dominar el spread operator para copiar y combinar datos, y rest parameters para funciones con argumentos variables.

---

### 📖 El problema que resuelve el spread

Antes del spread, copiar o combinar arrays u objetos requería métodos específicos o bucles:

```javascript
let frutas = ["manzana", "pera"];
let verduras = ["lechuga", "tomate"];

// Combinar sin spread — verbose
let alimentos = frutas.concat(verduras);

// Copiar sin spread
let copia = frutas.slice();
```

El spread hace lo mismo con una sintaxis más clara y uniforme para arrays y objetos.

---

### 📖 Spread en arrays

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// Combinar
let combinado = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Con elementos adicionales
let extendido = [0, ...arr1, 3.5, ...arr2, 7];
// [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Copiar (nueva referencia)
let copia = [...arr1];
copia.push(99);
console.log(arr1); // [1, 2, 3] — sin cambios
console.log(copia); // [1, 2, 3, 99]
```

**En llamadas a funciones:**

```javascript
let numeros = [3, 1, 4, 1, 5, 9, 2, 6];

// Sin spread — error: Math.max no acepta un array
Math.max(numeros); // NaN

// Con spread — expande el array como argumentos individuales
Math.max(...numeros); // 9
```

---

### 📖 Spread en objetos

```javascript
let base = { nombre: "Oscar", plan: "Free" };

// Copiar un objeto
let copia = { ...base };

// Combinar objetos
let actualizado = { ...base, plan: "Pro", ciudad: "Penco" };
// { nombre: "Oscar", plan: "Pro", ciudad: "Penco" }
// "plan" de base es sobreescrito por el "plan" nuevo
```

**La propiedad que aparece DESPUÉS gana:**

```javascript
let defaults = { color: "azul", tamaño: "M", stock: 10 };
let personalizado = { ...defaults, color: "rojo" };
// { color: "rojo", tamaño: "M", stock: 10 }
// "color" del defaults fue sobreescrito
```

---

### 📖 Copia superficial vs copia profunda

El spread copia solo el primer nivel. Los objetos o arrays anidados comparten la misma referencia:

```javascript
let original = {
  nombre: "Oscar",
  direccion: { ciudad: "Penco" } // objeto anidado
};

let copia = { ...original };

// Modificar una propiedad simple — no afecta el original
copia.nombre = "Pedro";
console.log(original.nombre); // "Oscar" — sin cambios ✅

// Modificar el objeto anidado — SÍ afecta el original
copia.direccion.ciudad = "Santiago";
console.log(original.direccion.ciudad); // "Santiago" — cambió ⚠️
```

Para datos simples sin anidamiento, el spread es suficiente. Para datos profundamente anidados, necesitarías otras técnicas.

---

### 📖 Rest parameters

El mismo símbolo `...` pero en la firma de una función agrupa múltiples argumentos en un array:

```javascript
function sumarTodo(...numeros) {
  // numeros es un array con todos los argumentos
  return numeros.reduce((total, n) => total + n, 0);
}

sumarTodo(1, 2, 3); // 6
sumarTodo(1, 2, 3, 4, 5); // 15
sumarTodo(); // 0
```

**Combinando con parámetros fijos:**

```javascript
function registrarVenta(vendedor, ...productos) {
  console.log(`Vendedor: ${vendedor}`);
  console.log(`Productos: ${productos.length}`);
  productos.forEach((p) => console.log(`  - ${p}`));
}

registrarVenta("Ana", "Carpa", "Linterna", "Brújula");
// Vendedor: Ana
// Productos: 3
//   - Carpa
//   - Linterna
//   - Brújula
```

**Regla crítica:** El rest parameter debe ser siempre el **último** parámetro. Ningún parámetro puede venir después del rest.

---

### 📖 Spread vs Rest — el mismo símbolo, propósito opuesto

```javascript
// SPREAD — en llamadas y literales → EXPANDE
let arr = [1, 2, 3];
Math.max(...arr); // expande el array en argumentos individuales
let copia = [...arr]; // expande el array en un nuevo array

// REST — en parámetros de función → AGRUPA
function f(...args) {} // agrupa todos los argumentos en un array
function g(a, ...rest) {} // agrupa los argumentos restantes
```

---

### 💼 Código real vs código de bootcamp

En código profesional, spread es la forma estándar de actualizar estado en React/Zustand sin mutar el original:

```javascript
// Zustand store (Mes 7) — actualizar un campo sin mutar el objeto completo
const actualizarUsuario = (nuevoDato) =>
  set((estado) => ({
    usuario: { ...estado.usuario, ...nuevoDato }
  }));

// Agregar elemento a array de estado sin mutar
const agregarProducto = (producto) =>
  set((estado) => ({
    carrito: [...estado.carrito, producto]
  }));

// Eliminar elemento de array de estado
const eliminarProducto = (id) =>
  set((estado) => ({
    carrito: estado.carrito.filter((p) => p.id !== id)
  }));
```

---

### 🔗 Conexión con Next.js

En Next.js, spread aparece constantemente al pasar props y al manejar estado:

```javascript
// Pasar todos los props de un objeto a un componente
function TarjetaProducto(props) { ... }

let productoData = { nombre: "Carpa", precio: 45000, stock: 5 }
<TarjetaProducto {...productoData} />
// equivale a: <TarjetaProducto nombre="Carpa" precio={45000} stock={5} />
```

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — `dia03_ejercicio01.js`

Usa spread para manipular arrays:

```javascript
let equipoA = ["Ana", "Pedro", "María"];
let equipoB = ["Juan", "Sofía", "Carlos"];
let nuevosIntegrantes = ["Lucía", "Diego"];
```

1. Crea un array `equipoCompleto` que combine ambos equipos
2. Crea un array `equipoAmpliado` con `equipoA` + los nuevos integrantes al final
3. Crea una copia de `equipoA` y agrega "Roberto" sin modificar el original
4. Encuentra el nombre más largo de `equipoCompleto` usando spread con `Math.max` y `.length`

---

**Ejercicio 2** — `dia03_ejercicio02.js`

Usa spread para manipular objetos:

```javascript
let configBase = {
  idioma: "es",
  moneda: "CLP",
  tema: "claro",
  notificaciones: true
};

let configUsuario = {
  tema: "oscuro",
  notificaciones: false
};
```

1. Crea `configFinal` combinando `configBase` con `configUsuario` (usuario sobreescribe base)
2. Crea `configSinNotificaciones` igual a `configFinal` pero con `notificaciones: false`
3. Escribe una función `actualizarConfig(config, cambios)` que retorne la config actualizada sin modificar la original

---

**Ejercicio 3** — `dia03_ejercicio03.js`

Usa rest parameters:

1. Escribe `sumarTodo(...numeros)` que sume cualquier cantidad de números
2. Escribe `primeroYResto(primero, ...resto)` que muestre el primer elemento y el array del resto
3. Escribe `crearExpedicion(nombre, tipo, ...guias)` que retorne un objeto con nombre, tipo y un array de guías

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — DEFAULT PARAMETERS Y COMBINANDO ES6+

### 🎯 Objetivo

Dominar default parameters y practicar la combinación natural de todas las características ES6+ vistas hasta ahora.

---

### 📖 El problema que resuelven los default parameters

Antes de ES6, manejar parámetros opcionales requería verificaciones manuales:

```javascript
// Manera antigua — propensa a bugs
function saludar(nombre, saludo) {
  saludo = saludo || "Hola"; // ¿Y si saludo es "" o 0? También se aplica el default
  return `${saludo}, ${nombre}`;
}
```

El problema de `||` es que trata como falsy a `""`, `0`, `false` y `null` — no solo a `undefined`. Si alguien pasa `saludo = ""` intencionalmente, el `||` lo reemplaza con "Hola".

Los default parameters resuelven esto con precisión:

```javascript
// Default parameters — solo undefined activa el default
function saludar(nombre, saludo = "Hola") {
  return `${saludo}, ${nombre}`;
}

saludar("Oscar"); // "Hola, Oscar" — undefined activa el default
saludar("Oscar", "Hey"); // "Hey, Oscar"
saludar("Oscar", ""); // ", Oscar" — "" no activa el default (es un valor)
saludar("Oscar", 0); // "0, Oscar" — 0 no activa el default
```

---

### 📖 Qué activa y qué no activa el default

Esta es la regla exacta:

```javascript
function f(a = "default") {
  return a;
}

f(); // "default" — sin argumento → undefined → activa default
f(undefined); // "default" — undefined explícito → activa default
f(null); // null      — null NO activa el default
f(0); // 0         — 0 NO activa el default
f(""); // ""        — string vacío NO activa el default
f(false); // false     — false NO activa el default
```

**Regla:** Solo la ausencia del argumento o `undefined` explícito activan el valor por defecto.

---

### 📖 Default parameters con expresiones

El valor por defecto puede ser cualquier expresión válida, incluyendo llamadas a funciones:

```javascript
const obtenerFecha = () => new Date().toLocaleDateString("es-CL");

function crearRegistro(titulo, fecha = obtenerFecha()) {
  return { titulo, fecha };
}

crearRegistro("Reunión"); // { titulo: "Reunión", fecha: "11/07/2026" }
crearRegistro("Reunión", "15/07"); // { titulo: "Reunión", fecha: "15/07" }
```

---

### 📖 Combinando ES6+ — así se ve el código moderno

Aquí es donde las piezas se unen. El código moderno de JavaScript combina arrow functions, destructuring, spread y default parameters de forma natural:

```javascript
// Función que procesa un pedido
// Usa: destructuring en parámetros, default parameter, arrow function
const procesarPedido = ({ cliente, productos, descuento = 0 }) => {
  let subtotal = productos.reduce((total, p) => total + p.precio, 0);
  let total = subtotal * (1 - descuento / 100);
  return {
    cliente,
    subtotal,
    descuento,
    total: Math.round(total)
  };
};

// Uso
let pedido = {
  cliente: "Oscar Castillo",
  productos: [
    { nombre: "Carpa", precio: 45000 },
    { nombre: "Linterna", precio: 12000 }
  ]
};

procesarPedido(pedido); // sin descuento
procesarPedido({ ...pedido, descuento: 10 }); // con 10% de descuento
```

---

### 💼 Código real vs código de bootcamp

```javascript
// Bootcamp (aprendizaje) — más explícito
function crearUsuario(nombre, rol, activo) {
  if (rol === undefined) rol = "visitante";
  if (activo === undefined) activo = true;
  return { nombre: nombre, rol: rol, activo: activo };
}

// Profesional — conciso y preciso
const crearUsuario = (nombre, rol = "visitante", activo = true) => ({
  nombre,
  rol,
  activo
});
```

Nota: `{ nombre, rol, activo }` es shorthand property — cuando el nombre de la variable es igual al nombre de la clave, puedes omitir la asignación. Esto también es ES6+.

---

### 🔗 Conexión con Next.js

Los default parameters son comunes en componentes React para props opcionales:

```javascript
// Componente con props opcionales (Mes 4-5)
function Boton({ texto, color = "azul", tamaño = "mediano", onClick }) {
  return (
    <button style={{ background: color }} className={`btn-${tamaño}`} onClick={onClick}>
      {texto}
    </button>
  );
}

// Uso sin todos los props opcionales
<Boton texto="Reservar" onClick={manejarReserva} />;
// color="azul" y tamaño="mediano" por defecto
```

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — `dia04_ejercicio01.js`

Reescribe estas funciones con default parameters:

```javascript
// Versión sin default parameters
function crearExpedicion(nombre, tipo, dificultad, cupoMaximo, activa) {
  tipo = tipo || "trekking";
  dificultad = dificultad || "media";
  cupoMaximo = cupoMaximo !== undefined ? cupoMaximo : 10;
  activa = activa !== undefined ? activa : true;
  return { nombre, tipo, dificultad, cupoMaximo, activa };
}
```

Escríbela con default parameters y luego prueba estos casos:

- Solo con nombre
- Con nombre y tipo
- Con todos los parámetros
- Con `dificultad = ""` — ¿se aplica el default?
- Con `cupoMaximo = 0` — ¿se aplica el default?

---

**Ejercicio 2** — `dia04_ejercicio02.js`

Escribe estas funciones combinando arrow functions, destructuring y default parameters.

**1. `formatearDinero({ monto, moneda = "CLP", decimales = 0 })`**

Retorna el monto formateado con el símbolo de la moneda y la cantidad de
decimales indicada.

```javascript
formatearDinero({ monto: 450000 });
// "$450.000"

formatearDinero({ monto: 1234.567, decimales: 2 });
// "$1.234,57"

formatearDinero({ monto: 450000, moneda: "USD", decimales: 2 });
// "US$450.000,00"
```

> Necesitas el segundo argumento de `toLocaleString`. Está en la Cheat Sheet,
> sección "toLocaleString con opciones".

---

## `toLocaleString` CON OPCIONES

Ya la usas sin argumentos. El segundo parámetro controla el formato:

```javascript
(1234.5)
  .toLocaleString("es-CL")(
    // "1.234,5" — decimales según el default del locale

    1234.5
  )
  .toLocaleString("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })(
    // "1.235" — sin decimales, redondeado

    1234.5
  )
  .toLocaleString("es-CL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
// "1.234,50" — siempre dos decimales
```

**Las dos opciones que importan:**

```
minimumFractionDigits  →  decimales MÍNIMOS (rellena con ceros)
maximumFractionDigits  →  decimales MÁXIMOS (redondea)
```

Para un número fijo de decimales, pon las dos iguales.

**Formato de moneda:**

```javascript
(450000)
  .toLocaleString("es-CL", { style: "currency", currency: "CLP" })(
    // "$450.000"

    450000
  )
  .toLocaleString("es-CL", { style: "currency", currency: "USD" });
// "US$450.000,00"
```

⚠ **Trampa:** si `minimumFractionDigits` es mayor que `maximumFractionDigits`,
lanza `RangeError`. Con defaults dinámicos es fácil pisarlo sin darse cuenta.

⚠ **Segunda trampa:** `style: "currency"` decide los decimales por la moneda,
no por el locale. CLP no usa decimales; USD sí. Si necesitas control exacto,
combina `style: "currency"` con `maximumFractionDigits`.

---

**2. `filtrarExpediciones(expediciones, { tipo, dificultad, precioMax = Infinity })`**

Filtra según los criterios. Los tres son opcionales: un criterio que no viene
**no debe rechazar nada**.

```javascript
const expediciones = [
  { nombre: "Cruce Los Andes", tipo: "trekking", dificultad: "alta", precioBase: 280000 },
  { nombre: "Lago Llanquihue", tipo: "kayak", dificultad: "media", precioBase: 195000 },
  { nombre: "Reserva Nonguén", tipo: "trekking", dificultad: "baja", precioBase: 45000 }
];

filtrarExpediciones(expediciones, {});
// las 3 — sin criterios, no se descarta nada

filtrarExpediciones(expediciones, { tipo: "trekking" });
// Cruce Los Andes y Reserva Nonguén

filtrarExpediciones(expediciones, { tipo: "trekking", precioMax: 100000 });
// solo Reserva Nonguén
```

> Fíjate en que `precioMax` lleva default y `tipo` y `dificultad` no. **No es
> un descuido del enunciado.** La razón está en la Cheat Sheet, sección
> "Criterios opcionales — dos estrategias".

**3. `generarResumen({ nombre, ventas = [], meta = 100000 })`**

Retorna un objeto con el nombre, el total de ventas, la meta y si se cumplió.

```javascript
generarResumen({ nombre: "Ana", ventas: [40000, 35000, 50000] });
// { nombre: "Ana", totalVentas: 125000, meta: 100000, cumplioMeta: true }

generarResumen({ nombre: "Luis" });
// { nombre: "Luis", totalVentas: 0, meta: 100000, cumplioMeta: false }
```

> El segundo caso es el que justifica el default `ventas = []`. Piensa qué
> pasaría con `reduce` si `ventas` llegara como `undefined`.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — MÓDULOS: IMPORT Y EXPORT

### 🎯 Objetivo

Entender el sistema de módulos de JavaScript y por qué es la base de cualquier proyecto moderno.

---

### 📖 El problema que resuelven los módulos

Hasta ahora, todo tu código vive en un solo archivo. En proyectos reales, un solo archivo con todo el código es imposible de mantener. Los módulos permiten dividir el código en archivos con responsabilidades claras:

```
Sin módulos:
un archivo enorme con todo mezclado → imposible de mantener

Con módulos:
utilidades.js      → funciones de ayuda
validaciones.js    → funciones de validación
api.js             → llamadas al servidor
componentes/       → archivos separados por componente
```

---

### 📖 Named exports — exportar múltiples cosas

```javascript
// matematicas.js — exporta múltiples funciones
export function sumar(a, b) {
  return a + b;
}
export function restar(a, b) {
  return a - b;
}
export function multiplicar(a, b) {
  return a * b;
}
export const PI = 3.14159265;

// También puedes exportar al final del archivo
function dividir(a, b) {
  return a / b;
}
const E = 2.71828;

export { dividir, E };
```

```javascript
// main.js — importa lo que necesita
import { sumar, multiplicar, PI } from "./matematicas.js";

console.log(sumar(2, 3)); // 5
console.log(multiplicar(4, 5)); // 20
console.log(PI); // 3.14159265
```

---

### 📖 Default export — exportar una cosa principal

Cada archivo puede tener un solo `export default`. Es la exportación principal del archivo:

```javascript
// usuario.js
function crearUsuario(nombre, rol = "cliente") {
  return { nombre, rol, activo: true };
}

export default crearUsuario;
```

```javascript
// main.js
import crearUsuario from "./usuario.js"; // sin llaves, nombre libre
import miCreador from "./usuario.js"; // también funciona — nombre libre

let usuario = crearUsuario("Oscar", "admin");
```

---

### 📖 Renombrar al importar y exportar

```javascript
// Renombrar al importar — útil cuando hay conflicto de nombres
import { sumar as add, restar as subtract } from "./matematicas.js";

// Importar todo como un objeto
import * as Mat from "./matematicas.js";
Mat.sumar(1, 2); // 3
Mat.PI; // 3.14159265
```

---

### 📖 La diferencia crítica entre named y default

```javascript
// ❌ Error común — importar default con llaves
import { crearUsuario } from "./usuario.js"; // undefined o error

// ✅ Correcto — default sin llaves
import crearUsuario from "./usuario.js";

// ✅ Correcto — named con llaves
import { sumar, restar } from "./matematicas.js";

// ✅ Correcto — combinar default y named en un solo import
import crearUsuario, { validarEmail } from "./usuario.js";
```

---

### 📖 Cuándo usar cada tipo de export

```
Named export → cuando el archivo exporta múltiples cosas de igual importancia
               (utilidades, constantes, validaciones, helpers)

Default export → cuando el archivo tiene una responsabilidad principal
                 (un componente React, un servicio, una clase)
```

---

### 📖 Módulos en Node.js vs en el navegador

En Node.js puro (sin bundler), los módulos ES6 requieren extensión `.mjs` o configuración especial. En proyectos Next.js/React (que usan un bundler como Webpack o Turbopack), esto se maneja automáticamente — usas `import/export` directamente sin preocuparte por la extensión o la configuración.

Durante el bootcamp, los ejercicios de módulos se prueban en el contexto de Next.js desde la Semana 8. Por ahora, el objetivo es entender la sintaxis y el concepto.

---

### 🔗 Conexión con Next.js

En Next.js, cada archivo es un módulo. La estructura de un proyecto real:

```
app/
├── page.tsx              → default export (la página)
├── layout.tsx            → default export (el layout)
components/
├── TarjetaProducto.tsx   → default export (el componente)
├── ui/
│   ├── Boton.tsx         → default export
│   └── Input.tsx         → default export
lib/
├── utils.ts              → named exports (funciones utilitarias)
├── validaciones.ts       → named exports (funciones de validación)
└── constantes.ts         → named exports (constantes del proyecto)
```

```javascript
// En Next.js — así se importa todo
import TarjetaProducto from "@/components/TarjetaProducto";
import { formatearPrecio, calcularIVA } from "@/lib/utils";
import { PRECIO_MINIMO, CATEGORIAS } from "@/lib/constantes";
```

---

### 🛠 EJERCICIOS DÍA 5

**Nota:** Los ejercicios de módulos se estructuran como si estuvieras en un proyecto real, pero se validan conceptualmente — la ejecución en Node.js puro requiere configuración adicional que verás en proyectos Next.js.

**Ejercicio 1** — Diseño de módulos

Dado este código en un solo archivo:

```javascript
// todo-en-uno.js (sin módulos)
const IVA = 0.19;
const DESCUENTO_GRUPO = 0.1;

function calcularPrecioConIVA(precio) {
  return Math.round(precio * (1 + IVA));
}

function calcularDescuentoGrupo(precio, personas) {
  if (personas >= 5) return Math.round(precio * (1 - DESCUENTO_GRUPO));
  return precio;
}

function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

function validarTelefono(telefono) {
  return telefono.length >= 8 && !isNaN(Number(telefono));
}

function crearReserva(cliente, expedicionId, personas) {
  return { cliente, expedicionId, personas, fecha: new Date().toLocaleDateString("es-CL") };
}

function confirmarReserva(reserva) {
  return { ...reserva, estado: "confirmada" };
}
```

Divídelo en tres módulos con la estructura correcta de exports:

- `precios.js` — constantes y funciones de precio
- `validaciones.js` — funciones de validación
- `reservas.js` — funciones de reservas

Escribe los tres archivos completos con sus exports y luego escribe cómo los importarías en un archivo `main.js`.

---

**Ejercicio 2** — `dia05_ejercicio02.js`

Analiza estos imports e identifica qué tipo de export esperan y si son correctos:

```javascript
// ¿Named o default? ¿Correcto o incorrecto?
import React from "react";
import { useState, useEffect } from "react";
import TarjetaProducto from "./TarjetaProducto";
import { formatearPrecio } from "./utils";
import * as Validaciones from "./validaciones";
import { default as MiComponente } from "./componente";
```

Para cada uno, explica qué tipo de export esperaría encontrar en el archivo fuente.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 NexusTools — Librería de Utilidades

> **Nexus** está creciendo y su equipo de desarrollo ha decidido crear una librería interna de utilidades reutilizables para estandarizar el código de todos sus productos.
>
> Tu tarea es construir `nexus-utils` — un conjunto de módulos con funciones utilitarias que cualquier parte del sistema Nexus puede importar y usar.
>
> Este es el primer proyecto donde el código no es una aplicación sino una **librería** — código diseñado para ser usado por otro código.

---

### 📋 La estructura del proyecto

```
nexus-utils/
├── precios.js          → utilidades de cálculo de precios
├── validaciones.js     → validaciones de datos
├── colecciones.js      → transformaciones de arrays y objetos
├── texto.js            → utilidades de strings
└── index.js            → re-exporta todo desde un punto de entrada único
```

---

### 📋 Módulo 1 — `precios.js`

Exporta con **named exports**:

- `const IVA_CHILE = 0.19`
- `formatearCLP(monto)` — retorna string formateado con `.toLocaleString("es-CL")` y prefijo "$"
- `calcularConIVA(precio, iva = IVA_CHILE)` — retorna el precio con IVA redondeado
- `calcularDescuento(precio, porcentaje = 0)` — retorna el precio con descuento aplicado
- `calcularTotal(items)` — recibe array de objetos `{ precio, cantidad }`, retorna el total con IVA

---

### 📋 Módulo 2 — `validaciones.js`

Exporta con **named exports**:

- `esEmailValido(email)` — true si contiene "@" y al menos un "."
- `esContrasenaSegura(password)` — true si tiene 8+ caracteres
- `esRutChileno(rut)` — true si tiene el formato "12345678-9" (dígito verificador no calculado — solo formato)
- `esTelefonoChileno(tel)` — true si empieza con "+56" y tiene 11 caracteres en total
- `validarCampos(objeto, camposRequeridos)` — recibe un objeto y un array de strings, retorna true si todos los campos existen y no están vacíos

---

### 📋 Módulo 3 — `colecciones.js`

Exporta con **named exports**, usando arrow functions:

- `agruparPor(array, clave)` — agrupa array de objetos por el valor de una clave, retorna objeto
- `ordenarPor(array, clave, ascendente = true)` — ordena array de objetos por una clave
- `paginar(array, pagina = 1, porPagina = 10)` — retorna la "página" del array
- `unicos(array)` — retorna array sin valores duplicados
- `combinar(...arrays)` — combina múltiples arrays en uno, sin duplicados

---

### 📋 Módulo 4 — `texto.js`

Exporta con **named exports**:

- `capitalizar(texto)` — primera letra en mayúscula, resto en minúscula
- `capitalizarPalabras(texto)` — capitaliza cada palabra
- `truncar(texto, longitud = 100, sufijo = "...")` — corta el texto y agrega sufijo si es necesario
- `slugify(texto)` — convierte "Mi Título Aquí" a "mi-titulo-aqui"
- `contarPalabras(texto)` — retorna el número de palabras

---

### 📋 Módulo 5 — `index.js`

Re-exporta todo desde un punto de entrada único:

```javascript
// index.js — el "hub" de la librería
export * from "./precios.js";
export * from "./validaciones.js";
export * from "./colecciones.js";
export * from "./texto.js";
```

Esto permite importar todo desde un solo lugar:

```javascript
// En lugar de:
import { formatearCLP } from "./precios.js";
import { esEmailValido } from "./validaciones.js";

// Se puede hacer:
import { formatearCLP, esEmailValido } from "./nexus-utils/index.js";
```

---

### 📋 Prueba de integración

Al final, escribe un archivo `demo.js` que importe funciones de distintos módulos y demuestre que funcionan juntas:

```javascript
// demo.js
import { formatearCLP, calcularTotal } from "./precios.js";
import { esEmailValido, validarCampos } from "./validaciones.js";
import { agruparPor, paginar } from "./colecciones.js";
import { capitalizar, truncar } from "./texto.js";

// Prueba al menos 3 funciones de cada módulo con casos reales
```

---

### ✅ Criterios de aprobación

```
□ Los 4 módulos están correctamente estructurados con named exports
□ index.js re-exporta todo correctamente
□ Todas las funciones usan arrow functions donde corresponde
□ Todas las funciones usan destructuring donde mejora la legibilidad
□ Todas las funciones usan default parameters donde corresponde
□ Todas las funciones usan spread/rest donde corresponde
□ demo.js demuestra que los módulos funcionan juntos
□ El código corre sin errores
□ Subido a GitHub con commit descriptivo
```

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva.** 🎯

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-05/
├── dia01_ejercicio01.js
├── dia01_ejercicio02.js
├── dia01_ejercicio03.js
├── dia02_ejercicio01.js
├── dia02_ejercicio02.js
├── dia02_ejercicio03.js
├── dia03_ejercicio01.js
├── dia03_ejercicio02.js
├── dia03_ejercicio03.js
├── dia04_ejercicio01.js
├── dia04_ejercicio02.js
├── dia05_ejercicio01.js (los tres archivos del módulo + main.js)
├── dia05_ejercicio02.js
└── nexus-utils/ ⭐
    ├── precios.js
    ├── validaciones.js
    ├── colecciones.js
    ├── texto.js
    ├── index.js
    └── demo.js
```

---

> ### 📘 PRÓXIMA SEMANA
>
> **Semana 06:** Programación Asíncrona — Callbacks, Promises, async/await, Fetch API

---

_Semana 05 — ES6+ Moderno_
_Formato v4 — Bootcamp autocontenido con Protocolo QA aplicado_
_Óscar — Full Stack Developer en formación 🇨🇱_
