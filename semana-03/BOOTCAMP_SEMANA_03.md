# 📘 BOOTCAMP PERSONAL — SEMANA 03
## JAVASCRIPT FUNDAMENTALS III
### Arrays · Métodos Esenciales · Primeros Algoritmos con Datos Reales

---

> **Alumno:** Óscar
> **Objetivo final:** Full Stack Developer empleable en 13 meses
> **Stack objetivo:** Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk
> **Semana:** 3 de 52
> **Nivel:** Semanas 01 y 02 completadas ✅
> **Prerequisito:** Variables, tipos, condicionales, bucles y funciones dominados ✅

---

## 🎯 MISIÓN DE LA SEMANA

Al finalizar esta semana serás capaz de:

- ✅ Crear y manipular arrays con confianza
- ✅ Usar los métodos esenciales: `push`, `pop`, `shift`, `unshift`, `length`
- ✅ Transformar datos con `map`
- ✅ Filtrar datos con `filter`
- ✅ Reducir datos a un valor con `reduce`
- ✅ Buscar elementos con `find` y `findIndex`
- ✅ Construir un sistema de gestión de inventario para una empresa real

> 💡 **Concepto clave de la semana:** Hasta ahora trabajaste con datos individuales — un nombre, un precio, una edad.
> En el mundo real, los datos vienen en colecciones — una lista de productos, una lista de usuarios, una lista de pedidos.
> Los arrays son la herramienta para manejar esas colecciones.
> Y `map`, `filter` y `reduce` son las tres operaciones más poderosas que existen sobre colecciones.
> Domínalos y podrás manipular cualquier dato que te encuentres en tu carrera. 💪

---

## ⚠️ REGLAS DEL BOOTCAMP

Durante esta semana **NO estudiar:**

- ❌ Objetos (la semana que viene)
- ❌ Arrow functions avanzadas (las verás en Semana 05)
- ❌ Métodos de arrays avanzados: `flat`, `flatMap`, `entries`
- ❌ React, TypeScript, Node.js
- ❌ Nada fuera de este archivo

**Tu único trabajo esta semana es ejecutar este plan.**
No decides qué estudiar. No buscas recursos extra. Solo abres este archivo y ejecutas.

---

## 🗓 DÍA 1 — ¿QUÉ ES UN ARRAY Y POR QUÉ EXISTE?

### 🎯 Objetivo del día
Entender qué problema resuelven los arrays y cómo crearlos y manipularlos básicamente.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/array
```

**Leer exactamente:**
- Sección `Declaration`
- Sección `Get last elements with "at"`
- Sección `Methods pop/push, shift/unshift`
- Sección `Internals`
- Sección `Performance`

**Detenerse en:** la sección `Loops` — no leer más allá.

**⏱ Tiempo estimado:** 30 a 40 minutos.

> 💡 **Nota interesante:** Los arrays en JavaScript son en realidad objetos especiales.
> Por eso `typeof []` devuelve `"object"` y no `"array"`.
> Es otro souvenir de los 10 días de Brendan Eich. 😄
> Para verificar si algo es un array de verdad se usa `Array.isArray(valor)`.

---

### 🛠 Ejercicio 1 — Tu primer array

**Crear el archivo:** `dia01_ejercicio01.js`

Crea un array con los nombres de 5 ciudades de Chile.
Muestra en consola:
- El primer elemento
- El último elemento
- La cantidad total de ciudades
- La ciudad en la posición 3

```
// Resultado esperado (con tus ciudades):
Primera ciudad: Santiago
Última ciudad: Punta Arenas
Total de ciudades: 5
Ciudad en posición 3: Concepción
```

<details>
<summary>💡 Pista 1</summary>

Los arrays se crean con corchetes:
```javascript
let ciudades = ["Santiago", "Valparaíso", "Concepción", "Temuco", "Punta Arenas"]
```
Los índices empiezan en 0, no en 1.
El primer elemento es `ciudades[0]`.

</details>

<details>
<summary>💡 Pista 2</summary>

Para el último elemento sin saber cuántos hay:
```javascript
ciudades[ciudades.length - 1]
```
O la forma moderna:
```javascript
ciudades.at(-1)
```

</details>

---

### 🛠 Ejercicio 2 — Modificar un array

**Crear el archivo:** `dia01_ejercicio02.js`

Empieza con este array:
```javascript
let frutas = ["manzana", "pera", "naranja"]
```

Luego paso a paso:
1. Agrega `"uva"` al **final**
2. Agrega `"frutilla"` al **inicio**
3. Elimina el último elemento
4. Elimina el primer elemento
5. Muestra el array después de cada operación

```
// Resultado esperado:
Inicio: ["manzana", "pera", "naranja"]
Después de push: ["manzana", "pera", "naranja", "uva"]
Después de unshift: ["frutilla", "manzana", "pera", "naranja", "uva"]
Después de pop: ["frutilla", "manzana", "pera", "naranja"]
Después de shift: ["manzana", "pera", "naranja"]
```

<details>
<summary>💡 Pista 1</summary>

Los cuatro métodos básicos:
```
push(elemento)    → agrega al final
pop()             → elimina del final, devuelve el elemento eliminado
unshift(elemento) → agrega al inicio
shift()           → elimina del inicio, devuelve el elemento eliminado
```

</details>

---

### 🛠 Ejercicio 3 — Array de números

**Crear el archivo:** `dia01_ejercicio03.js`

Dado este array:
```javascript
let precios = [15000, 8500, 32000, 4200, 19800, 7600, 25000]
```

Sin usar métodos avanzados (solo el bucle `for` que ya sabes):
1. Muestra todos los precios en consola
2. Calcula el precio total
3. Calcula el precio promedio
4. Encuentra el precio más alto
5. Encuentra el precio más bajo

<details>
<summary>💡 Pista 1</summary>

Para recorrer un array con `for`:
```javascript
for (let i = 0; i < precios.length; i++) {
    console.log(precios[i])
}
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para el precio más alto, empieza asumiendo que el primero es el más alto:
```javascript
let masAlto = precios[0]
// luego recorre el array comparando cada elemento con masAlto
// si encuentras uno mayor, actualiza masAlto
```

