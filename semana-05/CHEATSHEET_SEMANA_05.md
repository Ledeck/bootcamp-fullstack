# CHEAT SHEET — SEMANA 05
## ES6+ Moderno · Arrow Functions · Destructuring · Spread · Módulos

> Guion de la clase de activación. Se entrega POR PARTES, día a día.
> No lo leas completo de antemano: cada jornada empieza con la activación
> del tema correspondiente.
> Esta semana transforma la forma en que escribes JavaScript.
> No son conceptos nuevos — son formas más concisas de expresar lo que ya sabes.

---

## ARROW FUNCTIONS

Una forma más corta de escribir funciones. Misma lógica, menos código.

```javascript
// Función tradicional
function sumar(a, b) {
    return a + b
}

// Arrow function equivalente
const sumar = (a, b) => {
    return a + b
}

// Arrow function con return implícito (cuando es una sola expresión)
const sumar = (a, b) => a + b
```

**Reglas del return implícito:**
```javascript
// Con llaves → return explícito obligatorio
const doble = (n) => { return n * 2 }

// Sin llaves → return implícito automático
const doble = (n) => n * 2

// Retornar un objeto → envolver en paréntesis
const crearUsuario = (nombre) => ({ nombre: nombre, activo: true })
```

**Parámetros:**
```javascript
const saludar = () => "Hola"           // sin parámetros → paréntesis obligatorios
const doble = n => n * 2               // un parámetro → paréntesis opcionales
const sumar = (a, b) => a + b         // dos o más → paréntesis obligatorios
```

**Cuándo usarlas:** En callbacks de map, filter, reduce, forEach. En funciones cortas de una sola expresión.

**Cuándo NO usarlas:** Cuando necesitas `this` con comportamiento dinámico (métodos de objetos, constructores). Las arrow functions no tienen su propio `this`.

**Error típico:**
```javascript
// ❌ Return implícito con objeto — JavaScript interpreta {} como bloque de código
const obj = () => { nombre: "Oscar" }  // retorna undefined

// ✅ Envolver el objeto en paréntesis
const obj = () => ({ nombre: "Oscar" })  // retorna el objeto
```

**Idea mental:** Una arrow function es una función tradicional con azúcar sintáctico — más corta, pero el mismo comportamiento en la mayoría de casos.

---

## DESTRUCTURING DE ARRAYS

Extraer valores de un array en variables con un solo paso.

```javascript
let colores = ["rojo", "verde", "azul"]

// Sin destructuring
let primero = colores[0]
let segundo = colores[1]

// Con destructuring
let [primero, segundo] = colores
// primero = "rojo", segundo = "verde"
```

**Saltar elementos:**
```javascript
let [, , tercero] = colores  // tercero = "azul"
```

**Valor por defecto:**
```javascript
let [a = "default", b = "default"] = ["valor"]
// a = "valor", b = "default"
```

**Cuándo usarlo:** Cuando necesitas extraer múltiples valores de un array en variables con nombres descriptivos.

**Error típico:**
```javascript
let numeros = [1, 2]
let [a, b, c] = numeros
// c = undefined — no hay error, solo undefined
```

**Idea mental:** El destructuring de arrays asigna por posición — el primero va al primero, el segundo al segundo.

---

## DESTRUCTURING DE OBJETOS

Extraer propiedades de un objeto en variables con un solo paso.

```javascript
let usuario = { nombre: "Oscar", edad: 28, ciudad: "Penco" }

// Sin destructuring
let nombre = usuario.nombre
let edad = usuario.edad

// Con destructuring
let { nombre, edad } = usuario
// nombre = "Oscar", edad = 28
```

**Renombrar al desestructurar:**
```javascript
let { nombre: nombreUsuario, edad: años } = usuario
// nombreUsuario = "Oscar", años = 28
```

**Valor por defecto:**
```javascript
let { nombre, telefono = "No disponible" } = usuario
// telefono = "No disponible" (no existe en el objeto)
```

**En parámetros de función:**
```javascript
// Sin destructuring
function mostrar(usuario) {
    console.log(usuario.nombre)
}

// Con destructuring en el parámetro
function mostrar({ nombre, edad }) {
    console.log(nombre, edad)
}
```

**Cuándo usarlo:** Siempre que necesites extraer más de una propiedad de un objeto. Especialmente útil en parámetros de función.

**Error típico:**
```javascript
// ❌ Los nombres deben coincidir con las claves del objeto
let { Name } = usuario  // undefined — la clave es "nombre", no "Name"

// ✅
let { nombre } = usuario  // "Oscar"
```

