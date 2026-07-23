# 📘 BOOTCAMP SEMANA 06
## Programación Asíncrona · Promises · async/await · Fetch API

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_06.md` completa.
> **Recuerda:** Cuando termines cada día, avísame para validar antes de continuar.
>
> **Nota importante:** Los ejercicios con fetch requieren conexión a internet y se ejecutan en el navegador o en Node.js 18+. Usa la consola del navegador para los ejercicios de fetch, o Node.js para los que no usan fetch.

---

## 🗓 DÍA 1 — EL PROBLEMA DE LA ASINCRONÍA

### 🎯 Objetivo
Entender por qué JavaScript necesita asincronía y cómo funciona el modelo de ejecución.

---

### 📖 El problema: operaciones que toman tiempo

Imagina que construyes un sistema para TerraMater que necesita:
1. Obtener la lista de expediciones desde un servidor
2. Verificar disponibilidad en tiempo real
3. Confirmar la reserva

Cada operación puede tardar entre 100 milisegundos y varios segundos. Si JavaScript esperara bloqueado en cada paso, la aplicación parecería congelada.

El modelo síncrono que has usado hasta ahora funciona así:

```javascript
// Código síncrono — cada línea espera a la anterior
let precio = calcularPrecio("trekking")     // inmediato
let descuento = obtenerDescuento(precio)    // inmediato
let total = precio - descuento              // inmediato
```

Pero si `obtenerDescuento` necesita consultar un servidor, el modelo síncrono bloquearía todo el programa esperando.

---

### 📖 La solución: el Event Loop

JavaScript resuelve esto con un mecanismo llamado **Event Loop**. La idea es simple:

1. JavaScript ejecuta el código síncrono de arriba a abajo
2. Cuando encuentra una operación asíncrona (fetch, setTimeout, etc.), la delega y continúa
3. Cuando la operación termina, su callback se pone en cola
4. Cuando el código síncrono termina, el Event Loop ejecuta los callbacks en cola

```javascript
console.log("A")  // síncrono — ejecuta primero

setTimeout(() => {
    console.log("C")  // asíncrono — ejecuta último
}, 0)  // aunque el tiempo sea 0, va a la cola

console.log("B")  // síncrono — ejecuta segundo

// Output: A, B, C
// Aunque setTimeout tiene 0ms, "C" siempre es el último
```

Este ejemplo demuestra que incluso con 0 milisegundos, el callback asíncrono espera a que todo el código síncrono termine.

---

### 📖 setTimeout y setInterval — los más simples

`setTimeout` ejecuta una función una vez después de un tiempo:

```javascript
setTimeout(función, tiempoEnMilisegundos)

setTimeout(() => {
    console.log("Ejecutado después de 2 segundos")
}, 2000)
```

`setInterval` ejecuta una función repetidamente:

```javascript
const intervalo = setInterval(() => {
    console.log("Ejecutado cada segundo")
}, 1000)

// Para detenerlo
clearInterval(intervalo)
```

---

### 📖 El problema de los callbacks anidados

La forma original de manejar asincronía era con callbacks. Funciona, pero escala mal:

```javascript
// Simulando operaciones asíncronas con setTimeout
function obtenerExpediciones(callback) {
    setTimeout(() => {
        callback([
            { id: 1, nombre: "Cruce Los Andes" },
            { id: 2, nombre: "Torres del Paine" }
        ])
    }, 1000)
}

function verificarDisponibilidad(expedicionId, callback) {
    setTimeout(() => {
        callback({ disponible: true, cupos: 5 })
    }, 500)
}

function confirmarReserva(datos, callback) {
    setTimeout(() => {
        callback({ confirmado: true, codigo: "RES-001" })
    }, 800)
}

