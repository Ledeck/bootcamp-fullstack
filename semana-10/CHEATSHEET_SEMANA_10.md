# 📄 CHEAT SHEET — SEMANA 10
## React · Componentes · JSX · Props · Estado · Efectos

> Léela completa antes de empezar el Día 1.
> No es un resumen posterior — es el mapa del territorio antes de caminar.

---

## ⏱ BLOQUE PERECEDERO — verificar antes de usar

```
Generado y verificado: julio 2026
Regenerar este bloque antes de empezar la semana.
Todo lo que está fuera de este bloque es contenido duradero y no caduca.
```

```bash
npm create vite@latest nexus-dashboard -- --template react-ts
cd nexus-dashboard
npm install
npm run dev
```

Verifica en `package.json` que `react` esté en versión 19.x.

Vite es el estándar para aplicaciones React de una sola página. Create React App
quedó deprecado en febrero de 2025 y no se usa en proyectos nuevos.

Los archivos con JSX llevan extensión `.tsx`, no `.ts`.

**Qué verificar al llegar a esta semana:** que el comando de creación de Vite siga
siendo ese, y qué versión de React trae la plantilla. El resto del documento no
depende de eso.

---

## 1. COMPONENTE

**Qué es:** Una función que retorna JSX. Es la unidad mínima de interfaz en React.

**Para qué sirve:** Dividir una interfaz grande en piezas independientes y reutilizables.

**Cuándo usarlo:** Siempre. En React todo es un componente.
**Cuándo NO:** No crees un componente para algo que se usa una sola vez y no tiene lógica propia.

```tsx
function Bienvenida() {
  return <h1>Bienvenido a Nexus</h1>;
}
```

**Error típico:** Nombrar el componente en minúscula. React trata `<bienvenida />`
como una etiqueta HTML desconocida y no la renderiza. **El nombre debe empezar en
mayúscula.**

**Idea mental:** Un componente es una función que fabrica un pedazo de pantalla.
Entra información, sale interfaz.

---

## 2. JSX

**Qué es:** Sintaxis que permite escribir estructura de interfaz dentro de
JavaScript. No es HTML — es azúcar sintáctica que se convierte en llamadas a
funciones.

**Reglas que no puedes saltarte:**

```tsx
// Un solo elemento raíz. Esto falla:
return (
  <h1>Título</h1>
  <p>Texto</p>
);

// Solución 1: envolver en un elemento
return (
  <div>
    <h1>Título</h1>
    <p>Texto</p>
  </div>
);

// Solución 2: fragmento — no genera nodo en el HTML final
return (
  <>
    <h1>Título</h1>
    <p>Texto</p>
  </>
);
```

```tsx
// Toda etiqueta se cierra, incluso las que en HTML no se cierran
<img src="foto.jpg" />
<br />
<input type="text" />

// Atributos que cambian de nombre porque class y for son palabras reservadas de JS
<div className="tarjeta">   // no class
<label htmlFor="nombre">    // no for
```

**Llaves = expresión de JavaScript:**

```tsx
const nombre = "Torres del Paine";
const precio = 450000;

return (
  <div>
    <h2>{nombre}</h2>
    <p>{precio.toLocaleString("es-CL")}</p>
    <p>{precio > 300000 ? "Premium" : "Estándar"}</p>
  </div>
);
```

**Error típico:** Meter una sentencia donde solo caben expresiones.
`{if (x) { ... }}` falla. Las llaves aceptan lo que produce un valor: una
variable, una llamada a función, un ternario, un `&&`. No un `if` ni un `for`.

**Idea mental:** Las llaves son una ventana desde el JSX hacia JavaScript.
Lo que pongas ahí tiene que *valer* algo.

---

## 3. PROPS

**Qué es:** Los datos que un componente padre le pasa a un componente hijo.

**Para qué sirve:** Que un mismo componente sirva para muchos casos distintos.

```tsx
type TarjetaProps = {
  nombre: string;
  precio: number;
  dificultad: "baja" | "media" | "alta";
  destacada?: boolean;
};

function Tarjeta({ nombre, precio, dificultad, destacada = false }: TarjetaProps) {
  return (
    <div className={destacada ? "tarjeta destacada" : "tarjeta"}>
      <h3>{nombre}</h3>
      <p>${precio.toLocaleString("es-CL")}</p>
      <span>{dificultad}</span>
    </div>
  );
}

// Uso desde el padre
<Tarjeta nombre="Torres del Paine" precio={450000} dificultad="alta" />
```

