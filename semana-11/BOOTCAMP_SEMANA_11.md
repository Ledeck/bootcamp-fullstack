# 📘 BOOTCAMP SEMANA 11
## Custom Hooks · Composición · useReducer · useContext

---

```
ACTA DE GENERACIÓN
Fecha de generación: julio 2026
Semana en curso de Óscar al generar: 04 (PS-1 en curso)
Distancia estimada hasta el uso: ~6 meses
Fases ejecutadas: 0, 1, 2, 3, 4, 5, 6, 6b, 7, 8
Fase 1 — fuentes: documentación de React 19 sobre Context como provider y
         el hook use(), consultadas en julio 2026
Bloque perecedero: mínimo — no hay setup nuevo. Ver nota de versión.
Constitución aplicada: v1.3 (enmiendas 1-10)
```

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_11.md` completa.
> **Recuerda:** cuando termines cada día, avísame para validar antes de continuar.

---

## ⏱ BLOQUE PERECEDERO

```
Verificado: julio 2026
```

**No hay setup nuevo.** Esta semana continúa en el proyecto Vite de la Semana 10.

Lo único con dependencia de versión: `<Contexto value={...}>` usado directamente
como provider, y el hook `use()`. Ambos requieren **React 19 o superior**. En
versiones anteriores se escribe `<Contexto.Provider value={...}>`.

Verifica la versión en `package.json` antes del Día 4.

---

## ⚠️ NOTA DE ALCANCE

Esta semana es distinta a todas las anteriores: **no enseña nada que se vea en
pantalla.** Al terminar, tu aplicación no hará nada que no hiciera antes.

Lo que cambia es cómo está organizada por dentro. Eso puede sentirse poco
gratificante los primeros días. La recompensa llega en el proyecto del Día 6,
cuando agregar un módulo entero cueste una fracción de lo que costaría sin esto.

**Prerrequisito real:** haber completado PS-4. Esta semana resuelve dolores que
solo aparecen cuando la aplicación ya escribe datos y tiene más de una vista. Sin
ese dolor previo, las soluciones de esta semana parecen complicaciones
innecesarias.

---

## 🗓 DÍA 1 — CUSTOM HOOKS

### 🎯 Objetivo
Extraer lógica con estado para reutilizarla, y entender qué se comparte y qué no.

---

### 📖 El problema real

Tu dashboard tiene un buscador con estado: el texto escrito, la función que lo
actualiza, y un botón para limpiar. Funciona.

Ahora Nexus necesita un buscador igual en la vista de reservas, y otro en la de
clientes. Tres buscadores, misma lógica.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Piénsalo antes de seguir. Tienes dos opciones con lo aprendido hasta la Semana 10.

**La primera:** copiar el `useState` y el `limpiar` en los tres componentes.

**La segunda:** extraer la lógica a una función en `logica/`:

```typescript
export function crearBuscador() {
  const [texto, setTexto] = useState("");
  function limpiar() {
    setTexto("");
  }
  return { texto, setTexto, limpiar };
}
```

---

### 📖 Por qué esas soluciones son insuficientes

**La copia** es el problema de siempre: tres lugares donde arreglar el mismo bug.
Ya lo viste con las funciones en la Semana 2 y con las props en la Semana 10.

**La extracción a función normal no compila**, y la razón es la regla de los
hooks que aprendiste la semana pasada:

> Los hooks solo se llaman desde componentes de React o desde otros hooks.
> Nunca desde una función normal.

`crearBuscador` es una función normal. React no tiene forma de asociar ese
`useState` con ningún componente, porque los hooks se identifican por el orden de
llamada **dentro de un componente**. El linter te marca el error.

Y este es el punto interesante: **la lógica que quieres reutilizar no es lógica
pura.** Tiene estado. No cabe en `logica/`, donde viven las funciones que no
saben que React existe.

---

### 📖 El custom hook como solución natural

React resuelve esto sin agregar ninguna API nueva. Un custom hook **es
exactamente esa función normal**, con una sola diferencia: el nombre empieza con
`use`.

```tsx
function useBuscador(inicial: string = "") {
  const [texto, setTexto] = useState(inicial);

  function limpiar() {
    setTexto("");
  }

  return { texto, setTexto, limpiar };
}
```

Eso es todo. No hay `createHook`, no hay registro, no hay decorador.

---

### 📖 Cómo funciona

Y aquí está lo que sorprende: **React no sabe que existen los custom hooks.**

Cuando un componente llama a `useBuscador()`, lo que ocurre es que la función se
ejecuta *dentro* de la ejecución de ese componente. El `useState` que hay adentro
es, para React, un `useState` más del componente que llamó. El orden de llamadas
sigue siendo estable porque una función siempre ejecuta sus líneas en el mismo
orden.

El prefijo `use` no le dice nada a React. Le dice algo **al linter**: "trata esta
función como un hook, verifica que no llame hooks dentro de un `if`, y avisa si
alguien la llama desde una función normal".

---

### 📖 Por qué funciona así — y el error que todos cometen

> **Un custom hook comparte LÓGICA, no ESTADO.**

Si `Buscador` y `BuscadorReservas` llaman ambos a `useBuscador()`, hay **dos
estados independientes**. Escribir en uno no cambia el otro.

Tiene que ser así: el `useState` de adentro se ejecuta una vez por cada
componente que llama al hook, igual que si lo hubieras escrito a mano en cada uno.

Este es el malentendido número uno con custom hooks, y produce bugs difíciles:
alguien extrae un `useCarrito()`, lo llama desde tres componentes, y no entiende
por qué agregar un producto en uno no aparece en los otros.

**Si necesitas compartir el estado de verdad**, la respuesta está en los días 2 y
4: levantarlo, componer, o contexto.

---

### 📖 Cuándo NO hacer un custom hook

```
✗ Si la lógica no usa ningún hook → es una función normal, va en logica/
✗ Si solo la usa un componente y no va a crecer → indirección sin beneficio
✗ Si el hook termina recibiendo cinco parámetros para cubrir todos los casos
  → probablemente estás forzando dos cosas distintas en una
