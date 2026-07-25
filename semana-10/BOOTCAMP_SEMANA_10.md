# 📘 BOOTCAMP SEMANA 10
## React · Componentes · JSX · Props · Estado · Efectos

---

```
ACTA DE GENERACIÓN
Fecha de generación: julio 2026
Semana en curso de Óscar al generar: 04 (Proyecto Integrador PS-1 en curso)
Distancia estimada hasta el uso: ~5 meses
Fases ejecutadas: 0, 1, 2, 3, 4, 5, 6, 6b, 7, 8
Fase 1 — fuentes consultadas: documentación oficial de React y
         ecosistema Vite/React, consultadas en julio 2026
Bloque perecedero verificado el: julio 2026 — REGENERAR antes de usar
Constitución aplicada: v1.2 (enmiendas 1-9)
```

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_10.md` completa.
> **Recuerda:** cuando termines cada día, avísame para validar antes de continuar.

---

## ⏱ BLOQUE PERECEDERO — verificar antes de usar

```
Generado y verificado: julio 2026
Este es el único bloque del documento que caduca. Regenéralo al llegar
a esta semana; el resto del contenido es duradero.
```

```bash
npm create vite@latest nexus-dashboard -- --template react-ts
cd nexus-dashboard
npm install
npm run dev
```

Borra el contenido de ejemplo de `src/App.tsx` y empieza de cero.
Los archivos con JSX llevan extensión `.tsx`.

**Qué verificar:** que el comando de Vite siga siendo ese y qué versión de React
trae la plantilla (esperado: 19.x).

---

## ⚠️ NOTAS DE ALCANCE — LÉELAS ANTES DEL DÍA 1

### Esta semana no usa Tailwind

Los estilos son CSS plano y mínimos. El objetivo es el modelo mental de React, y
aprender un sistema de clases utilitarias al mismo tiempo duplica la carga
cognitiva sin aportar a ninguna validación de esta semana. Tailwind entra cuando
llegues a Next.js.

Si un componente se ve feo, está bien. Se ve feo y funciona correctamente.

### Esta semana es de SOLO LECTURA

El dashboard que construyes muestra, filtra y analiza datos. No los modifica.

Escribir datos —crear una reserva, actualizar cupos, validar formularios contra
reglas de negocio— es el salto del **Proyecto Integrador PS-4**, que se dispara
al terminar esta semana. Los ejercicios de los Días 3 y 4 te preparan para eso:
son las piezas sueltas que PS-4 integra.

Esta separación es deliberada. Leer y escribir son dos modelos mentales
distintos, y mezclarlos en el mismo proyecto haría que un fallo no te dijera cuál
de los dos falló.

---

## 🗓 DÍA 1 — COMPONENTES Y JSX

### 🎯 Objetivo
Entender por qué existen los componentes y escribir JSX sin pelear con su sintaxis.

---

### 📖 El problema real

TerraMater quiere mostrar su catálogo de 8 expediciones en una página web. Cada
expedición se muestra en una tarjeta con nombre, tipo, precio, duración y
dificultad.

Ocho tarjetas. Idénticas en estructura, distintas en contenido.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Piénsalo treinta segundos antes de seguir leyendo. Con JavaScript puro y el DOM,
tu solución probablemente sería un `map` sobre el array generando strings de
HTML, y luego un `innerHTML` para inyectarlos.

Algo así:

```javascript
const html = expediciones
  .map((exp) => `<div class="tarjeta"><h3>${exp.nombre}</h3></div>`)
  .join("");
document.querySelector("#catalogo").innerHTML = html;
```

Funciona. Y es exactamente lo que se hacía antes de React.

---

### 📖 Por qué esa solución es insuficiente

Tres problemas, en orden de gravedad.

**El primero es la actualización.** Cuando el usuario filtra por tipo "kayak",
tienes que regenerar todo el string y volver a inyectarlo. El navegador destruye
los ocho nodos y crea dos nuevos. Si el usuario había escrito algo en un input
dentro de una tarjeta, se pierde. Si había una animación a medias, se corta.

**El segundo es que el HTML es un string.** El editor no te ayuda: no hay
autocompletado, no hay chequeo de tipos, una etiqueta mal cerrada no da error
hasta que ves la pantalla rota. Y si el nombre de una expedición contiene `<`,
tienes un agujero de seguridad.

**El tercero es que la estructura y el comportamiento viven separados.** El HTML
de la tarjeta está en un string, el manejador del clic está en otro archivo, y
nada obliga a que se mantengan sincronizados.

---

### 📖 El componente como solución natural

React invierte la relación. En vez de que tú manipules el DOM, tú describes qué
debería verse para un estado dado, y React se encarga de hacer que el DOM
coincida con esa descripción.

```tsx
function TarjetaExpedicion() {
  return (
    <div className="tarjeta">
      <h3>Torres del Paine</h3>
      <p>trekking · 7 días</p>
      <p>$450.000</p>
    </div>
  );
}
```

Eso es un componente: una función que retorna la descripción de un pedazo de
interfaz.

---

### 📖 Cómo funciona por dentro

El JSX no es HTML y no es magia. Es azúcar sintáctica. Antes de llegar al
navegador, esto:

```tsx
<h3 className="titulo">Torres del Paine</h3>
```

se convierte en una llamada a función que produce un objeto JavaScript común,
más o menos así:

```javascript
{ type: "h3", props: { className: "titulo", children: "Torres del Paine" } }
```

Ese objeto es una **descripción** de un `<h3>`, no un `<h3>`. React construye un
árbol completo de estas descripciones, lo compara con el árbol del render
anterior, calcula la diferencia mínima, y solo toca los nodos reales del DOM que
cambiaron.

---

### 📖 Por qué funciona así

Aquí está el modelo mental que tienes que llevarte, porque explica casi todo lo
que verás el resto de la semana:

> **Tu componente no dibuja la pantalla. Describe cómo debería verse la pantalla.
> React decide qué tocar del DOM real.**

De ahí salen consecuencias que si no entiendes ahora te van a confundir en el Día 3:

- Tu función de componente se ejecuta **muchas veces**, no una. Cada vez que algo
  cambia, React la vuelve a llamar completa.
- Por eso no puedes guardar información en una variable local del componente:
  esa línea se vuelve a ejecutar en cada llamada.
- Por eso tampoco manipulas el DOM a mano. Si tú tocas el DOM y React también,
  ambos pelean por el mismo nodo y React gana.

---

### 📖 Sintaxis mínima necesaria

Las reglas están completas en la Cheat Sheet, sección 2. Las tres que más te van
a morder al principio:

1. Un solo elemento raíz por `return` (usa `<>...</>` si no quieres un `div` extra)
2. Toda etiqueta se cierra: `<img />`, `<br />`, `<input />`
3. `className` en vez de `class`, `htmlFor` en vez de `for`

Y el nombre del componente **siempre en mayúscula**. React distingue tus
componentes de las etiquetas HTML exactamente por eso.

---

### 📖 Errores frecuentes

```tsx
// ❌ Dos elementos raíz
function Tarjeta() {
  return (
    <h3>Nombre</h3>
    <p>Precio</p>
  );
}

