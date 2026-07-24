# CHEAT SHEET — SEMANA 09
## TypeScript · Tipos · Interfaces · Generics · Utility Types

> Lee esto ANTES de empezar los ejercicios.
> TypeScript es JavaScript con un sistema de tipos encima.
> Todo JavaScript válido es TypeScript válido — solo agregas información de tipos.

---

## POR QUÉ TYPESCRIPT EXISTE

JavaScript es dinámico — una variable puede ser string en un momento y number en el siguiente. Esto es flexible pero peligroso en proyectos grandes:

```javascript
// JavaScript — este bug solo aparece en producción
function calcularTotal(precio, cantidad) {
    return precio * cantidad
}

calcularTotal("45000", 3)  // "45000" → "450004500045000" en vez de 135000
// No hay error — JavaScript concatenó el string
```

TypeScript detecta este bug antes de ejecutar el código:

```typescript
function calcularTotal(precio: number, cantidad: number): number {
    return precio * cantidad
}

calcularTotal("45000", 3)  // ❌ Error en el editor — antes de ejecutar
```

El compilador de TypeScript convierte el código a JavaScript — el navegador nunca ve TypeScript.

---

## TIPOS BÁSICOS

```typescript
// Primitivos
let nombre: string = "Oscar"
let edad: number = 28
let activo: boolean = true
let nulo: null = null
let indefinido: undefined = undefined

// TypeScript infiere el tipo — no siempre es necesario anotarlo
let ciudad = "Penco"  // TypeScript deduce: string
let precio = 45000    // TypeScript deduce: number
```

**Tipos especiales:**

`any` — desactiva el chequeo de tipos. Evitar — si lo usas, pierdes el beneficio de TypeScript.

`unknown` — tipo desconocido pero seguro. A diferencia de `any`, debes verificar el tipo antes de usar el valor.

`never` — un valor que nunca existe. Útil para funciones que siempre lanzan error o bucles infinitos.

`void` — ausencia de valor de retorno. Para funciones que no retornan nada.

```typescript
function lanzarError(mensaje: string): never {
    throw new Error(mensaje)
}

function mostrar(texto: string): void {
    console.log(texto)
    // no retorna nada
}
```

---

## TYPE INFERENCE — CUÁNDO ANOTAR Y CUÁNDO NO

TypeScript deduce el tipo automáticamente en muchos casos. Solo anotar cuando no puede deducirlo:

```typescript
// TypeScript deduce — no anotar
let nombre = "Oscar"        // string
let precio = 45000          // number
let activo = true           // boolean
let precios = [1, 2, 3]    // number[]

// TypeScript NO puede deducir — sí anotar
let valor: string           // declaración sin valor inicial
function sumar(a: number, b: number): number { return a + b }

// Anotar cuando la deducción da un tipo más amplio del que quieres
let estado = "activo"                    // string (muy amplio)
let estado: "activo" | "inactivo" = "activo"  // union literal (más preciso)
```

---

## ARRAYS Y TUPLAS

```typescript
// Arrays tipados
let nombres: string[] = ["Ana", "Pedro", "María"]
let precios: number[] = [45000, 28000, 12000]
let flags: boolean[] = [true, false, true]

// Alternativa con genérico (equivalente)
let nombres: Array<string> = ["Ana", "Pedro"]

// Array de objetos
let usuarios: { nombre: string; edad: number }[] = [
    { nombre: "Oscar", edad: 28 },
    { nombre: "Ana", edad: 25 }
]

// Tupla — array con longitud y tipos fijos en cada posición
let coordenada: [number, number] = [33.4489, 70.6693]
let entrada: [string, number] = ["precio", 45000]

// Las tuplas son estrictas en el orden
let mal: [string, number] = [45000, "precio"]  // ❌ Error
```

---

## TYPE ALIAS

Crea un nombre reutilizable para cualquier tipo:

```typescript
// Para objetos
type Expedicion = {
    id: string
    nombre: string
    precio: number
    activa: boolean
}

// Para union types
type Estado = "activo" | "inactivo" | "pendiente"
type ID = string | number

// Para funciones
type Calculadora = (a: number, b: number) => number

// Usando el tipo
const exp: Expedicion = {
    id: "EXP001",
    nombre: "Cruce Los Andes",
    precio: 280000,
    activa: true
}

const estado: Estado = "activo"
const sumar: Calculadora = (a, b) => a + b
```

---

## INTERFACE

