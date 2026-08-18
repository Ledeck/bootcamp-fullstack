# 📘 BOOTCAMP SEMANA 09
## TypeScript · Tipos · Interfaces · Generics · Utility Types

---

```
ACTA DE AUDITORÍA
Material original: formato v3, sin auditar
Auditado y corregido: 2026-08-06 — ver AUDITORIA_SEMANA_09.md
Correcciones aplicadas: bloque perecedero reescrito · Cheat Sheet creado ·
                        Día 7 añadido (ejecutar vs comprobar)
```

> **Flujo de la semana:** el Cheat Sheet se entrega por partes, día a día,
> como guion de la clase de activación. No lo leas completo de antemano.
> **Recuerda:** cuando termines cada día, avísame para validar.

---

## ⏱ BLOQUE PERECEDERO

```
Verificado: agosto 2026
REGENERAR antes de empezar la semana.
```

### No instales nada para ejecutar

**Node.js ejecuta archivos `.ts` directamente:**

```bash
node archivo.ts
```

Sin `tsc`, sin `ts-node`, sin configuración. Funciona desde Node 22.18, y es
el comportamiento por defecto en Node 24 LTS.

Verifica tu versión: `node --version`

### Para comprobar tipos, comando aparte

```bash
npx tsc --noEmit
```

⚠ **AVISO SOBRE MATERIAL ANTIGUO.** La versión anterior de este bootcamp
indicaba `npm install -g ts-node` y `tsc archivo.ts`. **Ambos están
retirados** para este caso de uso. Casi todos los tutoriales anteriores a
2025 los usan; ya no hacen falta.

⚠ **Y lo más importante de la semana:** `node archivo.ts` **NO comprueba los
tipos**. Ejecuta el archivo borrando las anotaciones. Un archivo lleno de
errores de tipo corre sin quejarse.

Eso tiene un día propio — el Día 7. Pero tenlo presente desde el primero.

Crea los archivos con extensión `.ts`. Cursor te muestra los errores mientras
escribes, pero el editor no es una garantía: si ignoras el subrayado rojo y
ejecutas, el archivo corre igual.

---

## 🗓 DÍA 1 — ¿POR QUÉ TYPESCRIPT? TIPOS BÁSICOS E INFERENCIA

### 🎯 Objetivo
Entender el problema que resuelve TypeScript y dominar los tipos básicos y la inferencia.

---

### 📖 El problema concreto que resuelve TypeScript

Imagina que llevas 6 meses construyendo el sistema de Nexus en JavaScript. El sistema tiene 50 archivos, 200 funciones, y trabajan 3 developers. Alguien cambia la forma de un objeto en un archivo — elimina la propiedad `precioBase` y la renombra `precio`. ¿Cuántos archivos usan esa propiedad? ¿Cuáles van a fallar?

En JavaScript, lo descubres cuando el sistema falla en producción. En TypeScript, lo descubres en el momento del cambio — el editor subraya en rojo cada lugar que usa `precioBase` antes de que ejecutes una sola línea.

Eso es TypeScript en una frase: **detectar errores antes de ejecutar el código**.

---

### 📖 TypeScript en el proceso de desarrollo

```
Escribes .ts → TypeScript chequea tipos → Compilas a .js → Navegador ejecuta .js
                     ↑
              Aquí detecta los errores
              (no en producción)
```

El compilador `tsc` convierte TypeScript a JavaScript estándar. Todo lo que aprendiste en JavaScript sigue funcionando — TypeScript solo agrega el sistema de tipos encima.

---

### 📖 Type inference — TypeScript es inteligente

TypeScript deduce el tipo automáticamente cuando puede:

```typescript
// TypeScript deduce estos tipos sin anotación
let nombre = "Oscar"           // string
let precio = 45000             // number
let activo = true              // boolean
let precios = [1, 2, 3]       // number[]
let usuario = { nombre: "Oscar", edad: 28 }  // { nombre: string; edad: number }

// Si intentas asignar otro tipo, TypeScript lo detecta
nombre = 42  // ❌ Error: Type 'number' is not assignable to type 'string'
```

La regla práctica: **solo anotar cuando TypeScript no puede inferir el tipo correctamente.**

```typescript
// ❌ Redundante — TypeScript ya sabe que es string
let nombre: string = "Oscar"

// ✅ Necesario — TypeScript no sabe qué tipo llegará
function procesar(valor: string): string {
    return valor.toUpperCase()
}

// ✅ Necesario — declaración sin valor inicial
let resultado: number
// más adelante...
resultado = calcularAlgo()
```

