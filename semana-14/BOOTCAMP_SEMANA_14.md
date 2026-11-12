# 📘 BOOTCAMP SEMANA 14
## Persistencia · PostgreSQL · Prisma ORM

---

```
ACTA DE GENERACIÓN
Fecha de generación: 2026-07-31
Semana en curso de Óscar al generar: 05 (PS-1 completado)
Distancia estimada hasta el uso: ~8 meses
Fases ejecutadas: 0, 1, 2, 3, 4, 5, 6, 6b, 7, 8
Fase 1 — fuentes: documentación oficial de Prisma, notas de versión 7.x
         y changelog, consultadas el 2026-07-31
Referencia: Prisma ORM 7.x · PostgreSQL 16+
Bloque perecedero: ALTO RIESGO — regenerar sí o sí antes de usar
PARCHE 2026-08-06: referencia a PS-5 eliminada. Ese proyecto nunca existió.
                   El siguiente punto de síntesis es PS-4, tras la Semana 16
Constitución aplicada: v1.3 (enmiendas 1-10)
```

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_14.md` completa.
> **Recuerda:** cuando termines cada día, avísame para validar antes de continuar.

---

## ⚠️ NOTA DE ALCANCE

Esta semana **cierra un agujero** que abrió la Semana 12.

Ahí aprendiste a escribir datos con Server Actions, y los guardaste en un array
del servidor. Funcionaba en desarrollo. Y es, honestamente, una mentira que se
sostiene solo mientras nadie apague el proceso.

El Día 1 empieza demostrando el fallo. No es un ejercicio artificial: es el
comportamiento real de tu código actual.

**Prerrequisito real:** haber completado la Semana 12. Sin una aplicación que
escriba datos, esta semana resuelve un problema que no tienes.

---

## 🗓 DÍA 1 — POR QUÉ FALLA LO QUE TIENES

### 🎯 Objetivo
Ver fallar tu propio código y entender exactamente por qué.

---

### 📖 El problema real

Tu aplicación Nexus deja crear reservas. Funciona: llenas el formulario, envías,
la reserva aparece en la lista.

Ahora reinicia el servidor.

---

### 📖 Hazlo antes de seguir leyendo

```
1. Levanta la aplicación con npm run dev
2. Crea dos reservas nuevas desde el formulario
3. Comprueba que aparecen en la lista
4. Detén el servidor con Ctrl+C
5. Vuelve a levantarlo
6. Mira la lista
```

Las reservas no están.

Es importante que lo veas tú. Todo lo que viene esta semana existe por esto.

---

### 📖 Por qué pasa

Tu código guarda las reservas así:

```typescript
const reservas: Reserva[] = [];

export async function crearReserva(datos: DatosReserva) {
  reservas.push({ ...datos, id: crypto.randomUUID() });
}
```

Ese array es una variable de un módulo de Node.js. Vive en la **memoria del
proceso**. Cuando el proceso termina, la memoria se libera y el array deja de
existir.

No hay bug. El código hace exactamente lo que dice: guardar en memoria.

---

### 📖 Y en producción es peor

Reiniciar en desarrollo es molesto. En producción el problema cambia de naturaleza.

Cuando despliegues Nexus, no habrá "un servidor". Habrá varias instancias
atendiendo peticiones, y cada una tiene **su propia copia del array**:

```
Usuario crea una reserva  →  la atiende la instancia A  →  array de A: 1 reserva
Usuario recarga la página →  la atiende la instancia B  →  array de B: 0 reservas
```

La reserva existe y no existe, según qué servidor te toque. Y si el proveedor
apaga una instancia por inactividad —lo normal en plataformas serverless—, esos
datos desaparecen sin que nadie se entere.

**El array no es un almacenamiento defectuoso. No es un almacenamiento.**

---

### 📖 ¿Y si guardo en un archivo?

Es la siguiente idea de todo el mundo, y merece una respuesta seria.

```typescript
import { writeFile, readFile } from "fs/promises";