// ❌ El return vacío por el punto y coma automático de JavaScript
function Tarjeta() {
  return
    <div>Contenido</div>;   // retorna undefined
}

// ✅ Paréntesis en la misma línea del return
function Tarjeta() {
  return (
    <div>Contenido</div>
  );
}
```

El segundo es traicionero y no da error: la función simplemente retorna
`undefined` y React muestra la pantalla en blanco.

---

### 📖 Mini-ejercicio de comprensión

Antes de tocar el editor, responde mentalmente:

Si un componente es una función que se ejecuta muchas veces, ¿qué pasa con esta
línea cada vez que se ejecuta?

```tsx
function Contador() {
  let clics = 0;
  return <button onClick={() => clics++}>{clics}</button>;
}
```

Guarda tu respuesta. La usamos en el Día 3.

---

### 🔗 Conexión con Next.js

En Next.js, cada archivo `page.tsx` exporta un componente exactamente igual a
estos. La diferencia es dónde se ejecutan: en Next.js muchos componentes se
ejecutan en el servidor y llegan al navegador ya renderizados. Pero la sintaxis
y el modelo mental que aprendes hoy son idénticos.

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `src/componentes/TarjetaExpedicion.tsx`

Crea un componente `TarjetaExpedicion` con los datos de Torres del Paine
escritos directamente dentro (todavía sin props). Debe mostrar nombre, tipo,
duración en días, precio formateado con `.toLocaleString("es-CL")` y dificultad.

Impórtalo en `App.tsx` y renderízalo tres veces.

**Ejercicio 2** — `src/componentes/EncabezadoNexus.tsx`

Crea un componente `EncabezadoNexus` que muestre el nombre de la plataforma y un
subtítulo. Debe usar un fragmento `<>...</>` como elemento raíz, no un `div`.
Explica en un comentario por qué el fragmento es preferible aquí.

**Ejercicio 3** — `src/componentes/Diagnostico.tsx`

Este componente tiene cinco errores. Encuéntralos sin ejecutarlo, corrígelos y
explica cada uno en un comentario:

```tsx
function diagnostico() {
  const precio = 450000;
  return
    <div class="panel">
      <h2>Estado del sistema<h2>
      <p>Precio base: {precio.toLocaleString("es-CL")}</p>
      <input type="text" value="prueba">
    </div>;
}
```

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — PROPS, LISTAS Y RENDERIZADO CONDICIONAL

### 🎯 Objetivo
Convertir un componente rígido en uno reutilizable y renderizar el catálogo completo.

---

### 📖 El problema real

Ayer renderizaste `TarjetaExpedicion` tres veces y las tres salieron idénticas —
Torres del Paine, tres veces. Necesitas ocho tarjetas con ocho contenidos
distintos.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Piénsalo. La respuesta honesta con lo que sabes hasta ayer es: crear ocho
componentes, `TarjetaTorres`, `TarjetaAndes`, `TarjetaFutaleufu`. Ocho funciones
que solo difieren en los strings.

---

### 📖 Por qué esa solución es insuficiente

Es el mismo argumento que justificó las funciones con parámetros en la Semana 2.
Ocho copias significan ocho lugares donde arreglar el mismo bug. Y si mañana
TerraMater agrega una expedición, hay que escribir código nuevo para mostrar un
dato nuevo — cuando el dato ya está en el array.

Lo que varía es el contenido, no la estructura. Eso pide un parámetro.

---

### 📖 Las props como solución natural

Las props son los parámetros del componente. La única diferencia con una función
normal es que llegan agrupadas en un objeto.

```tsx
type TarjetaExpedicionProps = {
  nombre: string;
  tipo: string;
  duracionDias: number;
  precioBase: number;
  dificultad: "baja" | "media" | "alta";
};