---

### 📖 Los tipos básicos — diferencias clave

```typescript
// string, number, boolean — igual que en JavaScript pero tipados
let texto: string = "hola"
let numero: number = 42
let bandera: boolean = true

// null y undefined — deben anotarse explícitamente cuando son intencionales
let sinValor: null = null
let noDefinido: undefined = undefined

// any — desactiva el chequeo. Evitar.
let cualquierCosa: any = "texto"
cualquierCosa = 42        // sin error (por eso es peligroso)
cualquierCosa = {}        // sin error
cualquierCosa.metodoQueNoExiste()  // sin error — hasta que revienta en runtime

// unknown — tipo seguro para cuando no sabes el tipo
let datoExterno: unknown = obtenerDatosDeAPI()
datoExterno.toUpperCase()  // ❌ Error — no sabes si es string
if (typeof datoExterno === "string") {
    datoExterno.toUpperCase()  // ✅ TypeScript sabe que es string aquí
}
```

---

### 📖 Literal types — más preciso que string o number

```typescript
// En vez de string amplio, un conjunto específico de valores
type Direccion = "norte" | "sur" | "este" | "oeste"
type Dificultad = "baja" | "media" | "alta"
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

let direccion: Direccion = "norte"    // ✅
let otro: Direccion = "arriba"        // ❌ Error — "arriba" no es Direccion
```

---

### 🔗 Conexión con Next.js

En Next.js con TypeScript, los tipos se usan en cada componente, API route y función de servidor. Pero la base es exactamente lo que aprendes hoy:

```typescript
// app/page.tsx — el "tipo" de los parámetros y retornos
async function obtenerExpediciones(): Promise<Expedicion[]> {
    const datos = await fetch("/api/expediciones")
    return datos.json()
}
```

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `dia01_basicos.ts`

Convierte este JavaScript a TypeScript, agregando las anotaciones de tipo necesarias (no las redundantes):

```javascript
// Convertir a TypeScript con anotaciones apropiadas
let nombre = "TerraMater Expediciones"
let anioFundacion = 2015
let activa = true
let categorias = ["Trekking", "Escalada", "Kayak"]

function describir(empresa, anios) {
    return `${empresa} lleva ${anios} años operando`
}

function calcularEdad(anioFundacion) {
    return 2026 - anioFundacion
}

let descripcion = describir(nombre, calcularEdad(anioFundacion))
```

---

**Ejercicio 2** — `dia01_errores.ts`

Este código tiene errores de tipos. Identifícalos sin ejecutarlo, corrígelos y explica en comentarios por qué era un error:

```typescript
let precio: number = "45000"
let nombre: string = 42
let activo: boolean = 1

function sumar(a: number, b: number): string {
    return a + b
}

let resultado: number = sumar(10, 20)

let colores: string[] = ["rojo", "verde", 3, "azul"]
```

---

**Ejercicio 3** — `dia01_inferencia.ts`

Para cada variable, escribe qué tipo infiere TypeScript y por qué. Luego escribe una versión con la anotación explícita solo donde es necesario:

```typescript
let x = 42
let y = "hola"
let z = [1, 2, 3]
let w = { nombre: "Oscar", edad: 28 }
let v = true
let u  // ← aquí sí necesitas anotar — ¿por qué?
let t = null  // ← ¿qué infiere TypeScript aquí?
```

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — TYPE ALIASES E INTERFACES

### 🎯 Objetivo
Crear tipos personalizados con type e interface para los objetos del sistema Nexus.

---

### 📖 Por qué necesitas tipos personalizados

Con tipos primitivos puedes tipar variables simples. Pero los objetos complejos necesitan tipos propios:

```typescript
// Sin tipo personalizado — repetitivo y propenso a errores
function mostrarExpedicion(expedicion: {
    id: string
    nombre: string
    precio: number
    duracionDias: number
    activa: boolean
}) { ... }

// Con type alias — reutilizable y mantenible
type Expedicion = {
    id: string
    nombre: string
    precio: number
    duracionDias: number
    activa: boolean
}

function mostrarExpedicion(expedicion: Expedicion) { ... }
function calcularPrecioGrupo(exp: Expedicion, personas: number): number { ... }
function filtrarActivas(expediciones: Expedicion[]): Expedicion[] { ... }
```

---

### 📖 Propiedades opcionales y readonly

