# 🏆 PROYECTO INTEGRADOR PS-4
## Nexus Compartido — Cuando el sistema tiene varios dueños

---

```
ACTA DE GENERACIÓN
Fecha: 2026-08-06
Punto de síntesis: post Semana 17 (Validación con Zod)
Prerrequisitos: Semanas 01-17 completas · PS-1, PS-2 y PS-3 aprobados
Duración estimada: 10-12 horas
Universo: Nexus / TerraMater (ficticio — Enmienda 19)
Constitución aplicada: v2.2
Cierra: el cabo suelto declarado en el Día 4 de la Semana 14
```

---

## 🎬 ANTES DE EMPEZAR

Este es el último Proyecto Integrador del roadmap generado, y el más
ambicioso. No porque tenga más funcionalidad — de hecho **agrega muy poca**.

Es ambicioso porque trata de algo que ninguno de los anteriores podía tocar:
**qué pasa cuando tu sistema tiene más de un usuario a la vez.**

```
PS-1  →  cruzar datos por identidad
PS-2  →  no confiar en datos externos
PS-3  →  tipar las fronteras
PS-4  →  EL SISTEMA TIENE VARIOS DUEÑOS
```

Los tres primeros los hiciste solo, para ti. Este trata de lo que ocurre
cuando dos personas quieren lo mismo al mismo tiempo.

**Una advertencia honesta:** el Módulo 4 te va a hacer romper tu propio
sistema a propósito, y probablemente lo consigas al primer intento. Eso no
significa que lo hayas hecho mal antes. Significa que hasta ahora nadie te
había pedido defenderte de esto.

---

## 🎯 LA COMPETENCIA NUEVA

Tres capas, de menos a más profunda:

**1. Propiedad del dato.** Cada registro pertenece a alguien. Ya lo tocaste
en la Semana 16 — aquí lo auditas de verdad.

**2. Permisos por rol.** Admin, guía y cliente ven y pueden cosas distintas.
También de la Semana 16, ahora con la complejidad de tres roles reales
interactuando.

**3. Concurrencia.** Esta es nueva, y es la razón de que el proyecto exista.

> **El cabo suelto:** el mini-ejercicio del Día 4 de la Semana 14 pregunta
> qué pasa si dos usuarios reservan los últimos cupos a la vez. El material
> lo plantea y **no lo resuelve** — las transacciones quedaron fuera de
> alcance a propósito.
>
> Once semanas después, aquí se cierra.

---

## 📖 EL ESCENARIO

TerraMater abre Nexus a tres tipos de usuario:

```
CLIENTE   reserva expediciones, ve solo lo suyo
GUÍA      ve las expediciones que tiene asignadas y sus participantes
ADMIN     gestiona el catálogo, asigna guías, ve todo
```

Volcán Villarrica tiene **6 cupos**. Ya hay 4 ocupados.

Carla y Diego abren la página al mismo tiempo. Los dos ven "quedan 2 cupos".
Los dos pulsan Reservar.

**¿Qué pasa?**

Con tu sistema actual: los dos entran. Ocho personas en un cupo de seis. Y
nadie se entera hasta que el guía llega al volcán.

---

## 🌿 MÓDULO 0 — PREPARACIÓN

**0.1** — Rama por módulo, conventional commits, al menos un PR. Como en PS-3.

**0.2** — **Tres cuentas de prueba** en Clerk, una por rol. Vas a necesitarlas
todo el proyecto:

```
tu-correo+admin@...    rol: admin
tu-correo+guia@...     rol: guia
tu-correo+cliente@...  sin rol
```

> El truco del `+` funciona en Gmail y en la mayoría de proveedores: todo lo
> que va después llega a tu bandeja igual, pero cuenta como dirección
> distinta.

**0.3** — Dos navegadores distintos, o uno normal y otro en incógnito. Los vas
a usar a la vez en el Módulo 4.

---

## 🔍 MÓDULO 1 — LA AUDITORÍA

Antes de arreglar nada, **encuentra los agujeros**.

Este módulo no escribe código de producción. Escribe un informe.

