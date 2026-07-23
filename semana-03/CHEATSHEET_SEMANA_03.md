# CHEAT SHEET — SEMANA 03
## Arrays · Iteración · Transformación · Búsqueda · Acumulación

---

## CONCEPTOS CORE

---

### `for...of`
**Qué es:** Bucle que entrega el valor de cada elemento directamente.
**Para qué sirve:** Recorrer sin necesitar índice ni resultado nuevo.
**Cuándo usarlo:** Solo necesitas el valor. Quieres usar `break` o `continue`.
**Cuándo NO usarlo:** Necesitas índice, transformar, filtrar o acumular.
**Sintaxis:**
```javascript
for (let elemento of array) { }
```
**Error típico:** Intentar modificar el array desde dentro — `elemento` es una copia.
**Idea mental:** El portero que atiende a cada persona sin anotar su número de fila.

---

### `forEach()`
**Qué es:** Método que ejecuta una función por cada elemento.
**Para qué sirve:** Ejecutar efectos (mostrar, enviar, guardar) con cada elemento.
**Cuándo usarlo:** No necesitas resultado nuevo. Quieres el índice sin usar `for`.
**Cuándo NO usarlo:** Necesitas transformar → `map`. Necesitas filtrar → `filter`. Necesitas acumular → `reduce`. Necesitas `break` → `for`.
**Sintaxis:**
```javascript
array.forEach(function(elemento, indice, array) { })
```
**Error típico:** Esperar que retorne algo útil — `forEach` siempre retorna `undefined`.
**Idea mental:** El asistente que ejecuta tareas sin entregar nada al final.

---

### `map()`
**Qué es:** Método que transforma cada elemento y retorna un array nuevo del mismo tamaño.
**Para qué sirve:** Crear una versión transformada del array sin modificar el original.
**Cuándo usarlo:** Necesitas un array nuevo con cada elemento transformado.
**Cuándo NO usarlo:** No necesitas el resultado → `forEach`. Necesitas filtrar → `filter`. Necesitas un solo valor → `reduce`.
**Sintaxis:**
```javascript
let nuevo = array.map(function(elemento) { return transformación })
```
**Error típico:** Olvidar el `return` → array de `undefined`.
**Idea mental:** La fábrica — entra materia prima, sale producto nuevo. El original no se toca.

---

### `filter()`
**Qué es:** Método que retorna un array nuevo solo con los elementos que cumplen una condición.
**Para qué sirve:** Obtener un subconjunto del array original.
**Cuándo usarlo:** Necesitas seleccionar elementos según una condición.
**Cuándo NO usarlo:** Solo necesitas el primero → `find`. Solo necesitas saber si existe → `includes`. Necesitas transformar → `map`.
**Sintaxis:**
```javascript
let filtrado = array.filter(function(elemento) { return condición })
```
**Error típico:** Usar `filter` para transformar — filter no transforma, solo selecciona.
**Idea mental:** El colador — deja pasar solo lo que cumple la condición.

---

### `find()`
**Qué es:** Método que retorna el primer elemento que cumple una condición.
**Para qué sirve:** Encontrar un elemento específico sin recorrer todo el array.
**Cuándo usarlo:** Solo necesitas el primer elemento que cumple algo.
**Cuándo NO usarlo:** Necesitas todos los que cumplen → `filter`. Solo necesitas saber si existe → `includes`. Necesitas la posición → `findIndex`.
**Sintaxis:**
```javascript
let elemento = array.find(function(elemento) { return condición })
```
**Error típico:** Esperar un array — `find` retorna un elemento o `undefined`.
**Idea mental:** El primero en la fila que cumple el requisito.

---

### `findIndex()`
**Qué es:** Método que retorna el índice del primer elemento que cumple una condición.
**Para qué sirve:** Conocer la posición de un elemento para modificarlo o eliminarlo.
**Cuándo usarlo:** Necesitas la posición, no el elemento.
**Cuándo NO usarlo:** Solo necesitas el elemento → `find`. Solo necesitas saber si existe → `includes`.
**Sintaxis:**
```javascript
let indice = array.findIndex(function(elemento) { return condición })
```
**Error típico:** Olvidar verificar si retornó `-1` antes de usar el resultado.
**Idea mental:** El número de fila del primero que cumple el requisito.

---

### `includes()`
**Qué es:** Método que verifica si un valor existe en el array.
**Para qué sirve:** Responder sí o no sobre la existencia de un valor.
**Cuándo usarlo:** Solo necesitas saber si algo existe.
**Cuándo NO usarlo:** Necesitas el elemento → `find`. Necesitas la posición → `findIndex`. Buscas con condición compleja → `find` o `filter`.
**Sintaxis:**
```javascript
array.includes(valor) // true o false
```
**Error típico:** Pasarle una función — `includes` no acepta callbacks, solo valores directos.
**Idea mental:** La pregunta más simple: ¿está en la lista? Sí o no.

---

