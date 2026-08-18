# 📘 BOOTCAMP SEMANA 08
## HTML Semántico · CSS · Flexbox · Grid · Diseño Responsive

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_08.md` completa.
> **Recuerda:** Cuando termines cada día, avísame para validar antes de continuar.
>
> **Nota sobre esta semana:** HTML y CSS no se escriben en la terminal — se escriben en archivos
> `.html` y `.css` que abres directamente en el navegador. Crea una carpeta `semana-08/`
> en tu repositorio y abre los archivos con doble clic o arrastrándolos al navegador.
> Verás los cambios en tiempo real si usas la extensión **Live Server** en Cursor.

---

## 🗓 DÍA 1 — HTML SEMÁNTICO Y ESTRUCTURA

### 🎯 Objetivo
Entender qué es HTML semántico, por qué importa, y estructurar páginas con las etiquetas correctas.

---

### 📖 Por qué el HTML semántico importa

Puedes hacer que cualquier elemento se vea como cualquier cosa con CSS. Entonces, ¿por qué importa qué etiqueta usas?

Tres razones concretas:

**Accesibilidad:** Los lectores de pantalla (que usan personas con discapacidad visual) navegan por el documento usando sus etiquetas. Un `<nav>` les permite saltar directamente a la navegación. Un `<main>` les indica dónde está el contenido principal. Con `<div>` para todo, la página es un laberinto.

**SEO:** Los motores de búsqueda como Google leen el HTML para entender el contenido. Un `<h1>` le dice a Google cuál es el tema principal de la página. Una `<nav>` le indica que eso son links de navegación, no contenido importante.

**Mantenibilidad:** Un equipo de developers que lee `<article>` entiende inmediatamente que es contenido independiente. Con `<div class="div-3">` nadie sabe qué es.

---

### 📖 La estructura de una página HTML

Todo archivo HTML tiene esta estructura base:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Título de la página</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

    <header>
        <nav>
            <a href="/">Inicio</a>
            <a href="/expediciones">Expediciones</a>
            <a href="/contacto">Contacto</a>
        </nav>
    </header>

    <main>
        <section>
            <h1>Título principal</h1>
            <p>Contenido principal de la página.</p>
        </section>
    </main>

    <footer>
        <p>© 2026 Nexus Expediciones</p>
    </footer>

</body>
</html>
```

**¿Qué va en el `<head>`?**
Todo lo que el navegador necesita pero el usuario no ve directamente: el charset (UTF-8 para caracteres especiales como ñ y tildes), el viewport (para responsive), el título (aparece en la pestaña), y los links a CSS.

**¿Qué va en el `<body>`?**
Todo lo que el usuario ve.

---

### 📖 Cuándo usar cada etiqueta semántica

`<section>` agrupa contenido relacionado bajo un mismo tema. Siempre debe tener un heading (`<h2>`, `<h3>`, etc.) que describa el tema del grupo.

`<article>` es contenido independiente que tiene sentido por sí solo sin su contexto. Un post de blog, una tarjeta de producto, una noticia — si puedes copiarlo y pegarlo en otro sitio y sigue teniendo sentido, es un `<article>`.

La diferencia práctica: una página de blog tiene una `<section>` de artículos recientes, y cada artículo dentro es un `<article>`.

```html
<section>
    <h2>Expediciones destacadas</h2>
    <article>
        <h3>Cruce de Los Andes</h3>
        <p>5 días · Dificultad alta</p>
    </article>
    <article>
        <h3>Torres del Paine</h3>
        <p>7 días · Dificultad alta</p>
    </article>
</section>
```

`<div>` se usa solo cuando ninguna etiqueta semántica aplica — por ejemplo, un contenedor que necesitas solo para aplicar estilos CSS.

---

### 🔗 Conexión con Next.js

En Next.js, cada página es un componente que retorna JSX — que es casi idéntico a HTML. Las etiquetas semánticas son exactamente las mismas:

```jsx
// app/page.tsx (Mes 5)
export default function HomePage() {
    return (
        <main>
            <section>
                <h1>Bienvenido a Nexus</h1>
                <p>Gestión de expediciones profesional</p>
            </section>
        </main>
    )
}
```

Lo que aprendes hoy es literalmente lo que escribirás en React.

---

### 🛠 EJERCICIOS DÍA 1

**Ejercicio 1** — `dia01/index.html`

Crea la estructura HTML semántica completa de la página principal de Nexus Expediciones. Sin CSS todavía — solo estructura:

```
Header con:
  - Logo (puede ser solo texto en un h1 o img)
  - Nav con 4 links: Inicio, Expediciones, Guías, Contacto

Main con:
  - Section "Hero": título principal y subtítulo descriptivo
  - Section "Expediciones destacadas": 3 articles, cada uno con
    nombre de expedición, tipo, duración y precio
  - Section "Por qué elegirnos": 3 razones con título y descripción

Footer con:
  - Nombre de la empresa
  - Links legales (Términos, Privacidad)
  - Copyright
```

No importa cómo se vea — lo que importa es que la estructura sea semánticamente correcta.

---

**Ejercicio 2** — `dia01/estructura.html`

Analiza este HTML e identifica todos los errores semánticos. Luego escribe la versión corregida:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi página</title>
</head>
<body>
    <div class="header">
        <h1>Nexus</h1>
        <div class="nav">
            <span onclick="ir('inicio')">Inicio</span>
            <span onclick="ir('expediciones')">Expediciones</span>
        </div>
    </div>

    <div class="main">
        <h1>Nuestras Expediciones</h1>
        <div class="expedicion">
            <h1>Cruce Los Andes</h1>
            <div class="descripcion">5 días de aventura</div>
        </div>
    </div>

    <div class="footer">
        <div>© 2026 Nexus</div>
    </div>
</body>
</html>
```

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — CSS: SELECTORES, BOX MODEL Y VARIABLES

### 🎯 Objetivo
Aplicar estilos con CSS, entender el Box Model y usar variables CSS para mantener consistencia visual.

---

### 📖 El reset CSS — el punto de partida

Cada navegador tiene estilos por defecto distintos. Sin un reset, tu página se verá diferente en Chrome, Firefox y Safari. El reset moderno más simple:

```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1f2937;
}

img {
    max-width: 100%;
    display: block;
}
```

Esto elimina márgenes y paddings inconsistentes entre navegadores y establece `box-sizing: border-box` globalmente.

---

### 📖 Box Model en la práctica

```css
.tarjeta {
    /* El contenido */
    width: 300px;

    /* Espacio interior — entre contenido y borde */
    padding: 24px;
    /* También: padding-top, padding-right, padding-bottom, padding-left */
    /* Shorthand: padding: 16px 24px (vertical horizontal) */
    /* Shorthand: padding: 8px 16px 12px 16px (top right bottom left) */

    /* El borde */
    border: 1px solid #e5e7eb;
    border-radius: 8px;

    /* Espacio exterior — entre borde y otros elementos */
    margin-bottom: 16px;
}
```

Con `box-sizing: border-box` el `width: 300px` incluye el padding y el border. Sin él, el elemento mediría 350px (300 + 24 + 24 + 1 + 1).

---

### 📖 Variables CSS — el sistema de diseño

```css
:root {
    /* Colores */
    --color-primario: #2563eb;
    --color-primario-hover: #1d4ed8;
    --color-texto: #1f2937;
    --color-texto-secundario: #6b7280;
    --color-fondo: #f9fafb;
    --color-borde: #e5e7eb;

    /* Espaciado */
    --espacio-xs: 4px;
    --espacio-sm: 8px;
    --espacio-md: 16px;
    --espacio-lg: 24px;
    --espacio-xl: 32px;
    --espacio-2xl: 48px;

    /* Tipografía */
    --fuente-base: 16px;
    --fuente-sm: 14px;
    --fuente-lg: 18px;
    --fuente-xl: 24px;
    --fuente-2xl: 32px;

    /* Bordes */
    --radio-sm: 4px;
    --radio-md: 8px;
    --radio-lg: 12px;
}
```

---

### 📖 Especificidad — por qué un estilo "no funciona"

Cuando dos reglas CSS aplican al mismo elemento, gana la más específica:

```
Inline style     → especificidad más alta (evitar)
#id              → alta especificidad
.clase           → especificidad media (la más usada)
etiqueta (p, h1) → especificidad baja
```

```css
/* Este estilo NO se aplica si existe el siguiente */
p { color: blue; }