```typescript
type Reserva = {
    id: string
    expedicionId: string
    cliente: string
    personas: number
    estado: "pendiente" | "confirmada" | "cancelada"
    comentarios?: string        // opcional — puede no existir
    readonly creadoEn: Date    // readonly — no se puede modificar después
}

const reserva: Reserva = {
    id: "RES001",
    expedicionId: "EXP001",
    cliente: "Oscar Castillo",
    personas: 2,
    estado: "pendiente",
    creadoEn: new Date()
    // comentarios no es obligatorio
}

reserva.estado = "confirmada"    // ✅ se puede cambiar
reserva.creadoEn = new Date()   // ❌ Error — readonly
```

---

### 📖 Extender tipos

```typescript
// Base compartida
type EntidadBase = {
    id: string
    creadoEn: Date
    actualizadoEn: Date
}

// Extender con intersection
type Expedicion = EntidadBase & {
    nombre: string
    precio: number
    activa: boolean
}

// Equivalente con interface y extends
interface IExpedicion extends IEntidadBase {
    nombre: string
    precio: number
    activa: boolean
}
```

---

### 📖 Type aliases para funciones y unions

```typescript
// Union type — uno de varios valores
type EstadoReserva = "pendiente" | "confirmada" | "cancelada"
type TipoExpedicion = "trekking" | "kayak" | "escalada" | "rafting"

// Type alias para función
type FiltroExpedicion = (expedicion: Expedicion) => boolean
type FormateadorPrecio = (precio: number) => string

// Usar como tipo de parámetro
function aplicarFiltro(
    expediciones: Expedicion[],
    filtro: FiltroExpedicion
): Expedicion[] {
    return expediciones.filter(filtro)
}
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — `dia02_tipos.ts`

Crea los type aliases para el sistema Nexus:

1. `type Guia` con: id, nombre, certificacion (string), aniosExperiencia, especialidades (array de strings), disponible (boolean)
2. `type Expedicion` con: id, nombre, tipo (union de al menos 4 tipos), duracionDias, precioBase, cupoMaximo, dificultad (union: "baja" | "media" | "alta"), activa, guiaId (opcional)
3. `type Reserva` con: id, expedicionId, cliente, personas, estado (union de 3 estados), metodoPago (union de 3 métodos), creadoEn (Date), comentarios (opcional, readonly)
4. `type EntidadBase` con id, creadoEn y actualizadoEn, y refactoriza Expedicion y Reserva para extenderla

---

**Ejercicio 2** — `dia02_funciones.ts`

Tipando funciones del sistema Nexus — convierte estas funciones JavaScript a TypeScript usando los tipos que creaste:

```javascript
function calcularIngresoExpedicion(expedicion, reservasConfirmadas) {
    return reservasConfirmadas
        .filter(r => r.expedicionId === expedicion.id)
        .reduce((total, r) => total + expedicion.precioBase * r.personas, 0)
}

function buscarExpedicion(expediciones, id) {
    return expediciones.find(e => e.id === id)
}

function filtrarPorDificultad(expediciones, dificultad) {
    return expediciones.filter(e => e.dificultad === dificultad)
}

function calcularOcupacion(expedicion, reservasConfirmadas) {
    let personasReservadas = reservasConfirmadas
        .filter(r => r.expedicionId === expedicion.id)
        .reduce((total, r) => total + r.personas, 0)
    return (personasReservadas / expedicion.cupoMaximo) * 100
}
```

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — UNION TYPES, NARROWING Y GENERICS

### 🎯 Objetivo
Usar union types para modelar estados reales, narrowing para manejarlos con seguridad, y generics para funciones reutilizables.

---

### 📖 Union types para modelar estados reales

Los union types son perfectos para modelar estados que cambian:

```typescript
// El estado de una reserva es un union type
type EstadoReserva = "pendiente" | "confirmada" | "cancelada"

// El resultado de una operación asíncrona
type ResultadoAPI<T> =
    | { estado: "cargando" }
    | { estado: "exito"; datos: T }
    | { estado: "error"; mensaje: string }

// Usando el tipo de resultado
type ResultadoExpediciones = ResultadoAPI<Expedicion[]>

const resultado: ResultadoExpediciones = {
    estado: "exito",
    datos: [{ id: "EXP001", nombre: "Cruce Los Andes", ... }]
}
```

---

### 📖 Narrowing — trabajar con union types con seguridad

Cuando tienes un union type, TypeScript no sabe cuál de los tipos es en un momento dado. El narrowing le ayuda a determinarlo:

```typescript
// Con typeof — para primitivos
function formatearValor(valor: string | number): string {
    if (typeof valor === "string") {
        return valor.toUpperCase()  // TypeScript sabe que es string aquí
    }
    return valor.toFixed(2)         // TypeScript sabe que es number aquí
}