// El "callback hell" — código que va hacia la derecha
obtenerExpediciones(function(expediciones) {
    verificarDisponibilidad(expediciones[0].id, function(disponibilidad) {
        if (disponibilidad.disponible) {
            confirmarReserva({ expedicionId: expediciones[0].id }, function(confirmacion) {
                console.log("Reserva confirmada:", confirmacion.codigo)
                // Y si necesitas otro paso... agrega otro nivel
            })
        }
    })
})
```

Este código funciona pero tiene problemas serios:
- Difícil de leer (va hacia la derecha indefinidamente)
- Difícil de manejar errores (cada nivel necesita su propio manejo)
- Difícil de modificar sin romper algo

Las Promises resuelven estos problemas.

---

### 🔗 Conexión con Next.js

En Next.js, prácticamente toda interacción con datos es asíncrona. Los Server Components de Next.js 15 son funciones async que hacen fetch directamente:

```javascript
// Server Component en Next.js (Mes 5-6)
async function PaginaExpediciones() {
    const expediciones = await fetch("https://api.nexus.cl/expediciones")
        .then(r => r.json())

    return (
        <ul>
            {expediciones.map(exp => <li key={exp.id}>{exp.nombre}</li>)}
        </ul>
    )
}
```

Lo que aprendes esta semana es exactamente lo que usa ese componente.

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `dia01_ejercicio01.js`

Sin ejecutar el código, predice el output de cada ejemplo y explica por qué:

```javascript
// Ejemplo A
console.log("inicio")
setTimeout(() => console.log("timeout"), 0)
console.log("fin")

// Ejemplo B
console.log("1")
setTimeout(() => console.log("2"), 1000)
setTimeout(() => console.log("3"), 500)
console.log("4")

// Ejemplo C
let x = 0
setTimeout(() => {
    x = 1
    console.log("dentro:", x)
}, 0)
console.log("fuera:", x)
```

---

**Ejercicio 2** — `dia01_ejercicio02.js`

Implementa un sistema de "carga progresiva" usando setTimeout:

1. Muestra "Iniciando sistema..." inmediatamente
2. Después de 500ms, muestra "Cargando expediciones..."
3. Después de 1000ms, muestra "Cargando usuarios..."
4. Después de 1500ms, muestra "Sistema listo ✅"

No uses `async/await` — usa solo setTimeout.

---

**Ejercicio 3** — `dia01_ejercicio03.js`

Crea una función `simularOperacion(nombre, tiempoMs, callback)` que:
- Espera `tiempoMs` milisegundos
- Luego llama a `callback` con el resultado `{ operacion: nombre, completada: true }`

Usa esta función para simular tres operaciones encadenadas:
1. "Autenticación" (500ms)
2. "Carga de datos" (800ms) — solo si autenticación fue exitosa
3. "Renderizado" (200ms) — solo si carga fue exitosa

Observa el callback hell que se produce y toma nota — lo resolverás con Promises mañana.

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — PROMISES

### 🎯 Objetivo
Entender qué es una Promise, cómo crearla y cómo consumirla.

---

### 📖 Qué es una Promise

Una Promise es un objeto que representa la eventual finalización (o fallo) de una operación asíncrona y su valor resultante.

En términos simples: una Promise es un "contrato" que dice "te prometo que en algún momento tendrás un valor aquí, o te avisaré si algo salió mal."

```javascript
const promesa = new Promise((resolve, reject) => {
    // Esta función se ejecuta inmediatamente
    // Tu código asíncrono va aquí

    let exito = true  // simulando el resultado

    if (exito) {
        resolve("El valor cuando todo salió bien")
    } else {
        reject("El mensaje de error cuando algo salió mal")
    }
})
```

---

### 📖 Los tres estados de una Promise

```
pending   → la operación está en curso, aún no hay resultado
fulfilled → la operación terminó con éxito (resolve fue llamado)
rejected  → la operación falló (reject fue llamado)
```

Una Promise solo puede pasar de `pending` a `fulfilled` o de `pending` a `rejected`. No puede volver atrás ni cambiar de estado una vez que se resolvió o rechazó.

---

### 📖 Consumir una Promise

```javascript
const promesa = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Datos cargados"), 1000)
})

promesa
    .then(resultado => {
        // Se ejecuta cuando la Promise se fulfills
        console.log(resultado)  // "Datos cargados"
        return resultado.toUpperCase()  // lo que retornas pasa al siguiente .then
    })
    .then(resultadoTransformado => {
        console.log(resultadoTransformado)  // "DATOS CARGADOS"
    })
    .catch(error => {
        // Se ejecuta cuando la Promise se rechaza
        console.error("Error:", error)
    })
    .finally(() => {
        // Siempre se ejecuta, con éxito o error
        console.log("Operación terminada")
    })
