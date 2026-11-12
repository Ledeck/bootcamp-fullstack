# 📘 BOOTCAMP SEMANA 12
## Next.js · App Router · Server y Client Components · Rutas · Server Actions

---

```
ACTA DE GENERACIÓN
Fecha de generación: julio 2026
Semana en curso de Óscar al generar: 04 (PS-1 en curso)
Distancia estimada hasta el uso: ~7 meses
Fases ejecutadas: 0, 1, 2, 3, 4, 5, 6, 6b, 7, 8
Fase 1 — fuentes: documentación oficial de Next.js (nextjs.org/docs),
         Vercel Academy y notas de versión 16.x, consultadas en julio 2026
Versión de referencia: Next.js 16.2.x
Bloque perecedero: ALTO RIESGO — regenerar sí o sí antes de usar
PARCHE 2026-08-06: referencias a PS-5 eliminadas. Ese proyecto nunca existió.
                   El siguiente punto de síntesis es PS-4, tras la Semana 16
Constitución aplicada: v1.3 (enmiendas 1-10)
```

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_12.md` completa.
> **Recuerda:** cuando termines cada día, avísame para validar antes de continuar.

---

## ⏱ BLOQUE PERECEDERO — REGENERAR ANTES DE USAR

```
Verificado: julio 2026 · Next.js 16.2.x
```

Next.js es la tecnología que más rápido cambia de todo tu stack. Este bloque
tiene fecha de caducidad real, no teórica.

```bash
npx create-next-app@latest nexus-web
```

Respuestas a las preguntas del asistente:

```
TypeScript          → Yes
ESLint              → Yes
Tailwind CSS        → No     ← decisión deliberada, ver nota de alcance
App Router          → Yes
Turbopack           → Yes
import alias (@/*)  → Yes
```

```bash
cd nexus-web
npm run dev
```

Abre `http://localhost:3000`. Borra el contenido de `app/page.tsx` y empieza
de cero.

**Verificar antes de usar esta semana:** que `create-next-app` siga preguntando
lo mismo, y que `params` siga siendo una Promise (ver Día 3). Si algo no calza,
lo que cambió es el framework, no tu código.

---

## ⚠️ NOTAS DE ALCANCE

### Sin Tailwind, otra vez

La plantilla por defecto de Next.js incluye Tailwind. Lo desactivamos a
propósito: esta semana ya cambia dónde se ejecuta tu código, y sumar un sistema
de estilos nuevo encima duplicaría la carga sin aportar a ninguna validación.

Sigues con el CSS de la Semana 8. Tailwind entra en la Semana 13, sobre una base
que ya funciona.

### Sin base de datos todavía

Los datos siguen viviendo en archivos `.ts`, como hasta ahora. Que un Server
Component *pueda* leer una base de datos no significa que esta semana lo haga.
Eso llega más adelante.

Lo que sí cambia es **dónde se leen esos archivos**: en el servidor, antes de que
el navegador reciba nada.

### Esta semana desaprendes algo

En la Semana 10 aprendiste `useEffect` con una advertencia explícita: no lo uses
para pedir datos. Esta semana ves por qué. La forma correcta —pedir datos en el
servidor— es tan distinta que si hubieras fijado el hábito anterior, ahora
tendrías que romperlo.

---

## 🗓 DÍA 1 — EL APP ROUTER

### 🎯 Objetivo
Entender por qué la estructura de carpetas define las rutas, y montar el esqueleto
de la aplicación.

---

### 📖 El problema real

Tu dashboard de las Semanas 10 y 11 es **una sola pantalla**. Todo vive en la
misma URL: `localhost:5173`. Si el gerente de TerraMater quiere mandarle a un
colega el detalle de Torres del Paine, no puede: no hay dirección que copiar.

Y si recarga la página estando en el panel de detalle, vuelve al catálogo.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con estado. Guardas qué vista está activa y renderizas según eso:

```tsx
const [vista, setVista] = useState("catalogo");

{vista === "catalogo" && <Catalogo />}
{vista === "detalle" && <Detalle id={idSeleccionado} />}
```

Es exactamente lo que hiciste en la Semana 11 para cambiar entre módulos.

---

### 📖 Por qué esa solución es insuficiente

**La URL no describe nada.** Siempre es la misma, así que no se puede compartir,
ni guardar en favoritos, ni encontrar en Google. El botón "atrás" del navegador
sale de la aplicación en vez de volver a la vista anterior.

**Todo se descarga siempre.** El navegador recibe el código de todas las vistas
aunque el usuario solo mire una.

**Y el problema de fondo:** la pantalla se arma *después* de que llega el
JavaScript. El usuario ve un rectángulo en blanco, espera, y entonces aparece
todo. Un buscador que visite tu página encuentra un `<div>` vacío.

---

### 📖 El App Router como solución natural

Next.js resuelve las rutas con **carpetas**. No hay configuración ni tabla de
rutas: la estructura de archivos *es* la estructura de URLs.

```
app/
├── layout.tsx                   ← envuelve todo
├── page.tsx                     ← /
├── expediciones/
│   ├── page.tsx                 ← /expediciones
│   └── [id]/
│       └── page.tsx             ← /expediciones/EXP001
└── reservas/
    └── page.tsx                 ← /reservas
```

Crear la carpeta `reservas/` con un `page.tsx` dentro **es** crear la ruta
`/reservas`. No hay paso dos.

---

### 📖 Cómo funciona

Next.js lee la carpeta `app/` al arrancar y construye el mapa de rutas a partir
de los nombres de archivo. Cada nombre reservado tiene un significado fijo:

| Archivo | Rol |
|---|---|
| `page.tsx` | Convierte la carpeta en una ruta accesible |
| `layout.tsx` | Envuelve la página y todo lo que cuelgue debajo |
| `loading.tsx` | Se muestra mientras la página carga |
| `error.tsx` | Se muestra si algo falla |
| `not-found.tsx` | Se muestra al llamar `notFound()` |

**Una carpeta sin `page.tsx` no es una ruta.** Puedes usar carpetas solo para
organizar archivos, y no aparecerán como URLs.

---

### 📖 Los layouts y por qué importan

```tsx
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <nav>
          <Link href="/expediciones">Catálogo</Link>
          <Link href="/reservas">Reservas</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

El layout raíz es obligatorio y es el único sitio donde escribes `<html>` y
`<body>`.

**Lo importante:** al navegar de `/expediciones` a `/reservas`, el layout **no se
vuelve a montar**. Solo cambia lo que está en `{children}`. El menú conserva su
estado, su scroll, sus animaciones.

Y esto es composición pura — la de la Semana 11. `children` es la misma prop de
siempre. Next.js no inventó nada: usó lo que React ya tenía.

---

### 📖 Por qué funciona así

> **La URL es el estado principal de una aplicación web.**
> Qué está viendo el usuario debe poder leerse en la barra de direcciones.

De ahí sale casi todo lo demás: si la URL identifica lo que se ve, entonces se
puede compartir, guardar, indexar, y el botón atrás funciona sin que programes
nada.

En tu dashboard ese estado vivía en un `useState` invisible. Aquí vive en la URL,
que es pública y persistente.

---

### 📖 Errores frecuentes

```
❌ app/expediciones/index.tsx      → el nombre es page.tsx
❌ app/Expediciones/page.tsx       → la URL sería /Expediciones, con mayúscula
❌ un layout.tsx sin {children}    → las páginas no se renderizan
❌ <html> o <body> fuera del layout raíz
```

---

### 📖 Mini-ejercicio de comprensión

Dada esta estructura, ¿qué URLs existen y cuáles no?

```
app/
├── page.tsx
├── componentes/
│   └── Tarjeta.tsx
├── guias/
│   └── page.tsx
└── operaciones/
    └── asignaciones/
        └── page.tsx
```

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — esqueleto de rutas

Crea la estructura: `/` (inicio), `/expediciones`, `/reservas`, `/operaciones`.
Cada página muestra por ahora solo un `<h1>` con su nombre.

**Ejercicio 2** — layout raíz

Barra de navegación con `<Link>` a las cuatro rutas, presente en todas. Un pie de
página con el nombre de Nexus.

**Ejercicio 3** — layout anidado

Un `layout.tsx` dentro de `expediciones/` que agregue un subtítulo. Navega entre
rutas y comprueba en qué momento aparece y en cuál no.

**Ejercicio 4** — demuestra la diferencia

Cambia un `<Link>` por un `<a href>`. Navega con cada uno y observa la pestaña
del navegador y la barra de red de las DevTools.

Documenta en un comentario qué diferencia viste y por qué ocurre.

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — SERVER COMPONENTS Y CLIENT COMPONENTS

### 🎯 Objetivo
Entender dónde se ejecuta cada componente, y decidir la frontera con criterio.

---

### 📖 El problema real

Tu página de expediciones muestra las 8 tarjetas. Ese código —el `map`, el
formateo de precios, la lógica de la insignia de dificultad— hoy viaja completo
al navegador del usuario y se ejecuta ahí.

¿Por qué? Los datos no cambian, nadie interactúa con ellos, y el resultado es
siempre el mismo HTML.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con React puro no puedes. Todo componente se ejecuta en el navegador; es la única
opción que existe.

---

### 📖 Por qué eso es insuficiente

Tres costos que arrastras sin verlos.

**El usuario descarga código que no necesita.** Si formateas fechas con una
librería, esa librería viaja entera al navegador aunque el resultado sea un
string fijo.

**El usuario espera dos veces.** Primero a que llegue el JavaScript, después a
que se ejecute. Antes de eso ve una pantalla en blanco.

**No puedes tocar nada privado.** Una clave de API o una conexión a base de datos
en un componente sería visible para cualquiera que abra las DevTools.

---

### 📖 Los Server Components como solución natural

> **Todo componente dentro de `app/` se ejecuta en el servidor por defecto.**

```tsx
// app/expediciones/page.tsx — Server Component, sin marcar nada
import { expediciones } from "@/datos/expediciones";

export default function PaginaExpediciones() {
  return (
    <div>
      {expediciones.map(function (expedicion) {
        return <TarjetaExpedicion key={expedicion.id} expedicion={expedicion} />;
      })}
    </div>
  );
}
```

Este componente se ejecuta en el servidor. Al navegador le llega el HTML ya
armado. El `map`, el array de expediciones y la lógica de la tarjeta **nunca
salen del servidor**.

Y como corre en el servidor, puede ser `async`:

```tsx
export default async function PaginaExpediciones() {
  const expediciones = await obtenerExpediciones();
  return <Lista datos={expediciones} />;
}
```

Sin `useEffect`, sin estado de carga, sin manejo de error en el cliente.

---

### 📖 Cuándo necesitas el navegador

Un filtro con botones necesita responder a clics. Eso solo puede pasar donde está
el usuario:

```tsx
"use client";

import { useState } from "react";

export default function FiltroTipo() {
  const [tipo, setTipo] = useState("todos");
  return <button onClick={() => setTipo("kayak")}>Kayak</button>;
}
```

La directiva va en la **primera línea del archivo**, antes de los imports.

---

### 📖 Cómo funciona la frontera

Y aquí está lo que más se malinterpreta:

> **`"use client"` no marca un archivo. Marca una frontera.**

Todo lo que ese componente importe se vuelve cliente también, y todo lo que
importen esos, en cascada hacia abajo.

```
app/layout.tsx                    Server
└── app/page.tsx                  Server
    ├── ListaExpediciones.tsx     Server
    │   └── Tarjeta.tsx           Server
    └── Filtro.tsx  "use client"  Client  ← frontera
        └── Boton.tsx             Client  ← arrastrado, aunque no lo diga
```

**Consecuencia práctica:** si pones `"use client"` en el layout raíz, tu
aplicación entera se vuelve cliente y pierdes todo el beneficio. La directiva va
**lo más abajo posible**: en el componente que realmente necesita interactividad,
no en el que lo contiene.

---

### 📖 Qué puede cada uno

| | Server | Client |
|---|---|---|
| `async` / `await` | ✅ | ❌ |
| Base de datos, variables de entorno, secretos | ✅ | ❌ |
| `useState`, `useEffect`, `useContext` | ❌ | ✅ |
| `onClick`, `onChange` | ❌ | ✅ |
| `window`, `localStorage` | ❌ | ✅ |
| JavaScript enviado al navegador | ninguno | sí |

---

### 📖 Las dos direcciones no son simétricas

**Un Server Component puede renderizar un Client Component** y pasarle props:

```tsx
// Server
export default async function Pagina() {
  const expediciones = await obtener();
  return <FiltroInteractivo expediciones={expediciones} />;   // Client
}
```

**Pero solo datos serializables.** Números, strings, objetos, arrays: sí.
Funciones: no. Una función no se puede convertir a texto para cruzar la red.

**Un Client Component no puede importar un Server Component.** Pero sí puede
recibirlo como `children`:

```tsx
// Server
<PanelCliente>
  <ContenidoServidor />     {/* se renderiza en el servidor y se pasa ya hecho */}