**Idea mental:** El destructuring de objetos asigna por nombre de clave — el orden no importa, el nombre sí.

---

## SPREAD OPERATOR (...)

Expande un array u objeto en sus elementos individuales.

**En arrays:**
```javascript
let frutas = ["manzana", "pera"]
let masFrutas = ["naranja", ...frutas, "uva"]
// ["naranja", "manzana", "pera", "uva"]

// Copiar un array
let copia = [...frutas]  // nueva referencia, mismo contenido

// Combinar arrays
let combinado = [...arr1, ...arr2]
```

**En objetos:**
```javascript
let usuario = { nombre: "Oscar", edad: 28 }
let usuarioActualizado = { ...usuario, edad: 29, ciudad: "Penco" }
// { nombre: "Oscar", edad: 29, ciudad: "Penco" }
// Las propiedades duplicadas — la última gana
```

**En llamadas a funciones:**
```javascript
let numeros = [1, 2, 3]
Math.max(...numeros)  // equivale a Math.max(1, 2, 3)
```

**Cuándo usarlo:** Para copiar arrays/objetos sin modificar el original. Para combinar arrays/objetos. Para pasar elementos de un array como argumentos individuales.

**Error típico:**
```javascript
// ❌ Spread NO hace copia profunda de objetos anidados
let original = { datos: { nombre: "Oscar" } }
let copia = { ...original }
copia.datos.nombre = "Pedro"
console.log(original.datos.nombre)  // "Pedro" — el objeto anidado es la misma referencia

// Para copia profunda necesitas otras herramientas (JSON.parse/stringify o librerías)
```

**Idea mental:** El spread "derrama" el contenido de un array u objeto en el lugar donde lo pones.

---

## REST PARAMETERS (...)

El mismo símbolo `...` pero en el lado opuesto — agrupa múltiples argumentos en un array.

```javascript
// Spread → expande
// Rest   → agrupa

function sumarTodo(...numeros) {
    return numeros.reduce((total, n) => total + n, 0)
}

sumarTodo(1, 2, 3, 4, 5)  // 15
// numeros = [1, 2, 3, 4, 5]
```

**Con parámetros fijos:**
```javascript
function primeroYResto(primero, ...resto) {
    console.log(primero)  // el primer argumento
    console.log(resto)    // array con el resto
}

primeroYResto("a", "b", "c", "d")
// primero = "a"
// resto = ["b", "c", "d"]
```

**Regla:** El rest parameter debe ser siempre el último parámetro.

**Cuándo usarlo:** Cuando una función puede recibir un número variable de argumentos.

**Error típico:**
```javascript
// ❌ Rest no puede ir en el medio
function mal(a, ...b, c) {}  // SyntaxError

// ✅ Rest siempre al final
function bien(a, b, ...resto) {}
```

**Idea mental:** Rest es el "y todo lo demás" de los parámetros.

---

## DEFAULT PARAMETERS

Valores por defecto para parámetros de función.

```javascript
// Sin default parameters
function saludar(nombre, saludo) {
    saludo = saludo || "Hola"  // manera antigua
    return `${saludo}, ${nombre}`
}

// Con default parameters
function saludar(nombre, saludo = "Hola") {
    return `${saludo}, ${nombre}`
}

saludar("Oscar")           // "Hola, Oscar"
saludar("Oscar", "Hey")    // "Hey, Oscar"
```

**Cuándo se aplica el default:**
```javascript
function ejemplo(a = 10) { return a }

ejemplo()           // 10 — sin argumento, usa el default
ejemplo(undefined)  // 10 — undefined también activa el default
ejemplo(null)       // null — null NO activa el default
ejemplo(0)          // 0 — 0 tampoco activa el default
```

**Error típico:** Asumir que `null` activa el valor por defecto. Solo `undefined` (o no pasar el argumento) activa el default.

**Idea mental:** El default se aplica cuando el parámetro está "ausente" — no cuando tiene un valor falsy como `null` o `0`.

---

## CRITERIOS OPCIONALES — DOS ESTRATEGIAS

Caso frecuente: una función de filtrado donde cada criterio puede venir o no.
Si el criterio no viene, **no debe rechazar nada**.

Hay dos formas de conseguirlo, y elegir bien depende del tipo de dato.

### Estrategia A — default NEUTRO

Cuando existe un valor que hace la condición **siempre verdadera**:

```javascript
function filtrar(items, { precioMax = Infinity }) {
  return items.filter((item) => item.precio <= precioMax);
}

filtrar(items, {});                  // precioMax = Infinity → pasa todo
filtrar(items, { precioMax: 5000 }); // filtra de verdad
```