</details>

---

### ⚠️ Errores comunes del Día 1

```javascript
// ❌ Error: confundir índice con posición
let frutas = ["manzana", "pera", "naranja"]
console.log(frutas[3]) // undefined — no existe índice 3, el último es 2

// ✅ Correcto: los índices van de 0 a length-1
console.log(frutas[2]) // "naranja" ✅

// ❌ Error: modificar el array mientras lo recorres
// Esto puede causar comportamientos inesperados
// Por ahora: recorre primero, modifica después

// ❌ Error: typeof [] devuelve "object", no "array"
typeof [] // "object" — usa Array.isArray() para verificar
Array.isArray([]) // true ✅
Array.isArray("hola") // false ✅
```

---

### 📓 Registro Día 1

Crea `DIA_01_NOTAS.md` y responde:
1. ¿Qué problema resuelven los arrays? ¿Por qué no usar variables separadas?
2. ¿Cuál es la diferencia entre `push`/`pop` y `unshift`/`shift`?
3. ¿Por qué los índices empiezan en 0 y no en 1?

---

## 🗓 DÍA 2 — RECORRER ARRAYS: forEach Y for...of

### 🎯 Objetivo del día
Aprender las formas modernas y limpias de recorrer arrays.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/array
```

**Leer exactamente:**
- Sección `Loops` (la que dejaste pendiente ayer)

Luego ir a:
```
https://javascript.info/array-methods
```

**Leer exactamente:**
- Sección `Iterate: forEach`

**Detenerse ahí.**

**⏱ Tiempo estimado:** 25 a 35 minutos.

> 💡 **Nota interesante:** `forEach` es tu primer encuentro con un concepto poderoso:
> **pasar una función como argumento a otra función.**
> Esto se llama "callback" y lo verás constantemente en JavaScript.
> `forEach` dice: "para cada elemento, ejecuta esta función que me das."

---

### 🛠 Ejercicio 1 — Tres formas de recorrer

**Crear el archivo:** `dia02_ejercicio01.js`

Dado este array:
```javascript
let productos = ["Carpa", "Sleeping bag", "Linterna", "Brújula", "Navaja"]
```

Recórrelo de **tres formas distintas** y muestra cada producto numerado:
```
1. Carpa
2. Sleeping bag
3. Linterna
4. Brújula
5. Navaja
```

- Primera vez: con `for` clásico
- Segunda vez: con `for...of`
- Tercera vez: con `forEach`

<details>
<summary>💡 Pista 1 — for...of</summary>

```javascript
for (let producto of productos) {
    console.log(producto)
}
```
`for...of` te da directamente el valor, no el índice.

</details>

<details>
<summary>💡 Pista 2 — forEach</summary>

```javascript
productos.forEach(function(producto, indice) {
    console.log(indice + 1 + ". " + producto)
})
```
`forEach` recibe una función. Esa función recibe el elemento y opcionalmente el índice.

</details>

---

### 🛠 Ejercicio 2 — Construir mensajes

**Crear el archivo:** `dia02_ejercicio02.js`

Dado este array de nombres:
```javascript
let estudiantes = ["Ana", "Pedro", "María", "Juan", "Sofía"]
```

Usa `forEach` para mostrar en consola un mensaje personalizado para cada uno:
```
¡Hola Ana! Bienvenida al bootcamp. Eres el estudiante número 1.
¡Hola Pedro! Bienvenido al bootcamp. Eres el estudiante número 2.
...
```

> 💡 Nota: detecta si el nombre termina en "a" para usar "Bienvenida" o "Bienvenido".
> Pista extra: `nombre.endsWith("a")` devuelve `true` si el string termina en "a".

---

### 📓 Registro Día 2

Crea `DIA_02_NOTAS.md` y responde:
1. ¿Cuál es la diferencia entre `for`, `for...of` y `forEach`?
2. ¿Cuándo usarías cada uno?
3. ¿Qué es un callback? Explícalo con tus palabras.

---

## 🗓 DÍA 3 — MAP: TRANSFORMAR DATOS

### 🎯 Objetivo del día
Dominar `map` — el método más usado en React y en el desarrollo moderno.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/array-methods
```

