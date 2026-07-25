# 📄 CHEAT SHEET — SEMANA 11
## Custom Hooks · Composición · useReducer · useContext

> Léela completa antes de empezar el Día 1.
> Esta semana no enseña nada que se vea en pantalla. Enseña a organizar lo que
> ya sabes hacer, para que siga siendo manejable cuando la aplicación crece.

---

## ⏱ BLOQUE PERECEDERO — verificar antes de usar

```
Generado y verificado: julio 2026
```

**No hay setup nuevo.** Esta semana continúa en el mismo proyecto Vite de la
Semana 10. No se instala nada.

Lo único con dependencia de versión:

```
Requiere React 19 o superior:
  · <Contexto value={...}> usado directamente como provider
  · el hook use() para leer contexto

En React 18 y anteriores había que escribir <Contexto.Provider value={...}>
Verifica la versión en package.json antes de empezar.
```

---

## 1. CUSTOM HOOK

**Qué es:** Una función que empieza con `use` y puede llamar a otros hooks.
No hay nada más. No es una API de React: es una convención.

**Para qué sirve:** Reutilizar lógica con estado entre componentes.

**Cuándo usarlo:** Cuando dos componentes repiten la misma combinación de estado
y comportamiento.
**Cuándo NO:** Si la lógica no usa ningún hook, es una función normal — déjala
como función normal en `logica/`.

```tsx
function useFiltroTexto(inicial: string = "") {
  const [texto, setTexto] = useState(inicial);

  function limpiar() {
    setTexto("");
  }

  return { texto, setTexto, limpiar };
}

// Uso
function Buscador() {
  const { texto, setTexto, limpiar } = useFiltroTexto();
  return (
    <>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={limpiar}>Limpiar</button>
    </>
  );
}
```

**El error conceptual número uno:**

> **Un custom hook comparte LÓGICA, no ESTADO.**

Si dos componentes llaman a `useFiltroTexto()`, cada uno obtiene **su propio
estado independiente**. Escribir en uno no afecta al otro. Es exactamente igual
que llamar dos veces a `useState`.

Para compartir estado de verdad hay que levantarlo o usar contexto (secciones 4
y 5).

**Error típico:** nombrar la función sin el prefijo `use`.

```tsx
function obtenerFiltro() {     // ❌ el linter no aplica las reglas de hooks aquí
  const [texto, setTexto] = useState("");
}
```

El prefijo no es decorativo: es lo que hace que el linter verifique que no
llamas hooks dentro de un `if` o un bucle.

**Idea mental:** un custom hook es una función normal que puede acordarse de
cosas. Cada componente que la llama tiene su propia memoria.

---

## 2. COMPOSICIÓN — pasar JSX como prop

**Qué es:** Estructurar los componentes para que los datos no tengan que
atravesar niveles que no los usan.

**Para qué sirve:** Eliminar prop drilling sin agregar ningún mecanismo nuevo.

**El problema que resuelve:**

```tsx
// ❌ "usuario" atraviesa tres componentes que no lo usan
<Dashboard usuario={usuario}>
  <Panel usuario={usuario}>
    <Cabecera usuario={usuario}>
      <Insignia usuario={usuario} />
```

**La solución:**

```tsx
// ✅ el JSX se crea donde el dato ya existe
function App() {
  const usuario = useUsuario();
  return (
    <Dashboard
      cabecera={<Insignia usuario={usuario} />}
    />
  );
}

function Dashboard({ cabecera }: { cabecera: React.ReactNode }) {
  return <div>{cabecera}</div>;
}
```

`Dashboard` ya no sabe nada de `usuario`. Solo sabe que recibe algo que
renderizar.

**Dos formas, misma idea:**

```tsx
// children — para el contenido principal
<Panel>
  <Contenido />
</Panel>

// props nombradas — cuando hay varias zonas
<Layout
  barraLateral={<Menu />}
  contenido={<Catalogo />}
  pie={<Creditos />}
/>
```

**Cuándo usar composición y no contexto:** cuando el dato lo necesitan pocos
componentes en posiciones conocidas. Es la primera opción a intentar.
**Cuándo NO alcanza:** cuando muchos componentes, a profundidades impredecibles,
necesitan el mismo dato.

