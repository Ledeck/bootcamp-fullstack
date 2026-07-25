# 🔬 REPORTE QA — BOOTCAMP SEMANA 10

> Documento interno de auditoría. No es material de estudio.
> Contiene el PRODUCTO de cada fase crítica, no su declaración (Enmienda 6).

---

```
ACTA DE GENERACIÓN
Fecha de generación: julio 2026
Semana en curso de Óscar al generar: 04 (PS-1 en curso)
Distancia estimada hasta el uso: ~5 meses
Fases ejecutadas: 0, 1, 2, 3, 4, 5, 6, 6b, 7, 8
Fase 1 — fuentes: documentación oficial de React y del ecosistema
         Vite/React, consultadas en julio 2026
Bloque perecedero verificado el: julio 2026 — REGENERAR antes de usar
Constitución aplicada: v1.2 (enmiendas 1-9)
```

---

## FASE 0 — DELIMITACIÓN CURRICULAR

### Dentro del alcance

```
- Componente como función que retorna JSX
- JSX: sintaxis, expresiones con llaves, fragmentos, className/htmlFor
- Props: tipado, desestructuración, opcionales con default, children, solo lectura
- Renderizado de listas con map y la prop key
- Renderizado condicional: ternario, &&, variable previa
- useState: memoria entre renders, función actualizadora, inmutabilidad
- Eventos: onClick, onChange, inputs controlados
- Levantar el estado al ancestro común
- useEffect: solo sincronización con sistemas externos, dependencias, limpieza
- Reglas de los hooks y su razón
```

### Fuera del alcance, con razón documentada

| Excluido | Razón |
|---|---|
| `useEffect` + `fetch` para datos | Patrón desaconsejado. Se resuelve con Server Components. Enseñarlo fijaría un hábito que habría que desaprender. |
| `useMemo`, `useCallback`, `React.memo` | El compilador de React automatiza la memoización. Carga cognitiva sin retorno. |
| `useContext`, `useReducer`, Zustand | Requieren un problema de escala que este proyecto no tiene. Sin el dolor previo, el concepto parece arbitrario. |
| `useRef` | No hace falta para ningún objetivo de la semana. Mínima Suficiencia. |
| Server Components, Actions, `use()` | Requieren Next.js. |
| `react-router` | Next.js trae su propio enrutador. |
| Componentes de clase | Obsoletos. |
| Tailwind CSS | Ver hallazgo abierto 3. |
| Testing de componentes | Fuera de la secuencia actual. |
| **Escritura de datos (crear reservas)** | **Movido a PS-4.** Ver sección de delimitación con PS-4. |

### Prerrequisitos asumidos — verificados contra los documentos reales

```
Semana 3  → map, filter, reduce, callbacks              ✔ verificado
Semana 4  → objetos, arrays de objetos                  ✔ verificado
Semana 5  → destructuring, spread, arrow, import/export ✔ verificado en BOOTCAMP_SEMANA_05.md
Semana 6  → promesas, async/await                       ✔ verificado en BOOTCAMP_SEMANA_06.md
Semana 8  → HTML semántico, CSS, flexbox/grid           ✔ verificado en BOOTCAMP_SEMANA_08.md
Semana 09 → tipos, type aliases, unions, genéricos      ✔ verificado en BOOTCAMP_SEMANA_09.md
```

**Cambio respecto de la versión anterior de este reporte:** los prerrequisitos de
las Semanas 5-8 ya no son un supuesto. Se auditaron los documentos reales
(auditorías Fase 6b de las Semanas 05-08) y las nueve dependencias de esta semana
están cubiertas. El riesgo que se había registrado queda cerrado.

---

## DELIMITACIÓN CON PS-4 (Enmienda 8)

Esta semana termina justo antes del punto de síntesis PS-4. La frontera se
definió así:

