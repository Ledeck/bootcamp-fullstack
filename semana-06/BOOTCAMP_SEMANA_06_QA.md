# BOOTCAMP SEMANA 06 — REPORTE DE QA
## Documento interno — No es material de estudio

---

## FASE 0 — Delimitación Curricular

**Entra esta semana:**
- El modelo de ejecución de JavaScript: single-threaded, Event Loop, código síncrono vs asíncrono
- setTimeout y setInterval (como introducción al modelo asíncrono)
- Callbacks: concepto, uso, problema del callback hell
- Promises: new Promise, resolve, reject, .then(), .catch(), .finally()
- Promise.all: ejecución en paralelo, comportamiento ante errores
- async/await: sintaxis, await en funciones async, manejo con try/catch/finally
- Fetch API: GET, POST, verificación de respuesta.ok, dos await necesarios
- Manejo de errores: diferencia entre error de red y error HTTP
- Patrones básicos: función auxiliar fetchJSON, retry simple, estado de carga

**Queda explícitamente fuera:**
- XMLHttpRequest (obsoleto, no se enseña)
- axios (librería externa — se verá en contexto de proyecto cuando corresponda)
- Promise.race, Promise.allSettled, Promise.any (demasiado específicos para esta semana)
  Nota: Promise.race SÍ se usa en el proyecto para implementar timeout — se introduce
  en ese contexto específico sin convertirlo en tema de estudio separado
- AbortController (se menciona que existe para fetch, pero no se enseña)
- Streams (fuera del alcance)
- WebSockets (fuera del alcance)
- Web Workers (fuera del alcance)
- CORS en profundidad (se menciona que existe, no se profundiza)

**Competencias futuras que dependen de este conocimiento:**
- Fetch API y async/await → Server Components y Server Actions en Next.js App Router
- Promise.all → cargar múltiples recursos en paralelo en Next.js
- Manejo de errores → error.tsx (Error Boundary) en Next.js
- Patrones de estado de carga → useState + useEffect con datos asíncronos (Mes 4-5)
- fetchJSON helper → se convierte en la función base de cualquier cliente de API

---

## FASE 1 — Investigación

**Fuentes consultadas:**
- MDN Web Docs — Fetch API, Promise, async function, await, Event Loop
- javascript.info — Promises, async/await, Fetch

**Hallazgos relevantes:**

1. **Event Loop y microtask queue**: El material simplifica intencionalmente el Event Loop omitiendo la diferencia entre macrotask queue (setTimeout) y microtask queue (Promise callbacks). Para el nivel de esta semana, la simplificación es correcta y suficiente. La distinción detallada se introduce cuando sea relevante para debugging avanzado.

2. **fetch y CORS**: Las peticiones a JSONPlaceholder no tienen problemas de CORS porque están configuradas para permitirlo. En proyectos reales, CORS puede causar errores que parecen errores de red. Se agrega una nota mínima en el material.

3. **fetch en Node.js**: fetch es nativo en Node.js desde la versión 18. El material especifica "Node.js 18+" para los ejercicios que usan fetch. Versiones anteriores requieren polyfill o la librería node-fetch.

4. **Promise.race para timeout**: El uso de Promise.race en el proyecto final es correcto para implementar un timeout simple. Se introduce en ese contexto específico (como herramienta para resolver un problema concreto) sin convertirlo en tema formal de la semana.

5. **respuesta.ok vs respuesta.status**: Confirmado que `respuesta.ok` es `true` para status codes 200-299 y `false` para cualquier otro. Es una propiedad booleana, no un método.

6. **JSON.stringify en POST**: Confirmado que el body de un POST debe ser string, por eso se usa `JSON.stringify()`. El header `Content-Type: application/json` le dice al servidor cómo interpretar ese string.

7. **Map para caché**: El uso de Map en el proyecto es correcto y más apropiado que un objeto plano para este caso (claves dinámicas, operaciones de has/get/set/delete). Map es ES6 estándar.

---