### 1.1 — Inventario de superficies

Lista **todas** las puertas por las que se puede pedir o modificar datos:

```
Server Actions
Route Handlers
Consultas en Server Components
Formularios
```

Para cada una, responde en `AUDITORIA.md`:

```
· ¿Comprueba sesión?
· ¿Comprueba propiedad del dato?
· ¿Comprueba rol cuando corresponde?
· ¿Valida la forma de la entrada?
```

### 1.2 — El ataque

Con dos cuentas, intenta durante **treinta minutos** acceder a datos ajenos.

```
· Cambiar el id en la URL
· Invocar Server Actions desde la consola con ids de la otra cuenta
· Pedir el PDF de una reserva ajena
· Llamar a una acción de admin desde la cuenta cliente
· Enviar un formulario con un usuarioId que no es el tuyo
```

Documenta **cada intento y su resultado**. Los que funcionen son tu lista de
trabajo.

> **Esto es la Enmienda 14 en su forma más pura:** no estás produciendo
> código, estás juzgando el que ya existe. Y es tu propio código, que es lo
> más difícil de auditar.

### 1.3 — El informe

```
AGUJEROS ENCONTRADOS: [n]
Por gravedad:
  🔴 acceso a datos de otro usuario
  🟠 acción de admin ejecutable sin rol
  🟡 información filtrada en mensajes de error
```

> **Ancla:** si encuentras cero agujeros, no has buscado bien. Vuelve al 1.2
> y prueba invocando las Server Actions directamente desde la consola, sin
> pasar por la interfaz.

---

## 🔐 MÓDULO 2 — PROPIEDAD DEL DATO

Cerrar lo que encontraste.

### 2.1 — La regla, sin excepciones

```typescript
// Toda consulta que devuelva datos de un usuario lleva su id
where: { usuarioId }

// Toda lectura por id combina ambos
prisma.reserva.findFirst({ where: { id, usuarioId } })

// Toda escritura comprueba propiedad ANTES
const propia = await prisma.reserva.findFirst({ where: { id, usuarioId } });
if (!propia) return { error: "Reserva no encontrada" };
```

### 2.2 — El helper que evita el olvido

Si escribes la misma comprobación en veinte acciones, la olvidarás en la
veintiuna.

```typescript
// src/lib/autorizacion.ts

export async function requiereSesion() {
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw new ErrorAutorizacion("No autorizado");
  }
  return userId;
}

export async function requiereReservaPropia(reservaId: string) {
  const usuarioId = await requiereSesion();
  const reserva = await prisma.reserva.findFirst({
    where: { id: reservaId, usuarioId }
  });
  if (!reserva) {
    throw new ErrorAutorizacion("Reserva no encontrada");
  }
  return { reserva, usuarioId };
}
```

### 2.3 — Los mensajes que no filtran

```
❌ "No tienes permiso para ver esta reserva"
      → confirma que la reserva EXISTE

✅ "Reserva no encontrada"
      → no distingue entre "no existe" y "no es tuya"
```

Es una decisión deliberada, no descuido. Se llama **no filtrar por
enumeración**.

> **Ancla:** repite el ataque del 1.2. Todos los intentos deben fallar, y
> ninguno debe revelar si el recurso existe.

---

## 👥 MÓDULO 3 — TRES ROLES

### 3.1 — La matriz de permisos

Escríbela **antes** de codificar. En `PERMISOS.md`:

| Acción | Cliente | Guía | Admin |
|---|---|---|---|
| Ver catálogo | ✅ | ✅ | ✅ |
| Crear reserva | ✅ | ✅ | ✅ |
| Ver sus reservas | ✅ | ✅ | ✅ |
| Cancelar su reserva | ✅ | ✅ | ✅ |
| Ver todas las reservas | ❌ | ❌ | ✅ |
| Ver participantes de su expedición | ❌ | ✅ | ✅ |
| Crear/editar expedición | ❌ | ❌ | ✅ |
| Asignar guía | ❌ | ❌ | ✅ |
| Cancelar reserva ajena | ❌ | ❌ | ✅ |