function TarjetaExpedicion({
  nombre,
  tipo,
  duracionDias,
  precioBase,
  dificultad
}: TarjetaExpedicionProps) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      <p>{tipo} · {duracionDias} días</p>
      <p>${precioBase.toLocaleString("es-CL")}</p>
      <span>{dificultad}</span>
    </div>
  );
}
```

Fíjate en la firma: React le pasa **un solo objeto** al componente, y tú lo
desestructuras en el parámetro. Esto es equivalente y a veces lo verás así:

```tsx
function TarjetaExpedicion(props: TarjetaExpedicionProps) {
  return <h3>{props.nombre}</h3>;
}
```

La versión desestructurada es la convención actual.

---

### 📖 Cómo funciona y por qué son de solo lectura

Cuando React ejecuta `<TarjetaExpedicion nombre="Torres" precioBase={450000} />`,
construye el objeto `{ nombre: "Torres", precioBase: 450000 }` y llama a tu
función con él.

Ese objeto lo construye el padre en cada render. Si el hijo lo modificara, el
cambio duraría hasta el siguiente render del padre y luego desaparecería — pero
mientras tanto el padre y el hijo tendrían versiones distintas del mismo dato.

De ahí la regla:

> **El flujo de datos es de una sola dirección: de padre a hijo.
> Un componente nunca modifica las props que recibe.**

Esto es lo que hace que React sea predecible. Si un dato se ve mal en pantalla,
el culpable está en el componente que lo *creó*, no en los que lo recibieron.

---

### 📖 Renderizar la lista

Aquí no hay concepto nuevo. Es el `map` de la Semana 3, retornando JSX en vez
de un número:

```tsx
{expediciones.map((expedicion) => (
  <TarjetaExpedicion
    key={expedicion.id}
    nombre={expedicion.nombre}
    tipo={expedicion.tipo}
    duracionDias={expedicion.duracionDias}
    precioBase={expedicion.precioBase}
    dificultad={expedicion.dificultad}
  />
))}
```

**Sobre `key`:** es la única prop que no llega a tu componente. React se la
queda para sí mismo, y la usa para emparejar el elemento de este render con el
del render anterior.

El detalle de por qué el índice como key falla está en la Cheat Sheet, sección 4.
Léelo otra vez si no te convenció: te va a morder en el proyecto del Día 6,
donde la lista se filtra.

---

### 📖 Renderizado condicional

```tsx
{expediciones.length > 0 ? (
  expediciones.map((exp) => <TarjetaExpedicion key={exp.id} {...exp} />)
) : (
  <p>No hay expediciones que coincidan con el filtro.</p>
)}
```

El `{...exp}` de arriba es el spread operator aplicado a props: pasa cada
propiedad del objeto como una prop separada. Es cómodo, pero **úsalo con
cuidado** — oculta qué props recibe realmente el componente y hace que un cambio
en la forma del dato se propague en silencio. En el proyecto del Día 6 quiero
las props explícitas.

**El error del `0`** está en la Cheat Sheet sección 5. Lo repito aquí porque lo
vas a cometer:

```tsx
{expediciones.length && <Lista />}   // ❌ imprime "0" cuando está vacío
```

---

### 📖 Comparación: props vs estado

Todavía no has visto estado, pero adelanto la distinción porque mañana te va a
hacer falta:

| | Props | Estado |
|---|---|---|
| Quién lo controla | El componente padre | El propio componente |
| ¿Puede cambiarlo el componente? | No | Sí |
| ¿Provoca un nuevo render? | Sí, cuando el padre cambia | Sí, cuando lo cambias |

La pregunta que resuelve casi todos los casos: **¿este valor lo decide alguien
más, o lo decide este componente?**

---

### 📖 Mini-ejercicio de comprensión

Un componente `Filtro` recibe la lista de expediciones como prop y necesita
recordar cuál tipo eligió el usuario. ¿Cuál de los dos valores es prop y cuál no
puede serlo? Justifica.

---

### 🔗 Conexión con Next.js

En Next.js, un Server Component puede leer datos de la base de datos y pasarlos
como props a un componente de cliente. La frontera entre servidor y navegador se
cruza a través de props — exactamente esta sintaxis.

---

### 💼 CÓDIGO REAL VS CÓDIGO DE BOOTCAMP

Un bootcamp te haría escribir esto:

```tsx
function Tarjeta({ nombre, precio }) {
  return <div>{nombre} {precio}</div>;
}
```

En un equipo real verías esto:

```tsx
import type { Expedicion } from "../tipos/entidades";

type TarjetaExpedicionProps = {
  expedicion: Expedicion;
  onSeleccionar?: (id: string) => void;
};

export function TarjetaExpedicion({ expedicion, onSeleccionar }: TarjetaExpedicionProps) {
  const { id, nombre, precioBase } = expedicion;

  return (
    <article className="tarjeta" onClick={() => onSeleccionar?.(id)}>
      <h3>{nombre}</h3>
      <p>${precioBase.toLocaleString("es-CL")}</p>
    </article>
  );
}
```

Cuatro diferencias que importan:

1. **El tipo se importa, no se redefine.** `Expedicion` vive en un solo lugar —
   los tipos que construiste en la Semana 09. Si cambia la forma del dato, el
   editor marca todos los componentes afectados.
2. **Se pasa el objeto completo**, no seis props sueltas, cuando el componente
   representa a esa entidad.
3. **`article` en vez de `div`.** HTML semántico: los lectores de pantalla y los
   buscadores lo distinguen. Es lo de la Semana 08 aplicado a JSX.
4. **`export` nombrado**, no `export default`. Facilita el autocompletado y el
   renombrado automático.

Esta semana puedes escribir el estilo simple. Pero reconoce el otro cuando lo veas.

---

### 🛠 EJERCICIOS DÍA 2

Crea `src/datos/expediciones.ts` y pega ahí el array `expediciones` del
Proyecto Integrador PS-1 (los 8 objetos), exportándolo. Tipa el array usando un
`type Expedicion`.

**Ejercicio 1** — `TarjetaExpedicion` con props

Refactoriza la tarjeta del Día 1 para que reciba props tipadas y renderiza las
8 expediciones desde el array con `map` y `key` correcta.

**Ejercicio 2** — `src/componentes/EtiquetaDificultad.tsx`

Componente que recibe `dificultad` y muestra un texto y un color distinto según
el valor. Debe manejar los tres casos. Úsalo dentro de `TarjetaExpedicion`.

**Ejercicio 3** — `src/componentes/PanelCatalogo.tsx`

Componente que recibe un `titulo` (string) y `children`, y renderiza el título
seguido del contenido. Envuelve la lista de tarjetas con él.

> 🆕 **Sintaxis nueva:** para tipar `children` necesitas `React.ReactNode`.
> Definición, ejemplo y trampa en la Cheat Sheet, sección 10.

**Ejercicio 4** — condicional

Agrega a `TarjetaExpedicion` una insignia "CUPO REDUCIDO" que solo aparezca si
`cupoMaximo` es menor a 10. Luego, en la lista, muestra un mensaje si el array
de expediciones está vacío (pruébalo pasando `[]` a propósito).

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — ESTADO CON useState

### 🎯 Objetivo
Entender por qué el estado no es una variable normal y usarlo para interfaces que
responden.

---

### 📖 El problema real

TerraMater quiere que el gerente pueda filtrar el catálogo por tipo de expedición.
Clic en "kayak" → se ven solo las de kayak.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Tienes `filter` desde la Semana 3, y ya sabes pasar props. La solución evidente:

```tsx
function Catalogo() {
  let tipoSeleccionado = "todos";

  const visibles =
    tipoSeleccionado === "todos"
      ? expediciones
      : expediciones.filter((exp) => exp.tipo === tipoSeleccionado);

  return (
    <>
      <button onClick={() => (tipoSeleccionado = "kayak")}>Kayak</button>
      {visibles.map((exp) => <TarjetaExpedicion key={exp.id} ... />)}
    </>
  );
}
```

Escríbelo y pruébalo antes de seguir leyendo. Es importante que veas fallar esto
con tus propios ojos.

---

### 📖 Por qué esa solución es insuficiente

No pasa nada al hacer clic. La variable sí cambia — si pones un `console.log`
dentro del `onClick`, verás el valor nuevo. Pero la pantalla no se mueve.

Dos razones, y son las del Día 1:

**React no se entera.** Tu componente es una función que React llama. React no
vigila tus variables locales; no tiene forma de saber que algo cambió, así que
no vuelve a llamar a la función y no recalcula el JSX.

**Y aunque se enterara, el valor se perdería.** Si React volviera a ejecutar
`Catalogo()`, la primera línea sería `let tipoSeleccionado = "todos"` otra vez.
El valor viejo desaparece en cada render.

Ese era el mini-ejercicio del Día 1. Si tu respuesta fue "se reinicia a 0 cada
vez", tenías razón.

---

### 📖 useState como solución natural

El componente necesita dos cosas que no puede darse a sí mismo: **memoria que
sobreviva entre renders** y **una forma de avisarle a React que algo cambió**.

`useState` da las dos.

```tsx
import { useState } from "react";