### `reduce()`
**Qué es:** Método que acumula todos los elementos en un único valor final.
**Para qué sirve:** Sumar, promediar, encontrar máximo/mínimo, contar, agrupar.
**Cuándo usarlo:** Necesitas un único valor a partir de una lista.
**Cuándo NO usarlo:** Necesitas un array nuevo → `map` o `filter`. Solo necesitas recorrer → `forEach`.
**Sintaxis:**
```javascript
let resultado = array.reduce(function(acumulador, elemento) {
    return nuevoAcumulador
}, valorInicial)
```
**Error típico 1:** Olvidar el `return` → acumulador siempre `undefined`.
**Error típico 2:** Omitir el valor inicial con array vacío → `TypeError`.
**Idea mental:** La calculadora que va sumando vuelta a vuelta hasta dar un resultado final.

---

## RELACIONES IMPORTANTES

### Métodos que NO modifican el array original
```
forEach  ✅ no modifica
map      ✅ no modifica — crea array nuevo
filter   ✅ no modifica — crea array nuevo
find     ✅ no modifica — retorna elemento
findIndex✅ no modifica — retorna índice
includes ✅ no modifica — retorna booleano
reduce   ✅ no modifica — retorna valor único
```
Los únicos que SÍ modifican: `push`, `pop`, `shift`, `unshift`

---

### Comparaciones críticas

| | `forEach` | `map` |
|---|---|---|
| Retorna | `undefined` | Array nuevo |
| Modifica original | No | No |
| Usa `return` | Ignorado | Obligatorio |
| Cuándo | Efectos | Transformar |

| | `find` | `filter` |
|---|---|---|
| Retorna | Primer elemento | Todos los que cumplen |
| Si no encuentra | `undefined` | `[]` array vacío |
| Cuándo | Buscar uno | Buscar varios |

| | `find` | `findIndex` | `includes` |
|---|---|---|---|
| Retorna | El elemento | La posición | true/false |
| Si no encuentra | `undefined` | `-1` | `false` |
| Cuándo | Necesito el elemento | Necesito la posición | Solo verificar si existe |

---

### El valor inicial en `reduce`

```javascript
// Para SUMAR → valor inicial: 0
array.reduce(function(acc, el) { return acc + el }, 0)

// Para COMPARAR (máximo/mínimo) → valor inicial: array[0]
array.reduce(function(acc, el) { return el > acc ? el : acc }, array[0])

// Para CONTAR → valor inicial: 0
array.reduce(function(acc, el) { return condición ? acc + 1 : acc }, 0)
```

---

## ERRORES FRECUENTES DE LA SEMANA

```javascript
// ❌ Olvidar return en map
array.map(function(n) { n * 2 })         // [undefined, undefined...]
array.map(function(n) { return n * 2 })  // ✅

// ❌ includes con función
array.includes(function(n) { return n > 5 }) // siempre false
array.includes(5)                             // ✅

// ❌ reduce sin valor inicial con array vacío
[].reduce(function(acc, el) { return acc + el })        // TypeError
[].reduce(function(acc, el) { return acc + el }, 0)     // ✅ retorna 0

// ❌ Valor inicial incorrecto en reduce para mínimo
array.reduce(function(acc, el) { return el < acc ? el : acc }, 0)
// 0 siempre ganaría si los valores son positivos
array.reduce(function(acc, el) { return el < acc ? el : acc }, array[0]) // ✅

// ❌ Esperar array de find
array.find(...)    // un elemento o undefined — no un array
array.filter(...)  // ✅ si necesitas array

// ❌ No verificar -1 de findIndex
let pos = array.findIndex(...)
array[pos] // ❌ si pos es -1, accedes al último elemento del array
if (pos !== -1) { array[pos] } // ✅
```

---

## CHECKLIST DE DOMINIO

```
□ Sé cuándo usar for...of vs forEach vs map
□ Entiendo por qué map necesita return obligatoriamente
□ Puedo explicar la diferencia entre find y filter sin mirar apuntes
□ Sé qué retorna cada método cuando no encuentra nada
□ Entiendo por qué el valor inicial de reduce no siempre es 0
□ Puedo implementar reduce para sumar, comparar y contar
□ Sé por qué map, filter y reduce NO modifican el array original
□ Podría elegir el método correcto dado un problema real
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. El método correcto lo elige el resultado que necesitas**
Si necesitas recorrer → `forEach`. Transformar → `map`. Seleccionar → `filter`. Uno solo → `find`. Un valor único → `reduce`. Elegir mal no rompe el código, pero comunica mal la intención.

**2. `map`, `filter` y `reduce` nunca modifican el array original**
Siempre crean algo nuevo. Si el original cambió, no fue ninguno de estos tres.

**3. El `return` dentro de `map` y `reduce` es obligatorio**
Sin `return`, `map` produce `[undefined, undefined...]`. Sin `return`, `reduce` pierde el acumulador en cada vuelta.

**4. El valor inicial de `reduce` depende de lo que acumulas**
Para sumar: `0`. Para comparar: `array[0]`. Para contar: `0`. No siempre es `0`.

**5. `includes` no acepta condiciones — solo valores exactos y es case sensitive**
`array.includes("Oscar")` y `array.includes("oscar")` son búsquedas distintas. Para condiciones complejas, usa `find` o `filter`.

---

*Cheat Sheet Semana 03 — Arrays y métodos esenciales*
*Generada al completar la semana — para repaso rápido en cualquier momento futuro*