await writeFile("reservas.json", JSON.stringify(reservas));
```

Sobrevive al reinicio. Y falla por cuatro motivos:

```
1. Dos peticiones simultáneas leen el mismo archivo, cada una agrega
   su reserva, y la segunda escritura pisa la primera. Se pierde un dato
   y nadie lo nota.

2. Para buscar una reserva hay que leer el archivo ENTERO y filtrarlo
   en memoria. Con 500.000 reservas, cada consulta carga 500.000 registros.

3. Nada garantiza que expedicionId apunte a una expedición real.
   Ese caso que planteaste en PS-1 —una reserva con un id inexistente—
   aquí sigue siendo posible.

4. En serverless el sistema de archivos es efímero. Vuelves al punto
   de partida.
```

El punto 1 tiene nombre: **condición de carrera**. Es el problema que las bases de
datos llevan cincuenta años resolviendo, y no se arregla con más cuidado al
escribir el código.

---

### 📖 Qué hace una base de datos que tú no

```
Persistencia    los datos sobreviven al proceso, al reinicio y al despliegue
Concurrencia    varias escrituras simultáneas sin pisarse
Consultas       filtra, ordena y agrupa sin traerlo todo a memoria
Integridad      garantiza que las relaciones entre datos sean válidas
Transacciones   varias operaciones que ocurren todas o ninguna
```

El cuarto punto conecta directo con PS-1. Tú detectaste que una reserva podía
apuntar a una expedición inexistente y que el método de la resta no lo notaba. Una
base de datos relacional **rechaza esa escritura**. No es que la detecte: es que no
la permite.

---

### 📖 Por qué PostgreSQL

```
Es relacional     tus datos tienen relaciones reales (reservas ↔ expediciones)
Es el estándar    en el mercado laboral chileno y remoto, es lo que piden
Es gratuito       y tiene capas gratuitas alojadas suficientes para aprender
Es sólido         cuarenta años de desarrollo, sin sorpresas
```

MongoDB sería una alternativa, pero tus datos son claramente relacionales.
Forzarlos a un modelo de documentos complicaría lo que ya resolviste bien.

---

### 📖 Mini-ejercicio de comprensión

Tu aplicación guarda reservas en un array del servidor y se despliega en tres
instancias. Un usuario crea una reserva y **sí** la ve al recargar.

¿Significa que el problema no existe? Justifica.

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — documenta el fallo

Reproduce la pérdida de datos y anota en `NOTAS.md` los pasos exactos y qué
observaste. Vas a volver a este archivo el Día 6 para comparar.

**Ejercicio 2** — provoca la condición de carrera

Implementa la versión de archivo JSON. Después dispara dos creaciones de reserva
casi simultáneas (dos pestañas, o dos llamadas seguidas sin esperar la primera).

Comprueba si se guardaron las dos. Documenta el resultado.

Este ejercicio es para que veas el problema, no para que lo resuelvas.

**Ejercicio 3** — decide

Elige dónde vivirá tu base de datos: alojada o local con Docker. Escribe en
`NOTAS.md` tu decisión y su razón, considerando que trabajas desde dos máquinas.

**Ejercicio 4** — prepara el terreno

Crea la cuenta o el contenedor, obtén la cadena de conexión, guárdala en `.env` y
**verifica que `.env` esté en `.gitignore`**.

Haz un commit y revisa en GitHub que el archivo no aparezca. Si aparece, la cadena
de conexión ya es pública: bórrala y genera una nueva.

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — EL ESQUEMA

### 🎯 Objetivo
Describir tus datos en el esquema de Prisma y crear las tablas reales.

---

### 📖 El problema real

Tienes que decirle a PostgreSQL qué forma tienen tus datos: qué tablas, qué
columnas, de qué tipo, y cómo se relacionan.

---

### 📖 ¿Cómo lo harías con lo que ya sabes?

Escribiendo SQL:

```sql
CREATE TABLE expediciones (
  id VARCHAR(10) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio_base INTEGER NOT NULL
);
```

Es lo que se hacía, y sigue siendo válido.

---

### 📖 Por qué no alcanza

**TypeScript no se entera de nada.** Escribiste la tabla en SQL; tu código no sabe
que existe. Tienes que declarar los tipos a mano, y nada garantiza que coincidan.
El día que agregues una columna y olvides actualizar el tipo, TypeScript te
asegura que todo está bien mientras la consulta falla.

**Los cambios no tienen historia.** Si mañana agregas un campo, ¿cómo lo aplicas
en tu otra laptop? ¿Y cuando despliegues? Sin un sistema de migraciones, cada
entorno acaba con una versión distinta de la base.

---

### 📖 El esquema de Prisma como solución

Un archivo describe todo, y de ahí sale tanto la base de datos como los tipos:

```prisma
model Expedicion {
  id           String   @id
  nombre       String
  tipo         String
  duracionDias Int
  precioBase   Int
  cupoMaximo   Int
  dificultad   String

  reservas     Reserva[]
}
```

De ese bloque, Prisma genera **dos cosas**:

```
1. El SQL que crea la tabla en PostgreSQL
2. El tipo TypeScript Expedicion, con sus campos exactos
```

Una sola fuente de verdad. Si cambias el esquema, cambian las dos.

---

### 📖 La configuración de Prisma 7

Esta parte cambió y es donde más vas a chocar con tutoriales viejos:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

```typescript
// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") }
});
```

Tres diferencias con lo que verás por ahí, todas de Prisma 7:

```
provider = "prisma-client"    no "prisma-client-js", que quedó deprecado
output es OBLIGATORIO         antes se generaba oculto en node_modules
la URL va en prisma.config.ts no en el bloque datasource
```

**Por qué el `output` ahora es obligatorio:** el cliente generado dejó de ser una
caja negra en `node_modules` y pasó a ser **código TypeScript tuyo**, en tu
carpeta, que tu editor y tu bundler leen como cualquier otro archivo. Es un cambio
de filosofía: menos magia, más código visible.

---

### 📖 Modelar las relaciones

Una expedición tiene muchas reservas:

```prisma
model Expedicion {
  id       String    @id
  reservas Reserva[]
}