**Leer exactamente:**
- Sección `Transform an array`
- Solo el apartado `map`

**Detenerse ahí.**

**⏱ Tiempo estimado:** 20 a 30 minutos.

> 💡 **Nota importante:** `map` es probablemente el método que más usarás en toda tu carrera.
> En React, cada vez que quieras mostrar una lista de elementos en pantalla, usarás `map`.
> Cada producto en una tienda online, cada tweet en Twitter, cada post en Instagram —
> todos se renderizan con `map`. Aprénderlo bien ahora te ahorra horas después.

---

### 🛠 Ejercicio 1 — Transformación simple

**Crear el archivo:** `dia03_ejercicio01.js`

Dado este array:
```javascript
let precios = [15000, 8500, 32000, 4200, 19800]
```

Usa `map` para crear un nuevo array donde cada precio tenga un 19% de IVA aplicado.
Muestra el array original y el array con IVA.

```
// Resultado esperado:
Precios sin IVA: [15000, 8500, 32000, 4200, 19800]
Precios con IVA: [17850, 10115, 38080, 4998, 23562]
```

<details>
<summary>💡 Pista 1</summary>

`map` crea un **nuevo array** — no modifica el original:
```javascript
let nuevosPrecios = precios.map(function(precio) {
    return precio * 1.19
})
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para redondear números:
```javascript
Math.round(precio * 1.19) // redondea al entero más cercano
```

</details>

---

### 🛠 Ejercicio 2 — Transformar strings

**Crear el archivo:** `dia03_ejercicio02.js`

Dado este array:
```javascript
let nombres = ["oscar", "ana", "pedro", "maría", "juan"]
```

Usa `map` para crear un nuevo array donde cada nombre tenga la primera letra en mayúscula.

```
// Resultado esperado:
["Oscar", "Ana", "Pedro", "María", "Juan"]
```

<details>
<summary>💡 Pista 1</summary>

Para capitalizar la primera letra:
```javascript
let nombre = "oscar"
let capitalizado = nombre[0].toUpperCase() + nombre.slice(1)
// "Oscar"
```
`toUpperCase()` convierte a mayúscula.
`slice(1)` corta el string desde el índice 1 hasta el final.

</details>

---

### 🛠 Ejercicio 3 — map en la práctica real

**Crear el archivo:** `dia03_ejercicio03.js`

Tienes este array de temperaturas en Celsius:
```javascript
let celsius = [0, 15, 22, 30, 37, 100]
```

Usa `map` para convertirlas todas a Fahrenheit.
La fórmula es: `F = (C × 9/5) + 32`

```
// Resultado esperado:
[32, 59, 71.6, 86, 98.6, 212]
```

---

### ⚠️ Errores comunes del Día 3

```javascript
// ❌ Error: olvidar el return dentro de map
let dobles = [1, 2, 3].map(function(n) {
    n * 2  // sin return → el nuevo array tendrá [undefined, undefined, undefined]
})

// ✅ Correcto:
let dobles = [1, 2, 3].map(function(n) {
    return n * 2  // [2, 4, 6]
})

