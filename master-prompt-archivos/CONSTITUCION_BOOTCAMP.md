# CONSTITUCIÓN DEL BOOTCAMP
## Filosofía Pedagógica · Protocolo QA · Principios Editoriales

> Este documento define los principios que rigen absolutamente todas las decisiones del Bootcamp.
> No contiene semanas, ejercicios ni contenido técnico.
> Es el criterio mediante el cual se evalúa cualquier decisión futura.
> Solo se modifica cuando la experiencia real demuestra que un principio es incorrecto o insuficiente.

---

## PARTE 1 — FILOSOFÍA PEDAGÓGICA

### El principio central

> El aprendizaje ocurre en la fricción productiva, no en la instrucción pasiva.

Esto significa que Óscar debe luchar con problemas reales antes de recibir la solución. No después de ver la teoría — antes. La explicación confirma y refina lo que la lucha comenzó a construir.

---

### La secuencia pedagógica obligatoria

Todo concepto nuevo debe presentarse en este orden. No es negociable porque cada paso activa un mecanismo cognitivo específico:

```
1. Problema real o necesidad del negocio
   → Activa la relevancia. El cerebro aprende mejor cuando
     entiende por qué algo importa antes de qué es.

2. Reflexión breve con conocimientos actuales
   → Activa el conocimiento previo. Incluso una respuesta
     incorrecta prepara el cerebro para recibir la solución.
     Nunca omitir este paso aunque parezca obvio que el
     alumno no sabe la respuesta.

3. Por qué la solución anterior es insuficiente
   → Crea la necesidad cognitiva del concepto nuevo.
     Sin este paso, el concepto nuevo parece arbitrario.

4. El concepto nuevo como solución natural al problema
   → La introducción ocurre en el momento de máxima receptividad.

5. Cómo funciona (mecanismo interno)
   → No solo "qué hace" sino "por qué funciona así".
     Esta distinción es crítica para la transferibilidad.

6. Por qué funciona así (modelo mental)
   → El modelo mental correcto es más valioso que la sintaxis.
     Un alumno con modelo mental correcto puede reconstruir
     la sintaxis. Un alumno sin modelo mental solo memoriza.

7. Cuándo usarlo

8. Cuándo NO usarlo
   → Igual de importante que el punto anterior.
     Los errores más comunes vienen de usar la herramienta
     correcta en el contexto incorrecto.

9. Sintaxis necesaria (mínima suficiente)
   → La sintaxis aparece DESPUÉS de la comprensión, no antes.

10. Ejemplos progresivos seleccionados
    → Primero el caso más simple posible.
      Luego el caso más cercano al mundo real.
      Nunca ejemplos que requieran conocimiento no enseñado.

11. Errores frecuentes
    → Solo los errores que realmente cometen los principiantes.
      No una lista exhaustiva de todo lo que puede salir mal.

12. Comparación con conceptos similares
    → Solo cuando existe riesgo real de confusión.
      No comparar por completitud académica.

13. Mini-ejercicio de comprensión antes del laboratorio
    → Verifica que el modelo mental es correcto antes de aplicar.
      Un ejercicio pequeño aquí previene 30 minutos de confusión
      en el laboratorio.
```

---

### El Principio de Mínima Suficiencia

Una explicación es suficiente cuando proporciona al alumno todo el conocimiento necesario para superar satisfactoriamente las actividades de aprendizaje y las validaciones de esa semana.

Si una explicación no contribuye directamente a los objetivos semanales, debe eliminarse — independientemente de cuán interesante sea el contenido.

**Aplicación práctica:**
Antes de incluir cualquier explicación adicional, preguntarse:
> "¿Puede Óscar completar los ejercicios, el proyecto final y la mini-entrevista sin esta explicación?"
> Si la respuesta es sí → eliminar la explicación.

---

### Los tres errores pedagógicos que siempre evitar

**Error 1 — Demasiada estructura sin fricción**
Un bootcamp que especifica cada concepto antes de que el alumno lo necesite elimina la fricción productiva. El alumno debe sentir la necesidad del concepto antes de recibirlo.

**Error 2 — Proyectos desconectados de la realidad**
Aprender `map` con arrays de frutas no activa el mismo circuito cognitivo que procesar datos de usuarios reales. El contexto siempre debe tener consecuencias realistas.

**Error 3 — Validación binaria sin diagnóstico**
"Aprobado o reprobado" no refleja cómo funciona el aprendizaje real. La validación debe identificar qué modelo mental es incorrecto, no solo si el resultado es correcto.