```

---

### 📖 Encadenamiento de Promises

El poder de las Promises sobre los callbacks es el encadenamiento limpio:

```javascript
// El callback hell del Día 1, resuelto con Promises
function obtenerExpediciones() {
    return new Promise(resolve => {
        setTimeout(() => resolve([{ id: 1, nombre: "Cruce Los Andes" }]), 1000)
    })
}

function verificarDisponibilidad(expedicionId) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ disponible: true, cupos: 5 }), 500)
    })
}

function confirmarReserva(datos) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ confirmado: true, codigo: "RES-001" }), 800)
    })
}

// Encadenamiento limpio — sin indentación creciente
obtenerExpediciones()
    .then(expediciones => verificarDisponibilidad(expediciones[0].id))
    .then(disponibilidad => {
        if (!disponibilidad.disponible) throw new Error("Sin cupos")
        return confirmarReserva({ cupos: disponibilidad.cupos })
    })
    .then(confirmacion => console.log("Confirmada:", confirmacion.codigo))
    .catch(error => console.error("Error en el proceso:", error.message))
```

---

### 📖 Promise.all — esperar múltiples Promises

```javascript
const promesa1 = new Promise(resolve => setTimeout(() => resolve("A"), 1000))
const promesa2 = new Promise(resolve => setTimeout(() => resolve("B"), 500))
const promesa3 = new Promise(resolve => setTimeout(() => resolve("C"), 800))

Promise.all([promesa1, promesa2, promesa3])
    .then(([a, b, c]) => {
        // Se ejecuta cuando TODAS terminan
        // El tiempo total es el de la más lenta (~1000ms)
        console.log(a, b, c)  // "A", "B", "C"
    })
    .catch(error => {
        // Si CUALQUIERA falla, Promise.all falla
        console.error(error)
    })
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — `dia02_ejercicio01.js`

Convierte el ejercicio 3 del Día 1 (las tres operaciones encadenadas) para usar Promises en vez de callbacks. Las funciones deben retornar Promises y encadenarse con `.then()`.

Observa cómo el código se aplana y se vuelve más legible.

---

**Ejercicio 2** — `dia02_ejercicio02.js`

Crea estas Promises y consúmelas:

1. `esperarSegundos(n)` — Promise que se resuelve después de `n` segundos con el mensaje `"Esperé ${n} segundos"`

2. `dividirSeguro(a, b)` — Promise que se resuelve con `a/b` si `b !== 0`, o se rechaza con `"División por cero"` si `b === 0`

3. `validarEdad(edad)` — Promise que se resuelve con `"Acceso permitido"` si edad >= 18, o se rechaza con `"Acceso denegado: menor de edad"` si no

Prueba cada función con casos de éxito y de error.

---

**Ejercicio 3** — `dia02_ejercicio03.js`

Simula la carga de un dashboard que necesita tres datos independientes:
- Lista de expediciones (1200ms)
- Total de reservas del mes (800ms)
- Ingresos del trimestre (1000ms)

Implementa dos versiones:
1. Con await secuencial (mide el tiempo total con `console.time`)
2. Con `Promise.all` (mide el tiempo total)

Observa la diferencia de tiempo entre ambas versiones.

> 💡 Pista 1: Puedes medir tiempo con `console.time("etiqueta")` y `console.timeEnd("etiqueta")`

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — async/await

### 🎯 Objetivo
Dominar async/await para escribir código asíncrono legible y manejar errores correctamente.

---

### 📖 Por qué async/await existe

Las Promises mejoraron enormemente sobre los callbacks, pero el encadenamiento de `.then()` puede volverse verboso en operaciones complejas. `async/await` hace que el código asíncrono se lea como código síncrono:

```javascript
// Con Promises — funciona pero requiere .then() encadenados
function cargarPerfil(userId) {
    return obtenerUsuario(userId)
        .then(usuario => obtenerPedidos(usuario.id))
        .then(pedidos => {
            return { usuario, pedidos }  // ¿Pero cómo accedo a usuario aquí?
        })
}

// Con async/await — más natural
async function cargarPerfil(userId) {
    const usuario = await obtenerUsuario(userId)
    const pedidos = await obtenerPedidos(usuario.id)
    return { usuario, pedidos }  // ambas variables disponibles
}
```

