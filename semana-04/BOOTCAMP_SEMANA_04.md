# 📘 BOOTCAMP SEMANA 04
## Objetos · Propiedades · Métodos · Arrays de Objetos

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_04.md` completa.
> **Recuerda:** Cuando termines cada día, avísame para validar antes de continuar.

---

## 🗓 DÍA 1 — ¿QUÉ PROBLEMA RESUELVEN LOS OBJETOS?

### 🎯 Objetivo
Entender qué problema concreto resuelven los objetos y crear tus primeros objetos con propiedades de distintos tipos.

---

### 📖 El problema que resuelven los objetos

Imagina que trabajas en una tienda de expediciones y necesitas representar un producto en tu código.

Con lo que sabes hasta ahora, harías esto:

```javascript
let nombreProducto = "Carpa Doite 3P"
let precioProducto = 89000
let stockProducto = 5
let disponibleProducto = true
```

Esto funciona para un producto. Pero ahora imagina 50 productos. Tendrías 200 variables sueltas, sin ninguna relación visible entre ellas. ¿Cuál `nombre` corresponde a cuál `precio`?

Y si quisieras pasar este producto a una función:

```javascript
function mostrarProducto(nombre, precio, stock, disponible) {
    console.log(`${nombre} - $${precio} (${stock} unidades)`)
}

mostrarProducto(nombreProducto, precioProducto, stockProducto, disponibleProducto)
```

Cuatro parámetros para representar una sola cosa. Si el producto tuviera 10 propiedades, serían 10 parámetros. Esto no escala.

---

### 📖 La solución — el objeto

Un objeto agrupa todas las propiedades de una cosa bajo un único nombre:

```javascript
let producto = {
    nombre: "Carpa Doite 3P",
    precio: 89000,
    stock: 5,
    disponible: true
}
```

Ahora la función recibe un solo argumento:

```javascript
function mostrarProducto(producto) {
    console.log(`${producto.nombre} - $${producto.precio} (${producto.stock} unidades)`)
}

mostrarProducto(producto)
```

Eso es exactamente lo que hacen los objetos: agrupar datos relacionados que describen una misma entidad.

---

### 📖 Cómo funciona un objeto — la estructura interna

Un objeto en JavaScript es una colección de pares **clave: valor**.

```javascript
let usuario = {
//  clave    valor
    nombre: "Oscar",
    edad:    28,
    activo:  true
}
```

- La **clave** (también llamada "propiedad" o "key") es siempre un string, aunque no lleve comillas cuando es una palabra simple
- El **valor** puede ser cualquier tipo de dato: string, number, boolean, array, función, o incluso otro objeto
- Los pares se separan con coma (`,`)

---

### 📖 Acceder a las propiedades

Dos formas de leer el valor de una propiedad:

```javascript
let usuario = { nombre: "Oscar", edad: 28 }

// Notación de punto — la más común, más legible
console.log(usuario.nombre)  // "Oscar"
console.log(usuario.edad)    // 28

// Notación de corchetes — cuando la clave viene de una variable
let propiedad = "nombre"
console.log(usuario[propiedad])  // "Oscar"
console.log(usuario["edad"])     // 28
```

La notación de corchetes es necesaria cuando no sabes de antemano cuál propiedad vas a acceder:

```javascript
function obtenerPropiedad(objeto, clave) {
    return objeto[clave]  // ← clave es una variable, no un texto fijo
}

obtenerPropiedad(usuario, "nombre")  // "Oscar"
obtenerPropiedad(usuario, "edad")    // 28
```

Si usaras `objeto.clave` dentro de esa función, buscaría la propiedad literal llamada "clave" — que no existe.

---

### 📖 Modificar y agregar propiedades

Los objetos son mutables — puedes cambiarlos después de crearlos:

```javascript
let usuario = { nombre: "Oscar", edad: 28 }

// Modificar una propiedad existente
usuario.edad = 29
console.log(usuario.edad)  // 29

// Agregar una propiedad nueva
usuario.ciudad = "Penco"
console.log(usuario)  // { nombre: "Oscar", edad: 29, ciudad: "Penco" }

// Eliminar una propiedad
delete usuario.ciudad
console.log(usuario)  // { nombre: "Oscar", edad: 29 }
```

---

### 📖 Propiedad inexistente — por qué importa

Acceder a una propiedad que no existe no genera un error — retorna `undefined`:

```javascript
let usuario = { nombre: "Oscar", edad: 28 }