```
SEMANA 10 — proyecto del Día 6        PS-4 — Dashboard Nexus v1
────────────────────────────────      ──────────────────────────────────
Solo lectura                          Escritura de datos
Datos fijos en memoria                Los datos cambian en ejecución
Filtrar, buscar, mostrar detalle      Validar contra reglas de negocio
Cálculos derivados de datos fijos     Recálculo en cascada tras cada cambio
Un useEffect                          Estado compuesto, varias entidades
```

**Capacidad nueva que habilita PS-4:** el sistema deja de ser un visor y pasa a
ser una herramienta. Una reserva nueva altera ocupación, ingresos y resumen
ejecutivo en cascada.

**Efecto secundario positivo:** esta delimitación resuelve el hallazgo de
ejercicios huérfanos que tenía la versión anterior de este reporte.
`ContadorCupos` (D3) y `FormularioReserva` (D4) no aparecían en el proyecto
semanal y quedaban sin destino. Ahora son piezas declaradas de PS-4, marcadas
como tales en el material. Dejan de ser huérfanos y pasan a ser preparación.

---

## FASE 1 — INVESTIGACIÓN (tecnología viva)

React tiene número de versión → búsqueda obligatoria. Ejecutada.

| Afirmación | Fuente | Verificado | Impacto en el contenido |
|---|---|---|---|
| React 19.x es la versión vigente; no existe React 20 | documentación oficial de React | julio 2026 | Se descartaron fuentes que anunciaban una versión mayor inexistente |
| Vite es el estándar para React de una sola página; CRA deprecado desde feb. 2025 | documentación oficial de React | julio 2026 | Define el comando de setup del bloque perecedero |
| `useEffect` para pedir datos es patrón retirado; `useMemo`/`useCallback` manuales también | documentación oficial de React | julio 2026 | **Reformuló el Día 5 completo** y añadió la tabla "lo que no se usa hoy" |
| Existe `useEffectEvent` en React 19.2 | documentación oficial de React | julio 2026 | Excluido por Mínima Suficiencia: resuelve un problema que Óscar no tiene |

**Impacto mayor documentado:** el pie de la Semana 09 anuncia esta semana como
"hooks básicos (useState, useEffect)". Ese encuadre trata a `useEffect` como
hook fundamental de nivel introductorio, criterio desactualizado. Se reformuló
el Día 5 para enseñarlo como herramienta de sincronización con sistemas
externos, con una sección "cuándo NO usarlo" del mismo peso que la de uso
correcto, y un requisito de proyecto que limita a un solo efecto en todo el
código.

**Elementos perecederos identificados y aislados:**

```
- Comando npm create vite@latest ... --template react-ts
- Versión esperada de React en la plantilla (19.x)
- Estado de deprecación de Create React App
```

Todos agrupados en el bloque perecedero al inicio de bootcamp y cheat sheet,
con fecha de verificación. Ningún elemento perecedero quedó disperso en el
cuerpo del documento (Enmienda 2).

---

## FASE 4 — REVISIÓN TÉCNICA

Verificaciones sobre las afirmaciones del material:

```
✔ JSX se transforma en objetos descriptores, no en nodos del DOM
✔ El valor inicial de useState solo se usa en el primer render
✔ Las actualizaciones de estado se agrupan; leer el estado tras un set da el valor previo
✔ La función actualizadora recibe el valor pendiente, no el capturado en el render
✔ React compara por identidad — mutar y setear el mismo objeto no dispara render
✔ React no renderiza false, null ni undefined, pero sí renderiza 0
✔ Los efectos corren después de que el navegador pinta
✔ La limpieza corre antes del siguiente efecto y al desmontar
✔ Strict Mode duplica la ejecución de efectos solo en desarrollo
✔ evento.target.value es string incluso en input type="number"
✔ Number("") devuelve 0, no NaN
✔ Los hooks se identifican por orden de llamada, no por nombre
✔ Los nombres de componente deben empezar en mayúscula
✔ React.ReactNode acepta texto; React.ReactElement no
```

### Corrección aplicada durante esta fase