// Con "in" — para objetos con diferentes propiedades
type Trekking = { tipo: "trekking"; altitudMaxima: number }
type Kayak = { tipo: "kayak"; longitudRuta: number }
type Expedicion = Trekking | Kayak

function describir(exp: Expedicion): string {
    if (exp.tipo === "trekking") {
        return `Trekking a ${exp.altitudMaxima}m de altitud`
    }
    return `Kayak de ${exp.longitudRuta}km`
}

// Con verificación de null/undefined
function mostrarNombre(nombre: string | undefined): string {
    if (nombre === undefined) {
        return "Sin nombre"
    }
    return nombre.toUpperCase()  // TypeScript sabe que no es undefined aquí
}

// Equivalente más conciso con nullish coalescing
function mostrarNombre(nombre: string | undefined): string {
    return (nombre ?? "Sin nombre").toUpperCase()
}
```

---

### 📖 Generics — funciones que funcionan con cualquier tipo

```typescript
// Sin generics — repites código para cada tipo
function primerElementoString(arr: string[]): string | undefined {
    return arr[0]
}
function primerElementoNumber(arr: number[]): number | undefined {
    return arr[0]
}

// Con generics — una sola función para todos los tipos
function primerElemento<T>(arr: T[]): T | undefined {
    return arr[0]
}

// TypeScript infiere T según el argumento
primerElemento([1, 2, 3])           // T = number, retorna number | undefined
primerElemento(["a", "b", "c"])     // T = string, retorna string | undefined
primerElemento([{ id: "1" }])       // T = { id: string }, retorna ese tipo | undefined

// Generic con múltiples parámetros
function mapear<T, U>(arr: T[], transformar: (item: T) => U): U[] {
    return arr.map(transformar)
}

mapear([1, 2, 3], n => n.toString())  // T=number, U=string → string[]
mapear(["a", "b"], s => s.length)     // T=string, U=number → number[]

// Generic con restricción
function obtenerPropiedad<T, K extends keyof T>(objeto: T, clave: K): T[K] {
    return objeto[clave]
}

const exp = { id: "EXP001", nombre: "Cruce Los Andes", precio: 280000 }
obtenerPropiedad(exp, "nombre")   // ✅ retorna string
obtenerPropiedad(exp, "precio")   // ✅ retorna number
obtenerPropiedad(exp, "color")    // ❌ Error — "color" no existe en el tipo
```

---

### 💼 Código real vs código de bootcamp

En proyectos Next.js reales, los generics aparecen en llamadas a APIs, hooks y utilidades:

```typescript
// Función genérica de fetch tipada — código profesional real
async function fetchAPI<T>(url: string): Promise<T> {
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`Error ${resp.status}`)
    return resp.json() as T
}

// Uso — TypeScript sabe exactamente qué tipo retorna
const expediciones = await fetchAPI<Expedicion[]>("/api/expediciones")
const usuario = await fetchAPI<Usuario>("/api/usuarios/1")
```

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — `dia03_union_narrowing.ts`

```typescript
type Notificacion =
    | { tipo: "exito"; mensaje: string }
    | { tipo: "error"; mensaje: string; codigo: number }
    | { tipo: "advertencia"; mensaje: string; descartable: boolean }
```

Escribe una función `mostrarNotificacion(n: Notificacion): string` que:
- Para "exito": retorna "✅ {mensaje}"
- Para "error": retorna "❌ Error {codigo}: {mensaje}"
- Para "advertencia": retorna "⚠️ {mensaje}" + " (descartable)" si es descartable

TypeScript debe verificar que cubres todos los casos.

---

**Ejercicio 2** — `dia03_generics.ts`

Escribe estas funciones genéricas:

1. `filtrar<T>(arr: T[], predicado: (item: T) => boolean): T[]` — igual que Array.filter pero tipado
2. `agruparPor<T>(arr: T[], obtenerClave: (item: T) => string): Record<string, T[]>` — agrupa elementos por una clave
3. `buscarODefault<T>(arr: T[], predicado: (item: T) => boolean, valorDefault: T): T` — como find pero con fallback

Prueba cada función con los tipos del sistema Nexus (Expedicion, Reserva, Guia).

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — UTILITY TYPES Y PATRONES REALES

### 🎯 Objetivo
Usar los utility types de TypeScript para transformar tipos existentes en situaciones reales de desarrollo.

---

### 📖 Por qué los utility types existen

Sin utility types, tendrías que crear tipos nuevos manualmente cada vez que necesitas una variante:

```typescript
// Sin utility types — mucho código duplicado
type Expedicion = {
    id: string
    nombre: string
    precio: number
    activa: boolean
}

