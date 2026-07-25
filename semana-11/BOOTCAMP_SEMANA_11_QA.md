# 🔬 REPORTE QA — BOOTCAMP SEMANA 11

> Documento interno de auditoría. No es material de estudio.
> Contiene el PRODUCTO de cada fase crítica, no su declaración (Enmienda 6).

---

```
ACTA DE GENERACIÓN
Fecha de generación: julio 2026
Semana en curso de Óscar al generar: 04 (PS-1 en curso)
Distancia estimada hasta el uso: ~6 meses
Fases ejecutadas: 0, 1, 2, 3, 4, 5, 6, 6b, 7, 8
Fase 1 — fuentes: documentación de React 19 sobre Context como provider y el
         hook use(), consultadas en julio 2026
Bloque perecedero: mínimo (sin setup nuevo; solo nota de versión React 19+)
Constitución aplicada: v1.3 (enmiendas 1-10)
```

---

## FASE 0 — DELIMITACIÓN CURRICULAR

### Dentro del alcance

```
- Custom hooks: qué son, por qué el prefijo use, qué comparten y qué no
- Composición: children y props de JSX como alternativa al prop drilling
- useReducer: reductor puro, acciones, dispatch, estados imposibles
- Uniones discriminadas para tipar acciones
- useContext: createContext, provider, consumo, valor por defecto
- Patrón contexto + custom hook con throw
- Patrón contexto + reductor, con contextos separados de estado y dispatch
- Los límites del contexto y cuándo pasar a una librería
```

### Fuera del alcance, con razón documentada

| Excluido | Razón |
|---|---|
| `useRef` y `forwardRef` | No hace falta para ningún objetivo. Mínima Suficiencia. |
| `useImperativeHandle` | API de escape rara vez usada. |
| `useSyncExternalStore` | Para autores de librerías, no consumidores. |
| `useMemo` / `useCallback` | El compilador de React lo automatiza. Enseñarlos fijaría trabajo manual innecesario. |
| Zustand | Se menciona como horizonte, no se enseña. Sin el dolor del contexto no se entiende qué resuelve. |
| Redux / Redux Toolkit | Fuera del stack objetivo. |
| Compound components (`Tarjeta.Cuerpo`) | Se muestra en "código real" como reconocimiento, no como competencia exigida. |
| Render props | Patrón mayormente reemplazado por hooks. |
| Error boundaries | Requieren componentes de clase o librería; tema propio. |
| `useEffectEvent` | Experimental. |

### Prerrequisitos

```
Semana 09 → uniones, genéricos, type aliases      ✔ verificado
Semana 10 → hooks, estado, props, reglas de hooks ✔ verificado
PS-4      → aplicación con escritura de datos     ⚠ ver hallazgo abierto 1
```

---

## FASE 1 — INVESTIGACIÓN (tecnología viva)

| Afirmación | Verificado | Impacto |
|---|---|---|
| React 19 permite `<Contexto value={...}>` directamente como provider, sin `.Provider` | julio 2026 | Se enseña la forma nueva como principal, con nota de que `.Provider` es lo que aparece en tutoriales antiguos |
| El hook `use()` puede leer contexto y, a diferencia de `useContext`, puede llamarse dentro de un `if` | julio 2026 | Incluido como sintaxis LIGERA de reconocimiento. Se recomienda `useContext` para esta semana |
| `useContext` sigue siendo válido y es la forma estándar | julio 2026 | Es la que se enseña |
| Un cambio en el valor del contexto re-renderiza a todos sus consumidores | julio 2026 | Sostiene la sección "cuándo NO usar contexto" y el patrón de contextos separados |

**Elementos perecederos identificados:** únicamente la dependencia de React 19
para la sintaxis de provider y `use()`. No hay comandos de instalación porque la
semana continúa en el proyecto de la Semana 10.

**Observación para el sistema:** es la quinta semana consecutiva (05, 06, 07, 08,
11) sin bloque de setup real. La predicción de la Enmienda 2 se sostiene: el
contenido perecedero aparece solo cuando entra una herramienta nueva que
instalar.

---

## FASE 4 — REVISIÓN TÉCNICA

