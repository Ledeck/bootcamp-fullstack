# 📘 BOOTCAMP PERSONAL — SEMANA 02 (v2)
## JAVASCRIPT FUNDAMENTALS II
### Bucles · Funciones · Scope · Primeros Algoritmos Reales

---

> **Alumno:** Óscar
> **Objetivo final:** Full Stack Developer empleable en 13 meses
> **Stack objetivo:** Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk
> **Semana:** 2 de 52
> **Nivel:** Principiante con Semana 01 completada ✅
> **Versión:** 2 — incluye conexión con Next.js, código profesional, y mini-entrevista técnica

---

## 🎯 MISIÓN DE LA SEMANA

Al finalizar esta semana serás capaz de:

- ✅ Repetir acciones automáticamente con `for` y `while`
- ✅ Crear funciones reutilizables con parámetros y return
- ✅ Entender el scope y por qué las variables "viven" en ciertos lugares
- ✅ Resolver problemas reales descomponiéndolos en pasos pequeños
- ✅ Construir **dos proyectos de sabores distintos**: una calculadora de cotizaciones y un mini analizador de posts estilo red social
- ✅ Reconocer cómo cada concepto de hoy se usará en Next.js dentro de pocos meses
- ✅ Responder preguntas tipo entrevista de trabajo sobre estos temas

> 💡 **Concepto clave de la semana:** Un programador no escribe código que hace una cosa.
> Escribe código que puede hacer esa cosa **mil veces**, con **cualquier dato**, **sin repetirse**.
> Eso es lo que aprenderás esta semana.

---

## ⚠️ REGLAS DEL BOOTCAMP

Durante esta semana **NO estudiar:**

- ❌ Arrays (la semana que viene)
- ❌ Objetos
- ❌ React, TypeScript, Node.js
- ❌ Métodos de arrays (map, filter, reduce)
- ❌ Arrow functions (las verás en Semana 05)

**Tu único trabajo esta semana es ejecutar este plan.**
No buscas recursos extra. No abres otros tutoriales. Solo este archivo.

---

## 🗓 DÍA 1 — BUCLES: HACER LO MISMO MIL VECES SIN REPETIRTE

### 🎯 Objetivo del día
Entender por qué existen los bucles y cómo le dices a JavaScript que repita algo.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/while-for
```

**Leer exactamente:**
- La sección `while`
- La sección `do...while`
- La sección `for`

**Detenerse en:** la sección `break/continue` — no leer eso todavía.

**⏱ Tiempo estimado:** 30 a 40 minutos.

> 💡 **Nota interesante:** Los bucles existen porque los computadores son perfectos para hacer tareas repetitivas sin aburrirse. Un humano se equivoca en la repetición 100. Un computador no.

---

### 🔗 Conexión con Next.js

> Esta sección aparece todos los días esta semana. Su objetivo es que veas **por qué** lo que aprendes hoy no es "JavaScript de juguete" — es exactamente lo que escribirás en React/Next.js en el Mes 4.

En React, casi nunca escribirás un bucle `for` explícito como el de hoy. Pero el **concepto** — "repetir algo para cada elemento" — es la base de cómo React muestra listas:

```javascript
// Lo que harás HOY (Mes 1):
for (let i = 1; i <= 10; i++) {
    console.log(i)
}

// Lo que harás en Next.js (Mes 4-5), mismo concepto distinto método:
function ListaProductos({ productos }) {
    return (
        <ul>
            {productos.map((producto) => (
                <li key={producto.id}>{producto.nombre}</li>
            ))}
        </ul>
    )
}
```

`.map()` (que verás en Semana 03) es básicamente "un bucle for pero diseñado para crear cosas nuevas a partir de una lista". El bucle `for` de hoy es el abuelo de `.map()`. Entender uno te prepara para el otro. 😄

---

### 🛠 Ejercicio 1 — El bucle que cuenta

**Crear el archivo:** `dia01_ejercicio01.js`

Escribe un bucle `for` que muestre en consola los números del 1 al 10.

```
// Resultado esperado en consola:
1
2
3
4
...
10
```

<details>
<summary>💡 Pista 1</summary>

Un bucle `for` tiene tres partes:
```javascript
for (inicio; condición; incremento) {
    // lo que se repite
}
```
¿Qué valor tiene el inicio? ¿Cuándo para? ¿Cómo avanza?

</details>

<details>
<summary>💡 Pista 2</summary>

```javascript
for (let i = 1; i <= 10; i++) {
    // aquí va lo que quieres mostrar
}
```
`i++` significa "aumenta i en 1 cada vez".

</details>

---

### 🛠 Ejercicio 2 — Cuenta regresiva

**Crear el archivo:** `dia01_ejercicio02.js`

Escribe un bucle que cuente **hacia atrás** del 10 al 1 y al final muestre "¡Despegue!".

```
// Resultado esperado:
10
9
8
...
1
¡Despegue!
```

<details>
<summary>💡 Pista 1</summary>

Si `i++` sube, ¿qué operador bajaría?

</details>

<details>
<summary>💡 Pista 2</summary>

La condición de parada también cambia.
Si antes era `i <= 10`, ahora debe ser `i >= 1`.

</details>

---

### 🛠 Ejercicio 3 — Solo los pares

**Crear el archivo:** `dia01_ejercicio03.js`

Muestra en consola solo los números **pares** del 1 al 20.

```
// Resultado esperado:
2
4
6
...
20
```

<details>
<summary>💡 Pista 1</summary>

Un número es par si al dividirlo por 2, el resto es 0.
En JavaScript, el operador `%` entrega el resto de una división.
Ejemplo: `7 % 2` → `1` (impar). `8 % 2` → `0` (par).

</details>

<details>
<summary>💡 Pista 2</summary>

Dentro del bucle, antes de mostrar el número, pregúntate:
"¿Este número es par?"
Si la respuesta es sí, lo muestras. Si no, lo ignoras.

</details>

---

### 💼 Código real vs código de bootcamp

**Lo que escribiste hoy (código de bootcamp):**
```javascript
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i)
    }
}
```

**Cómo se vería en un proyecto profesional:**
```javascript
const MAX_NUMERO = 20

function esPar(numero) {
    return numero % 2 === 0
}

function obtenerNumerosPares(limite) {
    const pares = []
    for (let i = 1; i <= limite; i++) {
        if (esPar(i)) {
            pares.push(i)
        }
    }
    return pares
}