// Para crear una expedición — no tienes id todavía
type ExpedicionNueva = {
    nombre: string   // sin id
    precio: number
    activa: boolean
}

// Para actualizar una expedición — todo opcional
type ExpedicionUpdate = {
    nombre?: string
    precio?: number
    activa?: boolean
}
```

Con utility types:

```typescript
type ExpedicionNueva = Omit<Expedicion, "id">      // elimina id
type ExpedicionUpdate = Partial<Omit<Expedicion, "id">>  // todo opcional, sin id
```

---

### 📖 Los utility types más importantes

```typescript
type Expedicion = {
    id: string
    nombre: string
    precio: number
    duracionDias: number
    activa: boolean
    descripcion: string
}

// Partial<T> — todas las propiedades opcionales
// Uso: payload de PATCH requests, opciones de configuración
type ActualizarExpedicion = Partial<Expedicion>

// Required<T> — todas las propiedades obligatorias (opuesto de Partial)
// Uso: cuando necesitas garantizar que todos los campos existen
type ExpedicionCompleta = Required<Expedicion>

// Readonly<T> — propiedades que no se pueden modificar
// Uso: datos que no deben mutar, configuración inmutable
type ExpedicionInmutable = Readonly<Expedicion>

// Pick<T, Keys> — seleccionar un subconjunto de propiedades
// Uso: cuando la UI solo necesita algunos campos (evitar over-fetching)
type ResumenExpedicion = Pick<Expedicion, "id" | "nombre" | "precio">
// Resultado: { id: string; nombre: string; precio: number }

// Omit<T, Keys> — excluir propiedades
// Uso: DTOs para crear recursos (sin id generado por BD)
type CrearExpedicion = Omit<Expedicion, "id">

// Record<Keys, Values> — objeto con claves y valores tipados
// Uso: mapas, índices, configuraciones
type PreciosPorTipo = Record<string, number>
type ConfiguracionPorRegion = Record<string, { moneda: string; iva: number }>

// ReturnType<T> — extraer el tipo de retorno de una función
function obtenerExpedicion() {
    return { id: "EXP001", nombre: "Cruce Los Andes" }
}
type TipoExpedicion = ReturnType<typeof obtenerExpedicion>
// { id: string; nombre: string }
```

---

### 📖 Combinar utility types

Los utility types se pueden combinar:

```typescript
// DTO para crear una reserva:
// - sin id (lo genera la BD)
// - sin creadoEn (lo genera la BD)
// - sin actualizadoEn
// - comentarios opcional
type CrearReserva = Omit<Reserva, "id" | "creadoEn" | "actualizadoEn">

// DTO para actualizar una reserva:
// - solo estado y comentarios se pueden actualizar
// - ambos opcionales
type ActualizarReserva = Partial<Pick<Reserva, "estado" | "comentarios">>
```

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — `dia04_utility.ts`

Usando los tipos de Expedicion, Reserva y Guia del Día 2, crea estos tipos derivados con utility types:

1. `CrearExpedicion` — para el endpoint POST, sin id ni timestamps
2. `ActualizarExpedicion` — para el endpoint PATCH, todo opcional excepto id
3. `ResumenExpedicion` — solo id, nombre, precio y dificultad para listados
4. `ExpedicionPublica` — todo excepto guiaId (no exponer IDs internos)
5. `CrearReserva` — para el endpoint POST
6. `IndiceExpediciones` — Record donde la clave es el id y el valor es Expedicion

---

**Ejercicio 2** — `dia04_patrones.ts`

Implementa esta función genérica de repositorio que usa utility types:

```typescript
// Implementa este "repositorio" genérico
function crearRepositorio<T extends { id: string }>(datos: T[]) {
    return {
        obtenerTodos(): T[] { ... },
        obtenerPorId(id: string): T | undefined { ... },
        crear(nuevo: Omit<T, "id">): T { ... },  // genera un id automático
        actualizar(id: string, cambios: Partial<T>): T | undefined { ... },
        eliminar(id: string): boolean { ... }
    }
}