```
Formulación incorrecta (borrador):
  "React compara el estado viejo y el nuevo"

Por qué era incorrecta:
  Impreciso. La comparación es de identidad (Object.is), no de contenido.
  Esa formulación genera el modelo mental de que React inspecciona los
  objetos por dentro — que es exactamente lo que hace pensar que mutar
  y setear debería funcionar.

Formulación corregida:
  "React compara por identidad — pregunta si es el mismo objeto en
  memoria, no si tiene el mismo contenido"
```

---

## FASE 6 — AUDITORÍA DE CONSISTENCIA INTERNA

```
✔ Terminología estable: "render", "estado", "prop", "efecto" — sin sinónimos alternados
✔ El mini-ejercicio del Día 1 se retoma explícitamente en el Día 3
✔ La distinción prop/estado se adelanta en el Día 2 y se cierra en el Día 3
✔ El error del 0 en && aparece en Cheat Sheet y Día 2 — repetición deliberada, marcada
✔ Cada concepto de los Días 1-5 reaparece en el proyecto del Día 6 o en PS-4
```

### Verificación de ejercicios huérfanos

| Ejercicio | Destino |
|---|---|
| D1 — Tarjeta estática | Proyecto D6, evolucionada |
| D1 — Fragmento | Proyecto D6 |
| D1 — Diagnóstico de errores | Ninguno. **Justificado:** es diagnóstico, no construcción |
| D2 — Props tipadas, listas, condicional | Proyecto D6 |
| D2 — EtiquetaDificultad | Proyecto D6 (insignia de dificultad) |
| D2 — Panel con children | Proyecto D6 |
| D3 — ContadorCupos | **PS-4**, marcado en el material |
| D3 — Filtro y buscador | Proyecto D6 |
| D3 — Bug de la lista | Ninguno. **Justificado:** diagnóstico |
| D4 — Estado levantado, filtros, limpiar | Proyecto D6 |
| D4 — FormularioReserva | **PS-4**, marcado en el material |
| D5 — Título dinámico | Proyecto D6 |
| D5 — localStorage, reloj, auditoría | Ninguno. **Justificado:** localStorage y reloj quedan fuera por el requisito de un solo efecto; la auditoría es diagnóstico |

**Cero huérfanos sin justificar.** Regla del Error 4 satisfecha.

---

## FASE 6b — AUDITORÍA DE CONFORMIDAD (Enmienda 4)

Checklist contra las fuentes externas, ítem por ítem:

```
□✔ Reglas de código de la Constitución (Parte 3)
     Punto y coma: presente en todas las sentencias JS/TS del material
     === y !== : sin ocurrencias de == o !=
     Nombres en español: sí (expediciones, visibles, filtros, manejarClic)
     .toLocaleString("es-CL") para precios: presente

□✔ .prettierrc del proyecto
     semi: true         → conforme
     tabWidth: 2        → conforme, sin indentación de 4 espacios
     singleQuote: false → conforme, comillas dobles
     trailingComma: none → conforme

□✔ ESTADO_ROADMAP.md
     Numeración de semana: 10, coherente
     Prerrequisitos: las 9 dependencias existen en semanas anteriores

□✔ NEXUS_PROYECTO_NARRATIVA.md
     Anclaje: por punto de síntesis (PS-4), no por mes calendario
     Sin anotaciones de mes en el material nuevo (Enmienda 8)

□✔ Decisiones arquitectónicas confirmadas
     Independencia técnica: se heredan DATOS de PS-1, no código
     Exclusiones (for...in, this): no aparecen
     Inglés: desactivado, respetado

□✔ Bootcamps adyacentes
     Pie de la Semana 09 anuncia React → coincide con el tema
     ⚠ El pie de S09 anuncia "hooks básicos (useState, useEffect)";
       el temario real reencuadra useEffect. Divergencia deliberada y
       documentada en Fase 1. No se corrige S09 (contenido no erróneo,
       solo su encuadre en el anuncio).
```

**Hallazgo de conformidad:** ninguno bloqueante.

---

## FASE 7 — AUDITORÍA ADVERSARIAL