console.log(obtenerNumerosPares(MAX_NUMERO))
```

**¿Por qué la versión profesional es "mejor"?**
- `esPar()` es una función con nombre — cualquiera que lea `if (esPar(i))` entiende la intención sin pensar
- `MAX_NUMERO` en mayúsculas es una **constante** — convención para "este valor no debería cambiar durante la ejecución"
- La función `obtenerNumerosPares` **retorna** un array en vez de solo mostrar en consola — esto la hace **reutilizable**: puedes usar el resultado en otro lado, no solo verlo

> 💡 **No te preocupes si esto se ve "más complicado" ahora.** No se espera que escribas así todavía — `array.push()` lo verás formalmente la próxima semana. Esta sección es para que **reconozcas** el patrón cuando lo veas en código de otros, y entiendas hacia dónde vas.

---

### ⚠️ Errores comunes del Día 1

```javascript
// ❌ Error clásico: bucle infinito
for (let i = 1; i >= 1; i++) {
    console.log(i)
}
// La condición NUNCA se vuelve false — el programa se cuelga

// ✅ Correcto: la condición debe volverse false en algún momento
for (let i = 1; i <= 10; i++) {
    console.log(i)
}
```

> 🚨 Si tu programa se cuelga (no responde), probablemente tienes un bucle infinito.
> En el navegador: cierra la pestaña. En Node.js: `Ctrl + C` en la terminal.

---

### 📓 Registro Día 1

Crea `DIA_01_NOTAS.md` y responde:
1. ¿Para qué sirve un bucle? Explícalo como si le hablaras a alguien de 12 años.
2. ¿Cuál es la diferencia entre `while` y `for`? ¿Cuándo usarías cada uno?
3. ¿Qué es un bucle infinito y cómo lo evitas?

---

## 🗓 DÍA 2 — FUNCIONES: ACCIONES CON NOMBRE

### 🎯 Objetivo del día
Entender por qué las funciones son la herramienta más poderosa de la programación y cómo crearlas.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/function-basics
```

**Leer completo.**
**Detenerse:** cuando termines este capítulo. No avanzar al siguiente.

**⏱ Tiempo estimado:** 40 a 50 minutos.

> 💡 **Nota interesante:** Una función es como una receta de cocina.
> La escribes una vez. La usas mil veces. Con ingredientes distintos cada vez.
> El nombre de la función es el nombre de la receta.
> Los parámetros son los ingredientes.
> El `return` es el plato terminado.

---

### 🔗 Conexión con Next.js

Esto es probablemente la conexión más importante de toda la semana:

> **En React/Next.js, literalmente todo lo que ves en pantalla es el resultado de una función.**

```javascript
// Lo que harás HOY (Mes 1):
function calcularDescuento(precio, porcentaje) {
    return precio - (precio * porcentaje / 100)
}

console.log(calcularDescuento(10000, 20)) // 8000


// Lo que harás en Next.js (Mes 4+) — un "componente" ES una función:
function TarjetaProducto({ nombre, precio, descuento }) {
    const precioFinal = calcularDescuento(precio, descuento)

    return (
        <div className="border p-4 rounded">
            <h2>{nombre}</h2>
            <p>Precio final: ${precioFinal}</p>
        </div>
    )
}
```

`TarjetaProducto` es una función. Recibe parámetros (`nombre`, `precio`, `descuento`) igual que `calcularDescuento` recibe `precio` y `porcentaje`. Retorna algo (en este caso HTML especial llamado JSX) igual que `calcularDescuento` retorna un número.

**La sintaxis cambia. El concepto — parámetros entran, algo sale — es idéntico.** Por eso esta semana es tan importante.

---

### 🛠 Ejercicio 1 — Tu primera función real

**Crear el archivo:** `dia02_ejercicio01.js`

Crea una función llamada `saludar` que reciba un nombre y muestre en consola:
```
Hola, Oscar. Bienvenido al bootcamp.
```

Llámala 3 veces con nombres diferentes.

<details>
<summary>💡 Pista 1</summary>

```javascript
function nombreDeLaFuncion(parametro) {
    // lo que hace la función
}

// Llamarla:
nombreDeLaFuncion("valor")
```

</details>

<details>
<summary>💡 Pista 2</summary>

Recuerda los template literals de la Semana 1:
```javascript
console.log(`Hola, ${nombre}. Bienvenido al bootcamp.`)
```

</details>

---

### 🛠 Ejercicio 2 — Función con return

**Crear el archivo:** `dia02_ejercicio02.js`

Crea una función `calcularDescuento` que reciba:
- Un precio original
- Un porcentaje de descuento

Y **retorne** el precio final con el descuento aplicado.

```javascript
// Ejemplo de uso:
let precioFinal = calcularDescuento(10000, 20)
console.log(precioFinal) // 8000
```

<details>
<summary>💡 Pista 1</summary>

Para calcular un descuento:
`precio final = precio original - (precio original * porcentaje / 100)`

</details>

<details>
<summary>💡 Pista 2</summary>

La función debe usar `return` para devolver el resultado.
Sin `return`, la función hace el cálculo pero no te da el resultado.

</details>

<details>
<summary>💡 Pista 3</summary>

```javascript
function calcularDescuento(precio, porcentaje) {
    let descuento = // tu cálculo aquí
    return // el precio final
}
```

</details>

---

### 🛠 Ejercicio 3 — Función con decisión interna

**Crear el archivo:** `dia02_ejercicio03.js`

Crea una función `clasificarEdad` que reciba una edad y **retorne** la categoría correspondiente:
- Menor de 12 → `"Niño"`
- 12 a 17 → `"Joven"`
- 18 a 64 → `"Adulto"`
- 65 o más → `"Senior"`

```javascript
// Ejemplo de uso:
console.log(clasificarEdad(8))   // "Niño"
console.log(clasificarEdad(15))  // "Joven"
console.log(clasificarEdad(30))  // "Adulto"
console.log(clasificarEdad(70))  // "Senior"
```

<details>
<summary>💡 Pista 1</summary>

Dentro de una función puedes usar `if`, `else if` y `else` normalmente.
Cada rama del `if` puede tener su propio `return`.

</details>

---

### 💼 Código real vs código de bootcamp