function Catalogo() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");

  const visibles =
    tipoSeleccionado === "todos"
      ? expediciones
      : expediciones.filter((exp) => exp.tipo === tipoSeleccionado);

  return (
    <>
      <button onClick={() => setTipoSeleccionado("kayak")}>Kayak</button>
      {visibles.map((exp) => (
        <TarjetaExpedicion key={exp.id} nombre={exp.nombre} /* ... */ />
      ))}
    </>
  );
}
```

---

### 📖 Cómo funciona

`useState(valorInicial)` retorna un array de dos posiciones que desestructuras:

```tsx
const [valor, setValor] = useState(inicial);
```

Los nombres los eliges tú, porque la desestructuración es por posición. La
convención es `algo` / `setAlgo` y se respeta siempre.

La secuencia completa cuando haces clic:

```
1. Clic → se ejecuta setTipoSeleccionado("kayak")
2. React guarda "kayak" y marca el componente como "hay que volver a ejecutarlo"
3. React ejecuta Catalogo() otra vez, desde la primera línea
4. Esta vez useState("todos") NO retorna "todos" — retorna "kayak"
5. Se recalcula "visibles" con el nuevo filtro
6. React compara el JSX nuevo con el viejo y actualiza solo lo que cambió
```

El paso 4 es el que sorprende: el argumento `"todos"` solo se usa la primera vez.
En los renders siguientes React ignora ese argumento y devuelve el valor guardado.

---

### 📖 Por qué funciona así — el modelo mental

> **El estado no vive en tu componente. Vive en React.
> Tu componente lo pide en cada render y recibe una foto de ese momento.**

De aquí salen los tres comportamientos que confunden a todo el mundo:

**Uno: `setEstado` no cambia el valor de la variable en esta ejecución.**

```tsx
function manejar() {
  setCantidad(5);
  console.log(cantidad);  // imprime el valor VIEJO
}
```

`cantidad` es una constante de *este* render. No puede cambiar. El valor nuevo
llega en el siguiente render, cuando la función se ejecute de nuevo y `useState`
retorne el valor actualizado.

**Dos: dos `set` seguidos con el mismo valor base cuentan una sola vez.**

```tsx
setCantidad(cantidad + 1);   // cantidad vale 0 → pide 1
setCantidad(cantidad + 1);   // cantidad SIGUE valiendo 0 → pide 1
// resultado: 1, no 2
```

La solución es la función actualizadora, que recibe el valor pendiente más
reciente en vez del capturado:

```tsx
setCantidad((anterior) => anterior + 1);
setCantidad((anterior) => anterior + 1);
// resultado: 2
```

**Regla práctica:** si el nuevo valor depende del anterior, pasa una función.

**Tres: mutar el objeto no funciona.**

```tsx
// ❌ React no ve ningún cambio
filtros.tipo = "kayak";
setFiltros(filtros);

// ✅
setFiltros({ ...filtros, tipo: "kayak" });
```

React compara el valor viejo y el nuevo por identidad — pregunta si es el mismo
objeto en memoria, no si tiene el mismo contenido. Si mutas el original, la
respuesta es "es el mismo", y React concluye que no hay nada que repintar.

Esto es más regla que restricción: la inmutabilidad es lo que permite que la
comparación sea instantánea en vez de recorrer objetos completos.

---

### 📖 Eventos

```tsx
<button onClick={manejarClic}>Enviar</button>           // ✅ pasas la función
<button onClick={manejarClic()}>Enviar</button>         // ❌ la ejecutas al renderizar
<button onClick={() => manejarClic(id)}>Enviar</button> // ✅ con argumento
```

El segundo caso es el error clásico: la función se ejecuta durante el render, y
si dentro llama a un `set`, provocas un bucle infinito de renders.

---

### 📖 Cuándo NO usar estado

No todo valor que cambia necesita estado. Si un valor se puede **calcular** a
partir de props o de otro estado, calcúlalo:

```tsx
// ❌ Estado duplicado — dos fuentes de verdad que se pueden desincronizar
const [expediciones, setExpediciones] = useState(datos);
const [cantidadTotal, setCantidadTotal] = useState(datos.length);

// ✅ Una sola fuente de verdad
const [expediciones, setExpediciones] = useState(datos);
const cantidadTotal = expediciones.length;
```

**Regla:** el estado guarda lo mínimo indispensable. Todo lo demás se deriva.

---

### 📖 Mini-ejercicio de comprensión

```tsx
const [contador, setContador] = useState(0);

