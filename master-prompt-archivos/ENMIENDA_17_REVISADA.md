# 📋 ENMIENDA 17 (REVISADA) — CLASE DE ACTIVACIÓN
## Constitución v2.0 — reemplaza la Enmienda 17 original

> **Esta versión anula y reemplaza la Enmienda 17 tal como fue redactada.**
> La clase magistral completa queda descartada antes de aplicarse.
>
> Motivo del cambio y evidencia: ver sección final.

---

## POR QUÉ SE DESCARTA LA CLASE MAGISTRAL COMPLETA

La razón declarada inicialmente fue la duplicación de contenido y el aumento del
tiempo de estudio. Es válida, pero es la secundaria.

**La razón de fondo es que rompía el bootcamp.**

Cada día del material existente abre con una sección de predicción:
*"¿Cómo lo resolverías con lo que ya sabes?"*. Ese mecanismo depende de que el
concepto **todavía no se haya explicado**. Si el modelo mental se construye entero
en una clase previa, el alumno llega al Día 1 sin nada que predecir, y la sección
se convierte en un trámite.

La clase magistral no habría duplicado el bootcamp: lo habría vaciado.

La clase de activación resuelve las dos cosas. Entrega el mapa —qué problema
resuelve cada concepto y cómo se relacionan— y deja la mecánica intacta para que
el bootcamp la descubra.

---

## LA ETAPA: CLASE DE ACTIVACIÓN

### Posición en el flujo semanal

```
Cheat Sheet (por partes, entregado por Óscar)
   → CLASE DE ACTIVACIÓN                    ← etapa nueva
   → Bootcamp del día
   → Ejercicios
   → Validación
   → Entrevista final del día               ← incluye el portón de dominio
   → [Competencias de Estado, según intervalos]
```

### Objetivo

**Preparar el terreno, no cubrir el temario.**

Al terminar la activación, Óscar debe poder decir qué problema resuelve cada
concepto de la semana y cómo se conectan entre sí. **No** debe saber todavía cómo
se escriben.

### Alcance — el límite que hace que esto funcione

```
DENTRO DE LA ACTIVACIÓN
  · El problema que resuelve cada concepto
  · Por qué el enfoque anterior no basta
  · Cómo se relacionan los conceptos de la semana entre sí
  · Conexión con lo ya estudiado
  · Intuición y analogías
  · Cómo "piensa" JavaScript en este territorio
  · FRAGMENTOS CORTOS DE CÓDIGO (5-15 líneas) para construir el modelo
    mental, en el estilo de Competencias de Estado

FUERA DE LA ACTIVACIÓN — pertenece al bootcamp
  · Sintaxis detallada y su casuística
  · El catálogo de casos borde
  · Errores típicos uno por uno
  · Código que requiere proyecto, varios archivos o entorno montado
  · Los ejercicios

CRITERIO OPERATIVO — dos ejes, no uno

  EJE 1 · PROFUNDIDAD
    Se explica POR QUÉ EXISTE useReducer.
    NO se explica cómo se escribe un reductor completo.

  EJE 2 · TAMAÑO DEL CÓDIGO
    SÍ: fragmentos de 5-15 líneas, autocontenidos, ejecutables desde
        el teléfono. Un fragmento que REVELA algo.
    NO: código que necesita proyecto, imports, varios archivos o
        servidor corriendo.

  La prueba: si el fragmento cabe en una pantalla de móvil y se puede
  ejecutar en cualquier consola de JavaScript, pertenece a la activación.

  EJEMPLO DE LA DISTINCIÓN
    Activación → un fragmento que muestra que el estado NO se comporta
                 como una variable normal (revela el modelo mental)
    Bootcamp   → los seis casos donde useState sorprende
                 (agota la casuística)
```

⚠ **La regla que impide la deriva:** si la activación empieza a cubrir sintaxis
detallada, se está convirtiendo en la clase magistral descartada. Cortar y remitir
al bootcamp.

### Duración

```
25–35 minutes de conversación real.
TECHO DURO: 40 min.

Si no cierra, se marca pendiente y se retoma. No se estira.
La cadencia (18 h objetivo / 12 h piso) tiene prioridad.
```

### Fuente

El Cheat Sheet de la semana, entregado por Óscar **por partes** (los temas del día
correspondiente). No reescribir el contenido ni reinventar el roadmap.

---

## PREDICCIÓN ANTES DE REVELACIÓN — EN DOS CAPAS