**Lo que escribiste hoy (código de bootcamp):**
```javascript
function calcularDescuento(precio, porcentaje) {
    let resultado = precio - (precio * porcentaje / 100)
    return resultado
}
```

**Cómo se vería en un proyecto profesional:**
```javascript
/**
 * Calcula el precio final aplicando un porcentaje de descuento.
 * @param {number} precioOriginal - Precio antes del descuento
 * @param {number} porcentajeDescuento - Porcentaje a descontar (0-100)
 * @returns {number} Precio final con descuento aplicado
 */
function calcularPrecioConDescuento(precioOriginal, porcentajeDescuento) {
    if (porcentajeDescuento < 0 || porcentajeDescuento > 100) {
        throw new Error("El porcentaje debe estar entre 0 y 100")
    }

    const montoDescuento = precioOriginal * (porcentajeDescuento / 100)
    return precioOriginal - montoDescuento
}
```

**¿Qué cambió y por qué?**
- **El nombre `calcularPrecioConDescuento`** es más largo pero más específico — en un proyecto con 200 funciones, "calcularDescuento" podría confundirse con otra cosa
- **El comentario `/** ... */`** se llama JSDoc — herramientas como VS Code/Cursor lo leen y te muestran ayuda automática cuando usas la función
- **La validación `if (porcentajeDescuento < 0...)`** — código profesional asume que algo puede salir mal (alguien pasa -50% por error) y lo maneja explícitamente con `throw new Error()`
- **`const` en vez de `let`** para `montoDescuento` — nunca se reasigna, así que `const` comunica esa intención

> 💡 **No necesitas escribir JSDoc ni `throw new Error` todavía.** Esta sección existe para que cuando abras un proyecto de GitHub de otra persona (cosa que harás pronto), no te asustes al ver código "más elaborado" — ahora sabes que son las mismas ideas con capas extra de cuidado.

---

### ⚠️ Errores comunes del Día 2

```javascript
// ❌ Error: olvidar el return
function calcularDescuento(precio, porcentaje) {
    let resultado = precio - (precio * porcentaje / 100)
    // Sin return → la función devuelve undefined
}

// ✅ Correcto:
function calcularDescuento(precio, porcentaje) {
    let resultado = precio - (precio * porcentaje / 100)
    return resultado
}

// ❌ Error: confundir console.log con return
function sumar(a, b) {
    console.log(a + b)  // muestra el resultado pero no lo devuelve
}
let total = sumar(3, 4) // total es undefined, no 7

// ✅ Correcto:
function sumar(a, b) {
    return a + b  // devuelve el resultado
}
let total = sumar(3, 4) // total es 7
```

---

### 📓 Registro Día 2

Crea `DIA_02_NOTAS.md` y responde:
1. ¿Cuál es la diferencia entre `console.log` dentro de una función y `return`?
2. ¿Por qué es mejor que una función `return` un valor en vez de mostrarlo directamente?
3. ¿Qué pasa si llamas una función sin pasar todos sus parámetros?

---

## 🗓 DÍA 3 — SCOPE: DÓNDE VIVEN LAS VARIABLES

### 🎯 Objetivo del día
Entender por qué algunas variables son accesibles desde cualquier lugar y otras no.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/variable-scope
```

**Leer exactamente:**
- La sección `Code blocks`
- La sección `Nested functions`

**Detenerse en:** la sección `Closure` — es un tema avanzado para después.

**⏱ Tiempo estimado:** 30 minutos.

> 💡 **Nota interesante:** El scope es como las habitaciones de una casa.
> Lo que está en el living (scope global) lo ven todos.
> Lo que está en tu cuarto (scope local) solo lo ves tú.
> Si buscas algo en tu cuarto y no está, lo buscas en el living.
> Pero desde el living no puedes ver lo que está en tu cuarto.

---

### 🔗 Conexión con Next.js

El scope es la razón por la que React tiene una regla muy famosa llamada **"reglas de los Hooks"** que verás en el Mes 4. Por ahora, solo una probada:

```javascript
// Scope que ya entiendes HOY:
let contador = 0  // scope "global" de este archivo

function aumentar() {
    contador = contador + 1  // accede a la variable de afuera ✅
}


// En React (Mes 4+), cada COMPONENTE tiene su propio scope,
// como si fuera su propia "habitación":
function ContadorA() {
    let cuenta = 0  // esta variable vive SOLO dentro de ContadorA
    // ...
}

function ContadorB() {
    let cuenta = 0  // esta es OTRA variable, totalmente separada de la de ContadorA
    // ...
}
```

`ContadorA` y `ContadorB` pueden tener una variable con el **mismo nombre** (`cuenta`) sin chocar entre sí, porque cada función tiene su propio scope — exactamente como tu cuarto y el cuarto de otra persona pueden tener ambos una "cama" sin que sea la misma cama. 😄

Esto es exactamente lo que estás practicando en los ejercicios de hoy.

---

### 🛠 Ejercicio 1 — Predecir el scope

**Crear el archivo:** `dia03_ejercicio01.js`

Antes de ejecutar el código, **predice** qué mostrará cada `console.log`.
Luego ejecútalo y verifica si tenías razón.

```javascript
let mensaje = "Soy global"

function mostrarMensaje() {
    let mensajeLocal = "Soy local"
    console.log(mensaje)       // ¿Qué muestra? → predice aquí
    console.log(mensajeLocal)  // ¿Qué muestra? → predice aquí
}

mostrarMensaje()
console.log(mensaje)       // ¿Qué muestra? → predice aquí
console.log(mensajeLocal)  // ¿Qué muestra? → predice aquí
```

---

### 🛠 Ejercicio 2 — El scope en acción

**Crear el archivo:** `dia03_ejercicio02.js`

```javascript
let contador = 0

function aumentar() {
    contador = contador + 1
}

function reiniciar() {
    contador = 0
}

aumentar()
aumentar()
aumentar()
console.log(contador) // ¿Qué muestra? → predice

reiniciar()
console.log(contador) // ¿Qué muestra? → predice
```

Luego responde: ¿Por qué las funciones pueden modificar `contador` si está fuera de ellas?

---

### 💼 Código real vs código de bootcamp

**Lo que escribiste hoy (código de bootcamp):**
```javascript
let contador = 0

function aumentar() {
    contador = contador + 1
}
```

**Por qué este patrón se evita en proyectos profesionales:**
```javascript
// ❌ Esto causa bugs difíciles de rastrear en proyectos grandes
let contador = 0

