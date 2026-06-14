# 📘 BOOTCAMP PERSONAL — SEMANA 01
## JAVASCRIPT FUNDAMENTALS I
### Variables · Tipos de Datos · Interacción · Condicionales

---

> **Alumno:** Óscar  
> **Objetivo final:** Full Stack Developer empleable en 13 meses  
> **Stack objetivo:** Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk  
> **Semana:** 1 de 52  
> **Nivel:** Principiante con base sólida en lógica y matemáticas  

---

## 🎯 MISIÓN DE LA SEMANA

Al finalizar esta semana serás capaz de:

- ✅ Crear y manipular variables correctamente
- ✅ Identificar y usar los 8 tipos de datos de JavaScript
- ✅ Interactuar con el usuario usando `alert()`, `prompt()` y `confirm()`
- ✅ Tomar decisiones con `if`, `else if`, `else` y el operador `?`
- ✅ Usar `===` correctamente y entender por qué nunca `==`
- ✅ Construir una mini aplicación real que integre todo lo anterior

> 💡 **Filosofía de esta semana:** No memorizarás sintaxis. Entenderás qué problema resuelve cada herramienta y cuándo usarla.

---

## ⚠️ REGLAS DEL BOOTCAMP

Durante esta semana **NO estudiar:**

- ❌ React, Vue, Angular
- ❌ Node.js, TypeScript
- ❌ Bases de datos, APIs
- ❌ Bucles (`for`, `while`)
- ❌ Funciones
- ❌ Arrays u Objetos

**Tu único trabajo es ejecutar el plan.**  
No decides qué estudiar. No buscas recursos extra. Solo abres este archivo y ejecutas.

---

## 📋 RESUMEN DE LO APRENDIDO

> Esta semana ya fue completada en formato conversacional.  
> Este documento es tu referencia oficial y tu evaluación final.

### Variables
```javascript
let nombre = "Oscar"        // declaración + asignación
nombre = "Oscar Castillo"   // reasignación ✅
let nombre = "otro"         // ❌ Error: ya fue declarada

// Las tres palabras clave:
let x = 1      // puede cambiar
const y = 2    // no puede cambiar (constante)
var z = 3      // antigua, evitar siempre
```

### Tipos de datos
```javascript
// Los 8 tipos:
let texto = "Hola"           // string
let numero = 42              // number
let decimal = 3.14           // number (mismo tipo)
let activo = true            // boolean
let vacio = null             // null (vacío a propósito)
let sinAsignar              // undefined (vacío por accidente)
let grande = 9999999999n    // bigint (números enormes)
let unico = Symbol()        // symbol (identificador único)

// El más importante para debugging:
typeof "hola"    // "string"
typeof 42        // "number"
typeof true      // "boolean"
typeof null      // "object" ← bug histórico de 1995, no es real
typeof undefined // "undefined"
```

### Comparaciones
```javascript
// REGLA DE ORO: siempre ===, nunca ==
5 === 5      // true  ✅
5 === "5"    // false ✅ (diferente tipo)
5 == "5"     // true  ❌ (conversión peligrosa)

// null y undefined: la pareja especial
null == undefined   // true  (solo entre ellos)
null === undefined  // false (diferente tipo)
null == 0           // false (null solo ama a undefined)
null >= 0           // true  (en comparaciones, null → 0)
```

### Interacción con el usuario
```javascript
alert("Mensaje")              // muestra popup, no devuelve nada
let nombre = prompt("¿Nombre?")  // devuelve string o null
let confirma = confirm("¿Seguro?") // devuelve true o false
```

### Condicionales
```javascript
// if / else if / else
if (edad >= 18) {
    alert("Adulto")
} else if (edad >= 12) {
    alert("Adolescente")
} else {
    alert("Niño")
}

// Operador ternario ? (para asignar valores, no ejecutar acciones)
let categoria = edad >= 18 ? "Adulto" : "Menor"

// Truthy y Falsy
// Falsy: 0, "", null, undefined, NaN, false
// Truthy: todo lo demás (incluyendo "0", [], {})
```

---

## 🏆 PROYECTO FINAL — EVALUACIÓN SEMANA 01

### Caso Real: Sistema de Orientación para Tienda Outdoor

> Una tienda de equipamiento outdoor (camping, trekking, running) necesita un **kiosco digital** para la entrada del local.  
> El kiosco debe orientar automáticamente a los clientes sin necesidad de un vendedor.  
> Tu trabajo es construir la lógica de ese kiosco.