```

La regla: **extraes cuando hay repetición real, no cuando la anticipas.**

---

### 📖 Errores frecuentes

```tsx
// ❌ sin prefijo use — el linter no verifica nada
function obtenerBuscador() {
  const [texto, setTexto] = useState("");
}

// ❌ hook dentro de una condición, incluso dentro de un custom hook
function useBuscador(activo: boolean) {
  if (activo) {
    const [texto, setTexto] = useState("");   // rompe el orden de llamadas
  }
}

// ✅ la condición va después del hook
function useBuscador(activo: boolean) {
  const [texto, setTexto] = useState("");
  const valorVisible = activo ? texto : "";
}
```

---

### 📖 Mini-ejercicio de comprensión

```tsx
function usarContador() {
  const [n, setN] = useState(0);
  return { n, incrementar: () => setN(n + 1) };
}
```

Dos preguntas antes de tocar el editor:
1. ¿Qué le pasa al linter con esta función, y por qué?
2. Si dos componentes la llamaran, ¿comparten `n`? Justifica.

---

### 🔗 Conexión con Next.js

Casi todas las librerías del stack que vas a usar exponen su funcionalidad como
custom hooks: `useForm` de React Hook Form, `useRouter` de Next.js, `useUser` de
Clerk. Entender que son funciones normales con `useState` adentro te quita el
misterio de todas ellas a la vez.

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `src/hooks/useBuscador.ts`

Extrae la lógica del buscador de la Semana 10 a un custom hook. Debe exponer el
texto, el setter y una función `limpiar`. Úsalo en el buscador del catálogo.

**Ejercicio 2** — `src/hooks/useLocalStorage.ts`

Un hook que funciona como `useState` pero persiste el valor en `localStorage`.
Firma: `useLocalStorage<T>(clave: string, inicial: T)`, retorna `[valor, setValor]`.

Debe leer el valor guardado al montar y escribirlo cuando cambie. Reutiliza lo
que hiciste en el Día 5 de la Semana 10, pero ahora como hook genérico.

**Ejercicio 3** — `src/hooks/useFiltrosExpediciones.ts`

Extrae **toda** la lógica de filtrado del dashboard: el objeto de filtros, la
función para actualizar un campo, el botón limpiar y la lista resultante.

El componente `Dashboard` debe quedar sin ningún `useState` propio después de
esto. Compara las dos versiones y anota en un comentario cuántas líneas perdió.

**Ejercicio 4** — demuéstralo tú

Renderiza dos `<Buscador />` al mismo tiempo. Escribe en uno.
Documenta en un comentario qué pasó y por qué, usando el modelo mental del día.

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — COMPOSICIÓN DE COMPONENTES

### 🎯 Objetivo
Eliminar prop drilling reorganizando el árbol, sin agregar ningún mecanismo nuevo.

---

### 📖 El problema real

Nexus muestra el nombre y el rol del usuario en una insignia, arriba a la derecha
del panel de detalle de cada expedición.

El dato `usuario` vive en `App`. La insignia está cuatro niveles más abajo.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con props, que es lo único que tienes para pasar datos hacia abajo:

```tsx
<App>                          usuario aquí
  <Dashboard usuario={usuario}>
    <PanelDetalle usuario={usuario}>
      <Cabecera usuario={usuario}>
        <Insignia usuario={usuario} />    ← lo necesita solo este
```

---

### 📖 Por qué esa solución es insuficiente

Se llama **prop drilling**, y tiene tres costos concretos.

**Componentes que cargan datos que no usan.** `Dashboard`, `PanelDetalle` y
`Cabecera` reciben `usuario` solo para pasarlo. Sus firmas mienten sobre lo que
hacen.

**Cambiar el dato obliga a tocar toda la cadena.** Si mañana la insignia también
necesita el avatar, editas cuatro archivos para agregar un dato en uno.

**Los componentes intermedios dejan de ser reutilizables.** `Cabecera` ya no
sirve en ningún sitio donde no exista un `usuario`.

---

### 📖 La composición como solución natural

Aquí está la idea, y es más simple de lo que parece: **el JSX es un valor.**
Puedes guardarlo en una variable y pasarlo como prop, igual que un número.

Si creas el `<Insignia />` **allí donde el dato ya existe**, no hay nada que
atravesar:

```tsx
function App() {
  const usuario = useUsuario();

  return (
    <Dashboard
      insignia={<Insignia usuario={usuario} />}
    />
  );
}