function aumentar() {
    contador = contador + 1  // ¿quién más modifica "contador"? difícil saberlo
}

function otraFuncionLejana() {
    contador = -999  // sorpresa! esto rompe todo y es difícil de encontrar
}


// ✅ Patrón profesional: la función recibe y retorna, no "toca" variables externas
function aumentar(valorActual) {
    return valorActual + 1
}

let contador = 0
contador = aumentar(contador) // contador = 1
contador = aumentar(contador) // contador = 2
```

**¿Por qué importa esto?**

En un archivo de 20 líneas (como los de hoy) modificar una variable externa es inofensivo. En un proyecto de 50 archivos y 10,000 líneas, si 6 funciones distintas pueden modificar la misma variable global, encontrar **cuál de ellas** causó un bug se vuelve una pesadilla.

La versión profesional — "la función recibe datos y retorna datos nuevos, sin tocar nada de afuera" — se llama programación funcional pura, y es **exactamente** el modelo mental detrás de `useState` en React, que verás en el Mes 4.

> 💡 No cambies tu código de hoy — el ejercicio está diseñado para que veas el scope "tocando variables externas" intencionalmente. Solo guarda esta idea para el futuro.

---

### ⚠️ Errores comunes del Día 3

```javascript
// ❌ Error clásico de scope
function crearSaludo() {
    let saludo = "Hola"
}
crearSaludo()
console.log(saludo) // ReferenceError: saludo is not defined

// ✅ Correcto: usar return para sacar el valor
function crearSaludo() {
    let saludo = "Hola"
    return saludo
}
let miSaludo = crearSaludo()
console.log(miSaludo) // "Hola"
```

---

### 📓 Registro Día 3

Crea `DIA_03_NOTAS.md` y responde:
1. Define scope con tus propias palabras.
2. ¿Cuál es la diferencia entre scope global y scope local?
3. Explica la analogía de las habitaciones de una casa con el scope.

---

## 🗓 DÍA 4 — COMBINANDO TODO: BUCLES + FUNCIONES

### 🎯 Objetivo del día
Usar bucles dentro de funciones y funciones dentro de bucles para resolver problemas reales.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/function-basics
```

**Releer** la sección `Function naming` y `Functions == Comments`.

**⏱ Tiempo estimado:** 15 minutos de repaso.

---

### 🔗 Conexión con Next.js

Hoy combinas dos piezas. En Next.js esta combinación aparece constantemente cuando procesas datos antes de mostrarlos:

```javascript
// Patrón de HOY: función que usa un bucle internamente
function validarContrasena(contrasena) {
    return contrasena.length >= 8
}

// Patrón en Next.js (Mes 5+): función que procesa una LISTA completa
// antes de mostrarla — usando el mismo "function + repetición" pero con .map()
function ListaUsuarios({ usuarios }) {
    const usuariosValidos = usuarios.filter(u => validarContrasena(u.contrasena))

    return (
        <ul>
            {usuariosValidos.map(u => <li key={u.id}>{u.nombre}</li>)}
        </ul>
    )
}
```

`validarContrasena` que crearás hoy podría literalmente copiarse y pegarse sin cambios dentro de un componente de Next.js en 4 meses. Las funciones puras (entra algo, sale algo, sin efectos secundarios) son **portables** — funcionan igual en consola, en el navegador, o en un servidor. Esa es su superpotencia.

---

### 🛠 Ejercicio 1 — Tabla de multiplicar

**Crear el archivo:** `dia04_ejercicio01.js`

Crea una función `tablaMultiplicar` que reciba un número y muestre en consola su tabla de multiplicar del 1 al 10.

```
// tablaMultiplicar(7) debe mostrar:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
...
7 x 10 = 70
```

<details>
<summary>💡 Pista 1</summary>

Necesitas un bucle `for` **dentro** de la función.
El bucle va del 1 al 10.
En cada iteración multiplicas el número recibido por `i`.

</details>

<details>
<summary>💡 Pista 2</summary>

```javascript
function tablaMultiplicar(numero) {
    for (let i = 1; i <= 10; i++) {
        // aquí calculas y muestras cada línea
    }
}
```

</details>

---

### 🛠 Ejercicio 2 — Validador de contraseña

**Crear el archivo:** `dia04_ejercicio02.js`

Crea una función `validarContrasena` que reciba una contraseña (string) y retorne `true` si tiene **8 o más caracteres**, o `false` si tiene menos.

```javascript
console.log(validarContrasena("abc"))        // false
console.log(validarContrasena("abcdefgh"))   // true
console.log(validarContrasena("12345678"))   // true
```

> 💡 Pista: Las strings tienen una propiedad `.length` que te dice cuántos caracteres tienen.
> Ejemplo: `"hola".length` → `4`

---

### 🛠 Ejercicio 3 — Generador de saludo personalizado

**Crear el archivo:** `dia04_ejercicio03.js`

Crea una función `generarSaludo` que reciba:
- Un nombre
- Una hora del día (número del 0 al 23)

Y retorne el saludo correcto:
- 0 a 11 → `"Buenos días, Oscar"`
- 12 a 19 → `"Buenas tardes, Oscar"`
- 20 a 23 → `"Buenas noches, Oscar"`

Luego llama la función 3 veces con horas distintas y muestra los resultados.

---

### 📓 Registro Día 4

Crea `DIA_04_NOTAS.md` y responde:
1. ¿Cuándo tiene sentido poner un bucle dentro de una función?
2. ¿Cuál fue el ejercicio más difícil hoy y por qué?
3. ¿Qué es `.length` y para qué sirve?

---

## 🗓 DÍA 5 — PRÁCTICA Y RESOLUCIÓN DE PROBLEMAS

### 🎯 Objetivo del día
Resolver problemas reales usando todo lo aprendido esta semana.

---

### 📚 Ejercicios de javascript.info

**Ir a:**
```
https://javascript.info/while-for#tasks
```

**Resolver:**
- Last loop value
- Which values does the while show?
- Rewrite with for

Luego ir a:
```
https://javascript.info/function-basics#tasks
```

**Resolver:**
- Is "else" required?
- Rewrite the function using '?' or '||'
- Function min(a, b)
- Function pow(x, n)

**⏱ Tiempo estimado:** 60 a 75 minutos.

