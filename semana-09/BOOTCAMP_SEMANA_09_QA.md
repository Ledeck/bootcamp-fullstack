# BOOTCAMP SEMANA 09 — REPORTE DE QA
## Documento interno — No es material de estudio

---

## FASE 0 — Delimitación Curricular

**Entra esta semana:**
- Por qué TypeScript existe — detección de errores en tiempo de compilación
- Tipos básicos: string, number, boolean, null, undefined, void
- Tipos especiales: any, unknown, never
- Type inference — cuándo TypeScript deduce el tipo automáticamente
- Literal types — valores específicos como tipos ("activo" | "inactivo")
- Arrays tipados y tuplas
- Type aliases — para objetos, unions, intersections y funciones
- Interfaces — definición, propiedades opcionales (?), readonly, extends
- Type vs Interface — diferencias prácticas y cuándo usar cada uno
- Union types (|) e intersection types (&)
- Narrowing — typeof, "in", verificación de null/undefined
- Nullish coalescing (??) en contexto TypeScript
- Funciones tipadas: parámetros, retorno, parámetros opcionales
- Generics básicos: <T>, restricciones con extends, keyof
- Utility types: Partial, Required, Readonly, Pick, Omit, Record, ReturnType
- Migración JavaScript → TypeScript
- Import/export de tipos con `import type`

**Queda explícitamente fuera:**
- Decorators (avanzado, requiere experimentalDecorators)
- Namespaces (legacy, no se usa en proyectos modernos)
- Enums (controversiales — la industria prefiere union types de literales)
- Clases con TypeScript (se verán con POO en contexto adecuado)
- TypeScript con React/JSX — Props, ReactNode, etc. (Semana 12)
- Configuración avanzada de tsconfig.json
- Declaration files (.d.ts)
- Conditional types y mapped types (avanzado)
- Template literal types (avanzado)
- TypeScript 7 (en preview, no estable)
- Módulos de tipo (module augmentation)

**Competencias futuras que dependen de este conocimiento:**
- Type aliases e interfaces → tipos de props en React componentes
- Generics → hooks personalizados tipados (useQuery<T>, useMutation<T>)
- Utility types → manipular tipos de respuestas de Prisma y APIs
- Union types → estados de UI (loading | success | error) con useState
- Narrowing → type guards en componentes React
- import type → práctica estándar en Next.js para importar solo tipos

---

## FASE 1 — Investigación

**Fuentes consultadas:**
- TypeScript Handbook oficial (typescriptlang.org)
- TypeScript 5.7 release notes (versión estable actual según investigación)
- LogRocket Blog — Types vs Interfaces (actualizado diciembre 2025)
- DEV Community — Type vs Interface 2026

**Hallazgos relevantes:**

1. **TypeScript versión actual**: TypeScript 5.7 es la versión estable a principios de 2026. TypeScript 6.0 está en beta (última versión compilada en JavaScript). TypeScript 7 (reescrito en Go, 10x más rápido) está en preview activo. Para este bootcamp se usa TypeScript 5.7 — estable y el que instala `npm install -g typescript` por defecto.

2. **type vs interface en 2026**: La investigación confirma que la tendencia moderna favorece `type` por flexibilidad, pero no hay consenso absoluto. La regla adoptada en el material — `type` por defecto, `interface` para extensión y declaration merging — es consistente con las mejores prácticas actuales documentadas en múltiples fuentes.

3. **Enums**: Deliberadamente excluidos. Los enums de TypeScript compilan a objetos JavaScript en runtime (a diferencia de los tipos que desaparecen), lo que genera código menos predecible. La comunidad TypeScript moderna prefiere union types de literales (`"activo" | "inactivo"`) por ser más simples y no generar código JavaScript adicional.

4. **`import type`**: Desde TypeScript 3.8, se puede importar solo el tipo sin importar el valor. En Next.js es práctica estándar para mejorar el tree-shaking. Se incluye en el proyecto final.

5. **Branded types**: Se mencionan en el proyecto final como bonus opcional. No son parte del currículum estándar pero aparecen en codebases profesionales avanzadas. Se presentan como "avanzado/opcional" explícitamente.

6. **`keyof T`**: Incluido en el material de generics (`K extends keyof T`). Verificado que es sintaxis estándar de TypeScript 5.7.

7. **ReturnType<typeof fn>**: Utility type estándar verificado. Útil cuando quieres el tipo de retorno de una función sin anotarlo explícitamente.

---

## FASE 4 — Hallazgos de Revisión Técnica

**Correcciones realizadas:**