---

### 📁 Archivo a crear

```
kiosco_doite.js
```

---

### 📋 Requisitos del sistema

El kiosco debe:

**1. Dar la bienvenida**
- Pedir el nombre del cliente
- Si el cliente no ingresa nombre (cancela o deja vacío), usar "Visitante"

**2. Clasificar por edad**
- Pedir edad
- Clasificar en: Niño (menor de 12), Joven (12-17), Adulto (18-64), Senior (65+)
- Mostrar mensaje personalizado para cada categoría

**3. Identificar actividad principal**
- Preguntar actividad: Camping, Trekking, Running u Otra
- Guardar la respuesta

**4. Verificar si es cliente frecuente**
- Usar `confirm()` para preguntar si ya es cliente
- Guardar la respuesta como booleano

**5. Generar recomendación de productos**
- Basado en la actividad ingresada, recomendar una categoría:
  - Camping → "Carpas, sacos de dormir y cocinas portátiles"
  - Trekking → "Botas, bastones y mochilas técnicas"
  - Running → "Zapatillas trail, ropa técnica y accesorios"
  - Otra → "Visita nuestra sección de novedades"

**6. Mostrar resumen final**
- Un solo `alert()` al final con toda la información:

```
=== BIENVENIDO A DOITE ===

Cliente: Oscar
Categoría: Adulto
Actividad: Trekking
Cliente frecuente: Sí

Te recomendamos: Botas, bastones y mochilas técnicas

¡Que disfrutes tu aventura!
```

---

### 🚫 Restricciones

Solo puedes usar:
- `let` y `const`
- `alert()`, `prompt()`, `confirm()`
- `if`, `else if`, `else`
- Operador ternario `?` donde corresponda
- Template literals `` ` ` ``
- `===` para comparaciones

**No puedes usar:**
- Funciones (`function`)
- Bucles (`for`, `while`)
- Arrays (`[]`)
- Objetos (`{}`)
- Ninguna librería externa

---

### 💡 PISTAS PROGRESIVAS

> Solo lee la siguiente pista si llevas más de 20 minutos bloqueado en ese punto.

<details>
<summary>💡 Pista 1 — ¿Cómo manejar el nombre vacío?</summary>

`prompt()` devuelve `null` si el usuario cancela, y `""` si deja el campo vacío.  
Puedes verificar ambos casos con una condición.  
Pista extra: el operador `||` puede ser útil aquí.

</details>

<details>
<summary>💡 Pista 2 — ¿Cómo clasificar por edad?</summary>

Necesitas múltiples condiciones.  
Piensa en el orden: ¿cuál condición verificas primero?  
Recuerda que `else if` te permite encadenar condiciones.

</details>

<details>
<summary>💡 Pista 3 — ¿Cómo comparar la actividad ingresada?</summary>

El usuario escribirá texto libre.  
Usa `===` para comparar exactamente.  
Considera que el usuario puede escribir "camping" o "Camping" — ¿cómo manejarías eso?  
Pista extra: `.toLowerCase()` convierte cualquier texto a minúsculas.

</details>

<details>
<summary>💡 Pista 4 — ¿Cómo construir el resumen final?</summary>

Usa template literals con backticks `` ` `` para construir el mensaje.  
Puedes incluir saltos de línea con `\n` dentro del template literal,  
o simplemente usando Enter dentro de los backticks.

</details>

---

### 🔍 SOLUCIÓN COMPLETA

> ⚠️ **NO MIRAR hasta haber intentado al menos 45 minutos.**  
> El esfuerzo es parte del aprendizaje. La solución fácil te roba la comprensión.

<details>
<summary>🔓 Ver solución completa</summary>

```javascript
// === KIOSCO DIGITAL DOITE ===

// 1. BIENVENIDA Y NOMBRE
let nombreIngresado = prompt("¡Bienvenido a Doite! ¿Cuál es tu nombre?")
let nombre = (nombreIngresado === null || nombreIngresado === "") 
    ? "Visitante" 
    : nombreIngresado

// 2. EDAD Y CLASIFICACIÓN
let edadIngresada = prompt("¿Cuántos años tienes?")
let edad = Number(edadIngresada)

