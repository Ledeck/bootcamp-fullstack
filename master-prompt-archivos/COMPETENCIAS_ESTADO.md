# COMPETENCIAS_ESTADO.md
## Sistema de Microevaluaciones — Óscar

> Este archivo es para uso interno del tutor (Claude).
> Óscar solo necesita pegarlo al inicio de cada sesión y guardarlo al terminar.
> El tutor lo lee, hace la microevaluación, y devuelve la versión actualizada.

---

## INSTRUCCIONES PARA EL TUTOR (Claude)

Al recibir este archivo:
1. Leer el estado actual de todas las competencias
2. Priorizar en este orden: NECESITA_REFUERZO (si han pasado 3-5 días) → PENDIENTE → EN_PROGRESO (si han pasado 3-5 días) → DOMINADO (si han pasado 14+ días)
3. Hacer UNA sola pregunta sobre la competencia priorizada
4. Evaluar la respuesta
5. Actualizar el estado de esa competencia
6. Devolver el archivo completo actualizado AL FINAL de la sesión cuando Óscar diga "sesión terminada"

Estados posibles:
- PENDIENTE → nunca evaluado en microevaluación
- EN_PROGRESO → evaluado, con errores o respuesta parcial
- NECESITA_REFUERZO → falló 2+ veces consecutivas
- DOMINADO → respondió correctamente A LA PRIMERA, sin errores, sin necesitar explicación adicional. Si necesitó corrección o explicación para comprender, es EN_PROGRESO aunque haya entendido al final.

Reglas de revisión (basadas en espaciado de la práctica — Spacing Effect):
- DOMINADO → volver a evaluar después de 14 días con pregunta de DESAFÍO
- EN_PROGRESO → volver a evaluar después de 3-5 días
- NECESITA_REFUERZO → volver a evaluar después de 3-5 días (NO en la sesión inmediata siguiente)
- PENDIENTE → prioridad alta cuando no haya otros conceptos por revisar según intervalos

Principio: el cerebro consolida mejor con un período de olvido parcial entre sesiones.
No reforzar inmediatamente lo que quedó con dudas — esperar el intervalo indicado.

COMPORTAMIENTO EN MICROEVALUACIONES:
- Correcto → siguiente concepto
- Parcialmente correcto → explicación breve + registrar en archivo para revisar en 3-5 días + siguiente concepto
- Incorrecto → explicación breve + registrar en archivo + siguiente concepto
- NO insistir en la misma sesión

Estilo de preguntas según estado:
- PENDIENTE    → pregunta estándar (definición + ejemplo simple)
- EN_PROGRESO  → pregunta de análisis de código pequeño ("¿qué retorna esto?", "¿por qué este if es innecesario?")
- DOMINADO     → pregunta de desafío con código más complejo para verificar que el dominio es real, no superficial

Formato de actualización:
[ESTADO] nombre — última evaluación: YYYY-MM-DD — nota: observación breve si corresponde

---

## SEMANA 1 — Variables · Tipos · Condicionales · Interacción

[DOMINADO] Variables: let vs const — última evaluación: 2026-07-13
[DOMINADO] Tipos de datos: null vs undefined vs NaN — última evaluación: 2026-07-17
[DOMINADO] Conversión de tipos: Number(), String(), Boolean() — última evaluación: 2026-07-17
[DOMINADO] Operadores de comparación: === vs == — última evaluación: 2026-07-14
[DOMINADO] Condicionales: if/else if/else — última evaluación: 2026-07-20
[DOMINADO] Template literals — última evaluación: 2026-07-20
[DOMINADO] Operadores lógicos: && y || — última evaluación: 2026-07-15
[DOMINADO] Truthy y falsy — última evaluación: 2026-07-17

---

## SEMANA 2 — Bucles · Funciones · Scope

