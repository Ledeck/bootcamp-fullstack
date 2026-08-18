# CHEAT SHEET — SEMANA 08
## HTML Semántico · CSS · Flexbox · Grid · Responsive

> Lee esto ANTES de empezar los ejercicios.
> Esta semana es diferente — no es JavaScript. Es la capa visual del stack.
> Todo lo que construyas en React/Next.js vive sobre lo que aprendes aquí.

---

## LA TRINIDAD DEL WEB

```
HTML  → estructura y significado ("qué es esto")
CSS   → presentación ("cómo se ve")
JS    → comportamiento ("qué hace")
```

Separar estas responsabilidades es un principio fundamental del desarrollo web. HTML no debería tener estilos inline salvo casos específicos, y CSS no debería determinar el significado del contenido.

---

## HTML SEMÁNTICO

HTML semántico usa etiquetas que describen el significado del contenido, no solo su apariencia.

```html
<!-- ❌ Sin semántica — div para todo -->
<div class="header">
    <div class="nav">...</div>
</div>
<div class="content">
    <div class="article">...</div>
</div>

<!-- ✅ Con semántica — cada etiqueta tiene significado -->
<header>
    <nav>...</nav>
</header>
<main>
    <article>...</article>
</main>
```

**Las etiquetas semánticas principales:**

`<header>` — encabezado de la página o de una sección. Puede contener logo, título, navegación.

`<nav>` — navegación principal. Links de menú.

`<main>` — contenido principal de la página. Solo uno por página.

`<section>` — agrupa contenido relacionado bajo un mismo tema. Siempre con un heading.

`<article>` — contenido independiente y reutilizable. Un post, una noticia, una tarjeta.

`<aside>` — contenido relacionado pero secundario. Sidebar, anuncios, links relacionados.

`<footer>` — pie de página o de sección. Copyright, links secundarios, contacto.

`<h1>` a `<h6>` — jerarquía de títulos. Solo un `<h1>` por página. Nunca saltarse niveles.

`<p>` — párrafo de texto.

`<ul>` / `<ol>` / `<li>` — listas no ordenadas, ordenadas, elementos.

`<a href="url">` — enlace. Siempre con texto descriptivo, nunca "click aquí".

`<img src="url" alt="descripción">` — imagen. El `alt` es obligatorio.

`<button>` — acción. Para formularios y acciones. Nunca un `<div>` como botón.

`<div>` y `<span>` — contenedores genéricos sin significado. Usar solo cuando ninguna etiqueta semántica aplica.

---

## FORMULARIOS HTML

```html
<form action="/enviar" method="POST">
    <!-- Label siempre asociado al input con for/id -->
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="edad">Edad:</label>
    <input type="number" id="edad" name="edad" min="18" max="100">

    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" minlength="8">

    <label for="plan">Plan:</label>
    <select id="plan" name="plan">
        <option value="basico">Básico</option>
        <option value="pro">Pro</option>
    </select>

    <label for="mensaje">Mensaje:</label>
    <textarea id="mensaje" name="mensaje" rows="4"></textarea>

    <button type="submit">Enviar</button>
</form>
```

**Tipos de input más comunes:**
- `type="text"` — texto libre
- `type="email"` — valida formato de email automáticamente
- `type="password"` — oculta el texto
- `type="number"` — solo números, con `min` y `max`
- `type="checkbox"` — casilla de verificación
- `type="radio"` — selección única entre opciones
- `type="date"` — selector de fecha nativo

**Atributos de validación nativa:**
- `required` — campo obligatorio
- `minlength` / `maxlength` — longitud mínima/máxima
- `min` / `max` — valor mínimo/máximo (números y fechas)
- `pattern` — expresión regular de validación

---

## CSS — LOS FUNDAMENTOS

**Cómo conectar CSS al HTML:**
```html
<!-- En el <head> del HTML -->
<link rel="stylesheet" href="estilos.css">
```