</PanelCliente>
```

Otra vez la composición de la Semana 11, ahora como única salida a una
restricción del framework.

---

### 📖 Por qué funciona así

> **Server Components = lo que el usuario ve.
> Client Components = lo que el usuario toca.**

Si eso no basta para decidir, pregúntate: *si le quito todo el JavaScript a esta
página, ¿sigue sirviendo?* Lo que sigue sirviendo puede ser servidor.

---

### 📖 Errores frecuentes

```
❌ useState en un Server Component
   → "useState only works in Client Components"

❌ onClick en un Server Component
   → "Event handlers cannot be passed to Client Component props"

❌ "use client" después de los imports
   → tiene que ser la PRIMERA línea del archivo

❌ pasar una función como prop de Server a Client
   → "Functions cannot be passed directly to Client Components"

❌ "use client" en el layout raíz
   → no da error, pero anula todo el beneficio
```

Los mensajes de error de Next.js en esta área son buenos. Léelos: casi siempre
dicen exactamente qué falta.

---

### 📖 Mini-ejercicio de comprensión

Clasifica cada uno como Server o Client, y justifica:

```
a) Tarjeta que muestra nombre y precio de una expedición
b) Botón que abre un panel lateral
c) Página que lee las reservas y calcula ingresos totales
d) Contador de personas con botones + y −
e) Layout con la barra de navegación (enlaces, sin menú desplegable)
f) Resumen ejecutivo con cifras calculadas
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — migrar el catálogo

