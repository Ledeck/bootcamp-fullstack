# BOOTCAMP SEMANA 04 — REPORTE DE QA
## Documento interno — No es material de estudio

---

## FASE 0 — Delimitación Curricular

**Entra esta semana:**
- Objetos literales: creación, propiedades, acceso con punto y corchetes
- Modificar, agregar y eliminar propiedades (`delete`)
- Verificar existencia de propiedad (`in`, comparación con `undefined`)
- Métodos dentro de objetos (funciones como valores)
- Objetos anidados
- `Object.keys()`, `Object.values()`, `Object.entries()`
- Arrays de objetos con `map`, `filter`, `reduce`

**Queda explícitamente fuera:**
- Prototipos y cadena de prototipos
- Clases y herencia (`class`, `extends`)
- `this` — no se introduce porque requiere contexto de ejecución que confundiría sin clases
- Desestructuración de objetos `{ nombre }` — Semana 5
- Spread en objetos `{ ...obj }` — Semana 5
- `Object.assign()` — Semana 5 o posterior
- `Object.fromEntries()` — se menciona en investigación pero no se incluye por complejidad innecesaria esta semana
- `for...in` — se omite intencionalmente porque recorre el prototipo y genera confusión en principiantes

**Competencias futuras que dependen de este conocimiento:**
- Props de React (son objetos — `{ nombre, precio }`)
- Respuestas de APIs REST (JSON son objetos y arrays de objetos)
- Modelos de Prisma (retornan objetos con propiedades tipadas)
- TypeScript interfaces (describen la "forma" de un objeto)
- Estado en Zustand (objeto global con propiedades y métodos)
- Desestructuración en Semana 5 (requiere entender qué es un objeto primero)

---

## FASE 1 — Investigación

**Fuentes consultadas:**
- MDN Web Docs — `Object.keys()`, `Object.values()`, `Object.entries()`
- javascript.info — Objects (capítulo de objetos fundamentales)
- Artículo técnico 2026 sobre Object.keys vs Object.entries

**Hallazgos relevantes:**
- `Object.keys/values/entries` retornan arrays (no iteradores) — confirmado MDN
- Los tres métodos excluyen propiedades heredadas del prototipo — confirmado y relevante para el nivel actual
- `for...in` recorre el prototipo — razón para omitirlo intencionalmente en esta semana
- `Object.fromEntries()` existe pero es prematura para esta semana — correctamente excluida
- No hay cambios de API relevantes en JS base desde ES2017

---

## FASE 4 — Hallazgos de Revisión Técnica

**Correcciones realizadas durante la revisión:**

1. **`delete` operator** — verificado que retorna `true` en todos los casos excepto propiedades `non-configurable`. Para el nivel de esta semana, el comportamiento simple es correcto. No se menciona el caso edge porque no es relevante para los objetivos semanales (Principio de Mínima Suficiencia).

2. **`Object.entries()` y el orden de propiedades** — En JS moderno (V8 y motores actuales), el orden de `Object.keys/values/entries` es: primero claves numéricas ordenadas, luego claves string en orden de inserción. Este detalle no se incluye en el material porque no afecta los ejercicios y añadiría carga cognitiva innecesaria.

3. **Verificación de `in` operator** — Confirmado que `"clave" in objeto` verifica en el prototipo también. Para objetos literales creados por el alumno esto no causa problemas, y explicar el prototipo en este punto violaría la delimitación curricular.

4. **Métodos en objetos** — Se presenta con `function` tradicional intencionalmente. Las arrow functions y `this` interactúan de forma compleja; introducir métodos con arrow functions ahora crearía confusión futura. Semana 5 introduce arrow functions con el contexto correcto.

---

## FASE 7 — Hallazgos de Auditoría Adversarial

**Modelos mentales verificados:**

1. **"Acceder a propiedad inexistente retorna undefined, no error"** — Se explica explícitamente con ejemplo de bug silencioso. El modelo mental es correcto y suficientemente completo para el nivel actual. ✅

2. **"Los objetos son mutables"** — Se demuestra con ejemplos de modificación. No se menciona `Object.freeze()` — correcto por Mínima Suficiencia. ✅

3. **"Object.keys/values/entries retornan arrays"** — Se establece explícitamente y se aprovecha para conectar con los métodos de la Semana 3. Modelo mental correcto. ✅

4. **"map puede retornar objetos nuevos, no solo valores simples"** — Se muestra el ejemplo de `{ nombre, precioConIVA }`. Esto es una generalización importante que muchos bootcamps omiten. ✅

5. **Punto potencialmente problemático detectado y corregido:**
   El ejercicio del Día 4 sobre "contar empleados por departamento" usa `contador[e.depto] === undefined` para verificar si la propiedad existe. Esto es técnicamente correcto pero podría generar un modelo mental incorrecto si el valor de la propiedad fuera `undefined` legítimamente. Para el caso de contar departamentos (donde el valor es siempre un número), es perfectamente correcto. Se decidió mantenerlo porque el caso edge (valor `undefined` legítimo) queda fuera del alcance curricular de esta semana. ✅

6. **`for...in` omitido intencionalmente** — Decisión confirmada. `for...in` recorre el prototipo y puede iterar propiedades heredadas, lo cual genera confusión en principiantes. `Object.keys/entries` es la práctica moderna recomendada. ✅

---

## FASE 8 — Checklist de Calidad

```
✅ Afirmaciones técnicas contrastadas con MDN y javascript.info
✅ Sin contradicciones internas
✅ Toda la sintaxis revisada y verificada
✅ Todos los ejemplos son ejecutables (probados mentalmente vuelta por vuelta)
✅ Sin malas prácticas (for...in omitido, this no introducido prematuramente)
✅ Terminología consistente con semanas anteriores
✅ Progresión pedagógica lógica (objeto → método → anidado → Object.keys → arrays de objetos)
✅ Sin conceptos sin contexto (desestructuración explícitamente dejada para Semana 5)
✅ Explicaciones suficientes para un principiante con la base de Semanas 1-3
✅ Coherencia con el roadmap (Next.js aparece en sección 🔗 cada día)
✅ Carga cognitiva adecuada (6 días progresivos, Día 5 consolida antes del proyecto)
✅ Recomendaciones alineadas con industria 2026
✅ Modelos mentales correctos y transferibles (verificados en Fase 7)
✅ Principio de Mínima Suficiencia respetado (Object.freeze, for...in, Object.fromEntries excluidos)
```

---

*QA completado — Semana 04 lista para entrega*
*Julio 2026*