**Selectores:**
```css
/* Por etiqueta */
p { color: blue; }

/* Por clase — el más usado */
.mi-clase { font-size: 16px; }

/* Por id — para elementos únicos */
#mi-id { background: red; }

/* Descendiente */
.contenedor p { margin: 0; }

/* Hijo directo */
.lista > li { padding: 8px; }

/* Pseudo-clase */
a:hover { text-decoration: underline; }
button:disabled { opacity: 0.5; }
```

---

## BOX MODEL

Todo elemento HTML es una caja rectangular con estas capas (de adentro hacia afuera):

```
content → padding → border → margin
```

```css
.caja {
    width: 200px;         /* ancho del contenido */
    height: 100px;        /* alto del contenido */
    padding: 16px;        /* espacio interior */
    border: 2px solid #ccc; /* borde */
    margin: 24px;         /* espacio exterior */

    /* Importante: box-sizing determina qué incluye width */
    box-sizing: border-box; /* width incluye padding y border */
}
```

**`box-sizing: border-box`** es la convención moderna — siempre incluirlo en el reset global:

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

## VARIABLES CSS (CUSTOM PROPERTIES)

```css
/* Definir en :root para que sean globales */
:root {
    --color-primario: #2563eb;
    --color-texto: #1f2937;
    --espacio-base: 16px;
    --radio-borde: 8px;
}

/* Usar con var() */
.boton {
    background: var(--color-primario);
    color: white;
    padding: var(--espacio-base);
    border-radius: var(--radio-borde);
}
```

Por qué usarlas: cambias el valor en un solo lugar y se actualiza en todo el sitio.

---

## FLEXBOX

Flexbox organiza elementos en una dimensión — fila o columna.

```css
.contenedor {
    display: flex;

    /* Dirección */
    flex-direction: row;           /* fila (default) */
    flex-direction: column;        /* columna */

    /* Alineación en el eje principal (row → horizontal) */
    justify-content: flex-start;   /* inicio (default) */
    justify-content: flex-end;     /* final */
    justify-content: center;       /* centro */
    justify-content: space-between; /* espacio entre elementos */
    justify-content: space-around;  /* espacio alrededor */

    /* Alineación en el eje secundario (row → vertical) */
    align-items: stretch;          /* ocupa todo el alto (default) */
    align-items: flex-start;       /* arriba */
    align-items: flex-end;         /* abajo */
    align-items: center;           /* centro vertical */

    /* Si los elementos no caben en una línea */
    flex-wrap: wrap;               /* se van a la siguiente línea */
    flex-wrap: nowrap;             /* permanecen en una línea (default) */

    /* Espacio entre elementos */
    gap: 16px;                     /* espacio horizontal y vertical */
    gap: 16px 24px;                /* vertical horizontal */
}
```

**Propiedades para los hijos:**
```css
.item {
    flex: 1;              /* crece para ocupar el espacio disponible */
    flex: 0 0 200px;      /* no crece, no encoge, 200px fijo */
    align-self: center;   /* alineación individual, sobreescribe align-items */
}
```

**Idea mental:** El contenedor define las reglas, los hijos las siguen. `justify-content` mueve en la dirección de `flex-direction`. `align-items` mueve en la dirección perpendicular.

---

## CSS GRID

Grid organiza elementos en dos dimensiones — filas Y columnas.

```css
.contenedor {
    display: grid;

    /* Definir columnas */
    grid-template-columns: 200px 1fr 1fr;    /* fija, flexible, flexible */
    grid-template-columns: repeat(3, 1fr);   /* 3 columnas iguales */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* responsive */

    /* Definir filas */
    grid-template-rows: auto 1fr auto;       /* header, contenido, footer */

    /* Espacio entre celdas */
    gap: 16px;
    column-gap: 24px;
    row-gap: 16px;
}
```