> ⚠️ **Regla de oro:** Si llevas más de 25 minutos bloqueado en un ejercicio, pide una pista.
> No pidas la solución completa. Solo una pista.
> La lucha es parte del aprendizaje — no es un obstáculo, es el camino.

---

### 📓 Registro Día 5

Crea `DIA_05_NOTAS.md`:
1. ¿Cuál ejercicio de javascript.info te costó más?
2. ¿Qué aprendiste de ese ejercicio que no sabías antes?
3. Escribe con tus palabras qué hace esta función:

```javascript
function pow(x, n) {
    let resultado = 1
    for (let i = 0; i < n; i++) {
        resultado *= x
    }
    return resultado
}
```

---

## 🗓 DÍA 6 — PROYECTOS FINALES (DOS SABORES)

### 🏆 EVALUACIÓN SEMANA 02

> Esta semana tiene **dos proyectos** en vez de uno. Son dos "sabores" distintos de aplicaciones que existen en el mundo real, y ambos usan exactamente lo mismo que aprendiste: bucles, funciones y scope. La idea es que veas que las mismas herramientas sirven para dominios completamente distintos — una empresa de turismo y una red social no tienen nada en común como negocio, pero el código que las hace funcionar comparte el mismo ADN.

---

### 🏔️ PROYECTO A — Calculadora de Cotizaciones (Sabor: Sistema de Negocio)

#### Caso Real: TerraMater Expediciones

> **TerraMater Expediciones** es una empresa chilena de turismo aventura.
> Ofrecen 3 tipos de expediciones: Trekking, Kayak y Escalada.
> Necesitan un sistema que calcule cotizaciones automáticamente
> según el tipo de actividad, el número de personas y si aplican descuentos.
> Actualmente lo hacen a mano y cometen errores.
> Tu trabajo es automatizarlo.

---

#### 📁 Archivo a crear

```
cotizador_terramater.js
```

---

#### 📋 Requisitos del sistema

**Precios base por persona:**
```
Trekking  → $45.000 CLP
Kayak     → $65.000 CLP
Escalada  → $80.000 CLP
```

**Reglas de descuento:**
```
Grupos de 5 a 9 personas  → 10% de descuento
Grupos de 10 o más        → 20% de descuento
Menos de 5 personas       → sin descuento
```

**El sistema debe:**

1. **Pedir** el nombre del cliente
2. **Pedir** el tipo de expedición (Trekking / Kayak / Escalada)
3. **Pedir** el número de personas
4. **Calcular** el precio base total (precio por persona × número de personas)
5. **Calcular** el descuento si corresponde
6. **Mostrar** el resumen de la cotización

**Formato del resumen final:**
```
=== TERRAMATER EXPEDICIONES ===
=== COTIZACIÓN OFICIAL ===

Cliente: María González
Expedición: Kayak
Personas: 8
Precio por persona: $65.000
Subtotal: $520.000
Descuento (10%): -$52.000
─────────────────────────────
TOTAL: $468.000

Válido por 7 días.
¡Gracias por elegir TerraMater!
```

---

#### 📋 Requisitos técnicos

**Debes crear al menos estas funciones:**

```javascript
// Retorna el precio por persona según la actividad
function obtenerPrecio(actividad) { }

// Retorna el porcentaje de descuento según el número de personas
function obtenerDescuento(personas) { }

// Retorna el total calculado con descuento incluido
function calcularTotal(precioBase, personas, descuento) { }
```

**Restricciones:**
- ✅ Usar funciones con `return`
- ✅ Usar `if`, `else if`, `else`
- ✅ Usar template literals
- ✅ Usar `prompt()` y `alert()`
- ✅ Usar `Number()` para convertir el input de personas
- ❌ No usar arrays
- ❌ No usar objetos
- ❌ No usar métodos de arrays

---

#### 💡 PISTAS PROGRESIVAS

<details>
<summary>💡 Pista 1 — ¿Cómo obtener el precio según actividad?</summary>

```javascript
function obtenerPrecio(actividad) {
    if (actividad.toLowerCase() === "trekking") {
        return 45000
    } else if (actividad.toLowerCase() === "kayak") {
        return 65000
    } else if (actividad.toLowerCase() === "escalada") {
        return 80000
    } else {
        return 0 // actividad no válida
    }
}
```

</details>

<details>
<summary>💡 Pista 2 — ¿Cómo calcular el descuento?</summary>

La función `obtenerDescuento` recibe el número de personas y retorna el **porcentaje** (10, 20, o 0).
Luego en `calcularTotal` usas ese porcentaje para calcular el monto a descontar.

</details>

<details>
<summary>💡 Pista 3 — ¿Cómo formatear los números con puntos de miles?</summary>

JavaScript tiene un método para formatear números:
```javascript
let numero = 468000
console.log(numero.toLocaleString("es-CL")) // "468.000"
```
Esto hace que los números se vean como precios chilenos.

</details>

<details>
<summary>💡 Pista 4 — ¿Cómo construir el resumen final?</summary>

Construye el mensaje completo en una variable antes del `alert()`:
```javascript
let resumen = `=== TERRAMATER EXPEDICIONES ===
...
Cliente: ${nombre}
...`
alert(resumen)
```

</details>

---

#### 🔍 SOLUCIÓN COMPLETA — Proyecto A

> ⚠️ **NO MIRAR hasta haber intentado al menos 60 minutos.**

<details>
<summary>🔓 Ver solución completa</summary>