```
✔ Un custom hook es una función normal; React no tiene registro de hooks
✔ El prefijo use lo usa el linter, no el runtime de React
✔ Dos componentes que llaman al mismo custom hook tienen estados independientes
✔ Los hooks se identifican por orden de llamada dentro del componente
✔ children es una prop como cualquier otra; <P>{x}</P> equivale a <P children={x} />
✔ El reductor debe ser puro y retornar objeto nuevo
✔ dispatch es estable entre renders; React lo garantiza
✔ useContext devuelve el valor del provider más cercano hacia arriba
✔ Sin provider, useContext devuelve el valor por defecto sin lanzar error
✔ Un objeto literal como value crea referencia nueva en cada render
✔ El discriminante de una unión debe ser tipo literal, no string
✔ crypto.randomUUID() requiere contexto seguro (https o localhost)
```

### Corrección aplicada durante esta fase

```
Formulación incorrecta (borrador):
  "useReducer es para estado complejo"

Por qué era incorrecta:
  "Complejo" no es un criterio. El alumno no puede decidir con eso, y
  termina usando useReducer para un objeto de tres campos que no tiene
  transiciones, o usando useState para una máquina de estados.

Formulación corregida:
  Criterio observable: "cuando un evento del usuario obliga a llamar tres
  o más set seguidos". Y el argumento de fondo: estados imposibles
  irrepresentables.
```

---

## FASE 6 — AUDITORÍA DE CONSISTENCIA INTERNA

```
✔ Terminología estable: "reductor", "acción", "despachar", "proveedor", "consumidor"
✔ El Día 1 (custom hooks) se retoma en el Día 4 como pieza del patrón de contexto
   — conexión señalada explícitamente en el texto
✔ El Día 2 (composición) se contrasta con el Día 4 (contexto): se declara el orden
   de preferencia y por qué
✔ El Día 3 (reductor) y el Día 4 (contexto) se combinan en el Día 5
✔ La tabla de decisión de la Cheat Sheet §7 reúne los cinco días
✔ Ningún día introduce un concepto sin haber mostrado antes el dolor que resuelve
```

### Verificación de ejercicios huérfanos

| Ejercicio | Destino |
|---|---|
| D1 — useBuscador | Proyecto D6 (hook de filtros) |
| D1 — useLocalStorage | Proyecto D6 (persistencia entre módulos) |
| D1 — useFiltrosExpediciones | Proyecto D6, requisito explícito |
| D1 — dos buscadores a la vez | Ninguno. **Justificado:** demostración de modelo mental |
| D2 — Layout | Proyecto D6 |
| D2 — eliminar drilling | Proyecto D6, requisito explícito |
| D2 — PanelPlegable | Proyecto D6 (vista de operaciones) |
| D2 — decide y justifica | Ninguno. **Justificado:** diagnóstico |
| D3 — migrar formulario | Proyecto D6 |
| D3 — reductorReservas | Proyecto D6, base del reductor de asignaciones |
| D3 — probar sin React | Ninguno directo, pero es criterio de aprobación del D6 |
| D3 — estados imposibles | Ninguno. **Justificado:** diagnóstico |
| D4 — notificaciones | Proyecto D6, requisito explícito |
| D4 — sesión y roles | Proyecto D6, requisito explícito |
| D4 — bug del provider ausente | Ninguno. **Justificado:** experiencia, no construcción |
| D4 — auditar estados | Proyecto D6 |
| D5 — proveedor de reservas | Proyecto D6 |
| D5 — medir renders | Ninguno. **Justificado:** verificación empírica |
| D5 — refactor final | Proyecto D6 |
| D5 — argumentar en contra | Ninguno. **Justificado:** ejercicio de criterio |

**Cero huérfanos sin justificar.**

---

## FASE 6b — AUDITORÍA DE CONFORMIDAD