console.log(usuario.telefono)  // undefined — no existe, pero no rompe el código
```

Esto puede crear bugs silenciosos. Si usas ese `undefined` en un cálculo:

```javascript
console.log(usuario.telefono + " (Chile)")  // "undefined (Chile)" — bug silencioso
```

Para verificar si una propiedad existe antes de usarla:

```javascript
if ("telefono" in usuario) {
    console.log(usuario.telefono)
}
// no entra al if — correcto, no hay error
```

---

### 🔗 Conexión con Next.js

En React/Next.js, los componentes reciben datos como objetos. Esto es exactamente lo que aprendes hoy:

```javascript
// Lo que aprendes hoy:
let producto = { nombre: "Carpa", precio: 45000 }
console.log(producto.nombre)

// Lo que harás en Mes 4-5 con Next.js:
function TarjetaProducto({ producto }) {
    return <div>{producto.nombre} - ${producto.precio}</div>
}
```

La forma de acceder (`producto.nombre`) es idéntica. Solo cambia dónde y cómo se muestra.

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `dia01_ejercicio01.js`

Crea un objeto `expedicion` que represente una expedición de montaña con estas propiedades:
- `nombre` (string)
- `destino` (string)
- `duracionDias` (number)
- `maxParticipantes` (number)
- `activa` (boolean)

Luego muestra en consola cada propiedad con su valor en este formato:
```
Expedición: Cruce de Los Andes
Destino: Cordillera de los Andes
Duración: 5 días
Máximo de participantes: 12
¿Activa?: true
```

---

**Ejercicio 2** — `dia01_ejercicio02.js`

Dado este objeto:
```javascript
let tienda = {
    nombre: "TerraMater Expediciones",
    ciudad: "Concepción",
    anioFundacion: 2015,
    envioGratis: false
}
```

1. Cambia `envioGratis` a `true`
2. Agrega una propiedad `telefono` con cualquier número
3. Agrega una propiedad `categorias` que sea un array: `["Trekking", "Escalada", "Kayak"]`
4. Elimina `anioFundacion`
5. Muestra el objeto completo en consola

---

**Ejercicio 3** — `dia01_ejercicio03.js`

Escribe una función `describir(objeto, clave)` que reciba cualquier objeto y el nombre de una propiedad, y retorne:
- El valor de esa propiedad si existe
- El string `"Propiedad no encontrada"` si no existe

```javascript
let producto = { nombre: "Carpa", precio: 45000 }

describir(producto, "nombre")   // "Carpa"
describir(producto, "precio")   // 45000
describir(producto, "color")    // "Propiedad no encontrada"
```

> 💡 Pista 1: Necesitas acceder a la propiedad con una variable como clave — ¿qué notación usarías?

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — MÉTODOS Y OBJETOS ANIDADOS

### 🎯 Objetivo
Agregar funciones dentro de objetos (métodos) y trabajar con objetos que contienen otros objetos.

---

### 📖 Métodos — funciones dentro de un objeto

Ya sabes que los valores de un objeto pueden ser strings, números, booleans o arrays. También pueden ser funciones:

```javascript
let calculadora = {
    marca: "Casio",
    sumar: function(a, b) {
        return a + b
    },
    restar: function(a, b) {
        return a - b
    }
}

calculadora.sumar(5, 3)   // 8
calculadora.restar(10, 4) // 6
```

Un método es exactamente igual que una función — la única diferencia es que vive dentro de un objeto y se llama con la notación de punto.

De hecho, ya has usado métodos todo el tiempo sin saberlo:

```javascript
"hola".toUpperCase()     // método del string
[1,2,3].push(4)          // método del array
console.log("texto")     // console es un objeto, log es un método
```

---

### 📖 Objetos anidados

Un objeto puede contener otro objeto como valor de una propiedad:

```javascript
let usuario = {
    nombre: "Oscar",
    edad: 28,
    direccion: {
        calle: "Av. Principal 123",
        ciudad: "Penco",
        region: "Biobío",
        codigoPostal: "4270000"
    },
    habilidades: ["JavaScript", "Git", "HTML"]
}
```

Para acceder a propiedades anidadas, encadenas el punto:

```javascript
usuario.nombre                // "Oscar"
usuario.direccion.ciudad      // "Penco"
usuario.direccion.region      // "Biobío"
usuario.habilidades[0]        // "JavaScript"
usuario.habilidades.length    // 3
```

---

### 📖 Por qué los objetos anidados existen en el mundo real

Cuando una API te devuelve datos de un usuario, raramente es un objeto plano. Típicamente es un objeto con propiedades que son otros objetos o arrays:

```javascript
// Respuesta típica de una API (lo que verás en Mes 6-7)
let respuestaAPI = {
    status: 200,
    data: {
        usuario: {
            id: "usr_123",
            nombre: "Oscar",
            plan: {
                tipo: "Pro",
                vencimiento: "2027-01-01"
            }
        }
    }
}