// Úsalo con expediciones y reservas
const repoExpediciones = crearRepositorio<Expedicion>(expedicionesIniciales)
const repoReservas = crearRepositorio<Reserva>(reservasIniciales)
```

> 💡 Pista: Para generar un id simple, usa `Date.now().toString()`

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — REFACTORIZAR JAVASCRIPT A TYPESCRIPT

### 🎯 Objetivo
Aplicar todo lo aprendido refactorizando el proyecto de la Semana 4 (NexusHR) a TypeScript completo.

---

### 📖 El proceso de migración JavaScript → TypeScript

En el mundo real, migrar proyectos JavaScript a TypeScript es una tarea común. El proceso estándar:

1. Renombrar archivos `.js` a `.ts`
2. Corregir los errores que TypeScript detecta inmediatamente
3. Agregar tipos a las funciones más críticas
4. Reemplazar `any` por tipos específicos progresivamente
5. Agregar interfaces para los objetos del dominio

TypeScript está diseñado para migración gradual — puedes tener archivos `.js` y `.ts` en el mismo proyecto.

---

### 📖 Cómo TypeScript ayuda a detectar bugs existentes

Cuando migras JavaScript a TypeScript, a veces descubres bugs que existían sin que lo supieras:

```typescript
// JavaScript original — sin errores visibles
function calcularDescuento(precio, descuento) {
    return precio - precio * descuento
}

calcularDescuento(45000, "10")  // Bug silencioso — devuelve NaN

// TypeScript — detecta el bug antes de ejecutar
function calcularDescuento(precio: number, descuento: number): number {
    return precio - precio * descuento
}

calcularDescuento(45000, "10")  // ❌ Error — "10" no es number
```

---

### 🛠 EJERCICIO DÍA 5

**Ejercicio único** — `dia05_migracion.ts`

Migra el proyecto NexusHR de la Semana 4 completamente a TypeScript:

1. Copia el código JavaScript original
2. Renómbralo a `.ts`
3. Crea tipos para todos los objetos: `type Empleado`, con todas sus propiedades correctamente tipadas
4. Tipea todas las funciones — parámetros y retornos
5. Usa utility types donde corresponda:
   - `CrearEmpleado` para agregar nuevos empleados (sin id)
   - `ActualizarEmpleado` para modificaciones parciales
   - `ResumenEmpleado` para el reporte (solo los campos que se muestran)
6. Asegúrate de que no hay ningún `any` en el código final

Requisito adicional: agrega una función `generarReporteTipado(empleados: Empleado[]): ResumenEmpleado[]` que retorne solo los campos del reporte.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 NexusCore — Sistema de Tipos del Proyecto

> El equipo de Nexus ha decidido migrar toda la plataforma a TypeScript.
> Tu tarea es construir el **sistema de tipos central** (`nexus-types`) —
> la librería de tipos que todos los módulos del sistema usarán.
>
> Este no es un proyecto con lógica de negocio — es pura arquitectura de tipos.
> Es el tipo de trabajo que hacen los developers senior cuando definen los
> contratos de datos de un sistema antes de implementarlo.

---

### 📋 El sistema de tipos a construir

**Archivo 1: `tipos/entidades.ts`** — Los modelos principales

```typescript
// Define completamente estos tipos con todas sus propiedades
// Usa EntidadBase para id y timestamps
// Usa union types para estados y categorías
// Marca las propiedades opcionales correctamente

type EntidadBase = { ... }
type Usuario = { ... }
type Guia = { ... }
type Expedicion = { ... }
type Reserva = { ... }
type Pago = { ... }
```

**Archivo 2: `tipos/dtos.ts`** — Data Transfer Objects

```typescript
// Para cada entidad principal, crea:
// - DTO de creación (sin id ni timestamps)
// - DTO de actualización (todo opcional excepto id)
// - DTO de respuesta pública (sin campos sensibles o internos)

type CrearUsuario = ...
type ActualizarUsuario = ...
type UsuarioPublico = ...

// Idem para Expedicion y Reserva
```

**Archivo 3: `tipos/api.ts`** — Tipos para las respuestas de la API

```typescript
// Respuesta genérica de la API
type RespuestaAPI<T> = {
    exito: boolean
    datos?: T
    error?: string
    mensaje?: string
}

// Respuesta paginada
type RespuestaPaginada<T> = {
    items: T[]
    total: number
    pagina: number
    porPagina: number
    totalPaginas: number
}

// Filtros genéricos
type FiltroBase = {
    pagina?: number
    porPagina?: number
    ordenarPor?: string
    orden?: "asc" | "desc"
}

type FiltroExpedicion = FiltroBase & {
    tipo?: TipoExpedicion
    dificultad?: Dificultad
    precioMin?: number
    precioMax?: number
    activa?: boolean
}
```

**Archivo 4: `tipos/utilidades.ts`** — Tipos utilitarios propios

```typescript
// Crea estos tipos de utilidad propios del proyecto Nexus