El segundo ejemplo es más legible porque las variables se mantienen en el mismo scope.

---

### 📖 La mecánica de async/await

```javascript
// async convierte la función en una que retorna una Promise
async function ejemplo() {
    return 42
}
// ejemplo() retorna Promise<42>, no 42 directamente

// await "desenvuelve" el valor de una Promise
async function cargar() {
    const valor = await ejemplo()  // valor = 42 (no Promise<42>)
    console.log(valor)  // 42
}
```

**await pausa la ejecución de la función async** — pero no bloquea el hilo principal. Otras partes del programa siguen ejecutándose.

---

### 📖 Manejo de errores con try/catch

```javascript
async function cargarExpedicion(id) {
    try {
        const expedicion = await obtenerExpedicion(id)
        const disponibilidad = await verificarDisponibilidad(expedicion.id)

        if (!disponibilidad.disponible) {
            throw new Error("Expedición sin cupos disponibles")
        }

        return { expedicion, disponibilidad }

    } catch (error) {
        // Captura errores de cualquier await del bloque try
        // Y también errores lanzados con throw
        console.error("Error al cargar expedición:", error.message)
        return null
    } finally {
        // Siempre se ejecuta — útil para limpiar estado de "cargando"
        console.log("Carga de expedición finalizada")
    }
}
```

---

### 📖 async/await con Promise.all

`async/await` y `Promise.all` se combinan naturalmente:

```javascript
async function cargarDashboard() {
    try {
        // Operaciones independientes en paralelo
        const [expediciones, reservas, ingresos] = await Promise.all([
            obtenerExpediciones(),
            obtenerReservas(),
            obtenerIngresos()
        ])

        return { expediciones, reservas, ingresos }

    } catch (error) {
        console.error("Error al cargar dashboard:", error.message)
    }
}
```

---

### 💼 Código real vs código de bootcamp

```javascript
// Bootcamp — explícito, educativo
async function cargarProducto(id) {
    try {
        const respuesta = await fetch(`/api/productos/${id}`)
        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`)
        }
        const producto = await respuesta.json()
        return producto
    } catch (error) {
        console.error(error)
        return null
    }
}

// Profesional — más conciso, mismo comportamiento
async function cargarProducto(id) {
    const resp = await fetch(`/api/productos/${id}`)
    if (!resp.ok) throw new Error(`Error ${resp.status}`)
    return resp.json()
}
// El error se propaga al llamador — que maneja el error en su propio try/catch
```

---

### 🔗 Conexión con Next.js

En Next.js 15 con App Router, los Server Components son funciones async por defecto:

```javascript
// app/expediciones/page.tsx (Mes 5-6)
async function PaginaExpediciones() {
    // fetch directo en el componente — Next.js maneja el caching
    const expediciones = await fetch("https://api.nexus.cl/expediciones")
        .then(r => r.json())

    return <ListaExpediciones expediciones={expediciones} />
}