// ❌ Error: pensar que map modifica el array original
let original = [1, 2, 3]
let nuevo = original.map(function(n) { return n * 2 })
console.log(original) // [1, 2, 3] — no cambió ✅
console.log(nuevo)    // [2, 4, 6] — este es el nuevo ✅
```

---

### 📓 Registro Día 3

Crea `DIA_03_NOTAS.md` y responde:
1. ¿Qué hace `map`? ¿Modifica el array original o crea uno nuevo?
2. ¿Cuál es la diferencia entre `forEach` y `map`?
3. ¿Por qué `map` es tan importante en React?

---

## 🗓 DÍA 4 — FILTER Y FIND: BUSCAR Y FILTRAR

### 🎯 Objetivo del día
Dominar `filter` para crear subconjuntos de datos y `find` para buscar elementos específicos.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/array-methods
```

**Leer exactamente:**
- Sección `Searching in array` — los apartados `indexOf`, `includes`, `find`, `findIndex`
- Sección `Filter`

**Detenerse ahí.**

**⏱ Tiempo estimado:** 30 a 40 minutos.

> 💡 **Nota interesante:** `filter` es la razón por la que puedes buscar productos por categoría
> en cualquier tienda online, filtrar empleados por departamento en un sistema de RRHH,
> o ver solo los pedidos pendientes en un sistema de delivery.
> Es uno de los métodos más usados en aplicaciones reales. 💪

---

### 🛠 Ejercicio 1 — filter básico

**Crear el archivo:** `dia04_ejercicio01.js`

Dado este array:
```javascript
let numeros = [1, 7, 3, 12, 5, 18, 9, 24, 6, 15, 2, 20]
```

Usa `filter` para crear:
1. Un array con solo los números **mayores a 10**
2. Un array con solo los números **pares**
3. Un array con solo los números **impares menores a 10**

Muestra los tres resultados.

<details>
<summary>💡 Pista 1</summary>

`filter` crea un nuevo array con los elementos que cumplan la condición:
```javascript
let mayores = numeros.filter(function(numero) {
    return numero > 10
})
```
Si el `return` es `true`, el elemento se incluye.
Si es `false`, se excluye.

</details>

---

### 🛠 Ejercicio 2 — filter con strings

**Crear el archivo:** `dia04_ejercicio02.js`

Dado este array de emails:
```javascript
let emails = [
    "oscar@gmail.com",
    "ana@empresa.cl",
    "pedro@gmail.com",
    "maria@hotmail.com",
    "juan@empresa.cl",
    "sofia@gmail.com"
]
```

Usa `filter` para obtener:
1. Solo los emails de Gmail
2. Solo los emails de la empresa (.cl)

<details>
<summary>💡 Pista 1</summary>

Para verificar si un string contiene otro string:
```javascript
"oscar@gmail.com".includes("gmail") // true
"ana@empresa.cl".includes("gmail")  // false
```

</details>

---

### 🛠 Ejercicio 3 — find y findIndex

**Crear el archivo:** `dia04_ejercicio03.js`

Dado este array de nombres:
```javascript
let participantes = ["Carlos", "Ana", "Pedro", "María", "Juan", "Sofía", "Diego"]
```

1. Usa `find` para encontrar el primer nombre que tenga más de 4 letras
2. Usa `findIndex` para encontrar en qué posición está "María"
3. Verifica si "Roberto" está en el array con `includes`

```
// Resultado esperado:
Primer nombre largo: Carlos
Posición de María: 3
¿Está Roberto?: false
```

---

### ⚠️ Errores comunes del Día 4

```javascript
// ❌ Error: confundir filter con find
// filter → devuelve un ARRAY con todos los que cumplan la condición
// find   → devuelve el PRIMER ELEMENTO que cumple la condición

let numeros = [1, 5, 3, 8, 2, 9]
numeros.filter(n => n > 4)  // [5, 8, 9] — array
numeros.find(n => n > 4)    // 5 — solo el primero

// ❌ Error: filter no modifica el original
let original = [1, 2, 3, 4, 5]
original.filter(n => n > 3) // [4, 5]
console.log(original)       // [1, 2, 3, 4, 5] — sin cambios ✅
```

---

### 📓 Registro Día 4

Crea `DIA_04_NOTAS.md` y responde:
1. ¿Cuál es la diferencia entre `filter` y `find`?
2. ¿Cuándo usarías `includes` vs `find`?
3. Da un ejemplo real de una aplicación web donde usarías `filter`.

---

## 🗓 DÍA 5 — REDUCE: EL MÁS PODEROSO

