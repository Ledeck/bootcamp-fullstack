# 📄 CHEAT SHEET — SEMANA 09
## TypeScript · Tipos · Interfaces · Generics · Utility Types

> Guion de la clase de activación. Se entrega POR PARTES, día a día.
> No lo leas completo de antemano.
>
> **Creado en la auditoría del 2026-08-06.** Esta semana no tenía Cheat Sheet.

---

## ⏱ BLOQUE PERECEDERO — verificar antes de usar

```
Generado y verificado: agosto 2026
REGENERAR antes de empezar la semana.
```

### No hace falta instalar nada para ejecutar

**Node.js ejecuta archivos `.ts` directamente.**

```bash
node archivo.ts
```

Eso es todo. Sin `tsc`, sin `ts-node`, sin configuración.

```
Node 22.6   → funcionaba con la bandera --experimental-strip-types
Node 22.18  → sin bandera
Node 23.6   → sin bandera
Node 24 LTS → comportamiento por defecto
```

Verifica tu versión con `node --version`. Si es 22.18 o superior, funciona
directo.

### Para comprobar tipos, sí hace falta

```bash
npx tsc --noEmit
```

`--noEmit` significa "comprueba pero no generes archivos". Es lo que quieres:
solo el diagnóstico.

⚠ **Material antiguo que vas a encontrar:** casi todos los tutoriales
anteriores a 2025 dicen `npm install -g ts-node` y `ts-node archivo.ts`. Ya
no hace falta. Tampoco `tsc archivo.ts`, que genera un `.js` al lado que
nadie usa.

**Qué verificar al llegar a esta semana:** tu versión de Node, y el estado de
TypeScript 7.0 ("Project Corsa", reescritura del compilador en Go). Si ya
salió, `tsc --noEmit` es mucho más rápido.

---

## 1. LA IDEA CENTRAL — Y LA TRAMPA QUE VIENE CON ELLA

TypeScript es JavaScript con anotaciones de tipo. Nada más.

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}
```

Los `: number` no existen en tiempo de ejecución. **Son comentarios que una
herramienta lee.**

### Cómo ejecuta Node un archivo .ts — type stripping

Node usa un módulo llamado `amaro` que **borra las anotaciones y las
reemplaza por espacios en blanco**, dejando JavaScript válido:

```typescript
// Lo que escribes
function sumar(a: number, b: number): number {
  return a + b;
}

// Lo que Node ejecuta
function sumar(a        , b        )         {
  return a + b;
}
```

Los espacios en blanco no son casualidad: mantienen los números de línea
idénticos, para que los errores apunten al sitio correcto.

### ⚠ LA TRAMPA MÁS IMPORTANTE DE LA SEMANA

> **Node ejecuta tu `.ts` sin comprobar ni un solo tipo.**

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

console.log(sumar("hola", "mundo"));
```

`node archivo.ts` imprime **`holamundo`**. Sin error. Sin advertencia.

El tipo decía `number`. Le pasaste strings. Node borró la anotación y ejecutó.

**El modelo mental correcto:**

```
node archivo.ts     →  EJECUTA.    No comprueba nada.
npx tsc --noEmit    →  COMPRUEBA.  No ejecuta nada.
```

Son dos trabajos distintos y hacen falta los dos. El editor te muestra los
errores mientras escribes, pero **el editor no es una garantía**: si ignoras
el subrayado rojo y ejecutas, el archivo corre igual.

Es la regla del Mes 1 otra vez: *"no dio error" no significa "está bien"*.

---

## 2. TIPOS BÁSICOS

```typescript
let nombre: string = "Óscar";
let edad: number = 28;
let activo: boolean = true;
let etiquetas: string[] = ["a", "b"];
let par: [string, number] = ["EXP001", 450000];   // tupla
```

### Inferencia — la regla práctica

```typescript
let nombre = "Óscar";        // TypeScript ya sabe que es string
let nombre: string = "Óscar"; // redundante
```

**Anota cuando el valor no está a la vista:** parámetros de función, valores
de retorno cuando quieres forzar el contrato, y estructuras vacías.

```typescript
const reservas = [];          // any[] — TypeScript no puede saber
const reservas: Reserva[] = []; // ✅
```

### `any` vs `unknown`

```typescript
let x: any;      // apaga TypeScript para esa variable
let y: unknown;  // "no sé qué es, y no te dejo usarlo hasta comprobarlo"
```

`any` es una puerta trasera. Cada `any` es un trozo de tu código donde
TypeScript deja de ayudarte.

`unknown` es honesto: te obliga a comprobar antes de usar.

```typescript
function procesar(dato: unknown) {
  if (typeof dato === "string") {
    return dato.toUpperCase();   // aquí TypeScript ya sabe que es string
  }
}
```