// Server Action (Mes 8-9)
async function confirmarReserva(formData) {
    "use server"
    const datos = Object.fromEntries(formData)
    await db.reservas.create({ data: datos })
}
```

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — `dia03_ejercicio01.js`

Convierte el ejercicio 2 del Día 2 (tres funciones con Promise) a async/await. Luego escribe una función `procesarTodo()` que llame a las tres funciones secuencialmente usando async/await y maneje los errores con try/catch.

---

**Ejercicio 2** — `dia03_ejercicio02.js`

Crea un simulador de proceso de pago con estas funciones (todas retornan Promises con setTimeout):

- `validarTarjeta(numero)` — 600ms — rechaza si el número tiene menos de 16 dígitos
- `verificarFondos(monto)` — 800ms — rechaza si monto > 500000
- `procesarPago(datos)` — 1000ms — resuelve con código de transacción

Escribe `realizarPago(numerotarjeta, monto)` usando async/await que:
1. Valida la tarjeta
2. Verifica fondos
3. Procesa el pago
4. Maneja cada tipo de error con un mensaje específico
5. Siempre muestra "Proceso de pago finalizado" al terminar

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — FETCH API

### 🎯 Objetivo
Hacer peticiones HTTP reales con fetch, procesar respuestas JSON y manejar errores correctamente.

---

### 📖 Por qué dos await con fetch

Esta es la pregunta más frecuente sobre fetch y merece una explicación clara:

```javascript
const respuesta = await fetch(url)
```

Después del primer `await`, `respuesta` es un objeto `Response`. Este objeto contiene los **headers** de la respuesta HTTP, el **status code**, pero el **cuerpo** todavía no se ha leído completamente — puede ser muy grande y llegó en partes.

```javascript
const datos = await respuesta.json()
```

El segundo `await` lee el cuerpo completo y lo parsea como JSON. Esta también es una operación asíncrona porque el cuerpo puede llegar en múltiples partes (chunks).

---

### 📖 El flujo completo con fetch

```javascript
async function obtenerDatos(url) {
    try {
        // Paso 1: Iniciar la petición
        const respuesta = await fetch(url)

        // Paso 2: Verificar que fue exitosa
        // fetch NO lanza error en 404, 500, etc.
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`)
        }

        // Paso 3: Leer y parsear el cuerpo
        const datos = await respuesta.json()

        return datos

    } catch (error) {
        // Captura: errores de red (sin conexión) y errores HTTP lanzados arriba
        console.error("Error:", error.message)
        throw error  // re-lanzar para que el llamador pueda manejar
    }
}
```

---

### 📖 Petición POST

```javascript
async function crearReserva(datosReserva) {
    try {
        const respuesta = await fetch("https://api.nexus.cl/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // En APIs con autenticación: "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(datosReserva)
        })

        if (!respuesta.ok) {
            const errorData = await respuesta.json()  // el servidor puede mandar detalles del error
            throw new Error(errorData.mensaje || `Error: ${respuesta.status}`)
        }

        return await respuesta.json()

    } catch (error) {
        console.error("Error al crear reserva:", error.message)
        throw error
    }
}
```

---

### 📖 API pública para practicar

Durante los ejercicios usarás `JSONPlaceholder` — una API pública gratuita para practicar:

```
GET  https://jsonplaceholder.typicode.com/users          → lista de usuarios
GET  https://jsonplaceholder.typicode.com/users/1        → usuario con id 1
GET  https://jsonplaceholder.typicode.com/posts          → lista de posts
GET  https://jsonplaceholder.typicode.com/posts?userId=1 → posts del usuario 1
POST https://jsonplaceholder.typicode.com/posts          → crear post (simulado)
```

---

### 🔗 Conexión con Next.js

En Next.js, fetch tiene capacidades adicionales configuradas por el framework — caching, revalidación, etc. La sintaxis es idéntica a la nativa, pero con opciones extra:

```javascript
// Next.js extiende fetch con opciones de cache (Mes 5-6)
const datos = await fetch("https://api.nexus.cl/expediciones", {
    next: { revalidate: 3600 }  // revalidar cada hora
})

// Para datos que cambian constantemente
const datos = await fetch("https://api.nexus.cl/disponibilidad", {
    cache: "no-store"  // nunca cachear
})
```

---

### 🛠 EJERCICIOS DÍA 4

**Nota:** Ejecuta estos ejercicios en la consola del navegador o en Node.js 18+.

**Ejercicio 1** — `dia04_ejercicio01.js`

Usando JSONPlaceholder:

1. Obtén todos los usuarios y muestra: id, nombre y email de cada uno
2. Obtén el usuario con id 3 y muestra todos sus datos
3. Obtén los posts del usuario con id 1 y cuenta cuántos tiene

---

**Ejercicio 2** — `dia04_ejercicio02.js`

Crea un función `buscarUsuarioPorEmail(email)` que:
1. Obtiene todos los usuarios de JSONPlaceholder
2. Busca el usuario cuyo email coincide (case insensitive)
3. Si lo encuentra, obtiene sus posts
4. Retorna `{ usuario, cantidadPosts }` o `null` si no existe

Prueba con "Sincere@april.biz" (existe) y "noexiste@test.com" (no existe).

---

**Ejercicio 3** — `dia04_ejercicio03.js`

Crea un "dashboard" que cargue en paralelo:
- Todos los usuarios
- Todos los posts
- Todos los comments (https://jsonplaceholder.typicode.com/comments)

Y muestre:
```
📊 Dashboard JSONPlaceholder
Usuarios: X
Posts: Y
Comments: Z
Promedio de posts por usuario: N
```

Usa `Promise.all` para cargar en paralelo.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — MANEJO DE ERRORES Y PATRONES AVANZADOS

### 🎯 Objetivo
Manejar errores de forma robusta en código asíncrono y aprender patrones comunes en aplicaciones reales.

---

### 📖 Los dos tipos de errores con fetch

```javascript
// Tipo 1 — Error de red (sin conexión, servidor no disponible)
// → Promise es rechazada → entra al catch automáticamente
try {
    const resp = await fetch("https://servidor-que-no-existe.com/api")
} catch (error) {
    console.log(error.message)  // "Failed to fetch" o similar
}

// Tipo 2 — Error HTTP (404, 401, 500, etc.)
// → Promise se RESUELVE → respuesta.ok es false → NO entra al catch
const resp = await fetch("https://api.ejemplo.com/recurso-que-no-existe")
console.log(resp.ok)      // false
console.log(resp.status)  // 404
// El catch NO se ejecuta automáticamente
```

---

### 📖 Patrón: función auxiliar para fetch

En aplicaciones reales, repetir el mismo manejo de errores en cada fetch es tedioso. Se crea una función auxiliar:

```javascript
async function fetchJSON(url, opciones = {}) {
    const respuesta = await fetch(url, opciones)

    if (!respuesta.ok) {
        const error = new Error(`Error HTTP ${respuesta.status}`)
        error.status = respuesta.status
        throw error
    }

    return respuesta.json()
}

// Uso — más limpio
async function obtenerExpediciones() {
    try {
        const expediciones = await fetchJSON("https://api.nexus.cl/expediciones")
        return expediciones
    } catch (error) {
        if (error.status === 404) {
            return []  // no hay expediciones — no es un error fatal
        }
        throw error  // otros errores sí son fatales
    }
}
```

---

### 📖 Patrón: retry con espera exponencial

En aplicaciones reales, los errores de red son transitorios. Reintentar después de una falla es un patrón común:

```javascript
async function fetchConReintentos(url, maxReintentos = 3) {
    let ultimoError

    for (let intento = 1; intento <= maxReintentos; intento++) {
        try {
            const respuesta = await fetch(url)
            if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`)
            return await respuesta.json()
        } catch (error) {
            ultimoError = error
            console.log(`Intento ${intento} fallido. ${maxReintentos - intento} intentos restantes`)

            if (intento < maxReintentos) {
                // Esperar antes del siguiente intento (espera exponencial)
                await new Promise(resolve => setTimeout(resolve, 1000 * intento))
            }
        }
    }

    throw ultimoError  // todos los intentos fallaron
}
```

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — `dia05_ejercicio01.js`

Implementa la función `fetchJSON(url, opciones)` de la sección anterior y úsala para:
1. Obtener datos válidos de JSONPlaceholder
2. Intentar obtener `https://jsonplaceholder.typicode.com/users/999` (no existe → 404)
3. Manejar cada caso de error con un mensaje diferente

