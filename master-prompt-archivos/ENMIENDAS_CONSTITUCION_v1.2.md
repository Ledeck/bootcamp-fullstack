# 📋 ENMIENDAS A LA CONSTITUCIÓN DEL BOOTCAMP
## De la versión 1.1 a la 1.2 — Julio 2026

> Dos cambios de diseño acordados tras la auditoría de las Semanas 05-10.
> Aplicar en `CONSTITUCION_BOOTCAMP.md`, `NEXUS_PROYECTO_NARRATIVA.md` y
> `ESTADO_ROADMAP.md` según se indica en cada bloque.

---

## RESUMEN

| # | Enmienda | Documento | Tipo |
|---|---|---|---|
| 8 | Proyectos Integradores por punto de síntesis | Constitución + Narrativa + Roadmap | Reemplaza |
| 9 | Regla unificada de introducción de sintaxis nueva | Constitución | Unifica y amplía |

---

# ENMIENDA 8 — PROYECTOS INTEGRADORES POR PUNTO DE SÍNTESIS

## Qué se elimina

La regla de que existe **un Proyecto Integrador por mes calendario**, y la
equivalencia implícita `1 mes = 4 semanas` que ataba la narrativa Nexus al
calendario de estudio.

## Qué la reemplaza

```
### Disparador de los Proyectos Integradores

Los Proyectos Integradores NO se disparan por calendario. Se disparan en
PUNTOS DE SÍNTESIS: el momento en que varios conceptos acumulados permiten
construir algo que ninguno permitía por separado.

Los puntos de síntesis se identifican POR ADELANTADO y quedan escritos en
el roadmap. No son fechas, pero tampoco son ambigüedad: cada uno declara
qué semanas lo alimentan y qué capacidad nueva habilita.

CONDICIÓN DE DISPARO
Los prerrequisitos deben estar ENSEÑADOS, nunca "dominados".
El proyecto es el mecanismo que consolida el dominio, no su premio.
Exigir dominio previo eliminaría el esfuerzo productivo que hace que el
proyecto enseñe.

INTERVALO MÁXIMO — 6 semanas
Si en 6 semanas no aparece un punto de síntesis natural, se hace un
proyecto igual. Esta salvaguarda conserva la función forzante que daba el
calendario mensual: el mayor riesgo de un roadmap de 13 meses no es hacer
un proyecto inadecuado, es abandonar.

TECNOLOGÍAS TRANSVERSALES NO GENERAN PUNTO DE SÍNTESIS
Git (Semana 07) es herramienta de trabajo, no capacidad de construcción.
Bajo el esquema mensual habría forzado un proyecto artificial. Las
herramientas transversales se ejercitan DENTRO de los proyectos, no
mediante proyectos propios.
```

## Puntos de síntesis mapeados — Semanas 01 a 10

```
PS-1 · tras la Semana 04 — Motor de datos en JavaScript puro
   Alimentado por: variables, condicionales, bucles, funciones, arrays,
   métodos de orden superior, objetos
   Capacidad nueva: procesar y cruzar estructuras de datos reales
   Proyecto: TerraMater Pro  ✅ ESTADO: en curso, módulos 3.2/3.3/4 pendientes

PS-2 · tras la Semana 06 — Conector de datos externos
   Alimentado por: ES6+ (destructuring, spread, módulos) + asincronía
   (promesas, async/await, fetch, manejo de errores)
   Capacidad nueva: el sistema deja de ser cerrado y consume datos del
   mundo exterior
   Nota: es el primer proyecto donde el fallo es probable y no es culpa
   del alumno (red, API caída, datos incompletos). Diseñar esperando eso.

PS-3 · tras la Semana 09 — Motor tipado
   Alimentado por: TypeScript sobre todo lo anterior
   Capacidad nueva: el sistema se vuelve verificable antes de ejecutarse
   Nota: es refactorización, no construcción desde cero. Se heredan los
   DATOS y las reglas de negocio del PS-1, no el código.

PS-4 · tras la Semana 10 — Dashboard Nexus v1
   Alimentado por: HTML/CSS + TypeScript + React
   Capacidad nueva: la lógica se vuelve interfaz visible y manipulable
   Nota: primera vez que el usuario final puede tocar el sistema.

Siguientes puntos: pendientes de mapear cuando se defina la secuencia
de las Semanas 11 en adelante.
```

