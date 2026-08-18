# 🏆 PROYECTO INTEGRADOR PS-3
## Nexus Mirador — Donde los tipos se acaban

---

```
ACTA DE GENERACIÓN
Fecha: 2026-08-06
Punto de síntesis: post Semana 09 (TypeScript)
Prerrequisitos: Semanas 01-09 completas · PS-1 y PS-2 aprobados
Duración estimada: 8-10 horas
Universo: Nexus / TerraMater (ficticio — Enmienda 19)
Fase 1: api.open-meteo.com verificada 2026-08-06 — gratuita, sin clave,
        sin registro, ~10.000 peticiones/día para uso no comercial
Constitución aplicada: v2.2
```

---

## 🎬 ANTES DE EMPEZAR

Este es el proyecto más grande que has hecho, y el primero que **se ve**.

Todo lo que construiste hasta ahora vivió en la consola. PS-1 imprimía un
reporte. PS-2 imprimía un reporte. Este abre en un navegador, carga datos
reales de internet, y responde cuando haces clic.

También es el primero que puedes enseñarle a alguien sin explicarle antes qué
es una terminal.

**No lo hagas de una sentada.** Está diseñado en seis módulos, y cada uno
termina con algo que funciona. El Módulo 3 ya te deja una pantalla con datos
en vivo — ahí ya vale la pena parar y mirarlo.

Si algo se atasca más de treinta minutos, escríbeme. No es trampa: es cómo
trabaja la gente.

---

## 🎯 LA COMPETENCIA NUEVA

```
PS-1  →  cruzar datos por identidad
PS-2  →  no confiar en datos externos
PS-3  →  TIPAR LAS FRONTERAS
```

Llevas una semana con TypeScript protegiéndote. Dentro de tu código, si te
equivocas, el compilador te avisa.

**Pero tu programa tiene fronteras.** Sitios donde entran datos de un mundo
que no está tipado:

```
LA RED      fetch devuelve any. TypeScript no sabe qué llegó.
EL DOM      querySelector devuelve Element | null. Puede no existir.
EL USUARIO  input.value es SIEMPRE string. Incluso en type="number".
```

En esas tres fronteras TypeScript no puede ayudarte, porque no hay forma de
que sepa qué hay al otro lado. **El puente lo construyes tú.**

Y aquí está lo que hace que esto importe ahora y no antes: el Día 7 de la
Semana 9 te enseñó que Node ejecuta tu `.ts` sin comprobar nada. Un archivo
lleno de errores de tipo corre igual.

Así que tienes dos capas de falsa seguridad apiladas:

> TypeScript no comprueba en ejecución.
> Y en las fronteras, ni siquiera comprueba al escribir.

Este proyecto trata de eso.

---

## 📖 EL ESCENARIO

TerraMater opera expediciones en ocho puntos de Chile, desde el Atacama hasta
Torres del Paine. Antes de confirmar una salida, alguien tiene que revisar el
clima de cada lugar. Hoy lo hacen abriendo ocho pestañas.

**Nexus Mirador** es el panel que lo resuelve: el catálogo completo con las
condiciones reales de cada punto, y una señal clara de cuáles están en riesgo.

Los datos del clima son **de verdad**. Tu código va a hablar con un servidor
que no controlas, en Alemania, que te va a devolver lo que le dé la gana.

---

## 📋 LOS DATOS

### El catálogo — `src/datos/expediciones.ts`

Las ocho de siempre, ahora con coordenadas reales:

```typescript
export const expediciones = [
  { id: "EXP001", nombre: "Cruce Los Andes",   tipo: "trekking", duracionDias: 5, precioBase: 280000, cupoMaximo: 12, dificultad: "alta",  lat: -32.83, lon: -70.12 },
  { id: "EXP002", nombre: "Lago Llanquihue",   tipo: "kayak",    duracionDias: 3, precioBase: 195000, cupoMaximo: 8,  dificultad: "media", lat: -41.13, lon: -72.98 },
  { id: "EXP003", nombre: "Torres del Paine",  tipo: "trekking", duracionDias: 7, precioBase: 450000, cupoMaximo: 10, dificultad: "alta",  lat: -50.94, lon: -73.40 },
  { id: "EXP004", nombre: "Río Futaleufú",     tipo: "rafting",  duracionDias: 2, precioBase: 150000, cupoMaximo: 15, dificultad: "alta",  lat: -43.18, lon: -71.86 },
  { id: "EXP005", nombre: "Reserva Nonguén",   tipo: "trekking", duracionDias: 1, precioBase: 45000,  cupoMaximo: 20, dificultad: "baja",  lat: -36.90, lon: -73.00 },
  { id: "EXP006", nombre: "Volcán Villarrica", tipo: "escalada", duracionDias: 2, precioBase: 320000, cupoMaximo: 6,  dificultad: "alta",  lat: -39.42, lon: -71.94 },
  { id: "EXP007", nombre: "Lago Conguillio",   tipo: "kayak",    duracionDias: 2, precioBase: 130000, cupoMaximo: 10, dificultad: "baja",  lat: -38.68, lon: -71.65 },
  { id: "EXP008", nombre: "Atacama Extremo",   tipo: "trekking", duracionDias: 6, precioBase: 520000, cupoMaximo: 8,  dificultad: "alta",  lat: -23.85, lon: -69.13 }
];
```

