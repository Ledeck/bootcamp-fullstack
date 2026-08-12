# BOOTCAMP SEMANA 08 — REPORTE DE QA
## Documento interno — No es material de estudio

---

## FASE 0 — Delimitación Curricular

**Entra esta semana:**
- Estructura base HTML: DOCTYPE, html, head, body, meta charset, meta viewport
- HTML semántico: header, nav, main, section, article, aside, footer, h1-h6, p, ul, ol, li, a, img, button, div, span
- Formularios: form, label, input (text, email, password, number, date, tel, checkbox, radio, select, textarea), button
- Validación nativa: required, minlength, maxlength, min, max, type
- CSS: selectores (etiqueta, clase, id, descendiente, hijo, pseudo-clase), especificidad básica
- Box model: content, padding, border, margin, box-sizing: border-box
- Variables CSS (custom properties): definición en :root, uso con var()
- Flexbox: display flex, flex-direction, justify-content, align-items, flex-wrap, gap, flex (en hijos)
- CSS Grid: display grid, grid-template-columns, grid-template-rows, grid-template-areas, grid-area, auto-fit, minmax, fr, gap, span
- Diseño responsive: meta viewport, mobile first, media queries con min-width, unidades relativas (%, rem, vw, vh)
- Reset CSS moderno

**Queda explícitamente fuera:**
- Animaciones y transiciones CSS (se introducen con Framer Motion en contexto de React)
- SASS/SCSS (no es parte del stack)
- CSS-in-JS (Tailwind reemplaza CSS puro desde el Mes 5)
- Posicionamiento avanzado: position sticky, fixed en profundidad (se menciona el header fijo en el proyecto pero sin profundizar)
- CSS Subgrid (avanzado)
- Pseudo-elementos ::before y ::after en profundidad
- Tablas HTML (caso de uso muy específico)
- Canvas y SVG
- Web Components
- ARIA avanzado (se menciona la accesibilidad pero no se profundiza en atributos ARIA)
- localStorage / sessionStorage (no es HTML/CSS)

**Competencias futuras que dependen de este conocimiento:**
- HTML semántico → estructura de componentes React y JSX en Next.js
- Flexbox y Grid → clases de Tailwind (flex, grid, justify-, items-, gap-, cols-)
- Responsive → diseño mobile-first en Next.js, viewport breakpoints de Tailwind
- Formularios → React Hook Form + Zod (Mes 6), estructura HTML idéntica
- Box model → entender qué hace cada clase de spacing en Tailwind (p-, m-, border-)
- Variables CSS → tokens de diseño (Tailwind los implementa de forma similar)

---

## FASE 1 — Investigación

**Fuentes consultadas:**
- MDN Web Docs — HTML elements reference, CSS Box Model, Flexbox, Grid, Media queries
- MDN Curriculum — Semantic HTML (actualizado 2026)
- HTML Living Standard (WHATWG)
- CSS Tricks — A Complete Guide to Flexbox y A Complete Guide to Grid

**Hallazgos relevantes:**

1. **HTML semántico en 2026**: Las etiquetas semánticas (header, nav, main, article, section, aside, footer) son estables desde HTML5 y no han cambiado. Su importancia aumentó con la indexación por IA y los lectores de pantalla modernos.

2. **`<dialog>` nativo**: Tiene soporte universal en 2026 y es recomendado sobre modales custom. No se incluye en esta semana por Mínima Suficiencia — se verá en contexto de React.

3. **`loading="lazy"` en imágenes**: Soporte universal en 2026, mejora Core Web Vitals. Se menciona en el proyecto final como buena práctica para imágenes placeholder.

4. **CSS Grid `auto-fit` vs `auto-fill`**: Diferencia importante. `auto-fit` colapsa las columnas vacías para que los elementos existentes ocupen el espacio. `auto-fill` mantiene las columnas vacías. Para la galería responsive del ejercicio, `auto-fit` es el correcto. Documentado en el material.

5. **`gap` en Flexbox**: Propiedad estable con soporte universal desde 2021. No hay necesidad de usar `margin` para espaciado en contenedores flex modernos.

6. **`system-ui` como font-family**: Usa la fuente del sistema operativo del usuario — San Francisco en Mac, Segoe UI en Windows, Roboto en Android. Es la práctica moderna recomendada para performance, ya que no requiere descarga de fuente externa.