[DOMINADO] Bucle for — última evaluación: 2026-07-21 — nota: estructura correcta a la primera. Olvidó el let — corregido al señalarlo. EN_PROGRESO por el detalle.
[DOMINADO] Bucle while — última evaluación: 2026-07-28 — nota: correcto a la primera. Trazó las tres evaluaciones de la condición con valores exactos y llegó a 7 y 2 por derivación, no por intuición. Comprendió que el bucle para sin agotar el array y que i queda apuntando al elemento no procesado.
[DOMINADO] break y continue — última evaluación: 2026-07-13
[DOMINADO] Operador módulo % — última evaluación: 2026-07-17
[DOMINADO] Funciones: parámetros y return — última evaluación: 2026-07-13
[DOMINADO] Scope global vs local — última evaluación: 2026-07-14
[DOMINADO] Closures básico — última evaluación: 2026-08-03 — nota: trazó las tres llamadas de crearSemaforo correctamente, vuelta por vuelta, separando el valor que acumula del valor que retorna. Corrección del patrón de retorno confirmada: ya no reporta el resultado de la asignación sino la comparación del return. El fallo del 27-07 no reapareció.
[DOMINADO] Funciones anónimas — última evaluación: 2026-08-03 — nota: identificó las cuatro funciones anónimas (filter, map, setTimeout, ordenar) y sus roles. Cuestionó por sí mismo si las de filter/map quedaban guardadas en resultado — la distinción entre guardar el resultado vs guardar la función. Corregido y comprendido. Generalización completa: aparecen en cualquier contexto donde se espera una función.

---

## SEMANA 3 — Arrays · Métodos Esenciales

[PENDIENTE] Arrays: creación y acceso por índice
[PENDIENTE] push, pop, shift, unshift — diferencia y cuándo usar cada uno
[DOMINADO] forEach — última evaluación: 2026-07-14
[DOMINADO] map — última evaluación: 2026-07-14
[DOMINADO] filter — última evaluación: 2026-07-20 — nota: aplicado correctamente en PS-1 (módulos 1.1, 1.4, 2.1, 3.2) con lógica compuesta y comparación de umbral.
[DOMINADO] find — última evaluación: 2026-07-21 — nota: correcto a la primera con objetos. Retorna objeto completo. Confirmado en PS-1: lo usó bien en 2.2 y 3.2, encadenando .cupoMaximo sobre el resultado.
[DOMINADO] findIndex — última evaluación: 2026-07-28 — nota: corregido. Respondió -1, undefined, false con justificación exacta: distinguió que el callback devuelve false en ambos casos pero cada método traduce el "no encontré" a su propio centinela. Aplicó la herramienta de ir al valor de retorno primero.
[DOMINADO] includes — última evaluación: 2026-07-28 — nota: las tres preguntas sobre includes correctas, incluido el caso difícil de NaN (includes lo encuentra aunque NaN === NaN sea false). Confirmó que es case sensitive.
[EN_PROGRESO] indexOf — última evaluación: 2026-07-28 — nota: NUEVA competencia. Creyó que indexOf recibe callback (confundido con findIndex). Recibe un VALOR, igual que includes; la diferencia entre ambos es qué responden (booleano vs posición), no qué reciben. Regla acordada: todo método que empieza con "find" recibe callback (find, findIndex, findLast, findLastIndex); los que no, reciben valor (indexOf, lastIndexOf, includes). Revisar después de 2026-08-05 — sin evaluar esta sesión (sesión corta, priorizó bootcamp).
[DOMINADO] reduce — última evaluación: 2026-07-16 — nota: confirmado en PS-1, incluyendo reduce con acumulador objeto para conteo y para agrupación por clave.
[DOMINADO] reduce con acumulador objeto — última evaluación: 2026-07-18 — nota: en PS-1 resolvió solo el conteo de métodos de pago (2.4) y la agrupación de cupos por expedición (3.1).
[DOMINADO] reduce: valor inicial 0 vs array[0] — última evaluación: 2026-07-16 — nota: ⚠ en PS-1 omitió el valor inicial en una suma (ingresoTotal). Funcionó por tener elementos, pero falla con array vacío. Verificar en la próxima revisión de 14 días.
[EN_PROGRESO] sort: mutación del array original — última evaluación: 2026-07-27 — pendiente de reevaluar — nota: NUEVA competencia, surgida en PS-1. Descubrió por sí mismo que sort() muta el original al notar que dos console.log daban el mismo resultado — insistió pese a que el tutor daba el sort por correcto. Comprendió: sort muta y además devuelve referencia al mismo array, por lo que asignar a otra variable no protege el original. Alternativas cubiertas: [...arr].sort() y toSorted(). Revisar después de 2026-07-31.

---

## SEMANA 4 — Objetos · Propiedades · Métodos