function Dashboard({ insignia }: { insignia: React.ReactNode }) {
  return (
    <PanelDetalle cabecera={insignia} />
  );
}
```

`Dashboard` ya no menciona a `usuario`. Solo sabe que recibe algo renderizable y
dónde ponerlo.

---

### 📖 Cómo funciona

El `<Insignia usuario={usuario} />` se **crea** en `App`, donde `usuario` está a
la vista. Lo que viaja hacia abajo no es el dato: es el elemento ya construido.

Esto no es un truco: es la misma prop `children` que usaste en la Semana 10, con
un nombre distinto. `children` es solo la prop que recibe lo que pusiste entre
las etiquetas.

```tsx
// Estas dos líneas son equivalentes
<Panel>{contenido}</Panel>
<Panel children={contenido} />
```

**Dos formas según el caso:**

```tsx
// children — una sola zona de contenido
<Panel>
  <Catalogo />
</Panel>

// props nombradas — varias zonas
<Layout
  barraLateral={<Menu />}
  contenido={<Catalogo />}
  pie={<Creditos />}
/>
```

---

### 📖 Por qué esto va antes que el contexto

Mañana verás `useContext`, que también elimina el prop drilling. Podrías
preguntarte por qué molestarse con esto.

La razón es el costo. La composición **no agrega ningún mecanismo**: sigue siendo
props, y el flujo de datos se lee directo en el árbol. El contexto agrega un
canal invisible: cuando ves `useContext(ContextoSesion)` dentro de un componente,
tienes que buscar hacia arriba quién lo publica.

> **La composición se intenta primero. El contexto entra cuando la composición
> no alcanza.**

Y no alcanza cuando el dato lo necesitan muchos componentes, en posiciones que
no puedes predecir al escribir el árbol.

---

### 📖 Cuándo NO usarla

```
✗ Cuando el componente intermedio necesita DECIDIR qué renderizar según el dato
  — si Dashboard tiene que elegir entre dos insignias según el rol, necesita el
  rol, y pasarle el JSX ya hecho no sirve
✗ Cuando terminas con ocho props de JSX en un componente — eso es una señal de
  que el componente hace demasiado
```

---

### 📖 Mini-ejercicio de comprensión

Tienes `<Modal>` que muestra un título, un cuerpo y dos botones cuyo texto y
acción cambian en cada uso.

¿Qué partes conviene pasar como props normales (string, función) y cuáles como
JSX? Justifica cada una.

---

### 🔗 Conexión con Next.js

Los `layout.tsx` de Next.js son composición pura: reciben `children` y los
envuelven. Y en la frontera servidor/cliente la composición es la única salida —
un Server Component no puede pasar una función a un Client Component, pero sí
puede pasarle JSX ya renderizado como `children`.

---

### 💼 CÓDIGO REAL VS CÓDIGO DE BOOTCAMP

Bootcamp:

```tsx
<Tarjeta titulo="Torres del Paine" precio={450000} mostrarBoton={true} />
```

Equipo real:

```tsx
<Tarjeta titulo="Torres del Paine">
  <Tarjeta.Cuerpo>
    <Precio valor={450000} />
  </Tarjeta.Cuerpo>
  <Tarjeta.Acciones>
    <Boton onClick={reservar}>Reservar</Boton>
  </Tarjeta.Acciones>
