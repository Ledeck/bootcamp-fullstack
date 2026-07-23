# 📘 BOOTCAMP PERSONAL — SEMANA 03
## JAVASCRIPT FUNDAMENTALS III
### Arrays · Métodos Esenciales · Primeros Algoritmos con Datos Reales

---

> **Alumno:** Óscar
> **Semana:** 3 de 52 — Fase 1, Mes 1
> **Prerequisito:** Semana 02 aprobada ✅
> **Formato:** v3 — validación diaria interactiva en chat

---

## 🎯 MISIÓN DE LA SEMANA

Al finalizar esta semana serás capaz de:

- ✅ Crear y manipular arrays con confianza
- ✅ Usar métodos básicos: `push`, `pop`, `shift`, `unshift`, `length`
- ✅ Transformar datos con `map`
- ✅ Filtrar datos con `filter`
- ✅ Acumular datos con `reduce`
- ✅ Buscar elementos con `find` y `findIndex`
- ✅ Construir un sistema de análisis de datos para una empresa real

> 💡 **Concepto clave:** Hasta ahora trabajaste con datos individuales — un precio, una edad, un nombre. En el mundo real los datos vienen en colecciones. Los arrays son la herramienta para manejar esas colecciones, y `map`, `filter` y `reduce` son las tres operaciones más importantes que existen sobre ellas.

---

## ⚠️ REGLAS DE LA SEMANA

- ❌ Objetos (semana que viene)
- ❌ Arrow functions avanzadas (Semana 05)
- ❌ Métodos avanzados: `flat`, `flatMap`, `entries`
- ❌ Nada fuera de este archivo

**Cuando termines cada día, avísame. Yo valido antes de continuar.**

---

## 🗓 DÍA 1 — ¿QUÉ ES UN ARRAY Y POR QUÉ EXISTE?

### 🎯 Objetivo
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

**Detenerse en:** la sección `Loops` — no leer más allá.

**⏱ Tiempo estimado:** 30 a 40 minutos.

> 💡 **Nota:** Los arrays en JavaScript son en realidad objetos especiales. Por eso `typeof []` devuelve `"object"` y no `"array"`. Para verificar si algo es un array se usa `Array.isArray(valor)`. Otro souvenir de los 10 días de Brendan Eich. 😄

---

### 🔗 Conexión con Next.js

En React, cada vez que quieras mostrar una lista de elementos en pantalla, usarás arrays. Literalmente todo lo que ves como "lista" en cualquier app — productos, usuarios, mensajes, posts — viene de un array:

```javascript
// Lo que haces HOY:
let frutas = ["manzana", "pera", "naranja"]

// Lo que harás en Next.js (Mes 4-5):
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

El `.map()` que verás en el Día 3 es exactamente eso — un array recorrido para crear elementos visuales. Hoy aprendes la base de esa operación.

---

### 🛠 Ejercicio 1 — Tu primer array

**Archivo:** `dia01_ejercicio01.js`

Crea un array con los nombres de 5 ciudades de Chile.
Muestra en consola:
- El primer elemento
- El último elemento (sin hardcodear el índice — usa `.length`)
- La cantidad total de ciudades
- La ciudad en la posición 3

---

### 🛠 Ejercicio 2 — Modificar un array

**Archivo:** `dia01_ejercicio02.js`

Empieza con:
```javascript
let frutas = ["manzana", "pera", "naranja"]
```

Paso a paso:
1. Agrega `"uva"` al **final**
2. Agrega `"frutilla"` al **inicio**
3. Elimina el último elemento
4. Elimina el primer elemento
5. Muestra el array después de cada operación

---

### 🛠 Ejercicio 3 — Array de números

**Archivo:** `dia01_ejercicio03.js`

```javascript
let precios = [15000, 8500, 32000, 4200, 19800, 7600, 25000]
```

Usando solo `for` (sin métodos avanzados todavía):
1. Muestra todos los precios
2. Calcula el total
3. Calcula el promedio
4. Encuentra el más alto
5. Encuentra el más bajo

---

### ⚠️ Errores comunes

```javascript
// ❌ Índice fuera de rango
let frutas = ["manzana", "pera", "naranja"]
console.log(frutas[3]) // undefined — el último es índice 2, no 3