```
□✔ Constitución Parte 3
     Punto y coma en todas las sentencias JS/TS
     === y !== : sin ocurrencias de == o !=
     Nombres en español: reductor, accion, estado, notificar, guias
     .toLocaleString("es-CL"): heredado del proyecto, no se introduce dato nuevo

□✔ .prettierrc
     semi: true → conforme
     tabWidth: 2 → conforme, verificado con medición automática
     singleQuote: false → conforme
     trailingComma: none → conforme

□✔ ESTADO_ROADMAP.md
     Semana 11 no existía; esta generación la define
     Prerrequisitos verificados contra las semanas reales

□✔ NEXUS_PROYECTO_NARRATIVA.md
     Anclaje por punto de síntesis, sin referencias a meses calendario
     El módulo de guías corresponde al área "Gestión de Operaciones" de Nexus

□✔ Decisiones arquitectónicas
     Se heredan datos (expediciones, reservas) y se agrega uno nuevo (guías),
     nunca código
     Sin for...in ni this
     Inglés desactivado: respetado

□✔ Bootcamps adyacentes
     El pie de la Semana 10 declara que 11 y 12 no estaban definidas → coherente
     El pie de esta semana anuncia Semana 12 = Next.js
```

---

## FASE 7 — AUDITORÍA ADVERSARIAL

### Formulaciones RECHAZADAS, con su razón

```
RECHAZADA 1: "Un custom hook permite compartir estado entre componentes"

Razón: es falso y es la confusión número uno del tema. Un custom hook
comparte lógica; cada componente que lo llama obtiene estado propio e
independiente. Quien crea lo contrario extrae un useCarrito(), lo usa en
tres componentes y pasa horas sin entender por qué no se sincronizan.

Reemplazo adoptado: "Un custom hook comparte LÓGICA, no ESTADO", con el
ejercicio del Día 1 que obliga a comprobarlo renderizando dos buscadores
simultáneos.
```

```
RECHAZADA 2: "Context sirve para evitar el prop drilling"

Razón: cierto pero incompleto, y el encuadre produce dos daños. Primero,
hace que el alumno alcance contexto ante el primer drilling, cuando la
composición suele bastar y cuesta menos. Segundo, oculta el costo: cada
cambio re-renderiza a todos los consumidores.

Reemplazo adoptado: composición se enseña un día ANTES que contexto, con
la regla explícita "la composición se intenta primero", y el contexto se
presenta con su criterio propio: datos que cambian poco y necesitan
muchos.
```

```
RECHAZADA 3: "useContext es el estado global de React"

Razón: confunde el transporte con el almacenamiento. Detrás de todo
contexto sigue habiendo un useState o un useReducer. El alumno que cree
esto no entiende por qué su contexto "no guarda nada" cuando olvida el
estado, ni por qué re-renderiza tanto.

Reemplazo adoptado: "el contexto no es un almacén: es un cable", con la
consecuencia explícita de que sigue haciendo falta un hook de estado
sosteniendo el valor.
```

```
RECHAZADA 4: "useReducer es para estado complejo"

Razón: sin criterio observable. Ver Fase 4.

Reemplazo adoptado: señal concreta (tres o más set seguidos en un
manejador) más el argumento de los estados imposibles.
```

```
RECHAZADA 5: "Separa los contextos de estado y dispatch para mejorar
el rendimiento"

Razón: pedirle al alumno que confíe en una afirmación de rendimiento que
no puede verificar produce culto al patrón. Lo aplicaría siempre, incluso
donde no aporta.

Reemplazo adoptado: se explica el mecanismo (dispatch es estable, el
estado no) Y se agrega el Ejercicio 2 del Día 5, que obliga a medir los
renders en ambas configuraciones. El material dice explícitamente "no
aceptes el argumento del material: mídelo".
```

### Ataques intentados sin hallazgo

```
✔ ¿Algún día introduce la solución antes del dolor? Cada día abre con el
  problema real y el intento con herramientas conocidas
✔ ¿La semana justifica su existencia? El Día 6 exige agregar un módulo
  entero — el costo de no tener estos patrones sería visible
✔ ¿Se enseña algún patrón obsoleto? Se verificó contra la lista de patrones
  retirados; render props y clases quedan fuera
✔ ¿Las secciones "cuándo NO" tienen peso real? Los cuatro conceptos la tienen,
  y la del contexto es la más extensa del documento
```

---

## VERIFICACIÓN DE LA ENMIENDA 10 — SINTAXIS NUEVA POR PESO