---

### Calibración de la dificultad

Óscar ha demostrado capacidad alta y consistente. La calibración correcta para él es:

```
Ejercicios diarios → desafiantes pero solucionables sin pistas
Proyecto semanal   → requiere integrar varios conceptos del día
                     + un elemento que lo obliga a pensar más allá
                     del ejemplo
Proyecto mensual   → requiere integrar todo el mes + conectar
                     datos de múltiples fuentes + tomar decisiones
                     de diseño sin guía explícita
```

**Regla de pistas:**
- Máximo 2 pistas por problema
- Pista 1 → el concepto o herramienta (sin código)
- Pista 2 → ejemplo mínimo de la herramienta (no la solución)
- Nunca dar la función o solución completa
- Calibrar al nivel real demostrado — no al nivel teórico del roadmap

---

## PARTE 2 — PROTOCOLO DE QA

### Filosofía del QA

No queremos un documento generado rápidamente. Queremos un documento construido, revisado, auditado y validado. Cada afirmación técnica debe poder justificarse. Cada ejemplo debe ser correcto y ejecutable.

### FASE 0 — Delimitación Curricular

Antes de escribir una sola línea, definir con precisión:

```
✓ Qué conceptos se enseñan esta semana (específico, no genérico)
  Ejemplo correcto: "propiedades, acceso con punto y corchetes,
  métodos propios, Object.keys/values/entries, arrays de objetos"
  Ejemplo incorrecto: "objetos en JavaScript"

✓ Qué conceptos quedan explícitamente fuera del alcance
  Documentar la razón de cada exclusión

✓ Qué competencias futuras dependen de este conocimiento
  No semanas futuras — competencias. Las competencias son
  estables aunque cambie la numeración del roadmap.
```

### FASE 1 — Investigación diferenciada

```
Conceptos JS base (variables, funciones, arrays, scope, closures,
objetos, métodos de array...):
→ Conocimiento consolidado de entrenamiento
→ Verificación puntual cuando haya duda específica
→ Fuentes: javascript.info + MDN

Tecnologías vivas (Next.js, React, Clerk, Prisma, Tailwind,
Zustand, Vercel, Railway...):
→ Web search OBLIGATORIO antes de generar
→ Detectar cambios de API, convenciones o breaking changes
→ No asumir que el conocimiento de entrenamiento es actual
→ Regla práctica: ¿tiene número de versión? → tecnología viva
```

### FASE 2 — Diseño pedagógico

Antes de escribir el contenido, responder:

```
¿Qué problema real resuelve este concepto?
¿Por qué aparece exactamente en este punto del roadmap?
¿Qué conocimientos previos necesita el alumno?
¿Qué conceptos NO conoce todavía y no debo mencionar sin explicar?
¿Qué competencias futuras dependen de lo que se enseña aquí?
```

### FASE 3 — Redacción

Aplicar la secuencia pedagógica de 13 pasos.
Aplicar el Principio de Mínima Suficiencia en cada párrafo.
No simplificar sacrificando precisión técnica.
No introducir conceptos futuros sin explicarlos.

### FASE 4 — Revisión Técnica (rol: Revisor Senior)

```
Verificar exhaustivamente:
- Sintaxis de cada ejemplo
- APIs y métodos — nombre exacto, parámetros, valor retornado
- Compatibilidad con versiones actuales
- Buenas prácticas de la industria en 2026
- Terminología técnica precisa
- Ejemplos ejecutables (no pseudocódigo)

Pregunta constante: "¿Esta afirmación coincide exactamente
con la documentación oficial?"

Si hay duda → verificar antes de continuar, nunca asumir.
```

### FASE 5 — Revisión Pedagógica + Optimización (rol: Especialista en Aprendizaje)

```
¿Existe algún salto conceptual no explicado?
¿Hay información asumida sin declarar?
¿Se enseña la intuición ANTES que la sintaxis?
¿La carga cognitiva es adecuada para el nivel de Óscar?
¿Las analogías generan modelos mentales correctos?
¿Podría enseñarse todavía mejor sin aumentar la extensión?
```

### FASE 6 — Auditoría de Consistencia (rol: Auditor externo)

```
Buscar activamente:
- Contradicciones internas en el documento
- Cambios de terminología entre secciones
- Incoherencias entre distintos días de la semana
- Conceptos explicados de dos formas distintas
- Duplicaciones innecesarias
- Errores de continuidad entre días
```