// ❌ typeof [] no es "array"
typeof [] // "object" — usa Array.isArray() para verificar

// ✅ Correcto
Array.isArray([])     // true
Array.isArray("hola") // false
```

---

### 💼 Código real vs código de bootcamp

**Tu versión (aprendizaje):**
```javascript
let precios = [15000, 8500, 32000]
let masAlto = precios[0]
for (let i = 0; i < precios.length; i++) {
    if (precios[i] > masAlto) {
        masAlto = precios[i]
    }
}
console.log(masAlto)
```

**Versión profesional:**
```javascript
const PRECIOS_EXPEDICIONES = [15000, 8500, 32000]

function obtenerPrecioMaximo(listaPrecios) {
    let maximo = listaPrecios[0]
    for (let i = 1; i < listaPrecios.length; i++) {
        if (listaPrecios[i] > maximo) {
            maximo = listaPrecios[i]
        }
    }
    return maximo
}

const precioMaximo = obtenerPrecioMaximo(PRECIOS_EXPEDICIONES)
```

**¿Por qué cambia?**
- Función con `return` → reutilizable en cualquier lugar
- Constante en MAYÚSCULAS → señal de "este array no cambia"
- El bucle empieza en `i = 1` → ya sabemos que `maximo` empieza siendo `precios[0]`, no necesitas compararlo consigo mismo

---

**Cuando termines avísame — valido el Día 1 antes de continuar.** ✅

---

## 🗓 DÍA 2 — RECORRER ARRAYS: forEach Y for...of

### 🎯 Objetivo
Aprender las formas modernas y limpias de recorrer arrays.

---

### 📚 Estudio

**Ir a:**
```
https://javascript.info/array
```
Leer: sección `Loops` (la que dejaste pendiente ayer)

Luego:
```
https://javascript.info/array-methods
```
Leer: sección `Iterate: forEach` únicamente.

**⏱ Tiempo estimado:** 25 a 35 minutos.

> 💡 **Nota:** `forEach` es tu primer encuentro con "pasar una función como argumento a otra función" — esto se llama **callback**. Lo verás constantemente en JavaScript. `forEach` dice: "para cada elemento, ejecuta esta función que me das."

---

### 🔗 Conexión con Next.js

`forEach`, `for...of`, y más adelante `.map()` son todos formas de "hacer algo con cada elemento de una lista." En React, `.map()` es el más usado porque retorna algo nuevo. Pero entender `forEach` primero te da la base mental correcta:

```javascript
// forEach — hace algo con cada elemento (no retorna nada nuevo)
productos.forEach((producto) => console.log(producto.nombre))

// map — crea algo nuevo con cada elemento (lo que usarás en React)
const nombres = productos.map((producto) => producto.nombre)
```

---

### 🛠 Ejercicio 1 — Tres formas de recorrer

**Archivo:** `dia02_ejercicio01.js`

```javascript
let productos = ["Carpa", "Sleeping bag", "Linterna", "Brújula", "Navaja"]
```

Muestra cada producto numerado (`1. Carpa`, `2. Sleeping bag`, etc.) de **tres formas distintas**:
- Con `for` clásico
- Con `for...of`
- Con `forEach`

---

### 🛠 Ejercicio 2 — Construir mensajes personalizados

**Archivo:** `dia02_ejercicio02.js`

```javascript
let estudiantes = ["Ana", "Pedro", "María", "Juan", "Sofía"]
```

Usa `forEach` para mostrar un mensaje para cada uno. Si el nombre termina en "a", usa "Bienvenida". Si no, "Bienvenido".

```
¡Hola Ana! Bienvenida al bootcamp. Eres la estudiante número 1.
¡Hola Pedro! Bienvenido al bootcamp. Eres el estudiante número 2.
```

> Pista si la necesitas: `nombre.endsWith("a")` devuelve `true` si el string termina en "a".

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — MAP: TRANSFORMAR DATOS

### 🎯 Objetivo
Dominar `map` — el método más usado en React y en desarrollo moderno.

---

### 📚 Estudio

```
https://javascript.info/array-methods
```

Leer: sección `Transform an array` → solo el apartado `map`.

**⏱ Tiempo estimado:** 20 a 30 minutos.

> 💡 **Importante:** `map` es probablemente el método que más usarás en toda tu carrera. En React, cada lista de elementos en pantalla se construye con `map`. Cada producto en una tienda, cada tweet, cada notificación — todos se renderizan con `map`.

---

### 🔗 Conexión con Next.js

```javascript
// HOY (Mes 1) — map sobre datos simples:
let precios = [15000, 8500, 32000]
let preciosConIVA = precios.map(function(precio) {
    return precio * 1.19
})