**Regla que no se negocia:** Las props son de **solo lectura**. Un componente
nunca modifica las props que recibe. Si necesitas que un valor cambie, ese valor
es estado, no prop.

```tsx
// ❌ Nunca
function Tarjeta({ precio }: TarjetaProps) {
  precio = precio * 1.19;  // mutar una prop
}

// ✅ Derivar un valor nuevo
function Tarjeta({ precio }: TarjetaProps) {
  const precioConIva = precio * 1.19;
}
```

**Sintaxis de paso:**

```tsx
<Tarjeta texto="hola" />        // string: comillas directas
<Tarjeta precio={450000} />     // cualquier otro tipo: llaves
<Tarjeta activa={true} />
<Tarjeta activa />              // atajo — equivale a activa={true}
<Tarjeta datos={expedicion} />  // objeto completo
```

**`children` — el contenido entre las etiquetas:**

```tsx
type PanelProps = {
  titulo: string;
  children: React.ReactNode;
};

function Panel({ titulo, children }: PanelProps) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

<Panel titulo="Catálogo">
  <p>Esto es children</p>
</Panel>
```

**Idea mental:** Las props son los parámetros de la función. `children` es el
parámetro especial que contiene lo que el padre puso "adentro" de la etiqueta.

---

## 4. RENDERIZAR LISTAS

Es `map` de la Semana 3, aplicado a JSX. No hay nada nuevo en el método —
lo nuevo es qué retornas.

```tsx
const expediciones = [
  { id: "EXP001", nombre: "Cruce Los Andes", precio: 280000 },
  { id: "EXP003", nombre: "Torres del Paine", precio: 450000 }
];

return (
  <div>
    {expediciones.map((expedicion) => (
      <Tarjeta
        key={expedicion.id}
        nombre={expedicion.nombre}
        precio={expedicion.precio}
      />
    ))}
  </div>
);
```

**La prop `key`:** React la usa para saber qué elemento es cuál entre renders.
Debe ser **única entre hermanos** y **estable** — el mismo dato debe llevar
siempre la misma key.

**Error típico:** Usar el índice como key.

```tsx
{expediciones.map((exp, indice) => <Tarjeta key={indice} ... />)}
```

Funciona mientras la lista nunca cambie de orden ni se filtre. En el momento en
que filtras o eliminas un elemento, los índices se recorren y React asocia el
estado del elemento equivocado al dato equivocado. Usa el `id` real del dato.

**Idea mental:** La key es el número de asiento numerado. Sin ella, React solo
sabe "había cinco personas, ahora hay cuatro", pero no cuál se fue.

---

## 5. RENDERIZADO CONDICIONAL

```tsx
// Ternario — cuando hay dos alternativas
{hayReservas ? <ListaReservas /> : <p>Sin reservas</p>}

// && — cuando solo hay algo que mostrar o nada
{hayError && <p className="error">Algo salió mal</p>}

// Variable previa — cuando la condición es compleja
let contenido;
if (cargando) {
  contenido = <p>Cargando...</p>;
} else if (expediciones.length === 0) {
  contenido = <p>No hay expediciones</p>;
} else {
  contenido = <ListaExpediciones datos={expediciones} />;
}
return <div>{contenido}</div>;
```

**Error típico grave — el `0` sí se renderiza:**

```tsx
// ❌ Si expediciones está vacío, esto imprime un 0 suelto en la pantalla
{expediciones.length && <ListaExpediciones />}

// ✅
{expediciones.length > 0 && <ListaExpediciones />}
```

React no renderiza `false`, `null` ni `undefined`. Pero `0` es un número válido
y lo pinta. `[].length && algo` evalúa a `0`, no a `false`.

---

## 6. useState

**Qué es:** El hook que le da memoria a un componente entre renders.

**Para qué sirve:** Guardar un valor que, al cambiar, debe repintar la interfaz.

```tsx
import { useState } from "react";

function Contador() {
  const [cantidad, setCantidad] = useState(0);

  return (
    <div>
      <p>{cantidad}</p>
      <button onClick={() => setCantidad(cantidad + 1)}>Sumar</button>
    </div>
  );
}
```