// ID tipado — evitar confundir IDs de distintas entidades
type UsuarioID = string & { readonly _marca: "UsuarioID" }
type ExpedicionID = string & { readonly _marca: "ExpedicionID" }
// (Esto se llama "branded types" — opcional, bonus avanzado)

// Resultado de operación
type Resultado<T> =
    | { ok: true; valor: T }
    | { ok: false; error: string }

// Estado asíncrono — para la UI
type EstadoAsync<T> =
    | { fase: "inactivo" }
    | { fase: "cargando" }
    | { fase: "exito"; datos: T }
    | { fase: "error"; mensaje: string }

// Función validadora genérica
type Validador<T> = (valor: T) => Resultado<T>
```

**Archivo 5: `tipos/index.ts`** — Re-exportar todo

```typescript
export * from "./entidades"
export * from "./dtos"
export * from "./api"
export * from "./utilidades"
```

---

### 📋 Demostración de uso

Crea `demo.ts` que importe los tipos y demuestre que funcionan juntos:

```typescript
import type { Expedicion, CrearExpedicion, RespuestaAPI, EstadoAsync } from "./tipos"

// Simular una respuesta de API
const respuesta: RespuestaAPI<Expedicion[]> = {
    exito: true,
    datos: [...]
}

// Simular estado de la UI
let estadoUI: EstadoAsync<Expedicion[]> = { fase: "inactivo" }
estadoUI = { fase: "cargando" }
estadoUI = { fase: "exito", datos: respuesta.datos ?? [] }

// Crear una expedición — TypeScript verifica que tiene todos los campos necesarios
const nueva: CrearExpedicion = {
    nombre: "Patagonia Extrema",
    tipo: "trekking",
    ...
}
```

---

### ✅ Criterios de aprobación

```
□ Todos los tipos están correctamente definidos sin any
□ Los utility types se usan para derivar tipos (no se repiten manualmente)
□ Los union types representan correctamente los estados posibles
□ Los generics se usan para tipos reutilizables (RespuestaAPI, EstadoAsync)
□ El index.ts re-exporta todo correctamente
□ demo.ts compila sin errores con tsc
□ Subido a GitHub con commit descriptivo
```

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva.** 🎯

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-09/
├── dia01_basicos.ts
├── dia01_errores.ts
├── dia01_inferencia.ts
├── dia02_tipos.ts
├── dia02_funciones.ts
├── dia03_union_narrowing.ts
├── dia03_generics.ts
├── dia04_utility.ts
├── dia04_patrones.ts
├── dia05_migracion.ts
└── nexus-types/ ⭐
    ├── tipos/
    │   ├── entidades.ts
    │   ├── dtos.ts
    │   ├── api.ts
    │   ├── utilidades.ts
    │   └── index.ts
    └── demo.ts
```

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 10:** React — Componentes, props, estado, hooks básicos (useState, useEffect)


---

## 🗓 DÍA 7 — EJECUTAR NO ES COMPROBAR

> **Día añadido en la auditoría del 2026-08-06.**
> No estaba en el material original porque cuando se escribió, Node todavía
> no ejecutaba TypeScript directamente.

### 🎯 Objetivo
Entender que Node ejecuta tus tipos borrándolos, no verificándolos — y montar
el flujo de trabajo que sí los verifica.

---

### 📖 El problema real

Llevas seis días escribiendo TypeScript. Los tipos te han detectado errores
mientras escribías, el editor te subrayaba en rojo, todo bien.

Ahora prueba esto:

```typescript
// prueba.ts
function sumar(a: number, b: number): number {
  return a + b;
}

console.log(sumar("hola", "mundo"));
```

Cursor te subraya la llamada en rojo. Ignóralo y ejecuta:

```bash
node prueba.ts
```

---

### 📖 Qué pasó

Imprime **`holamundo`**.

Sin error. Sin advertencia. El programa corrió completo y produjo un
resultado sin sentido.

**Por qué:** Node usa un mecanismo llamado *type stripping*. Un módulo
llamado `amaro` borra las anotaciones de tipo y las sustituye por espacios en
blanco, dejando JavaScript válido:

```typescript
// Lo que escribiste
function sumar(a: number, b: number): number {
  return a + b;
}

// Lo que Node ejecutó
function sumar(a        , b        )         {
  return a + b;
}
```

Los espacios no son casualidad: mantienen los números de línea idénticos para
que los errores apunten al sitio correcto.

