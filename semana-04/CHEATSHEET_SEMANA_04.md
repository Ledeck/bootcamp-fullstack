# CHEAT SHEET — SEMANA 04
## Objetos · Propiedades · Métodos · Arrays de Objetos

> Lee esto ANTES de empezar los ejercicios.
> Consulta aquí cuando tengas dudas durante la semana.

---

## ¿QUÉ ES UN OBJETO?

Un objeto es una estructura que agrupa datos relacionados bajo un mismo nombre, usando pares **clave: valor**.

```javascript
let producto = {
    nombre: "Carpa",      // clave: valor
    precio: 45000,        // clave: valor
    disponible: true      // clave: valor
}
```

**Idea mental:** Un objeto es una ficha de producto. En vez de tener tres variables separadas (`nombre`, `precio`, `disponible`), tienes una sola "caja con compartimentos etiquetados".

---

## CREAR UN OBJETO

```javascript
// Objeto vacío
let objeto = {}

// Objeto con datos
let usuario = {
    nombre: "Oscar",
    edad: 28,
    ciudad: "Penco"
}
```

**Reglas:**
- Las claves (keys) no llevan comillas si son palabras simples
- Los valores pueden ser cualquier tipo: string, number, boolean, array, otro objeto
- Las propiedades se separan con coma (`,`) — no con punto y coma

---

## ACCEDER A PROPIEDADES

Dos formas equivalentes:

```javascript
let usuario = { nombre: "Oscar", edad: 28 }

// Notación de punto — la más común
usuario.nombre    // "Oscar"
usuario.edad      // 28

// Notación de corchetes — cuando la clave es dinámica
usuario["nombre"] // "Oscar"
usuario["edad"]   // 28
```

**¿Cuándo usar corchetes?**
```javascript
let clave = "nombre"
usuario[clave]     // "Oscar" ✅ — la clave viene de una variable
usuario.clave      // undefined ❌ — busca la propiedad literal "clave"
```

**Error típico:** Acceder a una propiedad que no existe retorna `undefined`, no un error.
```javascript
usuario.telefono   // undefined — no existe, pero no rompe el código
```

---

## MODIFICAR Y AGREGAR PROPIEDADES

```javascript
let usuario = { nombre: "Oscar", edad: 28 }

// Modificar una propiedad existente
usuario.edad = 29

// Agregar una propiedad nueva
usuario.ciudad = "Penco"

// Resultado: { nombre: "Oscar", edad: 29, ciudad: "Penco" }
```

---

## ELIMINAR UNA PROPIEDAD

```javascript
let usuario = { nombre: "Oscar", edad: 28, ciudad: "Penco" }

delete usuario.ciudad

// Resultado: { nombre: "Oscar", edad: 28 }
```

---

## MÉTODOS — FUNCIONES DENTRO DE UN OBJETO

Un método es una función que vive dentro de un objeto.

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

**Idea mental:** Un método es lo mismo que una función, pero "vive" dentro del objeto. `calculadora.sumar` es exactamente igual que llamar `sumar` si fuera una función suelta.

---

## VERIFICAR SI UNA PROPIEDAD EXISTE

```javascript
let usuario = { nombre: "Oscar", edad: 28 }

// Opción 1 — comparar con undefined
usuario.telefono !== undefined  // false — no existe

// Opción 2 — operador in (más explícito)
"nombre" in usuario    // true
"telefono" in usuario  // false
```

---

## RECORRER UN OBJETO

### Object.keys() — obtener las claves
```javascript
let usuario = { nombre: "Oscar", edad: 28, ciudad: "Penco" }

Object.keys(usuario)
// ["nombre", "edad", "ciudad"]
```
**Cuándo usarlo:** Solo necesitas los nombres de las propiedades.

### Object.values() — obtener los valores
```javascript
Object.values(usuario)
// ["Oscar", 28, "Penco"]
```
**Cuándo usarlo:** Solo necesitas los valores (sumar, filtrar, transformar).

### Object.entries() — obtener pares [clave, valor]
```javascript
Object.entries(usuario)
// [["nombre", "Oscar"], ["edad", 28], ["ciudad", "Penco"]]
```
**Cuándo usarlo:** Necesitas tanto la clave como el valor al mismo tiempo.

### Iterar con forEach
```javascript
Object.entries(usuario).forEach(function(entrada) {
    let clave = entrada[0]
    let valor = entrada[1]
    console.log(`${clave}: ${valor}`)
})
// nombre: Oscar
// edad: 28
// ciudad: Penco
```

---

## ARRAYS DE OBJETOS

La combinación más poderosa y la más común en el mundo real.

```javascript
let productos = [
    { nombre: "Carpa",        precio: 45000, stock: 5 },
    { nombre: "Sleeping bag", precio: 28000, stock: 0 },
    { nombre: "Linterna",     precio: 12000, stock: 8 }
]

// Acceder a un elemento y luego a su propiedad
productos[0].nombre    // "Carpa"
productos[1].precio    // 28000
productos[2].stock     // 8
```

---

## ARRAYS DE OBJETOS CON MAP, FILTER Y REDUCE

Aquí es donde todo lo de la Semana 3 y la Semana 4 se une:

```javascript
let productos = [
    { nombre: "Carpa",        precio: 45000, stock: 5 },
    { nombre: "Sleeping bag", precio: 28000, stock: 0 },
    { nombre: "Linterna",     precio: 12000, stock: 8 }
]

// filter — solo los productos con stock
let disponibles = productos.filter(function(p) {
    return p.stock > 0
})
// [{ nombre: "Carpa"... }, { nombre: "Linterna"... }]

// map — solo los nombres
let nombres = productos.map(function(p) {
    return p.nombre
})
// ["Carpa", "Sleeping bag", "Linterna"]

// reduce — total del inventario
let totalInventario = productos.reduce(function(total, p) {
    return total + p.precio * p.stock
}, 0)
// 45000*5 + 28000*0 + 12000*8 = 321.000
```

---

## OBJETOS ANIDADOS

Un objeto puede contener otro objeto como valor.

```javascript
let usuario = {
    nombre: "Oscar",
    direccion: {
        ciudad: "Penco",
        region: "Biobío"
    }
}

usuario.direccion.ciudad   // "Penco"
usuario.direccion.region   // "Biobío"
```

---

## COMPARACIONES IMPORTANTES

### Objeto vs Array — ¿cuándo usar cada uno?

| | Array | Objeto |
|---|---|---|
| **Estructura** | Lista ordenada | Datos relacionados |
| **Acceso** | Por índice numérico `[0]` | Por nombre de propiedad `.nombre` |
| **Cuándo usarlo** | "tengo varios X" | "tengo UN X con múltiples propiedades" |
| **Ejemplo** | Lista de productos | Un producto con nombre, precio, stock |

```javascript
// Array — varios productos
let productos = ["Carpa", "Linterna", "Brújula"]

// Objeto — un producto con sus detalles
let producto = { nombre: "Carpa", precio: 45000, stock: 5 }

// Lo más común en la realidad: array de objetos
let catalogo = [
    { nombre: "Carpa",    precio: 45000 },
    { nombre: "Linterna", precio: 12000 }
]
```

### Object.keys() vs Object.values() vs Object.entries()

| Método | Retorna | Cuándo usarlo |
|---|---|---|
| `Object.keys(obj)` | Array de claves | Solo necesito los nombres de propiedades |
| `Object.values(obj)` | Array de valores | Solo necesito los valores |
| `Object.entries(obj)` | Array de `[clave, valor]` | Necesito ambos |

---

## ERRORES FRECUENTES

```javascript
// ❌ Coma en la última propiedad (en versiones muy antiguas era error)
let obj = {
    nombre: "Oscar",
    edad: 28,    // ← la coma trailing está bien en JS moderno, no es error
}

// ❌ Acceder con punto cuando la clave es una variable
let clave = "nombre"
obj.clave      // undefined — busca la propiedad literal "clave"
obj[clave]     // "Oscar" ✅ — usa el valor de la variable

// ❌ Confundir que los objetos NO tienen .length
let obj = { a: 1, b: 2, c: 3 }
obj.length           // undefined — los objetos no tienen .length
Object.keys(obj).length  // 3 ✅ — así se cuenta el número de propiedades

// ❌ Esperar que dos objetos con los mismos valores sean iguales
{ nombre: "Oscar" } === { nombre: "Oscar" }  // false
// Los objetos se comparan por referencia, no por valor
// (esto lo verás en profundidad más adelante)
```

---

## CHECKLIST DE DOMINIO

```
□ Puedo crear un objeto con múltiples propiedades de distintos tipos
□ Sé la diferencia entre notación de punto y notación de corchetes
□ Entiendo cuándo usar corchetes (clave dinámica) vs punto
□ Puedo agregar, modificar y eliminar propiedades
□ Puedo crear métodos dentro de un objeto
□ Entiendo qué retorna Object.keys, Object.values y Object.entries
□ Puedo usar map, filter y reduce sobre arrays de objetos
□ Puedo acceder a propiedades de objetos anidados
□ Sé cuándo usar un array y cuándo usar un objeto
□ Puedo explicar la diferencia entre objeto y array sin mirar apuntes
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. Un objeto es una caja con compartimentos etiquetados**
No necesitas 10 variables separadas para describir un producto. Un objeto agrupa todo lo que describe a "una cosa" bajo un mismo nombre.

**2. El acceso con punto `.` y con corchetes `[]` hacen lo mismo, con una diferencia crítica**
Usa punto cuando la clave la escribes tú directamente. Usa corchetes cuando la clave viene de una variable. `obj.nombre` siempre busca la propiedad "nombre". `obj[variable]` busca la propiedad cuyo nombre está guardado en `variable`.

**3. Los arrays de objetos son la estructura de datos más común en el desarrollo real**
Cada lista de productos, usuarios, posts, o transacciones que verás en una API real es un array de objetos. Todo lo que aprendiste en la Semana 3 (`map`, `filter`, `reduce`) se aplica directamente aquí.

**4. `Object.keys`, `Object.values` y `Object.entries` convierten un objeto en un array**
Eso es exactamente su propósito: "aplanar" un objeto para poder aplicarle los métodos de array que ya conoces.

**5. Propiedad inexistente retorna `undefined`, no un error**
Esto es importante porque puede crear bugs silenciosos. `obj.propiedad` que no existe no rompe el código — simplemente retorna `undefined`. Usa `"clave" in obj` para verificar si existe antes de usarla.

---

*Cheat Sheet Semana 04 — Objetos en JavaScript*
*Leer antes de los ejercicios — consultar durante la semana*