**El caso interesante es el guía.** No es "ve todo" ni "ve lo suyo": ve **los
participantes de las expediciones que tiene asignadas**. Eso no se resuelve
con un `where` simple.

### 3.2 — El acceso indirecto

```typescript
// El guía ve reservas de expediciones donde ÉL está asignado
const reservas = await prisma.reserva.findMany({
  where: {
    expedicion: {
      asignaciones: { some: { guiaId: usuarioId } }
    }
  }
});
```

Es la primera vez que la autorización depende de una **relación**, no de un
campo directo.

### 3.3 — Un helper por rol

```typescript
export async function requiereAdmin() { ... }
export async function requiereGuiaDeExpedicion(expedicionId: string) { ... }
```

> **Anclas:** con las tres cuentas, verifica cada fila de la matriz. **27
> comprobaciones.** Documenta el resultado en una tabla.
>
> Y prueba cada negación **por consola**, no solo por interfaz. Que el botón
> no aparezca no es protección.

---

## 💥 MÓDULO 4 — LA CONDICIÓN DE CARRERA

El corazón del proyecto. Aquí rompes tu sistema a propósito.

### 4.1 — Prepara el escenario

```
Volcán Villarrica (EXP006), cupoMaximo: 6
Deja exactamente 4 cupos ocupados con reservas confirmadas
→ quedan 2 disponibles
```

### 4.2 — Rómpelo

Con **dos navegadores** y **dos cuentas distintas**:

```
1. Abre la página de Volcán Villarrica en los dos
2. Los dos deben mostrar "quedan 2 cupos"
3. En los dos, prepara una reserva de 2 personas
4. Pulsa Reservar en los dos LO MÁS SIMULTÁNEAMENTE que puedas
```

Si no lo consigues a mano, fuérzalo desde la consola:

```javascript
await Promise.all([
  crearReserva({ expedicionId: "EXP006", personas: 2 }),
  crearReserva({ expedicionId: "EXP006", personas: 2 })
]);
```

**Resultado esperado: 8 personas en un cupo de 6.**

### 4.3 — Entiende por qué

Tu validación es correcta y aun así falla:

```typescript
const ocupados = await contarOcupados(expedicionId);   // ① ambos leen: 4
if (ocupados + personas > cupoMaximo) {                // ② ambos: 4+2=6 ✓
  return { error: "Sin cupos" };
}
await prisma.reserva.create({ ... });                  // ③ ambos escriben
```

Entre ① y ③ pasan milisegundos. En esos milisegundos, el otro usuario también
leyó, también validó, y también va a escribir.

**Ninguno de los dos hizo nada mal. El problema es la ventana entre leer y
escribir.**

Se llama **TOCTOU** — *Time Of Check to Time Of Use*. Y no se arregla
validando mejor: el `if` está perfecto.

### 4.4 — Documéntalo

En `CONCURRENCIA.md`: qué hiciste, qué esperabas, qué pasó, y por qué la
validación no lo impidió.

> **Ancla:** si no consigues romperlo, tu ventana es muy pequeña. Añade
> temporalmente un `await new Promise(r => setTimeout(r, 2000))` entre la
> comprobación y la escritura. Eso agranda la ventana y lo hace reproducible.
>
> Quítalo después. Y anota que el bug **existía igual** — solo era más
> difícil de provocar.

---

## 🔒 MÓDULO 5 — TRANSACCIONES

Ahora arréglalo. Hay tres niveles, y conviene conocerlos todos.

### 5.1 — Nivel 1: transacción interactiva

```typescript
await prisma.$transaction(async (tx) => {
  const ocupados = await tx.reserva.aggregate({
    where: { expedicionId, estado: "confirmada" },
    _sum: { personas: true }
  });

  const total = ocupados._sum.personas ?? 0;

  if (total + personas > expedicion.cupoMaximo) {
    throw new Error("Sin cupos suficientes");
  }

  return tx.reserva.create({ data: { ... } });
});
```