Trae `TarjetaExpedicion` y la lista de la Semana 10. Ambos deben quedar como
Server Components: sin estado, sin eventos.

**Ejercicio 2** — la frontera mínima

Migra el filtro por tipo. Solo el componente del filtro lleva `"use client"`; la
lista y las tarjetas siguen en el servidor.

Pista: si el filtro es cliente pero la lista es servidor, ¿dónde vive el estado
del filtro? Hay más de una respuesta válida. Elige una y justifícala.

**Ejercicio 3** — compruébalo

Abre las DevTools, pestaña Network, y mira el HTML que llega en la petición
inicial. Busca el nombre de una expedición.

¿Está en el HTML, o aparece después? Compáralo con lo que veías en el proyecto
Vite de la Semana 10. Documenta la diferencia.

**Ejercicio 4** — rompe la frontera a propósito

Pon `"use client"` en el layout raíz. Observa qué cambia en el HTML inicial.
Quítalo. Documenta qué perdiste y por qué.

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — DATOS Y RUTAS DINÁMICAS

### 🎯 Objetivo
Obtener datos en el servidor y crear rutas que identifican un recurso.

---

### 📖 El problema real

Cada expedición necesita su propia URL: `/expediciones/EXP001`. Ocho
expediciones, y mañana veinte. No vas a crear una carpeta por cada una.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con el Día 1: una carpeta por expedición. Ocho carpetas con ocho `page.tsx` casi
idénticos.