7. **Formularios: `autocomplete`**: Atributo importante para accesibilidad y UX. Se incluye en los ejemplos de formulario con valores estándar (`email`, `current-password`, etc.).

---

## FASE 4 — Hallazgos de Revisión Técnica

**Correcciones realizadas:**

1. **`<label for>` vs `<label htmlFor>`**: En HTML puro es `for`. En JSX/React es `htmlFor`. El material menciona ambos en la sección de conexión con Next.js para evitar confusión futura.

2. **`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`**: Verificado que esta sintaxis es correcta y produce el comportamiento responsive descrito — columnas que se adaptan automáticamente sin media queries.

3. **`flex: 0 0 200px`**: Verificado que es la forma correcta de fijar el tamaño de un elemento flex sin que crezca ni encoja. Equivale a `flex-grow: 0; flex-shrink: 0; flex-basis: 200px`.

4. **Reset CSS**: El reset incluido es moderno y mínimo. No usa Normalize.css completo — es intencional por Mínima Suficiencia. El reset propuesto es el que usan proyectos profesionales modernos.

5. **`min-height: 100vh` en el layout de Grid areas**: Necesario para que el footer quede al fondo en páginas con poco contenido. Incluido en el ejemplo.

6. **Meta viewport**: Verificado que `content="width=device-width, initial-scale=1"` es la forma correcta y actual.

---

## FASE 7 — Hallazgos de Auditoría Adversarial

**Modelos mentales verificados:**

1. **"CSS Grid reemplaza a Flexbox"** — Riesgo de modelo mental incorrecto frecuente. El material explica explícitamente que son complementarios, no competidores, con la regla práctica: Grid para dos dimensiones, Flexbox para una. ✅

2. **"`justify-content` alinea horizontalmente siempre"** — El error más común de Flexbox. El material explica que depende de `flex-direction` — `justify-content` siempre va en la dirección del eje principal. ✅

3. **"El `width: 200px` siempre hace el elemento de 200px"** — Sin `box-sizing: border-box`, el padding y border se suman al width. El material explica esto con el reset global y un ejemplo numérico concreto. ✅

4. **"HTML semántico es solo para accesibilidad"** — El material menciona los tres beneficios: accesibilidad, SEO y mantenibilidad. ✅

5. **"La validación nativa del formulario es suficiente"** — El material aclara explícitamente que la validación del cliente es una mejora de usabilidad, no un reemplazo de la validación del servidor. ✅

6. **Punto detectado y corregido**: El ejercicio original del dashboard usaba `height: 100vh` en el grid container. Esto puede causar problemas cuando el contenido excede la pantalla. Se cambió a `min-height: 100vh` que es el comportamiento correcto.

7. **Punto potencialmente problemático**: En el proyecto final se pide un "header fijo". Implementar `position: fixed` correctamente requiere compensar el espacio que ocupa con `padding-top` en el body. Se simplificó el requerimiento a "header en la parte superior" sin especificar `position: fixed` para no introducir posicionamiento avanzado fuera del alcance curricular.

---

## FASE 8 — Checklist de Calidad

```
✅ Contenido verificado contra MDN y HTML Living Standard
✅ Sin contradicciones internas
✅ Toda la sintaxis CSS y HTML revisada
✅ Todos los ejemplos son funcionales
✅ Sin malas prácticas (div para nav marcado ❌, botones con div marcado ❌)
✅ Terminología consistente (contenedor/hijo en Flexbox, fr/auto-fit en Grid)
✅ Progresión pedagógica lógica (HTML → CSS básico → Flexbox → Grid → Responsive → Formularios → Proyecto)
✅ Sin conceptos sin contexto (ARIA, transiciones, SASS explícitamente fuera)
✅ Explicaciones suficientes para alguien que conoce JavaScript pero no HTML/CSS
✅ Coherencia con el roadmap (Next.js menciones en cada día, Tailwind como destino final)
✅ Carga cognitiva adecuada (un concepto por día, progresión clara)
✅ Recomendaciones alineadas con industria 2026 (mobile first, semantic HTML, variables CSS)
✅ Modelos mentales correctos y transferibles (verificados en Fase 7)
✅ Principio de Mínima Suficiencia respetado (SASS, animaciones, ARIA avanzado excluidos)
✅ Sin tablas Markdown — comparaciones en prosa y bloques de código
```

---

*QA completado — Semana 08 lista para entrega*
*Julio 2026*