/* Este gana — clase es más específica que etiqueta */
.texto-rojo { color: red; }
```

La regla práctica: usar clases para todo. Evitar IDs en CSS y estilos inline.

---

### 💼 Código real vs código de bootcamp

En código de bootcamp, a menudo verás colores hardcodeados:

```css
/* Bootcamp — difícil de mantener */
.boton { background: #2563eb; }
.enlace { color: #2563eb; }
.borde { border-color: #2563eb; }
```

En código profesional, siempre variables:

```css
/* Profesional — cambias el color primario en un solo lugar */
.boton { background: var(--color-primario); }
.enlace { color: var(--color-primario); }
.borde { border-color: var(--color-primario); }
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1** — `dia02/estilos.css` + `dia02/index.html`

Crea un sistema de variables CSS para Nexus y aplícalo a una página simple. El sistema debe incluir al menos: 4 colores, 5 valores de espaciado, 4 tamaños de fuente y 2 radios de borde.

Luego crea una página con:
- Un header con fondo de color primario
- Una tarjeta con padding, border-radius y sombra
- Un botón con el color primario que cambie de color al hacer hover

---

**Ejercicio 2** — `dia02/box-model.html`

Crea 3 cajas que demuestren visualmente el box model:
- Caja 1: solo width y height, sin padding ni margin
- Caja 2: con padding de 24px y border de 2px
- Caja 3: con margin de 32px, padding de 16px y border de 1px

Agrega un comentario CSS en cada una explicando su tamaño total esperado.

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — FLEXBOX

### 🎯 Objetivo
Dominar Flexbox para crear layouts de una dimensión: barras de navegación, listas de tarjetas, layouts de cards.

---

### 📖 Flexbox — el modelo mental correcto

Hay dos actores en Flexbox: el contenedor y los hijos.

El contenedor (`display: flex`) define las reglas: en qué dirección se alinean los elementos, cómo se distribuye el espacio, cómo se alinean verticalmente.

Los hijos siguen esas reglas. Pueden tener propiedades propias que sobreescriben las del contenedor para ese elemento específico.

```css
/* El contenedor define todo */
.nav {
    display: flex;
    justify-content: space-between;  /* distribuye el espacio horizontal */
    align-items: center;             /* centra verticalmente */
    gap: 16px;                       /* espacio entre elementos */
}

/* Los hijos solo necesitan propiedades especiales si se diferencias del grupo */
.nav-logo {
    font-size: 24px;
    font-weight: bold;
}
```

---

### 📖 `justify-content` vs `align-items`

Esta es la confusión más común de Flexbox. La clave es que depende de la dirección:

Con `flex-direction: row` (horizontal, el default):
- `justify-content` controla la distribución **horizontal**
- `align-items` controla la alineación **vertical**

Con `flex-direction: column` (vertical):
- `justify-content` controla la distribución **vertical**
- `align-items` controla la alineación **horizontal**

En otras palabras: `justify-content` siempre va en la dirección de `flex-direction`, y `align-items` va en la dirección perpendicular.

---

### 📖 `flex: 1` — el más poderoso

```css
.sidebar { flex: 0 0 250px; }  /* no crece, no encoge, siempre 250px */
.contenido { flex: 1; }         /* ocupa todo el espacio restante */
```

`flex: 1` es shorthand de `flex-grow: 1; flex-shrink: 1; flex-basis: 0`. En la práctica: "ocupa todo el espacio disponible".

---

### 🔗 Conexión con Next.js

Tailwind CSS (que usarás desde el Mes 5) implementa Flexbox con clases utilitarias que mapean directamente a estas propiedades:

```html
<!-- CSS que aprendes hoy -->
<div style="display:flex; justify-content:space-between; align-items:center; gap:16px">

<!-- Tailwind (Mes 5) — mismas propiedades, clases utilitarias -->
<div class="flex justify-between items-center gap-4">
```

Los nombres son casi idénticos. Entender Flexbox hace que Tailwind sea trivial de aprender.

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1** — `dia03/navbar.html`

Crea una barra de navegación con Flexbox:
- Logo a la izquierda
- Links de navegación en el centro
- Botón de "Iniciar sesión" a la derecha
- Todo perfectamente alineado verticalmente
- Sin usar posicionamiento absoluto ni tablas

---

**Ejercicio 2** — `dia03/tarjetas.html`

Crea una grilla de tarjetas de expedición con Flexbox:
- 4 tarjetas de expedición con imagen placeholder, nombre, tipo, precio y botón
- En una fila con `flex-wrap: wrap`
- Cada tarjeta ocupa el 25% del ancho (con gap incluido)
- Las tarjetas tienen la misma altura aunque el contenido varíe
- El botón siempre está al fondo de la tarjeta

> 💡 Pista 1: Para que el botón esté siempre al fondo, la tarjeta debe ser un contenedor flex con `flex-direction: column` y el espacio antes del botón debe crecer.

---

**Ejercicio 3** — `dia03/layout.html`

Crea un layout de dos columnas con Flexbox:
- Sidebar de 280px fijo a la izquierda
- Contenido principal que ocupa el resto del ancho
- Header arriba que ocupa el ancho completo
- Sin usar float ni posicionamiento

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — CSS GRID

### 🎯 Objetivo
Crear layouts de dos dimensiones con CSS Grid: páginas completas, galerías, dashboards.

---

### 📖 Grid vs Flexbox — cuándo usar cada uno

No son competidores — son complementarios. La regla práctica:

Grid cuando necesitas controlar filas Y columnas simultáneamente: el layout completo de la página, una galería de imágenes, un dashboard con widgets de distintos tamaños.

Flexbox cuando necesitas alinear elementos en una sola dirección: una barra de navegación, una lista de botones, las tarjetas dentro de una celda de Grid.

En un proyecto real, Grid define la estructura de la página y Flexbox alinea los componentes dentro de esa estructura.

---

### 📖 `fr` — la unidad de Grid

`fr` (fracción) es la unidad más importante de Grid. Representa una fracción del espacio disponible:

```css
/* 3 columnas iguales */
grid-template-columns: 1fr 1fr 1fr;
/* Equivalente a: */
grid-template-columns: repeat(3, 1fr);

/* Sidebar + contenido: sidebar fijo, contenido flexible */
grid-template-columns: 250px 1fr;

/* 3 columnas, la del medio el doble de ancha */
grid-template-columns: 1fr 2fr 1fr;
```

---

### 📖 Grid responsive con `auto-fit` y `minmax`

La combinación más poderosa de Grid para layouts responsive sin media queries:

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}
```

Esto crea automáticamente tantas columnas como quepan, donde cada una tiene un mínimo de 250px y un máximo de 1fr. En pantalla grande: 4 columnas. En tablet: 2. En móvil: 1. Sin una sola media query.

---

### 📖 Grid areas — el layout más legible

```css
.pagina {
    display: grid;
    grid-template-areas:
        "header  header"
        "sidebar main  "
        "footer  footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 1fr 60px;
    min-height: 100vh;
    gap: 0;
}

header  { grid-area: header;  background: #1f2937; }
.sidebar { grid-area: sidebar; background: #f9fafb; }
main    { grid-area: main;    padding: 32px; }
footer  { grid-area: footer;  background: #1f2937; }
```

Las comillas y los espacios en `grid-template-areas` crean un mapa visual del layout. Es el CSS más legible que existe para layouts complejos.

---

### 💼 Código real vs código de bootcamp

En proyectos con Tailwind (lo que usarás), Grid se aplica con clases. Pero los conceptos son idénticos:

```html
<!-- CSS puro — aprendes hoy -->
<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 24px">

<!-- Tailwind (Mes 5) — mismos conceptos -->
<div class="grid grid-cols-3 gap-6">
```

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1** — `dia04/galeria.html`

Crea una galería de expediciones con Grid responsive:
- 6 tarjetas de expedición
- Sin media queries, que se adapte automáticamente con `auto-fit` y `minmax`
- Cada tarjeta con imagen placeholder (usa un div de color), nombre y precio
- Gap consistente entre tarjetas

---

**Ejercicio 2** — `dia04/dashboard.html`

Crea un dashboard con Grid areas:
- Header que ocupa todo el ancho
- Sidebar izquierdo de 240px
- Área de contenido principal
- Footer que ocupa todo el ancho
- Dentro del área principal: 3 widgets de estadísticas en una fila con Grid
- Cada widget muestra: título, número grande y descripción

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — DISEÑO RESPONSIVE Y FORMULARIOS

### 🎯 Objetivo
Crear diseños que se adapten a cualquier pantalla y formularios HTML accesibles con validación nativa.

---

### 📖 Mobile first — el enfoque correcto

Mobile first significa escribir los estilos base para móvil y agregar complejidad con media queries para pantallas más grandes. Es el estándar de la industria por dos razones:

Es más fácil agregar complejidad que quitarla. Un layout de una columna se convierte fácilmente en tres columnas. Un layout de tres columnas que "funciona en desktop" pero hay que simplificar para móvil suele generar CSS más complejo y frágil.

Google indexa los sitios por su versión móvil. Un sitio que funciona perfectamente en desktop pero mal en móvil tiene penalización de SEO.

```css
/* Base — móvil (no hay media query) */
.tarjetas {
    display: grid;
    grid-template-columns: 1fr;  /* una columna */
    gap: 16px;
}

/* Tablet */
@media (min-width: 768px) {
    .tarjetas {
        grid-template-columns: repeat(2, 1fr);  /* dos columnas */
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .tarjetas {
        grid-template-columns: repeat(3, 1fr);  /* tres columnas */
    }
}
```

---

### 📖 Formularios accesibles

Un formulario accesible tiene estas características:

Cada input tiene un `<label>` asociado mediante `for`/`id`. El label describe el campo claramente. Sin label, los lectores de pantalla no saben qué es el campo.

Los inputs tienen validación nativa (`required`, `type="email"`, `minlength`, etc.) que el navegador aplica antes de enviar. La validación del servidor es además obligatoria — la del cliente es solo una mejora de usabilidad.

Los mensajes de error son claros y específicos — "El email debe tener el formato nombre@dominio.com", no "Campo inválido".

```html
<form novalidate>
    <!-- novalidate desactiva la validación visual del browser
         para que puedas controlarla con JS — en este bootcamp
         lo dejamos sin novalidate para usar la validación nativa -->

    <div class="campo">
        <label for="email">Correo electrónico</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="oscar@ejemplo.com"
            required
            autocomplete="email"
        >
    </div>

    <div class="campo">
        <label for="contrasena">Contraseña</label>
        <input
            type="password"
            id="contrasena"
            name="contrasena"
            minlength="8"
            required
            autocomplete="current-password"
        >
        <small>Mínimo 8 caracteres</small>
    </div>

    <button type="submit">Iniciar sesión</button>
</form>
```

---

### 🔗 Conexión con Next.js

En React (Mes 4-5), los formularios se manejan con React Hook Form + Zod para validación. Pero la estructura HTML que aprendes hoy — labels, inputs, tipos correctos — es exactamente la misma:

```jsx
// React Hook Form (Mes 6) — misma estructura HTML
<form onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="email">Email</label>
    <input
        id="email"
        type="email"
        {...register("email", { required: true })}
    />
</form>
```

Los atributos cambian ligeramente en JSX (`htmlFor` en vez de `for`, `className` en vez de `class`), pero la estructura es idéntica.

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1** — `dia05/responsive.html` + `dia05/responsive.css`

Toma el layout del Día 4 (dashboard) y hazlo completamente responsive:
- En móvil: sin sidebar, todo en una columna, header simplificado
- En tablet: sidebar colapsado o en la parte superior
- En desktop: layout completo con sidebar

---

**Ejercicio 2** — `dia05/formulario.html` + `dia05/formulario.css`

Crea el formulario de reserva de Nexus:
- Nombre completo (texto, requerido)
- Email (email, requerido)
- Teléfono (tel, opcional)
- Expedición a reservar (select con al menos 4 opciones)
- Número de personas (number, min 1, max 15)
- Fecha de inicio (date, requerido)
- Comentarios adicionales (textarea, opcional)
- Botón de envío

Requisitos:
- Todos los labels correctamente asociados
- Validación nativa en los campos requeridos
- El formulario se ve bien tanto en móvil como en desktop
- Estilos consistentes con las variables CSS del Día 2

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 NexusLanding — Página de Presentación

> **Nexus** necesita una landing page para presentar su plataforma a nuevos clientes.
> No es una aplicación — es una página de marketing que presenta el producto,
> sus características y un formulario de contacto.
>
> Esta es tu primera página web completa. Debe verse bien en móvil y en desktop.

---

### 📋 Estructura de la página

```
Header fijo en la parte superior:
  - Logo "Nexus" a la izquierda
  - Nav con links a las secciones (anclas: #expediciones, #caracteristicas, #contacto)
  - Botón "Iniciar sesión" a la derecha

Sección Hero:
  - Título principal impactante
  - Subtítulo descriptivo
  - Dos botones: "Ver expediciones" y "Saber más"
  - Fondo de color diferente al resto de la página

Sección "Expediciones destacadas" (#expediciones):
  - Título de sección
  - Grid de 3 tarjetas de expedición
  - Cada tarjeta: nombre, tipo, duración, precio, dificultad y botón "Ver detalles"
  - Las tarjetas son responsive (3 columnas en desktop, 1 en móvil)

Sección "Características" (#caracteristicas):
  - Título de sección
  - Grid de 3 características con icono (emoji), título y descripción
  - Ejemplos: "Gestión centralizada", "Reportes en tiempo real", "Equipos colaborativos"

Sección "Contacto" (#contacto):
  - Título de sección
  - Formulario con: nombre, email, empresa, mensaje y botón enviar
  - Layout de dos columnas en desktop: formulario a la izquierda, info de contacto a la derecha

Footer:
  - Logo y descripción breve
  - Links legales
  - Copyright
```

---

### 📋 Requisitos técnicos

```
✅ HTML semántico — ningún div donde debería haber otra etiqueta
✅ Variables CSS para todos los colores y espaciados
✅ Header con Flexbox
✅ Grid de expediciones responsive con auto-fit o media queries
✅ Formulario con labels asociados y validación nativa
✅ Mobile first — se ve bien en móvil Y en desktop
✅ Al menos una media query con breakpoint en 768px
✅ box-sizing: border-box en el reset
✅ No usar frameworks externos — solo HTML y CSS puro
✅ Subido a GitHub con commit descriptivo
```

---

### ✅ Criterios de aprobación

```
□ La página tiene estructura semántica correcta
□ El header funciona con Flexbox y está bien alineado
□ Las tarjetas de expedición usan Grid y son responsive
□ El formulario tiene labels, tipos correctos y validación nativa
□ La página se ve bien en móvil (< 768px)
□ La página se ve bien en desktop (> 1024px)
□ Las variables CSS están definidas en :root y usadas consistentemente
□ El código HTML es válido (sin etiquetas mal cerradas)
□ Subido a GitHub en semana-08/proyecto/
```

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva.** 🎯

---

---

## 🗓 DÍA 7 — EL DOM: CONECTAR DATOS CON PANTALLA

> **Día añadido en la auditoría del 2026-08-06.**
> Detectado como hueco de cobertura: la manipulación del DOM no se enseñaba
> en ninguna semana, y PS-3 y React la dan por sabida.

### 🎯 Objetivo
Hacer que la página que construiste ayer responda: generar contenido desde
datos y reaccionar a lo que hace el usuario.

---

### 📖 El problema real

Abre tu NexusLanding de ayer. Es una buena página. Y está muerta.

```
Las tarjetas de expedición están escritas a mano en el HTML.
Si mañana hay 12 expediciones, copias y pegas 12 veces.

El botón "Ver detalles" no hace nada.

El formulario valida el formato del correo — eso lo hace el navegador —
pero al enviarlo la página se recarga y no pasa nada más.
```

Tienes datos en JavaScript desde la Semana 3. Tienes una página desde ayer.
**No hay puente entre las dos cosas.**

---

### 📖 ¿Cómo lo resolverías con lo que ya sabes?

Sabes generar strings con datos. Podrías construir el HTML como texto:

```javascript
const html = `<article class="tarjeta"><h3>${exp.nombre}</h3></article>`;
```

Y ahí te quedas. Tienes el string. No hay forma de meterlo en la página.

Falta la pieza que conecta: **el DOM**.

---

### 📖 Qué es el DOM

Cuando el navegador carga tu HTML, no se queda con el texto. Construye un
**árbol de objetos en memoria** que representa cada etiqueta.

```
document
└── html
    ├── head
    └── body
        ├── header
        │   └── nav
        └── main
            └── section#expediciones
                └── article.tarjeta
```

Ese árbol es el DOM — *Document Object Model*. Y es un objeto de JavaScript
como cualquier otro: puedes leerlo y modificarlo.

> **La idea clave:** el HTML es el plano inicial. El DOM es el edificio
> construido. Modificar el DOM cambia lo que se ve, sin tocar el archivo.

---

### 📖 Seleccionar elementos

```javascript
const titulo = document.querySelector("h1");
const contenedor = document.querySelector("#expediciones");
const tarjetas = document.querySelectorAll(".tarjeta");
```

`querySelector` usa **los mismos selectores de CSS** que aprendiste el Día 2.
`#id`, `.clase`, `etiqueta`, `.padre .hijo` — todos funcionan igual.

```
querySelector      →  el PRIMER elemento que coincide, o null
querySelectorAll   →  TODOS los que coinciden, en una NodeList
```

> ⚠ **Trampa:** `querySelectorAll` no devuelve un array. Devuelve una
> `NodeList`, que tiene `forEach` pero **no tiene `map`, `filter` ni
> `reduce`**.
>
> Para usar tus métodos de array: `[...document.querySelectorAll(".tarjeta")]`
> El spread de la Semana 5, resolviendo un problema real.

> ⚠ **Segunda trampa:** si el selector no encuentra nada, `querySelector`
> devuelve `null`. Y `null.textContent` lanza `TypeError`. Es el mismo caso
> que `find` devolviendo `undefined` — un centinela que hay que comprobar.

---

### 📖 Modificar contenido

```javascript
titulo.textContent = "Expediciones 2026";        // texto plano
contenedor.innerHTML = "<p>Cargando...</p>";     // interpreta HTML
```

**La diferencia importa y no es de estilo:**

```javascript
const nombre = "<script>alert('hola')</script>";

elemento.textContent = nombre;   // muestra el texto tal cual, seguro
elemento.innerHTML = nombre;     // INTERPRETA el HTML — peligroso
```

Si el contenido viene de un usuario, `innerHTML` permite inyectar código.
Se llama **XSS** (Cross-Site Scripting).

**La regla:** `textContent` para texto. `innerHTML` solo con HTML que
construyes tú, nunca con datos de terceros.

---

### 📖 Crear elementos desde datos

Aquí está lo que resuelve el problema de las tarjetas copiadas a mano:

```javascript
const expediciones = [
  { id: "EXP001", nombre: "Cruce Los Andes", precioBase: 280000 },
  { id: "EXP003", nombre: "Torres del Paine", precioBase: 450000 }
];

const contenedor = document.querySelector("#expediciones");

expediciones.forEach((exp) => {
  const articulo = document.createElement("article");
  articulo.className = "tarjeta";

  const titulo = document.createElement("h3");
  titulo.textContent = exp.nombre;

  const precio = document.createElement("p");
  precio.textContent = `$${exp.precioBase.toLocaleString("es-CL")}`;

  articulo.append(titulo, precio);
  contenedor.append(articulo);
});
```

**Ocho expediciones, ocho tarjetas, sin copiar nada.** El HTML deja de ser
una lista escrita a mano y pasa a ser el resultado de tus datos.

Es la primera vez que tu lógica de JavaScript produce algo visible. Todo lo
que hiciste hasta ahora vivía en la consola.

---

### 📖 Escuchar eventos

```javascript
const boton = document.querySelector("#ver-detalles");

boton.addEventListener("click", (evento) => {
  console.log("clic");
});
```

`addEventListener` recibe el nombre del evento y una función que se ejecuta
cuando ocurre. Esa función es un **callback** — lo mismo que le pasas a
`filter` o a `map`, solo que aquí lo llama el navegador.

**Los eventos que vas a usar:**

```
click     un clic
submit    envío de formulario
input     el usuario escribe (en cada tecla)
change    el valor cambió y perdió el foco
```

---

### 📖 El formulario — y `preventDefault`

```javascript
const formulario = document.querySelector("#contacto");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const nombre = datos.get("nombre");
  const correo = datos.get("correo");

  console.log({ nombre, correo });
});
```

**Sin `preventDefault()` la página se recarga** y pierdes todo. Es el
comportamiento por defecto del navegador desde antes de que existiera
JavaScript: enviar el formulario al servidor y navegar.

Prueba a quitarlo. Verás la página parpadear y tu `console.log` desaparecer.

> ⚠ **Trampa:** `FormData` lee los campos por su atributo `name`, no por
> `id`. Si tu input tiene `id="nombre"` pero no `name="nombre"`,
> `datos.get("nombre")` devuelve `null`.
>
> Revisa tu formulario de ayer: es un error muy fácil de cometer.

---

### 📖 Delegación de eventos

Un problema que aparece en cuanto generas elementos desde datos:

```javascript
// ❌ No funciona para las tarjetas creadas DESPUÉS
document.querySelectorAll(".tarjeta button").forEach((b) => {
  b.addEventListener("click", manejar);
});
```

Si generas las tarjetas después de registrar los listeners, esas tarjetas no
tienen listener. Y registrar uno por tarjeta es trabajo repetido.

**La solución:** escuchar en el contenedor, que sí existe siempre.

```javascript
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;

  const id = boton.dataset.id;
  console.log("Ver detalles de", id);
});
```

**Cómo funciona:** los eventos *burbujean*. Un clic en el botón también se
dispara en su padre, y en el padre de su padre, hasta `document`. Así que
puedes escuchar arriba y averiguar abajo dónde ocurrió.

```
evento.target   →  el elemento exacto donde ocurrió
.closest("...")  →  sube buscando el ancestro que coincida
dataset.id       →  lee el atributo data-id="EXP001"
```

Los atributos `data-*` son HTML estándar para guardar datos en un elemento:

```html
<button data-id="EXP001">Ver detalles</button>
```

---

### 📖 Cuándo NO manipular el DOM a mano

Honestidad sobre lo que estás aprendiendo:

```
✗ Cuando la interfaz tiene mucho estado que cambia
  Mantener el DOM sincronizado con los datos a mano se vuelve
  inmanejable rápido. Ese es el problema que React resuelve.

✗ Cuando reconstruyes todo el HTML en cada cambio
  Funciona con 8 tarjetas. Con 800 la página se congela.
```

**Por qué lo aprendes igual:** en la Semana 10, React hace todo esto por ti.
Si nunca lo hiciste a mano, React es magia. Si lo hiciste, React es
*"ah, me está ahorrando exactamente esto"*.

Y hay casos donde seguirás necesitándolo: enfocar un input, hacer scroll,
medir un elemento, integrar una librería que no sabe de React.

---

### 📖 Mini-ejercicio de comprensión

```javascript
const tarjetas = document.querySelectorAll(".tarjeta");
const nombres = tarjetas.map((t) => t.textContent);
```

Esto lanza `TypeError: tarjetas.map is not a function`.

¿Por qué, y cuáles son las dos formas de arreglarlo?

---

### 🔗 Conexión con React

Cuando escribas esto en la Semana 10:

```jsx
{expediciones.map((exp) => <Tarjeta key={exp.id} {...exp} />)}
```

React hará por debajo el `createElement`, el `append` y la sincronización que
acabas de hacer a mano. La diferencia es que tú describes **qué quieres ver**
y React se encarga del **cómo**.

Ese contraste solo se aprecia si hiciste el "cómo" al menos una vez.

---

### 🛠 EJERCICIOS DÍA 7

**Ejercicio 1** — `dia07/tarjetas-dinamicas.js`

Toma tu NexusLanding y **borra las tres tarjetas del HTML**. Genéralas desde
un array de 8 expediciones con `createElement`.

El resultado visual debe ser idéntico al de ayer, con cinco tarjetas más.

**Ejercicio 2** — el formulario que responde

Haz que el formulario de contacto, al enviarse:
- No recargue la página
- Lea los cuatro campos con `FormData`
- Muestre un mensaje de éxito en la propia página, no en la consola
- Limpie los campos

Verifica que todos tus inputs tienen atributo `name`.

**Ejercicio 3** — filtro en vivo

Agrega un `<input type="text">` sobre el grid. Al escribir, muestra solo las
expediciones cuyo nombre coincida.

Usa el evento `input`, no `change`. Después prueba con `change` y documenta
la diferencia en un comentario.

**Ejercicio 4** — delegación

Haz que los botones "Ver detalles" muestren el id de su expedición, con **un
solo** `addEventListener` en el contenedor.

Después agrega una tarjeta nueva dinámicamente y comprueba que su botón
también funciona sin registrar nada.

**Ejercicio 5** — juzga este código

```javascript
const buscador = document.querySelector("#buscar");

buscador.addEventListener("input", (e) => {
  const texto = e.target.value;
  contenedor.innerHTML = "";
  expediciones
    .filter((exp) => exp.nombre.includes(texto))
    .forEach((exp) => {
      contenedor.innerHTML += `<article class="tarjeta">
        <h3>${exp.nombre}</h3>
      </article>`;
    });
});
```

Funciona. Tiene **tres** problemas: uno de seguridad, uno de rendimiento y
uno de comportamiento con las mayúsculas.

Encuéntralos y reescríbelo.

> Pista para el de rendimiento: mira dónde está el `+=`.

---

**Cuando termines avísame — valido el Día 7.** ✅

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-08/
├── dia01/
│   ├── index.html
│   └── estructura.html
├── dia02/
│   ├── index.html
│   ├── estilos.css
│   └── box-model.html
├── dia03/
│   ├── navbar.html
│   ├── tarjetas.html
│   └── layout.html
├── dia04/
│   ├── galeria.html
│   └── dashboard.html
├── dia05/
│   ├── responsive.html
│   ├── responsive.css
│   ├── formulario.html
│   └── formulario.css
├── proyecto/ ⭐
│   ├── index.html
│   └── estilos.css
└── dia07/
    ├── tarjetas-dinamicas.js
    ├── formulario.js
    └── index.html
```

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 09:** TypeScript — Tipos básicos, interfaces, tipos de utilidad, TypeScript con funciones y objetos

---

*Semana 08 — HTML y CSS*
*Formato v4 — Bootcamp autocontenido con Protocolo QA aplicado*
*Óscar — Full Stack Developer en formación 🇨🇱*