</Tarjeta>
```

La primera versión crece mal: cada variante nueva agrega una prop booleana
(`mostrarBoton`, `mostrarPrecio`, `compacta`) hasta que el componente tiene
quince y ningún desarrollador sabe qué combinaciones son válidas.

La segunda deja que quien la usa decida la estructura. El componente aporta el
marco y el estilo, no las decisiones.

No necesitas escribir así esta semana. Reconócelo cuando lo veas.

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — `src/componentes/Layout.tsx`

Componente con tres zonas: `barraLateral`, `contenido` y `pie`, todas tipadas
como `React.ReactNode`. Reorganiza el dashboard para usarlo.

**Ejercicio 2** — elimina el drilling

Toma la cadena de prop drilling más larga que tengas en tu proyecto después de
PS-4 y elimínala con composición. Anota en un comentario cuántos componentes
dejaron de recibir props que no usaban.

**Ejercicio 3** — `src/componentes/PanelPlegable.tsx`

Panel con un título siempre visible y contenido que se muestra u oculta al hacer
clic. El contenido llega por `children`. El estado de abierto/cerrado es interno.

Fíjate en algo: este componente tiene estado propio **y** recibe children. No son
incompatibles.

**Ejercicio 4** — decide y justifica

Para cada caso, decide si va composición o si habrá que esperar al contexto del
Día 4. Escribe tu razón en una línea:

```
a) El tema visual (claro/oscuro) que afecta a todos los componentes
b) El título de la página que solo usa la cabecera
c) La lista de notificaciones que cualquier componente puede disparar
d) El resultado de un filtro que usan la lista y el contador de resultados
```

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — useReducer

### 🎯 Objetivo
Concentrar en un solo lugar las transiciones de un estado con varias piezas.

---

### 📖 El problema real

El formulario de reserva que construiste en PS-4 tiene que manejar: los datos que
el usuario escribe, si se está enviando, si hubo un error, y si se completó con
éxito.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Con `useState`, uno por cosa:

```tsx
const [cliente, setCliente] = useState("");
const [personas, setPersonas] = useState(1);
const [enviando, setEnviando] = useState(false);
const [error, setError] = useState<string | null>(null);
const [exito, setExito] = useState(false);
```

Y en el manejador:

```tsx
function enviar() {
  setEnviando(true);
  setError(null);
  setExito(false);

  const problema = validar(cliente, personas);
  if (problema) {
    setError(problema);
    setEnviando(false);
    return;
  }

  guardarReserva({ cliente, personas });
  setEnviando(false);
  setExito(true);
  setCliente("");
  setPersonas(1);
}
```

Funciona. Escríbelo así primero.

---

### 📖 Por qué esa solución es insuficiente

**Existen estados imposibles.** Nada impide que `enviando` sea `true` mientras
`error` tiene texto y `exito` es `true`. Son tres booleanos independientes: 8
combinaciones, de las cuales solo 4 tienen sentido. Un `set` olvidado en un
camino te deja en una de las otras 4, y la interfaz muestra el spinner y el
error a la vez.

**La lógica de transición está desparramada.** Para saber qué pasa al enviar,
hay que leer el manejador entero y rastrear cinco `set`. Si mañana agregas un
botón "reintentar", tienes que acordarte de los cinco.

**No se puede probar por separado.** La lógica vive dentro del componente,
mezclada con el JSX.

Y fíjate en el patrón: los cinco valores **cambian juntos**. Cada evento del
usuario toca varios a la vez. Eso es la señal.

---

### 📖 useReducer como solución natural

La idea: en vez de que el componente diga *qué valores poner*, dice *qué pasó*.
Una función aparte decide las consecuencias.

```tsx
type Estado = {
  cliente: string;
  personas: number;
  estado: "editando" | "enviando" | "error" | "exito";
  mensajeError: string | null;
};

type Accion =
  | { tipo: "escribir_cliente"; valor: string }
  | { tipo: "cambiar_personas"; valor: number }
  | { tipo: "enviar" }
  | { tipo: "fallar"; mensaje: string }
  | { tipo: "completar" };

const ESTADO_INICIAL: Estado = {
  cliente: "",
  personas: 1,
  estado: "editando",
  mensajeError: null
};

function reductor(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case "escribir_cliente":
      return { ...estado, cliente: accion.valor, estado: "editando" };
    case "cambiar_personas":
      return { ...estado, personas: accion.valor, estado: "editando" };
    case "enviar":
      return { ...estado, estado: "enviando", mensajeError: null };
    case "fallar":
      return { ...estado, estado: "error", mensajeError: accion.mensaje };
    case "completar":
      return ESTADO_INICIAL;
  }
}
```

Y en el componente:

```tsx
const [estado, dispatch] = useReducer(reductor, ESTADO_INICIAL);

<input
  value={estado.cliente}
  onChange={(e) => dispatch({ tipo: "escribir_cliente", valor: e.target.value })}
/>

{estado.estado === "error" && <p className="error">{estado.mensajeError}</p>}
```

**Fíjate en lo que desapareció:** los tres booleanos se convirtieron en un solo
campo `estado` con cuatro valores posibles. Los estados imposibles ya no se
pueden representar. No es que estén prohibidos: **no existen**.

---

### 📖 Cómo funciona

`useReducer(reductor, estadoInicial)` retorna dos cosas:

```
estado    → el valor actual, igual que el de useState
dispatch  → una función que recibe una acción y la manda al reductor
```

La secuencia:

```
1. Llamas a dispatch({ tipo: "enviar" })
2. React llama a reductor(estadoActual, { tipo: "enviar" })
3. El reductor retorna un objeto nuevo
4. React guarda ese objeto y vuelve a renderizar el componente
```

Es el mismo ciclo de `useState`. La diferencia es **quién decide el valor
nuevo**: antes lo decidía el componente, ahora lo decide una función pura fuera
de él.

**Las tres reglas del reductor:**

```
1. Función pura — mismos argumentos, mismo resultado, sin efectos secundarios
   (nada de fetch, alert, localStorage ni Math.random adentro)
2. Nunca muta — siempre retorna un objeto nuevo
3. Vive fuera del componente — no lee props ni estado directamente;
   todo lo que necesita llega en la acción
