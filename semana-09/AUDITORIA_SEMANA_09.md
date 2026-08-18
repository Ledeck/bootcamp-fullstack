# 🔬 AUDITORÍA — BOOTCAMP SEMANA 09
## TypeScript · La única semana sin auditar

---

```
ACTA DE AUDITORÍA
Fecha: 2026-08-06
Material auditado: BOOTCAMP_SEMANA_09.md (971 líneas, generado con formato v3)
Fases ejecutadas: 1 (relanzada), 4, 6, 6b, 6c, 7
Fase 1 — fuentes consultadas 2026-08-06:
   · nodejs.org/learn/typescript/run-natively
   · dev.to — Node.js Native TypeScript (feb 2026)
   · pockit.tools/blog/nodejs-native-typescript-guide (feb 2026)
   · hirenodejs.com — Type Stripping Guide (may 2026)
   · ecorpit.com — Node.js runs TypeScript natively in 2026 (jul 2026)
   · matthewswong.com — Type Stripping (3 semanas)
Constitución aplicada: v2.2
```

---

## RESUMEN EJECUTIVO

```
HALLAZGOS CRÍTICOS      2
HALLAZGOS ALTOS         2
HALLAZGOS MEDIOS        3
FALSAS ALARMAS          1  (el contenido resultó compatible)
```

**Veredicto:** el **contenido conceptual está bien** — tipos, interfaces,
generics y utility types están correctamente explicados y no enseñan nada
obsoleto. El problema es el **envoltorio**: falta el Cheat Sheet, el setup
está retirado, y la semana no incorpora el cambio más importante que ha
tenido TypeScript en Node desde que existe.

No hace falta regenerar el bootcamp entero. Hacen falta tres cosas:
un Cheat Sheet nuevo, un bloque perecedero nuevo, y un día adicional.

---

## 🔴 CRÍTICO 1 — NO EXISTE CHEAT SHEET

```
Todas las semanas generadas (05-08, 10-16) tienen su CHEATSHEET.
La Semana 09 no.

Y el propio bootcamp lo referencia:
   "> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_09.md` completa."

Apunta a un archivo que nunca se creó.
```

**Por qué es crítico ahora y no lo era antes:** la Enmienda 17 convirtió el
Cheat Sheet en el **guion de la clase de activación**. Sin él, la Semana 09
no se puede enseñar con la metodología vigente. No es un anexo que falta: es
la fuente de la primera exposición a cada concepto.

**Corrección:** generar `CHEATSHEET_SEMANA_09.md`. Hecho — ver archivo aparte.

---

## 🔴 CRÍTICO 2 — EL SETUP ESTÁ RETIRADO

El bloque actual:

```bash
npm install -g typescript
tsc --version
tsc archivo.ts
npm install -g ts-node      # ← retirado
ts-node archivo.ts          # ← retirado
```

### Lo que la Fase 1 estableció

```
Node.js ejecuta archivos .ts DIRECTAMENTE mediante "type stripping".

Cronología verificada:
  Node 22.6    → --experimental-strip-types (con bandera)
  Node 22.18   → sin bandera
  Node 23.6    → sin bandera
  Node 24 LTS  → es el comportamiento por defecto

Mecanismo: el módulo `amaro`, envoltorio ligero sobre SWC. Elimina las
anotaciones de tipo y las reemplaza por espacios en blanco, de modo que
los números de línea NO cambian.

ts-node ya no hace falta para este caso de uso.
```

**El setup correcto:**

```bash
node archivo.ts       # ejecuta directamente
npx tsc --noEmit      # comprueba tipos, sin generar archivos
```

`tsc archivo.ts` sigue funcionando, pero genera un `.js` al lado que nadie
usa. Es un paso intermedio que ya no se necesita.

**Daño evitado:** Óscar habría instalado dos paquetes globales innecesarios y
habría trabajado con un ciclo compilar → ejecutar que el ecosistema abandonó.

---

## 🟠 ALTO 1 — FALTA LA LECCIÓN MÁS IMPORTANTE DE TYPESCRIPT EN NODE

Y esta es la que más me importa del informe.

```
Node.js ejecuta el archivo .ts SIN COMPROBAR LOS TIPOS.