**Node nunca vio los tipos.** No los ignoró: los borró antes de empezar.

---

### 📖 El modelo mental correcto

```
node archivo.ts     →  EJECUTA.    No comprueba nada.
npx tsc --noEmit    →  COMPRUEBA.  No ejecuta nada.
```

Son dos herramientas con trabajos distintos, y hacen falta las dos.

Prueba el segundo sobre el mismo archivo:

```bash
npx tsc --noEmit
```

Ahora sí aparece el error, con archivo y línea.

**El editor no es una garantía.** Cursor ejecuta el mismo comprobador por
debajo y te avisa mientras escribes, pero avisar no es impedir. Si ignoras el
subrayado, el archivo corre.

---

### 📖 Por qué esto importa más de lo que parece

Es la regla que arrastras desde el Mes 1, ahora aplicada al lenguaje que
supuestamente la resuelve:

> **"No dio error" no significa "está bien".**

Un alumno que crea que TypeScript le protege en ejecución confía en una red
que no está puesta. TypeScript protege **antes** de ejecutar, y solo si
ejecutas el comprobador.

---

### 📖 El flujo de trabajo real

```
Mientras escribes    →  el editor te avisa (rápido, cómodo, no bloquea)
Antes de commitear   →  npx tsc --noEmit
En integración       →  npx tsc --noEmit como paso obligatorio
```

Un script en `package.json` te lo deja a mano:

```json
{
  "scripts": {
    "check": "tsc --noEmit"
  }
}
```

`npm run check` antes de cada commit.

---

### 📖 Sintaxis que Node no puede ejecutar

Type stripping solo maneja **sintaxis borrable** — la que al quitarla deja
JavaScript válido.

Estas fallan con `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`:

```typescript
enum Estado { Confirmada, Pendiente }      // genera un objeto real
namespace Utilidades { ... }
class Reserva {
  constructor(private cliente: string) {}  // propiedad de parámetro
}
```

**Por qué:** un `enum` no es solo una anotación. Se convierte en un objeto
que existe en tiempo de ejecución. Borrarlo rompería el código, así que Node
se niega en vez de romper en silencio.

Fíjate en la diferencia de comportamiento: con un error de tipo, Node
**ejecuta igual**. Con sintaxis no borrable, Node **se detiene**. La primera
es una decisión de diseño discutible; la segunda es honestidad.

**Alternativa a `enum`** — la que verás en código moderno:

```typescript
const ESTADOS = ["confirmada", "pendiente", "cancelada"] as const;
type Estado = typeof ESTADOS[number];
```

Funciona con type stripping, y además te da el array en ejecución.

---

### 📖 Mini-ejercicio de comprensión

Tienes dos archivos. El primero tiene un error de tipo. El segundo usa un
`enum`.

Ejecutas los dos con `node`. Uno corre y otro falla.

¿Cuál es cuál, y por qué la diferencia?

---

### 🛠 EJERCICIOS DÍA 7

**Ejercicio 1** — ver el fallo silencioso

Escribe `prueba-tipos.ts` con al menos tres errores de tipo distintos —
argumento incorrecto, retorno incorrecto, propiedad inexistente.

Ejecútalo con `node`. Documenta en `NOTAS.md` qué esperabas y qué pasó.

Después ejecuta `npx tsc --noEmit` y compara.

**Ejercicio 2** — el script de comprobación

Agrega `"check": "tsc --noEmit"` a tu `package.json`. Verifica que
`npm run check` detecta los errores del ejercicio 1.

**Ejercicio 3** — sintaxis no borrable

Escribe un archivo con un `enum` y ejecútalo con `node`. Documenta el mensaje
de error exacto.

Después reescríbelo con `as const` y comprueba que corre.

**Ejercicio 4** — juzga este flujo

Un compañero te dice:

> "Yo no uso `tsc`. El editor me marca los errores en rojo, así que si no hay
> rojo, está bien. Y si algo falla, lo veo al ejecutar."

Enumera todo lo que está mal en ese razonamiento. Son al menos tres cosas.

> Pista para la tercera: ¿qué archivos tiene el editor abiertos?

---

**Cuando termines avísame — valido el Día 7.** ✅

---

## 🔜 PUNTO DE SÍNTESIS

Al aprobar esta semana se dispara **PS-3**, el tercer Proyecto Integrador.

---

*Semana 09 — TypeScript*
*Formato v4 — Bootcamp autocontenido con Protocolo QA aplicado*
*Óscar — Full Stack Developer en formación 🇨🇱*