**Idea mental:** en vez de llevarle el agua a cada planta atravesando la casa,
pones la planta donde está el agua.

---

## 3. useReducer

**Qué es:** Una alternativa a `useState` para cuando varios valores cambian
juntos siguiendo reglas.

**Para qué sirve:** Poner todas las transiciones de estado en un solo lugar,
fuera del componente.

```tsx
type Estado = {
  cargando: boolean;
  error: string | null;
  reservas: Reserva[];
};

type Accion =
  | { tipo: "iniciar" }
  | { tipo: "exito"; reservas: Reserva[] }
  | { tipo: "fallo"; mensaje: string };

function reductor(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case "iniciar":
      return { cargando: true, error: null, reservas: [] };
    case "exito":
      return { cargando: false, error: null, reservas: accion.reservas };
    case "fallo":
      return { cargando: false, error: accion.mensaje, reservas: [] };
  }
}

// En el componente
const [estado, dispatch] = useReducer(reductor, ESTADO_INICIAL);

dispatch({ tipo: "iniciar" });
dispatch({ tipo: "exito", reservas: nuevas });
```

**Las tres reglas del reductor:**

```
1. Es una función pura: mismos argumentos → mismo resultado, sin efectos
2. Nunca muta el estado: siempre retorna un objeto NUEVO
3. Vive FUERA del componente: no puede leer props ni estado directamente
```

**Cuándo usarlo:** cuando el estado tiene varios campos que cambian juntos, o
cuando la lógica de actualización se repite en varios manejadores.
**Cuándo NO:** para un solo valor independiente. `useState` es más corto y más
claro.

**Error típico — mutar en vez de retornar nuevo:**

```tsx
// ❌ React no detecta el cambio
case "agregar":
  estado.reservas.push(accion.reserva);
  return estado;

// ✅
case "agregar":
  return { ...estado, reservas: [...estado.reservas, accion.reserva] };
```

**Idea mental:** `useState` es "cambia esto a este valor". `useReducer` es "pasó
esto, decide tú qué queda". El componente reporta hechos; el reductor decide
consecuencias.

---

## 4. useContext

**Qué es:** Un canal para que un componente lea un valor publicado por un
ancestro, sin que los intermedios lo pasen.

**Para qué sirve:** Datos que muchos componentes necesitan a profundidades
impredecibles: usuario en sesión, tema visual, notificaciones, idioma.

```tsx
import { createContext, useContext } from "react";

type Sesion = { nombre: string; rol: "admin" | "guia" };

const ContextoSesion = createContext<Sesion | undefined>(undefined);

// Publicar — React 19: el contexto se usa directamente como provider
function App() {
  const sesion = { nombre: "Óscar", rol: "admin" } as const;
  return (
    <ContextoSesion value={sesion}>
      <Dashboard />
    </ContextoSesion>
  );
}

// Consumir, a cualquier profundidad
function Insignia() {
  const sesion = useContext(ContextoSesion);
  return <span>{sesion?.nombre}</span>;
}
```

**En React 18 y anteriores** había que escribir `<ContextoSesion.Provider
value={...}>`. Vas a ver esa forma en la mayoría de los tutoriales; hace lo mismo.

**La trampa más común — el valor por defecto silencioso:**

```tsx
const ContextoSesion = createContext<Sesion | undefined>(undefined);
```

Si un componente llama a `useContext` y **no hay ningún provider por encima**,
no da error: recibe el valor por defecto. El componente se renderiza con datos
vacíos y tú buscas el bug en el lugar equivocado.

**La solución estándar — un custom hook que falla ruidosamente:**

```tsx
function useSesion() {
  const sesion = useContext(ContextoSesion);
  if (sesion === undefined) {
    throw new Error("useSesion debe usarse dentro de <ContextoSesion>");
  }
  return sesion;
}
```

Ahora el error aparece donde está la causa. Este patrón —contexto envuelto en
custom hook— es lo que verás en cualquier código profesional.

**Cuándo NO usarlo:**

```
✗ Como reemplazo de props para todo. Las props explícitas son más fáciles
  de seguir; el contexto oculta de dónde viene un dato.
✗ Para datos que cambian muy seguido. Cada cambio en el valor del contexto
  vuelve a renderizar TODOS los componentes que lo consumen.
✗ Cuando la composición resuelve el problema (sección 2). Inténtala primero.
```