Es el mismo argumento de las ocho tarjetas de la Semana 10: lo que varía es el
contenido, no la estructura.

---

### 📖 Las rutas dinámicas como solución natural

Una carpeta entre corchetes captura un segmento variable:

```
app/expediciones/[id]/page.tsx     →  /expediciones/EXP001
                                   →  /expediciones/EXP007
                                   →  cualquier valor
```

Next.js pasa ese valor al componente por la prop `params`.

---

### 📖 La trampa más importante de la semana

```tsx
export default async function PaginaExpedicion({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

Fíjate en el tipo: `Promise<{ id: string }>`. Y en el `await`.

> **Desde Next.js 15, `params` y `searchParams` son Promises.**

```tsx
const id = params.id;          // ❌ params es una Promise, no un objeto
const { id } = await params;   // ✅
```

**Por qué te va a morder:** casi todo el material de Next.js que encuentres es de
antes de este cambio y escribe `params.id` directo. Vas a copiar un ejemplo que
parece correcto y va a fallar.

El error dice que `params` es una Promise y debe desenvolverse con `await` o
`React.use()`. Cuando lo veas, ya sabes.

**En un Client Component** no puedes usar `await`, porque no pueden ser `async`.
Ahí entra el hook `use()` de la Semana 11:

```tsx
"use client";
import { use } from "react";