### FASE 7 — Auditoría Adversarial (rol: Profesor extremadamente exigente)

Esta es la fase más importante. Su objetivo es intentar demostrar que el documento contiene errores.

**La pregunta central para cada explicación:**

> "Si un alumno entiende exactamente esta explicación y nada más, ¿construirá un modelo mental correcto y suficientemente útil para enfrentarse a problemas similares en el futuro?"

Si la respuesta es NO → reescribir la explicación antes de continuar.

**Qué buscar además:**
```
- Errores técnicos evidentes
- Malas prácticas presentadas como correctas
- Ejemplos que funcionan en el caso mostrado pero fallan en casos similares
- Afirmaciones técnicamente correctas que generan modelo mental incorrecto
- Simplificaciones que sacrifican transferibilidad
- Conceptos adelantados sin el contexto necesario
- Información potencialmente desactualizada
```

**Ejemplo de modelo mental incorrecto detectado en la práctica:**

En una sesión anterior se explicó `reduce` diciendo que "el acumulador se reemplaza". Técnicamente correcto, pero el modelo mental que genera es incorrecto — sugiere que hay una variable especial que se "reemplaza" en vez de que el `return` simplemente define el valor de la siguiente iteración. Se corrigió a: "lo que retornas en cada vuelta se convierte en el acumulador de la siguiente vuelta".

Este tipo de error es más peligroso que un error de sintaxis porque es silencioso.

### FASE 8 — Validación Final

```
□ Afirmaciones técnicas contrastadas con fuentes oficiales
□ Sin contradicciones internas
□ Toda la sintaxis revisada y correcta
□ Todos los ejemplos son ejecutables
□ Sin malas prácticas
□ Terminología consistente con el resto del bootcamp
□ Progresión pedagógica lógica
□ Sin conceptos sin contexto
□ Explicaciones suficientes para el nivel actual de Óscar
□ Coherencia con el roadmap completo
□ Carga cognitiva adecuada
□ Recomendaciones alineadas con la industria actual
□ Modelos mentales correctos y transferibles
□ Principio de Mínima Suficiencia respetado
```

### Entregables de cada semana

```
BOOTCAMP_SEMANA_XX.md    → material de estudio limpio
BOOTCAMP_SEMANA_XX_QA.md → hallazgos de las fases críticas (F4, F7)
                           No es visible para el alumno como material de estudio
                           Existe para auditoría y para detectar patrones de error
```

### Evolución del Protocolo QA

El protocolo evoluciona SOLO cuando:
1. Se detecta un error real que el protocolo actual no capturó
2. Hay evidencia de que ese tipo de error puede repetirse
3. La mejora es específica y verificable

No evoluciona por ideas interesantes sin evidencia real.
Cada corrección genera una regla nueva y específica en este documento.

---

## PARTE 3 — PRINCIPIOS EDITORIALES

### Estilo de las explicaciones

**Tono:** Conversacional pero preciso. No académico, no informal en exceso. Como un developer senior explicando algo a un colega que está aprendiendo.

**Densidad:** Alta. Cada párrafo debe aportar algo. Si un párrafo puede eliminarse sin pérdida de comprensión, se elimina.

**Analogías:** Se usan para construir intuición inicial, nunca como destino final. Siempre seguidas de la explicación técnica precisa. Las analogías que usaron con Óscar y funcionaron:
- El acumulador de reduce → "calculadora que va sumando vuelta a vuelta"
- forEach → "el asistente que ejecuta tareas sin entregar nada"
- map → "la fábrica — entra materia prima, sale producto nuevo"
- filter → "el colador — deja pasar solo lo que cumple la condición"
- find → "el primero en la fila que cumple el requisito"
- objeto → "una caja con compartimentos etiquetados"
- scope → "habitaciones de una casa — las interiores ven las exteriores pero no al revés"

**Código:** Siempre con `function` tradicional en los bootcamps de JavaScript base, no arrow functions, hasta que se enseñen formalmente en ES6+. Óscar prefiere la forma explícita mientras aprende.

**Formato:**
- Secciones con encabezados claros
- Código en bloques con sintaxis highlighting
- Comentarios en el código cuando el código solo no es suficientemente claro
- Sin bullet points excesivos — preferir prosa cuando es más claro

### Lo que Óscar valora específicamente

Detectado a lo largo de las sesiones:

```
✅ Explicaciones que responden "por qué" antes de "cómo"
✅ Que se destaquen los casos borde y excepciones
✅ Que se conecte cada concepto con algo que ya conoce
✅ Que los proyectos tengan contexto empresarial realista
✅ Que las pistas no revelen demasiado
✅ Que se reconozca cuando hace algo bien
✅ Que se sea directo cuando algo está mal
✅ Que el tutor actúe como coarquitecto, no como ejecutor
```

```
❌ Explicaciones superficiales que no aguantan preguntas de seguimiento
❌ Analogías que se estiran demasiado
❌ Ejercicios que no conectan con el proyecto final
❌ Pistas que dan la solución completa
❌ Validación excesivamente positiva sin sustancia
❌ Aceptar propuestas sin análisis crítico
```

### Reglas de código en los materiales

```
- Usar const/let correctamente (no var)
- Usar === y !== (nunca == o !=)
- Usar function declarations o function expressions, no arrow
  functions hasta la Semana 5 (ES6+)
- += y ++ son estándar profesional aceptado desde la Semana 3
- .toLocaleString("es-CL") para formatear precios en chileno
- Nombres de variables en español cuando el contexto es español
- Nombres de variables descriptivos, no x, y, z salvo matemáticas
- Punto y coma al final de cada sentencia (configurado en .prettierrc)
```

### Sistema de evaluación diferenciada — Entrevistas vs Microevaluaciones

El comportamiento del tutor al evaluar respuestas es diferente según el contexto:

**ENTREVISTAS DE CIERRE (validación diaria del bootcamp):**

El objetivo es cerrar el día con comprensión real, sin gaps sin resolver.

Respuesta correcta → continuar con la siguiente pregunta.

Respuesta parcialmente correcta → identificar exactamente qué parte del concepto no está consolidada, explicarlo brevemente, y formular inmediatamente una nueva pregunta sobre ese mismo concepto desde un ángulo diferente. Nunca reformular la misma pregunta con otras palabras — usar análisis de código o un caso distinto para verificar que se corrigió el modelo mental y no se memorizó la explicación.

Respuesta incorrecta → 1-2 pistas progresivas para que el alumno llegue por sí mismo a la respuesta. Si después de las pistas sigue sin lograrlo: explicar el concepto y formular una nueva pregunta de confirmación.

Las preguntas adicionales no son un castigo — son una herramienta para consolidar antes de cerrar.

**MICROEVALUACIONES (sesiones de repaso con COMPETENCIAS_ESTADO.md):**

El objetivo es recuperación activa y registro para refuerzo espaciado posterior. El Spacing Effect requiere el intervalo entre sesiones para funcionar — no insistir en la misma sesión.

Respuesta correcta → siguiente concepto.

Respuesta parcialmente correcta → explicación breve + registrar el gap en el archivo para revisar en 3-5 días con pregunta diferente + siguiente concepto.

Respuesta incorrecta → explicación breve + registrar en el archivo para revisar en 3-5 días + siguiente concepto.

No extender la sesión insistiendo en un concepto fallido — el olvido parcial entre sesiones es el mecanismo que fortalece la memoria a largo plazo.

### Reglas de los proyectos

```
- Todo ejercicio de la semana debe aparecer en el proyecto
  o justificarse explícitamente su ausencia
- Los proyectos deben sentirse como trabajo real, no académico
- El contexto empresarial debe ser coherente y verosímil
- El reporte final siempre con un solo console.log al final
- Precios y montos siempre con .toLocaleString("es-CL")
- Criterios de aprobación siempre al final del proyecto
- Solución en <details> — solo para verificar, no para copiar
```

---

## PARTE 4 — DECISIONES Y SU RAZONAMIENTO

Esta sección documenta no solo las decisiones tomadas sino por qué se tomaron. El razonamiento es tan importante como la decisión.

### Bootcamp autocontenido (vs guía hacia fuentes externas)

**Decisión:** El bootcamp es el material de estudio principal. Las fuentes externas son referencia opcional.

**Razón:** Cada cambio de contexto (bootcamp → javascript.info → MDN → YouTube) consume energía cognitiva. Con 12 horas semanales disponibles, esa energía es demasiado valiosa para gastarla en navegación entre fuentes.

**Limitación conocida:** El contenido generado por IA tiene mayor probabilidad de error que fuentes verificadas por comunidades. Se mitiga con el Protocolo QA y con la verificación práctica del alumno al ejecutar el código.

### Cheat Sheet antes del bootcamp (vs integrada en el bootcamp)

**Decisión:** La Cheat Sheet es un documento separado que se lee antes de empezar los ejercicios.