[DOMINADO] Crear objeto y acceder con punto — última evaluación: 2026-07-13
[DOMINADO] Notación de punto vs corchetes — última evaluación: 2026-07-27 — nota: reevaluado en PS-1. Usó acceso por corchetes con variable correctamente en 2.4, 3.1 y 3.2. Al preguntar, explicó bien que con corchetes se evalúa el valor de la variable y con punto se busca la propiedad literal.
[DOMINADO] Modificar, agregar y eliminar propiedades — última evaluación: 2026-07-13
[DOMINADO] Propiedad inexistente — última evaluación: 2026-07-13
[DOMINADO] Operador in — última evaluación: 2026-07-21 — nota: correcto a la primera. Distinguió correctamente existencia de propiedad vs valor undefined.
[DOMINADO] Métodos en objetos — última evaluación: 2026-07-18
[PENDIENTE] Objetos anidados — cómo acceder a propiedades anidadas
[DOMINADO] Object.keys() — última evaluación: 2026-07-27 — nota: confirmado en PS-1 (2.4 y 3.2). Entiende que produce un array de strings recorrible con métodos de array.
[DOMINADO] Object.values() — última evaluación: 2026-07-18 — nota: en PS-1 intentó usarlo en 3.2 y descubrió por qué no servía (descarta la clave necesaria para cruzar datos). Error productivo.
[DOMINADO] Object.entries() — última evaluación: 2026-07-27 — nota: ⚠ en PS-1 lo aplicó sobre un ARRAY en el módulo 1.1, produciendo pares [índice, objeto] y rompiendo el sort en silencio. Causa: seguir el requisito técnico "usar Object.entries o Object.keys" sin verificar que aplicaba. Comprendido tras inspeccionar la salida. Mantiene DOMINADO porque el concepto es correcto; el fallo fue de aplicación.
[DOMINADO] Arrays de objetos con map/filter/reduce — última evaluación: 2026-07-18 — nota: confirmado ampliamente en PS-1.
[EN_PROGRESO] Cruzar dos arrays por ID común — última evaluación: 2026-07-27 — nota: NUEVA competencia, objetivo central de PS-1. Resolvió 2.2, 3.1 y 3.2 usando find por expedicionId. Necesitó dos pistas estructurales en 3.2. Al final comprendió que buscar por identidad es independiente del orden, a diferencia de emparejar por índice. Revisar después de 2026-07-31.

---

## SEMANA 5 — ES6+ Moderno

[DOMINADO] Arrow functions — sintaxis completa, return implícito — última evaluación: 2026-08-01
[DOMINADO] Arrow functions: retorno implícito con objeto — última evaluación: 2026-08-01 — nota: entendió por qué hace falta envolver el objeto en paréntesis
[DOMINADO] Arrow functions: cuándo NO usarlas — métodos de objeto — última evaluación: 2026-08-01
[PENDIENTE] Return implícito con objeto — por qué necesita paréntesis
[EN_PROGRESO] Destructuring de arrays — por posición — última evaluación: 2026-08-01 — nota: la etiqueta engañosa. Escribió `let [verde] = rgb` tomando posición 0. Ver patrón de la etiqueta engañosa en notas. Revisar después de 2026-08-05.
[DOMINADO] Destructuring de objetos — por nombre de clave — última evaluación: 2026-08-01
[DOMINADO] Destructuring: renombrar al extraer — última evaluación: 2026-08-01
[DOMINADO] Destructuring anidado — última evaluación: 2026-08-01
[DOMINADO] Valores por defecto al desestructurar — última evaluación: 2026-08-01 — nota: distinguió que 0 y null NO activan el defecto
[DOMINADO] Destructuring en parámetros de función — última evaluación: 2026-08-01
[PENDIENTE] Destructuring en parámetros de función
[DOMINADO] Spread en arrays — copiar y combinar — última evaluación: 2026-08-03 — nota: correcto. Entendió que sin spread un array se mete como elemento único. En el ejercicio detectó que Math.max se recalculaba 6 veces dentro del filter — lo sacó fuera por iniciativa propia tras verlo
[DOMINADO] Spread en objetos — sobrescribir propiedades — última evaluación: 2026-08-03 — nota: "el último gana" — entendió que el orden de escritura decide, no la semántica
[DOMINADO] Spread: copia superficial — última evaluación: 2026-08-03 — nota: explicó por qué nombre queda protegido y datos.edad no. structuredClone() incorporado como solución correcta
[DOMINADO] Spread en llamadas a funciones — última evaluación: 2026-08-03
[DOMINADO] Rest parameters — última evaluación: 2026-08-03 — nota: distinguió que el ... en parámetros agrupa; en llamadas/literales expande. Confusión inicial resuelta: pensaba pasarle un array, entendió que rest recibe argumentos sueltos y los agrupa él
[PENDIENTE] Spread en objetos — copiar y sobreescribir propiedades
[EN_PROGRESO] Shorthand de propiedades ES6 — última evaluación: 2026-08-03 — nota: NUEVA. Lo descubrió al ver { nombre, tipo, guias } en su propio código. Entiende la regla: cuando clave y variable se llaman igual el : sobra. Prefiere la forma larga por ahora, lo adoptará cuando esté automatizado. Revisar en contexto de React donde se usa constantemente.
[PENDIENTE] Spread: copia superficial vs profunda
[PENDIENTE] Rest parameters — diferencia con spread
[PENDIENTE] Default parameters — qué activa el default (undefined) y qué no (null, 0)
[PENDIENTE] Named export vs default export — diferencia al importar

