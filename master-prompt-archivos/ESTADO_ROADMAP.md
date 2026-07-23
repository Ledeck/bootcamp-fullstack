# ESTADO DEL ROADMAP
## Registro vivo del progreso — actualizar al inicio de cada chat nuevo

> Este documento es el diario del proyecto.
> Documenta qué se completó, qué se aprobó, qué observaciones quedaron,
> y qué decisiones se tomaron con su razonamiento.
> Se actualiza cada vez que se completa una semana o se toma una decisión importante.

---

## PROGRESO ACTUAL

```
Fecha de última actualización: Julio 2026
Semana actual: 04 (en curso)
Mes actual: 1 de 13
Fase: Fase 1 — Fundamentos JavaScript
```

---

## SEMANAS COMPLETADAS

### SEMANA 0 ✅
**Tema:** Setup del entorno de desarrollo
**Completada:** Sí
**Aprobada:** Sí

**Qué se configuró:**
- Cursor instalado y configurado
- Node.js instalado
- Git configurado con nombre y email
- GitHub — repositorio `bootcamp-fullstack` creado
- `.prettierrc` configurado (printWidth: 100, semi: true, singleQuote: false, trailingComma: none)
- Primer commit realizado

**Observaciones:** Óscar tuvo el error de ejecución de scripts de PowerShell al usar npm. Se resolvió con `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`.

---

### SEMANA 1 ✅
**Tema:** Variables · Tipos · Condicionales · Interacción
**Formato:** v1 (sin las 4 mejoras pedagógicas — se conserva tal cual)
**Completada:** Sí
**Aprobada:** Sí
**Proyecto:** Kiosco Digital Doite

**Temas dominados:**
- Variables con `let` y `const`
- Tipos de datos: string, number, boolean, null, undefined
- Operadores de comparación (===, !==, >, <)
- Condicionales if/else if/else
- `prompt()`, `alert()`, `console.log()`
- Template literals con backticks
- `Number()` para conversión de tipos
- Bug de `+prompt()` con el número 0 — detectado por Óscar de forma independiente

**Observación notable:** Óscar detectó por sí mismo el bug del `+prompt()` con el valor 0 en javascript.info. Señal temprana de pensamiento analítico de primeros principios.

---

### SEMANA 2 ✅
**Tema:** Bucles · Funciones · Scope
**Formato:** v2 (con las 4 mejoras pedagógicas)
**Completada:** Sí
**Aprobada:** Sí
**Proyectos:** Cotizador TerraMater + Analizador PocketFeed
**Resumen:** RESUMEN_SEMANA_02.md

**Temas dominados:**
- `for`, `while`, `do...while`
- `break` y `continue`
- Operador módulo `%`
- Funciones con parámetros y `return`
- Diferencia entre `console.log` dentro de función vs `return`
- Múltiples `return` dentro de una función
- Scope global vs local
- `.toLowerCase()`, `.length`, `.toLocaleString("es-CL")`
- Validación de casos borde PRIMERO antes de la lógica normal
- `||` para combinar condiciones
- Funciones anónimas y primer contacto con closures (`makeCounter`)
- `texto[i]` para acceder a caracteres de un string
- `.slice()` para recortar strings

**Errores corregidos durante la semana:**
- URL desactualizada: `javascript.info/variable-scope` → `javascript.info/closure`
- Pistas del proyecto PocketFeed demasiado detalladas (se generó la función completa) — corregido en el sistema

**Observación notable:** Óscar cuestionó la imprecisión "find devuelve un booleano" (es `includes` quien hace eso). Cuestionó el diseño de las pistas con argumentos sólidos. Encontró links rotos y buscó la URL correcta.

---

### SEMANA 3 ✅
**Tema:** Arrays · forEach · map · filter · find · findIndex · includes · reduce
**Formato:** v3 (validación diaria interactiva)
**Completada:** Sí
**Aprobada:** Sí
**Proyecto:** Analizador StartupMetrics
**Resumen:** RESUMEN_SEMANA_03.md
**Cheat Sheet:** CHEATSHEET_SEMANA_03.md