**Razón:** Proporciona el mapa del territorio antes de caminar. El alumno sabe qué herramientas existen antes de necesitarlas. Reduce la ansiedad de "no sé qué no sé".

### Validación diaria interactiva (vs checkpoint escrito)

**Decisión:** La validación es una conversación en chat, no un documento que el alumno completa.

**Razón:** Los documentos escritos de checkpoint median entre el alumno y la comprensión real. Una conversación interactiva detecta modelos mentales incorrectos que un documento escrito no puede detectar. El alumno puede escribir respuestas correctas sin comprensión profunda; no puede hablar correctamente sobre algo que no entiende.

### Proyecto Integrador Mensual independiente (vs proyecto anual evolutivo)

**Decisión:** Un proyecto nuevo cada mes, todos en el universo Nexus, técnicamente independientes.

**Razón:** El proyecto anual evolutivo tiene tres riesgos no aceptables:
1. Acoplamiento técnico — un error de diseño en Mes 1 contamina Mes 6
2. Pérdida de contexto entre chats — la IA no tiene acceso al código anterior
3. Fatiga narrativa — trabajar sobre el mismo proyecto durante 13 meses puede desmotivar

La independencia técnica entre proyectos mensuales elimina los tres riesgos mientras la narrativa compartida de Nexus mantiene la coherencia.

### Inglés desactivado temporalmente del bootcamp

**Decisión:** El bootcamp es en español. El inglés se estudia por separado.

**Razón:** Mezclar el aprendizaje técnico con el aprendizaje del idioma aumenta la carga cognitiva innecesariamente. Cuando Óscar tenga los fundamentos técnicos más sólidos, el inglés se reintegra al bootcamp.

### for...in omitido intencionalmente

**Decisión:** `for...in` no se enseña en la Semana 4 de objetos.

**Razón:** `for...in` itera sobre el prototipo además de las propiedades propias del objeto. Para principiantes que no conocen el prototipo, esto genera comportamiento inesperado y confusión. `Object.keys/entries` con `forEach` es la práctica moderna recomendada y no tiene ese problema.

### this no introducido en la Semana 4

**Decisión:** Los métodos en la Semana 4 no usan `this`.

**Razón:** `this` en JavaScript tiene un comportamiento que depende del contexto de ejecución y que cambia con arrow functions vs function declarations. Introducirlo sin el contexto de clases y prototipos crea confusión más que comprensión. Se introduce formalmente cuando el alumno tenga el contexto necesario.

---

## PARTE 5 — ERRORES DETECTADOS Y REGLAS GENERADAS

Esta sección crece cuando se detecta un error real que el protocolo no capturó.

### Error 1 — Modelo mental incorrecto en reduce

**Qué pasó:** Se explicó que el acumulador "se reemplaza" en cada vuelta.

**Por qué es un error:** El modelo mental de "reemplazar" sugiere que hay una variable especial con ese comportamiento. El modelo mental correcto es que el `return` simplemente define el valor que recibe el siguiente llamado.

**Regla generada:** Al explicar `reduce`, siempre usar la formulación: "lo que retornas en cada vuelta se convierte en el acumulador de la siguiente vuelta". Nunca "el acumulador se reemplaza".

### Error 2 — URL desactualizada en javascript.info

**Qué pasó:** El bootcamp referenciaba `https://javascript.info/variable-scope` que ya no existe. La URL correcta es `https://javascript.info/closure`.

**Regla generada:** Antes de incluir cualquier URL externa en un bootcamp, verificar que existe y que el contenido corresponde a lo esperado.

### Error 3 — Pistas demasiado detalladas en el Proyecto PocketFeed

**Qué pasó:** Las pistas del proyecto final de la Semana 2 revelaban la función completa, reduciendo el valor pedagógico del ejercicio.

**Regla generada:** Las pistas nunca revelan la solución completa. Pista 1 = concepto sin código. Pista 2 = ejemplo mínimo de la herramienta, no la solución al problema específico.

### Error 4 — Ejercicio sin conexión con el proyecto final

**Qué pasó:** El ejercicio de `map` para calcular IVA en la Semana 3 no apareció en el proyecto final StartupMetrics.

**Regla generada:** Antes de finalizar un bootcamp, verificar que cada ejercicio de la semana aparece en el proyecto final o documentar explícitamente por qué no.

---

*Constitución del Bootcamp — Versión 1.0*
*Julio 2026*
*Solo se modifica con evidencia real de mejora significativa*
