# CHEAT SHEET — SEMANA 06
## Programación Asíncrona · Promises · async/await · Fetch API

> Lee esto ANTES de empezar los ejercicios.
> Esta semana explica por qué JavaScript funciona diferente a otros lenguajes
> y cómo manejar operaciones que toman tiempo.

---

## EL MODELO DE EJECUCIÓN DE JAVASCRIPT

JavaScript es **single-threaded** — ejecuta una sola cosa a la vez. Pero puede iniciar operaciones que toman tiempo (llamadas a APIs, lectura de archivos, temporizadores) y seguir ejecutando otro código mientras espera.

```javascript
console.log("1 — inicio")

setTimeout(() => {
    console.log("3 — después de 1 segundo")
}, 1000)

console.log("2 — fin del código síncrono")

// Output:
// 1 — inicio
// 2 — fin del código síncrono
// 3 — después de 1 segundo
```

El código no se detiene esperando — continúa y el callback se ejecuta cuando la operación termina.

**Idea mental:** JavaScript es como un chef que pone agua a hervir y mientras espera, corta verduras. No se queda parado mirando la olla.

---

## CALLBACKS — LA FORMA ORIGINAL (Y SUS PROBLEMAS)

Un callback es una función que se ejecuta cuando una operación asíncrona termina:

```javascript
function obtenerUsuario(id, callback) {
    setTimeout(() => {
        callback({ id, nombre: "Oscar" })
    }, 1000)
}

obtenerUsuario(1, function(usuario) {
    console.log(usuario.nombre)  // "Oscar" — después de 1 segundo
})
```

**El problema — callback hell:**

```javascript
// Cuando necesitas encadenar operaciones asíncronas
obtenerUsuario(1, function(usuario) {
    obtenerPedidos(usuario.id, function(pedidos) {
        obtenerDetallePedido(pedidos[0].id, function(detalle) {
            // código indentado al infinito — imposible de mantener
        })
    })
})
```

Las Promises resuelven este problema.

---

## PROMISES

Una Promise representa un valor que estará disponible en el futuro. Tiene tres estados:
- **pending** — esperando resultado
- **fulfilled** — completada con éxito
- **rejected** — falló con error

```javascript
// Crear una Promise
const miPromesa = new Promise((resolve, reject) => {
    // operación asíncrona
    let exito = true

    if (exito) {
        resolve("¡Funcionó!")  // fulfills la promise
    } else {
        reject("Algo salió mal")  // rejects la promise
    }
})
```

**Consumir una Promise con `.then()` y `.catch()`:**

```javascript
miPromesa
    .then(resultado => console.log(resultado))   // "¡Funcionó!"
    .catch(error => console.log(error))          // si falla
    .finally(() => console.log("siempre corre")) // siempre se ejecuta
```

**Cuándo usarla:** Cuando trabajas con APIs que retornan Promises (fetch, la mayoría de librerías modernas).

**Error típico:**
```javascript
// ❌ Olvidar el return en .then() encadenado
promesa
    .then(data => {
        procesar(data)  // sin return → el siguiente .then recibe undefined
    })
    .then(resultado => console.log(resultado))  // undefined

// ✅ Con return
promesa
    .then(data => {
        return procesar(data)  // o simplemente: data => procesar(data)
    })
    .then(resultado => console.log(resultado))
```

**Idea mental:** Una Promise es un "recibo" — te lo dan ahora y lo "cobras" (`.then()`) cuando el resultado esté listo.

---

## async/await — LA FORMA MODERNA

`async/await` es azúcar sintáctico sobre Promises. Hace que el código asíncrono se lea como síncrono:

```javascript
// Con Promises
function obtenerDatos() {
    return fetch("https://api.ejemplo.com/datos")
        .then(respuesta => respuesta.json())
        .then(datos => console.log(datos))
        .catch(error => console.log(error))
}

// Con async/await — misma lógica, más legible
async function obtenerDatos() {
    try {
        const respuesta = await fetch("https://api.ejemplo.com/datos")
        const datos = await respuesta.json()
        console.log(datos)
    } catch (error) {
        console.log(error)
    }
}
```