model Reserva {
  id           String     @id @default(cuid())
  cliente      String
  personas     Int
  estado       String     @default("pendiente")

  expedicionId String
  expedicion   Expedicion @relation(fields: [expedicionId], references: [id])
}
```

**Lo que importa:** solo la tabla `Reserva` gana una columna nueva,
`expedicionId`. El campo `reservas` de `Expedicion` **no es una columna** — es la
forma en que Prisma te deja recorrer la relación al revés.

Y aquí está lo que conecta con PS-1: `@relation` crea una **clave foránea**.
PostgreSQL va a rechazar cualquier reserva cuyo `expedicionId` no corresponda a
una expedición existente.

Tú detectaste ese agujero a mano. Ahora la base de datos lo cierra por ti.

---

### 📖 Migraciones

```bash
npx prisma migrate dev --name esquema_inicial
```

Prisma compara tu esquema con la base, genera el SQL de la diferencia, lo aplica
y regenera el cliente.

Queda un archivo en `prisma/migrations/` con ese SQL. **Se versiona en Git.** Por
eso tu otra laptop y el servidor de producción pueden llegar al mismo estado
ejecutando las mismas migraciones en orden.

**Idea mental:** las migraciones son a la base de datos lo que los commits son al
código. Historia ordenada de cambios, reproducible en cualquier máquina.

---

### 📖 Errores frecuentes

```prisma
// ❌ Campo obligatorio agregado a una tabla con datos
model Reserva {
  telefono String     // la migración falla: las filas existentes no lo tienen
}

