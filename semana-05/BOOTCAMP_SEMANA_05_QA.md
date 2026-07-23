# BOOTCAMP SEMANA 05 — REPORTE DE QA
## Documento interno — No es material de estudio

---

## FASE 0 — Delimitación Curricular

**Entra esta semana:**
- Arrow functions: sintaxis completa, return implícito, paréntesis en objetos
- Destructuring de arrays: por posición, saltar elementos, default
- Destructuring de objetos: por nombre, renombrar, default, en parámetros, anidado
- Spread operator en arrays: combinar, copiar, expandir en llamadas a funciones
- Spread operator en objetos: copiar, combinar, sobreescribir propiedades
- Rest parameters: agrupar argumentos variables en array
- Default parameters: valores por defecto, qué los activa (undefined) y qué no (null, 0, "")
- Shorthand properties: `{ nombre }` en vez de `{ nombre: nombre }`
- Módulos ES6: named export, default export, import, re-export con `export * from`

**Queda explícitamente fuera:**
- `this` avanzado con arrow functions (se menciona la diferencia pero no se profundiza)
- Generators (`function*`)
- Symbols
- WeakMap / WeakSet
- Optional chaining `?.` — se verá en TypeScript/React donde tiene más contexto
- Nullish coalescing `??` — ídem
- `Object.assign()` — el spread lo reemplaza en los casos de esta semana
- Clases ES6 — se ven junto con POO en contexto adecuado
- Dynamic imports (`import()`) — se verán en Next.js con lazy loading

**Competencias futuras que dependen de este conocimiento:**
- Arrow functions → event handlers en React, hooks, callbacks de async
- Destructuring → props de React (siempre se desestructuran), respuestas de APIs, useState
- Spread en objetos → actualizar estado sin mutar (Zustand, useState con objetos)
- Spread en arrays → agregar/eliminar elementos de arrays de estado
- Rest parameters → funciones utilitarias y hooks personalizados con argumentos variables
- Default parameters → props opcionales en componentes React
- Módulos → estructura completa de cualquier proyecto Next.js

---

## FASE 1 — Investigación

**Fuentes consultadas:**
- MDN Web Docs — Arrow functions, Destructuring assignment, Spread syntax, Rest parameters, Default parameters, import/export
- javascript.info — capítulos correspondientes de ES6+

**Hallazgos relevantes:**

1. **Arrow functions y `this`**: Confirmado que las arrow functions heredan `this` del contexto léxico, no tienen su propio. Para el nivel de esta semana, la regla práctica "no usar arrow functions como métodos de objeto" es correcta y suficiente sin entrar en la mecánica completa de `this`.

2. **Spread y copia superficial**: Confirmado que spread hace copia superficial (shallow copy). Los objetos anidados comparten referencia. Esto se documenta explícitamente en el material porque es un error común que causa bugs silenciosos.

3. **Default parameters — `null` vs `undefined`**: Confirmado que solo `undefined` (implícito o explícito) activa el valor por defecto. `null`, `0`, `""` y `false` NO activan el default porque son valores válidos, no ausencia de valor. Este punto se enfatiza porque es contraintuitivo y causa bugs frecuentes.

4. **Módulos en Node.js**: Para ejecutar módulos ES6 en Node.js sin bundler, se necesita la extensión `.mjs` o `"type": "module"` en `package.json`. En Next.js esto es transparente. Se menciona en el material con la nota apropiada para no generar confusión.

5. **`export * from`**: Confirmado que re-exporta todos los named exports del módulo fuente, pero NO re-exporta el default export. Si se necesita re-exportar el default, se debe hacer explícitamente. Para el proyecto de esta semana, todos los módulos usan named exports, así que `export * from` funciona correctamente.

6. **Shorthand property names**: `{ nombre }` como shorthand de `{ nombre: nombre }` es ES6 estándar. Se introduce en el material como nota al pasar en el Día 4, no como tema principal, para no sobrecargar la semana.

---

## FASE 4 — Hallazgos de Revisión Técnica

**Correcciones realizadas:**