export default function Detalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
}
```

Ese es el caso real que justificaba conocerlo.

---

### 📖 Manejar lo que no existe

`/expediciones/EXP999` no corresponde a nada. Sin manejo, el código explota:

```tsx
import { notFound } from "next/navigation";

const expedicion = expediciones.find(function (e) {
  return e.id === id;
});

if (!expedicion) {
  notFound();
}
```

`notFound()` corta el renderizado y muestra `not-found.tsx`.

> ⚠ **Trampa:** `notFound()` y `redirect()` funcionan **lanzando una excepción**
> internamente. Dos consecuencias: no pongas código después esperando que corra,
> y no las envuelvas en un `try/catch` genérico — atraparías la señal de Next.js
> y romperías el mecanismo.

---

### 📖 Obtener datos en el servidor

```tsx
export default async function Pagina() {
  const respuesta = await fetch("https://api.ejemplo.cl/expediciones");
  const expediciones = await respuesta.json();

  return <Lista datos={expediciones} />;
}
```

**Compáralo con lo que habrías escrito en la Semana 10:** un `useState` para los
datos, otro para cargando, otro para el error, un `useEffect` con su array de
dependencias, y el manejo de la petición que llega cuando el componente ya se
desmontó.

Aquí son tres líneas. Esta es la razón por la que en la Semana 10 te dije que no
aprendieras aquel patrón.

**Sobre el caché en Next.js 16:** es **opt-in**. Por defecto los datos se piden
de nuevo en cada petición. Si quieres cachear, lo pides:

```tsx
fetch(url, { next: { revalidate: 3600 } });
```

En Next.js 14 era al revés —cacheaba todo por defecto— y generó mucha confusión.
Si un tutorial habla de "desactivar el caché agresivo", es de esa época.

---

### 📖 Mini-ejercicio de comprensión

```tsx
export default function Pagina({ params }: { params: { id: string } }) {
  const expedicion = buscar(params.id);
  return <h1>{expedicion.nombre}</h1>;
}
```

Tres problemas. Encuéntralos antes de ejecutar.

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — ruta dinámica

`app/expediciones/[id]/page.tsx` que muestre el detalle completo: datos de la
expedición, clientes con reserva confirmada, cupos ocupados y porcentaje.

**Ejercicio 2** — enlazar

Cada tarjeta del catálogo enlaza a su detalle con `<Link>`. Comprueba que la URL
cambia y que puedes recargar la página estando en el detalle.

Eso último es lo que tu dashboard de la Semana 10 no podía hacer.

**Ejercicio 3** — no encontrado

Maneja el caso de un `id` inexistente con `notFound()` y crea un `not-found.tsx`
con un enlace de vuelta al catálogo. Pruébalo con `/expediciones/EXP999`.

**Ejercicio 4** — filtros en la URL

Usa `searchParams` para que `/expediciones?tipo=kayak` muestre solo las de kayak.
Recuerda que también es una Promise.

Piensa qué ganaste respecto del filtro con `useState` del Día 2: ¿qué puede hacer
ahora el usuario que antes no podía?

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — CARGA, ERRORES Y METADATOS

### 🎯 Objetivo
Manejar los estados intermedios sin escribir lógica de estado.

---

### 📖 El problema real

Cuando una página del servidor tarda —porque consulta datos remotos— el usuario
ve la página anterior congelada. No sabe si su clic funcionó.

Y si algo falla, ve una pantalla en blanco.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con lo de la Semana 10: `useState` para cargando, `useState` para el error, y
condicionales en el JSX.

Pero eso es imposible aquí: los Server Components no tienen estado. Y el retraso
ocurre en el servidor, antes de que el navegador reciba nada.

---

### 📖 Los archivos especiales como solución

Next.js lo resuelve con convención de nombres. Sin estado, sin configuración.

```tsx
// app/expediciones/loading.tsx
export default function Cargando() {
  return <p>Cargando expediciones...</p>;
}
```

Existe el archivo, funciona. Next.js lo muestra automáticamente mientras el
`page.tsx` de esa carpeta se resuelve.

```tsx
// app/expediciones/error.tsx
"use client";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>No pudimos cargar las expediciones.</p>
      <button onClick={reset}>Reintentar</button>
    </div>
  );
}
```

**`error.tsx` siempre lleva `"use client"`.** Necesita el botón de reintentar, y
eso es interactividad.

---

### 📖 Cómo funciona

Por debajo, `loading.tsx` es un `<Suspense>` que Next.js coloca por ti alrededor
de la página, y `error.tsx` es un error boundary.

Los dos son mecanismos de React que existen desde antes. Next.js los expone como
archivos para que no tengas que montarlos a mano.

**Se aplican al subárbol.** Un `loading.tsx` en `expediciones/` cubre también a
`expediciones/[id]/`, salvo que esa carpeta tenga el suyo propio.

---

### 📖 Metadatos

Cada página puede declarar su título y descripción. Es lo que ve el buscador y lo
que aparece al compartir el enlace:

```tsx
export const metadata = {
  title: "Catálogo de Expediciones · Nexus",
  description: "Expediciones de turismo aventura en Chile"
};
```

Para rutas dinámicas, donde el título depende de los datos:

```tsx
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expedicion = buscar(id);
  return { title: `${expedicion.nombre} · Nexus` };
}
```

> ⚠ `generateMetadata` también recibe `params` como Promise. Mismo `await`.

**Compáralo con el Día 5 de la Semana 10:** ahí actualizabas `document.title` con
un `useEffect`. Aquí lo declaras, y el título está en el HTML antes de que llegue
cualquier JavaScript. Un buscador lo ve; con `useEffect` no lo veía.

---

### 📖 Mini-ejercicio de comprensión

Tienes `loading.tsx` en `app/expediciones/`. ¿Se muestra al navegar de
`/expediciones` a `/expediciones/EXP001`? ¿Y de `/reservas` a `/expediciones`?

Justifica antes de probarlo.

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — estados de carga

`loading.tsx` para el catálogo y otro para el detalle. Para verlos, agrega un
retraso artificial en la obtención de datos:

```typescript
await new Promise(function (resolver) {
  setTimeout(resolver, 1500);
});
```

**Ejercicio 2** — errores

`error.tsx` con botón de reintentar. Provoca un error a propósito en la página
para comprobarlo.

**Ejercicio 3** — metadatos

Título y descripción estáticos en las rutas fijas, y `generateMetadata` en la
ruta dinámica. Verifica en la pestaña del navegador y en el HTML inicial.

**Ejercicio 4** — jerarquía

Pon un `loading.tsx` en la raíz y otro en `expediciones/`. Averigua
experimentalmente cuál se usa en cada navegación y documenta la regla que
dedujiste.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — SERVER ACTIONS

### 🎯 Objetivo
Modificar datos desde el cliente sin escribir una API.

---

### 📖 El problema real

Ya muestras datos. Ahora el gerente necesita crear una reserva desde el
formulario, y que eso se guarde donde vive la información.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

El camino tradicional, y el que llevas años viendo en tutoriales:

```
1. Escribir un endpoint que reciba POST
2. En el formulario, hacer fetch a ese endpoint
3. Serializar los datos a JSON
4. Manejar la respuesta, el error y el estado de envío
5. Refrescar los datos de la pantalla
```

Cinco pasos, dos archivos, y el tipo de los datos duplicado en ambos lados.

---

### 📖 Por qué eso es más de lo necesario

**La API existe solo para cruzar la frontera.** No la necesita nadie más: no hay
app móvil ni cliente externo. Es infraestructura para hablar contigo mismo.

**Los tipos se desincronizan.** El formulario cree que manda un número; el
endpoint recibe un string. TypeScript no puede ayudarte: entre los dos hay una
red.

**Y ya tienes código corriendo en el servidor.** El componente que muestra las
reservas se ejecuta ahí. ¿Por qué la función que las guarda no puede?

---

### 📖 Las Server Actions como solución

```tsx
// app/acciones.ts
"use server";