**Cuándo `any` está bien:** casi nunca. Al migrar código existente, como paso
temporal.

---

## 3. `type` VS `interface`

```typescript
type Expedicion = {
  id: string;
  nombre: string;
  precioBase: number;
  dificultad?: string;      // el ? lo hace opcional
};

interface Expedicion {
  id: string;
  nombre: string;
}
```

**Las diferencias que importan:**

| | `type` | `interface` |
|---|---|---|
| Objetos | ✅ | ✅ |
| Uniones (`A \| B`) | ✅ | ❌ |
| Tipos primitivos | ✅ | ❌ |
| Tuplas | ✅ | ❌ |
| Se puede reabrir y ampliar | ❌ | ✅ |

**Criterio práctico:** usa `type` por defecto. Es más versátil. Usa
`interface` cuando quieras que otros puedan extenderla — típico en librerías.

⚠ **Trampa de `interface`:** se puede declarar dos veces y se fusionan. Eso
es una característica para librerías, pero en código de aplicación produce
sorpresas: dos interfaces con el mismo nombre en archivos distintos acaban
siendo una.

---

## 4. UNIONES Y NARROWING

```typescript
type Estado = "confirmada" | "pendiente" | "cancelada";

let estado: Estado = "confirmada";
let estado: Estado = "confirmado";   // ❌ error: no está en la unión
```

Los **tipos literales** son de lo más útil de TypeScript: en vez de `string`,
la lista exacta de valores permitidos.

### Narrowing — estrechar el tipo

```typescript
function formatear(valor: string | number): string {
  if (typeof valor === "number") {
    return valor.toLocaleString("es-CL");   // aquí es number
  }
  return valor.toUpperCase();                // aquí es string
}
```

TypeScript sigue el flujo del código. Después del `if`, sabe más que antes.

### Unión discriminada

```typescript
type Resultado =
  | { estado: "exito"; datos: Reserva[] }
  | { estado: "error"; mensaje: string };

function manejar(r: Resultado) {
  if (r.estado === "exito") {
    r.datos;      // ✅ TypeScript sabe que existe
    r.mensaje;    // ❌ error: no existe en esta variante
  }
}
```

> ⚠ **Trampa:** el campo discriminante debe ser un **tipo literal**
> (`estado: "exito"`), no `string`. Con `string` se pierde el estrechamiento
> por completo.

---

## 5. GENERICS

Un tipo que recibe otro tipo como parámetro.

```typescript
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

primero([1, 2, 3]);           // T = number → devuelve number | undefined
primero(["a", "b"]);          // T = string → devuelve string | undefined
```

Sin generics tendrías que elegir entre `any` (pierdes el tipo) o escribir la
misma función para cada tipo.

```typescript
type RespuestaAPI<T> = {
  exito: boolean;
  datos?: T;
  error?: string;
};

type RespuestaReservas = RespuestaAPI<Reserva[]>;
```

**Idea mental:** `T` es a los tipos lo que un parámetro es a los valores. La
función no sabe qué recibirá; el tipo tampoco.

⚠ **Trampa:** `<T>` en un archivo `.tsx` se confunde con JSX. En `.ts` no hay
problema; en `.tsx` a veces hace falta `<T,>` con coma.

---

## 6. UTILITY TYPES

Transforman un tipo en otro.

```typescript
type Expedicion = {
  id: string;
  nombre: string;
  precioBase: number;
  cupoMaximo: number;
};

Partial<Expedicion>              // todas opcionales
Required<Expedicion>             // todas obligatorias
Readonly<Expedicion>             // ninguna modificable
Pick<Expedicion, "id" | "nombre">    // solo esas dos
Omit<Expedicion, "cupoMaximo">       // todas menos esa
Record<string, number>               // objeto con claves string y valores number
```

**Dónde se usan de verdad:**

```typescript
// Crear: sin id, que lo genera la base
type CrearExpedicion = Omit<Expedicion, "id">;

// Actualizar: todo opcional menos el id
type ActualizarExpedicion = Partial<Omit<Expedicion, "id">> & { id: string };

// El conteo por expedición de PS-1, tipado
type CuposPorExpedicion = Record<string, number>;
```

Ese último es tu `cuposPorExpId` de PS-1, con tipo.

---

## 7. `as const` Y `satisfies`

Dos herramientas modernas que no estaban en el material original.

### `as const` — congelar en literales

```typescript
const estados = ["confirmada", "pendiente"];
// tipo: string[]

const estados = ["confirmada", "pendiente"] as const;
// tipo: readonly ["confirmada", "pendiente"]
```

Sirve para derivar uniones desde un array:

```typescript
const ESTADOS = ["confirmada", "pendiente", "cancelada"] as const;
type Estado = typeof ESTADOS[number];
// "confirmada" | "pendiente" | "cancelada"
```

