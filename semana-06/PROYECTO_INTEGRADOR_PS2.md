# 🏆 PROYECTO INTEGRADOR PS-2
## NexusLink — Integración con un socio que no controlas

---

```
ACTA DE GENERACIÓN
Fecha: 2026-08-06
Punto de síntesis: post Semana 06 (Programación Asíncrona)
Prerrequisitos: Semanas 01-06 completadas · PS-1 aprobado
Duración estimada: 5-7 horas
Universo: Nexus / TerraMater (ficticio — Enmienda 19)
Constitución aplicada: v2.2
```

---

## 🎯 LA COMPETENCIA NUEVA

PS-1 te enseñó a **cruzar dos arrays por ID común**. Los datos eran tuyos,
estaban limpios, y podías confiar en ellos.

PS-2 enseña lo contrario:

> **No confíes en datos que no controlas.**

El proyecto del Día 6 de la Semana 06 construyó el cliente HTTP —
`fetchJSON`, timeout, caché, manejo de errores de red. Eso ya funciona.

Aquí el cliente no es el problema. **Los datos que llegan son el problema.**

Vienen de otro sistema, escrito por otra gente, con otras convenciones. Y
tu trabajo es que tu aplicación no se rompa, no calcule mal, y sepa decir
exactamente qué rechazó y por qué.

---

## 📖 EL ESCENARIO

TerraMater firmó un acuerdo con **AndesPass**, un consolidador que vende
expediciones de varios operadores. AndesPass envía las reservas que consigue.

Su sistema tiene quince años. Nadie va a cambiarlo por ti.

```
Sus precios a veces vienen como número, a veces como texto con formato
Sus estados usan tres vocabularios distintos
Sus nombres de cliente llegan con espacios y mayúsculas inconsistentes
A veces mandan la misma reserva dos veces
A veces referencian expediciones que no existen en tu catálogo
```

Nada de eso es un error de programación. Es cómo son los datos reales.

---

## 📋 LOS DATOS

### Fuente A — tu catálogo (limpio, local)

`datos/catalogo.js`

```javascript
export const catalogo = [
  { id: "EXP001", nombre: "Cruce Los Andes",   precioBase: 280000, cupoMaximo: 12 },
  { id: "EXP002", nombre: "Lago Llanquihue",   precioBase: 195000, cupoMaximo: 8 },
  { id: "EXP003", nombre: "Torres del Paine",  precioBase: 450000, cupoMaximo: 10 },
  { id: "EXP004", nombre: "Río Futaleufú",     precioBase: 150000, cupoMaximo: 15 },
  { id: "EXP005", nombre: "Reserva Nonguén",   precioBase: 45000,  cupoMaximo: 20 },
  { id: "EXP006", nombre: "Volcán Villarrica", precioBase: 320000, cupoMaximo: 6 },
  { id: "EXP007", nombre: "Lago Conguillio",   precioBase: 130000, cupoMaximo: 10 },
  { id: "EXP008", nombre: "Atacama Extremo",   precioBase: 520000, cupoMaximo: 8 }
];
```

### Fuente B — lo que manda AndesPass

`datos/andespass-simulado.js`

