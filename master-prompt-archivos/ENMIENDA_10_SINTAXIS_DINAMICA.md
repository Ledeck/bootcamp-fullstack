# 📋 ENMIENDA 10 — LÍMITE DINÁMICO DE SINTAXIS NUEVA
## Constitución v1.2 → v1.3 — Julio 2026

> Reemplaza los "límites de frecuencia" de la Enmienda 9 por un criterio de
> carga, no de conteo.

---

## Qué se elimina

De la Enmienda 9, el bloque `LÍMITES DE FRECUENCIA`, específicamente:

```
· Máximo UNA sintaxis nueva por ejercicio
· En el bootcamp semanal: como máximo uno por semana
· En los Proyectos Integradores: una o dos
```

Esos topes eran arbitrarios. Contar sintaxis no mide lo que importa.

---

## Qué lo reemplaza

```
### Límite de sintaxis nueva — criterio de carga

NO hay tope numérico. La cantidad se calibra según el peso real de lo que
se introduce, no según cuántas cosas son.

CLASIFICACIÓN POR PESO

  LIGERA — se absorbe en segundos, no interrumpe el ejercicio
    Alias de tipo, conversiones, propiedades de solo lectura,
    atributos, sintaxis que solo renombra algo ya conocido.
    Ejemplos: React.ReactNode, Number(), .trim(), htmlFor
    → Varias por semana sin problema. No requieren ejercicio propio;
      basta la referencia en la Cheat Sheet.

  MEDIA — hay que entenderla antes de usarla, pero se entiende de una
    Métodos con comportamiento propio, con o sin efectos secundarios.
    Ejemplos: sort(), Object.entries(), .flat(), structuredClone()
    → Una o dos por semana. Requieren definición, ejemplo y trampa.

  PESADA — cambia cómo se piensa el problema
    Ejemplos: this, prototipos, generadores, Proxy, closures como mecanismo
    → NO se introducen de contrabando. Si hacen falta, se enseñan.

REGLA PRÁCTICA
El límite no es un número: es el punto donde entender lo nuevo cuesta más
tiempo que resolver el ejercicio. Ante la duda, se retrocede — una
sintaxis omitida se enseña la semana siguiente; una que frustra cuesta
una sesión entera.

LO QUE SÍ SE MANTIENE SIN EXCEPCIÓN
  · Toda sintaxis nueva se entrega con definición, ejemplo y SU TRAMPA
    si la tiene (las LIGERAS pueden ir solo en la Cheat Sheet)
  · NUNCA en el mismo ejercicio donde se evalúa una competencia nueva
    — si falla, no se sabe cuál de las dos falló
  · Nunca en el Día 1: ese día establece la base del tema
  · Las tres condiciones de admisión de la Enmienda 9 (herramienta no
    modelo mental, se apoya en mecanismo dominado, efecto visible) siguen
    aplicando a todas las categorías

SEÑAL DE SOBRECARGA
Si en la validación diaria Óscar resuelve bien la competencia del día pero
tropieza con la sintaxis nueva, hubo demasiada o era de peso equivocado.
Se registra y se recalibra la semana siguiente. La validación diaria es el
sensor; no hace falta adivinar por adelantado.
```

---

## Efecto sobre la Semana 10

El hallazgo abierto queda cerrado. `React.ReactNode` y `Number()` son ambas
LIGERAS: un alias de tipo y una conversión. Ninguna tiene comportamiento propio.
Dos en una semana está dentro del criterio, y las trampas documentadas
(`Number("")` da `0`; `ReactElement` rechaza texto plano) se mantienen porque la
regla de la trampa no depende del peso.

**Nota de calibración retroactiva:** `sort()` en PS-1 es MEDIA — muta el array
original. Ese es justo el caso donde la trampa es obligatoria y el material no la
documentó. La clasificación por peso hace explícito por qué `sort()` exigía más
cuidado que `ReactNode`.

---

*Enmienda 10 — Constitución v1.2 → v1.3*
*Julio 2026*