> Reserva Nonguén está a media hora de tu casa. Cuando el panel funcione,
> vas a poder comprobar el dato mirando por la ventana.

### La API — Open-Meteo

Gratuita, sin clave, sin registro.

```
https://api.open-meteo.com/v1/forecast
  ?latitude=-36.90
  &longitude=-73.00
  &daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code
  &timezone=auto
  &forecast_days=3
```

Ábrela en el navegador antes de escribir código. Mira la forma de lo que
devuelve. Vas a necesitarla.

---

## 🌿 MÓDULO 0 — EL FLUJO DE TRABAJO

Este módulo no produce código. Produce historia.

Es la primera vez que aplicas la Semana 7 sobre un proyecto real, y el
resultado se ve en tu GitHub — que a partir de ahora es parte de lo que
puedes mostrar.

**0.1** — Repositorio nuevo, `main` con el `README.md` inicial.

**0.2** — Una rama por módulo:

```bash
git switch -c feat/tipos-dominio
```

**0.3** — Conventional commits en todo el proyecto:

```
feat: agregar tipos del dominio de expediciones
fix: corregir narrowing en validarRespuestaClima
refactor: extraer conversión de arrays paralelos
docs: documentar la frontera de red en el README
```

**0.4** — Al terminar cada módulo, merge a `main`. En al menos **uno**, hazlo
por Pull Request desde GitHub, aunque estés solo. Escribe la descripción como
si otra persona fuera a revisarla.

> **Por qué importa:** el historial de commits es lo primero que mira alguien
> que evalúa tu trabajo. Un repositorio con un solo commit que dice "proyecto
> final" cuenta una historia distinta a uno con veinte commits legibles.

---

## 🧱 MÓDULO 1 — LOS CONTRATOS

Antes de escribir lógica, define las formas. Es lo que hiciste en el Día 6 de
la Semana 9, ahora al servicio de algo que se ejecuta.

### 1.1 — `src/tipos/dominio.ts`

```typescript
export type TipoExpedicion = "trekking" | "kayak" | "rafting" | "escalada";
export type Dificultad = "baja" | "media" | "alta";

export type Expedicion = {
  id: string;
  nombre: string;
  tipo: TipoExpedicion;
  duracionDias: number;
  precioBase: number;
  cupoMaximo: number;
  dificultad: Dificultad;
  lat: number;
  lon: number;
};
```

Uniones de literales, no `string`. Es la diferencia entre un tipo que te
protege y uno que solo documenta.

### 1.2 — `src/tipos/clima.ts`

Aquí hay una decisión de diseño que te toca, y es la más importante del
módulo.

**Necesitas dos tipos distintos:**

```typescript
// Lo que la API DICE que devuelve — la forma cruda
export type RespuestaClimaCruda = { ... };

// Lo que TU programa usa — la forma que te sirve
export type DiaClima = {
  fecha: string;
  tempMax: number;
  tempMin: number;
  precipitacion: number;
  vientoMax: number;
  codigoClima: number;
};
```

**Por qué dos y no uno:** si usas la forma de la API en todo tu programa, el
día que la API cambie tendrás que tocar cada archivo. Con dos tipos y una
función que convierte, solo tocas la función.

Se llama **capa anticorrupción**, y es de las decisiones de arquitectura que
más se agradecen a los seis meses.

### 1.3 — `src/tipos/estado.ts`

El estado de cada expedición en el panel, como unión discriminada:

```typescript
export type EstadoClima =
  | { estado: "cargando" }
  | { estado: "listo"; dias: DiaClima[] }
  | { estado: "error"; mensaje: string };
```