Todo dentro del bloque ocurre **o entero o nada**. Si el `throw` salta, la
creación se deshace.

> ⚠ **Y aun así puede fallar.** Una transacción garantiza *atomicidad* — que
> no queden estados a medias. No garantiza por sí sola que dos transacciones
> simultáneas no lean lo mismo.
>
> Para eso hace falta el nivel de aislamiento correcto, o el nivel 2.

### 5.2 — Nivel 2: bloqueo optimista

Un campo de versión que cambia en cada escritura:

```prisma
model Expedicion {
  cupoMaximo Int
  version    Int @default(0)
}
```

```typescript
const resultado = await tx.expedicion.updateMany({
  where: { id: expedicionId, version: versionLeida },
  data: { version: { increment: 1 } }
});

if (resultado.count === 0) {
  throw new Error("La expedición cambió. Intenta de nuevo.");
}
```

Si otro la modificó entre tu lectura y tu escritura, la versión ya no
coincide, `updateMany` afecta a cero filas, y lo detectas.

### 5.3 — Nivel 3: la restricción en la base de datos

Y aquí está la lección más profunda del proyecto.

> **La única garantía real vive en la base de datos, no en tu código.**

Tu código comprueba y después escribe — siempre hay una ventana. Una
restricción de la base **se evalúa en el momento de escribir**, de forma
atómica. No hay ventana.

```prisma
model Reserva {
  usuarioId    String
  expedicionId String

  @@unique([usuarioId, expedicionId])
}
```

Con eso, un usuario no puede reservar dos veces la misma expedición **aunque
tu código lo permita**. La base lo rechaza con el error `P2002`.

**Reconoce la forma:**

```
Semana 16 → el proxy es conveniencia; la comprobación en la Server
            Action es la seguridad

PS-4      → la comprobación en el código es conveniencia; la restricción
            en la base es la garantía
```

Misma estructura, un nivel más abajo. **La defensa real está siempre lo más
cerca posible del recurso.**

### 5.4 — Vuelve a romperlo

Repite el ataque del 4.2 con las tres defensas puestas.

> **Ancla:** una reserva entra, la otra recibe un mensaje claro. El cupo
> queda en 6 de 6, nunca en 8.

---

## 📜 MÓDULO 6 — QUIÉN HIZO QUÉ

Con varios usuarios, "se canceló la reserva" ya no es información suficiente.

### 6.1 — El registro

```prisma
model RegistroActividad {
  id          String   @id @default(cuid())
  usuarioId   String
  accion      String
  entidad     String
  entidadId   String
  detalle     Json?
  creadoEn    DateTime @default(now())

  @@index([entidadId])
  @@index([usuarioId])
}
```

### 6.2 — Registrar dentro de la transacción

```typescript
await prisma.$transaction(async (tx) => {
  const reserva = await tx.reserva.create({ data: { ... } });

  await tx.registroActividad.create({
    data: { usuarioId, accion: "crear", entidad: "reserva", entidadId: reserva.id }
  });

  return reserva;
});
```

**Dentro** de la transacción, no después. Si la reserva se deshace, el
registro también. Un historial que miente es peor que no tenerlo.

### 6.3 — El historial

En el detalle de cada reserva, quién hizo qué y cuándo. Solo visible para el
dueño y para admin.

> ⚠ El registro **no guarda datos sensibles**. Guarda qué pasó, no el
> contenido completo.

---

## ✅ REQUISITOS TÉCNICOS

```
✅ AUDITORIA.md con el inventario y los ataques documentados
✅ PERMISOS.md con la matriz de 27 celdas verificada
✅ CONCURRENCIA.md con el bug reproducido y explicado
✅ Helpers de autorización centralizados
✅ Toda consulta de datos de usuario filtra por usuarioId
✅ findFirst con id + usuarioId, nunca findUnique solo por id
✅ El acceso del guía por relación, no por campo directo
✅ Mensajes que no revelan si el recurso existe
✅ Transacción en toda operación que compruebe y luego escriba
✅ Al menos una restricción @@unique como garantía de base de datos
✅ Registro de actividad dentro de la transacción
✅ Esquemas Zod en todas las acciones (Semana 17)
✅ npx tsc --noEmit limpio · cero any
❌ Sin autorización que dependa de ocultar la interfaz
❌ Sin comprobar-y-escribir fuera de transacción
❌ Sin registrar actividad después de la transacción
```