Define la forma de un objeto. Similar a `type` para objetos:

```typescript
interface Usuario {
    id: string
    nombre: string
    email: string
    edad?: number  // opcional con ?
}

// Extender con extends
interface Administrador extends Usuario {
    permisos: string[]
    nivel: number
}

// Usando la interface
const admin: Administrador = {
    id: "usr_001",
    nombre: "Oscar",
    email: "oscar@nexus.cl",
    permisos: ["leer", "escribir"],
    nivel: 3
}
```

---

## TYPE vs INTERFACE — LA REGLA PRÁCTICA

Para objetos simples, ambos son equivalentes. La diferencia importa en casos específicos:

`type` es más flexible — puede representar cualquier cosa: union types, primitivos, tuplas, funciones, y objetos. Es la elección por defecto en proyectos modernos.

`interface` soporta declaration merging (dos declaraciones del mismo nombre se fusionan) y es preferida cuando defines la forma de objetos que otros van a implementar o extender.

```typescript
// type gana aquí — interface no puede hacer esto
type Estado = "activo" | "inactivo" | "pendiente"
type IDFlexible = string | number
type Par = [string, number]

// Para objetos simples — ambos funcionan, usar type por consistencia
type Producto = { nombre: string; precio: number }
interface Producto { nombre: string; precio: number }  // equivalente
```

---

## UNION TYPES E INTERSECTION TYPES

```typescript
// Union — puede ser uno U otro
type StringONumber = string | number
type Estado = "activo" | "inactivo" | "pendiente"

function formatear(valor: string | number): string {
    return valor.toString()
}

formatear("hola")  // ✅
formatear(42)      // ✅
formatear(true)    // ❌ Error

// Intersection — debe ser uno Y otro
type ConTimestamp = { creadoEn: Date; actualizadoEn: Date }
type Expedicion = { nombre: string; precio: number }
type ExpedicionCompleta = Expedicion & ConTimestamp

// Debe tener propiedades de ambos tipos
const exp: ExpedicionCompleta = {
    nombre: "Cruce Los Andes",
    precio: 280000,
    creadoEn: new Date(),
    actualizadoEn: new Date()
}
```

---

## FUNCIONES TIPADAS

```typescript
// Parámetros y retorno
function sumar(a: number, b: number): number {
    return a + b
}

// Parámetro opcional (siempre al final)
function saludar(nombre: string, saludo?: string): string {
    return `${saludo ?? "Hola"}, ${nombre}`
}

// Parámetro con valor por defecto
function calcularPrecio(precio: number, iva: number = 0.19): number {
    return precio * (1 + iva)
}

// Arrow function tipada
const multiplicar = (a: number, b: number): number => a * b

// Función que retorna void
const mostrar = (texto: string): void => {
    console.log(texto)
}
```

---

## GENERICS

Los generics permiten crear funciones y tipos que funcionan con cualquier tipo mientras mantienen la seguridad de tipos:

```typescript
// Sin generics — tienes que elegir un tipo fijo o usar any
function primerElemento(arr: any[]): any {
    return arr[0]
}

// Con generics — funciona con cualquier tipo y lo recuerda
function primerElemento<T>(arr: T[]): T {
    return arr[0]
}

primerElemento([1, 2, 3])        // retorna number
primerElemento(["a", "b", "c"]) // retorna string
primerElemento([true, false])    // retorna boolean

// Generic con restricción — T debe tener la propiedad id
function buscarPorId<T extends { id: string }>(items: T[], id: string): T | undefined {
    return items.find(item => item.id === id)
}
```

---

## UTILITY TYPES — LOS MÁS USADOS

TypeScript incluye tipos de utilidad para transformar tipos existentes:

```typescript
type Expedicion = {
    id: string
    nombre: string
    precio: number
    activa: boolean
    descripcion: string
}

// Partial — todas las propiedades se vuelven opcionales
type ExpedicionParcial = Partial<Expedicion>
// Útil para updates donde no siempre envías todos los campos

// Required — todas las propiedades se vuelven obligatorias
type ExpedicionCompleta = Required<Expedicion>

// Readonly — ninguna propiedad puede modificarse
type ExpedicionFija = Readonly<Expedicion>
const exp: ExpedicionFija = { id: "1", nombre: "...", precio: 0, activa: true, descripcion: "" }
exp.precio = 100  // ❌ Error — readonly

// Pick — seleccionar solo algunas propiedades
type ResumenExpedicion = Pick<Expedicion, "id" | "nombre" | "precio">
// { id: string; nombre: string; precio: number }

// Omit — excluir algunas propiedades
type ExpedicionSinId = Omit<Expedicion, "id">
// { nombre: string; precio: number; activa: boolean; descripcion: string }

// Record — crear un objeto con claves y valores tipados
type PreciosPorTipo = Record<string, number>
const precios: PreciosPorTipo = {
    trekking: 280000,
    kayak: 195000,
    escalada: 320000
}
```