---

**Ejercicio 2** — `dia05_ejercicio02.js`

Crea un sistema de carga de datos con estados:

```javascript
let estado = {
    cargando: false,
    datos: null,
    error: null
}
```

Implementa `cargarConEstado(url)` que:
1. Pone `cargando: true` al inicio
2. Intenta cargar los datos
3. En caso de éxito: guarda datos y pone `cargando: false`
4. En caso de error: guarda el error y pone `cargando: false`
5. Muestra el estado después de cada cambio

Este patrón es exactamente lo que hace `useState` con datos asíncronos en React.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 NexusData — Cliente de API con Caché

> **Nexus** necesita un módulo que gestione las llamadas a su API externa de datos meteorológicos para alertar a los clientes sobre condiciones en las rutas de expedición.
>
> Tu tarea es construir `nexus-data` — un cliente de API con las siguientes características:
> - Obtener datos de múltiples endpoints en paralelo
> - Implementar una caché simple para no repetir peticiones recientes
> - Manejar errores de forma robusta
> - Generar un reporte de estado del sistema

---

### 📋 La API que usarás

Para simular la API de Nexus, usarás JSONPlaceholder. El "contexto narrativo" es que cada endpoint representa datos del sistema Nexus:

```
/users   → "guías registrados en el sistema"
/posts   → "reportes de expediciones"
/todos   → "tareas pendientes del equipo"
/albums  → "álbumes de fotos de expediciones"
```