Una sola fuente de verdad: el array existe en ejecución y el tipo sale de él.

### `satisfies` — validar sin perder precisión

```typescript
type Config = { host: string; puerto: number };

// ❌ con "as" mientes y pierdes precisión
const c1 = { host: "local", puerto: 3000 } as Config;

// ✅ con "satisfies" validas Y conservas los literales
const c2 = { host: "local", puerto: 3000 } satisfies Config;
```

> ⚠ **La diferencia clave:** `as` le dice a TypeScript "confía en mí" y
> silencia comprobaciones. `satisfies` comprueba de verdad y además conserva
> el tipo inferido más preciso.
>
> Regla: `satisfies` casi siempre; `as` solo cuando sabes algo que TypeScript
> no puede saber.

---

## 8. SINTAXIS QUE NODE NO PUEDE EJECUTAR

Type stripping solo maneja **sintaxis borrable** — la que al quitarla deja
JavaScript válido.

Estas construcciones **fallan** con `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`:

```typescript
enum Estado { Confirmada, Pendiente }     // ❌ genera código en ejecución

namespace Utilidades { ... }              // ❌

class Reserva {
  constructor(private cliente: string) {} // ❌ propiedad de parámetro
}

import Algo = require("modulo");          // ❌ alias de import
```

**Por qué fallan:** no se pueden borrar. Un `enum` se convierte en un objeto
real en tiempo de ejecución; borrarlo rompería el código.

**Qué hacer si te encuentras uno:**

```
· En código propio → usa `as const` en vez de `enum` (sección 7)
· En código ajeno  → node --experimental-transform-types archivo.ts
```

⚠ TypeScript 5.8 añadió `--erasableSyntaxOnly`, que hace que `tsc` te avise
si usas algo no borrable. Útil si quieres garantizar compatibilidad con Node.

---

## 9. `tsconfig.json` Y `strict`

Node **no lee `tsconfig.json`** para ejecutar. Pero tu editor y
`tsc --noEmit` sí.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true
  }
}
```

**`strict: true` es la opción que más importa.** Sin ella:

```typescript
let nombre: string = null;   // permitido sin strict — y es un bug esperando
```

Con `strict`, `null` y `undefined` no son asignables a otros tipos salvo que
lo declares. Es la mitad del valor de TypeScript.

⚠ **Trampa:** activar `strict` en un proyecto existente produce cientos de
errores de golpe. En proyecto nuevo, actívalo desde el primer día.

---

## 10. TABLA DE DECISIÓN

| Situación | Herramienta |
|---|---|
| Forma de un objeto | `type` |
| Contrato que otros extenderán | `interface` |
| Lista cerrada de valores | unión de literales |
| El mismo código para varios tipos | generic `<T>` |
| Quitar campos de un tipo | `Omit` |
| Quedarte con algunos campos | `Pick` |
| Todo opcional | `Partial` |
| Diccionario clave-valor | `Record` |
| Array que también genere un tipo | `as const` + `typeof X[number]` |
| Validar un objeto contra un tipo | `satisfies` |
| No sé qué es y voy a comprobarlo | `unknown` |
| No sé qué es y me rindo | `any` — evítalo |

---

## 11. CHECKLIST DE DOMINIO

```
□ Sé ejecutar un .ts con node, sin compilar
□ Sé que node NO comprueba tipos, y cómo comprobarlos aparte
□ Distingo cuándo anotar y cuándo dejar que infiera
□ Sé la diferencia entre any y unknown
□ Elijo entre type e interface con criterio
□ Escribo uniones de literales en vez de string
□ Entiendo el narrowing con typeof
□ Sé tipar acciones con unión discriminada
□ Escribo una función genérica simple
□ Uso Partial, Omit, Pick y Record donde tocan
□ Sé qué hace as const y para qué sirve
□ Distingo as de satisfies
□ Sé por qué un enum no corre con node
```

---

## 🔥 LAS 4 IDEAS QUE NO DEBES OLVIDAR

**1. Node ejecuta tus tipos borrándolos, no comprobándolos.**
`node` corre, `tsc --noEmit` comprueba. Hacen falta los dos.

**2. `any` no es un tipo: es apagar TypeScript.**
Cada `any` es un trozo de código donde vuelves a JavaScript sin red.

**3. Las uniones de literales valen más que `string`.**
`"confirmada" | "pendiente"` te protege de errores que `string` permite.

**4. Los tipos son documentación que no puede mentir.**
Un comentario se desactualiza en silencio. Un tipo, no — porque el
comprobador lo verifica.

---

*Cheat Sheet Semana 09 — TypeScript*
*Creado en la auditoría del 2026-08-06*
*Prerrequisitos: Semanas 01-06 · Semana 05 (destructuring, spread) · Semana 06 (async)*