`Infinity` es el valor neutro de `<=`. Ningún precio lo supera, así que sin
criterio no se descarta nada.

**Otros valores neutros según el operador:**

```
<=  →  Infinity
>=  →  -Infinity
sumar  →  0
multiplicar  →  1
```

### Estrategia B — cuando NO existe valor neutro

Para un string como `tipo`, no hay ningún valor que signifique "cualquiera".
No puedes escribir `tipo = "todos"` porque tendrías que comprobarlo aparte.

La solución es dejar el parámetro **sin default** y neutralizar en la condición:

```javascript
function filtrar(items, { tipo }) {
  return items.filter((item) => !tipo || item.tipo === tipo);
}

filtrar(items, {});                    // tipo = undefined → !undefined es true → pasa todo
filtrar(items, { tipo: "kayak" });     // compara de verdad
```

Se lee: **"si no hay criterio, pasa; si lo hay, compara"**.

Funciona porque `||` corta en cuanto encuentra algo verdadero. Si `!tipo` es
`true`, la comparación ni se evalúa.

### Combinando ambas

```javascript
function filtrarExpediciones(expediciones, { tipo, dificultad, precioMax = Infinity }) {
  return expediciones.filter((exp) =>
    (!tipo || exp.tipo === tipo) &&
    (!dificultad || exp.dificultad === dificultad) &&
    exp.precioBase <= precioMax
  );
}
```

Fíjate en la asimetría: `precioMax` lleva default; `tipo` y `dificultad`, no.
No es descuido — es que solo el primero tiene un valor neutro disponible.

**Error típico:**

```javascript
// ❌ !criterio se activa con CUALQUIER valor falsy
function filtrar(items, { cupos }) {
  return items.filter((item) => !cupos || item.cupos === cupos);
}
filtrar(items, { cupos: 0 });   // !0 es true → devuelve TODO, no los de 0 cupos

// ✅ Cuando 0, "" o false son criterios válidos, compara con undefined
function filtrar(items, { cupos }) {
  return items.filter((item) => cupos === undefined || item.cupos === cupos);
}
```

Es la misma distinción de los default parameters: **ausencia** no es lo mismo
que **valor falsy**.

**Idea mental:** un criterio ausente no filtra. La pregunta es cómo expresar
"no filtres" — con un valor neutro si existe, con una condición que corta si no.

---

## `toLocaleString` CON OPCIONES

Ya la usas sin argumentos. El segundo parámetro controla el formato:

```javascript
(1234.5).toLocaleString("es-CL")
// "1.234,5" — decimales según el default del locale

(1234.5).toLocaleString("es-CL", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})
// "1.235" — sin decimales, redondeado

(1234.5).toLocaleString("es-CL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
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
(450000).toLocaleString("es-CL", { style: "currency", currency: "CLP" })
// "$450.000"

(450000).toLocaleString("es-CL", { style: "currency", currency: "USD" })
// "US$450.000,00"
```

⚠ **Trampa:** si `minimumFractionDigits` es mayor que `maximumFractionDigits`,
lanza `RangeError`. Con defaults dinámicos es fácil pisarlo sin darse cuenta.

⚠ **Segunda trampa:** `style: "currency"` decide los decimales por la moneda,
no por el locale. CLP no usa decimales; USD sí. Si necesitas control exacto,
combina `style: "currency"` con `maximumFractionDigits`.

---

## MÓDULOS — IMPORT / EXPORT

Dividir el código en archivos separados con responsabilidades claras.

**Named exports — exportar múltiples cosas:**
```javascript
// matematicas.js
export function sumar(a, b) { return a + b }
export function restar(a, b) { return a - b }
export const PI = 3.14159
```

```javascript
// main.js
import { sumar, restar, PI } from "./matematicas.js"
```

**Default export — exportar una cosa principal:**
```javascript
// usuario.js
export default function crearUsuario(nombre) {
    return { nombre, activo: true }
}
```

```javascript
// main.js
import crearUsuario from "./usuario.js"  // sin llaves, nombre libre
```

**Renombrar al importar:**
```javascript
import { sumar as add, restar as subtract } from "./matematicas.js"
```

**Importar todo:**
```javascript
import * as Mat from "./matematicas.js"
Mat.sumar(1, 2)
Mat.PI
```

**Reglas:**
- Solo un `export default` por archivo
- Múltiples `export` named permitidos
- Las rutas de import deben incluir la extensión en JS puro (en Next.js no es necesario)

**Error típico:**
```javascript
// ❌ Importar default con llaves
import { crearUsuario } from "./usuario.js"  // undefined — default no usa llaves

// ✅ Default sin llaves
import crearUsuario from "./usuario.js"
```