import { revalidatePath } from "next/cache";

export async function crearReserva(datos: FormData) {
  const cliente = datos.get("cliente") as string;
  const personas = Number(datos.get("personas"));

  if (!cliente || personas < 1) {
    return { error: "Datos inválidos" };
  }

  await guardarReserva({ cliente, personas });
  revalidatePath("/reservas");
}
```

```tsx
// El formulario
import { crearReserva } from "@/app/acciones";

export default function FormularioReserva() {
  return (
    <form action={crearReserva}>
      <input name="cliente" />
      <input name="personas" type="number" />
      <button type="submit">Reservar</button>
    </form>
  );
}
```

Sin `fetch`. Sin endpoint. Sin `onSubmit`. El formulario llama a la función
directamente, y esa función se ejecuta en el servidor.

---

### 📖 Cómo funciona

Next.js crea el endpoint por ti, en tiempo de compilación. La función que
importas en el cliente no es la función real: es una referencia que, al llamarse,
manda una petición al servidor donde sí está el código.

Por eso `"use server"` es seguro: el cuerpo de esa función **nunca llega al
navegador**. Puedes poner ahí claves y conexiones a base de datos.

**Y por eso el formulario puede ser un Server Component.** Sin `onSubmit`, sin
estado: `action` acepta la función directamente. Un formulario así funciona
incluso antes de que cargue el JavaScript.

---

### 📖 `revalidatePath` — la trampa

```tsx
revalidatePath("/reservas");
```

> ⚠ Después de modificar datos hay que avisar a Next.js. Si no, la página sigue
> mostrando lo anterior y **parece que la acción no funcionó**.
>
> Es el bug número uno con Server Actions: la acción sí corrió, los datos sí
> cambiaron, pero la pantalla no se enteró.

---

### 📖 Las dos directivas no son opuestas

```
"use client"  → marca la frontera hacia el navegador
"use server"  → marca funciones que corren en el servidor aunque las
                invoque el cliente