```

---

### 📖 Por qué funciona así

> **`useState` es "pon esto en este valor". `useReducer` es "pasó esto, decide tú".**

El componente reporta hechos del mundo: el usuario escribió, el usuario envió,
la operación falló. El reductor traduce hechos en estado.

Esa separación da tres cosas que no tenías: todas las transiciones legales en un
solo archivo legible, imposibilidad de estados inconsistentes si los tipas bien,
y una función pura que puedes probar sin renderizar nada.

---

### 📖 La sintaxis nueva: unión discriminada

El tipo `Accion` de arriba es una **unión discriminada**: varias variantes, todas
con el campo `tipo`, cada una con un valor literal distinto.

Está en la Cheat Sheet sección 6 con su trampa. La resumo porque la vas a pisar:
el campo discriminante debe ser un **literal** (`tipo: "enviar"`), nunca `string`.
Si escribes `string`, TypeScript no puede distinguir las variantes y pierdes todo
el estrechamiento dentro del `switch`.

---

### 📖 Cuándo NO usar useReducer

```
✗ Un solo valor independiente → useState es más corto y más claro
✗ Estado que no tiene transiciones, solo asignaciones → useState
✗ "Por si acaso crece" → agrégalo cuando duela, no antes
```

La señal para migrar de `useState` a `useReducer`: **cuando un evento del
usuario obliga a llamar tres o más `set` seguidos.**

---

### 📖 Mini-ejercicio de comprensión

Este reductor tiene un bug que no da error de compilación:

```tsx
function reductor(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case "agregar":
      estado.items.push(accion.item);
      return { ...estado };
  }
}
```

¿Cuál es, qué síntoma produce en pantalla, y por qué el spread del `return` no lo
salva?

---

### 🔗 Conexión con Next.js

`useActionState` de React 19, que administra el estado de los formularios contra
el servidor, es un reductor por debajo: recibe el estado anterior y la acción, y
retorna el nuevo. Cuando llegues a los formularios de Next.js, este día es el que
lo hace obvio.

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — migrar el formulario

Convierte el `FormularioReserva` de la Semana 10 / PS-4 de `useState` múltiple a
`useReducer`. El reductor va en su propio archivo, fuera del componente.

**Ejercicio 2** — `src/logica/reductorReservas.ts`

Reductor para la lista de reservas con las acciones: `agregar`, `eliminar`,
`cambiar_estado` (confirmada/pendiente/cancelada) y `limpiar_canceladas`.

> 🆕 Para el `id` de las reservas nuevas usa `crypto.randomUUID()`.
> Definición y trampa en la Cheat Sheet, sección 6.

**Ejercicio 3** — pruébalo sin React

Importa tu reductor en un archivo `.ts` suelto y llámalo directamente con un
estado y una acción, imprimiendo el resultado con `console.log`. Sin componentes,
sin navegador.

Que esto sea posible es la mitad del valor de `useReducer`. Anota en un
comentario por qué no podrías hacer lo mismo con la versión de `useState`.

**Ejercicio 4** — encuentra los estados imposibles

```tsx
const [cargando, setCargando] = useState(false);
const [datos, setDatos] = useState<Reserva[] | null>(null);
const [error, setError] = useState<string | null>(null);
```

Enumera las combinaciones que no deberían poder existir. Después reescríbelo como
un solo estado con unión discriminada donde esas combinaciones sean
irrepresentables.

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — useContext

### 🎯 Objetivo
Publicar un valor para todo un subárbol, y saber cuándo eso es mala idea.

---

### 📖 El problema real

Nexus necesita notificaciones: cuando se crea una reserva, cuando falla una
validación, cuando se cancela algo. El aviso aparece siempre en el mismo sitio,
arriba a la derecha.

Pero **cualquier componente puede dispararlas**. El formulario, la lista, el
panel de detalle, y los que agregues mañana.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Levantas el estado de las notificaciones a `App` y bajas la función
`mostrarNotificacion` por props a todo componente que pueda necesitarla.

---

### 📖 Por qué esa solución es insuficiente

Ayer eliminaste el prop drilling con composición. Intenta aplicarla aquí y verás
que no funciona: la composición sirve cuando puedes **crear el JSX donde está el
dato**. Pero aquí el dato no se muestra abajo — se *dispara* desde abajo, y en
posiciones que no conoces de antemano.

Bajar `mostrarNotificacion` por props significa que cada componente nuevo del
árbol necesita recibirla, y cada componente intermedio también, aunque no la use.
Es prop drilling que crece con la aplicación en vez de reducirse.

---

### 📖 useContext como solución natural

El contexto invierte la dirección: en vez de pasar el valor hacia abajo paso a
paso, alguien lo **publica** y cualquier descendiente lo **lee** directamente.

```tsx
import { createContext, useContext, useState } from "react";

type Notificacion = { id: string; texto: string; tipo: "exito" | "error" };

type ContextoNotificacionesValor = {
  notificaciones: Notificacion[];
  notificar: (texto: string, tipo: "exito" | "error") => void;
};

const ContextoNotificaciones =
  createContext<ContextoNotificacionesValor | undefined>(undefined);