---

## NARROWING — REDUCIR EL TIPO

Cuando tienes un union type, TypeScript necesita saber cuál tipo es en un contexto específico:

```typescript
function procesar(valor: string | number) {
    // TypeScript no sabe si es string o number aquí

    if (typeof valor === "string") {
        // Aquí TypeScript sabe que es string
        return valor.toUpperCase()
    }

    // Aquí TypeScript sabe que es number
    return valor * 2
}

// Con objetos — usar "in" para verificar propiedad
type Perro = { nombre: string; ladra: () => void }
type Gato = { nombre: string; maulla: () => void }

function hablar(animal: Perro | Gato) {
    if ("ladra" in animal) {
        animal.ladra()  // TypeScript sabe que es Perro
    } else {
        animal.maulla() // TypeScript sabe que es Gato
    }
}
```

---

## ERRORES FRECUENTES

```typescript
// ❌ Usar any — derrota el propósito de TypeScript
function procesar(datos: any) { ... }  // evitar

// ✅ Usar unknown si realmente no sabes el tipo
function procesar(datos: unknown) {
    if (typeof datos === "string") {
        // ahora puedes usar datos como string
    }
}

// ❌ No anotar el retorno cuando es ambiguo
function obtener() {
    if (condicion) return "texto"
    return 42
}  // TypeScript infiere string | number — puede no ser lo que quieres

// ✅ Anotar el retorno explícitamente
function obtener(): string | number { ... }

// ❌ Ignorar el error de TypeScript con as any
const valor = algo as any  // evitar

// ❌ Propiedad opcional sin verificar
type User = { nombre?: string }
const user: User = {}
console.log(user.nombre.toUpperCase())  // ❌ Error en runtime — nombre puede ser undefined

// ✅ Verificar antes de usar
if (user.nombre) {
    console.log(user.nombre.toUpperCase())  // ✅
}
```

---

## CHECKLIST DE DOMINIO

```
□ Entiendo por qué TypeScript existe y qué problema resuelve
□ Puedo anotar variables, parámetros y retornos de funciones
□ Entiendo cuándo TypeScript infiere el tipo y cuándo debo anotarlo
□ Puedo crear type aliases para objetos, unions y funciones
□ Entiendo la diferencia práctica entre type e interface
□ Puedo usar union types (|) e intersection types (&)
□ Entiendo qué son los generics y para qué sirven
□ Conozco los utility types principales: Partial, Required, Readonly, Pick, Omit
□ Puedo hacer narrowing con typeof e in
□ Sé por qué evitar any y qué usar en su lugar
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. TypeScript desaparece en producción**
El compilador convierte TypeScript a JavaScript. El navegador solo ve JavaScript. TypeScript es una herramienta de desarrollo, no de runtime.

**2. any derrota el propósito — usar unknown cuando no sabes el tipo**
`any` le dice a TypeScript "no me chequees este tipo". `unknown` dice "no sé el tipo, pero me obligas a verificarlo antes de usarlo". El segundo es seguro, el primero no.

**3. La inferencia es tu amiga — no anotar lo obvio**
`let nombre: string = "Oscar"` es redundante — TypeScript ya sabe que es string. Solo anotar cuando TypeScript no puede deducirlo o cuando quieres ser más restrictivo.

**4. Partial es esencial para updates de API**
Cuando actualizas un recurso (PUT/PATCH), no siempre envías todos los campos. `Partial<Expedicion>` crea un tipo donde todo es opcional — exactamente lo que necesitas para un endpoint de actualización.

**5. Los tipos solo existen en tiempo de compilación**
A diferencia de los valores, los tipos se borran al compilar. No puedes usarlos en runtime con `console.log(typeof MiTipo)` — eso da error. Para verificar tipos en runtime, usa `typeof`, `instanceof` o guarda los valores en variables normales.

---

*Cheat Sheet Semana 09 — TypeScript*
*Leer antes de los ejercicios — consultar durante la semana*