---

## 🗂 ESTRUCTURA SUGERIDA

```
src/
├── lib/
│   ├── prisma.ts
│   ├── autorizacion.ts       ← requiereSesion, requiereAdmin, ...
│   └── errores.ts            ← ErrorAutorizacion, ErrorNegocio
├── esquemas/
├── acciones/
├── consultas/
└── app/
AUDITORIA.md
PERMISOS.md
CONCURRENCIA.md
```

---

## 💡 LAS TRES PISTAS

**Pista 1** — Para el acceso del guía necesitas una relación entre `Guia` y
`Expedicion`. Si tu esquema no la tiene, es una migración. Piensa si es 1-N o
N-M: ¿una expedición puede tener dos guías? ¿Un guía varias expediciones?

**Pista 2** — La transacción interactiva de Prisma tiene un **tiempo máximo**
por defecto. Si dentro haces algo lento —una petición de red, por ejemplo—
puede abortar. Las transacciones deben ser cortas: solo base de datos.

**Pista 3** — El error `P2002` de Prisma es violación de restricción única.
Captúralo y tradúcelo a un mensaje humano. Es el mismo patrón del `P2003` que
trabajaste en la Semana 14.

---

## ✅ CRITERIOS DE APROBACIÓN

```
□ Los ataques del Módulo 1 fallan todos tras el Módulo 2
□ Las 27 celdas de la matriz verificadas, por consola además de por UI
□ El bug de concurrencia REPRODUCIDO y documentado antes de arreglarlo
□ Tras el Módulo 5, el cupo nunca supera el máximo
□ Existe al menos una restricción @@unique activa
□ El registro de actividad no queda huérfano si la operación falla
□ Ningún mensaje revela si un recurso existe
□ npx tsc --noEmit limpio
□ Historial de Git legible con al menos un PR
```

**Verificación final — el guía nuevo:**

Crea una cuarta cuenta con rol `guia` y **sin ninguna expedición asignada**.

Debe poder entrar, ver el catálogo y sus propias reservas. Y no debe ver
participantes de ninguna expedición, porque no tiene ninguna.

Ese caso es el que más se olvida: el rol existe, los permisos existen, y el
conjunto está vacío. Un sistema que revienta con un conjunto vacío no está
terminado.

---

## 🎤 MINI-ENTREVISTA DE CIERRE

```
1. Por qué el if de validación era correcto y aun así falló
2. Qué garantiza una transacción y qué NO garantiza por sí sola
3. Por qué una restricción @@unique es más fuerte que tu comprobación
4. Por qué "reserva no encontrada" en vez de "no tienes permiso"
5. Qué tiene en común la lección de este proyecto con la del proxy
   en la Semana 16
```

---

## 🎯 LO QUE TE LLEVAS

**Un sistema que aguanta a más de una persona.** No es una funcionalidad
nueva: es que las que ya tenías dejan de romperse cuando alguien más las usa.

**Y la lección que cierra el arco de los cuatro proyectos:**

```
PS-1  →  los datos se relacionan por identidad, no por posición
PS-2  →  lo que viene de fuera no es de fiar
PS-3  →  los tipos se acaban en las fronteras
PS-4  →  tu comprobación es una foto; el estado cambió mientras mirabas
```

> **La defensa real está siempre lo más cerca posible del recurso.**
> En la Semana 16 era la Server Action y no el proxy.
> Aquí es la base de datos y no tu `if`.
> Es la misma idea, un nivel más abajo cada vez.

---

*Proyecto Integrador PS-4 — Nexus Compartido*
*Punto de síntesis: post Semana 17*
*Cierra el cabo suelto del Día 4 de la Semana 14*
*Óscar — Full Stack Developer en formación 🇨🇱*