1. **Arrow function con objeto y return implícito**: Verificado que `() => { nombre: "Oscar" }` retorna `undefined` (JavaScript interpreta `{}` como bloque de código). La solución `() => ({ nombre: "Oscar" })` es correcta. Se documenta con ejemplo claro en la Cheat Sheet y en el Día 1.

2. **Destructuring anidado**: La sintaxis `let { sede: { ciudad } } = empresa` es correcta. Confirmado que `sede` no queda disponible como variable — solo `ciudad`. Se documenta la nota aclaratoria porque es un malentendido común.

3. **`export * from` y default exports**: Verificado que `export * from "./modulo.js"` NO re-exporta el default export del módulo. En el proyecto de esta semana todos los módulos usan named exports, así que no hay problema. Se agrega nota en el material.

4. **Rest parameter y SyntaxError**: Confirmado que poner un parámetro después del rest es SyntaxError. Ejemplo incluido en la Cheat Sheet y en el material del Día 3.

5. **Módulos y extensión en Node.js**: Se agrega nota en el Día 5 explicando que los ejercicios de módulos se validan conceptualmente y se ejecutarán correctamente en el contexto de Next.js desde la Semana 8.

---

## FASE 7 — Hallazgos de Auditoría Adversarial

**Modelos mentales verificados:**

1. **"Las arrow functions son solo función tradicional más corta"** — Casi correcto, pero la diferencia de `this` es real. El material establece la regla práctica correcta (no usar en métodos de objeto) sin entrar en la mecánica completa de `this`, que requeriría contexto de clases. El modelo mental es suficientemente correcto para el nivel actual y no genera problemas hasta que se encuentre con `this` en profundidad. ✅

2. **"Spread copia el array u objeto completamente"** — Riesgo de modelo mental incorrecto. El material explica explícitamente con ejemplo que spread hace copia superficial y que los objetos anidados comparten referencia. ✅

3. **"null activa el default parameter"** — Riesgo de modelo mental incorrecto, muy frecuente. El material tiene una tabla explícita con ejemplos de qué activa y qué no activa el default. ✅

4. **"Los módulos se ejecutan igual que scripts normales en Node.js"** — Posible confusión al ejecutar en Node.js puro. Se agrega nota aclaratoria en el Día 5. ✅

5. **"export default y named export se importan igual"** — Error muy frecuente. La Cheat Sheet tiene una tabla comparativa y el material del Día 5 tiene ejemplos explícitos de los dos patrones incorrectos más comunes. ✅

6. **Punto potencialmente problemático detectado**: El intercambio de variables `[x, y] = [y, x]` usa un punto y coma al inicio `;[x, y] = [y, x]`. Esto es necesario en código sin punto y coma automático (ASI) porque `[x, y]` al inicio de línea puede interpretarse como acceso a propiedad de la expresión anterior. En el bootcamp se usan puntos y coma, así que no es un problema. Se incluye el ejemplo sin el punto y coma defensivo para no agregar complejidad innecesaria. ✅

---

## FASE 8 — Checklist de Calidad

```
✅ Afirmaciones técnicas contrastadas con MDN y javascript.info
✅ Sin contradicciones internas
✅ Toda la sintaxis revisada y verificada
✅ Todos los ejemplos son ejecutables en su contexto
✅ Sin malas prácticas (arrow functions en métodos de objeto marcadas como ❌)
✅ Terminología consistente con semanas anteriores
✅ Progresión pedagógica lógica (arrow → destructuring → spread → default → módulos)
✅ Sin conceptos sin contexto (this, generators, etc. explícitamente fuera del alcance)
✅ Explicaciones suficientes para el nivel actual de Óscar (domina objetos y arrays)
✅ Coherencia con el roadmap (módulos preparan para estructura de Next.js)
✅ Carga cognitiva adecuada (5 conceptos en 5 días, cada uno construye sobre el anterior)
✅ Recomendaciones alineadas con industria 2026 (arrow functions y módulos son estándar)
✅ Modelos mentales correctos y transferibles (verificados en Fase 7)
✅ Principio de Mínima Suficiencia respetado (this avanzado, generators, etc. excluidos)
```

---

*QA completado — Semana 05 lista para entrega*
*Julio 2026*