## Qué pasa con la narrativa Nexus

```
La narrativa Nexus SE CONSERVA ÍNTEGRA: el arco de 13 meses, los cuatro
grandes módulos del producto y la progresión de complejidad siguen siendo
válidos y útiles.

Lo que cambia es el ANCLAJE. La narrativa deja de estar atada a meses
calendario y pasa a estar atada a puntos de síntesis. En vez de
"Mes 3 → TypeScript", se lee "PS-3 → Motor tipado".

Esto elimina de raíz el desalineamiento detectado: ya no hay dos
calendarios que reconciliar, hay uno solo (el semanal) y una secuencia
narrativa que se engancha a él en puntos declarados.

CONSECUENCIA ACEPTADA: el material puede agotarse antes de las 52 semanas.
Eso deja de ser un problema — el roadmap se mide en competencias
alcanzadas, no en semanas consumidas. El tiempo sobrante se usa para
profundizar, para el proyecto estrella o para la búsqueda laboral.

ACCIÓN SOBRE LAS ANOTACIONES EXISTENTES
Las anotaciones de mes en las Semanas 05-10 ("React (Mes 4-5)",
"Tailwind (Mes 5)", etc.) quedan obsoletas. NO requieren corrección
urgente: son referencias de contexto, no instrucciones. Se corrigen si
se toca el archivo por otro motivo. Al generar material nuevo, se usa
la referencia por punto de síntesis o por semana, nunca por mes.
```

## Evidencia que motivó el cambio

```
El desalineamiento se detectó en cuatro documentos independientes
(Semanas 05, 06, 08 y el pie de la 09), siempre en la misma dirección:
el calendario semanal corría uno a dos meses por delante del mensual.

Causa: la Semana 09 comprime todo TypeScript en una semana, cuando la
narrativa le asignaba un mes completo.

El diagnóstico correcto no era "el calendario está mal calibrado" sino
"el calendario no debía ser el disparador". Un proyecto que llega por
fecha llega cuando toca; uno que llega por síntesis llega cuando tiene
sentido.
```

---

# ENMIENDA 9 — REGLA UNIFICADA DE INTRODUCCIÓN DE SINTAXIS NUEVA

## Qué se unifica

Ya existía una regla que permitía conceptos nuevos en ejercicios desde la
Semana 5, con señalización y fallback. Esa regla **se conserva y se amplía**: se
extiende a los Proyectos Integradores y se le añade el criterio de calibración,
que no estaba escrito.

## Texto a agregar en la Constitución, Parte 3

```
### Introducción de sintaxis nueva en ejercicios y proyectos

Un ejercicio o proyecto PUEDE introducir sintaxis que no se enseñó, si
cumple las TRES condiciones de admisión:

  (a) HERRAMIENTA, NO MODELO MENTAL
      Se usa sin reorganizar nada de lo que el alumno ya sabe.

  (b) SE APOYA EN UN MECANISMO YA DOMINADO
      Lo nuevo es la interfaz, no el funcionamiento.

  (c) EFECTO VISIBLE DE INMEDIATO
      El alumno ve si funciona o no sin depurar a ciegas.

CASO DE REFERENCIA — sort() en TerraMater Pro
  (a) ✔ ordena un array; no cambia cómo se piensa el problema
  (b) ✔ sort() con comparador ES un callback — competencia de la Semana 3
  (c) ✔ el array sale ordenado o no sale ordenado
  Resultado: se adaptó sin fricción y expandió el repertorio.

QUÉ QUEDA FUERA
Cruza el límite lo que falla alguna condición:
  ✗ exige un modelo mental nuevo (this, prototipos, event loop, closures
    como mecanismo)
  ✗ falla en silencio o de forma no obvia
  ✗ requiere entender un sistema, no una llamada
  ✗ encadena varios conceptos nuevos a la vez

FORMATO DE ENTREGA OBLIGATORIO
Toda sintaxis nueva se entrega con:
  1. Definición breve — una o dos líneas
  2. Un ejemplo de uso concreto
  3. SU TRAMPA, si la tiene — no es opcional

El punto 3 es lo que separa esta regla de "soltar un método y ver qué
pasa". Ejemplo con sort():

    sort() ordena un array. Recibe una función comparadora:
    (a, b) => a - b ordena de menor a mayor; (b, a) al revés.

    ⚠ Dos trampas:
    · MUTA el array original — a diferencia de map y filter, no
      devuelve uno nuevo, reordena el que le pasas
    · sin comparador ordena como TEXTO: [10, 9, 100] → [10, 100, 9]

LÍMITES DE FRECUENCIA
  · Máximo UNA sintaxis nueva por ejercicio
  · NUNCA en el mismo ejercicio donde se evalúa una competencia nueva
    (si falla, no se sabe cuál de las dos falló)
  · En el bootcamp semanal: como máximo uno por semana, en los días 3 a 5.
    Nunca en el día 1 — el día 1 establece la base del tema.
  · En los Proyectos Integradores: una o dos, siendo el proyecto el lugar
    natural para ellas.

PRINCIPIO DE CALIBRACIÓN
El objetivo es expandir el repertorio todo lo posible sin cruzar el punto
donde entender lo nuevo cuesta más tiempo que resolver el ejercicio. Ese
punto es el límite, y ante la duda se retrocede: una sintaxis omitida se
enseña la semana siguiente; una que frustra cuesta una sesión entera.
```