---

### 📋 Lo que debe hacer el sistema

**Módulo 1 — Cliente HTTP básico**

Implementa `fetchJSON(url)` con:
- Verificación de `respuesta.ok`
- Manejo de errores de red
- Timeout de 5 segundos (usa `Promise.race` con un setTimeout que rechaza)

**Módulo 2 — Caché simple**

```javascript
const cache = new Map()  // Map es una estructura clave-valor, similar a un objeto

// Implementa:
// guardarEnCache(clave, datos, ttlSegundos) → guarda con timestamp de expiración
// obtenerDeCache(clave) → retorna datos si no expiraron, null si expiraron
// invalidarCache(clave) → elimina una entrada
```

**Módulo 3 — Cliente con caché**

```javascript
async function obtenerConCache(url, ttlSegundos = 60) {
    // Si está en caché y no expiró → retornar de caché
    // Si no → hacer fetch, guardar en caché, retornar
}
```

**Módulo 4 — Operaciones del sistema Nexus**

```javascript
async function cargarDashboard() {
    // Carga en paralelo con Promise.all:
    // - guías (users)
    // - reportes (posts)
    // - tareas pendientes (todos sin completar)
    // Retorna el objeto combinado
}

async function obtenerReporteGuia(guiaId) {
    // Carga en paralelo:
    // - datos del guía (users/id)
    // - reportes del guía (posts?userId=id)
    // Retorna objeto combinado
}
```

**Módulo 5 — Reporte final**

Al ejecutar el sistema, muestra:

```
=== NEXUS DATA — REPORTE DEL SISTEMA ===

📊 Dashboard cargado:
   Guías registrados: X
   Reportes totales: Y
   Tareas pendientes: Z

👤 Reporte guía ID 1:
   Nombre: [nombre]
   Reportes: [cantidad]

💾 Estado de caché:
   Entradas activas: N
   [lista de URLs en caché con tiempo restante]

✅ Sistema operativo
```

---

### ✅ Criterios de aprobación

```
□ fetchJSON maneja tanto errores de red como errores HTTP
□ El timeout con Promise.race funciona correctamente
□ La caché guarda y recupera datos correctamente
□ La caché expira según el TTL configurado
□ cargarDashboard usa Promise.all (no await secuencial)
□ obtenerReporteGuia también usa Promise.all
□ El reporte final muestra todos los datos requeridos
□ El código usa async/await y manejo de errores con try/catch
□ Subido a GitHub con commit descriptivo
```

---

> 💡 Pista 1 — Timeout con Promise.race:
> `Promise.race` retorna la primera Promise que se resuelva o rechace. Puedes competir tu fetch con un Promise que rechaza después de N ms.

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva.** 🎯

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-06/
├── dia01_ejercicio01.js
├── dia01_ejercicio02.js
├── dia01_ejercicio03.js
├── dia02_ejercicio01.js
├── dia02_ejercicio02.js
├── dia02_ejercicio03.js
├── dia03_ejercicio01.js
├── dia03_ejercicio02.js
├── dia04_ejercicio01.js
├── dia04_ejercicio02.js
├── dia04_ejercicio03.js
├── dia05_ejercicio01.js
├── dia05_ejercicio02.js
└── nexus-data/ ⭐
    ├── cliente.js     (fetchJSON + timeout)
    ├── cache.js       (sistema de caché)
    ├── nexus.js       (operaciones del sistema)
    └── demo.js        (reporte final)
```

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 07:** Git Profesional — Ramas, merge, rebase, pull requests, flujo de trabajo en equipo

---

*Semana 06 — Programación Asíncrona*
*Formato v4 — Bootcamp autocontenido con Protocolo QA aplicado*
*Óscar — Full Stack Developer en formación 🇨🇱*