function manejar() {
  setContador(contador + 1);
  setContador(contador + 1);
  setContador((anterior) => anterior + 1);
}
```

Si `contador` vale 0 y haces clic una vez, ¿cuánto vale al final? Justifica paso
a paso antes de probarlo.

---

### 🔗 Conexión con Next.js

Un componente con `useState` es un Client Component: necesita ejecutarse en el
navegador porque responde a interacciones. En Next.js se marca con `"use client"`
en la primera línea del archivo. Los componentes sin estado ni eventos pueden
quedarse en el servidor.

---

### 🛠 EJERCICIOS DÍA 3

> Los ejercicios 1 y 3 de hoy no aparecen en el proyecto del Día 6 —
> son piezas que **PS-4 integra**. Escríbelos igual: los vas a reusar.

**Ejercicio 1** — `src/componentes/ContadorCupos.tsx` *(pieza para PS-4)*

Contador de personas para una reserva: botones `+` y `−`, valor mostrado en
pantalla. No puede bajar de 1 ni superar el `cupoMaximo` que llega por prop.
Usa la función actualizadora en ambos botones.

**Ejercicio 2** — `src/componentes/FiltroTipo.tsx`

Botones para "todos", "trekking", "kayak", "rafting", "escalada". Al hacer clic,
el catálogo muestra solo ese tipo. El botón activo debe verse distinto.

Genera la lista de botones desde los datos, no escribas los cinco a mano.

**Ejercicio 3** — `src/componentes/BuscadorExpediciones.tsx`

Input controlado que filtra el catálogo por nombre a medida que escribes.
Insensible a mayúsculas. Muestra un mensaje cuando ninguna coincide.

**Ejercicio 4** — encuentra el bug

```tsx
function ListaReservas() {
  const [reservas, setReservas] = useState([]);
  const [nombre, setNombre] = useState("");

  function agregar() {
    reservas.push({ id: Date.now(), nombre: nombre });
    setReservas(reservas);
    setNombre("");
  }

  return (
    <>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button onClick={agregar}>Agregar</button>
      <p>Total: {reservas.length}</p>
      {reservas.map((r, i) => <p key={i}>{r.nombre}</p>)}
    </>
  );
}
```

Hay **tres** problemas: uno que rompe la funcionalidad, uno que rompe el tipado
de TypeScript y uno que es una mala práctica que todavía no falla. Encuéntralos,
explica cada uno y corrige.

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — ESTADO COMPARTIDO Y FORMULARIOS

### 🎯 Objetivo
Coordinar componentes hermanos levantando el estado al ancestro común.

---

### 📖 El problema real

El dashboard tiene tres piezas: el filtro por tipo, el buscador por nombre, y la
lista de resultados. Los tres son componentes separados. La lista tiene que
mostrar lo que dicen los otros dos.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con lo del Día 3, cada componente guarda su propio estado:

```tsx
function FiltroTipo() {
  const [tipo, setTipo] = useState("todos");
  // ...
}

function ListaExpediciones() {
  // ¿cómo lee "tipo"? Está encerrado dentro de FiltroTipo.
}
```

---

### 📖 Por qué esa solución es insuficiente

El estado de un componente es privado. `ListaExpediciones` no tiene forma de leer
la variable que vive dentro de `FiltroTipo` — son dos llamadas a función
independientes, y el dato solo baja de padre a hijo, nunca de hermano a hermano.

Y no puedes "pasarlo hacia arriba": las props van en una sola dirección.

---

### 📖 Levantar el estado como solución natural

Si dos hermanos necesitan el mismo dato, el dato se muda al padre.

```tsx
function Dashboard() {
  const [tipo, setTipo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const visibles = expediciones
    .filter((exp) => tipo === "todos" || exp.tipo === tipo)
    .filter((exp) => exp.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <>
      <FiltroTipo tipoActivo={tipo} onCambiarTipo={setTipo} />
      <Buscador texto={busqueda} onCambiarTexto={setBusqueda} />
      <ListaExpediciones expediciones={visibles} />
    </>
  );
}
```

---

### 📖 Cómo funciona

Mira `FiltroTipo` ahora:

```tsx
type FiltroTipoProps = {
  tipoActivo: string;
  onCambiarTipo: (tipo: string) => void;
};

function FiltroTipo({ tipoActivo, onCambiarTipo }: FiltroTipoProps) {
  return (
    <div>
      {["todos", "trekking", "kayak", "rafting", "escalada"].map((tipo) => (
        <button
          key={tipo}
          className={tipo === tipoActivo ? "activo" : ""}
          onClick={() => onCambiarTipo(tipo)}
        >
          {tipo}
        </button>
      ))}
    </div>
  );
}
```

Ya no tiene estado. Recibe el valor actual y **una función para avisar**. No sabe
qué pasa cuando esa función se llama, ni le importa.

A un componente así se le llama **controlado**: no decide nada, solo muestra lo
que le dan y reporta lo que ocurre.

---

### 📖 Por qué funciona así

> **Los datos bajan por props. Los avisos suben por funciones.**

Esta es la única forma de comunicación entre componentes en React, y explica por
qué la convención de nombres es `onAlgo` para la prop y `manejarAlgo` para la
función que la implementa.

La ventaja práctica: cuando algo se ve mal, hay **un solo lugar** donde ese dato
existe. No tienes que preguntarte cuál de tres componentes tiene la versión
correcta.

---

### 📖 Cuándo NO levantar el estado

Levantar de más tiene un costo real: cuando el estado del padre cambia, React
vuelve a ejecutar el padre y todos sus hijos.

Si el texto de un input solo importa dentro de ese input, déjalo ahí. La regla:
**el estado vive en el componente más bajo que lo necesite** — que en la práctica
significa el ancestro común más cercano de todos los que lo usan.

---

### 📖 Formularios controlados

```tsx
const [nombre, setNombre] = useState("");
const [personas, setPersonas] = useState(1);

<input
  type="text"
  value={nombre}
  onChange={(evento) => setNombre(evento.target.value)}
/>

<select value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
  <option value="todos">Todos</option>
  <option value="kayak">Kayak</option>
</select>
```

> 🆕 **Sintaxis nueva:** `Number(evento.target.value)` para campos numéricos.
> Definición, ejemplo y dos trampas en la Cheat Sheet, sección 10. La resumo
> aquí porque la vas a necesitar hoy: `evento.target.value` es **siempre un
> string**, incluso en `<input type="number">`.

**Error típico:** poner `value` sin `onChange`. El input queda congelado: React
lo fuerza al valor del estado y las teclas no hacen nada. React te avisa en la
consola.

---

### 📖 Mini-ejercicio de comprensión

En el `Dashboard` de arriba, `visibles` se recalcula en cada render.
¿Por qué eso no es un problema de rendimiento aquí, y en qué caso sí lo sería?

---

### 🔗 Conexión con Next.js

Cuando llegues a formularios reales en el stack (React Hook Form + Zod), la
librería administra el estado por ti. Pero necesitas entender el patrón
controlado para saber qué está haciendo por debajo — y para depurarlo cuando
no haga lo que esperas.

---

### 💼 CÓDIGO REAL VS CÓDIGO DE BOOTCAMP

Bootcamp:

```tsx
const [tipo, setTipo] = useState("todos");
const [busqueda, setBusqueda] = useState("");
const [dificultad, setDificultad] = useState("todas");
const [precioMax, setPrecioMax] = useState(1000000);
```

Equipo real:

```tsx
type Filtros = {
  tipo: string;
  busqueda: string;
  dificultad: string;
  precioMax: number;
};

const FILTROS_INICIALES: Filtros = {
  tipo: "todos",
  busqueda: "",
  dificultad: "todas",
  precioMax: 1000000
};

const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIALES);