**Temas dominados:**
- Arrays: declaración, acceso, `.length`, `push`, `pop`, `shift`, `unshift`
- `for...of` y `forEach` con callback
- Concepto de callback — "función pasada como argumento a otra función"
- `map` — transforma, retorna array nuevo del mismo tamaño, no modifica el original
- `filter` — selecciona, retorna array igual o más pequeño, no modifica el original
- `find` — retorna el primer elemento o `undefined`
- `findIndex` — retorna la posición o `-1`
- `includes` — retorna `true` o `false`, no acepta callbacks
- `reduce` — retorna UN solo valor, el acumulador puede ser número/array/objeto
- Valor inicial de `reduce` depende de la operación (0, `array[0]`, `[]`, `{}`)
- Sin `return` en `map` → `[undefined, undefined...]`
- Todos los métodos son case sensitive
- Adelanto de objetos: acceso con punto, arrays de objetos (usados en StartupMetrics)
- `reduce` con objeto como acumulador para la venta de mayor monto

**Errores detectados y corregidos:**
- Ejercicio de IVA con `map` no apareció en el proyecto final — regla generada: ejercicios sin huérfanos

**Observaciones notables:**
- Llegó solo a la idea de usar `[0, 0]` como acumulador de `reduce` para contar simultáneamente aprobados y reprobados
- Identificó que el ejercicio de IVA no estaba conectado con el proyecto
- Cuestionó el nivel de detalle de las pistas con argumentos sólidos
- Propuso el sistema de validación interactiva (sin checkpoint escrito) — adoptado

---

### SEMANA 4 🔄 EN CURSO
**Tema:** Objetos · Propiedades · Métodos · Arrays de Objetos
**Formato:** v4 (primer bootcamp autocontenido con Protocolo QA)
**Completada:** No
**Aprobada:** No
**Proyecto:** NexusHR

**Archivos generados:**
- CHEATSHEET_SEMANA_04.md ✅
- BOOTCAMP_SEMANA_04.md ✅
- BOOTCAMP_SEMANA_04_QA.md ✅

**Nota:** Óscar ya tiene exposición básica a objetos por el proyecto StartupMetrics de la Semana 3. No tratar como concepto completamente nuevo.

---

## PROYECTO INTEGRADOR MES 1

**Estado:** Generado, pendiente de completar
**Archivo:** PROYECTO_INTEGRADOR_MES01.md
**Tema:** TerraMater Pro — Sistema de Gestión de Expediciones
**Concepto nuevo incluido:** Conectar dos arrays distintos usando un ID común (reservas ↔ expediciones)
**Propósito del experimento:** Verificar si el Proyecto Integrador Mensual aporta valor real antes de adoptarlo formalmente

---

## ESTADO DEL REPOSITORIO GITHUB

```
Repositorio: github.com/Ledeck/bootcamp-fullstack
semana-00/  ✅ setup
semana-01/  ✅ kiosco-doite
semana-02/  ✅ terramater + pocketfeed
semana-03/  ✅ startupmetrics
semana-04/  🔄 en curso
```

---

## ARCHIVOS GENERADOS EN ESTE PROYECTO

```
MASTER_CONTEXT_PROMPT_v4_definitivo.md  → pegar al inicio de cada chat
CONSTITUCION_BOOTCAMP.md               → pegar cuando se genera un bootcamp
NEXUS_PROYECTO_NARRATIVA.md            → pegar cuando se genera un proyecto mensual
ESTADO_ROADMAP.md                      → pegar al inicio de cada chat (este archivo)

CHEATSHEET_SEMANA_01.md  ✅ (incluida en el bootcamp original)
CHEATSHEET_SEMANA_02.md  ✅ (incluida en el bootcamp original)
CHEATSHEET_SEMANA_03.md  ✅
CHEATSHEET_SEMANA_04.md  ✅

BOOTCAMP_SEMANA_01.md    ✅ formato v1
BOOTCAMP_SEMANA_02_v2.md ✅ formato v2
BOOTCAMP_SEMANA_03_v3.md ✅ formato v3
BOOTCAMP_SEMANA_04.md    ✅ formato v4

BOOTCAMP_SEMANA_04_QA.md ✅ primer reporte QA

RESUMEN_SEMANA_02.md     ✅
RESUMEN_SEMANA_03.md     ✅

PROYECTO_INTEGRADOR_MES01.md ✅ pendiente de completar
NEXUS_PROYECTO_NARRATIVA.md  ✅
```

---

## CONFIGURACIÓN DEL EDITOR