### 🎯 Objetivo del día
Entender `reduce` — el método más flexible y poderoso de los arrays.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/array-methods
```

**Leer exactamente:**
- Sección `Reduce and reduceRight`

**Leer dos veces.** No es difícil pero es denso. Vale la pena.

**⏱ Tiempo estimado:** 30 a 40 minutos.

> 💡 **Nota interesante:** `reduce` puede hacer TODO lo que hacen `map` y `filter`.
> Es tan flexible que podrías reemplazarlos con `reduce`.
> No lo harás porque `map` y `filter` son más legibles para sus casos específicos.
> Pero entender `reduce` te da una comprensión profunda de cómo funcionan los arrays.

---

### 🛠 Ejercicio 1 — reduce básico

**Crear el archivo:** `dia05_ejercicio01.js`

Dado este array:
```javascript
let ventas = [45000, 32000, 67000, 28000, 91000, 15000, 53000]
```

Usa `reduce` para calcular:
1. El total de todas las ventas
2. El promedio de ventas

<details>
<summary>💡 Pista 1</summary>

`reduce` recibe una función y un valor inicial:
```javascript
let total = ventas.reduce(function(acumulador, venta) {
    return acumulador + venta
}, 0)
```
- `acumulador` → el valor que va acumulando (empieza en 0)
- `venta` → el elemento actual del array
- `0` → el valor inicial del acumulador

</details>

<details>
<summary>💡 Pista 2</summary>

Para el promedio, primero calcula el total con `reduce`,
luego divídelo por `ventas.length`.

</details>

---

### 🛠 Ejercicio 2 — reduce para encontrar máximo y mínimo

**Crear el archivo:** `dia05_ejercicio02.js`

Usando el mismo array de ventas, usa `reduce` para encontrar:
1. La venta más alta
2. La venta más baja

**Sin usar `Math.max` ni `Math.min`.** Solo `reduce`.

<details>
<summary>💡 Pista 1</summary>

Para el máximo:
```javascript
let maximo = ventas.reduce(function(max, venta) {
    return venta > max ? venta : max
}, ventas[0])
```
En cada paso compara el elemento actual con el máximo acumulado.
Si el actual es mayor, se convierte en el nuevo máximo.

</details>

---

### 🛠 Ejercicio 3 — reduce para contar

**Crear el archivo:** `dia05_ejercicio03.js`

Dado este array de calificaciones:
```javascript
let calificaciones = [6, 4, 7, 3, 5, 6, 2, 7, 4, 6, 5, 3, 7, 6, 4]
```

Usa `reduce` para contar cuántos estudiantes:
- Aprobaron (nota >= 4)
- Reprobaron (nota < 4)

```
// Resultado esperado:
Aprobados: 11
Reprobados: 4
```

<details>
<summary>💡 Pista 1</summary>

El acumulador puede ser un objeto con dos contadores:
```javascript
let resultado = calificaciones.reduce(function(conteo, nota) {
    if (nota >= 4) {
        conteo.aprobados = conteo.aprobados + 1
    } else {
        conteo.reprobados = conteo.reprobados + 1
    }
    return conteo
}, { aprobados: 0, reprobados: 0 })
```

</details>

---

### 📓 Registro Día 5

Crea `DIA_05_NOTAS.md` y responde:
1. Explica `reduce` con tus palabras — sin usar términos técnicos.
2. ¿Cuál es el papel del "valor inicial" en `reduce`?
3. ¿En qué se diferencia `reduce` de `map` y `filter`?

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 EVALUACIÓN SEMANA 03

---

### Caso Real: Sistema de Gestión de Inventario — FerroHogar Concepción

> **FerroHogar** es una ferretería mediana en Concepción.
> Tienen cientos de productos y actualmente gestionan el inventario en papel.
> Quieren digitalizar el proceso con un sistema básico que les permita
> consultar su inventario, filtrar productos, y obtener reportes de stock.
> Tu trabajo es construir ese sistema.

---

### 📁 Archivo a crear

```
inventario_ferrohogar.js
```

---

### 📋 El inventario inicial

```javascript
let inventario = [
    { nombre: "Martillo", categoria: "Herramientas", precio: 8500, stock: 15 },
    { nombre: "Destornillador", categoria: "Herramientas", precio: 4200, stock: 3 },
    { nombre: "Pintura blanca 1L", categoria: "Pinturas", precio: 12000, stock: 28 },
    { nombre: "Pintura azul 1L", categoria: "Pinturas", precio: 12500, stock: 0 },
    { nombre: "Taladro", categoria: "Herramientas", precio: 45000, stock: 8 },
    { nombre: "Llave inglesa", categoria: "Herramientas", precio: 9800, stock: 2 },
    { nombre: "Pintura roja 1L", categoria: "Pinturas", precio: 11800, stock: 12 },
    { nombre: "Cemento 25kg", categoria: "Construcción", precio: 7500, stock: 45 },
    { nombre: "Arena fina", categoria: "Construcción", precio: 3200, stock: 0 },
    { nombre: "Nivel de burbuja", categoria: "Herramientas", precio: 6500, stock: 1 },
    { nombre: "Pincel 2\"", categoria: "Pinturas", precio: 1800, stock: 30 },
    { nombre: "Ladrillo (unidad)", categoria: "Construcción", precio: 450, stock: 500 }
]
```

---

### 📋 Requisitos del sistema

El sistema debe generar un reporte completo con las siguientes secciones:

**1. Reporte de stock crítico**
Productos con stock menor a 5 unidades (incluyendo los que tienen 0).
Mostrar nombre, stock actual y precio.

**2. Productos agotados**
Productos con stock igual a 0.
Mostrar solo los nombres.

**3. Valor total del inventario**
Calcular cuánto vale todo el inventario:
`valor = precio × stock` para cada producto, luego sumar todo.

**4. Precio promedio de productos disponibles**
Solo de los productos que tienen stock > 0.

**5. Productos por categoría**
Contar cuántos productos hay en cada categoría:
- Herramientas: X productos
- Pinturas: X productos
- Construcción: X productos

**6. El producto más caro y el más barato**
Encontrar ambos del inventario completo.

**7. Lista de precios con IVA**
Mostrar todos los productos con su precio más 19% de IVA.

---

### 📋 Formato del reporte final

```
======================================
   REPORTE DE INVENTARIO FERROHOGAR
   Concepción, Chile