Type stripping borra las anotaciones y corre el JavaScript restante.
Un archivo lleno de errores de tipo se ejecuta sin quejarse.
```

Ejemplo:

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

console.log(sumar("hola", "mundo"));
```

`node archivo.ts` imprime `holamundo`. Sin error. Sin advertencia.

**Por qué esto es exactamente lo que Óscar necesita ver:**

Es el patrón que la lección transversal del Mes 1 identificó —*"no dio error"
no significa "está bien"*— aplicado ahora al lenguaje que supuestamente lo
resuelve. Un alumno que crea que TypeScript le protege en ejecución tiene un
modelo mental falso.

**El modelo correcto:**

```
node archivo.ts     →  EJECUTA. No comprueba nada.
npx tsc --noEmit    →  COMPRUEBA. No ejecuta nada.

Son dos herramientas con trabajos distintos. Hacen falta las dos.
```

El material actual no puede tener esta lección porque fue escrito asumiendo
que `tsc` compila primero, y en ese flujo el error sí se detiene.

**Corrección:** día nuevo dedicado a esto — ver el archivo del Día 7.

---

## 🟠 ALTO 2 — SINTAXIS NO BORRABLE SIN DOCUMENTAR

Type stripping solo maneja **sintaxis borrable**. Estas construcciones fallan
con `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`:

```
enum
namespace con código en tiempo de ejecución
propiedades de parámetro en constructores  (private x: string)
import con alias  (import x = require(...))
```

Para esas hace falta `--experimental-transform-types`, que es opt-in.

### Falsa alarma resuelta

Verifiqué si el material las enseñaba:

```
enum          → 0 ocurrencias
namespace     → 0 ocurrencias
declare module → 0 ocurrencias
private/public/protected → 0 ocurrencias
import =      → 0 ocurrencias
```

**El contenido es totalmente compatible con type stripping.** No fue
deliberado —el material se escribió antes de que esto existiera— pero el
resultado es correcto.

Aun así hay que documentarlo: Óscar va a encontrarse `enum` en código ajeno y
tiene que saber por qué no corre.

---

## 🟡 MEDIO 1 — FALTA `satisfies`

`satisfies` (TypeScript 4.9) no aparece ni una vez. Es de los operadores más
útiles del lenguaje moderno: valida que un valor cumple un tipo **sin**
ensanchar su inferencia.

```typescript
// as → miente y pierde precisión
const config = { host: "local", puerto: 3000 } as Config;

// satisfies → valida Y conserva los tipos literales
const config = { host: "local", puerto: 3000 } satisfies Config;
```

Conecta directamente con el hueco de `as const`, también ausente.

---

## 🟡 MEDIO 2 — `tsconfig.json` Y `strict` NO SE MENCIONAN

```
tsconfig  → 0 ocurrencias
strict    → 0 ocurrencias
```

Es un hueco de fundamento. `strict: true` cambia el comportamiento del
lenguaje entero — sin él, `null` y `undefined` son asignables a todo y la
mitad del valor de TypeScript desaparece.

Y hay un dato de la Fase 1 que lo hace menos urgente de lo que parece: el
cargador de TypeScript de Node (`amaro`) **no usa `tsconfig.json`** para
ejecutar. Pero el editor y `tsc --noEmit` sí.

---

## 🟡 MEDIO 3 — FORMATO v3, NO v4

La Semana 09 se generó con formato v3. Le faltan las secciones que las demás
tienen:

```
✗ Acta de generación
✗ Bloque perecedero aislado y fechado
✗ "Cuándo NO usarlo" sistemático
✗ "Código real vs código de bootcamp"
✗ Conexión explícita con Next.js
```