```
Editor: Cursor (basado en VS Code)
OS: Windows
.prettierrc configurado:
{
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

**Nota:** Prettier reformatea automáticamente al guardar. Óscar aprendió a identificar cuándo Prettier introduce cambios no deseados (especialmente `[(1,2,3)]` en vez de `[1,2,3]`).

---

## DECISIONES ARQUITECTÓNICAS CONFIRMADAS

### Sistema de bootcamp
- Formato v4 autocontenido — activo desde Semana 04
- Cheat Sheet semanal separada — antes de empezar
- Cheat Sheet mensual — al finalizar cada mes
- Validación diaria interactiva en chat
- Mini-entrevista semanal interactiva en chat
- Archivos separados: bootcamp limpio + QA independiente
- Protocolo QA de 8 fases — activo desde Semana 04

### Proyecto mensual
- Proyecto Integrador Mensual en el universo Nexus
- Técnicamente independiente entre meses
- Narrativa coherente compartida (misma empresa, clientes, dominio)
- Complejidad creciente: Mes 1-4 desde cero → Mes 5-8 features → Mes 9-13 mantenimiento
- Se incorpora formalmente tras evaluar el experimento del Mes 1

### Estilo de código
- `+=` y `++` son estándar profesional aceptado
- `function` tradicional (no arrow functions) hasta la Semana 5 ES6+
- Nombres de variables en español cuando el contexto es español
- `.toLocaleString("es-CL")` para precios
- `===` y `!==` siempre (nunca `==` o `!=`)

### Otros
- Inglés desactivado temporalmente del bootcamp
- `for...in` omitido intencionalmente (itera el prototipo, confunde a principiantes)
- `this` no introducido hasta tener contexto de clases

---

## PERFIL DE APRENDIZAJE DE ÓSCAR

Detectado a lo largo de las sesiones — útil para calibrar el material:

**Fortalezas demostradas:**
- Pensamiento de primeros principios — no acepta explicaciones superficiales
- Detecta inconsistencias en el material (URL rota, imprecisión en find vs includes)
- Identifica cuando los ejercicios no están bien conectados con el proyecto
- Propone mejoras al sistema con argumentos sólidos
- Resuelve problemas con las herramientas que ya tiene antes de pedir nuevas
- Verifica en la práctica — ejecuta el código para confirmar entendimiento
- Capacidad alta y consistente — calibrar ejercicios con ese nivel

**Patrones de aprendizaje:**
- Aprende mejor cuando entiende el "por qué" antes del "cómo"
- Le interesan los casos borde y excepciones
- Prefiere entender profundo que avanzar rápido
- Reconoce conexiones entre conceptos nuevos y lo que ya sabe
- Cuestiona el diseño del bootcamp activamente y con rigor
- Motivación alta cuando ve el propósito práctico del concepto

**Preferencias de estilo:**
- Neutral español (no argentino — sin "vos")
- Código con `function` tradicional mientras aprende
- Template literals sobre concatenación con `+`
- `let variable = variable + 1` sobre `+=` al principio (luego adoptó `+=`)
- Sin pistas que revelen demasiado

---

## PRÓXIMOS PASOS INMEDIATOS

```
1. Óscar completa los días 1-6 de la Semana 4
   → Validación diaria al terminar cada día

2. Óscar completa el proyecto NexusHR
   → Mini-entrevista semanal en chat
   → Generar RESUMEN_SEMANA_04.md

3. Óscar completa el Proyecto Integrador Mes 1 (TerraMater Pro)
   → Evaluar juntos si aporta valor real
   → Decidir si se incorpora formalmente al sistema

4. Iniciar Semana 5 — ES6+ Moderno
   → Arrow functions, destructuring, spread operator
   → Primer bootcamp donde el inglés podría reactivarse (decisión pendiente)
```

---

## NOTAS PARA EL PRÓXIMO CHAT

Al iniciar un chat nuevo, pegar en este orden:
1. `MASTER_CONTEXT_PROMPT_v4_definitivo.md` — contexto completo
2. `ESTADO_ROADMAP.md` — progreso actual (este archivo)
3. Si se va a generar un bootcamp: también `CONSTITUCION_BOOTCAMP.md`
4. Si se va a generar un proyecto mensual: también `NEXUS_PROYECTO_NARRATIVA.md`

---

*Estado del Roadmap — Julio 2026*
*Actualizar cada vez que se complete una semana o se tome una decisión importante*