======================================

📦 STOCK CRÍTICO (menos de 5 unidades):
- Destornillador: 3 unidades — $4.200
- Llave inglesa: 2 unidades — $9.800
- Nivel de burbuja: 1 unidades — $6.500
- Pintura azul 1L: 0 unidades — $12.500
- Arena fina: 0 unidades — $3.200

🚫 PRODUCTOS AGOTADOS:
- Pintura azul 1L
- Arena fina

💰 VALOR TOTAL DEL INVENTARIO: $X.XXX.XXX

📊 PRECIO PROMEDIO (productos con stock): $X.XXX

🗂️ PRODUCTOS POR CATEGORÍA:
- Herramientas: 5 productos
- Pinturas: 4 productos
- Construcción: 3 productos

⭐ PRODUCTO MÁS CARO: Taladro — $45.000
💲 PRODUCTO MÁS BARATO: Ladrillo (unidad) — $450

🏷️ PRECIOS CON IVA (19%):
- Martillo: $10.115
- Destornillador: $4.998
...
======================================
```

---

### 📋 Requisitos técnicos

**Debes usar obligatoriamente:**
- ✅ `filter` — para stock crítico, agotados y disponibles
- ✅ `map` — para precios con IVA
- ✅ `reduce` — para valor total, promedio y conteo por categoría
- ✅ `find` — para producto más caro y más barato (o `reduce`)
- ✅ Template literals para el reporte
- ✅ `toLocaleString("es-CL")` para formatear precios

**No puedes usar:**
- ❌ `Math.max` ni `Math.min` directamente sobre el array completo
- ❌ Bucles `for` para lo que puede hacerse con `map`/`filter`/`reduce`

---

### 💡 PISTAS PROGRESIVAS

<details>
<summary>💡 Pista 1 — ¿Cómo filtrar por stock crítico?</summary>

```javascript
let stockCritico = inventario.filter(function(producto) {
    return producto.stock < 5
})
```
Luego recorre `stockCritico` con `forEach` para mostrar cada uno.

</details>

<details>
<summary>💡 Pista 2 — ¿Cómo calcular el valor total del inventario?</summary>

```javascript
let valorTotal = inventario.reduce(function(total, producto) {
    return total + (producto.precio * producto.stock)
}, 0)
```

</details>

<details>
<summary>💡 Pista 3 — ¿Cómo contar productos por categoría?</summary>

```javascript
let porCategoria = inventario.reduce(function(conteo, producto) {
    let cat = producto.categoria
    if (conteo[cat]) {
        conteo[cat] = conteo[cat] + 1
    } else {
        conteo[cat] = 1
    }
    return conteo
}, {})
```
Esto usa un objeto como acumulador — lo verás más en la Semana 04.

</details>

<details>
<summary>💡 Pista 4 — ¿Cómo encontrar el más caro con reduce?</summary>

```javascript
let masCaro = inventario.reduce(function(max, producto) {
    return producto.precio > max.precio ? producto : max
}, inventario[0])
```
En vez de acumular un número, acumulas el producto completo.

</details>

---

### 🔍 SOLUCIÓN COMPLETA

> ⚠️ **NO MIRAR hasta haber intentado al menos 60 minutos.**
> Este proyecto integra todo lo de la semana. El esfuerzo aquí es el aprendizaje real.

<details>
<summary>🔓 Ver solución completa</summary>

```javascript
// === SISTEMA DE INVENTARIO FERROHOGAR ===