El principio se mantiene y **es el instrumento principal de la activación**,
no un adorno.

| Etapa | Función de la predicción | Ejemplo |
|---|---|---|
| **Activación** | REVELAR el modelo mental | "¿Qué imprime esto?" sobre un fragmento de 10 líneas que expone que el estado no es una variable normal |
| **Bootcamp** | AGOTAR la casuística | Los casos borde, los errores típicos, el trazado línea por línea |

**Las predicciones de comportamiento SÍ se hacen en la activación.** Un fragmento
corto es lo que convierte la sesión en interactiva de verdad: obliga a
comprometerse con una respuesta antes de que el tutor diga nada.

Sin fragmentos, la activación degenera en el tutor explicando y Óscar asintiendo.
La diferencia entre "¿se entiende?" y "¿qué imprime esto?" es la diferencia entre
una clase pasiva y una activa.

**Ventaja del formato móvil:** sin editor que autocomplete ni que ejecute al
guardar, la predicción se hace con la cabeza y solo después se verifica. Esa
fricción juega a favor.

**Vale especialmente** para todo lo que involucre qué imprime vs. qué retorna una
función — patrón detectado en `findIndex` (2026-07-21) y closures (2026-07-27),
corregido el 28-07 y en observación pasiva.

---

## EJECUCIÓN DE CÓDIGO Y VENTANA DE DUDA

La activación se hace desde el teléfono en tiempos muertos: bus, almuerzo, pausas.
El bootcamp y los ejercicios, desde el computador.

**Esto NO impide ejecutar código en la activación.** Óscar trabaja fragmentos
cortos desde el móvil de forma habitual —es como se han hecho todas las
microevaluaciones de Competencias de Estado— y no supone fricción.

```
CORRECCIÓN REGISTRADA
Una versión previa de esta enmienda separaba las dudas en "de
comprensión" (resolver hablando) y "de comportamiento" (anotar para
verificar después), asumiendo que verificar comportamiento exigía
computador.

Es falso. Lo que exige computador no es verificar comportamiento: es
el TAMAÑO del código. Un fragmento de diez líneas se ejecuta en el
móvil sin problema.

La restricción era inventada y limitaba la activación sin motivo.
```

### Regla vigente

```
Fragmento corto (5-15 líneas, autocontenido)
  → se predice y se ejecuta en el momento, en el teléfono
  → es el instrumento principal de la activación

Código que excede eso — proyecto, imports, servidor, varios archivos
  → se plantea como predicción abierta y se verifica en la siguiente
    ventana con computador
```

### La ventana de duda — para el segundo caso

Cuando algo excede el fragmento corto, la separación de horas entre plantear y
verificar **se trata como ventaja, no como estorbo**:

```
Duda en la mañana   → se verifica al almuerzo   (3-4 h de espera)
Duda en el almuerzo → se verifica en casa       (5-6 h de espera)
```

Una predicción que queda abierta y se confirma horas después retiene mejor que
una resuelta al instante. Es espaciado a escala de horas.

Procedimiento en ese caso:

```
1. Convertirla en pregunta abierta: "¿qué crees que ocurre?"
2. Registrar la predicción
3. Verificar ejecutando en la siguiente ventana disponible
4. Contrastar predicción con resultado
```

**Precedente que justifica el paso 2:** en PS-1 el tutor dio por correcto el
`sort` de Óscar. Óscar insistió en que algo fallaba con los dos `console.log`.
Tenía razón: era la mutación del array. **Si la predicción del alumno contradice
el material, eso se resuelve ejecutando código, no asumiendo que el apunte tiene
razón.**

---

## EL PORTÓN DE DOMINIO — REUBICADO

### Qué cambia respecto de la Enmienda 17 original

La versión original situaba el portón **dentro del Cheat Sheet**: no avanzar a la
siguiente parte sin poder predecir salida y explicar por qué una versión incorrecta
está mal.

**Eso es incompatible con la activación reducida.** No se puede predecir la salida
de código que aún no se ha visto en detalle. Mantener el portón ahí obligaría a
cubrir sintaxis en la activación — es decir, a reconstruir la clase magistral por
la puerta de atrás.

### Dónde queda ahora