function ProveedorNotificaciones({ children }: { children: React.ReactNode }) {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  function notificar(texto: string, tipo: "exito" | "error") {
    const nueva = { id: crypto.randomUUID(), texto, tipo };
    setNotificaciones((anteriores) => [...anteriores, nueva]);
  }

  return (
    <ContextoNotificaciones value={{ notificaciones, notificar }}>
      {children}
    </ContextoNotificaciones>
  );
}
```

Y a cualquier profundidad:

```tsx
function FormularioReserva() {
  const { notificar } = useNotificaciones();

  function alGuardar() {
    notificar("Reserva creada", "exito");
  }
}
```

---

### 📖 Cómo funciona

Tres piezas:

```
createContext(valorPorDefecto)  → crea el canal
<Contexto value={...}>          → publica un valor para todo su subárbol
useContext(Contexto)            → lee el valor del provider MÁS CERCANO
```

Cuando un componente llama a `useContext`, React sube por el árbol buscando el
provider más cercano de ese contexto y devuelve su `value`. Si el valor cambia,
React vuelve a renderizar **todos** los componentes que lo consumen.

**Nota de versión:** `<Contexto value={...}>` requiere React 19. Antes se
escribía `<Contexto.Provider value={...}>`, que es lo que verás en la mayoría de
los tutoriales. Hacen lo mismo.

---

### 📖 La trampa que te va a costar una hora

```tsx
const ContextoNotificaciones = createContext<Valor | undefined>(undefined);
```

Si un componente llama a `useContext` y **no hay ningún provider por encima**,
no explota: recibe el valor por defecto. Tu componente se renderiza con datos
vacíos, sin ningún error en consola, y tú buscas el bug donde no está.

Pasa constantemente: olvidas envolver una parte del árbol, o mueves un
componente fuera del provider al refactorizar.

**La solución estándar — envolver el contexto en un custom hook que grita:**

```tsx
function useNotificaciones() {
  const valor = useContext(ContextoNotificaciones);
  if (valor === undefined) {
    throw new Error("useNotificaciones debe usarse dentro de <ProveedorNotificaciones>");
  }
  return valor;
}
```

Ahora el error aparece en el componente culpable, con el nombre del provider que
falta. Los componentes importan `useNotificaciones`, nunca el contexto crudo.

Fíjate en lo que acaba de pasar: **el Día 1 y el Día 4 se juntaron.** El custom
hook no era un tema suelto; es la pieza que hace el contexto usable.

---

### 📖 Cuándo NO usar contexto

Esta sección importa tanto como la anterior.

**No es un gestor de estado global.** El contexto transporta; no guarda. Detrás
sigue habiendo un `useState` o un `useReducer`. Si alguien dice "usa contexto en
vez de estado", está confundiendo el cable con el enchufe.

**Cada cambio re-renderiza a todos los consumidores.** Si metes ahí un valor que
cambia en cada tecla —el texto de un buscador, por ejemplo— provocas un render
de media aplicación por letra.

**Oculta el origen de los datos.** Con props ves de dónde viene todo leyendo el
árbol. Con contexto tienes que buscar el provider. Es un costo real al depurar, y
por eso se paga solo cuando compensa.

**La regla:** contexto para datos que cambian **poco** y necesitan **muchos**:
sesión, tema, idioma, notificaciones. No para el estado de un formulario.

---

### 📖 Mini-ejercicio de comprensión

```tsx
<ContextoSesion value={{ nombre: "Óscar", rol: "admin" }}>
  <Dashboard />
</ContextoSesion>
```

Este código provoca un re-render de todos los consumidores en **cada** render de
`App`, aunque la sesión no cambie nunca. ¿Por qué?

Pista: piensa qué pasa con ese objeto literal en cada ejecución de la función.

---

### 🔗 Conexión con Next.js

En Next.js los providers de contexto tienen que ser Client Components (llevan
`"use client"`), y se colocan normalmente en el `layout.tsx` raíz envolviendo
`{children}`. Los Server Components que van dentro **no pueden leer contexto** —
se ejecutan en el servidor, donde el árbol de React del cliente no existe. Es una
de las fronteras que más confunde al empezar, y este día es su base.

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — `src/contextos/ContextoNotificaciones.tsx`

Sistema de notificaciones completo: proveedor, custom hook con el `throw`, y un
componente que las muestra. Deben desaparecer solas a los 4 segundos.

Pista: desaparecer solo es hablar con un sistema externo. Ya sabes cuál es el
hook para eso, y ya sabes que necesita limpieza.

**Ejercicio 2** — `src/contextos/ContextoSesion.tsx`

Contexto con el usuario actual (`nombre`, `rol`). Un selector en la cabecera
permite cambiar entre "admin" y "guia". La lista de expediciones muestra el botón
de editar **solo** si el rol es admin.

**Ejercicio 3** — el bug del provider ausente

Saca a propósito un componente fuera del proveedor y observa qué pasa **antes**
de agregar el `throw`. Luego agrégalo y compara.

Documenta las dos experiencias en un comentario. Este ejercicio es sobre por qué
existe el patrón, no sobre el patrón.

**Ejercicio 4** — audita tu propio proyecto

Lista todos los estados de tu aplicación y clasifica cada uno: props, estado
local, estado levantado, o contexto. Justifica los que pusiste en contexto contra
la regla de "cambia poco, lo necesitan muchos".

Si alguno no pasa la regla, cámbialo.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — CONTEXTO + REDUCTOR, Y LOS LÍMITES

### 🎯 Objetivo
Combinar los dos patrones, y reconocer dónde React deja de alcanzar.

---

### 📖 El problema real

Las reservas de Nexus las modifican tres vistas distintas: el formulario las
crea, la lista las cancela, el panel de detalle cambia su estado. Y las tres, más
el resumen ejecutivo, tienen que ver siempre lo mismo.

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Tienes las dos piezas. `useReducer` en `App` para el estado de las reservas, y
contexto para que las tres vistas lo alcancen sin drilling.

Esa intuición es correcta. Este día es armarla bien.

---

### 📖 El patrón, y por qué dos contextos

```tsx
const ContextoReservas = createContext<Estado | undefined>(undefined);
const ContextoDispatch = createContext<React.Dispatch<Accion> | undefined>(undefined);

