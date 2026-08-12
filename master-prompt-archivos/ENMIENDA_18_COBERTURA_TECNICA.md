# 📋 ENMIENDA 18 — COBERTURA TÉCNICA
## Constitución v2.0 → v2.1

> Origen: hallazgo detectado por Óscar en sesión de estudio, 2026-08-05.
> Semana 05, Día 04, Ejercicio 2.

---

## EL FALLO QUE LA PROVOCA

Dos funciones del Ejercicio 2 exigían técnicas que **no aparecían ni en el
Cheat Sheet ni en la clase de activación**:

```
1. formatearDinero → controlar decimales necesita el segundo argumento de
   toLocaleString (minimumFractionDigits / maximumFractionDigits).
   El Cheat Sheet solo mostraba .toLocaleString("es-CL") sin opciones.

2. filtrarExpediciones → neutralizar un criterio opcional con
   !criterio || condicion. Nunca se enseñó.
```

Resultado: dos bloqueos en un mismo ejercicio, ninguno por falta de
comprensión del alumno.

---

## POR QUÉ EL QA NO LO DETECTÓ

La Fase 6 verifica **ejercicios huérfanos**: que cada ejercicio alimente un
proyecto posterior. Es una comprobación *hacia adelante*.

Nunca comprobó la dirección contraria: que cada técnica exigida por un
ejercicio **haya sido enseñada antes**. Ese hueco es estructural, no un
descuido puntual de la Semana 05.

Y hay un agravante que lo hace más probable desde la Enmienda 17: el Cheat
Sheet pasó a ser el guion de la clase de activación. Si una técnica no está
en el Cheat Sheet, **ya no se enseña en ningún momento** — antes al menos
podía aparecer en el cuerpo del bootcamp.

---

## LA ENMIENDA

### Texto a agregar a la Constitución, Fase 6

```
### FASE 6c — COBERTURA TÉCNICA

Verificación en dirección inversa a la de ejercicios huérfanos.

PROCEDIMIENTO
Para cada ejercicio del bootcamp, listar TODAS las técnicas que requiere
para resolverse. Para cada técnica, localizar dónde se enseñó:

  · en el Cheat Sheet de la semana (con ejemplo, no solo mencionada)
  · en el cuerpo del bootcamp de un día anterior
  · en una semana anterior ya validada

Si una técnica no aparece en ninguno de los tres sitios, hay un HUECO.

RESOLUCIÓN DE UN HUECO — dos opciones, en este orden:
  1. Agregar la técnica al Cheat Sheet, con ejemplo y trampa
  2. Si agregarla desborda el alcance de la semana, quitar del ejercicio
     la parte que la exige

NUNCA dejar el hueco confiando en que el alumno lo deduzca o lo busque.
Deducir una técnica no enseñada no es el ejercicio: es fricción.

DISTINCIÓN IMPORTANTE
Esto NO prohíbe que un ejercicio exija COMBINAR técnicas conocidas de
forma nueva. Eso es exactamente lo que debe hacer.
Lo que prohíbe es exigir una técnica que nunca se mostró.

  ✅ Combinar destructuring + default + filter de formas no vistas
  ❌ Exigir minimumFractionDigits sin haberlo enseñado nunca
```

### Segunda parte — ejemplos de entrada y salida

```
### EJEMPLOS DE ENTRADA/SALIDA EN LOS ENUNCIADOS

Todo ejercicio que pida escribir una función DEBE incluir al menos dos
ejemplos de llamada con su resultado esperado.

Mínimo obligatorio:
  · un caso con todos los argumentos
  · un caso con los argumentos opcionales ausentes

RAZÓN
Los proyectos semanales y los Proyectos Integradores ya tienen anclas de
verificación (los números esperados). Los ejercicios diarios no las
tenían, y son justamente donde el alumno trabaja solo.

Un ejemplo de entrada/salida cumple tres funciones a la vez:
  1. Elimina la ambigüedad del enunciado
  2. Da un ancla de verificación — "no dio error" ≠ "está bien"
  3. Revela implícitamente qué técnica hace falta, sin darla resuelta

Este tercer punto es el que habría evitado los dos bloqueos del
2026-08-05: ver "$1.234,57" como salida esperada apunta hacia el control
de decimales sin decir cómo se hace.
```

---

## CORRECCIÓN APLICADA — SEMANA 05

### Cheat Sheet

```
+ Sección "CRITERIOS OPCIONALES — DOS ESTRATEGIAS"
    · Estrategia A: default neutro (Infinity, 0, 1, -Infinity)
    · Estrategia B: !criterio || condicion cuando no hay valor neutro
    · Por qué filtrarExpediciones mezcla las dos — la asimetría explicada
    · Error típico: !criterio falla si 0, "" o false son criterios válidos
      → comparar con undefined en esos casos

+ Sección "toLocaleString CON OPCIONES"
    · minimumFractionDigits y maximumFractionDigits
    · style: "currency" con currency
    · Trampa: RangeError si minimum > maximum
    · Trampa: la moneda decide los decimales, no el locale

+ Cabecera actualizada a la Enmienda 17 (se entrega por partes, no se
  lee completa de antemano)

+ Tres líneas nuevas en el checklist de dominio
```

### Bootcamp — Día 4, Ejercicio 2

```
+ Ejemplos de entrada/salida en las tres funciones
+ Nota en formatearDinero apuntando a la sección del Cheat Sheet
+ Nota en filtrarExpediciones declarando que la asimetría de defaults
  es deliberada, no un descuido del enunciado
+ Nota en generarResumen sobre por qué ventas = [] importa
```

**Nota deliberada:** las notas apuntan a la sección del Cheat Sheet, no dan
la solución. El alumno sabe dónde mirar; sigue teniendo que resolverlo.

---

## APLICACIÓN AL MATERIAL EXISTENTE

La Fase 6c no se ha ejecutado sobre ninguna de las semanas generadas.

```
PRIORIDAD ALTA — semanas que Óscar usará pronto
  Semana 05 (Días 5 y 6)   ← el Día 4 ya corregido
  Semana 06
  Semana 07

PRIORIDAD MEDIA
  Semanas 08 a 11

PRIORIDAD BAJA — hay tiempo, y el bloque perecedero se regenera igual
  Semanas 12 a 15
```

**Recomendación:** ejecutar la Fase 6c de cada semana **justo antes** de
empezarla, no en lote. Coincide con el momento en que hay que regenerar el
bloque perecedero, así que es una sola pasada por semana.

---

## VALOR DEL HALLAZGO

Este es el segundo defecto estructural que Óscar detecta usando el material,
no auditándolo:

```
2026-07-29 → el dataset de PS-1 no ejercitaba el módulo 3.3
             (las 8 expediciones tenían reservas confirmadas)
2026-08-05 → dos técnicas exigidas sin enseñar
```

Los dos son fallos que la auditoría formal no vio porque comprobaba otra
cosa. Ambos aparecieron al intentar resolver el material de verdad.

**Regla de fondo:** ninguna auditoría sustituye el uso. La Fase 6c reduce la
probabilidad de este fallo concreto, pero el mecanismo de detección más
fiable sigue siendo Óscar trabajando y reportando.

---

*Enmienda 18 — Constitución v2.0 → v2.1*
*Origen: hallazgo de Óscar, 2026-08-05*