Con esto, los estados imposibles no se pueden representar. No puedes tener
`cargando` y `dias` a la vez, porque el tipo no lo permite.

> **Verificación del módulo:** ejecuta `npx tsc --noEmit`. Debe pasar sin
> errores. Todavía no hay lógica — solo contratos.

---

## 🌐 MÓDULO 2 — LA FRONTERA DE RED

La primera frontera. Aquí `fetch` te devuelve `any` y TypeScript se calla.

### 2.1 — El cliente

```typescript
export async function obtenerClima(lat: number, lon: number): Promise<DiaClima[]> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "3");

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }

  const crudo = await respuesta.json();
  // ← AQUÍ TypeScript cree que "crudo" es any. No sabe nada.

  return convertir(validar(crudo));
}
```

Fíjate en la línea marcada. `respuesta.json()` devuelve `any`. Puedes escribir
`crudo.cualquierCosa.queSeTeOcurra` y TypeScript no protesta.

**Ese es el agujero que tienes que tapar tú.**

### 2.2 — La trampa de la forma

Mira lo que devuelve Open-Meteo de verdad:

```json
{
  "daily": {
    "time":                ["2026-08-06", "2026-08-07", "2026-08-08"],
    "temperature_2m_max":  [14.2, 12.8, 15.1],
    "temperature_2m_min":  [3.1, 2.4, 4.0],
    "precipitation_sum":   [0.0, 12.4, 2.1],
    "wind_speed_10m_max":  [18.3, 42.7, 22.0],
    "weather_code":        [1, 61, 3]
  }
}
```

**No es un array de objetos. Son seis arrays paralelos.** El día 0 es
`time[0]` con `temperature_2m_max[0]` y así.

Tú necesitas lo contrario:

```typescript
[
  { fecha: "2026-08-06", tempMax: 14.2, tempMin: 3.1, precipitacion: 0.0, vientoMax: 18.3, codigoClima: 1 },
  ...
]
```

**Y aquí viene lo interesante.**

En PS-1 aprendiste que emparejar dos colecciones por posición estaba mal, y
lo demostramos: los ocupados de una expedición se dividían por el cupo de
otra. La regla fue *buscar por identidad no depende del orden; acceder por
posición sí*.

Aquí tienes que hacer exactamente lo contrario: emparejar seis arrays **por
posición**.

**¿Se contradice? No.** Y saber por qué es el punto del módulo.

> La diferencia está en el **contrato**. En PS-1, `expediciones` y `reservas`
> eran colecciones independientes, sin ninguna garantía de orden entre ellas.
> Aquí, Open-Meteo **documenta** que los arrays son paralelos: la posición
> *es* la relación. Es el contrato de la API.
>
> Emparejar por posición está bien cuando la posición es el contrato. Está
> mal cuando la asumes sin que nadie te la garantice.

Escribe esa distinción en tu README con tus palabras. Es lo que más vas a
querer recordar de este proyecto.

### 2.3 — Validar antes de convertir

```typescript
function validar(crudo: unknown): RespuestaClimaCruda {
  // Empieza en unknown, NO en any.
  // unknown te obliga a comprobar; any te deja pasar.
}
```

Usa `unknown` como tipo de entrada. Esa elección es deliberada: con `any`,
TypeScript te deja hacer cualquier cosa. Con `unknown`, no te deja hacer nada
hasta que compruebes.

Comprueba al menos:

```
· que crudo es un objeto y no null
· que tiene la propiedad daily
· que daily.time es un array
· que los seis arrays tienen la MISMA longitud
```

El último importa: si `time` trae 3 elementos y `temperature_2m_max` trae 2,
tu conversión produciría un día con `undefined` disfrazado de número.
TypeScript diría que es `number`. No lo sería.

**Ese es un fallo silencioso con tipos que mienten**, y es el peor de todos.

### 2.4 — Las ocho en paralelo, tolerando fallos

Ocho expediciones, ocho peticiones. En paralelo, no en serie.

Y una debe poder fallar sin arrastrar a las otras siete — es lo que aprendiste
en PS-2.

```typescript
export async function obtenerClimaDeTodas(
  expediciones: Expedicion[]
): Promise<Map<string, EstadoClima>> { ... }
```

> **Anclas del módulo:**
> ```
> 8 peticiones, no 8 esperas encadenadas
> Si una falla, las otras 7 siguen disponibles
> Con forecast_days=3, cada expedición devuelve exactamente 3 objetos DiaClima
> ```
>
> **Prueba deliberada:** cambia la latitud de una expedición a `999` y
> ejecuta. Open-Meteo devolverá un error. Comprueba que las otras siete
> aparecen igual y que esa muestra su estado de error.
>
> Devuélvela a su valor después.