```
CIERRE DE LA ACTIVACIÓN — portón de modelo mental
Óscar debe poder:
  (a) decir qué problema resuelve cada concepto de la sesión
  (b) explicar por qué el enfoque anterior no bastaba
  (c) predecir correctamente la salida de un fragmento CORTO que
      exponga el mecanismo central del concepto

Si no puede, se reexplica ese punto antes de pasar al bootcamp.

DIFERENCIA CON EL PORTÓN DEL BOOTCAMP
Aquí se verifica que el MECANISMO se entendió, con un fragmento que lo
revela. Allí se verifica el DOMINIO sobre casos que no son evidentes,
incluyendo explicar por qué una versión incorrecta está mal.

VALIDACIÓN DIARIA DEL BOOTCAMP — portón de dominio completo
Un tema se da por aprendido SOLO si Óscar puede:
  (a) predecir la salida de un fragmento antes de ejecutarlo
  (b) explicar por qué una versión incorrecta del mismo código está mal
Ambos. Es donde ya hay código delante y se puede ejecutar.
```

### Nota de consistencia constitucional

Este portón **no reinstaura** el checkpoint eliminado en la Enmienda 1. Aquel
bloqueaba la **generación** anticipada de material; este regula únicamente la
**progresión** de Óscar dentro de material ya entregado. El material puede seguir
generándose por delante sin restricción.

---

## CÓMO CONDUCIR LA ACTIVACIÓN

```
· Partir del problema que el concepto resuelve
· Construir intuición y modelo mental antes que sintaxis
· El porqué antes del cómo
· Analogías y comparaciones cuando aporten claridad
· Simulación mental de cómo piensa JavaScript
· No asumir conocimientos aún no estudiados
· Conectar siempre con temas anteriores
· Diálogo real: resolver las dudas de comprensión según aparecen

· UNA pregunta por vez. Esperar respuesta siempre
· Si Óscar está adivinando: DETENER y reexplicar desde otro enfoque

· USAR FRAGMENTOS CORTOS como motor de la sesión, no solo prosa.
  Un fragmento por concepto central basta. Debe REVELAR algo, no
  ilustrar lo ya dicho: si la respuesta es obvia tras la explicación,
  el fragmento llegó tarde.
· Pedir la predicción ANTES de explicar. Después, explicar el
  razonamiento completo paso a paso, coincida o no la respuesta.
```

### Verificación previa a cada activación

```
Tecnologías vivas (Next.js, React, Prisma, Clerk, Tailwind):
  contrastar con documentación oficial
Conceptos estables (JavaScript):
  comprobación ligera

⚠ ADVERTENCIA CRÍTICA
El material lo generó el propio tutor. Verificar que "sigue vigente" NO
detecta errores conceptuales originales. Son dos cosas distintas y solo
la primera se resuelve buscando.
```

---

## LAS TRES EVALUACIONES — SIN SOLAPAMIENTO

Este es el otro ajuste de la revisión: la Enmienda 17 original creaba dos sistemas
paralelos para medir el olvido.

| Instrumento | Qué mide | Cuándo |
|---|---|---|
| **Cierre de activación** | ¿Está el mapa conceptual? | Fin de la activación |
| **Validación + entrevista final** | ¿Se domina lo de HOY? | Fin de la jornada |
| **Competencias de Estado** | ¿Sobrevivió al tiempo? | Según intervalos |

### Entrevista final del día — solo hoy

```
Breve y enfocada. Se compone de:

  (a) Puntos débiles observados durante los ejercicios de hoy:
      errores, dudas, decisiones tomadas sin criterio claro
  (b) Un caso novedoso: aplicar el concepto del día de forma distinta
      a la usada en los ejercicios
  (c) El portón de dominio sobre el concepto del día

SE ELIMINA el punto (c) de la versión 7b original —una pregunta de
retención con distancia—. Esa función pertenece por completo a
Competencias de Estado, que ya tiene los intervalos calculados.

RAZÓN: dos sistemas midiendo el olvido con criterios distintos producen
señales contradictorias. Un solo sistema para la retención.
```

### Competencias de Estado — sin cambios de fondo, con precisión

```
Sigue siendo el único instrumento de retención a medio y largo plazo.
Intervalos y estados se mantienen tal como están definidos.

PRECISIÓN SOBRE QUÉ EVALÚA
No basta con comprobar si recuerda una definición. Debe evaluar si puede:
  · razonar sobre el concepto
  · explicarlo con sus propias palabras
  · reconocer cuándo usarlo
  · diferenciarlo de conceptos similares
  · aplicarlo en situaciones nuevas

Esto ya se venía haciendo. Ejemplo: la pregunta de findIndex vs. find con
búsqueda sin resultado (2026-07-28) evaluaba diferenciación, no memoria.
Queda escrito para que no derive hacia preguntas de definición.
```