let categoriaEdad
if (edad < 12) {
    categoriaEdad = "Niño"
} else if (edad < 18) {
    categoriaEdad = "Joven"
} else if (edad < 65) {
    categoriaEdad = "Adulto"
} else {
    categoriaEdad = "Senior"
}

// 3. ACTIVIDAD PRINCIPAL
let actividadIngresada = prompt("¿Cuál es tu actividad principal?\nCamping / Trekking / Running / Otra")
let actividad = actividadIngresada !== null ? actividadIngresada.toLowerCase() : "otra"

// 4. CLIENTE FRECUENTE
let esFrecuente = confirm("¿Ya eres cliente Doite?")
let textoFrecuente = esFrecuente ? "Sí" : "No"

// 5. RECOMENDACIÓN
let recomendacion
if (actividad === "camping") {
    recomendacion = "Carpas, sacos de dormir y cocinas portátiles"
} else if (actividad === "trekking") {
    recomendacion = "Botas, bastones y mochilas técnicas"
} else if (actividad === "running") {
    recomendacion = "Zapatillas trail, ropa técnica y accesorios"
} else {
    recomendacion = "Visita nuestra sección de novedades"
}

// 6. RESUMEN FINAL
let actividadMostrar = actividadIngresada !== null ? actividadIngresada : "Otra"

alert(`=== BIENVENIDO A DOITE ===

Cliente: ${nombre}
Categoría: ${categoriaEdad}
Actividad: ${actividadMostrar}
Cliente frecuente: ${textoFrecuente}

Te recomendamos: ${recomendacion}

¡Que disfrutes tu aventura!`)
```

</details>

---

### ✅ CRITERIOS DE APROBACIÓN

Marca cada uno cuando lo completes:

- [ ] El programa corre sin errores
- [ ] El nombre vacío o cancelado muestra "Visitante"
- [ ] La clasificación por edad funciona en los 4 casos
- [ ] La recomendación cambia según la actividad
- [ ] El cliente frecuente muestra "Sí" o "No" correctamente
- [ ] El resumen final muestra toda la información
- [ ] Puedes explicar cada línea de tu código en voz alta
- [ ] Subiste el archivo a GitHub con un commit claro

---

## 📝 CHECKPOINT FINAL — Sin mirar apuntes

Responde estas preguntas antes de avanzar a la Semana 2.  
Escríbelas en un archivo `CHECKPOINT_SEMANA_01.md`:

**Variables:**
1. ¿Cuál es la diferencia entre `let` y `const`?
2. ¿Por qué no usamos `var`?
3. ¿Qué pasa si declaras la misma variable dos veces con `let`?

**Tipos de datos:**
4. ¿Qué devuelve `typeof null` y por qué es un bug?
5. ¿Cuál es la diferencia entre `null` y `undefined`?
6. ¿Por qué `"0"` es truthy pero `0` es falsy?

**Comparaciones:**
7. ¿Por qué siempre `===` y nunca `==`?
8. ¿Por qué `null >= 0` es `true` pero `null == 0` es `false`?

**Condicionales:**
9. ¿Cuándo usas `if` y cuándo usas `?`?
10. Explica esta línea con tus palabras:
```javascript
let acceso = edad >= 18 ? "Permitido" : "Denegado"
```

---

## 📓 REGISTRO DE LA SEMANA

Completa esto en `REGISTRO_SEMANA_01.md`:

```markdown
# Registro Semana 01

## ¿Qué fue lo más difícil de esta semana?

## ¿Qué concepto te costó más entender?

## ¿Qué concepto te sorprendió más? (el bug de null, los 10 días de JS, etc.)

## ¿Qué harías diferente la próxima semana?

## En una frase: ¿qué es una variable?
```

---

## 🚀 SIGUIENTE PASO

Si completaste todo lo anterior:

```
✅ Proyecto kiosco funcionando
✅ Checkpoint respondido
✅ Registro completado
✅ Todo subido a GitHub
```

**Has ganado el derecho de avanzar a:**

---

> ### 📘 BOOTCAMP PERSONAL — SEMANA 02
> **Tema:** Bucles, Funciones y Scope  
> `for` · `while` · `function` · `return` · `scope` · primeros algoritmos reales

---

*Bootcamp generado específicamente para Óscar — Full Stack Developer en formación 🇨🇱*  
*Stack objetivo: Next.js 15 + TypeScript + Tailwind + Prisma + PostgreSQL + Clerk*