// ✅ Opcional, o con valor por defecto
model Reserva {
  telefono String?
  // o
  telefono String @default("")
}
```

```prisma
// ❌ Relación declarada en un solo lado
model Reserva {
  expedicion Expedicion @relation(fields: [expedicionId], references: [id])
}
// Prisma exige el campo reservas Reserva[] en Expedicion
```

---

### 📖 Mini-ejercicio de comprensión

Agregas un campo `descuento Int` al modelo `Reserva`, guardas el archivo, y en tu
código escribes `reserva.descuento`. TypeScript dice que esa propiedad no existe.

¿Qué falta? Hay dos comandos posibles — ¿cuál y por qué?

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — el esquema completo

Modela `Expedicion`, `Reserva` y `Guia` en `schema.prisma`, con los mismos campos
que usaste en PS-1 y en la Semana 11. Relación 1-N entre expedición y reservas.

**Ejercicio 2** — primera migración

Ejecuta `prisma migrate dev` y abre `prisma studio`. Deberías ver tres tablas
vacías. Anota qué archivo se generó en `prisma/migrations/` y ábrelo: es SQL
legible.

**Ejercicio 3** — evoluciona el esquema

Agrega un campo `notas String?` a `Reserva` y genera una segunda migración. Abre
el SQL generado y compáralo con el primero. Explica en un comentario por qué este
es mucho más corto.

**Ejercicio 4** — provoca el error

Intenta agregar un campo obligatorio sin valor por defecto a una tabla que ya
tenga filas. Lee el mensaje de error completo y documenta qué te dice y cómo lo
resolviste.

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — CONSULTAR

### 🎯 Objetivo
Reemplazar los métodos de array por consultas a la base de datos.

---

### 📖 El problema real

Tus páginas leen de arrays importados. Ahora los datos están en PostgreSQL.

---

### 📖 El cliente de Prisma

```typescript
import prisma from "@/lib/prisma";

const expediciones = await prisma.expedicion.findMany();
```

Cada modelo del esquema se convierte en una propiedad del cliente, con métodos
tipados. Si escribes `prisma.expedicionn`, TypeScript te lo marca.

---

### 📖 El mapa desde lo que ya sabes

Esta tabla es la semana entera resumida:

| En memoria (PS-1) | En base de datos |
|---|---|
| `expediciones` | `await prisma.expedicion.findMany()` |
| `.filter(e => e.tipo === "kayak")` | `where: { tipo: "kayak" }` |
| `.find(e => e.id === id)` | `findUnique({ where: { id } })` |
| `.sort((a,b) => a.precio - b.precio)` | `orderBy: { precioBase: "asc" }` |
| `.length` | `count()` |
| `find` para cruzar dos arrays | `include: { reservas: true }` |

**La diferencia que no se ve en la tabla:** `filter` trae los 800.000 registros a
memoria y descarta 799.992. `where` le pide a PostgreSQL que devuelva solo los 8.
El trabajo se hace donde están los datos.

---

### 📖 Ejemplos

```typescript
const trekking = await prisma.expedicion.findMany({
  where: { tipo: "trekking" },
  orderBy: { precioBase: "asc" }
});

const dificiles = await prisma.expedicion.findMany({
  where: {
    dificultad: "alta",
    duracionDias: { lte: 3 }
  }
});

const conReservas = await prisma.expedicion.findUnique({
  where: { id: "EXP001" },
  include: { reservas: true }
});
```

Ese último resuelve en una consulta lo que en PS-1 te costó un `filter` por
`expedicionId` y un `find` por cada reserva.

---

### 📖 El singleton — y por qué no es opcional

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalParaPrisma = global as unknown as { prisma?: PrismaClient };

const adaptador = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = globalParaPrisma.prisma || new PrismaClient({ adapter: adaptador });

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}

export default prisma;
```