## Nota para el material ya generado

```
TerraMater Pro introduce sort() sin la señalización que esta regla exige.
El material NO advierte que sort() muta el array original.

En ese proyecto la mutación no causa daño (filter y reduce no dependen del
orden), pero el alumno debe saberlo. Acción: mencionarlo en la validación
del proyecto, no regenerar el documento.
```

---

# CAMBIOS EN ESTADO_ROADMAP.md

Reemplazar la sección "PROYECTO INTEGRADOR MES 1" por:

```
## PROYECTOS INTEGRADORES — POR PUNTO DE SÍNTESIS

Disparador: punto de síntesis declarado, no calendario mensual.
Intervalo máximo entre proyectos: 6 semanas.

PS-1 · tras Semana 04 · TerraMater Pro · 🔄 EN CURSO
       Pendiente: módulos 3.2, 3.3 y 4 (reporte final)
       Archivo: PROYECTO_INTEGRADOR_MES01.md
       (nombre de archivo heredado del esquema anterior — no renombrar
        para no romper referencias)

PS-2 · tras Semana 06 · Conector de datos externos · ⧗ pendiente de generar
PS-3 · tras Semana 09 · Motor tipado · ⧗ pendiente de generar
PS-4 · tras Semana 10 · Dashboard Nexus v1 · ⧗ pendiente de generar
```

Y en decisiones arquitectónicas, reemplazar la entrada de proyecto mensual por:

```
### Proyectos Integradores
- Disparados por punto de síntesis, no por mes calendario
- Prerrequisitos ENSEÑADOS, nunca "dominados"
- Intervalo máximo de 6 semanas como salvaguarda de ritmo
- Las tecnologías transversales (Git) no generan proyecto propio
- Se heredan datos y reglas de negocio entre proyectos, nunca código
- Cada proyecto introduce al menos una técnica nueva construida con
  primitivas ya conocidas
```

---

# CAMBIOS EN NEXUS_PROYECTO_NARRATIVA.md

```
No se elimina contenido. Se cambia el encabezado de cada sección:

    ANTES:  📍 MES 1 — El Motor de Datos (JavaScript Puro)
    AHORA:  📍 PS-1 — El Motor de Datos (JavaScript Puro)
            Se dispara tras la Semana 04

Y se agrega al inicio del documento:

    > NOTA DE ANCLAJE
    > Esta narrativa ya no se organiza por meses calendario. Cada módulo
    > se engancha a un punto de síntesis del roadmap semanal. El arco
    > narrativo y la progresión de complejidad se conservan íntegros;
    > lo que cambia es CUÁNDO se dispara cada módulo.

Los módulos de la narrativa que todavía no tienen punto de síntesis
asignado (los que hoy figuran como Mes 5 en adelante) se mantienen en
orden, sin número, hasta que se defina la secuencia de las Semanas 11+.
```

---

*Enmiendas a la Constitución del Bootcamp — v1.1 → v1.2*
*Julio 2026*