**Posicionar elementos:**
```css
.item {
    grid-column: 1 / 3;      /* ocupa desde columna 1 hasta 3 */
    grid-column: span 2;     /* ocupa 2 columnas desde su posición */
    grid-row: 1 / 2;         /* ocupa la primera fila */
}
```

**Grid areas — layout completo con nombres:**
```css
.contenedor {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

---

## DISEÑO RESPONSIVE

**La meta viewport — siempre en el `<head>`:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**Unidades relativas:**
- `%` — relativo al elemento padre
- `vw` / `vh` — relativo al viewport (100vw = ancho completo)
- `rem` — relativo al tamaño de fuente raíz (16px por defecto)
- `em` — relativo al tamaño de fuente del elemento actual

**Media queries:**
```css
/* Mobile first — estilos base para móvil */
.contenedor {
    flex-direction: column;
}

/* Tablet y superior */
@media (min-width: 768px) {
    .contenedor {
        flex-direction: row;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .contenedor {
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

**Breakpoints comunes:**
- Móvil: < 768px (estilos base)
- Tablet: ≥ 768px
- Desktop: ≥ 1024px
- Desktop grande: ≥ 1280px

---

## DIFERENCIAS IMPORTANTES

**Flexbox vs Grid:**

Flexbox es para layouts en una dimensión — una fila de botones, una barra de navegación, una lista de tarjetas. Grid es para layouts en dos dimensiones — una página completa con header, sidebar, contenido y footer.

En la práctica, se usan juntos: Grid para la estructura de la página, Flexbox para los componentes dentro de esa estructura.

**`display: block` vs `display: inline` vs `display: inline-block`:**

Block ocupa todo el ancho disponible y empieza en nueva línea (`<div>`, `<p>`, `<h1>`). Inline no empieza en nueva línea y solo ocupa lo necesario, pero no acepta width ni height (`<span>`, `<a>`, `<strong>`). Inline-block es la combinación — no empieza en nueva línea pero acepta width y height.

**`margin` vs `padding`:**

Padding es espacio interior — entre el contenido y el borde. El fondo del elemento cubre el padding. Margin es espacio exterior — entre el borde y otros elementos. Es transparente.

---

## ERRORES FRECUENTES

```html
<!-- ❌ Imagen sin alt -->
<img src="foto.jpg">

<!-- ✅ Siempre con alt -->
<img src="foto.jpg" alt="Descripción de la imagen">

<!-- ❌ Botón implementado con div -->
<div onclick="enviar()">Enviar</div>

<!-- ✅ Usar el elemento correcto -->
<button onclick="enviar()">Enviar</button>

<!-- ❌ Label sin asociar al input -->
<label>Nombre</label>
<input type="text">

<!-- ✅ Asociado con for/id -->
<label for="nombre">Nombre</label>
<input type="text" id="nombre">

<!-- ❌ h1 múltiples en una página -->
<h1>Título principal</h1>
<h1>Otro título</h1>

<!-- ✅ Solo un h1 por página -->
<h1>Título principal</h1>
<h2>Subtítulo</h2>
```

---

## CHECKLIST DE DOMINIO

```
□ Puedo estructurar una página con etiquetas semánticas correctas
□ Entiendo cuándo usar section vs article vs div
□ Puedo crear un formulario con labels, inputs y validación nativa
□ Entiendo el box model y por qué usar box-sizing: border-box
□ Puedo crear layouts con Flexbox (justify-content, align-items, gap)
□ Puedo crear layouts con Grid (template-columns, areas, gap)
□ Sé cuándo usar Flexbox y cuándo usar Grid
□ Puedo hacer un diseño responsive con media queries mobile-first
□ Uso variables CSS para colores y espaciados
□ Entiendo la diferencia entre margin y padding
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. HTML describe significado, CSS describe apariencia**
Un `<h1>` no es grande porque visualmente lo parece — es un título principal por su significado. CSS puede hacerlo pequeño visualmente, pero sigue siendo semánticamente un `<h1>`.

**2. `box-sizing: border-box` siempre**
Sin él, `width: 200px` más `padding: 16px` da un elemento de 232px. Con él, siempre es 200px. Es el comportamiento más intuitivo y el estándar moderno.

**3. Flexbox para una dimensión, Grid para dos**
No hay un ganador — se usan juntos. Grid define la estructura de la página. Flexbox alinea los elementos dentro de cada sección.

**4. Mobile first — estilos base para móvil, media queries para pantallas más grandes**
Es más fácil agregar complejidad visual que quitarla. Empieza simple para móvil y expande para desktop.

**5. Tailwind CSS reemplazará la mayoría de este CSS en el stack final**
Lo que aprendes esta semana es el fundamento conceptual — cuando uses Tailwind, entenderás qué hace cada clase porque conoces el CSS que hay detrás.

---


---

## EL DOM — CONECTAR DATOS CON PANTALLA

> Añadido en la auditoría del 2026-08-06. Corresponde al Día 7.

**Qué es:** cuando el navegador carga tu HTML, construye un árbol de objetos
en memoria. Ese árbol es el DOM, y es JavaScript normal: puedes leerlo y
modificarlo.

**Idea mental:** el HTML es el plano. El DOM es el edificio construido.

### Seleccionar

```javascript
const titulo = document.querySelector("h1");
const grid = document.querySelector("#expediciones");
const tarjetas = document.querySelectorAll(".tarjeta");
```

Usa **los mismos selectores de CSS** que ya conoces.

> ⚠ `querySelectorAll` devuelve una `NodeList`, no un array. Tiene `forEach`
> pero **no `map`, `filter` ni `reduce`**.
> Solución: `[...document.querySelectorAll(".tarjeta")]`
>
> ⚠ `querySelector` devuelve `null` si no encuentra nada. Comprueba antes de
> usar, o revienta con `TypeError`.

### Modificar contenido

```javascript
elemento.textContent = "texto plano";      // seguro
elemento.innerHTML = "<b>html</b>";        // interpreta HTML
```

> ⚠ **`innerHTML` con datos de usuario permite inyectar código (XSS).**
> Regla: `textContent` para texto, `innerHTML` solo con HTML que construyes tú.

### Crear elementos

```javascript
const articulo = document.createElement("article");
articulo.className = "tarjeta";
articulo.textContent = exp.nombre;
contenedor.append(articulo);
```

### Eventos

```javascript
boton.addEventListener("click", (evento) => { ... });
```

```
click     un clic
submit    envío de formulario
input     en cada tecla
change    al cambiar y perder el foco
```

### Formularios

```javascript
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = new FormData(formulario);
  const nombre = datos.get("nombre");
});
```

> ⚠ **Sin `preventDefault()` la página se recarga** y pierdes todo.
>
> ⚠ `FormData` lee por el atributo `name`, **no por `id`**. Un input sin
> `name` devuelve `null`.

### Delegación de eventos

Para elementos creados dinámicamente, escucha en el contenedor:

```javascript
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;
  console.log(boton.dataset.id);
});
```

```
evento.target    el elemento exacto donde ocurrió
.closest("...")  sube buscando el ancestro que coincida
dataset.id       lee el atributo data-id="..."
```

**Por qué funciona:** los eventos burbujean hacia arriba. Escuchas en el
padre y averiguas dónde ocurrió.

### Cuándo NO manipular el DOM a mano

```
✗ Interfaces con mucho estado cambiante → eso lo resuelve React
✗ Reconstruir todo el HTML en cada cambio → con 800 elementos se congela
```

Lo aprendes igual porque en la Semana 10 React hará esto por ti, y solo se
aprecia lo que te ahorra si lo hiciste una vez a mano.

---

*Cheat Sheet Semana 08 — HTML y CSS*
*Leer antes de los ejercicios — consultar durante la semana*