**Idea mental:** Los módulos son como puertas — `export` abre la puerta, `import` entra por ella.

---

## COMPARACIONES IMPORTANTES

### Arrow function vs función tradicional

| | Función tradicional | Arrow function |
|---|---|---|
| Sintaxis | `function nombre() {}` | `const nombre = () => {}` |
| `this` | Dinámico (depende de cómo se llama) | Hereda del contexto exterior |
| `arguments` | Disponible | No disponible (usar rest) |
| Como método de objeto | ✅ Recomendado | ❌ Evitar |
| Como callback | ✅ Válido | ✅ Preferido por concisión |
| Constructor (`new`) | ✅ Válido | ❌ No permitido |

### Spread vs Rest

| | Spread `...` | Rest `...` |
|---|---|---|
| Posición | En llamadas y literales | En parámetros de función |
| Efecto | Expande | Agrupa |
| Ejemplo | `Math.max(...arr)` | `function f(...args)` |

### Named export vs Default export

| | Named export | Default export |
|---|---|---|
| Cantidad por archivo | Múltiples | Solo uno |
| Importar | Con llaves `{ nombre }` | Sin llaves |
| Nombre al importar | Debe coincidir (o renombrar) | Libre |
| Cuándo usarlo | Utilidades, constantes, múltiples funciones | Componente o función principal del archivo |

---

## ERRORES FRECUENTES DE LA SEMANA

```javascript
// ❌ Return implícito con objeto sin paréntesis
const usuario = () => { nombre: "Oscar" }  // undefined
const usuario = () => ({ nombre: "Oscar" }) // ✅

// ❌ Destructuring con nombre incorrecto
let { Name } = { nombre: "Oscar" }  // undefined — case sensitive
let { nombre } = { nombre: "Oscar" } // ✅

// ❌ Asumir que spread hace copia profunda
let copia = { ...objetoConAnidados }  // copia superficial únicamente

// ❌ Rest no es el último parámetro
function f(a, ...b, c) {}  // SyntaxError ❌
function f(a, ...b) {}     // ✅

// ❌ Default activado por null
function f(a = 10) { return a }
f(null)  // null — NO activa el default

// ❌ Importar default con llaves
import { MiComponente } from "./archivo.js"  // undefined si es default export
import MiComponente from "./archivo.js"      // ✅
```

---

## CHECKLIST DE DOMINIO

```
□ Puedo escribir una arrow function con y sin return implícito
□ Sé cuándo poner paréntesis alrededor del cuerpo de una arrow function
□ Puedo desestructurar arrays por posición
□ Puedo desestructurar objetos por nombre de clave
□ Puedo renombrar y asignar valores por defecto al desestructurar
□ Entiendo la diferencia entre spread (expande) y rest (agrupa)
□ Puedo usar spread para copiar y combinar arrays y objetos
□ Puedo usar default parameters correctamente
□ Sé neutralizar un criterio opcional con valor neutro o con !criterio ||
□ Sé cuándo !criterio falla y hay que comparar con undefined
□ Puedo controlar los decimales de toLocaleString
□ Entiendo qué activa un default parameter (undefined) y qué no (null, 0, "")
□ Puedo exportar e importar con named exports y default export
□ Sé la diferencia entre importar con llaves y sin llaves
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. Las arrow functions no reemplazan completamente a las funciones tradicionales**
Para callbacks y funciones cortas, son perfectas. Para métodos de objetos y constructores, las funciones tradicionales siguen siendo necesarias. No existe "siempre usar arrow functions".

**2. El destructuring asigna por posición (arrays) o por nombre (objetos)**
En arrays, el orden importa. En objetos, el nombre importa. Esta distinción es crítica y evita muchos bugs.

**3. El spread `...` hace copia superficial, no profunda**
Si el array u objeto tiene elementos anidados (otros arrays u objetos), el spread copia la referencia, no el valor. Para modificar el original, modifica el anidado.

**4. `undefined` activa el default parameter — `null` no**
Esta es la regla exacta. Parece un detalle pero causa bugs silenciosos cuando los datos vienen de APIs que devuelven `null` para valores ausentes.

**5. Los módulos son la base de cualquier proyecto Next.js**
Cada archivo en un proyecto Next.js es un módulo. Cada componente, cada función utilitaria, cada configuración usa import/export. Dominar módulos no es opcional — es el aire que respira el stack moderno.

---

*Cheat Sheet Semana 05 — ES6+ Moderno*
*Leer antes de los ejercicios — consultar durante la semana*