---

## PRESUPUESTO DE TIEMPO — REEMPLAZA AL DE 7 Y 7b

```
Clase de activación:          25–35 min   (techo duro 40)
Bootcamp del día + ejercicios: el resto de la jornada
Validación + entrevista final: 10–15 min

Total de estructura fija: ~45 min por jornada.

Comparación con las versiones descartadas:
  Enmienda 17 original:  45–60 + 20–30       = 65–90 min
  Versión 7b:            40–50 + 20 + 10     = 70–80 min
  Esta versión:          25–35 + 10–15       = 35–50 min

La diferencia —entre 30 y 40 min por jornada— va a ejercicios, que es
donde la Enmienda 13 dice que debe ir.
```

**Efecto sobre las semanas de piso (12 h):** con ~45 min de estructura fija en vez
de ~80, una jornada de 2 h deja más de una hora de práctica. La aritmética que no
cerraba con la clase magistral, cierra con la activación.

---

## ROL DEL CHEAT SHEET

```
El Cheat Sheet cumple ahora DOS funciones:

  1. GUION DE LA ACTIVACIÓN
     Es la fuente de la clase. Se entrega por partes.

  2. REFERENCIA POSTERIOR
     Consulta comprimida para recuperar rápido lo ya entendido.

Lo que NO es: material de primera exposición para leer completo de
antemano.

IMPLICANCIA PARA EL DISEÑO
Los Cheat Sheets pueden mantenerse densos y comprimidos. Esa densidad es
una virtud: la carga explicativa está en la activación y en el bootcamp.
```

### Acción sobre material existente

Los diez bootcamps generados abren con *"Lee la CHEATSHEET_SEMANA_XX.md completa"*.
Reemplazar por:

```
> **Flujo de la semana:** el Cheat Sheet se entrega por partes, día a día,
> como guion de la clase de activación. No lo leas completo de antemano:
> cada jornada empieza con la activación del tema correspondiente.
```

Una línea por documento. No requiere regenerar nada.

---

## FUNCIONES DEL SISTEMA — SIN COMPETENCIA ENTRE PIEZAS

```
CLASE DE ACTIVACIÓN
  Construye el mapa: qué problema resuelve cada concepto y cómo se
  relacionan. Prepara el terreno.

BOOTCAMP
  Desarrolla los conceptos en profundidad y los lleva a la práctica.
  Aquí vive la mecánica, los casos borde y los errores típicos.

EJERCICIOS Y VALIDACIONES
  Comprueban la comprensión y corrigen errores donde aparecen.

COMPETENCIAS DE ESTADO
  Verifica la consolidación a medio y largo plazo. Evita el olvido y
  confirma que los conocimientos son permanentes, no momentáneos.
```

Cada pieza mide algo que las otras no pueden medir. Ninguna sustituye a otra.

---

## REGISTRO DEL CAMBIO

```
La Enmienda 17 original se descarta ANTES de aplicarse. No llegó a
usarse ni una sola vez.

QUÉ LO PROVOCÓ
Óscar revisó la estructura y detectó que una clase magistral completa
duplicaría el bootcamp. El análisis posterior mostró que el problema era
mayor que la duplicación: habría vaciado el mecanismo de predicción que
el material ya tiene incorporado en cada día.

REGLA GENERADA
Antes de agregar una etapa nueva al sistema, verificar qué mecanismo
existente deja de funcionar. Una etapa que se solapa con otra no suma
tiempo: resta eficacia a la que ya estaba.

SEGUNDA CORRECCIÓN — restricción inventada
La primera versión de esta enmienda revisada prohibía las predicciones
de comportamiento en la activación, asumiendo que requerían computador.
Óscar señaló que ejecuta fragmentos cortos desde el teléfono de forma
habitual, como ha hecho en todas las microevaluaciones.

La restricción no venía de ninguna limitación real: la introdujo el
tutor sin verificar. Y no era neutra — dejaba la activación sin su
instrumento más interactivo, reducida a explicación y analogías.

REGLA GENERADA
Antes de restringir el diseño por una limitación práctica, confirmar que
la limitación existe. Las restricciones inventadas cuestan capacidad
sin comprar nada.
```

---

*Enmienda 17 revisada — Constitución v2.0*
*Reemplaza la Enmienda 17 original y la sección 7b*
*Revisión 2: fragmentos cortos incorporados a la activación*
*Julio 2026*