function actualizarFiltro<K extends keyof Filtros>(campo: K, valor: Filtros[K]) {
  setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
}

// Uso
actualizarFiltro("tipo", "kayak");
actualizarFiltro("precioMax", 300000);
```

Cuatro estados sueltos son cuatro props que pasar y cuatro cosas que resetear.
Un solo objeto se pasa entero, se limpia con `setFiltros(FILTROS_INICIALES)` y
se serializa a la URL cuando llegue el momento.

El genérico `<K extends keyof Filtros>` es lo que aprendiste en la Semana 09:
garantiza que `actualizarFiltro("tipo", 300000)` no compile, porque `tipo` es
`string` y no `number`.

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — `src/Dashboard.tsx`

Levanta el estado del filtro y del buscador del Día 3 a un componente
`Dashboard`. `FiltroTipo`, `Buscador` y `ListaExpediciones` quedan sin estado.
Los dos filtros deben funcionar combinados.

**Ejercicio 2** — filtro por dificultad y precio

Agrega un `<select>` de dificultad y un `<input type="range">` de precio máximo.
Los cuatro filtros se aplican simultáneamente. Muestra el conteo de resultados.

**Ejercicio 3** — `src/componentes/FormularioReserva.tsx` *(pieza para PS-4)*

Formulario controlado con nombre del cliente, expedición (select poblado desde
los datos), cantidad de personas y método de pago. Al enviar, agrega la reserva
a una lista de estado local y muestra el total a pagar formateado.

Valida antes de agregar: nombre no vacío y personas dentro del cupo de esa
expedición. Muestra el error en pantalla.

Este formulario no entra en el dashboard del Día 6 — es la pieza que PS-4
conecta con el motor de ocupación.

**Ejercicio 4** — botón limpiar

Un botón que restablece todos los filtros a su valor inicial. Debe funcionar sin
tocar cada estado por separado — piensa cómo estructurarlo para que agregar un
quinto filtro mañana no te obligue a modificar ese botón.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — useEffect: SINCRONIZACIÓN CON EL EXTERIOR

### 🎯 Objetivo
Usar `useEffect` para lo que sirve, y reconocer los casos en que usarlo es un error.

---

### ⚠️ Antes de empezar

`useEffect` es el hook peor usado de React. Durante años fue la respuesta por
defecto a "quiero hacer algo cuando el componente carga", y esa costumbre generó
una cantidad enorme de código frágil que todavía circula en tutoriales.

Hoy la posición del equipo de React es clara: **si estás alcanzando un
`useEffect`, primero pregúntate por qué**. Usarlo para pedir datos a un servidor
se considera un olor a código — para eso están los Server Components y las
librerías de datos, que verás en los meses de Next.js.

Este día enseña las dos caras: el uso correcto y, con el mismo peso, cómo
reconocer que no lo necesitas.

---

### 📖 El problema real

El dashboard filtra bien. Ahora TerraMater pide dos cosas:

1. Que la pestaña del navegador muestre cuántas expediciones hay visibles
2. Que los filtros que el gerente eligió sigan ahí si recarga la página

Ninguna de las dos se puede hacer con lo que sabes. La pestaña del navegador y
el almacenamiento local **no son parte de React**.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Lo directo sería escribirlo en el cuerpo del componente:

```tsx
function Dashboard() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const visibles = aplicarFiltros(expediciones, filtros);

  document.title = `Nexus — ${visibles.length} expediciones`;  // ← aquí

  return ( /* ... */ );
}
```

---

### 📖 Por qué esa solución es insuficiente

Funciona por accidente, y falla por tres motivos.

**El render debe ser puro.** React se reserva el derecho de ejecutar tu
componente más veces de las que esperas, de descartar el resultado, o de
ejecutarlo dos veces seguidas en desarrollo para detectar bugs. Una función que
modifica cosas fuera de sí misma no puede ejecutarse así con seguridad.

**No hay forma de limpiar.** `document.title` es inofensivo, pero si en vez de
eso abres un temporizador o te suscribes a un evento, cada render deja uno
nuevo abierto. Diez renders, diez fugas.

**No hay control sobre cuándo.** Se ejecuta siempre, aunque el valor no haya
cambiado.

---

### 📖 useEffect como solución natural

```tsx
useEffect(() => {
  document.title = `Nexus — ${visibles.length} expediciones`;
}, [visibles.length]);
```

Traducido: *después* de que React actualice la pantalla, ejecuta esto, pero solo
si `visibles.length` cambió respecto de la última vez.

---

### 📖 Cómo funciona

```tsx
useEffect(() => {
  // efecto
  return () => {
    // limpieza
  };
}, [dependencias]);
```

El orden real de los eventos:

```
1. React ejecuta tu componente y obtiene el JSX
2. React actualiza el DOM
3. El navegador pinta
4. React compara el array de dependencias con el del render anterior
5. Si algo cambió: ejecuta la limpieza del efecto anterior, luego el efecto nuevo
```

El paso 3 importa: el efecto corre **después** de que el usuario ya vio la
pantalla. Por eso `useEffect` no sirve para calcular algo que necesitas *para*
renderizar.

La limpieza, con el caso que más se rompe:

```tsx
useEffect(() => {
  function alRedimensionar() {
    setAncho(window.innerWidth);
  }
  window.addEventListener("resize", alRedimensionar);
  return () => window.removeEventListener("resize", alRedimensionar);
}, []);
```

Sin el `return`, cada vez que el componente se monta queda un listener más
escuchando, y ninguno se va nunca.

---

### 📖 Por qué funciona así

> **Un efecto es un cable que sale de React hacia un sistema externo.
> Si los dos extremos del cable están dentro de React, no necesitas cable.**

"Sistema externo" significa cualquier cosa que React no controla:
`document.title`, `localStorage`, `setInterval`, eventos de `window`, una
librería de mapas, un websocket.

---

### 📖 Cuándo NO usarlo — la parte importante del día

**Caso 1: valor derivado.**

```tsx
// ❌
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(reservas.reduce((suma, r) => suma + r.monto, 0));
}, [reservas]);