// Para acceder al tipo de plan:
respuestaAPI.data.usuario.plan.tipo  // "Pro"
```

---

### 🔗 Conexión con Next.js

En Next.js, cuando obtienes datos de una base de datos con Prisma, recibes objetos anidados. La forma de acceder es idéntica a lo que practicas hoy:

```javascript
// Respuesta típica de Prisma (Mes 9):
let pedido = {
    id: 1,
    total: 89000,
    usuario: {
        nombre: "Oscar",
        email: "oscar@gmail.com"
    },
    productos: [
        { nombre: "Carpa", precio: 45000 },
        { nombre: "Linterna", precio: 12000 }
    ]
}

pedido.usuario.nombre       // "Oscar"
pedido.productos[0].nombre  // "Carpa"
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — `dia02_ejercicio01.js`

Crea un objeto `conversor` con estos métodos:
- `celsiusAFahrenheit(c)` → retorna la temperatura convertida
- `fahrenheitACelsius(f)` → retorna la temperatura convertida
- `kgALibras(kg)` → retorna el peso convertido (1 kg = 2.20462 libras)
- `librasAKg(lb)` → retorna el peso convertido

Prueba cada método con al menos un ejemplo.

---

**Ejercicio 2** — `dia02_ejercicio02.js`

Dado este objeto anidado:
```javascript
let empresa = {
    nombre: "StartupMetrics",
    fundacion: 2020,
    sede: {
        pais: "Chile",
        ciudad: "Santiago",
        oficinas: 3
    },
    equipo: {
        total: 24,
        desarrolladores: 12,
        diseñadores: 4,
        marketing: 8
    },
    productos: ["Analytics Pro", "Dashboard Lite", "API Connect"]
}
```

Sin modificar el objeto, muestra en consola:
1. El nombre de la empresa y su año de fundación
2. La ciudad y el país de la sede
3. Cuántos desarrolladores tiene el equipo
4. El segundo producto de la lista
5. Cuántos productos tienen en total

---

**Ejercicio 3** — `dia02_ejercicio03.js`

Crea un objeto `validador` con estos métodos:
- `esEmail(texto)` → retorna `true` si el texto contiene "@" y termina en ".com" o ".cl"
- `esContrasenaSegura(texto)` → retorna `true` si el texto tiene 8 o más caracteres
- `esMayorDeEdad(edad)` → retorna `true` si la edad es 18 o más

Prueba cada método con al menos dos casos (uno que pase y uno que no).

> 💡 Pista 1: Para verificar si un string contiene "@" y termina en ".com" o ".cl", ya tienes las herramientas — `.includes()` y `.endsWith()`

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — OBJECT.KEYS, VALUES Y ENTRIES

### 🎯 Objetivo
Aprender a recorrer objetos usando los métodos estáticos de Object y combinarlos con lo que ya sabes de arrays.

---

### 📖 El problema de recorrer un objeto

Con arrays, recorrer era directo:

```javascript
let precios = [45000, 28000, 12000]
precios.forEach(function(precio) {
    console.log(precio)
})
```

Con objetos no puedes hacer eso directamente — los objetos no tienen `forEach`, `map` ni `filter`. Pero JavaScript te da tres herramientas para "convertir" un objeto en un array y usar todo lo que ya sabes:

---

### 📖 Object.keys() — las claves como array

```javascript
let producto = {
    nombre: "Carpa",
    precio: 45000,
    stock: 5
}

Object.keys(producto)
// ["nombre", "precio", "stock"]
```

`Object.keys()` retorna un array con los nombres de todas las propiedades. Ahora puedes usar `forEach`, `map`, `filter` — todo lo de la Semana 3:

```javascript
Object.keys(producto).forEach(function(clave) {
    console.log(clave)
})
// nombre
// precio
// stock
```

**Cuándo usarlo:** Solo necesitas los nombres de las propiedades.

---

### 📖 Object.values() — los valores como array

```javascript
Object.values(producto)
// ["Carpa", 45000, 5]
```

`Object.values()` retorna un array con los valores de todas las propiedades.

```javascript
// Sumar todos los valores numéricos — combinando con reduce
let configuracion = {
    timeout: 30,
    reintentos: 3,
    maxConexiones: 10
}

let suma = Object.values(configuracion).reduce(function(total, valor) {
    return total + valor
}, 0)
// 43
```

**Cuándo usarlo:** Solo necesitas los valores (para calcular, filtrar, transformar).

---

### 📖 Object.entries() — pares [clave, valor] como array

```javascript
Object.entries(producto)
// [["nombre", "Carpa"], ["precio", 45000], ["stock", 5]]
```

`Object.entries()` retorna un array de arrays, donde cada elemento es `[clave, valor]`.

```javascript
Object.entries(producto).forEach(function(entrada) {
    let clave = entrada[0]
    let valor = entrada[1]
    console.log(`${clave}: ${valor}`)
})
// nombre: Carpa
// precio: 45000
// stock: 5
```

**Cuándo usarlo:** Necesitas tanto la clave como el valor al mismo tiempo.

---

### 💼 Código real vs código de bootcamp

En código de aprendizaje, ves esto:

```javascript
Object.entries(producto).forEach(function(entrada) {
    let clave = entrada[0]
    let valor = entrada[1]
    console.log(`${clave}: ${valor}`)
})
```

En código profesional, verás esto con más frecuencia (desestructuración, Semana 5):

```javascript
Object.entries(producto).forEach(function([clave, valor]) {
    console.log(`${clave}: ${valor}`)
})
```

Son equivalentes. Cuando lleguemos a la Semana 5 entenderás exactamente por qué la segunda forma funciona. Por ahora usa la primera — es más explícita y más fácil de leer mientras aprendes.

---

### 🔗 Conexión con Next.js

En Next.js, a menudo recibes objetos de configuración o de API y necesitas transformarlos para mostrarlos. `Object.entries()` es la herramienta que conecta objetos con el mundo de arrays y con los métodos que ya dominas:

```javascript
// Configuración de un dashboard (Mes 4-5)
let metricas = {
    usuarios: 1250,
    ventas: 89000,
    visitas: 15400
}

// Mostrar cada métrica en un componente
Object.entries(metricas).forEach(function(entrada) {
    console.log(`${entrada[0]}: ${entrada[1].toLocaleString("es-CL")}`)
})
// usuarios: 1.250
// ventas: 89.000
// visitas: 15.400
```

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — `dia03_ejercicio01.js`

Dado este objeto:
```javascript
let inventario = {
    carpas: 8,
    bolsasDormir: 12,
    linternas: 25,
    brujulas: 6,
    cuerdas: 15
}
```

Usando `Object.keys`, `Object.values` y `Object.entries` (uno por tarea):
1. Muestra solo los nombres de los productos
2. Calcula el total de unidades en inventario
3. Muestra cada producto con su cantidad: `"carpas: 8 unidades"`

---

**Ejercicio 2** — `dia03_ejercicio02.js`

Dado este objeto de precios:
```javascript
let precios = {
    trekking: 45000,
    kayak: 65000,
    escalada: 80000,
    cicloturismo: 35000,
    rafting: 55000
}
```

1. Encuentra las actividades con precio mayor a 50000
2. Calcula el precio promedio de todas las actividades
3. Muestra la actividad más cara y su precio

> 💡 Pista 1: `Object.values()` te da los precios como array — ya sabes filtrar y reducir arrays.
> 💡 Pista 2: Para encontrar la actividad más cara necesitas tanto la clave como el valor — ¿qué método usarías?

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — ARRAYS DE OBJETOS + MAP, FILTER, REDUCE

### 🎯 Objetivo
Combinar arrays de objetos con los métodos de la Semana 3. Este es el patrón más importante y más usado en desarrollo web real.

---

### 📖 Por qué los arrays de objetos son tan importantes

Hasta ahora trabajaste con arrays de valores simples:

```javascript
let precios = [45000, 28000, 12000]
let nombres = ["Oscar", "Ana", "Pedro"]
```

En el mundo real, los datos vienen así:

```javascript
let productos = [
    { id: 1, nombre: "Carpa",        precio: 45000, categoria: "camping" },
    { id: 2, nombre: "Sleeping bag", precio: 28000, categoria: "camping" },
    { id: 3, nombre: "Linterna",     precio: 12000, categoria: "iluminacion" },
    { id: 4, nombre: "Kayak",        precio: 350000, categoria: "agua" },
    { id: 5, nombre: "Cuerda 50m",   precio: 65000, categoria: "escalada" }
]
```

Cada elemento del array es un objeto. Para acceder a sus propiedades dentro de `map`, `filter` o `reduce`, usas la notación de punto exactamente igual que siempre:

---

### 📖 filter sobre arrays de objetos

```javascript
// Solo los productos de camping
let camping = productos.filter(function(producto) {
    return producto.categoria === "camping"
})
// [{ id:1, nombre:"Carpa"... }, { id:2, nombre:"Sleeping bag"... }]

// Solo los productos bajo $50.000
let economicos = productos.filter(function(producto) {
    return producto.precio < 50000
})
```

---

### 📖 map sobre arrays de objetos

```javascript
// Solo los nombres
let nombres = productos.map(function(producto) {
    return producto.nombre
})
// ["Carpa", "Sleeping bag", "Linterna", "Kayak", "Cuerda 50m"]

// Precios con IVA
let preciosConIVA = productos.map(function(producto) {
    return {
        nombre: producto.nombre,
        precioConIVA: Math.round(producto.precio * 1.19)
    }
})
// [{ nombre: "Carpa", precioConIVA: 53550 }, ...]
```

El segundo ejemplo retorna un nuevo array de objetos — no solo valores simples. `map` puede retornar cualquier tipo de valor, incluyendo objetos completos.

---

### 📖 reduce sobre arrays de objetos

```javascript
// Total del inventario
let total = productos.reduce(function(suma, producto) {
    return suma + producto.precio
}, 0)
// 500000

// Producto más caro
let masCaro = productos.reduce(function(acumulador, producto) {
    if (producto.precio > acumulador.precio) {
        return producto
    }
    return acumulador
}, productos[0])
// { id: 4, nombre: "Kayak", precio: 350000, ... }
```

---

### 📖 Encadenar filter + map + reduce

Estos métodos se pueden combinar en secuencia — el resultado de uno es el array de entrada del siguiente:

```javascript
// Total de los productos de camping con IVA
let totalCampingConIVA = productos
    .filter(function(p) { return p.categoria === "camping" })
    .map(function(p) { return p.precio * 1.19 })
    .reduce(function(total, precio) { return total + precio }, 0)

// filter → [carpa(45000), sleeping(28000)]
// map    → [53550, 33320]
// reduce → 86870
```

---

### 💼 Código real vs código de bootcamp

En aplicaciones reales, los datos que procesas con `filter`, `map` y `reduce` siempre son arrays de objetos — exactamente lo que practicas hoy. La diferencia es que en producción esos datos vienen de una API o base de datos, no de un array que escribiste tú:

```javascript
// En bootcamp — datos que tú escribes
let productos = [
    { nombre: "Carpa", precio: 45000 }
]

// En producción (Mes 7-8) — datos que vienen de tu API
let productos = await fetch("/api/productos").then(r => r.json())

// Pero la forma de procesarlos es IDÉNTICA
let economicos = productos.filter(function(p) { return p.precio < 50000 })
```

---

### 🔗 Conexión con Next.js

En Next.js, casi toda operación de datos sigue este patrón: recibes un array de objetos, lo filtras, lo transformas con map, y lo muestras en pantalla:

```javascript
// Componente real de Next.js (Mes 4-5)
function ListaProductos({ productos }) {
    let disponibles = productos.filter(function(p) { return p.stock > 0 })

    return (
        <ul>
            {disponibles.map(function(p) {
                return <li key={p.id}>{p.nombre} - ${p.precio}</li>
            })}
        </ul>
    )
}
```

El `filter` y `map` son exactamente los mismos que aprendiste. Solo cambia que el resultado es HTML en vez de `console.log`.

---

### 🛠 EJERCICIOS DÍA 4

Usa este array para todos los ejercicios:

```javascript
let empleados = [
    { id: 1, nombre: "Ana",    departamento: "Desarrollo", salario: 1800000, activo: true  },
    { id: 2, nombre: "Pedro",  departamento: "Diseño",     salario: 1500000, activo: true  },
    { id: 3, nombre: "María",  departamento: "Desarrollo", salario: 2100000, activo: false },
    { id: 4, nombre: "Juan",   departamento: "Marketing",  salario: 1300000, activo: true  },
    { id: 5, nombre: "Sofía",  departamento: "Desarrollo", salario: 1950000, activo: true  },
    { id: 6, nombre: "Carlos", departamento: "Diseño",     salario: 1600000, activo: false },
    { id: 7, nombre: "Lucía",  departamento: "Marketing",  salario: 1400000, activo: true  }
]
```

**Ejercicio 1** — `dia04_ejercicio01.js`

Usando `filter`:
1. Obtén solo los empleados activos
2. Obtén solo los del departamento de Desarrollo
3. Obtén los empleados activos con salario mayor a $1.600.000

**Ejercicio 2** — `dia04_ejercicio02.js`

Usando `map`:
1. Crea un array con solo los nombres de todos los empleados
2. Crea un array con los nombres de los empleados activos (combina filter + map)
3. Crea un array de objetos con `{ nombre, salarioConBono }` donde el bono es 10% del salario

**Ejercicio 3** — `dia04_ejercicio03.js`

Usando `reduce`:
1. Calcula la suma total de salarios de empleados activos
2. Encuentra el empleado con el salario más alto
3. Cuenta cuántos empleados hay por departamento (el acumulador debe ser un objeto)

> 💡 Pista para el punto 3: El valor inicial de `reduce` puede ser un objeto vacío `{}`. En cada vuelta, verificas si el departamento ya existe como propiedad del acumulador.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — EJERCICIOS DE CONSOLIDACIÓN

### 🎯 Objetivo
Consolidar todo lo aprendido en la semana con ejercicios que combinan objetos, métodos y arrays de objetos en escenarios más complejos.

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — `dia05_ejercicio01.js`

Crea un objeto `biblioteca` con estas propiedades:
- `libros`: array de objetos, cada uno con `titulo`, `autor`, `anio` y `leido` (boolean)
- Agrega al menos 5 libros
- Método `buscarPorAutor(autor)` que retorne todos los libros de ese autor
- Método `librosLeidos()` que retorne cuántos libros has leído
- Método `libroMasReciente()` que retorne el libro con el año más alto

**Ejercicio 2** — `dia05_ejercicio02.js`

Dado este array de transacciones bancarias:

```javascript
let transacciones = [
    { id: 1, tipo: "ingreso",  monto: 500000, categoria: "salario",   mes: "enero" },
    { id: 2, tipo: "egreso",   monto: 120000, categoria: "arriendo",  mes: "enero" },
    { id: 3, tipo: "egreso",   monto: 45000,  categoria: "supermercado", mes: "enero" },
    { id: 4, tipo: "ingreso",  monto: 80000,  categoria: "freelance", mes: "enero" },
    { id: 5, tipo: "egreso",   monto: 35000,  categoria: "transporte", mes: "febrero" },
    { id: 6, tipo: "ingreso",  monto: 500000, categoria: "salario",   mes: "febrero" },
    { id: 7, tipo: "egreso",   monto: 120000, categoria: "arriendo",  mes: "febrero" },
    { id: 8, tipo: "egreso",   monto: 55000,  categoria: "supermercado", mes: "febrero" }
]
```

Calcula y muestra:
1. Total de ingresos
2. Total de egresos
3. Balance final (ingresos - egresos)
4. El egreso más alto y su categoría
5. Total gastado en enero vs febrero

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 Sistema de Gestión — NexusHR

> **NexusHR** es una startup chilena que construye software de gestión de recursos humanos para pequeñas y medianas empresas. Necesitan un módulo de análisis de datos de su equipo para generar reportes automáticos.
>
> Tu tarea es construir el motor de análisis — la lógica pura que procesa los datos y genera el reporte. El equipo de frontend (tú en unos meses) se encargará de la interfaz visual.

---

### 📋 Los datos