---

## 🖥 MÓDULO 3 — LA FRONTERA DEL DOM

La segunda frontera. Aquí `querySelector` puede devolver `null` y TypeScript
te va a obligar a admitirlo.

### 3.1 — El problema

```typescript
const contenedor = document.querySelector("#panel");
contenedor.append(tarjeta);
//        ^^^^^^ error: 'contenedor' is possibly 'null'
```

TypeScript tiene razón. Si cambias el id en el HTML y olvidas cambiarlo aquí,
`querySelector` devuelve `null` y el programa revienta.

**Tres formas de resolverlo, y una es mala:**

```typescript
// ❌ El "!" le dice a TypeScript "confía en mí". Silencia el aviso sin
//    resolver nada. Si el elemento no existe, revienta igual.
const c = document.querySelector("#panel")!;

// ⚠ Comprobar cada vez. Correcto pero repetitivo con veinte selectores.
const c = document.querySelector("#panel");
if (!c) return;

// ✅ Un helper que falla ruidosamente, una sola vez
function seleccionar<T extends Element>(selector: string): T {
  const elemento = document.querySelector<T>(selector);
  if (!elemento) {
    throw new Error(`No se encontró el elemento: ${selector}`);
  }
  return elemento;
}
```

La tercera es el mismo patrón que verás en la Semana 16 con el contexto de
Clerk: **envolver algo que puede fallar en silencio dentro de una función que
grita**. Vale la pena que reconozcas el patrón cuando reaparezca.

### 3.2 — Renderizar el catálogo

Genera las ocho tarjetas desde los datos, con `createElement`. Cada una:

```
Nombre de la expedición
Tipo y dificultad
Duración y precio formateado en pesos
Zona de clima — cambia según el estado
Un botón "Ver detalle" con data-id
```

**La zona de clima se pinta según la unión discriminada del Módulo 1:**

```typescript
function pintarClima(estado: EstadoClima): HTMLElement {
  switch (estado.estado) {
    case "cargando": return crearSpinner();
    case "listo":    return crearResumen(estado.dias);
    case "error":    return crearAviso(estado.mensaje);
  }
}
```

Fíjate en lo que consigues: dentro de cada `case`, TypeScript **sabe** qué
propiedades existen. En `"cargando"` no puedes acceder a `dias` porque no
está en esa variante. El tipo impide el error antes de que lo escribas.

### 3.3 — Los códigos WMO

La API devuelve el clima como un número. Necesitas traducirlo.

```typescript
const CLIMA_WMO = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  51: "Llovizna ligera",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia fuerte",
  71: "Nieve ligera",
  75: "Nieve fuerte",
  80: "Chubascos",
  95: "Tormenta"
} as const;
```

> ⚠ Esta tabla está incompleta a propósito — es un subconjunto de la norma
> WMO. **Verifica los códigos contra la documentación de Open-Meteo** y
> decide qué hacer con los que falten. Un código desconocido no debería
> romper el panel.

El `as const` es la sintaxis del Día 7 de la Semana 9. Sin él, el tipo sería
`Record<number, string>`. Con él, TypeScript conoce las claves exactas.

### 3.4 — El estilo

Reutiliza lo de la Semana 8: variables CSS, Grid para el panel, Flexbox
dentro de las tarjetas, responsive con el breakpoint de 768px.

**No es relleno.** Un panel que se ve bien es la diferencia entre algo que
enseñas y algo que explicas.

> **Verificación del módulo:** abre el navegador. Deberías ver ocho tarjetas
> con datos reales del clima chileno de hoy.
>
> **Para aquí un momento.** Es la primera vez que tu código produce algo que
> alguien más podría usar.

---

## 🎛 MÓDULO 4 — LA FRONTERA DEL USUARIO

La tercera frontera. Todo lo que el usuario escribe llega como `string`.

### 4.1 — La trampa

```typescript
const input = seleccionar<HTMLInputElement>("#precio-max");
const valor = input.value;
// tipo: string — SIEMPRE, incluso con <input type="number">
```

El navegador no convierte. `type="number"` limita lo que se puede teclear,
pero `value` sigue siendo texto.

```typescript
// ❌ compila, y compara texto con número
if (expedicion.precioBase <= input.value) { ... }

// ✅ convertir en la frontera, y comprobar
const limite = Number(input.value);
if (Number.isNaN(limite)) { ... }
```