**Reglas:**
- `await` solo puede usarse dentro de una función `async`
- `await` pausa la ejecución de la función `async` hasta que la Promise se resuelve
- La función `async` siempre retorna una Promise
- Los errores se capturan con `try/catch`

**Arrow function async:**
```javascript
const obtenerDatos = async () => {
    const respuesta = await fetch("https://api.ejemplo.com/datos")
    return respuesta.json()
}
```

**Error típico:**
```javascript
// ❌ await fuera de función async
const datos = await fetch("...")  // SyntaxError en la mayoría de contextos

// ✅ await dentro de async
async function cargar() {
    const datos = await fetch("...")
}
```

**Idea mental:** `await` le dice a JavaScript "espera aquí hasta que esto termine, pero no bloquees el resto del programa".

---

## FETCH API

La herramienta nativa del navegador para hacer peticiones HTTP:

**GET — obtener datos:**
```javascript
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`)
        }

        const usuarios = await respuesta.json()
        return usuarios
    } catch (error) {
        console.error("Error al obtener usuarios:", error.message)
    }
}
```

**POST — enviar datos:**
```javascript
async function crearUsuario(datosUsuario) {
    try {
        const respuesta = await fetch("https://api.ejemplo.com/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosUsuario)
        })

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`)
        }

        return await respuesta.json()
    } catch (error) {
        console.error("Error:", error.message)
    }
}
```

**Por qué dos awaits con fetch:**
```javascript
const respuesta = await fetch(url)  // await 1: espera la respuesta HTTP (headers)
const datos = await respuesta.json() // await 2: espera leer el cuerpo completo
```

**Error típico:**
```javascript
// ❌ fetch no lanza error en respuestas 404 o 500
const respuesta = await fetch("https://api.ejemplo.com/no-existe")
// respuesta.ok = false, pero NO entra al catch automáticamente

// ✅ Verificar respuesta.ok manualmente
if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`)
}
```

**Idea mental:** fetch retorna un "sobre" (la respuesta HTTP). `.json()` abre el sobre y lee el contenido.

---

## Promise.all() — OPERACIONES EN PARALELO

Ejecuta múltiples Promises simultáneamente y espera que todas terminen:

```javascript
// Secuencial — lento (espera cada uno antes del siguiente)
const usuario = await obtenerUsuario(1)      // 1 segundo
const pedidos = await obtenerPedidos(1)      // 1 segundo
// Total: 2 segundos

// Paralelo con Promise.all — más rápido
const [usuario, pedidos] = await Promise.all([
    obtenerUsuario(1),   // se inician simultáneamente
    obtenerPedidos(1)    // se inician simultáneamente
])
// Total: ~1 segundo (el más lento de los dos)
```

**Comportamiento ante errores:**
- Si UNA Promise falla, `Promise.all` falla completamente
- Se captura con `try/catch` normalmente

**Cuándo usarlo:** Cuando tienes múltiples operaciones independientes que pueden ejecutarse en paralelo.

**Cuándo NO usarlo:** Cuando las operaciones dependen una de otra (usa await secuencial).

---

## MANEJO DE ERRORES

```javascript
// try/catch con async/await
async function cargarDatos() {
    try {
        const datos = await fetch("https://api.ejemplo.com/datos")
        return await datos.json()
    } catch (error) {
        // Captura errores de red Y errores lanzados con throw
        console.error("Error:", error.message)
        return null  // valor por defecto en caso de error
    } finally {
        // Siempre se ejecuta — útil para limpiar estado de "cargando"
        console.log("Operación completada")
    }
}
```

**Tipos de errores con fetch:**
```javascript
// Error de red (sin conexión, servidor caído)
// → Entra al catch automáticamente