```javascript
let equipo = [
    { id: 1,  nombre: "Ana Martínez",   cargo: "Dev Senior",    depto: "Ingeniería",  salario: 2800000, aniosEmpresa: 4, activo: true  },
    { id: 2,  nombre: "Pedro Rojas",    cargo: "Designer UX",   depto: "Diseño",      salario: 2100000, aniosEmpresa: 2, activo: true  },
    { id: 3,  nombre: "María González", cargo: "Dev Junior",    depto: "Ingeniería",  salario: 1500000, aniosEmpresa: 1, activo: true  },
    { id: 4,  nombre: "Juan Pérez",     cargo: "Dev Senior",    depto: "Ingeniería",  salario: 2900000, aniosEmpresa: 6, activo: false },
    { id: 5,  nombre: "Sofía Torres",   cargo: "Mkt Manager",   depto: "Marketing",   salario: 2300000, aniosEmpresa: 3, activo: true  },
    { id: 6,  nombre: "Carlos Vega",    cargo: "Dev Mid",       depto: "Ingeniería",  salario: 2000000, aniosEmpresa: 2, activo: true  },
    { id: 7,  nombre: "Lucía Morales",  cargo: "Data Analyst",  depto: "Datos",       salario: 2400000, aniosEmpresa: 3, activo: true  },
    { id: 8,  nombre: "Diego Fuentes",  cargo: "Designer UX",   depto: "Diseño",      salario: 2000000, aniosEmpresa: 1, activo: false },
    { id: 9,  nombre: "Valentina Cruz", cargo: "Dev Junior",    depto: "Ingeniería",  salario: 1600000, aniosEmpresa: 1, activo: true  },
    { id: 10, nombre: "Andrés Soto",    cargo: "Mkt Analyst",   depto: "Marketing",   salario: 1800000, aniosEmpresa: 2, activo: true  }
]
```

---

### 📋 El reporte que debe generar tu sistema

```
=== NEXUSHR — REPORTE DE EQUIPO ===

👥 Total empleados: 10
✅ Empleados activos: 8
❌ Empleados inactivos: 2

💰 Masa salarial total (activos): $19.400.000
📊 Salario promedio (activos): $2.425.000
🏆 Salario más alto: Ana Martínez — $2.800.000 (Dev Senior)
📉 Salario más bajo: María González — $1.500.000 (Dev Junior)

🏢 Empleados por departamento:
   Ingeniería: 4 activos
   Diseño: 1 activos
   Marketing: 2 activos
   Datos: 1 activos

⭐ Empleados con más de 2 años en la empresa (activos): 4
```

---

### 📋 Requisitos técnicos

```
✅ Usar filter para empleados activos/inactivos y por departamento
✅ Usar map cuando necesites transformar datos
✅ Usar reduce para totales, promedios y búsqueda de extremos
✅ Los salarios deben mostrarse con .toLocaleString("es-CL")
✅ El reporte debe generarse con un solo console.log al final
❌ No usar bucles for para lo que puede hacerse con map/filter/reduce
```

---

### 💡 Pistas (máximo 2 — solo si las necesitas)

<details>
<summary>💡 Pista 1 — ¿Cómo contar empleados por departamento?</summary>

Necesitas un `reduce` donde el acumulador sea un objeto vacío `{}`.
En cada vuelta, verificas si el departamento ya existe como propiedad del acumulador.
Si no existe, lo creas con valor 1. Si existe, le sumas 1.

```javascript
let porDepto = empleadosActivos.reduce(function(contador, empleado) {
    let depto = empleado.depto
    // ¿existe esta propiedad en el acumulador?
    // si no → crear con 1
    // si sí → sumar 1
    return contador
}, {})
```

</details>

<details>
<summary>💡 Pista 2 — ¿Cómo mostrar los departamentos del reporte?</summary>

Una vez que tienes el objeto `porDepto`, usa `Object.entries()` para recorrerlo y construir el texto del reporte.

</details>

---

### 🔍 Solución completa

<details>
<summary>🔓 Ver solución — NO mirar hasta haber intentado al menos 60 minutos</summary>

