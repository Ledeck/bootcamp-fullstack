# ESTADO DEL ROADMAP
## Registro vivo del progreso — actualizar al inicio de cada chat nuevo

> Este documento es el diario del proyecto.
> Se actualiza cada vez que se completa una semana o se toma una decisión importante.

---

## PROGRESO ACTUAL

```
Fecha de última actualización: 2026-07-29
Semana actual: 05 (por iniciar) — ES6+ Moderno
Fase: Fase 1 — Fundamentos JavaScript
Hito: MES 1 CERRADO ✅
```

---

## SEMANAS COMPLETADAS

### SEMANA 0 ✅ — Setup del entorno
Cursor, Node.js, Git, GitHub, `.prettierrc`, primer commit.
Incidencia resuelta: política de ejecución de scripts de PowerShell.

### SEMANA 1 ✅ — Variables · Tipos · Condicionales
Formato v1. Proyecto: Kiosco Digital Doite.
Notable: detectó por sí mismo el bug de `+prompt()` con el valor 0.

### SEMANA 2 ✅ — Bucles · Funciones · Scope
Formato v2. Proyectos: Cotizador TerraMater + Analizador PocketFeed.
Notable: cuestionó la imprecisión "find devuelve un booleano" y encontró links rotos.

### SEMANA 3 ✅ — Arrays y métodos de orden superior
Formato v3. Proyecto: Analizador StartupMetrics.
Notable: llegó solo a usar `[0, 0]` como acumulador de `reduce` para contar dos cosas
a la vez. Propuso el sistema de validación interactiva — adoptado.

### SEMANA 4 ✅ — Objetos · Propiedades · Métodos
Formato v4 (primer bootcamp autocontenido con Protocolo QA). Proyecto: NexusHR.

---

## PROYECTOS INTEGRADORES — POR PUNTO DE SÍNTESIS

Disparador: punto de síntesis declarado, no calendario mensual (Enmienda 8).
Intervalo máximo entre proyectos: 6 semanas.

```
PS-1 · tras Semana 04 · TerraMater Pro · ✅ COMPLETADO Y APROBADO 2026-07-29
       Archivo: PROYECTO_INTEGRADOR_MES01.md
       Concepto nuevo: conectar dos arrays por ID común — CONSEGUIDO
       Mini-entrevista de cierre: 4 de 4 correctas

PS-2 · tras Semana 06 · NexusLink · ✅ GENERADO 2026-08-06
       Competencia: NO CONFIAR EN DATOS EXTERNOS
       Saneamiento, validación con motivos, cuarentena, reconciliación.
       Archivo: PROYECTO_INTEGRADOR_PS2.md

PS-3 · tras Semana 09 · Nexus Mirador · ✅ GENERADO 2026-08-06
       Competencia: TIPAR LAS FRONTERAS (red · DOM · usuario)
       Primer proyecto con interfaz visible. API real: Open-Meteo.
       Archivo: PROYECTO_INTEGRADOR_PS3.md

PS-4 · tras Semana 16 · ⧗ pendiente de generar
       Competencia prevista: EL SISTEMA TIENE VARIOS DUEÑOS
       Propiedad del dato, permisos por rol, y concurrencia.
       Cierra un cabo suelto declarado: el Día 4 de la Semana 14 plantea
       dos usuarios reservando el último cupo y deja las transacciones
       fuera de alcance a propósito.

### NOTA — EL INTERVALO DE LA ENMIENDA 8 ES ORIENTATIVO

El "máximo de 6 semanas" entre Proyectos Integradores existe para evitar
periodos largos sin síntesis. NO es una cota exacta.

**Manda el punto de convergencia más redondo, no el calendario.**

Aplicación: PS-4 va tras la Semana 16 —siete semanas después de PS-3— en
vez de tras la 14. La diferencia no es de cantidad sino de naturaleza:
tras la 14 el sistema es completo pero de UN SOLO usuario; tras la 16
tiene varios dueños, y eso habilita una clase de problema que ningún
proyecto anterior podía plantear.
```