```javascript
// === COTIZADOR TERRAMATER EXPEDICIONES ===

// FUNCIONES

function obtenerPrecio(actividad) {
    let act = actividad.toLowerCase()
    if (act === "trekking") {
        return 45000
    } else if (act === "kayak") {
        return 65000
    } else if (act === "escalada") {
        return 80000
    } else {
        return 0
    }
}

function obtenerDescuento(personas) {
    if (personas >= 10) {
        return 20
    } else if (personas >= 5) {
        return 10
    } else {
        return 0
    }
}

function calcularTotal(precioPorPersona, personas, porcentajeDescuento) {
    let subtotal = precioPorPersona * personas
    let montoDescuento = subtotal * porcentajeDescuento / 100
    let total = subtotal - montoDescuento
    return total
}

// PROGRAMA PRINCIPAL

let nombre = prompt("Bienvenido a TerraMater Expediciones\n¿Cuál es tu nombre?")
if (nombre === null || nombre === "") nombre = "Cliente"

let actividad = prompt("¿Qué expedición te interesa?\nTrekking / Kayak / Escalada")
if (actividad === null) actividad = ""

let personasTexto = prompt("¿Cuántas personas van?")
let personas = Number(personasTexto)

let precioPorPersona = obtenerPrecio(actividad)
let porcentajeDescuento = obtenerDescuento(personas)
let subtotal = precioPorPersona * personas
let montoDescuento = subtotal * porcentajeDescuento / 100
let total = calcularTotal(precioPorPersona, personas, porcentajeDescuento)

let textoDescuento = porcentajeDescuento > 0
    ? `Descuento (${porcentajeDescuento}%): -$${montoDescuento.toLocaleString("es-CL")}\n`
    : "Sin descuento\n"

let resumen = `=== TERRAMATER EXPEDICIONES ===
=== COTIZACIÓN OFICIAL ===

Cliente: ${nombre}
Expedición: ${actividad}
Personas: ${personas}
Precio por persona: $${precioPorPersona.toLocaleString("es-CL")}
Subtotal: $${subtotal.toLocaleString("es-CL")}
${textoDescuento}─────────────────────────────
TOTAL: $${total.toLocaleString("es-CL")}

Válido por 7 días.
¡Gracias por elegir TerraMater!`

alert(resumen)
```

</details>

---

### 📱 PROYECTO B — Mini Analizador de Posts (Sabor: Red Social)

#### Caso Real: PocketFeed

> **PocketFeed** es una pequeña red social en desarrollo (estilo Twitter/X simplificado).
> El equipo necesita una herramienta de moderación básica que analice posts
> de texto **antes** de publicarlos, para detectar problemas comunes:
> posts vacíos, demasiado largos, o que excedan el límite de hashtags.
> Te piden construir el "motor de validación" — la lógica pura,
> sin interfaz visual todavía (eso vendrá cuando aprendas React).

---

#### 📁 Archivo a crear

```
analizador_pocketfeed.js
```

---

#### 📋 Reglas de PocketFeed

```
Longitud máxima de un post:  280 caracteres
Longitud mínima:              1 carácter (no puede estar vacío)
Máximo de hashtags por post:  5
Un hashtag = una palabra que empieza con "#"
```

---

#### 📋 Requisitos del sistema

El sistema debe analizar **5 posts de prueba** (los defines tú, hardcodeados en el código, no con `prompt`) y para cada uno mostrar:

1. El texto del post (recortado a 50 caracteres si es muy largo, con "..." al final)
2. La cantidad de caracteres
3. La cantidad de hashtags encontrados
4. Si el post es **válido** o **inválido**, y por qué

**Formato de salida esperado:**
```
=== ANÁLISIS DE POSTS — PocketFeed ===

Post 1: "Hoy aprendí sobre bucles y funciones en JavaScript #c..."
Caracteres: 95/280
Hashtags: 2/5
Estado: ✅ VÁLIDO

Post 2: ""
Caracteres: 0/280
Hashtags: 0/5
Estado: ❌ INVÁLIDO — El post no puede estar vacío

Post 3: (post de 300 caracteres)
Caracteres: 300/280
Hashtags: 1/5
Estado: ❌ INVÁLIDO — Excede el límite de caracteres por 20

Post 4: (post con 7 hashtags)
Caracteres: 120/280
Hashtags: 7/5
Estado: ❌ INVÁLIDO — Excede el límite de hashtags por 2

=== RESUMEN ===
Posts válidos: 1
Posts inválidos: 3
```

---

#### 📋 Requisitos técnicos

**Debes crear al menos estas funciones:**

```javascript
// Cuenta cuántos hashtags tiene un texto
function contarHashtags(texto) { }

// Retorna un objeto-like con el resultado del análisis
// (puedes retornar múltiples valores usando varias funciones,
//  o concatenando un string — tu decisión)
function analizarPost(texto) { }

// Recorta el texto a 50 caracteres + "..." si es necesario
function recortarTexto(texto) { }
```

**Restricciones:**
- ✅ Usar funciones con `return`
- ✅ Usar bucles `for` o `while` (por ejemplo para contar hashtags carácter por carácter)
- ✅ Usar `if`, `else if`, `else`
- ✅ Usar template literals
- ✅ Los 5 posts de prueba van escritos directamente en el código (sin `prompt`)
- ❌ No usar arrays (todavía) — si necesitas "varios posts", usa 5 variables separadas: `post1`, `post2`, etc.
- ❌ No usar `.split()` ni métodos de string avanzados — cuenta caracteres con bucles

---

#### 💡 PISTAS PROGRESIVAS

<details>
<summary>💡 Pista 1 — ¿Cómo contar hashtags sin usar arrays?</summary>

Recorre el texto carácter por carácter con un bucle `for`.
Si el carácter actual es `"#"`, suma 1 a un contador.

```javascript
function contarHashtags(texto) {
    let contador = 0
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === "#") {
            contador = contador + 1
        }
    }
    return contador
}
```

`texto[i]` te da el carácter en la posición `i` de un string — funciona similar a un array.

</details>

<details>
<summary>💡 Pista 2 — ¿Cómo recortar el texto a 50 caracteres?</summary>

Usa `.slice(0, 50)` para tomar los primeros 50 caracteres:
```javascript
function recortarTexto(texto) {
    if (texto.length > 50) {
        return texto.slice(0, 50) + "..."
    } else {
        return texto
    }
}
```

</details>

<details>
<summary>💡 Pista 3 — ¿Cómo construir el estado VÁLIDO/INVÁLIDO con múltiples razones posibles?</summary>

Usa `if / else if / else` en orden de prioridad — revisa primero el caso "vacío",
luego "muy largo", luego "demasiados hashtags", y si nada de eso pasa, es válido:

```javascript
function obtenerEstado(texto, hashtags) {
    if (texto.length === 0) {
        return "❌ INVÁLIDO — El post no puede estar vacío"
    } else if (texto.length > 280) {
        let exceso = texto.length - 280
        return `❌ INVÁLIDO — Excede el límite de caracteres por ${exceso}`
    } else if (hashtags > 5) {
        let exceso = hashtags - 5
        return `❌ INVÁLIDO — Excede el límite de hashtags por ${exceso}`
    } else {
        return "✅ VÁLIDO"
    }
}
```