### 4.2 — Filtros

Tres, combinables, y **cada uno opcional**:

```
Buscador por nombre       (evento input)
Filtro por tipo           (select)
Filtro por dificultad     (select)
```

> Un criterio ausente no filtra nada. Eso lo resolviste en el Día 4 de la
> Semana 5 — `!criterio || condicion`, y por qué `precioMax` sí lleva default
> neutro y los strings no.
>
> Está en la Cheat Sheet de esa semana, sección "Criterios opcionales".

### 4.3 — Delegación

Un solo `addEventListener` en el contenedor para los ocho botones "Ver
detalle". Con `closest` y `dataset`, como en el Día 7 de la Semana 8.

### 4.4 — El panel de detalle

Al pulsar, muestra los tres días con temperaturas, precipitación, viento y la
descripción del clima.

### 4.5 — Estado vacío

Si ningún resultado coincide con los filtros, di algo. Una pantalla en blanco
parece un error.

> **Anclas del módulo:**
> ```
> Sin filtros → 8 tarjetas
> tipo="trekking" → 4 (EXP001, EXP003, EXP005, EXP008)
> tipo="kayak" y dificultad="baja" → 1 (EXP007)
> tipo="rafting" y dificultad="baja" → 0, con mensaje de estado vacío
> ```

---

## ⚠️ MÓDULO 5 — LAS REGLAS DE NEGOCIO

Lo que convierte un visor de datos en una herramienta que sirve.

### 5.1 — Semáforo de viabilidad

Para cada expedición, según el clima del **primer día**:

```
🔴 NO VIABLE
   viento > 60 km/h
   O precipitación > 30 mm
   O código de tormenta (95+)

🟡 PRECAUCIÓN
   viento > 35 km/h
   O precipitación > 10 mm
   O temperatura mínima bajo 0 en expedición de dificultad alta

🟢 VIABLE
   todo lo demás

⚪ SIN DATOS
   el clima no se pudo obtener
```

**El cuarto estado no es decorativo.** Si el clima falló, la expedición no es
viable *ni* no viable: no lo sabes. Decir "viable" cuando no tienes datos es
exactamente el tipo de mentira que este proyecto trata de evitar.

### 5.2 — Resumen ejecutivo

Arriba del panel, en vivo, recalculándose con los filtros:

```
8 expediciones · 5 viables · 2 en precaución · 1 sin datos
```

### 5.3 — Ordenar por riesgo

Un botón que pone las no viables primero.

> ⚠ `sort` **muta el array original**. Lo descubriste tú en PS-1, insistiendo
> cuando yo daba tu código por correcto. Aquí importa: si mutas el catálogo,
> los filtros posteriores trabajan sobre datos reordenados.
>
> `toSorted()` o `[...array].sort()`.

---

## 🌿 MÓDULO 6 — CIERRE

**6.1** — `npx tsc --noEmit` sin un solo error. Cero `any` en tu código.

**6.2** — `README.md` con:

```
Qué hace el proyecto y una captura
Cómo ejecutarlo
Las tres fronteras y cómo las tipaste
Por qué emparejar por posición está bien aquí y estaba mal en PS-1
Qué harías distinto con más tiempo
```

Ese README es lo primero que va a leer cualquiera que abra tu repositorio.
Escríbelo para esa persona.

**6.3** — Merge final a `main` y revisa el historial:

```bash
git log --oneline --graph
```

Debería contarse solo.

---

## ✅ REQUISITOS TÉCNICOS

```
✅ TypeScript en todo. Cero any en código propio
✅ npx tsc --noEmit pasa limpio
✅ Uniones de literales para tipo, dificultad y estado — nunca string
✅ Unión discriminada para el estado del clima
✅ Dos tipos separados: forma de la API y forma del dominio
✅ Validación con unknown como entrada, nunca any
✅ Las 8 peticiones en paralelo, tolerando fallos individuales
✅ Helper tipado para seleccionar elementos, que falla ruidosamente
✅ Delegación de eventos — un listener, no ocho
✅ Conversión explícita de input.value con comprobación
✅ Grid + Flexbox + responsive, reutilizando la Semana 8
✅ Conventional commits y al menos un Pull Request
❌ Sin el operador ! para silenciar posibles null
❌ Sin innerHTML con datos que no construyas tú
❌ Sin mutar el catálogo al ordenar
❌ Sin decir "viable" cuando no hay datos
```