**Idea mental:** el contexto no es un almacén: es un cable. Alguien más arriba
publica un valor y quien quiera lo escucha. Sigue haciendo falta un `useState` o
un `useReducer` que sostenga ese valor.

---

## 5. CONTEXTO + REDUCTOR

El patrón que combina los dos, y que es la base de cómo funcionan las librerías
de estado global:

```tsx
const ContextoReservas = createContext<Estado | undefined>(undefined);
const ContextoDispatch = createContext<React.Dispatch<Accion> | undefined>(undefined);

function ProveedorReservas({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = useReducer(reductor, ESTADO_INICIAL);

  return (
    <ContextoReservas value={estado}>
      <ContextoDispatch value={dispatch}>
        {children}
      </ContextoDispatch>
    </ContextoReservas>
  );
}
```

**Por qué dos contextos separados:** `dispatch` nunca cambia entre renders. Si
va en el mismo contexto que el estado, los componentes que solo despachan
acciones se vuelven a renderizar cada vez que el estado cambia, aunque no lo
lean. Separarlos evita ese trabajo inútil.

---

## 6. SINTAXIS NUEVA DE ESTA SEMANA

### Unión discriminada para tipar acciones · peso MEDIO

Un tipo unión donde cada variante tiene un campo literal común que permite a
TypeScript saber cuál es cuál.

```tsx
type Accion =
  | { tipo: "agregar"; reserva: Reserva }
  | { tipo: "eliminar"; id: string };

switch (accion.tipo) {
  case "agregar":
    accion.reserva;  // TypeScript sabe que existe
    break;
  case "eliminar":
    accion.id;       // aquí sabe que existe id, y que NO existe reserva
    break;
}
```

> ⚠ **Trampa:** el campo discriminante debe ser un **tipo literal**
> (`tipo: "agregar"`), no `string`. Si escribes `tipo: string`, TypeScript no
> puede distinguir las variantes y pierde el estrechamiento por completo.
>
> Segunda: si el `switch` no cubre todos los casos, TypeScript no siempre avisa.
> Poner el tipo de retorno explícito en el reductor (`: Estado`) hace que sí lo
> haga, porque el camino sin cubrir devolvería `undefined`.

### `use()` para leer contexto · peso LIGERO

React 19 añadió `use()`, que lee un contexto igual que `useContext`.

```tsx
import { use } from "react";
const sesion = use(ContextoSesion);
```

> ⚠ **Trampa:** a diferencia de `useContext`, `use()` **sí puede llamarse dentro
> de un `if`**. Es su única ventaja real aquí, y no la necesitas esta semana.
> Se menciona para que reconozcas la sintaxis si la ves. Usa `useContext`.

### `crypto.randomUUID()` · peso LIGERO

Genera un identificador único. Útil para asignar `id` a elementos creados por el
usuario.

```tsx
const nuevaReserva = { id: crypto.randomUUID(), cliente: nombre };
```

> ⚠ **Trampa:** solo funciona en contextos seguros — `https` o `localhost`. En
> desarrollo con Vite funciona; en una página servida por `http` plano, no
> existe y da error.

---

## 7. TABLA DE DECISIÓN

Cuando no sepas qué usar:

| Situación | Herramienta |
|---|---|
| Un valor que cambia en un componente | `useState` |
| Varios valores que cambian juntos con reglas | `useReducer` |
| Dos hermanos necesitan el mismo dato | Levantar el estado |
| Lógica con estado repetida en varios componentes | Custom hook |
| Un dato atraviesa niveles que no lo usan | Composición |
| Muchos componentes a profundidad impredecible | `useContext` |
| Estado global grande, con rendimiento crítico | Zustand (más adelante) |

**El orden importa.** Baja por la tabla solo cuando la fila anterior no alcance.
Cada paso hacia abajo agrega indirección, y la indirección se paga al depurar.

---

*Cheat Sheet Semana 11 — React avanzado*
*Prerrequisitos: Semana 10 completa (componentes, props, estado, efectos) · Semana 09 (uniones, genéricos)*