### Resultados finales de PS-1

```
Precio promedio            $261.250
Ingresos totales           $6.605.000
Personas confirmadas       24
Método de pago más usado   tarjeta
Con 50%+ de ocupación      1 (Cruce Los Andes, exactamente 50%)
Sin reservas confirmadas   0
TOP expedición             Torres del Paine — $1.800.000
```

Todos verificados contra cálculo independiente.

### Veredicto del experimento — ADOPTADO ✅

El Proyecto Integrador se incorpora formalmente al sistema.

Evaluación de Óscar: *"jugó en el límite de mis conocimientos y al mismo tiempo los
expandió"*. Confirma el criterio de la Enmienda 8: primitivas conocidas, combinación
nueva.

Único reparo: tomó más de las 3-4 horas estimadas. **No se ajusta la estimación
todavía**, porque parte del tiempo se fue en aprendizajes no presupuestados (mutación
de `sort`, `Object.entries` sobre array, mecánica de Node) y en dudar de código
correcto por el defecto del dataset. La próxima medición será más limpia.

### Defecto de diseño detectado en PS-1

El módulo 3.3 pide identificar expediciones sin reservas confirmadas, pero **las 8
tienen al menos una**. El resultado correcto es una lista vacía, y el reporte del
Módulo 4 da por supuesto que hay alguna. El módulo no ejercita lo que pretende enseñar.

Agravante: en 3.2 solo una expedición califica, y está exactamente en el borde del
50%. Un error en el operador (`>` en vez de `>=`) da lista vacía, igual que un
resultado correcto en 3.3. Dos módulos seguidos donde lo correcto parece un fallo.

**Regla generada:** la Fase 7 debe verificar que los datos produzcan resultados no
triviales en cada módulo, y que los casos borde estén cubiertos por más de un dato.

---

## MATERIAL GENERADO

```
Semana 05 — ES6+ Moderno              ✅ auditada (Fase 6b)
Semana 06 — Programación Asíncrona    ✅ auditada (Fase 6b)
Semana 07 — Git Profesional           ✅ auditada + CORREGIDA (--force-with-lease)
Semana 08 — HTML y CSS                ✅ auditada (Fase 6b) — sin hallazgos
Semana 08 — HTML y CSS                ✅ + DÍA 7 AÑADIDO (DOM) 2026-08-06
Semana 09 — TypeScript                ✅ AUDITADA 2026-08-06 · Cheat Sheet creado
                                        · Día 7 añadido (ejecutar vs comprobar)
                                        · setup ts-node reemplazado por node .ts
Semana 10 — React                     ✅ generada con Constitución v1.2
Semana 11 — React avanzado            ✅ generada con Constitución v1.3
Semana 12 — Next.js                   ✅ generada + verificada (Next.js 16)
Semana 13 — Tailwind + shadcn/ui      ✅ generada + @theme inline corregido
Semana 14 — Prisma + PostgreSQL       ✅ generada (Prisma 7)
Semana 15 — Generación de PDF         ⚠ generada · Fase 1 PARCIAL
Semana 16 — Autenticación (Clerk)     ✅ generada + Fase 6c desde el diseño
Semana 17 — ⧗ sin tema. Candidatos: Zod + React Hook Form (recomendado),
             Zustand, Testing, Despliegue en Vercel
```

**Secuencia verificada documento por documento (Fase 0 cerrada):**
ES6+ → Asíncrono → Git → HTML/CSS → TypeScript → React. Sin huecos. Las nueve
dependencias de la Semana 10 están cubiertas por semanas anteriores.

**Defecto de formato conocido:** Semanas 05, 06 y 09 sin punto y coma y con
indentación de 4 espacios. **Decisión de Óscar: NO corregir** — Prettier lo resuelve
al guardar en Cursor. Aparece solo donde el punto y coma es opcional (JS/TS).

---