// Mes 4-5 con Next.js — map sobre objetos para crear UI:
function ListaProductos({ productos }) {
    return (
        <div>
            {productos.map((producto) => (
                <div key={producto.id}>
                    <h2>{producto.nombre}</h2>
                    <p>${(producto.precio * 1.19).toLocaleString("es-CL")}</p>
                </div>
            ))}
        </div>
    )
}
```

La lógica es idéntica. El resultado cambia de un array de números a un array de elementos visuales.

---

### 🛠 Ejercicio 1 — Precios con IVA

**Archivo:** `dia03_ejercicio01.js`

```javascript
let precios = [15000, 8500, 32000, 4200, 19800]
```

Usa `map` para crear un nuevo array con cada precio más 19% de IVA.
Muestra el array original y el array con IVA.

---

### 🛠 Ejercicio 2 — Capitalizar nombres

**Archivo:** `dia03_ejercicio02.js`

```javascript
let nombres = ["oscar", "ana", "pedro", "maría", "juan"]
```

Usa `map` para crear un nuevo array donde cada nombre tenga la primera letra en mayúscula.

---

### 🛠 Ejercicio 3 — Celsius a Fahrenheit

**Archivo:** `dia03_ejercicio03.js`

```javascript
let celsius = [0, 15, 22, 30, 37, 100]
```

Usa `map` para convertir todas las temperaturas a Fahrenheit.
Fórmula: `F = (C × 9/5) + 32`

---

### ⚠️ Errores comunes

```javascript
// ❌ Olvidar el return dentro de map
let dobles = [1, 2, 3].map(function(n) {
    n * 2  // sin return → [undefined, undefined, undefined]
})

// ✅ Correcto
let dobles = [1, 2, 3].map(function(n) {
    return n * 2  // [2, 4, 6]
})

// map NO modifica el array original — siempre crea uno nuevo
```

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — FILTER Y FIND: BUSCAR Y FILTRAR

### 🎯 Objetivo
Dominar `filter` para crear subconjuntos y `find` para buscar elementos específicos.

---

### 📚 Estudio

```
https://javascript.info/array-methods
```

Leer:
- Sección `Searching in array` — apartados `indexOf`, `includes`, `find`, `findIndex`
- Sección `Filter`

**⏱ Tiempo estimado:** 30 a 40 minutos.

> 💡 **Nota:** `filter` es la razón por la que puedes buscar productos por categoría en cualquier tienda online, ver solo los pedidos pendientes, o filtrar empleados por departamento. Es uno de los métodos más usados en aplicaciones reales.

---

### 🔗 Conexión con Next.js

```javascript
// HOY — filter sobre números:
let numeros = [1, 5, 3, 12, 8, 2]
let mayoresADiez = numeros.filter(function(n) { return n > 10 })