**El problema que resuelve:** Next.js recarga los módulos en caliente cada vez que
guardas un archivo. Sin este patrón, cada recarga crea un `PrismaClient` nuevo, y
cada cliente abre su propio conjunto de conexiones. Los anteriores no se cierran.

Después de veinte guardados tienes veinte pools abiertos, y PostgreSQL responde
*"too many clients already"*.

**Por qué funciona:** `global` sobrevive a la recarga de módulos. Al recargar, la
variable ya existe y se reutiliza.

**Por qué solo en desarrollo:** en producción no hay recarga en caliente, y
ensuciar `global` sin necesidad es mala práctica.

---

### 📖 Mini-ejercicio de comprensión

```typescript
const todas = await prisma.expedicion.findMany();
const caras = todas.filter((e) => e.precioBase > 300000);
```

Funciona y da el resultado correcto. ¿Por qué es una mala solución, y cómo se
escribe bien?

---

### 🔗 Conexión con lo que viene

Cuando construyas la API REST, estas mismas consultas vivirán detrás de endpoints.
Y cuando llegue la autenticación, el `where` incluirá el id del usuario para que
cada uno vea solo lo suyo.

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — el singleton

Crea `src/lib/prisma.ts`. Compruébalo: guarda un archivo cualquiera diez veces
seguidas con el servidor corriendo y verifica que no aparezcan errores de
conexiones.

**Ejercicio 2** — poblar la base

Escribe `prisma/seed.ts` que inserte las 8 expediciones, las 12 reservas y los 5
guías desde los arrays que ya tienes. Verifica en `prisma studio`.

Cuidado con el orden: las reservas necesitan que las expediciones existan antes.
Piensa por qué.

**Ejercicio 3** — migrar el catálogo

Reemplaza el array importado por consultas reales en la página del catálogo y en
la de detalle. Los cuatro filtros deben seguir funcionando.

**Ejercicio 4** — recalcula el reporte

Reproduce el reporte ejecutivo de PS-1 con consultas de Prisma en vez de métodos
de array. Los números deben coincidir **exactamente**:

```
Precio promedio            $261.250
Ingresos totales           $6.605.000
Personas confirmadas       24
TOP expedición             Torres del Paine — $1.800.000
```

Si alguno no coincide, la consulta está mal. Esas anclas son tu verificación.

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — ESCRIBIR

### 🎯 Objetivo
Que las Server Actions escriban en la base de datos y la pantalla se entere.

---

### 📖 El problema real

Tu Server Action de la Semana 12 hace `reservas.push(...)`. Hay que cambiarla.

---

### 📖 La solución

```typescript
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearReserva(datos: DatosReserva) {
  await prisma.reserva.create({
    data: {
      cliente: datos.cliente,
      personas: datos.personas,
      estado: "confirmada",
      metodoPago: datos.metodoPago,
      expedicionId: datos.expedicionId
    }
  });

  revalidatePath("/reservas");
}
```

---

### 📖 `revalidatePath` — y el fallo silencioso que evita

Prueba esto: escribe la acción **sin** `revalidatePath`, crea una reserva, y mira
la lista.

No aparece. Pero si abres `prisma studio`, ahí está.

**Por qué:** Next.js guarda el resultado renderizado de las rutas. La escritura
ocurrió en la base, pero Next.js no tiene forma de saber que eso invalida lo que
ya tenía renderizado. Sigue mostrando la versión anterior.

`revalidatePath("/reservas")` es decirle: *lo que tenías de esta ruta ya no sirve*.

Es otro fallo silencioso más — sin error, sin advertencia, con el dato guardado
correctamente y el usuario convencido de que no se guardó.

> ⚠ **Trampa:** recibe la ruta, no la URL. `"/reservas"`, no
> `"http://localhost:3000/reservas"`. Y si la reserva también aparece en el detalle
> de la expedición, hay que revalidar esa ruta también.

---

### 📖 Errores de base de datos