Tres sintaxis nuevas. Bajo el criterio dinámico de la Enmienda 10, la cantidad
no es el problema; el peso sí.

| Sintaxis | Peso | Justificación | Entrega |
|---|---|---|---|
| Unión discriminada | **MEDIA** | Es un patrón de tipado con comportamiento propio en el `switch`. No se contrabandea: se enseña en el cuerpo del Día 3 | Definición + ejemplo + 2 trampas (discriminante literal, retorno explícito) |
| `use()` para contexto | **LIGERA** | Alias de `useContext` con una diferencia acotada | Definición + ejemplo + trampa, solo Cheat Sheet, sin ejercicio |
| `crypto.randomUUID()` | **LIGERA** | Una llamada que devuelve un string | Definición + ejemplo + trampa (contexto seguro) |

```
✔ Ninguna PESADA introducida de contrabando
✔ Las tres cumplen las condiciones de admisión de la Enmienda 9
✔ Ninguna en el mismo ejercicio donde se evalúa competencia nueva:
    · la unión discriminada se enseña en la teoría del D3 antes del ejercicio
    · crypto.randomUUID() aparece en el D3 Ej.2, cuya competencia (reductor)
      ya se ejercitó en el Ej.1
    · use() no tiene ejercicio asociado
✔ Ninguna en el Día 1
```

**Nota:** bajo la Enmienda 9 original esto habría sido una violación (tres > una).
Bajo la Enmienda 10 es correcto: una MEDIA bien enseñada y dos LIGERAS. Es el
primer material que se beneficia del criterio dinámico.

---

## HALLAZGOS ABIERTOS

### 1. Esta semana depende de PS-4, que aún no está generado

El material asume repetidamente que existe una aplicación con escritura de datos:
el formulario a migrar en el Día 3, el prop drilling a eliminar en el Día 2, el
proyecto que se extiende en el Día 6.

Esa aplicación es PS-4, que está declarado en la Enmienda 8 pero no generado.

**Riesgo:** si PS-4 termina siendo distinto de lo previsto, varios ejercicios de
esta semana pierden su punto de partida.

**Recomendación:** generar PS-4 antes que la Semana 12, y verificar entonces que
los supuestos de esta semana se sostienen. No es urgente, pero sí es previo a
usar la Semana 11.

### 2. La semana no produce nada visible

Declarado en la nota de alcance del bootcamp, pero registrado aquí como riesgo
pedagógico real: cinco días de refactorización sin cambio visible pueden
desmotivar.

**Mitigación aplicada:** cada día abre con un dolor concreto del proyecto
existente, y el Día 6 exige un módulo nuevo cuyo costo sin estos patrones sería
evidente.

**Sin resolver:** si en la práctica la semana se hace pesada, la alternativa es
partirla en dos y repartir los patrones entre semanas de contenido visible. Se
decide con evidencia, no ahora.

### 3. La Semana 12 (Next.js) puede volver obsoleto parte de esto

En Next.js con App Router, buena parte de lo que aquí se resuelve con contexto se
resuelve con datos del servidor. Existe el riesgo de que el alumno sienta que
aprendió algo que después no usa.

**Mitigación aplicada:** las secciones "Conexión con Next.js" de los Días 4 y 5
lo dicen explícitamente y enmarcan el contexto pequeño como buena preparación.

**Para considerar al generar la Semana 12:** retomar esto de frente en vez de
dejar que el alumno lo descubra solo.

---

## ADVERTENCIA SOBRE LA VIGENCIA

```
ALTO   → sintaxis de provider (<Contexto> vs <Contexto.Provider>) y estado de use()
MEDIO  → estado del compilador de React y qué automatiza
MEDIO  → recomendación de Zustand como salida (el stack objetivo puede cambiar)
BAJO   → custom hooks, composición, useReducer, useContext — estables desde 2019
BAJO   → uniones discriminadas — TypeScript estable
```

**Verificar antes de usar:** la nota de versión de React del bloque perecedero.
Todo lo demás es estructuralmente estable.

---

*Reporte QA Semana 11 — julio 2026*
*Constitución v1.3 · Fases 0-8 incluyendo 6b*