---

## SEMANA 6 — Programación Asíncrona

[PENDIENTE] Event Loop — por qué JavaScript no se bloquea
[PENDIENTE] Promises: tres estados — pending, fulfilled, rejected
[PENDIENTE] .then() y .catch() — encadenamiento
[PENDIENTE] async/await — relación con Promises
[PENDIENTE] fetch: por qué se necesitan dos await
[PENDIENTE] fetch: por qué NO lanza error en 404 o 500
[PENDIENTE] Promise.all — cuándo usarlo y cuándo no
[PENDIENTE] try/catch en async — qué tipos de errores captura
[PENDIENTE] Error de red vs error HTTP — diferencia en fetch

---

## SEMANA 7 — Git Profesional

[PENDIENTE] Ramas: crear, cambiar, eliminar
[PENDIENTE] Merge fast-forward vs merge commit — diferencia
[PENDIENTE] Resolución de conflictos — pasos exactos
[PENDIENTE] git stash — cuándo usarlo, cómo recuperar
[PENDIENTE] Rebase: regla crítica — cuándo NO hacerlo
[PENDIENTE] Rebase + push: por qué se rechaza y por qué NO hacer git pull
[PENDIENTE] Conventional Commits — formato y tipos principales
[PENDIENTE] Pull Request — qué es y para qué sirve
[PENDIENTE] Flujo profesional completo — orden de pasos

---

## HISTORIAL DE SESIONES

Sesión 1 — 2026-07-13: Sólido en Semanas 1-2. Reduce y filter requieren refuerzo.
Sesión 2 — 2026-07-14: 3 competencias dominadas. Módulo % y NaN EN_PROGRESO.
Sesión 3 — 2026-07-15: filter y && || dominados. Closures EN_PROGRESO.
Sesión 4 — 2026-07-16: reduce DOMINADO. find y filter EN_PROGRESO.
Sesión 5 — 2026-07-17: NaN, módulo %, conversión de tipos, truthy/falsy DOMINADOS.
Actualización 2026-07-18: Días 3-5 Semana 4 completados. Object.keys/values/entries, métodos, arrays de objetos DOMINADOS.
Sesión 6 — 2026-07-20: filter DOMINADO. Template literals y condicionales DOMINADOS. Closures y while EN_PROGRESO.
Sesión 7 — 2026-07-21: find DOMINADO. Operador in DOMINADO. Bucle for evaluado. findIndex e includes EN_PROGRESO. Funciones anónimas mejorando.
Sesión 8 — 2026-07-27: Sesión larga, mayoritariamente de arquitectura del sistema + validación de PS-1 (módulos 1, 2, 3.1 y 3.2). Microevaluación: closures — mecánica correcta, valor de retorno fallado. Dos competencias nuevas registradas (sort/mutación, cruce de arrays por ID). Patrón transversal detectado — ver notas.

Sesión 9 — 2026-07-28/29: Sesión de microevaluaciones (abarcó dos días, sin cierre intermedio). Tres competencias vencidas pasaron a DOMINADO a la primera: findIndex, includes y while. Detectada y corregida una confusión nueva: indexOf vs findIndex. Quedó sin responder la pregunta de funciones anónimas. Proyecto PS-1: Módulo 4 en curso.

Sesión 12 — 2026-08-03: Microevaluaciones: funciones anónimas y closures → DOMINADO. Clase de activación Día 3 (Spread y Rest) + ejercicios 1, 2 y 3 completados y validados. Shorthand de propiedades descubierto de forma autónoma.

---

## PATRÓN TRANSVERSAL DETECTADO — 2026-07-27

**Confusión entre "lo que hace la función" y "lo que retorna la función".**

Dos ocurrencias independientes:
- 2026-07-21, findIndex: respondió "false" en vez de -1
- 2026-07-27, closures: respondió 4 y 8 (resultado de la asignación) en vez de true/false (resultado del return)