No todo lo que falla es culpa tuya. Prisma lanza errores con código:

```typescript
try {
  await prisma.reserva.create({ data: datos });
} catch (error) {
  if (error instanceof Error && "code" in error) {
    if (error.code === "P2003") {
      return { error: "La expedición indicada no existe" };
    }
    if (error.code === "P2002") {
      return { error: "Ese registro ya existe" };
    }
  }
  return { error: "No se pudo crear la reserva" };
}
```

`P2003` es violación de clave foránea — exactamente el caso que planteaste en PS-1,
ahora rechazado por la base de datos en vez de pasar inadvertido.

**Nunca devuelvas el error de Prisma tal cual al usuario.** Puede contener nombres
de tablas y estructura de tu base. Devuelve un mensaje tuyo y registra el original
en la consola del servidor.

---

### 📖 Validar antes de escribir

La base garantiza integridad referencial. No garantiza tus reglas de negocio.

```typescript
export async function crearReserva(datos: DatosReserva) {
  const expedicion = await prisma.expedicion.findUnique({
    where: { id: datos.expedicionId },
    include: { reservas: { where: { estado: "confirmada" } } }
  });

  if (!expedicion) {
    return { error: "Expedición no encontrada" };
  }

  const ocupados = expedicion.reservas.reduce(
    (total, r) => total + r.personas,
    0
  );

  if (ocupados + datos.personas > expedicion.cupoMaximo) {
    return { error: "No hay cupos suficientes" };
  }

  await prisma.reserva.create({ data: { ...datos, estado: "confirmada" } });
  revalidatePath("/reservas");
  return { exito: true };
}
```

**Dónde va la validación:** en el servidor, siempre. Validar en el formulario
mejora la experiencia, pero cualquiera puede llamar a tu Server Action sin pasar
por tu formulario.

---

### 📖 Mini-ejercicio de comprensión

Tu validación de cupo consulta las reservas confirmadas, calcula, y luego crea.
Entre la consulta y la creación pasan milisegundos.

¿Qué ocurre si dos usuarios reservan los últimos cupos al mismo tiempo? ¿Basta con
validar antes?

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — migrar las escrituras

Convierte todas tus Server Actions para que usen Prisma. Crear reserva, cambiar
estado, cancelar.

**Ejercicio 2** — el fallo silencioso

Quita `revalidatePath` a propósito, crea una reserva y documenta qué ves en
pantalla y qué ves en `prisma studio`. Vuelve a ponerlo.

**Ejercicio 3** — reglas de negocio

Implementa las validaciones: cupo disponible, nombre no vacío, personas mayor a
cero, expedición existente. Cada una con su mensaje.

**Ejercicio 4** — provoca P2003

Llama a `crearReserva` con un `expedicionId` inventado. Captura el error, muestra
un mensaje claro, y documenta en un comentario cómo se comportaba tu código de
PS-1 ante ese mismo caso.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — CONSULTAS QUE HACEN TRABAJO

### 🎯 Objetivo
Que la base de datos calcule, en vez de traértelo todo para calcular tú.

---

### 📖 El problema real

Tu reporte ejecutivo trae todas las reservas y las suma en JavaScript. Con 12
registros da igual. Con 500.000, cada carga de página mueve 500.000 filas por la
red para producir un número.

---

### 📖 Agregaciones

```typescript
const stats = await prisma.expedicion.aggregate({
  _avg: { precioBase: true },
  _max: { precioBase: true },
  _min: { precioBase: true },
  _count: true
});

// stats._avg.precioBase → 261250
```

Una consulta. PostgreSQL calcula y devuelve el resultado.

```typescript
const porEstado = await prisma.reserva.groupBy({
  by: ["estado"],
  _count: true,
  _sum: { personas: true }
});
```

Eso reemplaza los tres `filter` de 2.1 y el `reduce` de 2.3, en una sola consulta.