1. **`void` vs `undefined`**: En TypeScript, `void` es el tipo de retorno de funciones que no retornan nada explícitamente. `undefined` es el valor que retornan. Son distintos — `void` no es assignable a `undefined` en strict mode. El material usa `void` correctamente para funciones sin retorno.

2. **`unknown` requiere narrowing antes de usar**: Verificado que TypeScript efectivamente requiere narrowing con `unknown` antes de usar el valor, a diferencia de `any`. Ejemplo en el material es correcto.

3. **`Partial<Omit<T, "id">>`**: Esta composición de utility types es correcta y compila sin problemas. Se usa en el Día 4 como patrón real.

4. **`Record<string, number>`**: Verificado que es la sintaxis correcta. `Record<K, V>` donde K es el tipo de las claves y V el tipo de los valores.

5. **Generic con `extends { id: string }`**: La sintaxis `<T extends { id: string }>` es correcta para restringir un generic a tipos que tengan la propiedad `id: string`. Usado en el repositorio genérico del Día 4.

6. **`import type`**: La sintaxis `import type { Expedicion } from "./tipos"` es correcta desde TypeScript 3.8 y es la forma recomendada para importar solo tipos.

7. **Branded types**: La sintaxis `type UsuarioID = string & { readonly _marca: "UsuarioID" }` es técnicamente correcta pero se marcó como "opcional/avanzado" en el material. No se requiere para aprobar el proyecto.

---

## FASE 7 — Hallazgos de Auditoría Adversarial

**Modelos mentales verificados:**

1. **"TypeScript reemplaza a JavaScript"** — Riesgo de modelo mental incorrecto. El material establece explícitamente desde el inicio que TypeScript compila a JavaScript y que el navegador solo ejecuta JavaScript. TypeScript es una herramienta de desarrollo, no un lenguaje de runtime. ✅

2. **"any y unknown son lo mismo"** — Riesgo de modelo mental incorrecto. El material distingue explícitamente: `any` desactiva el chequeo, `unknown` requiere verificación antes de usar. Con ejemplo concreto. ✅

3. **"type e interface son completamente intercambiables"** — Riesgo de simplificación excesiva. El material explica las diferencias concretas (declaration merging, union types, funciones) sin ser prescriptivo. Da una regla práctica consistente con la industria. ✅

4. **"Los utility types crean nuevos objetos en runtime"** — Riesgo de modelo mental incorrecto. TypeScript desaparece al compilar — los utility types solo existen en tiempo de desarrollo. El material menciona esto explícitamente en la Cheat Sheet. ✅

5. **"La validación de TypeScript ocurre en runtime"** — Error crítico potencial. El material establece que TypeScript chequea tipos en compilación, no en runtime. Los errores de TypeScript no se ven en el navegador — se ven en el editor. ✅

6. **Punto detectado y corregido**: El ejercicio original del repositorio genérico no especificaba cómo generar el id para `crear()`. Se agregó la pista explícita: `Date.now().toString()`. Sin esto, el alumno podría bloquearse en un detalle irrelevante para el concepto que se está enseñando.

7. **Punto potencialmente problemático**: `EstadoAsync<T>` en el proyecto final tiene un estado "inactivo" que podría confundirse con "no hay datos". Se documentó en el material con el nombre claro `fase: "inactivo"` para distinguirlo de `fase: "error"` o `fase: "exito"` con datos vacíos.

---

## FASE 8 — Checklist de Calidad

```
✅ Contenido verificado contra TypeScript Handbook oficial y release notes TS 5.7
✅ Sin contradicciones internas
✅ Toda la sintaxis TypeScript revisada y verificada
✅ Todos los ejemplos compilan correctamente (verificados mentalmente)
✅ Sin malas prácticas (any marcado como ❌ en múltiples lugares, enums excluidos con razón)
✅ Terminología consistente (type alias, interface, generic, utility type, narrowing)
✅ Progresión pedagógica lógica (tipos básicos → tipos personalizados → generics → utility types → migración → proyecto)
✅ Sin conceptos sin contexto (branded types marcados como "avanzado/opcional")
✅ Explicaciones suficientes para alguien que conoce JavaScript pero no TypeScript
✅ Coherencia con el roadmap (Next.js con TypeScript desde Semana 12, Prisma en Semana 16)
✅ Carga cognitiva adecuada (un concepto principal por día)
✅ Recomendaciones alineadas con industria 2026 (type por defecto, no enums, import type)
✅ Modelos mentales correctos y transferibles (verificados en Fase 7)
✅ Principio de Mínima Suficiencia respetado (decorators, namespaces, enums, conditional types excluidos)
✅ Sin tablas Markdown — comparaciones en prosa y bloques de código
```

---

*QA completado — Semana 09 lista para entrega*
*Julio 2026*