`useState` retorna un array de dos posiciones: el valor actual y la función que
lo cambia. Se desestructura por posición, así que los nombres los eliges tú
(la convención es `algo` / `setAlgo`).

**Por qué no una variable normal:**

```tsx
// ❌ Esto no funciona
function Contador() {
  let cantidad = 0;
  return <button onClick={() => cantidad++}>{cantidad}</button>;
}
```

Dos razones, y las dos importan. Primero: React no se entera de que la variable
cambió, así que no vuelve a ejecutar la función y la pantalla no se actualiza.
Segundo: aunque se enterara, cada vez que React ejecuta el componente la línea
`let cantidad = 0` se vuelve a ejecutar y el valor se pierde. El estado vive
*fuera* de la función, en React; la función solo lo pide.

**Actualizar basándose en el valor anterior:**

```tsx
// ❌ Frágil
setCantidad(cantidad + 1);
setCantidad(cantidad + 1);  // suma 1, no 2

// ✅ Función actualizadora
setCantidad((anterior) => anterior + 1);
setCantidad((anterior) => anterior + 1);  // suma 2
```

`cantidad` es el valor capturado en este render, no un valor vivo. Cuando el
nuevo estado depende del anterior, pasa una función.

**Error típico — leer el estado justo después de setear:**

```tsx
setCantidad(5);
console.log(cantidad);  // imprime el valor VIEJO
```

Las actualizaciones no son inmediatas. React agrupa los cambios y vuelve a
ejecutar el componente después. El nuevo valor aparece en el siguiente render.

**Inmutabilidad — obligatoria con objetos y arrays:**

```tsx
// ❌ React no detecta el cambio: es el mismo objeto en memoria
filtros.tipo = "kayak";
setFiltros(filtros);

lista.push(nueva);
setLista(lista);

// ✅ Crear una estructura nueva
setFiltros({ ...filtros, tipo: "kayak" });
setLista([...lista, nueva]);
setLista(lista.filter((item) => item.id !== idBorrar));
setLista(lista.map((item) => (item.id === id ? { ...item, activa: true } : item)));
```

React compara el valor viejo con el nuevo por identidad. Si mutas el objeto
original, ambos son el mismo objeto y React concluye que nada cambió.

**Idea mental:** El estado es la memoria del componente. Cada `set` no cambia
la memoria en el acto — le deja un recado a React: "en el próximo render, este
es el valor".

---

## 7. EVENTOS

```tsx
<button onClick={manejarClic}>Enviar</button>          // ✅ referencia a la función
<button onClick={manejarClic()}>Enviar</button>        // ❌ la ejecuta al renderizar
<button onClick={() => manejarClic(id)}>Enviar</button> // ✅ con argumentos
```

Nombres en camelCase: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`.

**Input controlado** — el estado manda sobre lo que se ve:

```tsx
const [busqueda, setBusqueda] = useState("");

<input
  type="text"
  value={busqueda}
  onChange={(evento) => setBusqueda(evento.target.value)}
/>
```

`value` fija lo que muestra el input; `onChange` actualiza el estado. Si pones
`value` sin `onChange`, el input queda congelado y no puedes escribir.

---

## 8. LEVANTAR EL ESTADO

**Qué es:** Mover el estado al ancestro común más cercano cuando dos componentes
necesitan compartirlo.

**Cuándo usarlo:** Cuando un hermano necesita saber algo que ocurre en otro hermano.

```tsx
function Dashboard() {
  const [filtro, setFiltro] = useState("todos");

  return (
    <>
      <Filtros valor={filtro} onCambiar={setFiltro} />
      <Lista filtro={filtro} />
    </>
  );
}
```

El dato baja como prop. El aviso de cambio sube como función.
Los datos van hacia abajo, los eventos hacia arriba.

**Cuándo NO:** No subas el estado "por si acaso". Mantenlo en el componente más
bajo que lo necesite; si lo subes de más, todo el árbol se repinta sin motivo.

**Idea mental:** Si dos personas necesitan mirar el mismo reloj, el reloj se
cuelga en la pared que ambas ven — no se le da uno a cada una.

---

## 9. useEffect

**Qué es:** El hook para sincronizar el componente con un sistema **externo** a React.

**Advertencia — léela dos veces:** `useEffect` fue durante años la respuesta por
defecto a "quiero hacer algo cuando el componente carga", y ese uso hoy se
considera un olor a código. No es la herramienta para pedir datos a un servidor
ni para calcular valores derivados del estado. Esta semana lo aprendes para lo
que sí es: hablar con algo que no es React.

```tsx
import { useEffect } from "react";