// Mes 5-6 con Next.js — filter sobre datos reales antes de mostrarlos:
function ProductosPorCategoria({ productos, categoria }) {
    const filtrados = productos.filter(
        (producto) => producto.categoria === categoria
    )
    return filtrados.map((p) => <TarjetaProducto key={p.id} producto={p} />)
}
```

`filter` + `map` juntos es uno de los patrones más comunes en React.

---

### 🛠 Ejercicio 1 — Filter básico

**Archivo:** `dia04_ejercicio01.js`

```javascript
let numeros = [1, 7, 3, 12, 5, 18, 9, 24, 6, 15, 2, 20]
```

Usa `filter` para crear:
1. Array con solo los mayores a 10
2. Array con solo los pares
3. Array con solo los impares menores a 10

---

### 🛠 Ejercicio 2 — Filter con strings

**Archivo:** `dia04_ejercicio02.js`

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

---

### 🛠 Ejercicio 3 — find y findIndex

**Archivo:** `dia04_ejercicio03.js`

```javascript
let participantes = ["Carlos", "Ana", "Pedro", "María", "Juan", "Sofía", "Diego"]
```

1. Usa `find` para encontrar el primer nombre con más de 4 letras
2. Usa `findIndex` para encontrar en qué posición está "María"
3. Verifica con `includes` si "Roberto" está en el array

---

### ⚠️ Errores comunes

```javascript
// filter → devuelve ARRAY con todos los que cumplen
// find   → devuelve el PRIMER ELEMENTO que cumple

let numeros = [1, 5, 3, 8, 2, 9]
numeros.filter(n => n > 4)  // [5, 8, 9]
numeros.find(n => n > 4)    // 5

// filter no modifica el original — crea uno nuevo
```

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — REDUCE: EL MÁS PODEROSO

### 🎯 Objetivo
Entender `reduce` — el método más flexible de los arrays.

---

### 📚 Estudio

```
https://javascript.info/array-methods
```

Leer: sección `Reduce and reduceRight` — **leer dos veces**, es denso pero vale la pena.

**⏱ Tiempo estimado:** 35 a 45 minutos.

> 💡 **Nota:** `reduce` puede hacer todo lo que hacen `map` y `filter`. No lo harás así porque `map` y `filter` son más legibles para sus casos específicos. Pero entender `reduce` te da comprensión profunda de cómo funcionan los arrays.

---

### 🔗 Conexión con Next.js

`reduce` aparece constantemente cuando necesitas calcular algo a partir de una lista — el total del carrito, el promedio de calificaciones, o agrupar productos por categoría:

```javascript
// HOY — sumar precios:
let total = precios.reduce(function(acumulador, precio) {
    return acumulador + precio
}, 0)