```typescript
const porMetodo = await prisma.reserva.groupBy({
  by: ["metodoPago"],
  where: { estado: "confirmada" },
  _count: true,
  orderBy: { _count: { metodoPago: "desc" } },
  take: 1
});
```

Eso es el punto 2.4 completo —contar métodos de pago y encontrar el más usado— que
te costó dos `reduce` encadenados.

---

### 📖 Cuándo NO usar agregaciones

Honestidad sobre los límites:

```
✗ Si el cálculo es complejo y solo lo necesitas una vez, en JavaScript
  se lee mejor y se depura más fácil
✗ Si necesitas los registros completos igualmente, ya los tienes en memoria
✗ groupBy tiene limitaciones — no todo cálculo se expresa bien
```

**La regla:** si el resultado es un número o un puñado de filas y los datos son
muchos, que calcule la base. Si de todos modos necesitas todos los registros,
calcula en JavaScript.

---

### 📖 El problema N+1

El error de rendimiento más común con un ORM, y es fácil de cometer sin notarlo:

```typescript
// ❌ 1 consulta + una por cada expedición = 9 consultas
const expediciones = await prisma.expedicion.findMany();

for (const exp of expediciones) {
  const reservas = await prisma.reserva.findMany({
    where: { expedicionId: exp.id }
  });
}

// ✅ 1 consulta
const expediciones = await prisma.expedicion.findMany({
  include: { reservas: true }
});
```

Con 8 expediciones son 9 consultas en vez de 1. Con 800, son 801.

**Cómo detectarlo:** si tienes un `await` de base de datos dentro de un bucle,
casi siempre es N+1.

---

### 📖 Mini-ejercicio de comprensión

Para cada caso, decide si conviene consulta agregada o cálculo en JavaScript:

```
a) El precio promedio de las expediciones
b) El porcentaje de ocupación de cada expedición
c) Cuántas reservas hay confirmadas
d) La expedición con más ingresos generados
e) Formatear los precios a pesos chilenos
```

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — el reporte con agregaciones

Reescribe el reporte ejecutivo usando `aggregate` y `groupBy`. Mismos números.

**Ejercicio 2** — cuenta las consultas

Activa el registro de consultas de Prisma. Carga el dashboard y cuenta cuántas
consultas se ejecutan. Anótalo.

**Ejercicio 3** — encuentra y arregla el N+1

Provoca deliberadamente un N+1 en el cálculo de ocupación, verifica el número de
consultas, arréglalo con `include`, y verifica de nuevo. Documenta ambos números.

**Ejercicio 4** — decide y justifica

De los cinco cálculos de tu reporte, decide cuáles conviene mover a la base y
cuáles dejar en JavaScript. Justifica cada uno en una línea.

No hay una única respuesta correcta. Lo que se evalúa es el criterio.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO DE LA SEMANA

### 🏆 Nexus Persistente — migración completa

> Nexus deja de ser un prototipo. Los datos viven en PostgreSQL, sobreviven a
> reinicios y despliegues, y las relaciones están garantizadas por la base.
>
> Al terminar, apagas el servidor, lo enciendes, y todo sigue ahí.

---

### 📋 Lo que debe hacer

**1. Esquema completo**
- `Expedicion`, `Reserva`, `Guia` y la asignación de guías a expediciones
- Relaciones con claves foráneas
- Migraciones versionadas en Git

**2. Semilla**
- Script que puebla la base con los datos de PS-1 y los guías de la Semana 11
- Reejecutable sin duplicar registros

**3. Lectura desde la base**
- Catálogo, detalle, reservas y operaciones consultan PostgreSQL
- Ningún array importado queda en el código de la aplicación
- Los filtros se aplican en la consulta, no en memoria

**4. Escritura**
- Crear reserva, cambiar estado, asignar y quitar guía
- Todas con `revalidatePath`
- Reglas de negocio validadas en el servidor
- Errores de Prisma capturados y traducidos a mensajes claros