let inventario = [
    { nombre: "Martillo", categoria: "Herramientas", precio: 8500, stock: 15 },
    { nombre: "Destornillador", categoria: "Herramientas", precio: 4200, stock: 3 },
    { nombre: "Pintura blanca 1L", categoria: "Pinturas", precio: 12000, stock: 28 },
    { nombre: "Pintura azul 1L", categoria: "Pinturas", precio: 12500, stock: 0 },
    { nombre: "Taladro", categoria: "Herramientas", precio: 45000, stock: 8 },
    { nombre: "Llave inglesa", categoria: "Herramientas", precio: 9800, stock: 2 },
    { nombre: "Pintura roja 1L", categoria: "Pinturas", precio: 11800, stock: 12 },
    { nombre: "Cemento 25kg", categoria: "Construcción", precio: 7500, stock: 45 },
    { nombre: "Arena fina", categoria: "Construcción", precio: 3200, stock: 0 },
    { nombre: "Nivel de burbuja", categoria: "Herramientas", precio: 6500, stock: 1 },
    { nombre: "Pincel 2\"", categoria: "Pinturas", precio: 1800, stock: 30 },
    { nombre: "Ladrillo (unidad)", categoria: "Construcción", precio: 450, stock: 500 }
]

// 1. STOCK CRÍTICO
let stockCritico = inventario.filter(function(p) { return p.stock < 5 })

// 2. AGOTADOS
let agotados = inventario.filter(function(p) { return p.stock === 0 })

// 3. VALOR TOTAL
let valorTotal = inventario.reduce(function(total, p) {
    return total + (p.precio * p.stock)
}, 0)

// 4. PRECIO PROMEDIO (solo con stock)
let conStock = inventario.filter(function(p) { return p.stock > 0 })
let sumaPrecios = conStock.reduce(function(sum, p) { return sum + p.precio }, 0)
let promedio = Math.round(sumaPrecios / conStock.length)

// 5. POR CATEGORÍA
let porCategoria = inventario.reduce(function(conteo, p) {
    if (conteo[p.categoria]) {
        conteo[p.categoria] = conteo[p.categoria] + 1
    } else {
        conteo[p.categoria] = 1
    }
    return conteo
}, {})

// 6. MÁS CARO Y MÁS BARATO
let masCaro = inventario.reduce(function(max, p) {
    return p.precio > max.precio ? p : max
}, inventario[0])

let masBarato = inventario.reduce(function(min, p) {
    return p.precio < min.precio ? p : min
}, inventario[0])

// 7. PRECIOS CON IVA
let preciosConIVA = inventario.map(function(p) {
    return {
        nombre: p.nombre,
        precioConIVA: Math.round(p.precio * 1.19)
    }
})

// CONSTRUIR REPORTE
let reporteCritico = stockCritico.map(function(p) {
    return `- ${p.nombre}: ${p.stock} unidades — $${p.precio.toLocaleString("es-CL")}`
}).join("\n")

let reporteAgotados = agotados.map(function(p) {
    return `- ${p.nombre}`
}).join("\n")

let reporteIVA = preciosConIVA.map(function(p) {
    return `- ${p.nombre}: $${p.precioConIVA.toLocaleString("es-CL")}`
}).join("\n")

let reporte = `
======================================
   REPORTE DE INVENTARIO FERROHOGAR
   Concepción, Chile
======================================

📦 STOCK CRÍTICO (menos de 5 unidades):
${reporteCritico}

🚫 PRODUCTOS AGOTADOS:
${reporteAgotados}

💰 VALOR TOTAL DEL INVENTARIO: $${valorTotal.toLocaleString("es-CL")}

📊 PRECIO PROMEDIO (productos con stock): $${promedio.toLocaleString("es-CL")}

🗂️ PRODUCTOS POR CATEGORÍA:
- Herramientas: ${porCategoria["Herramientas"]} productos
- Pinturas: ${porCategoria["Pinturas"]} productos
- Construcción: ${porCategoria["Construcción"]} productos

⭐ PRODUCTO MÁS CARO: ${masCaro.nombre} — $${masCaro.precio.toLocaleString("es-CL")}
💲 PRODUCTO MÁS BARATO: ${masBarato.nombre} — $${masBarato.precio.toLocaleString("es-CL")}

🏷️ PRECIOS CON IVA (19%):
${reporteIVA}
======================================`