## FASE 4 — Hallazgos de Revisión Técnica

**Correcciones realizadas:**

1. **fetch no lanza error en HTTP 404/500**: Verificado y enfatizado en múltiples lugares del material. Es el error más frecuente al trabajar con fetch y el más silencioso.

2. **Dos await con fetch**: La explicación de por qué son necesarios dos await es técnicamente correcta — el primer await espera los headers, el segundo espera el cuerpo. Confirmado con MDN.

3. **finally siempre se ejecuta**: Confirmado que `finally` se ejecuta tanto si el try tuvo éxito como si el catch capturó un error. También se ejecuta aunque el try o catch tengan un return.

4. **Promise.all con destructuring**: El ejemplo `const [a, b, c] = await Promise.all([...])` es correcto — Promise.all resuelve con un array en el mismo orden que las Promises de entrada, independientemente del orden en que se completen.

5. **Timeout con Promise.race**: El patrón del proyecto final es correcto:
   ```javascript
   const timeout = new Promise((_, reject) =>
       setTimeout(() => reject(new Error("Timeout")), 5000)
   )
   return Promise.race([fetch(url), timeout])
   ```
   Se usa `_` como convención para el parámetro `resolve` que no se usa.

---

## FASE 7 — Hallazgos de Auditoría Adversarial

**Modelos mentales verificados:**

1. **"await bloquea todo el programa"** — Riesgo de modelo mental incorrecto. El material explica explícitamente que await "pausa la función async pero no bloquea el hilo principal". El Día 1 demuestra esto con ejemplos de setTimeout. ✅

2. **"fetch lanza error en 404 o 500"** — El error más peligroso de esta semana. Se menciona en la Cheat Sheet, en la sección de Fetch del Día 4, y en el manejo de errores del Día 5. También está en los errores frecuentes de la Cheat Sheet. ✅

3. **"async/await reemplaza a las Promises"** — Riesgo de modelo mental incorrecto. El material establece explícitamente que async/await es "azúcar sobre Promises" y que la función async siempre retorna una Promise. ✅

4. **"El segundo await en fetch lee datos adicionales"** — Posible confusión sobre para qué sirve el segundo await. El material explica que es porque el cuerpo puede llegar en partes (chunks) y `.json()` espera que llegue completo. ✅

5. **"Promise.all es más rápido siempre"** — Riesgo de modelo mental incorrecto. El material enfatiza que Promise.all es para operaciones INDEPENDIENTES. Si las operaciones dependen una de otra, await secuencial es obligatorio, no opcional. ✅

6. **Punto detectado y corregido**: En el patrón de retry, el primer intento fallido esperaba antes de reintentar incluso en el intento final (innecesario). Se corrigió con `if (intento < maxReintentos)` antes del setTimeout de espera.

---

## FASE 8 — Checklist de Calidad

```
✅ Afirmaciones técnicas contrastadas con MDN y javascript.info
✅ Sin contradicciones internas
✅ Toda la sintaxis revisada y verificada
✅ Todos los ejemplos son ejecutables en su contexto
✅ Sin malas prácticas (XMLHttpRequest no mencionado, fetch verificado correctamente)
✅ Terminología consistente (Promise, fulfill, reject, async, await)
✅ Progresión pedagógica lógica (síncrono → callbacks → Promises → async/await → fetch)
✅ Sin conceptos sin contexto (CORS mencionado como existente, no profundizado)
✅ Explicaciones suficientes para el nivel actual de Óscar
✅ Coherencia con el roadmap (fetch prepara para Server Components de Next.js)
✅ Carga cognitiva adecuada (un paradigma por día, cada uno construye sobre el anterior)
✅ Recomendaciones alineadas con industria 2026 (async/await es el estándar)
✅ Modelos mentales correctos y transferibles (verificados en Fase 7)
✅ Principio de Mínima Suficiencia respetado (Promise.race, AbortController, Streams excluidos)
```

---

*QA completado — Semana 06 lista para entrega*
*Julio 2026*