**5. Reporte ejecutivo con agregaciones**
- `aggregate` y `groupBy` donde corresponda
- Los números deben coincidir con los de PS-1

---

### 📋 Requisitos técnicos

```
✅ Un único PrismaClient, mediante el singleton
✅ El esquema es la única fuente de verdad de los tipos de datos
✅ Cero any
✅ .env fuera de Git, verificado en GitHub
✅ Migraciones versionadas y aplicables desde cero
✅ Cero await de base de datos dentro de un bucle
✅ Toda escritura revalida las rutas afectadas
✅ Las reglas de negocio se validan en el servidor
❌ Sin arrays de datos importados en el código de la aplicación
❌ Sin new PrismaClient() fuera de lib/prisma.ts
❌ Sin errores de Prisma mostrados tal cual al usuario
```

---

### 📋 Estructura sugerida

```
prisma/
├── schema.prisma
├── seed.ts
└── migrations/
src/
├── lib/
│   └── prisma.ts
├── datos/              ← solo para la semilla; la app no lo importa
├── acciones/           ← Server Actions
├── consultas/          ← funciones de lectura reutilizables
└── app/
```

Separar `consultas/` importa: son funciones que reciben parámetros y devuelven
datos tipados, sin saber nada de React. Es la misma separación entre lógica y
presentación que aplicaste en PS-1, ahora con la base de datos en medio.

---

### 💡 Las dos únicas pistas

**Pista 1** — Para que la semilla sea reejecutable sin duplicar, hay una operación
de Prisma que crea o actualiza según exista o no. Búscala en la documentación de
`prisma.modelo.*` — el nombre describe lo que hace.

**Pista 2** — El orden de inserción en la semilla no es libre. Piensa qué pasa si
insertas una reserva antes que su expedición, y qué error te daría.

---

### ✅ Criterios de aprobación

```
□ Al reiniciar el servidor, los datos siguen ahí
□ Al clonar el repositorio en limpio, migrate + seed dejan todo funcionando
□ El reporte coincide con los números de PS-1
□ Las reglas de negocio se cumplen y sus errores son legibles
□ Un expedicionId inválido es rechazado por la base, no por tu código
□ Sin N+1 en el dashboard
□ .env no aparece en GitHub
□ Subido con commit descriptivo
```

**Verificación final:** borra la base entera, ejecuta migraciones y semilla, y
comprueba que la aplicación funciona igual. Si algo se rompe, hay estado que no
está en las migraciones ni en la semilla.

---

**Cuando termines el proyecto, avísame. Hacemos la validación semanal interactiva.** 🎯

---

## 🔜 PUNTO DE SÍNTESIS

Esta semana **no dispara un Proyecto Integrador**. El siguiente es PS-4, tras
la Semana 16.

Y hay una razón concreta para esperar: al terminar esta semana tienes una
aplicación completa —interfaz, servidor, persistencia— pero **de un solo
usuario**. Todo es tuyo, todo es visible, no hay conflicto posible.

La Semana 16 agrega usuarios reales, y con ellos una clase de problema que
esta semana plantea y no resuelve: el mini-ejercicio del Día 4 pregunta qué
pasa si dos personas reservan el último cupo a la vez. Ese cabo suelto es
deliberado, y PS-4 es donde se cierra.

---

> ### 📘 PRÓXIMA SEMANA
> Pendiente de definir. Por la narrativa Nexus, lo siguiente sería formularios y
> validación (React Hook Form + Zod), que completa lo que esta semana dejó a medias:
> los datos ahora persisten, pero nada valida su forma antes de entrar.
>
> Hacer la Fase 0 antes de generarlo.

---

*Semana 14 — Prisma y PostgreSQL*
*Formato v4 — Constitución v1.3 · Protocolo QA con Fase 6b*
*Óscar — Full Stack Developer en formación 🇨🇱*