Diagnóstico: no es descuido. En ambos casos respondió correctamente a la pregunta
CON SENTIDO ("¿lo encontró?", "¿en cuánto va el contador?") en vez de a la pregunta
MECÁNICA ("¿qué valor sale de esta función?"). Es consecuencia de su forma de
pensar orientada al significado — fortaleza en diseño, debilidad al trazar código.

Dos herramientas acordadas con él:

1. **Leer al revés.** Antes de decir qué imprime algo, localizar el `return` y
   evaluar SOLO esa expresión. Lo anterior es contexto, no respuesta.

2. **Dos familias de métodos de búsqueda** — memorizar la familia, no seis
   retornos sueltos:
   - Booleanos: includes, some, every → true/false
   - Valor + centinela: find → undefined · findIndex, indexOf → -1

**Cómo verificar si prendió:** en próximas microevaluaciones, observar si empieza
señalando la línea del return. Si el primer reflejo pasa a ser "¿qué expresión se
retorna?" en vez de "¿qué está pasando?", el hábito funcionó.

NO tratar como competencia fallada. Es un patrón a vigilar transversalmente.

### SEGUIMIENTO — 2026-07-28: EL HÁBITO PRENDIÓ ✅

En la evaluación de findIndex separó explícitamente el retorno del callback (false)
del retorno del método (-1 / undefined). Es exactamente la distinción que había
fallado el 21 de julio, y la hizo sin ayuda ni pistas.

En el while trazó la condición vuelta por vuelta antes de responder, en lugar de
saltar al resultado.

El patrón se considera CORREGIDO. Mantener observación pasiva: si reaparece en
alguna evaluación futura, reactivar esta sección.

---

## NOTAS DEL TUTOR

- Semana 4 completada y aprobada ✅
- PS-1 (TerraMater Pro): módulos 1, 2 y 3 COMPLETOS y verificados contra las anclas ✅ — pendiente solo el Módulo 4
- Hallazgo del dataset YA COMUNICADO (2026-07-27): llegó solo a que las 8 expediciones tienen reservas confirmadas, por lo que 3.3 devuelve []. El ejercicio no ejercita lo que pretende enseñar. Fallo de diseño que la Fase 7 del QA debió capturar
- Módulo 4 en curso. Dos cosas señaladas y pendientes de corregir: (a) usa cuposPorExpId.length para "Reservas confirmadas", que da undefined porque es un objeto — debe usar reservasConfirmadas.length; (b) falta el TOP EXPEDICIÓN completo (agrupar ingresos por expedición, hallar el máximo, obtener nombre y monto)
- ingresoTotal sigue sin valor inicial en el reduce. Funciona con 9 elementos, falla con array vacío. Única fragilidad que queda en los módulos 1-3
- Pendiente de evaluar: funciones anónimas. Pregunta ya planteada (contar cuántas hay en un bloque con map, closure de ordenarPor y setTimeout) — quedó sin responder
- Material existente: Semanas 05-08 auditadas (Fase 6b), Semanas 09, 10 y 11 generadas
- Semanas 05, 06 y 09: código sin punto y coma e indentación de 4 espacios. Decisión de Óscar: NO corregir, Prettier lo resuelve al guardar
- Semana 07: corregida — agregada la nota de git push --force-with-lease
- Capacidad alta demostrada — deduce correctamente desde primeros principios
- Persiste con las dudas hasta entenderlas: insistió con el sort pese a que el tutor lo daba por correcto, y tenía razón
- Reconoce sus propios errores con humor y sin frustrarse ("confundí findIndex con indexOf 🤦"). No necesita amortiguar la corrección
- Área a reforzar por intervalo vencido: funciones anónimas (sin evaluar desde 2026-07-21)
- Regla de sesión: entregar archivo solo cuando Óscar diga "sesión terminada"
- Regla de espaciado: NO reforzar inmediatamente lo que quedó con dudas

### Para decisión de Óscar

1. **Contradicción en las instrucciones de este archivo.** El punto 2 prioriza
   PENDIENTE por encima de EN_PROGRESO, pero la regla de espaciado dice que
   PENDIENTE es prioridad alta SOLO cuando no hay nada vencido por intervalo. En
   esta sesión se aplicó la segunda. Conviene unificar la redacción.

2. **Faltan las competencias de la Semana 8 (HTML/CSS)** y de las Semanas 09-11,
   cuyo material ya existe. No se agregaron para no llenar el archivo de líneas
   PENDIENTE. Agregarlas cuando se acerque a esas semanas.

---

*Archivo creado: Julio 2026*
*Última sesión: 2026-07-29*