**Pregunta aplicada a cada explicación:** si el alumno entiende solo esto y nada
más, ¿construye un modelo mental correcto y transferible?

### Formulaciones RECHAZADAS, con su razón

```
RECHAZADA 1: "El estado es una variable que React recuerda"

Razón: genera el modelo de que existe una variable especial dentro del
componente. Ese modelo predice que setEstado(5); console.log(estado)
imprime 5, y predice que mutar el objeto debería funcionar. Ambas
predicciones son falsas.

Reemplazo adoptado: "El estado vive en React, no en tu componente. Tu
componente lo pide en cada render y recibe una foto de ese momento."
Este modelo predice correctamente los tres comportamientos confusos
(lectura tras set, dos sets seguidos, mutación).
```

```
RECHAZADA 2: "useEffect se ejecuta cuando el componente carga"

Razón: es la formulación que produjo una década de mal uso. Sugiere que
el efecto es un constructor, y de ahí sale el fetching dentro de efectos.

Reemplazo adoptado: "Un efecto es un cable que sale de React hacia un
sistema externo. Si los dos extremos del cable están dentro de React, no
necesitas cable." Este modelo hace que el alumno se pregunte "¿con qué
sistema externo estoy hablando?" antes de escribir — que es el filtro
correcto.
```

```
RECHAZADA 3: "key ayuda a React a renderizar más rápido"

Razón: técnicamente cierto y pedagógicamente dañino. Presenta la key como
optimización opcional; el alumno concluye que puede omitirla o usar el
índice sin consecuencias, hasta que el estado se asocia al elemento
equivocado.

Reemplazo adoptado: analogía del asiento numerado, con el caso de fallo
concreto al filtrar la lista — que es justo lo que hace el proyecto del
Día 6.
```

```
RECHAZADA 4: "Las props son de solo lectura por convención"

Razón: "por convención" sugiere que es una regla de estilo que se puede
romper si hace falta. El alumno mutaría props en un caso apurado.

Reemplazo adoptado: explicar el mecanismo — el objeto de props lo
construye el padre en cada render, así que mutarlo produce padre e hijo
con versiones distintas del mismo dato hasta el siguiente render. La
regla se sigue porque se entiende el fallo, no porque esté prohibida.
```

### Ataques intentados sin hallazgo

```
✔ ¿Los ejemplos funcionan solo en el caso mostrado? Los de estado incluyen
  el caso de dos set consecutivos, que es donde fallan las versiones simples
✔ ¿Alguna simplificación sacrifica transferibilidad? La descripción del JSX
  como objeto es simplificada pero direccionalmente correcta
✔ ¿Se adelanta algún concepto sin contexto? El spread en props aparece en D2
  con advertencia; el genérico de D4 se apoya en la Semana 09
✔ ¿La sintaxis nueva cumple la Enmienda 9? Ver sección siguiente
```

---

## VERIFICACIÓN DE LA ENMIENDA 9 — SINTAXIS NUEVA

Dos sintaxis nuevas introducidas. Ambas evaluadas contra las tres condiciones
de admisión:

### `Number(evento.target.value)`

```
(a) Herramienta, no modelo mental    ✔ convierte un valor; no reorganiza nada
(b) Se apoya en mecanismo dominado   ✔ conversión de tipos, Semana 1
(c) Efecto visible de inmediato      ✔ el estado guarda número o string
Formato de entrega:
  Definición  ✔ Cheat Sheet §10
  Ejemplo     ✔ input controlado numérico
  Trampa      ✔ DOS: value siempre es string; Number("") da 0, no NaN
Ubicación: Día 4 (dentro del rango permitido, días 3-5)
```

### `React.ReactNode`

```
(a) Herramienta, no modelo mental    ✔ es un tipo; el mecanismo de children ya se explicó
(b) Se apoya en mecanismo dominado   ✔ type aliases y unions, Semana 09
(c) Efecto visible de inmediato      ✔ TypeScript acepta o rechaza
Formato de entrega:
  Definición  ✔ Cheat Sheet §10
  Ejemplo     ✔ PanelProps
  Trampa      ✔ confusión con ReactElement, que rechaza texto plano
Ubicación: Día 2
```