// Mes 7-8 con Next.js — calcular total del carrito:
const totalCarrito = carrito.reduce(
    (total, item) => total + (item.precio * item.cantidad), 0
)
```

---

### 🛠 Ejercicio 1 — Reduce básico

**Archivo:** `dia05_ejercicio01.js`

```javascript
let ventas = [45000, 32000, 67000, 28000, 91000, 15000, 53000]
```

Usa `reduce` para calcular:
1. El total de todas las ventas
2. El promedio de ventas

---

### 🛠 Ejercicio 2 — Máximo y mínimo con reduce

**Archivo:** `dia05_ejercicio02.js`

Usando el mismo array de ventas, encuentra con `reduce`:
1. La venta más alta
2. La venta más baja

**Sin usar `Math.max` ni `Math.min` directamente** — solo `reduce`.

---

### 🛠 Ejercicio 3 — Contar con reduce

**Archivo:** `dia05_ejercicio03.js`

```javascript
let calificaciones = [6, 4, 7, 3, 5, 6, 2, 7, 4, 6, 5, 3, 7, 6, 4]
```

Usa `reduce` para contar cuántos estudiantes aprobaron (nota >= 4) y cuántos reprobaron.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 EVALUACIÓN SEMANA 03

---

### Caso Real: Dashboard de Análisis — StartupMetrics

> **StartupMetrics** es una startup chilena que construye herramientas de análisis para otras startups. Necesitan un módulo de análisis de datos de ventas que procese listas de transacciones y genere reportes automáticos.
>
> El equipo de frontend se encarga de la interfaz visual (eso lo harás en el Mes 4-5). Tu tarea hoy es construir el **motor de análisis** — la lógica pura que procesa los datos y devuelve los resultados listos para mostrar.

---

### 📁 Archivo a crear

```
analizador_startupmetrics.js
```

---

### 📋 Los datos

```javascript
let transacciones = [
    { id: 1, producto: "Plan Básico", monto: 29000, region: "RM", mes: "enero" },
    { id: 2, producto: "Plan Pro", monto: 79000, region: "Valparaíso", mes: "enero" },
    { id: 3, producto: "Plan Básico", monto: 29000, region: "RM", mes: "febrero" },
    { id: 4, producto: "Plan Enterprise", monto: 199000, region: "RM", mes: "enero" },
    { id: 5, producto: "Plan Pro", monto: 79000, region: "Biobío", mes: "febrero" },
    { id: 6, producto: "Plan Básico", monto: 29000, region: "Valparaíso", mes: "febrero" },
    { id: 7, producto: "Plan Enterprise", monto: 199000, region: "RM", mes: "marzo" },
    { id: 8, producto: "Plan Pro", monto: 79000, region: "RM", mes: "marzo" },
    { id: 9, producto: "Plan Básico", monto: 29000, region: "Biobío", mes: "marzo" },
    { id: 10, producto: "Plan Pro", monto: 79000, region: "RM", mes: "enero" },
]
```

---

### 📋 El sistema debe generar:

**1. Total de ingresos** — suma de todos los montos

**2. Ingreso promedio por transacción**

**3. Transacciones de la Región Metropolitana** — filtradas por `region === "RM"`

**4. Solo los planes Enterprise** — filtrados por producto

**5. Montos con IVA** — nuevo array con cada monto multiplicado por 1.19

**6. La transacción de mayor monto** — usando `reduce`

**7. Transacciones de enero** — filtradas por mes

**Formato del reporte:**
```
=== STARTUPMETRICS — REPORTE DE VENTAS ===

💰 Total ingresos: $801.000
📊 Promedio por transacción: $80.100
🏙️ Transacciones RM: 6
🏆 Plan Enterprise: 2 transacciones
💎 Mayor venta: Plan Enterprise — $199.000 (id: 4)
📅 Ventas enero: 4 transacciones — Total: $386.000
```

---

### 📋 Requisitos técnicos

```
✅ Usar filter para filtrar por región, producto y mes
✅ Usar map para los montos con IVA
✅ Usar reduce para total, promedio y mayor monto
✅ console.log del reporte final
❌ No usar bucles for para lo que puede hacerse con map/filter/reduce
```

---

### 💡 Pistas (máximo 2 — solo si las necesitas)

<details>
<summary>💡 Pista 1 — ¿Cómo acceder a las propiedades del objeto dentro de map/filter/reduce?</summary>

Cada elemento del array es un objeto. Puedes acceder a sus propiedades normalmente:

```javascript
transacciones.filter(function(t) {
    return t.region === "RM"
})
```

`t` es cada transacción — `t.region`, `t.monto`, `t.producto`, `t.mes`.

</details>

<details>
<summary>💡 Pista 2 — ¿Cómo encontrar la transacción de mayor monto con reduce?</summary>

El acumulador puede ser la transacción completa (el objeto), no solo el número:

```javascript
let mayor = transacciones.reduce(function(max, t) {
    return t.monto > max.monto ? t : max
}, transacciones[0])
```

</details>

---

### 🔍 Solución completa

> ⚠️ **NO MIRAR hasta haber intentado al menos 60 minutos.**

<details>
<summary>🔓 Ver solución</summary>

```javascript
let transacciones = [
    { id: 1, producto: "Plan Básico", monto: 29000, region: "RM", mes: "enero" },
    { id: 2, producto: "Plan Pro", monto: 79000, region: "Valparaíso", mes: "enero" },
    { id: 3, producto: "Plan Básico", monto: 29000, region: "RM", mes: "febrero" },
    { id: 4, producto: "Plan Enterprise", monto: 199000, region: "RM", mes: "enero" },
    { id: 5, producto: "Plan Pro", monto: 79000, region: "Biobío", mes: "febrero" },
    { id: 6, producto: "Plan Básico", monto: 29000, region: "Valparaíso", mes: "febrero" },
    { id: 7, producto: "Plan Enterprise", monto: 199000, region: "RM", mes: "marzo" },
    { id: 8, producto: "Plan Pro", monto: 79000, region: "RM", mes: "marzo" },
    { id: 9, producto: "Plan Básico", monto: 29000, region: "Biobío", mes: "marzo" },
    { id: 10, producto: "Plan Pro", monto: 79000, region: "RM", mes: "enero" },
]