```javascript
let equipo = [
    { id: 1,  nombre: "Ana Martínez",   cargo: "Dev Senior",  depto: "Ingeniería", salario: 2800000, aniosEmpresa: 4, activo: true  },
    { id: 2,  nombre: "Pedro Rojas",    cargo: "Designer UX", depto: "Diseño",     salario: 2100000, aniosEmpresa: 2, activo: true  },
    { id: 3,  nombre: "María González", cargo: "Dev Junior",  depto: "Ingeniería", salario: 1500000, aniosEmpresa: 1, activo: true  },
    { id: 4,  nombre: "Juan Pérez",     cargo: "Dev Senior",  depto: "Ingeniería", salario: 2900000, aniosEmpresa: 6, activo: false },
    { id: 5,  nombre: "Sofía Torres",   cargo: "Mkt Manager", depto: "Marketing",  salario: 2300000, aniosEmpresa: 3, activo: true  },
    { id: 6,  nombre: "Carlos Vega",    cargo: "Dev Mid",     depto: "Ingeniería", salario: 2000000, aniosEmpresa: 2, activo: true  },
    { id: 7,  nombre: "Lucía Morales",  cargo: "Data Analyst",depto: "Datos",      salario: 2400000, aniosEmpresa: 3, activo: true  },
    { id: 8,  nombre: "Diego Fuentes",  cargo: "Designer UX", depto: "Diseño",     salario: 2000000, aniosEmpresa: 1, activo: false },
    { id: 9,  nombre: "Valentina Cruz", cargo: "Dev Junior",  depto: "Ingeniería", salario: 1600000, aniosEmpresa: 1, activo: true  },
    { id: 10, nombre: "Andrés Soto",    cargo: "Mkt Analyst", depto: "Marketing",  salario: 1800000, aniosEmpresa: 2, activo: true  }
]

let activos = equipo.filter(function(e) { return e.activo })
let inactivos = equipo.filter(function(e) { return !e.activo })

let masaSalarial = activos.reduce(function(total, e) { return total + e.salario }, 0)
let promedio = Math.round(masaSalarial / activos.length)

let masAlto = activos.reduce(function(max, e) {
    return e.salario > max.salario ? e : max
}, activos[0])

let masAbajo = activos.reduce(function(min, e) {
    return e.salario < min.salario ? e : min
}, activos[0])

let porDepto = activos.reduce(function(contador, e) {
    if (contador[e.depto] === undefined) {
        contador[e.depto] = 0
    }
    contador[e.depto] += 1
    return contador
}, {})

let deptoTexto = Object.entries(porDepto).map(function(entrada) {
    return `   ${entrada[0]}: ${entrada[1]} activos`
}).join("\n")

let veteranos = activos.filter(function(e) { return e.aniosEmpresa > 2 })

console.log(`=== NEXUSHR — REPORTE DE EQUIPO ===

👥 Total empleados: ${equipo.length}
✅ Empleados activos: ${activos.length}
❌ Empleados inactivos: ${inactivos.length}

💰 Masa salarial total (activos): $${masaSalarial.toLocaleString("es-CL")}
📊 Salario promedio (activos): $${promedio.toLocaleString("es-CL")}
🏆 Salario más alto: ${masAlto.nombre} — $${masAlto.salario.toLocaleString("es-CL")} (${masAlto.cargo})
📉 Salario más bajo: ${masAbajo.nombre} — $${masAbajo.salario.toLocaleString("es-CL")} (${masAbajo.cargo})

🏢 Empleados por departamento:
${deptoTexto}

⭐ Empleados con más de 2 años en la empresa (activos): ${veteranos.length}`)
```

</details>

---

### ✅ Criterios de aprobación

```
□ El programa corre sin errores
□ Usaste filter para activos, inactivos y veteranos
□ Usaste reduce para masa salarial, promedio, más alto y más bajo
□ Usaste reduce con objeto para contar por departamento
□ Usaste Object.entries para mostrar los departamentos
□ Los salarios muestran formato chileno con toLocaleString("es-CL")
□ El reporte se genera con un solo console.log
□ Subido a GitHub con commit descriptivo
```

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva.** 🎯

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-04/
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
└── proyecto_nexushr.js ⭐
```

Todo en `bootcamp-fullstack/semana-04/` con commits descriptivos.

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 05:** ES6+ Moderno — Arrow functions, Destructuring, Spread operator, Template literals avanzados, Módulos
>
> ### 🏆 AL FINALIZAR ESTA SEMANA
> **Primer Proyecto Integrador del Mes 1** — experimento que integra todo lo aprendido en las Semanas 1-4

---

*Semana 04 — Objetos en JavaScript*
*Formato v4 — Bootcamp autocontenido*
*Óscar — Full Stack Developer en formación 🇨🇱*