function ProveedorReservas({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = useReducer(reductorReservas, ESTADO_INICIAL);

  return (
    <ContextoReservas value={estado}>
      <ContextoDispatch value={dispatch}>
        {children}
      </ContextoDispatch>
    </ContextoReservas>
  );
}

// Dos hooks, cada uno con su throw
export function useReservas() { /* ... */ }
export function useReservasDispatch() { /* ... */ }
```

**Por qué separados.** `dispatch` es estable: React garantiza que es la misma
función en todos los renders. El estado, en cambio, cambia constantemente.

Si van juntos en un objeto, ese objeto es nuevo en cada render, y **todos** los
consumidores se re-renderizan — incluidos los componentes que solo despachan
acciones y no leen el estado. Un botón "cancelar reserva" no necesita repintarse
porque cambió una reserva que no muestra.

Separando los contextos, cada componente se suscribe solo a lo que usa.

---

### 📖 Por qué esto se parece tanto a una librería de estado

Lo que acabas de construir —un estado central, acciones con nombre, una función
pura que decide las transiciones, y acceso desde cualquier punto del árbol— es
la arquitectura de Redux, y la idea que Zustand simplifica.

Entender esto ahora tiene una consecuencia práctica: cuando llegues a Zustand en
el stack, no vas a aprender un concepto nuevo. Vas a aprender una sintaxis más
corta para algo que ya sabes armar a mano.

---

### 📖 Dónde deja de alcanzar

Honestidad sobre los límites de lo que aprendiste esta semana:

**Rendimiento con estado grande y cambios frecuentes.** Aunque separes contextos,
cualquier cambio en el estado re-renderiza a todos sus consumidores. No hay forma
de decir "solo me interesa la reserva número 4". Las librerías dedicadas sí
permiten suscribirse a una porción.

**Anidamiento de proveedores.** Con seis contextos, el `App` se convierte en una
pirámide de seis niveles de proveedores antes de llegar al contenido.

**Estado del servidor.** Nada de esto sirve para datos que viven en una base de
datos: no hay caché, ni revalidación, ni sincronización entre pestañas. Eso lo
resuelven otras herramientas, y es la razón por la que existen.

**Cuándo pasar a Zustand:** cuando el estado global sea grande, cambie seguido, y
el perfilador muestre re-renders que no deberían ocurrir. Ni antes, ni por
costumbre.

---

### 📖 Mini-ejercicio de comprensión

Tu aplicación tiene estos cinco estados. Para cada uno decide la herramienta y
justifica en una línea:

```
a) El texto del buscador del catálogo
b) La lista de reservas, modificada desde tres vistas
c) Si el panel lateral está abierto
d) El usuario en sesión
e) La expedición seleccionada en el panel de detalle
```

---

### 🔗 Conexión con Next.js

En Next.js con App Router, buena parte de lo que hoy pondrías en contexto deja de
existir: los datos vienen del servidor por props y no hay que compartirlos por el
cliente. El contexto queda para lo que es genuinamente del navegador —tema,
notificaciones, estado de la interfaz. Que tu contexto sea pequeño hoy es buena
preparación para eso.

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — proveedor de reservas

Monta el patrón completo: reductor del Día 3 + dos contextos separados + dos
custom hooks con `throw`. Las tres vistas lo consumen.

**Ejercicio 2** — demuestra la diferencia

Pon un `console.log` en un componente que solo despacha acciones. Ejecuta la
aplicación con los dos contextos separados, y luego júntalos en uno solo.

Cuenta los renders en cada caso y documenta el resultado. No aceptes el argumento
del material: mídelo.

**Ejercicio 3** — refactor final

Revisa todo tu proyecto y aplica la tabla de decisión de la Cheat Sheet, sección
7. Todo estado debe estar en el nivel más bajo que lo necesite.

**Ejercicio 4** — argumenta en contra

Escribe un párrafo defendiendo que el contexto de sesión del Día 4 **no** debería
ser contexto, sino props. Después decide si te convenciste.

No hay respuesta correcta. El ejercicio es sostener el argumento contrario con
honestidad.

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO DE LA SEMANA

### 🏆 Nexus Operaciones — Asignación de Guías

> Nexus creció. Ya no basta con ver expediciones y crear reservas: TerraMater
> necesita asignar guías a cada expedición y controlar que nadie quede en dos
> lugares el mismo día.
>
> Este módulo se agrega **al lado** del dashboard existente. Y ahí está el
> desafío real: dos módulos que comparten datos, escritos para que agregar un
> tercero no duela.

---

### 📋 Los datos

A los arrays de PS-1 se suma uno nuevo. Guárdalo en `src/datos/guias.ts`:

```typescript
export const guias: Guia[] = [
  { id: "GUI001", nombre: "Ignacio Herrera", especialidad: "trekking", certificaciones: 3 },
  { id: "GUI002", nombre: "Paula Márquez", especialidad: "kayak", certificaciones: 2 },
  { id: "GUI003", nombre: "Tomás Riquelme", especialidad: "escalada", certificaciones: 4 },
  { id: "GUI004", nombre: "Javiera Núñez", especialidad: "rafting", certificaciones: 2 },
  { id: "GUI005", nombre: "Matías Olivares", especialidad: "trekking", certificaciones: 1 }
];
```

Las asignaciones las crea el usuario en tiempo de ejecución. Empiezan vacías.

---

### 📋 Lo que debe hacer

**1. Vista de operaciones**
- Lista de guías con su especialidad y certificaciones
- Para cada guía, las expediciones que tiene asignadas
- Asignar un guía a una expedición y quitarlo

**2. Reglas de negocio — en el reductor, no en el componente**
- Un guía no puede asignarse dos veces a la misma expedición
- Una expedición no puede tener más de 2 guías
- Aviso (no bloqueo) si la especialidad del guía no coincide con el tipo de
  expedición
- Solo el rol `admin` puede asignar; el rol `guia` solo puede ver

**3. Navegación entre módulos**
- Cambiar entre "Catálogo" y "Operaciones" sin perder el estado de ninguno
- El módulo que no se ve conserva sus filtros y su selección

**4. Notificaciones**
- Cada asignación, cada rechazo por regla y cada error produce una notificación
- Desaparecen solas

**5. Resumen operativo**
- Expediciones con reservas confirmadas pero sin ningún guía asignado
- Guías sin ninguna asignación
- Promedio de guías por expedición asignada

---

### 📋 Requisitos técnicos

```
✅ Mínimo 3 custom hooks propios, con responsabilidad clara cada uno
✅ El estado de asignaciones se maneja con useReducer
✅ El reductor vive fuera de los componentes y es una función pura
✅ Acciones tipadas con unión discriminada
✅ Contexto SOLO para: sesión y notificaciones
✅ Los contextos de estado y dispatch separados donde aplique
✅ Todo contexto se consume mediante un custom hook con throw
✅ Composición para eliminar prop drilling — cero props que solo se pasan
✅ Las reglas de negocio se validan en el reductor, nunca en el JSX
✅ Cero any
❌ Sin contexto para el estado de filtros o formularios
❌ Sin useEffect para valores derivables
❌ Sin mutación de estado
```

El requisito de **contexto solo para sesión y notificaciones** es el que más se
va a tentar de romper. Si te encuentras queriendo meter los filtros ahí, releé
la regla del Día 4: cambia poco, lo necesitan muchos. Los filtros cambian mucho.

---

### 📋 Estructura sugerida

```
src/
├── datos/           expediciones.ts · reservas.ts · guias.ts
├── tipos/           entidades.ts
├── logica/          analisis.ts · reductorAsignaciones.ts · reglas.ts
├── hooks/           useFiltrosExpediciones.ts · useLocalStorage.ts · ...
├── contextos/       ContextoSesion.tsx · ContextoNotificaciones.tsx
├── componentes/
│   ├── catalogo/
│   └── operaciones/
├── Layout.tsx
└── App.tsx
```

`logica/reglas.ts` importa: las cuatro reglas de negocio son funciones puras que
reciben el estado y una asignación propuesta, y responden si es válida. El
reductor las usa; los componentes no las conocen.

---

### 💡 Las dos únicas pistas

**Pista 1** — El estado de asignaciones no necesita ser una lista de objetos
grandes. Piensa cuál es la información mínima que representa "el guía X está en
la expedición Y", y deriva todo lo demás de los arrays que ya tienes.

**Pista 2** — Para que el módulo oculto conserve su estado hay dos caminos:
mantener ambos montados y esconder uno con CSS, o levantar el estado por encima
de los dos. Solo uno de los dos sigue la regla de "el estado en el nivel más bajo
que lo necesite". Decide cuál y justifícalo en el README.

---

### ✅ Criterios de aprobación

```
□ La aplicación corre sin errores ni advertencias
□ Las cuatro reglas de negocio se cumplen y se validan en el reductor
□ Cambiar de módulo no pierde el estado del otro
□ Los permisos por rol funcionan
□ Cada contexto tiene su custom hook con throw
□ Ninguna prop se pasa a un componente que no la usa
□ El reductor se puede ejecutar y probar sin renderizar nada
□ Cero any
□ Subido a GitHub con commit descriptivo
```

**Verificación cruzada:** los números del resumen operativo deben ser consistentes
con los datos de reservas de PS-1. Una expedición con reservas confirmadas y sin
guía debe aparecer en la lista de alerta.

---

**Cuando termines el proyecto, avísame. Hacemos la validación semanal interactiva.** 🎯

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-11/
└── nexus-operaciones/     (o el mismo proyecto de la Semana 10, extendido)
    ├── src/
    ├── package.json
    └── README.md
```

Continuar en el proyecto de la Semana 10 es lo recomendable: parte del ejercicio
es que el código anterior aguante el crecimiento.

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 12:** Next.js — App Router, Server y Client Components, layouts,
> rutas dinámicas.
>
> Pendiente de generar. El mapa de la Semana 13 (Tailwind + shadcn/ui) tampoco
> está definido todavía.

---

*Semana 11 — React avanzado*
*Formato v4 — Constitución v1.3 · Protocolo QA con Fase 6b*
*Óscar — Full Stack Developer en formación 🇨🇱*