// ✅
const total = reservas.reduce((suma, r) => suma + r.monto, 0);
```

La versión con efecto provoca dos renders en vez de uno, y crea una segunda
fuente de verdad que puede quedar desincronizada.

**Caso 2: responder a un evento del usuario.**

```tsx
// ❌
useEffect(() => {
  if (enviado) {
    mostrarConfirmacion();
  }
}, [enviado]);

// ✅
function manejarEnvio() {
  guardarReserva();
  mostrarConfirmacion();
}
```

Si el código debe correr *porque el usuario hizo algo*, va en el manejador del
evento. Los efectos son para cuando el código debe correr *porque el componente
se está mostrando*.

**Caso 3: pedir datos a un servidor.** Se puede, y hasta hace poco era lo normal.
Pero trae condiciones de carrera, peticiones duplicadas y estados de carga que
hay que manejar a mano. En el stack que vas a usar, esto lo resuelven los Server
Components de Next.js. No lo practiques aquí para no fijar el hábito.

**La pregunta de filtro:** ¿este código habla con algo que no es React?
Si la respuesta es no, no es un efecto.

---

### 📖 Un detalle que te va a confundir: el doble montaje

En desarrollo, React ejecuta tus efectos **dos veces** al montar el componente.
No es un bug: es Strict Mode buscando efectos que no limpian bien. En producción
corre una sola vez.

Si ves dos `console.log` donde esperabas uno, es esto. Y si tu efecto se rompe
por ejecutarse dos veces, le falta la limpieza.

---

### 📖 Mini-ejercicio de comprensión

Para cada caso, decide si necesita `useEffect` y justifica:

1. Calcular el ingreso total de las reservas confirmadas
2. Guardar los filtros en `localStorage` cada vez que cambian
3. Mostrar una alerta cuando el usuario envía el formulario
4. Actualizar el título del documento con el nombre de la expedición seleccionada
5. Ordenar la lista de expediciones por precio

---

### 🔗 Conexión con Next.js

En Next.js con App Router, la mayoría de los componentes se ejecutan en el
servidor y no tienen efectos en absoluto. `useEffect` queda reservado para los
Client Components y para lo que solo existe en el navegador. Cuanto menos lo
uses ahora, más natural te va a resultar ese modelo.

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — título dinámico

Efecto que actualiza `document.title` con la cantidad de expediciones visibles.
Verifica en la pestaña del navegador que cambia al filtrar.

**Ejercicio 2** — filtros persistentes

Guarda los filtros en `localStorage` cuando cambian, y léelos al montar para
inicializar el estado. Al recargar, los filtros siguen aplicados.

Pista: leer al inicio y escribir al cambiar son dos responsabilidades distintas.
Solo una de las dos es un efecto.

**Ejercicio 3** — reloj de sesión

Componente que muestra los minutos y segundos desde que se abrió el dashboard.
Usa `setInterval` con su limpieza correspondiente. Comprueba que al desmontarlo
el intervalo se detiene de verdad.

**Ejercicio 4** — auditoría

Este componente tiene cuatro `useEffect`. Solo uno está justificado. Identifica
cuál, explica por qué los otros tres sobran y reescríbelo sin ellos:

```tsx
function PanelReservas({ reservas }: { reservas: Reserva[] }) {
  const [confirmadas, setConfirmadas] = useState<Reserva[]>([]);
  const [total, setTotal] = useState(0);
  const [hayReservas, setHayReservas] = useState(false);
  const [ultimaVisita, setUltimaVisita] = useState("");

  useEffect(() => {
    setConfirmadas(reservas.filter((r) => r.estado === "confirmada"));
  }, [reservas]);

  useEffect(() => {
    setTotal(confirmadas.reduce((suma, r) => suma + r.personas, 0));
  }, [confirmadas]);

  useEffect(() => {
    setHayReservas(reservas.length > 0);
  }, [reservas]);

  useEffect(() => {
    setUltimaVisita(new Date().toLocaleDateString("es-CL"));
    localStorage.setItem("ultimaVisita", new Date().toISOString());
  }, []);

  return ( /* ... */ );
}
```

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO DE LA SEMANA

### 🏆 Nexus — Catálogo de Expediciones (solo lectura)

> El equipo de Nexus terminó el motor de datos y el sistema de tipos.
> Ahora la plataforma necesita cara.
>
> Tu tarea es el catálogo visual: el gerente de TerraMater abre el navegador,
> ve sus expediciones, las filtra, entra al detalle de una y revisa el estado
> de ocupación.
>
> **El dashboard muestra. No modifica.** Crear reservas es el trabajo de PS-4.

---

### 📋 Los datos

Usa los arrays `expediciones` y `reservas` del Proyecto Integrador PS-1, en
`src/datos/`, tipados con `type Expedicion` y `type Reserva`.

Son los mismos datos, no el mismo código. La lógica la reescribes: el `filter`
que hiciste para consola ahora vive dentro de un componente.

---

### 📋 Lo que debe hacer

**1. Catálogo**
- Las 8 expediciones en tarjetas
- Cada tarjeta: nombre, tipo, duración, precio formateado en pesos chilenos,
  dificultad y cupo máximo
- Insignia visual para dificultad alta

**2. Filtros combinables**
- Por tipo (todos, trekking, kayak, rafting, escalada)
- Por dificultad
- Por precio máximo
- Buscador por nombre, insensible a mayúsculas
- Los cuatro se aplican a la vez
- Contador de resultados visibles
- Botón para limpiar todo
- Mensaje claro cuando ninguna expedición coincide

**3. Panel de detalle**
- Al hacer clic en una tarjeta, se muestra el detalle de esa expedición
- El detalle incluye: todos los datos, la lista de clientes con reserva
  confirmada, cupos ocupados, cupos disponibles y porcentaje de ocupación
- Botón para volver al catálogo

**4. Resumen ejecutivo**
- Total de expediciones en catálogo
- Precio promedio
- Ingresos totales por reservas confirmadas
- Expediciones con 50% o más de ocupación
- Expediciones sin ninguna reserva confirmada

**5. Título dinámico**
- La pestaña del navegador muestra la cantidad de expediciones visibles
- Cuando hay una expedición seleccionada, muestra su nombre

---

### 📋 Requisitos técnicos

```
✅ Mínimo 6 componentes en archivos separados
✅ Todas las props tipadas con TypeScript — cero any
✅ Los tipos Expedicion y Reserva definidos una sola vez e importados
✅ key con el id real del dato, nunca el índice
✅ Estado levantado al ancestro común correcto
✅ Todo valor derivable se calcula, no se guarda en estado
✅ Un solo useEffect en todo el proyecto (el del título)
✅ Precios con .toLocaleString("es-CL")
✅ Funciones puras separadas de los componentes para la lógica de negocio
✅ HTML semántico donde corresponda (article, section, header) — Semana 08
❌ Sin lógica de filtrado duplicada entre componentes
❌ Sin useEffect para valores derivados
❌ Sin mutación de estado
```

El requisito del **único `useEffect`** es deliberado. Si te encuentras
escribiendo el segundo, casi seguro estás resolviendo con un efecto algo que se
resuelve calculando.

---

### 📋 Estructura sugerida

```
src/
├── datos/
│   ├── expediciones.ts
│   └── reservas.ts
├── tipos/
│   └── entidades.ts
├── logica/
│   └── analisis.ts          ← funciones puras: ocupación, ingresos, filtros
├── componentes/
│   ├── EncabezadoNexus.tsx
│   ├── PanelFiltros.tsx
│   ├── TarjetaExpedicion.tsx
│   ├── ListaExpediciones.tsx
│   ├── DetalleExpedicion.tsx
│   └── ResumenEjecutivo.tsx
├── Dashboard.tsx
└── App.tsx
```

La carpeta `logica/` importa: las funciones que calculan ocupación e ingresos
son JavaScript puro y no saben que React existe. Separarlas es lo que permite
probarlas y reutilizarlas — y es exactamente la lógica que ya escribiste en PS-1.

Esa separación es además lo que hace posible PS-4: el formulario de reserva se
enchufa a `logica/analisis.ts` sin tocar los componentes de presentación.

---

### 💡 Las dos únicas pistas

**Pista 1** — Para el panel de detalle, el estado que necesitas guardar no es la
expedición completa. Piensa qué es lo mínimo, y cómo obtienes el resto a partir
de eso.

**Pista 2** — Para relacionar cada expedición con sus reservas confirmadas es el
mismo `filter` por `expedicionId` de PS-1. La diferencia es que ahora esa
función vive en `logica/analisis.ts` y recibe los dos arrays como parámetros:

```typescript
export function reservasDeExpedicion(reservas: Reserva[], expedicionId: string): Reserva[] {
  // ...
}
```

---

### ✅ Criterios de aprobación

```
□ La aplicación corre sin errores ni advertencias en la consola
□ Los cuatro filtros funcionan combinados
□ El detalle muestra los datos correctos de ocupación
□ El resumen ejecutivo coincide con los valores de PS-1
□ Cero any en el proyecto
□ key correcta en todas las listas
□ Un solo useEffect, justificado
□ La lógica de negocio está fuera de los componentes
□ Subido a GitHub con commit descriptivo
```

**Verificación cruzada:** los números del resumen ejecutivo deben coincidir con
los que calculaste en TerraMater Pro. Si no coinciden, uno de los dos está mal —
y averiguar cuál es parte del ejercicio.

---

**Cuando termines el proyecto, avísame. Hacemos la validación semanal interactiva.** 🎯

---

## 🔜 LO QUE VIENE DESPUÉS: PS-4

Al aprobar esta semana se dispara el **Proyecto Integrador PS-4 — Dashboard
Nexus v1**, que no repite este proyecto: lo extiende con lo que aquí quedó fuera.

```
Este proyecto (Día 6)          PS-4
─────────────────────          ─────────────────────────────────
Solo lectura                   Escritura: crear reservas
Datos fijos en memoria         Los datos cambian y todo se recalcula
Filtrar y mostrar              Validar contra reglas de negocio
Un solo useEffect              Estado compuesto, varias entidades
                               Integra ContadorCupos + FormularioReserva
```

La capacidad nueva de PS-4 es que **el sistema deja de ser un visor y pasa a ser
una herramienta**: una reserva nueva cambia la ocupación, los ingresos y el
resumen ejecutivo en cascada. Eso exige que la lógica pura del Día 6 esté bien
separada — si no lo está, PS-4 duele.

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-10/
└── nexus-dashboard/
    ├── src/
    │   ├── datos/
    │   ├── tipos/
    │   ├── logica/
    │   ├── componentes/
    │   ├── Dashboard.tsx
    │   └── App.tsx
    ├── package.json
    └── README.md
```

Los ejercicios de los Días 1 a 5 quedan dentro del mismo proyecto Vite; no hace
falta un proyecto por día. Commitea al terminar cada día.

---

> ### 📘 PRÓXIMA SEMANA
> Pendiente de definir. El mapa curricular de las Semanas 11 y 12 no existe
> todavía — hay que generarlo antes de poder producir esos bootcamps.

---

*Semana 10 — React*
*Formato v4 — Constitución v1.2 · Protocolo QA con Fase 6b*
*Óscar — Full Stack Developer en formación 🇨🇱*