**No se corrige regenerando.** El contenido conceptual es bueno; regenerarlo
arriesga perderlo por una mejora de formato. Se deja documentado.

---

## FASE 6c — COBERTURA TÉCNICA

Primera ejecución sobre esta semana.

| Técnica exigida | Enseñada | Estado |
|---|---|---|
| Tipos primitivos, inferencia | Día 1 | ✅ |
| `type` vs `interface` | Día 2 | ✅ |
| Union types, narrowing | Día 3 | ✅ |
| Generics | Día 3 | ✅ |
| `Partial`, `Omit`, `Pick`, `Record` | Día 4 | ✅ |
| Intersección con `&` | Día 4 (proyecto) | ✅ |
| **`as const`** | — | ⚠ hueco |
| **`satisfies`** | — | ⚠ hueco |
| **Ejecutar un `.ts`** | Setup (obsoleto) | 🔴 hueco crítico |

**Los dos primeros huecos son menores** porque el proyecto no los exige
explícitamente. El tercero es crítico: el alumno no puede hacer ningún
ejercicio sin saber cómo ejecutar el archivo, y la instrucción que hay es
incorrecta.

---

## FASE 7 — AUDITORÍA ADVERSARIAL

### Formulación implícita RECHAZADA

```
RECHAZADA: "TypeScript detecta los errores antes de que el código corra"

Razón: cierto solo si hay un paso de compilación. Con Node ejecutando .ts
directamente —que es el flujo por defecto en 2026— es FALSO. El código
corre con errores de tipo sin ninguna queja.

Un alumno con esta creencia confía en una red que no está puesta.

Reemplazo adoptado: separar explícitamente ejecutar de comprobar, con un
día dedicado y un ejercicio que obliga a ver el fallo silencioso.
```

### Lo que resistió la auditoría

```
✔ La explicación de inferencia vs anotación explícita es correcta
✔ type vs interface: bien delimitado, sin dogmatismo
✔ Los utility types se presentan con su caso de uso, no como catálogo
✔ El proyecto del Día 6 (sistema de tipos puro) es un buen ejercicio:
  arquitectura de contratos sin lógica de negocio
✔ No enseña ningún patrón retirado
```

---

## ADVERTENCIA SOBRE LA VIGENCIA

```
CRÍTICO → todo el bloque de setup (corregido en esta auditoría)
ALTO    → versiones de Node y su comportamiento con .ts
MEDIO   → TypeScript 6.0 Beta salió en febrero de 2026 como versión
          transitoria. TypeScript 7.0 "Project Corsa" —reescritura del
          compilador en Go, objetivo 10x de rendimiento— apuntaba a
          mediados de 2026. VERIFICAR su estado al usar esta semana:
          si Corsa ya salió, tsc --noEmit es mucho más rápido y el
          argumento de "no comprobar tipos en desarrollo" pierde fuerza
BAJO    → tipos, interfaces, generics, utility types como conceptos
```

---

## CORRECCIONES APLICADAS

```
✅ CHEATSHEET_SEMANA_09.md          creado (no existía)
✅ Bloque perecedero                reescrito con type stripping
✅ Día 7 nuevo                      ejecutar vs comprobar
✅ Sintaxis no borrable             documentada
✅ satisfies y as const             añadidos al Cheat Sheet
✅ tsconfig y strict                añadidos al Cheat Sheet
```

## NO CORREGIDO, DOCUMENTADO

```
⧗ Formato v3 → v4. Regenerar arriesga perder contenido bueno por una
  mejora cosmética. Se deja como está
⧗ Estado de TypeScript 7.0 / Project Corsa. Verificar al usar
```

---

*Auditoría Semana 09 — 2026-08-06*
*Constitución v2.2 · Fases 1, 4, 6, 6b, 6c, 7*