</details>

<details>
<summary>💡 Pista 4 — ¿Cómo armar el reporte completo de un post?</summary>

Crea una función que reciba el texto, llame a las otras funciones, y construya el bloque de texto:

```javascript
function analizarPost(texto, numeroPost) {
    let hashtags = contarHashtags(texto)
    let textoRecortado = recortarTexto(texto)
    let estado = obtenerEstado(texto, hashtags)

    return `Post ${numeroPost}: "${textoRecortado}"
Caracteres: ${texto.length}/280
Hashtags: ${hashtags}/5
Estado: ${estado}
`
}
```

Luego llamas `analizarPost(post1, 1)`, `analizarPost(post2, 2)`, etc., y muestras todo con `console.log`.

</details>

---

#### 🔍 SOLUCIÓN COMPLETA — Proyecto B

> ⚠️ **NO MIRAR hasta haber intentado al menos 45 minutos.**

<details>
<summary>🔓 Ver solución completa</summary>

```javascript
// === ANALIZADOR DE POSTS — PocketFeed ===

const MAX_CARACTERES = 280
const MAX_HASHTAGS = 5

// Cuenta hashtags recorriendo carácter por carácter
function contarHashtags(texto) {
    let contador = 0
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === "#") {
            contador = contador + 1
        }
    }
    return contador
}

// Recorta el texto si es muy largo
function recortarTexto(texto) {
    if (texto.length > 50) {
        return texto.slice(0, 50) + "..."
    } else {
        return texto
    }
}

// Determina el estado del post
function obtenerEstado(texto, hashtags) {
    if (texto.length === 0) {
        return "❌ INVÁLIDO — El post no puede estar vacío"
    } else if (texto.length > MAX_CARACTERES) {
        let exceso = texto.length - MAX_CARACTERES
        return `❌ INVÁLIDO — Excede el límite de caracteres por ${exceso}`
    } else if (hashtags > MAX_HASHTAGS) {
        let exceso = hashtags - MAX_HASHTAGS
        return `❌ INVÁLIDO — Excede el límite de hashtags por ${exceso}`
    } else {
        return "✅ VÁLIDO"
    }
}

// Verifica si un post es válido (true/false) — útil para el resumen
function esValido(texto, hashtags) {
    return obtenerEstado(texto, hashtags) === "✅ VÁLIDO"
}

// Construye el bloque de análisis de un post
function analizarPost(texto, numeroPost) {
    let hashtags = contarHashtags(texto)
    let textoRecortado = recortarTexto(texto)
    let estado = obtenerEstado(texto, hashtags)

    return `Post ${numeroPost}: "${textoRecortado}"
Caracteres: ${texto.length}/${MAX_CARACTERES}
Hashtags: ${hashtags}/${MAX_HASHTAGS}
Estado: ${estado}
`
}

// === LOS 5 POSTS DE PRUEBA ===

let post1 = "Hoy aprendí sobre bucles y funciones en JavaScript #codigo #aprendizaje"

let post2 = ""

let post3 = "Este es un post extremadamente largo que repite la misma idea una y otra vez para alcanzar más de 280 caracteres y así poder probar correctamente la validación de longitud máxima del sistema PocketFeed, que es exactamente lo que estamos verificando aquí mismo en este momento ahora."

let post4 = "Probando muchos hashtags #uno #dos #tres #cuatro #cinco #seis #siete"

let post5 = "Buenas tardes a todos, espero que estén teniendo un excelente día de programación #JavaScript"

// === GENERAR REPORTE ===

let reporte = `=== ANÁLISIS DE POSTS — PocketFeed ===

`
reporte += analizarPost(post1, 1) + "\n"
reporte += analizarPost(post2, 2) + "\n"
reporte += analizarPost(post3, 3) + "\n"
reporte += analizarPost(post4, 4) + "\n"
reporte += analizarPost(post5, 5) + "\n"

// === RESUMEN ===

let validos = 0
let invalidos = 0

if (esValido(post1, contarHashtags(post1))) { validos++ } else { invalidos++ }
if (esValido(post2, contarHashtags(post2))) { validos++ } else { invalidos++ }
if (esValido(post3, contarHashtags(post3))) { validos++ } else { invalidos++ }
if (esValido(post4, contarHashtags(post4))) { validos++ } else { invalidos++ }
if (esValido(post5, contarHashtags(post5))) { validos++ } else { invalidos++ }

reporte += `=== RESUMEN ===
Posts válidos: ${validos}
Posts inválidos: ${invalidos}`

console.log(reporte)
```

</details>

---

### ✅ CRITERIOS DE APROBACIÓN — AMBOS PROYECTOS

**Proyecto A — Cotizador TerraMater:**
- [ ] El programa corre sin errores
- [ ] Creaste al menos 3 funciones separadas
- [ ] Cada función tiene `return`
- [ ] El descuento se calcula correctamente para grupos de 5-9 y 10+
- [ ] El resumen muestra toda la información con formato chileno

**Proyecto B — Analizador PocketFeed:**
- [ ] El programa corre sin errores
- [ ] `contarHashtags` cuenta correctamente recorriendo carácter por carácter
- [ ] Los 5 posts de prueba cubren los distintos casos (vacío, muy largo, muchos hashtags, normal)
- [ ] El resumen final cuenta correctamente válidos/inválidos

**Ambos:**
- [ ] Puedes explicar cada función en voz alta
- [ ] Los archivos están subidos a GitHub con commits descriptivos

---

## 💼 MINI-ENTREVISTA TÉCNICA — SEMANA 02

> Estas son preguntas **tipo entrevista real** sobre lo que aprendiste esta semana.
> No son preguntas de "examen de colegio" — son el tipo de preguntas que un entrevistador
> técnico junior podría hacerte en una llamada de 30 minutos.
> Respóndelas en voz alta, como si la otra persona estuviera escuchando.
> Escribe tus respuestas en `ENTREVISTA_SEMANA_02.md`.

---

### Pregunta 1
> "Tenemos esta función en nuestro código y un compañero dice que tiene un bug. ¿Puedes encontrarlo?"

```javascript
function calcularTotal(precio, cantidad) {
    let total = precio * cantidad
    console.log(total)
}

let totalCompra = calcularTotal(1000, 3)
console.log(totalCompra + 500)
```