useEffect(() => {
  document.title = `Nexus — ${expediciones.length} expediciones`;
}, [expediciones.length]);
```

**El array de dependencias:**

```tsx
useEffect(() => { ... });              // después de CADA render
useEffect(() => { ... }, []);          // solo después del primer render
useEffect(() => { ... }, [a, b]);      // cuando a o b cambian
```

**Función de limpieza** — se ejecuta antes del siguiente efecto y al desmontar:

```tsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

Sin la limpieza, cada vez que el efecto vuelve a correr queda un temporizador
vivo. Diez renders, diez temporizadores.

**Cuándo SÍ usarlo:** `document.title`, temporizadores, suscripciones a eventos
del navegador (`resize`, `scroll`), `localStorage`, librerías de terceros que no
son React.

**Cuándo NO usarlo:**

```tsx
// ❌ Estado derivado — no necesita efecto ni estado propio
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((suma, item) => suma + item.precio, 0));
}, [items]);

// ✅ Calcularlo durante el render
const total = items.reduce((suma, item) => suma + item.precio, 0);
```

Si el valor se puede calcular a partir de props y estado que ya tienes, calcúlalo
y ya. Un efecto para eso provoca un render extra y una fuente de verdad duplicada.

**Idea mental:** Un efecto es un cable que sale de React hacia el mundo exterior.
Si los dos extremos del cable están dentro de React, no necesitas cable.

---

## 10. SINTAXIS NUEVA DE ESTA SEMANA

Dos herramientas que no viste antes. Se entregan con definición, ejemplo y trampa.

### `Number(...)` sobre el valor de un input

Convierte a número el texto que entrega un campo de formulario.

```tsx
const [personas, setPersonas] = useState(1);

<input
  type="number"
  value={personas}
  onChange={(evento) => setPersonas(Number(evento.target.value))}
/>
```

> ⚠ **Dos trampas.**
>
> `evento.target.value` es **siempre un string**, incluso en un
> `<input type="number">`. Si tu estado está tipado como `number` y guardas el
> valor sin convertir, TypeScript te lo marca. Y sin tipos, `"3" + 1` daría
> `"31"` en vez de `4`.
>
> `Number("")` devuelve `0`, no `NaN`. Un campo vacío se convierte en cero en
> silencio — si eso importa para tu validación, compruébalo aparte.

### `React.ReactNode` como tipo de `children`

Es el tipo que acepta cualquier cosa que React sepa renderizar: texto, números,
elementos JSX, arrays de elementos, `null`.

```tsx
type PanelProps = {
  titulo: string;
  children: React.ReactNode;
};
```

> ⚠ **Trampa:** no lo confundas con `React.ReactElement`, que solo acepta un
> elemento JSX y rechaza texto plano. Para `children`, casi siempre quieres
> `ReactNode`.

---

## 11. LO QUE NO SE USA HOY

Para que no lo copies de tutoriales viejos:

| Patrón antiguo | Qué se usa ahora |
|---|---|
| `useEffect` + `fetch` para pedir datos | Server Components o TanStack Query (más adelante) |
| `useMemo` / `useCallback` / `React.memo` | El compilador de React lo hace solo |
| Componentes de clase | Funciones y hooks |
| `PropTypes` | TypeScript |
| Create React App | Vite |

---

## 12. LAS DOS REGLAS DE LOS HOOKS

```
1. Solo se llaman en el nivel superior del componente.
   Nunca dentro de if, for, while, ni funciones anidadas.

2. Solo se llaman desde componentes de React o desde otros hooks.
   Nunca desde una función normal.
```

**Por qué:** React identifica cada hook por el **orden** en que se llamó, no por
su nombre. Si un `useState` queda dentro de un `if`, el orden cambia entre
renders y React entrega el valor de un estado a otro.

El linter de Vite marca estas violaciones automáticamente. Si lo ves subrayado,
no es una sugerencia de estilo — es un bug real.

---

*Cheat Sheet Semana 10 — React*
*Prerrequisitos: Semana 3 (map, filter, reduce) · Semana 4 (objetos) · Semana 5 (ES6+) · Semana 8 (HTML/CSS) · Semana 09 (TypeScript)*