```javascript
export const reservasCrudas = [
  { ref: "AP-1001", exp: "EXP001", cliente: "  carlos mendoza ", pax: 2,    estado: "confirmada", pagado: "560000" },
  { ref: "AP-1002", exp: "EXP003", cliente: "ANA TORRES",        pax: "4",  estado: "CONFIRMED",  pagado: 1800000 },
  { ref: "AP-1003", exp: "EXP001", cliente: "Pedro Soto",        pax: 3,    estado: "cancelada",  pagado: 0 },
  { ref: "AP-1004", exp: "EXP005", cliente: "María González",    pax: 1,    estado: "conf",       pagado: "$45.000" },
  { ref: "AP-1005", exp: "EXP999", cliente: "Juan Pérez",        pax: 2,    estado: "confirmada", pagado: 390000 },
  { ref: "AP-1006", exp: "EXP006", cliente: "Sofía Ramírez",     pax: 2,    estado: "confirmada", pagado: 660000 },
  { ref: "AP-1007", exp: "EXP003", cliente: "diego fuentes",     pax: null, estado: "pendiente",  pagado: 1350000 },
  { ref: "AP-1008", exp: "EXP008", cliente: "Valentina Cruz",    pax: 2,    estado: "confirmada", pagado: 1040000 },
  { ref: "AP-1009", exp: "EXP001", cliente: "Andrés Morales",    pax: 4,    estado: "Confirmada", pagado: "1120000" },
  { ref: "AP-1010", exp: "EXP004", cliente: "Lucía Vega",        pax: -2,   estado: "confirmada", pagado: 750000 },
  { ref: "AP-1011", exp: "EXP002", cliente: "",                  pax: 2,    estado: "confirmada", pagado: 390000 },
  { ref: "AP-1009", exp: "EXP001", cliente: "Andrés Morales",    pax: 4,    estado: "Confirmada", pagado: "1120000" },
  { ref: "AP-1012", exp: "EXP007", cliente: "Camila Herrera",    pax: 2,    estado: "confirmada", pagado: 240000 },
  { ref: "AP-1013", exp: "EXP006", cliente: "Tomás Riquelme",    pax: 5,    estado: "confirmada", pagado: 1600000 }
];
```

**Míralos antes de escribir código.** Cada anomalía está puesta a propósito y
cada una ejercita algo distinto. Vale la pena que hagas tu propia lista de
qué ves raro antes de leer los módulos.

---

## 🔌 MÓDULO 1 — INGESTA QUE SOBREVIVE

AndesPass expone tres endpoints. Simúlalos en `api/andespass.js` con
funciones asíncronas que devuelven Promesas.

```javascript
// Simula latencia de red
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerReservas() {
  await esperar(300);
  return reservasCrudas;
}

export async function obtenerEstadoServicio() {
  await esperar(150);
  return { operativo: true, version: "1.4.2" };
}

export async function obtenerTarifario() {
  await esperar(2000);
  throw new Error("503 Service Unavailable");
}
```

**1.1** — `consultarConTimeout(promesa, ms)`: rechaza si la promesa tarda más
de `ms` milisegundos. Usa `Promise.race`.

**1.2** — `sincronizar()`: pide las tres fuentes **en paralelo** y devuelve lo
que consiga.

⚠ El tarifario **siempre falla**. Eso no es un bug del enunciado.

**La pregunta que decide este módulo:** si una de tres fuentes falla,
¿pierdes las otras dos?

`Promise.all` rechaza entero en cuanto una falla. Necesitas otra cosa. Está
en el Día 5 de la Semana 06.

**1.3** — El resultado debe distinguir qué llegó y qué no:

```javascript
{
  reservas: [...],
  estadoServicio: { operativo: true, version: "1.4.2" },
  tarifario: null,
  fallos: ["tarifario: 503 Service Unavailable"]
}
```

> **Ancla:** con timeout de 1000ms, `sincronizar()` devuelve reservas y
> estado, `tarifario` en `null`, y **un** fallo registrado.

---

## 🧼 MÓDULO 2 — SANEAMIENTO

Convierte cada registro crudo a una forma canónica. Tres funciones puras,
en `logica/saneamiento.js`.

**2.1** — `normalizarNombre(valor)`

```
"  carlos mendoza "  →  "Carlos Mendoza"
"ANA TORRES"         →  "Ana Torres"
"diego fuentes"      →  "Diego Fuentes"
""                   →  ""
null                 →  ""
```

**2.2** — `normalizarMonto(valor)`

```
560000       →  560000
"560000"     →  560000
"$45.000"    →  45000
"abc"        →  null
null         →  null
```

Devolver `null` cuando no se puede interpretar **es parte del contrato**. No
inventes un cero: un monto ilegible y un monto de cero son cosas distintas.

**2.3** — `normalizarEstado(valor)`

```
"confirmada" "CONFIRMED" "conf" "Confirmada"  →  "confirmada"
"cancelada"                                   →  "cancelada"
"pendiente"                                   →  "pendiente"
cualquier otra cosa                           →  null
```

**2.4** — `normalizarReserva(cruda)` que las combina y devuelve la forma
canónica:

```javascript
{ ref, expedicionId, cliente, personas, estado, montoDeclarado }
```

> **Ancla:** `normalizarMonto("$45.000")` debe dar exactamente `45000`.
> Si te da `45` o `45000000`, revisa qué caracteres estás quitando.

---

## 🚧 MÓDULO 3 — VALIDACIÓN Y CUARENTENA

Aquí está el corazón del proyecto.

Un registro se acepta o se manda a cuarentena. **Y la cuarentena tiene que
decir por qué** — un sistema que descarta datos en silencio es peor que uno
que falla.

**3.1** — `validarReserva(reserva, catalogo, refsVistas)` devuelve un array de
motivos. Vacío significa válida.

Las seis reglas:

```
"duplicado"                 la ref ya apareció antes
"cliente vacío"             sin nombre tras normalizar
"personas ausente"          null, undefined o no numérico
"personas inválido"         cero o negativo
"expedición inexistente"    el id no está en tu catálogo
"estado desconocido"        no se pudo normalizar
"monto ilegible"            normalizarMonto devolvió null
```

**3.2** — `procesarLote(crudas, catalogo)` devuelve:

```javascript
{
  aceptadas: [...],
  cuarentena: [{ ref, motivos: [...] }]
}
```

> **Anclas del módulo:**
> ```
> 14 registros entran
> 9 aceptadas
> 5 en cuarentena
>
> AP-1005  →  expedición inexistente
> AP-1007  →  personas ausente
> AP-1009  →  duplicado   (la segunda vez que aparece)
> AP-1010  →  personas inválido
> AP-1011  →  cliente vacío
> ```
>
> Si tus números no coinciden exactamente, algo falla. Cada motivo aparece
> **una sola vez** en todo el lote — está diseñado así para que ninguna regla
> quede sin probar.

**3.3** — El duplicado tiene una decisión de diseño que te toca: cuando
`AP-1009` aparece dos veces, ¿cuál se acepta y cuál se rechaza? Documenta tu
criterio en un comentario.

---

## 💰 MÓDULO 4 — RECONCILIACIÓN

AndesPass declara cuánto se pagó. Tu catálogo dice cuánto debería costar.
No siempre coinciden.

**4.1** — Para cada reserva **aceptada y confirmada**, calcula el monto
esperado (`personas × precioBase`) y compáralo con el declarado.

**4.2** — `detectarDiscrepancias(aceptadas, catalogo)` devuelve solo las que
no cuadran, con la diferencia.

**4.3** — Detecta **sobrecupo**: expediciones donde la suma de personas
confirmadas supera el `cupoMaximo`.

> **Anclas del módulo:**
> ```
> Confirmadas aceptadas:   8
> Ingreso declarado:       $7.065.000
> Ingreso esperado:        $7.065.000
> Diferencia neta:         $0
> Discrepancias:           2
>
> AP-1006  declarado 660.000  esperado 640.000  →  +20.000
> AP-1012  declarado 240.000  esperado 260.000  →  −20.000
>
> Sobrecupo: Volcán Villarrica, 7 personas para 6 cupos (117%)
> ```

**Mira bien esas anclas antes de seguir.** La diferencia neta es cero y aun
así hay dos errores de veinte mil pesos cada uno. Se cancelan.

Si tu reporte solo mostrara el total, dirías que todo cuadra.

> **La lección, y es la del proyecto entero:**
> *"El total cuadra" no significa "todo está bien".*
> Es la misma regla del Mes 1 —"no dio error" no significa "está bien"—
> aplicada a los datos en vez de al código.

---

## 📊 MÓDULO 5 — REPORTE DE INTEGRACIÓN

Un solo `console.log` con template literal. Formato exacto libre, contenido
obligatorio:

```
=== NEXUSLINK — REPORTE DE INTEGRACIÓN ANDESPASS ===

🔌 SINCRONIZACIÓN
Fuentes consultadas: 3
Fuentes con fallo: [n]  → [detalle]

📥 INGESTA
Registros recibidos: [n]
Aceptados: [n]
En cuarentena: [n]

🚧 CUARENTENA
[ref] — [motivos]
...

💰 RECONCILIACIÓN
Reservas confirmadas: [n]
Ingreso declarado: $[monto]
Ingreso esperado:  $[monto]
Diferencia neta:   $[monto]
Discrepancias detectadas: [n]
[ref] declarado $[x] / esperado $[y] → [diferencia]

⚠️ ALERTAS DE CUPO
[expedición]: [ocupados]/[máximo] ([porcentaje]%)
```

Montos con `.toLocaleString("es-CL")`.

---

## ✅ REQUISITOS TÉCNICOS

```
✅ async/await en toda la capa de ingesta — sin .then() encadenado
✅ Las tres fuentes se consultan en PARALELO, no en serie
✅ Un fallo de una fuente no impide procesar las otras
✅ Timeout implementado con Promise.race
✅ Las funciones de saneamiento son PURAS y viven en logica/
✅ La validación devuelve motivos, nunca solo true/false
✅ Cruce con el catálogo por ID, nunca por posición
✅ Todos los reduce con valor inicial explícito
✅ Cero mutación de los arrays de entrada
✅ Un solo console.log para el reporte
❌ Sin try/catch vacíos que se traguen el error
❌ Sin valores inventados para reemplazar datos ilegibles
❌ Sin console.log dentro de las funciones de lógica
```

---

## 🗂 ESTRUCTURA SUGERIDA

```
ps2-nexuslink/
├── datos/
│   ├── catalogo.js
│   └── andespass-simulado.js
├── api/
│   └── andespass.js          ← los tres endpoints simulados
├── logica/
│   ├── saneamiento.js        ← funciones puras de normalización
│   ├── validacion.js         ← reglas y cuarentena
│   └── reconciliacion.js     ← discrepancias y sobrecupo
├── main.js                   ← orquesta todo y genera el reporte
└── README.md
```

La separación importa: `logica/` no sabe que existe una API. Recibe datos y
devuelve datos. Deberías poder probar cada función sin red y sin `await`.

---

## 💡 LAS DOS ÚNICAS PISTAS

**Pista 1** — Para detectar duplicados necesitas recordar qué referencias ya
viste mientras recorres. Un array con `includes` funciona pero se vuelve lento
con muchos registros. Hay una estructura de JavaScript pensada exactamente
para "conjunto de cosas ya vistas", y la Semana 06 usa su prima cercana.

**Pista 2** — `normalizarMonto("$45.000")` tiene una trampa. En Chile el punto
es separador de miles, pero `Number("45.000")` lo interpreta como decimal y da
`45`. Piensa qué caracteres hay que quitar **antes** de convertir.

---

## ✅ CRITERIOS DE APROBACIÓN

```
□ El programa corre sin errores no controlados
□ El fallo del tarifario NO impide procesar las reservas
□ 9 aceptadas y 5 en cuarentena, con los motivos exactos del Módulo 3
□ Cada registro en cuarentena dice por qué
□ Las dos discrepancias detectadas, con su signo correcto
□ El sobrecupo de Volcán Villarrica aparece en las alertas
□ Los montos formateados en pesos chilenos
□ Las funciones de logica/ se pueden ejecutar sin red
□ Subido a GitHub con commit descriptivo
```

**Verificación adversarial:** agrega un registro nuevo al final del lote crudo
que viole **dos** reglas a la vez — por ejemplo, cliente vacío y expedición
inexistente. Tu cuarentena debe reportar los dos motivos, no solo el primero.

Después quítalo.

---

## 🎤 MINI-ENTREVISTA DE CIERRE

Cuando termines, cuatro preguntas. Aquí van los temas para que sepas hacia
dónde mirar mientras trabajas:

```
1. Por qué Promise.all no servía, y qué usaste en su lugar
2. Por qué normalizarMonto devuelve null en vez de 0
3. Por qué la cuarentena guarda motivos y no solo descarta
4. Qué habrías perdido si el reporte solo mostrara el total de ingresos
```

---

*Proyecto Integrador PS-2 — NexusLink*
*Punto de síntesis: post Semana 06*
*Óscar — Full Stack Developer en formación 🇨🇱*