// 1. Total ingresos
let totalIngresos = transacciones.reduce(function(total, t) {
    return total + t.monto
}, 0)

// 2. Promedio
let promedio = totalIngresos / transacciones.length

// 3. Transacciones RM
let transaccionesRM = transacciones.filter(function(t) {
    return t.region === "RM"
})

// 4. Plan Enterprise
let enterprise = transacciones.filter(function(t) {
    return t.producto === "Plan Enterprise"
})

// 5. Montos con IVA
let montosConIVA = transacciones.map(function(t) {
    return t.monto * 1.19
})

// 6. Mayor monto
let mayorVenta = transacciones.reduce(function(max, t) {
    return t.monto > max.monto ? t : max
}, transacciones[0])

// 7. Ventas enero
let ventasEnero = transacciones.filter(function(t) {
    return t.mes === "enero"
})
let totalEnero = ventasEnero.reduce(function(total, t) {
    return total + t.monto
}, 0)

// Reporte
console.log(`=== STARTUPMETRICS — REPORTE DE VENTAS ===

💰 Total ingresos: $${totalIngresos.toLocaleString("es-CL")}
📊 Promedio por transacción: $${Math.round(promedio).toLocaleString("es-CL")}
🏙️ Transacciones RM: ${transaccionesRM.length}
🏆 Plan Enterprise: ${enterprise.length} transacciones
💎 Mayor venta: ${mayorVenta.producto} — $${mayorVenta.monto.toLocaleString("es-CL")} (id: ${mayorVenta.id})
📅 Ventas enero: ${ventasEnero.length} transacciones — Total: $${totalEnero.toLocaleString("es-CL")}`)
```

</details>

---

### ✅ Criterios de aprobación

- [ ] El programa corre sin errores
- [ ] Usaste `filter` para RM, Enterprise y enero
- [ ] Usaste `map` para los montos con IVA
- [ ] Usaste `reduce` para total, promedio y mayor venta
- [ ] El reporte muestra toda la información correcta
- [ ] Precios con `.toLocaleString("es-CL")`
- [ ] Subido a GitHub con commit descriptivo

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva en chat.** 🎯

---

## 🗂️ ARCHIVOS A ENTREGAR

```
📁 semana-03/
├── dia01_ejercicio01.js
├── dia01_ejercicio02.js
├── dia01_ejercicio03.js
├── dia02_ejercicio01.js
├── dia02_ejercicio02.js
├── dia03_ejercicio01.js
├── dia03_ejercicio02.js
├── dia03_ejercicio03.js
├── dia04_ejercicio01.js
├── dia04_ejercicio02.js
├── dia04_ejercicio03.js
├── dia05_ejercicio01.js
├── dia05_ejercicio02.js
├── dia05_ejercicio03.js
└── analizador_startupmetrics.js ⭐
```

Todo en `bootcamp-fullstack/semana-03/` con commits descriptivos.

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 04:** Objetos · Propiedades · Métodos · Arrays de objetos

---

*Semana 03 — Arrays y métodos esenciales*
*Formato v3 — validación diaria interactiva*
*Óscar — Full Stack Developer en formación 🇨🇱*