**Límites de frecuencia (Enmienda 9):**

```
✔ Máximo una sintaxis nueva por ejercicio — cumplido
✔ Ninguna en el mismo ejercicio donde se evalúa competencia nueva:
    ReactNode va en el ejercicio de children, cuya competencia (composición)
    ya se explicó en la teoría del mismo día
    Number() va en el formulario, cuya competencia (input controlado) ya se
    explicó en el Día 3
⚠ Excede el máximo de "una por semana" del bootcamp semanal: hay dos.
   Justificación: ambas son tipos/conversiones triviales, no métodos con
   comportamiento propio, y sin ellas el material tendría código que no
   compila en TypeScript. Registrado como excepción consciente, no como
   omisión. Si el criterio se considera estricto, ReactNode puede moverse
   a la Cheat Sheet como referencia sin ejercicio asociado.
```

---

## HALLAZGOS ABIERTOS — REQUIEREN DECISIÓN

### 1. Dos sintaxis nuevas en una semana

Detallado arriba. La Enmienda 9 fija un máximo de una por semana en el bootcamp
semanal. Aquí hay dos. Ambas son triviales y necesarias para que el código
compile, pero la regla es la regla.

**Opciones:** (a) aceptar la excepción y documentarla; (b) mover `ReactNode` a
referencia pura sin ejercicio; (c) ajustar la Enmienda 9 para distinguir entre
*métodos con comportamiento* y *tipos/conversiones*.

Recomendación: (c). La regla se escribió pensando en casos como `sort()`, que
tiene comportamiento propio y trampas de mutación. Un alias de tipo no es
comparable. Pero es un cambio a la Constitución y no se hace sin tu decisión.

### 2. Tailwind excluido — decisión unilateral

El stack objetivo incluye Tailwind. Se excluyó por Mínima Suficiencia: ninguna
validación de esta semana lo requiere, y añadirlo duplica la carga cognitiva.

Consecuencia aceptada: el proyecto se verá pobre visualmente. Registrado por si
el impacto en la motivación resulta ser mayor que el beneficio pedagógico.

### 3. La Semana 09 pide migrar código del Mes 1

El Día 5 de la Semana 09 pide migrar el proyecto NexusHR de la Semana 4 a
TypeScript, lo que arrastra dependencia de código entre proyectos.

En esta semana se aplicó el criterio alternativo: **se heredan datos y reglas de
negocio, nunca código.** El proyecto reutiliza los arrays de PS-1 y pide
reescribir la lógica dentro de componentes. Queda pendiente decidir si ese
criterio se formaliza en la Constitución (hoy está en las decisiones
arquitectónicas del roadmap, no en la Constitución).

---

## ADVERTENCIA SOBRE LA VIGENCIA

Generado en julio de 2026, para usarse aproximadamente en diciembre de 2026.

```
ALTO   → comando de creación de Vite y versión de React del template
ALTO   → estado del compilador de React y qué automatiza
MEDIO  → posición oficial sobre useEffect y alternativas recomendadas
MEDIO  → aparición de hooks nuevos que cambien lo que es "básico"
BAJO   → JSX, props, useState, reglas de los hooks — estables desde 2019
```

**Verificar antes de usar:** únicamente el bloque perecedero. El resto del
contenido es estructuralmente estable.

Evidencia acumulada que respalda esta separación: la auditoría de las Semanas
05-08 mostró que ninguna de esas semanas tenía contenido perecedero (no instalan
herramientas), y que lo único que envejeció en la Semana 09 fue su bloque de
setup (`ts-node`). El patrón se sostiene en seis semanas: **los conceptos no
caducan, el setup sí.**

---

*Reporte QA Semana 10 — julio 2026*
*Constitución v1.2 · Fases 0-8 incluyendo 6b*