<details>
<summary>💡 Pista</summary>

¿Qué retorna `calcularTotal`? ¿Qué tipo de dato es `totalCompra`?

</details>

---

### Pregunta 2
> "¿Por qué en JavaScript preferimos usar funciones que retornan valores (`return`) en vez de funciones que solo modifican variables externas? Da un ejemplo de cuándo esto podría causar un problema en un equipo grande."

> 💡 Esta pregunta no tiene "una sola respuesta correcta" — un entrevistador quiere ver **cómo razonas**, no que recites una definición.

---

### Pregunta 3
> "Te paso este código. Sin ejecutarlo, ¿qué crees que va a pasar? ¿Por qué?"

```javascript
function procesar() {
    let resultado = "procesado"
    return resultado
}

procesar()
console.log(resultado)
```

<details>
<summary>💡 Pista</summary>

Esto está directamente relacionado con lo que estudiaste el Día 3 — scope.

</details>

---

### Pregunta 4
> "¿Cuándo usarías un bucle `for` y cuándo un `while`? Dame un ejemplo de cada caso donde uno sea claramente mejor que el otro."

---

### Pregunta 5 — Pregunta de código en vivo (la más común en entrevistas junior)
> "Escribe en el pizarrón (o en este caso, en tu archivo) una función llamada `esPrimo` que reciba un número y retorne `true` si es un número primo, `false` si no lo es."

> Un número primo es un número mayor a 1 que solo es divisible por 1 y por sí mismo.
> Ejemplos: 2, 3, 5, 7, 11 son primos. 4, 6, 8, 9 no lo son.

<details>
<summary>💡 Pista 1</summary>

Necesitas recorrer todos los números del 2 hasta el número - 1.
Si alguno de ellos divide exactamente al número (resto 0 con `%`), no es primo.

</details>

<details>
<summary>💡 Pista 2 — Solución</summary>

```javascript
function esPrimo(numero) {
    if (numero <= 1) {
        return false
    }
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false
        }
    }
    return true
}
```

</details>

---

## 🗓 DÍA 7 — CHECKPOINT FINAL

### Sin mirar apuntes ni código

Responde en `CHECKPOINT_SEMANA_02.md`:

**Bucles:**
1. ¿Cuál es la diferencia entre `for` y `while`? ¿Cuándo usarías cada uno?
2. ¿Qué es un bucle infinito? Da un ejemplo y explica por qué ocurre.
3. ¿Qué hace el operador `%`? Da 3 ejemplos.

**Funciones:**
4. ¿Cuál es la diferencia entre `console.log` dentro de una función y `return`?
5. ¿Qué pasa si una función no tiene `return`? ¿Qué devuelve?
6. ¿Cuántos `return` puede tener una función?

**Scope:**
7. ¿Qué es el scope? Explícalo con la analogía de las habitaciones.
8. ¿Puede una función acceder a variables definidas fuera de ella? ¿Y al revés?

**Conexión con Next.js:**
9. Esta semana viste 3 veces una sección "Conexión con Next.js". En tus propias palabras, ¿cuál fue la conexión que más te ayudó a entender hacia dónde vas? ¿Por qué?

**Código:**
10. Explica línea por línea qué hace este código:
```javascript
function esPar(numero) {
    return numero % 2 === 0
}

for (let i = 1; i <= 10; i++) {
    if (esPar(i)) {
        console.log(i + " es par")
    }
}
```

11. Sin ejecutarlo: ¿qué mostrará en consola?

---

## 📓 REGISTRO FINAL DE LA SEMANA

Crea `REGISTRO_SEMANA_02.md`:

```markdown
# Registro Semana 02

## ¿Qué fue lo más difícil de esta semana?

## ¿Qué concepto te costó más entender? ¿Cómo lo superaste?

## ¿Qué fue lo que más te sorprendió?

## ¿Cuál de los dos proyectos finales disfrutaste más, el cotizador o el analizador de posts? ¿Por qué?

## ¿Hay algo que todavía no tienes claro?

## Califica tu semana del 1 al 10 y explica por qué.

## En una frase: ¿para qué sirve una función?
```

---

## 🗂️ ARCHIVOS A ENTREGAR ESTA SEMANA

```
📁 semana-02/
├── dia01_ejercicio01.js       ← bucle del 1 al 10
├── dia01_ejercicio02.js       ← cuenta regresiva
├── dia01_ejercicio03.js       ← solo los pares
├── dia02_ejercicio01.js       ← función saludar
├── dia02_ejercicio02.js       ← calcularDescuento
├── dia02_ejercicio03.js       ← clasificarEdad
├── dia03_ejercicio01.js       ← predecir el scope
├── dia03_ejercicio02.js       ← scope en acción
├── dia04_ejercicio01.js       ← tabla de multiplicar
├── dia04_ejercicio02.js       ← validador de contraseña
├── dia04_ejercicio03.js       ← generador de saludo
├── cotizador_terramater.js    ← proyecto final A ⭐
├── analizador_pocketfeed.js   ← proyecto final B ⭐
├── ENTREVISTA_SEMANA_02.md    ← respuestas mini-entrevista técnica
├── CHECKPOINT_SEMANA_02.md    ← respuestas sin apuntes
└── REGISTRO_SEMANA_02.md      ← reflexión de la semana
```

Todos los archivos deben estar en tu repositorio `bootcamp-fullstack`, dentro de la carpeta `semana-02/`, con commits descriptivos.

---

## 🚀 SIGUIENTE PASO

Si completaste todo lo anterior:

```
✅ 11 ejercicios resueltos
✅ Cotizador TerraMater funcionando
✅ Analizador PocketFeed funcionando
✅ Mini-entrevista técnica respondida
✅ Checkpoint respondido sin apuntes
✅ Registro completado
✅ Todo subido a GitHub
```

**Has ganado el derecho de avanzar a:**

---

> ### 📘 BOOTCAMP PERSONAL — SEMANA 03
> **Tema:** Arrays · Métodos esenciales · Estructuras de datos
> `push` · `pop` · `map` · `filter` · `reduce` · primeros algoritmos con datos reales

---

*Bootcamp generado específicamente para Óscar — Full Stack Developer en formación 🇨🇱*
*Stack objetivo: Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk*
*Semana 2 de 52 — Bucles · Funciones · Scope — v2 (con conexión Next.js, código profesional y entrevista técnica)*