```

Los nombres son simétricos y el significado no. Un componente sin ninguna
directiva ya es servidor; `"use server"` no es para eso, es para funciones
invocables desde fuera.

---

### 📖 Cuándo NO usar Server Actions

```
✗ Para leer datos → un Server Component los pide directamente
✗ Cuando de verdad necesitas una API pública (móvil, terceros, webhooks)
  → ahí sí van los route handlers
✗ Para lógica que solo afecta al navegador (abrir un panel, cambiar un tema)
```

**Regla:** Server Actions para **escribir**. Server Components para **leer**.

---

### 📖 Mini-ejercicio de comprensión

Una Server Action guarda una reserva correctamente, pero la lista no se
actualiza. ¿Qué falta, y por qué no da error?

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — crear reserva

Server Action que agrega una reserva. Los datos pueden vivir en un array en
memoria del servidor; no hace falta base de datos.

**Ejercicio 2** — validar

Valida en el servidor: nombre no vacío, personas dentro del cupo. Devuelve el
error y muéstralo en pantalla.

Pregúntate por qué validar en el servidor y no solo en el cliente. Escribe tu
respuesta en un comentario.

**Ejercicio 3** — cancelar

Segunda acción que cambia el estado de una reserva a cancelada, con su
`revalidatePath`.

**Ejercicio 4** — provoca el bug

Quita el `revalidatePath` de una acción. Créala, comprueba que la pantalla no
cambia, recarga a mano y comprueba que sí se guardó.

Documenta la experiencia. Este ejercicio es sobre reconocer el síntoma cuando te
pase de verdad.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO DE LA SEMANA

### 🏆 Nexus Web — El catálogo en la web

> Nexus deja de ser una pantalla y se convierte en un sitio. Cada expedición
> tiene su dirección, el contenido llega ya renderizado desde el servidor, y el
> gerente puede compartir un enlace por WhatsApp.
>
> **Alcance:** catálogo, detalle y una mutación. La migración completa del
> sistema y el despliegue llegan más adelante — no en esta semana.

---

### 📋 Lo que debe hacer

**1. Rutas**
- `/` — inicio con resumen
- `/expediciones` — catálogo completo
- `/expediciones/[id]` — detalle de una expedición
- `/reservas` — listado de reservas

**2. Server Components por defecto**
- El catálogo, el detalle y los cálculos se ejecutan en el servidor
- Solo llevan `"use client"` los componentes que responden a clics

**3. Filtros en la URL**
- `/expediciones?tipo=kayak&dificultad=alta` filtra el catálogo
- Los filtros se leen con `searchParams` en el servidor
- El enlace filtrado se puede copiar y compartir

**4. Detalle completo**
- Datos de la expedición, clientes con reserva confirmada, ocupación
- `notFound()` para ids inexistentes, con su `not-found.tsx`
- Título de la pestaña con el nombre de la expedición

**5. Una mutación con Server Action**
- Crear una reserva desde el formulario
- Validación en el servidor
- La lista se actualiza sin recargar a mano

**6. Estados intermedios**
- `loading.tsx` en catálogo y detalle
- `error.tsx` con reintentar
- Metadatos en todas las rutas

---

### 📋 Requisitos técnicos

```
✅ Máximo 3 componentes con "use client" en todo el proyecto
✅ Ningún useEffect para obtener datos
✅ params y searchParams siempre con await
✅ Los cálculos de ocupación e ingresos ocurren en el servidor
✅ Lógica de negocio en funciones puras, fuera de los componentes
✅ Precios con .toLocaleString("es-CL")
✅ Cero any
❌ Sin "use client" en el layout raíz
❌ Sin <a href> para rutas internas
❌ Sin fetch desde el navegador hacia tus propios datos
```

El límite de **3 componentes cliente** es el requisito que más va a costar, y es
deliberado. Si necesitas un cuarto, casi seguro estás poniendo la frontera más
arriba de lo necesario.

---

### 📋 Estructura sugerida

```
app/
├── layout.tsx
├── page.tsx
├── acciones.ts
├── not-found.tsx
├── expediciones/
│   ├── page.tsx · loading.tsx · error.tsx
│   └── [id]/
│       └── page.tsx · loading.tsx
└── reservas/
    └── page.tsx