---

## 🗂 ESTRUCTURA SUGERIDA

```
nexus-mirador/
├── index.html
├── estilos.css
├── src/
│   ├── tipos/
│   │   ├── dominio.ts
│   │   ├── clima.ts
│   │   └── estado.ts
│   ├── datos/
│   │   └── expediciones.ts
│   ├── api/
│   │   └── clima.ts          ← frontera de red
│   ├── logica/
│   │   ├── viabilidad.ts     ← reglas puras, sin DOM
│   │   └── filtros.ts        ← puros, sin DOM
│   ├── ui/
│   │   ├── seleccionar.ts    ← frontera del DOM
│   │   ├── tarjetas.ts
│   │   └── detalle.ts
│   └── main.ts               ← orquesta
└── README.md
```

`logica/` no importa nada del DOM ni de la red. Recibe datos y devuelve
datos. Deberías poder ejecutar `viabilidad.ts` con `node` y probarlo sin
abrir el navegador.

---

## 💡 LAS TRES PISTAS

**Pista 1 — la longitud de los arrays paralelos.** Antes de convertir,
comprueba que los seis tienen el mismo largo. Si no, algo va mal y es mejor
saberlo ahí que descubrir un `undefined` tipado como `number` tres capas más
abajo.

**Pista 2 — `<T extends Element>`.** El helper de selección usa un generic
con restricción. Significa "T puede ser cualquier cosa, siempre que sea un
Element". Te permite pedir `seleccionar<HTMLInputElement>("#buscar")` y que
`.value` exista sin castear.

**Pista 3 — el orden de los módulos no es sugerencia.** Los tipos primero
suena a burocracia y es lo contrario: cuando llegues al Módulo 3, el
compilador va a guiarte. Si empiezas por la interfaz, escribirás los tipos al
final para tapar errores, y eso es escribir tipos que mienten.

---

## ✅ CRITERIOS DE APROBACIÓN

```
□ El panel abre en el navegador y muestra las 8 expediciones
□ Los datos del clima son reales y de hoy
□ Una expedición con coordenada inválida no tumba a las otras siete
□ Los tres filtros funcionan y se combinan
□ Filtros sin resultados muestran un estado vacío, no una pantalla en blanco
□ El botón "Ver detalle" funciona con un solo listener
□ El semáforo distingue "sin datos" de "viable"
□ Se ve bien en móvil y en escritorio
□ npx tsc --noEmit pasa sin errores
□ Cero any en tu código
□ Historial de Git legible, con al menos un PR
□ README que explica las tres fronteras
```

**Verificación adversarial obligatoria** — quince minutos intentando romperlo:

```
1. Corta el wifi y recarga. ¿Qué pasa? ¿Dice algo útil?
2. Cambia un id en el HTML sin tocar el TypeScript. ¿Falla ruidosamente
   o en silencio?
3. Escribe letras en un filtro numérico si tienes alguno.
4. Escribe <b>hola</b> en el buscador. ¿Se renderiza como negrita?
   Si es así, tienes un XSS.
```

Documenta cada intento y su resultado en el README.

---

## 🎤 MINI-ENTREVISTA DE CIERRE

Cinco preguntas al terminar. Los temas, para que sepas dónde mirar:

```
1. Por qué emparejar por posición está bien aquí y estaba mal en PS-1
2. Qué te obliga a hacer "unknown" que "any" no
3. Por qué el operador ! es peor que comprobar, si el resultado
   en pantalla es el mismo
4. Qué gana el programa con "sin datos" como estado propio
5. Qué habría detectado tsc --noEmit que el navegador no
```

---

## 🎯 LO QUE TE LLEVAS

Al terminar tienes tres cosas.

**Una herramienta que funciona.** Datos reales, interfaz propia, decisiones
de negocio. Puedes abrirla delante de alguien.

**La primera cosa que enseñar.** La Enmienda 19 fijó los proyectos de
portafolio a partir de la Semana 12, pero este ya es candidato: se ve, se
usa, y el repositorio cuenta cómo se construyó.

**Y el modelo mental que da nombre al proyecto:**

> TypeScript te protege dentro de tu código.
> En las fronteras —la red, el DOM, el usuario— el puente lo construyes tú.
> Un tipo que no verificaste en la frontera no es una garantía: es un deseo.

---

*Proyecto Integrador PS-3 — Nexus Mirador*
*Punto de síntesis: post Semana 09*
*Óscar — Full Stack Developer en formación 🇨🇱*