## CONSTITUCIÓN — VERSIÓN VIGENTE: v1.3

```
v1.0 → base
v1.1 → enmiendas 1-7  (generación anticipada, perecedero/duradero, acta,
                       Fase 6b, Fase 1 con trazabilidad, QA con evidencia, errores 5-7)
v1.2 → enmienda 8     (proyectos por punto de síntesis)
       enmienda 9     (regla de introducción de sintaxis nueva)
v1.3 → enmienda 10    (límite dinámico de sintaxis nueva, por peso y no por conteo)
```

### Decisiones vigentes

```
- La generación anticipada de material es política deliberada, no excepción
- Puerta de generación: ELIMINADA. Puerta de validación: se mantiene
- Contenido perecedero (setup, versiones) aislado y fechado; se regenera al usar
- Los Proyectos Integradores se disparan por punto de síntesis, no por calendario
- Prerrequisitos ENSEÑADOS, nunca "dominados" — el proyecto consolida el dominio
- Se heredan datos y reglas de negocio entre proyectos, nunca código
- Sintaxis nueva permitida según peso (ligera/media/pesada), con su trampa documentada
- Las tecnologías transversales (Git) no generan proyecto propio
```

---

## PENDIENTES ABIERTOS

```
1. Ajustar las referencias a PS-4 en las Semanas 11, 12 y 14. Son
   párrafos, no regeneración. PS-4 como "Dashboard Nexus v1" fue
   ELIMINADO (Enmienda 16) y degradado al proyecto del Día 6 de la S10
2. ✅ HECHO 2026-08-06 — Semana 09 auditada. Ver AUDITORIA_SEMANA_09.md.
   Se creó el Cheat Sheet que NO existía y se añadió un Día 7
3. Aplicar las enmiendas v1.1 a v1.3 a los archivos maestros
4. Definir la secuencia de las Semanas 12 y 13
5. Reconciliar las anotaciones de mes del material antiguo — no urgente:
   son referencias de contexto, se corrigen si se toca el archivo por otro motivo
```

---

## ESTADO DEL REPOSITORIO GITHUB

```
Repositorio: github.com/Ledeck/bootcamp-fullstack
semana-00/  ✅   semana-01/  ✅   semana-02/  ✅
semana-03/  ✅   semana-04/  ✅   proyecto-integrador-ps1/  ✅
```

⚠ Incidencia sin resolver: los cambios no se sincronizan entre la laptop principal
y la Lenovo. Diagnóstico pendiente — verificar rama activa en cada máquina y si el
push llega realmente al remoto.

---

## PERFIL DE APRENDIZAJE

**Fortalezas confirmadas en el Mes 1:**
- Pensamiento de primeros principios — pregunta "de dónde viene esto", no solo "cómo se arregla"
- Persiste con las dudas: insistió con la mutación de `sort` pese a que el tutor lo daba
  por correcto, y tenía razón
- Detecta inconsistencias en el material y en el propio sistema
- Aporta razones que el tutor no mencionó (el caso del id inexistente en 3.3)
- Reconoce sus errores con humor, sin frustrarse — no necesita corrección amortiguada
- Verifica en la práctica antes de dar algo por bueno

**Patrón corregido durante el mes:** confundir lo que hace una función con lo que
retorna. Detectado el 21-07, corregido el 28-07. En observación pasiva.

**Preferencias:** español neutro (no argentino), `function` tradicional mientras
aprende, template literals sobre concatenación, sin pistas que revelen demasiado.

---

## PRÓXIMOS PASOS

```
1. Iniciar Semana 5 — ES6+ Moderno
   → Verificar antes: la semana no tiene bloque de setup, es puramente conceptual
   → Arrow functions, destructuring, spread, módulos

2. Microevaluación pendiente: funciones anónimas (única competencia vencida)

3. Generar PS-2 al terminar la Semana 06 (Conector de datos externos)
```

---

*Estado del Roadmap — actualizado 2026-08-06*