// Error HTTP (404, 500, etc.)
// → NO entra al catch — respuesta.ok es false
// → Debes verificar y throw manualmente
```

---

## COMPARACIONES IMPORTANTES

### Callback vs Promise vs async/await

| | Callback | Promise | async/await |
|---|---|---|---|
| Legibilidad | Baja (anidamiento) | Media | Alta |
| Manejo de errores | Difícil | `.catch()` | `try/catch` |
| Encadenamiento | Callback hell | `.then()` chain | Secuencial natural |
| Año introducido | Siempre existió | ES6 (2015) | ES8 (2017) |
| Uso moderno | Evitar para async | Cuando la API lo requiere | Preferido |

### await secuencial vs Promise.all

```javascript
// Secuencial — cuando B depende de A
const usuario = await obtenerUsuario(id)
const pedidos = await obtenerPedidos(usuario.id)  // necesita usuario.id

// Paralelo — cuando son independientes
const [productos, categorias] = await Promise.all([
    obtenerProductos(),   // independiente
    obtenerCategorias()   // independiente
])
```

---

## ERRORES FRECUENTES DE LA SEMANA

```javascript
// ❌ await fuera de función async
const datos = await fetch(url)  // SyntaxError

// ❌ No verificar respuesta.ok en fetch
const resp = await fetch(url)
const datos = await resp.json()  // puede fallar silenciosamente en errores HTTP

// ❌ Olvidar el segundo await con fetch
const datos = await fetch(url)  // datos es un Response, no los datos
// En vez de:
const resp = await fetch(url)
const datos = await resp.json()  // ✅

// ❌ Promise.all con operaciones dependientes
const [usuario, pedidos] = await Promise.all([
    obtenerUsuario(id),
    obtenerPedidos(usuario.id)  // ❌ usuario no existe todavía
])

// ❌ Olvidar manejar errores
async function cargar() {
    const datos = await fetch(url)  // si falla, la función rechaza sin control
}
// ✅ Siempre envolver en try/catch o manejar el error
```

---

## CHECKLIST DE DOMINIO

```
□ Entiendo por qué JavaScript necesita asincronía
□ Puedo explicar qué es una Promise y sus tres estados
□ Puedo usar .then(), .catch() y .finally() correctamente
□ Puedo escribir funciones async con await
□ Sé por qué se necesitan dos await con fetch
□ Verifico siempre respuesta.ok después de fetch
□ Capturo errores con try/catch en funciones async
□ Entiendo cuándo usar await secuencial vs Promise.all
□ Puedo hacer una petición GET y procesar la respuesta JSON
□ Sé la diferencia entre error de red y error HTTP en fetch
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. JavaScript no se bloquea esperando — delega y continúa**
El código síncrono siempre se ejecuta antes que los callbacks/then. El Event Loop gestiona cuándo ejecutar el código asíncrono.

**2. fetch NO lanza error en respuestas 404 o 500**
Solo lanza error en fallos de red. Para errores HTTP, debes verificar `respuesta.ok` manualmente y lanzar el error tú mismo. Este es el bug más común al trabajar con fetch.

**3. Con fetch siempre necesitas dos await**
El primero espera los headers (respuesta HTTP). El segundo espera leer el cuerpo completo con `.json()`. Son dos operaciones asíncronas distintas.

**4. async/await es azúcar sobre Promises — no las reemplaza**
Cuando escribes `await`, internamente trabaja con Promises. Entender Promises te hace mejor con async/await. No son alternativas — son capas.

**5. Promise.all es para operaciones independientes en paralelo**
Si la segunda operación necesita el resultado de la primera, deben ser await secuenciales. Si son independientes, Promise.all las ejecuta en paralelo y ahorra tiempo.

---

*Cheat Sheet Semana 06 — Programación Asíncrona*
*Leer antes de los ejercicios — consultar durante la semana*