componentes/
├── servidor/       TarjetaExpedicion · ResumenOcupacion
└── cliente/        FiltroTipo · FormularioReserva
datos/              expediciones.ts · reservas.ts
logica/             analisis.ts
tipos/              entidades.ts
```

Separar `servidor/` y `cliente/` no es obligatorio en Next.js. Se sugiere para
que la frontera sea visible mientras aprendes.

---

### 💡 Las dos únicas pistas

**Pista 1** — Para los filtros en la URL: el componente que muestra los botones
necesita ser cliente para responder a clics, pero el filtrado ocurre en el
servidor leyendo `searchParams`. Piensa qué hace exactamente el botón. No es
guardar estado.

**Pista 2** — El formulario de reserva puede ser un Server Component. Si te
encuentras poniéndole `"use client"`, pregúntate qué necesita el navegador que
`action={...}` no resuelva.

---

### ✅ Criterios de aprobación

```
□ Corre sin errores ni advertencias en consola
□ Las cuatro rutas funcionan y se pueden recargar directamente
□ El nombre de una expedición aparece en el HTML inicial (Network → Response)
□ Los filtros viven en la URL y el enlace se puede compartir
□ /expediciones/EXP999 muestra not-found, no un error
□ La Server Action crea la reserva y la lista se actualiza sola
□ Máximo 3 "use client"
□ Cero any
□ Subido a GitHub con commit descriptivo
```

**Verificación cruzada:** los números de ocupación e ingresos deben coincidir con
los de PS-1. Tercera vez que calculas lo mismo en un entorno distinto — si los
tres coinciden, la lógica es sólida.

---

**Cuando termines el proyecto, avísame. Hacemos la validación semanal interactiva.** 🎯

---

## 🔜 LO QUE VIENE DESPUÉS

Esta semana **no dispara un Proyecto Integrador**. El siguiente punto de
síntesis es PS-4, tras la Semana 16.

Lo que queda fuera de este proyecto y llegará después:

```
Este proyecto (Día 6)              Más adelante
─────────────────────              ──────────────────────────────────
Catálogo, detalle, una mutación    Migración completa de los módulos
                                   de las Semanas 10 y 11
Datos en archivos                  Base de datos real (Semana 14)
Corre en localhost                 Desplegado, con URL pública
Una Server Action                  Todas las mutaciones del sistema
Sin usuarios                       Autenticación y permisos (Semana 16)
```

El salto que falta es que **el sistema deje de vivir en tu máquina**. Cuando
cualquiera con el enlace pueda usarlo, aparecen problemas que en localhost no
existen: errores reales, rutas inexistentes, datos que no llegan y usuarios que
no eres tú.

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-12/
└── nexus-web/
    ├── app/
    ├── componentes/
    ├── datos/ · logica/ · tipos/
    ├── package.json
    └── README.md
```

Proyecto nuevo, no continuación del de Vite. La migración del código anterior es
parte del trabajo — y descubrir qué se puede reutilizar tal cual y qué no, es
parte del aprendizaje.

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 13:** Tailwind CSS y shadcn/ui — sistema de estilos y componentes.
>
> Pendiente de generar.

---

*Semana 12 — Next.js App Router*
*Formato v4 — Constitución v1.3 · Protocolo QA con Fase 6b*
*Óscar — Full Stack Developer en formación 🇨🇱*
