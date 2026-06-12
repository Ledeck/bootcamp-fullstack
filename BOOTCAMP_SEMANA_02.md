# 📘 BOOTCAMP PERSONAL — SEMANA 02
## JAVASCRIPT FUNDAMENTALS II
### Bucles · Funciones · Scope · Primeros Algoritmos Reales

---

> **Alumno:** Óscar  
> **Objetivo final:** Full Stack Developer empleable en 13 meses  
> **Stack objetivo:** Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk  
> **Semana:** 2 de 52  
> **Nivel:** Principiante con Semana 01 completada  
> **Prerequisito:** Variables, tipos de datos, if/else y operador ternario dominados ✅

---

## 🎯 MISIÓN DE LA SEMANA

Al finalizar esta semana serás capaz de:

- ✅ Repetir acciones automáticamente con `for` y `while`
- ✅ Crear funciones reutilizables con parámetros y return
- ✅ Entender el scope y por qué las variables "viven" en ciertos lugares
- ✅ Resolver problemas reales descomponiéndolos en pasos pequeños
- ✅ Construir una calculadora de cotizaciones para una empresa real

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

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 EVALUACIÓN SEMANA 02

---

### Caso Real: Calculadora de Cotizaciones para Empresa de Turismo Aventura

> **TerraMater Expediciones** es una empresa chilena de turismo aventura.  
> Ofrecen 3 tipos de expediciones: Trekking, Kayak y Escalada.  
> Necesitan un sistema que calcule cotizaciones automáticamente  
> según el tipo de actividad, el número de personas y si aplican descuentos.  
> Actualmente lo hacen a mano y cometen errores.  
> Tu trabajo es automatizarlo.

---

### 📁 Archivo a crear

```
cotizador_terramater.js
```

---

### 📋 Requisitos del sistema

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

### 📋 Requisitos técnicos

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

### 💡 PISTAS PROGRESIVAS

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

### 🔍 SOLUCIÓN COMPLETA

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

### ✅ CRITERIOS DE APROBACIÓN

- [ ] El programa corre sin errores
- [ ] Creaste al menos 3 funciones separadas
- [ ] Cada función tiene `return`
- [ ] El descuento se calcula correctamente para grupos de 5-9 y 10+
- [ ] El resumen muestra toda la información
- [ ] Los precios tienen formato chileno (puntos de miles)
- [ ] Puedes explicar cada función en voz alta
- [ ] El archivo está subido a GitHub con un commit descriptivo

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

**Código:**
9. Explica línea por línea qué hace este código:
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

10. Sin ejecutarlo: ¿qué mostrará en consola?

---

## 📓 REGISTRO FINAL DE LA SEMANA

Crea `REGISTRO_SEMANA_02.md`:

```markdown
# Registro Semana 02

## ¿Qué fue lo más difícil de esta semana?

## ¿Qué concepto te costó más entender? ¿Cómo lo superaste?

## ¿Qué fue lo que más te sorprendió?

## ¿Hay algo que todavía no tienes claro?

## Califica tu semana del 1 al 10 y explica por qué.

## En una frase: ¿para qué sirve una función?
```

---

## 🗂️ ARCHIVOS A ENTREGAR ESTA SEMANA

```
📁 semana-02/
├── dia01_ejercicio01.js    ← bucle del 1 al 10
├── dia01_ejercicio02.js    ← cuenta regresiva
├── dia01_ejercicio03.js    ← solo los pares
├── dia02_ejercicio01.js    ← función saludar
├── dia02_ejercicio02.js    ← calcularDescuento
├── dia02_ejercicio03.js    ← clasificarEdad
├── dia03_ejercicio01.js    ← predecir el scope
├── dia03_ejercicio02.js    ← scope en acción
├── dia04_ejercicio01.js    ← tabla de multiplicar
├── dia04_ejercicio02.js    ← validador de contraseña
├── dia04_ejercicio03.js    ← generador de saludo
├── cotizador_terramater.js ← proyecto final ⭐
├── CHECKPOINT_SEMANA_02.md ← respuestas sin apuntes
└── REGISTRO_SEMANA_02.md   ← reflexión de la semana
```

Todos los archivos deben estar en un repositorio GitHub con commits descriptivos.

---

## 🚀 SIGUIENTE PASO

Si completaste todo lo anterior:

```
✅ 11 ejercicios resueltos
✅ Cotizador TerraMater funcionando
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
*Semana 2 de 52 — Bucles · Funciones · Scope*