console.log(reporte)
```

</details>

---

### ✅ CRITERIOS DE APROBACIÓN

- [ ] El programa corre sin errores con `node inventario_ferrohogar.js`
- [ ] Usaste `filter` para stock crítico y agotados
- [ ] Usaste `map` para los precios con IVA
- [ ] Usaste `reduce` para valor total y promedio
- [ ] Los precios tienen formato chileno con `.toLocaleString("es-CL")`
- [ ] El reporte se ve limpio y ordenado en consola
- [ ] Puedes explicar qué hace cada método usado
- [ ] Archivo subido a GitHub con commit descriptivo

---

## 🗓 DÍA 7 — CHECKPOINT FINAL

### Sin mirar apuntes ni código

Responde en `CHECKPOINT_SEMANA_03.md`:

**Arrays básicos:**
1. ¿Cuál es la diferencia entre `push`/`pop` y `unshift`/`shift`?
2. ¿Por qué `typeof []` devuelve `"object"`? ¿Cómo verificas correctamente si algo es un array?
3. ¿Qué devuelve `[1,2,3][5]`? ¿Por qué?

**Métodos de transformación:**
4. ¿Cuál es la diferencia entre `forEach` y `map`?
5. ¿`map` modifica el array original? ¿Y `filter`?
6. ¿Qué pasa si olvidas el `return` dentro de `map`?

**Búsqueda y filtrado:**
7. ¿Cuál es la diferencia entre `filter` y `find`?
8. ¿Qué devuelve `find` si no encuentra ningún elemento?

**Reduce:**
9. Explica `reduce` con una analogía del mundo real.
10. ¿Para qué sirve el "valor inicial" en `reduce`?

**Código — sin ejecutar, ¿qué devuelve esto?:**
```javascript
let numeros = [1, 2, 3, 4, 5]

let resultado = numeros
    .filter(function(n) { return n % 2 === 0 })
    .map(function(n) { return n * 10 })
    .reduce(function(sum, n) { return sum + n }, 0)

console.log(resultado)
```

---

## 📓 REGISTRO FINAL DE LA SEMANA

Crea `REGISTRO_SEMANA_03.md`:

```markdown
# Registro Semana 03

## ¿Qué fue lo más difícil de esta semana?

## ¿Qué método te costó más entender? ¿Cómo lo superaste?

## ¿Cuál es tu método favorito y por qué?

## En una línea: ¿cuál es la diferencia entre map, filter y reduce?

## Califica tu semana del 1 al 10 y explica por qué.
```

---

## 🗂️ ARCHIVOS A ENTREGAR ESTA SEMANA

```
📁 semana-03/
├── dia01_ejercicio01.js    ← array de ciudades
├── dia01_ejercicio02.js    ← modificar array con push/pop/shift/unshift
├── dia01_ejercicio03.js    ← calcular total, promedio, máximo y mínimo
├── dia02_ejercicio01.js    ← tres formas de recorrer
├── dia02_ejercicio02.js    ← mensajes personalizados con forEach
├── dia03_ejercicio01.js    ← precios con IVA usando map
├── dia03_ejercicio02.js    ← capitalizar nombres con map
├── dia03_ejercicio03.js    ← celsius a fahrenheit con map
├── dia04_ejercicio01.js    ← filter con números
├── dia04_ejercicio02.js    ← filter con emails
├── dia04_ejercicio03.js    ← find y findIndex
├── dia05_ejercicio01.js    ← reduce básico
├── dia05_ejercicio02.js    ← máximo y mínimo con reduce
├── dia05_ejercicio03.js    ← contar con reduce
├── inventario_ferrohogar.js ← proyecto final ⭐
├── CHECKPOINT_SEMANA_03.md ← respuestas sin apuntes
└── REGISTRO_SEMANA_03.md   ← reflexión de la semana
```

Todos los archivos en GitHub con commits descriptivos. 💪

---

## 🚀 SIGUIENTE PASO

Si completaste todo lo anterior:

```
✅ 14 ejercicios resueltos
✅ Sistema de inventario FerroHogar funcionando
✅ Checkpoint respondido sin apuntes
✅ Registro completado
✅ Todo subido a GitHub
```

**Has ganado el derecho de avanzar a:**

---

> ### 📘 BOOTCAMP PERSONAL — SEMANA 04
> **Tema:** Objetos · Propiedades · Métodos · Arrays de objetos
> `{}` · dot notation · bracket notation · Object.keys · Object.values · datos estructurados reales

---

*Bootcamp generado específicamente para Óscar — Full Stack Developer en formación 🇨🇱*
*Stack objetivo: Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk*
*Semana 3 de 52 — Arrays · Métodos esenciales · Primeros algoritmos con datos reales*
