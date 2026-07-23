# 🏆 PROYECTO INTEGRADOR — MES 1

## Sistema de Gestión de Expediciones — TerraMater Pro

---

> **Este proyecto es diferente a los proyectos semanales.**
>
> No evalúa una semana específica. Evalúa si realmente integraste todo el Mes 1.
> No hay pistas. No hay solución oculta.
> Si necesitas ayuda, avísame — pero primero intenta al menos 90 minutos.
>
> **Tiempo estimado:** 3-4 horas distribuidas como prefieras.

---

## El contexto

**TerraMater Expediciones** ha crecido. Ya no pueden gestionar sus expediciones con hojas de cálculo. Necesitan un sistema de gestión que procese datos reales y genere reportes automáticos para la gerencia.

Tu tarea es construir el **motor de lógica** de ese sistema — sin interfaz visual todavía, solo la lógica pura en JavaScript. El equipo de frontend (tú en unos meses) se encargará de la interfaz.

---

## Los datos del sistema

```javascript
// Catálogo de expediciones disponibles
let expediciones = [
  {
    id: "EXP001",
    nombre: "Cruce Los Andes",
    tipo: "trekking",
    duracionDias: 5,
    precioBase: 280000,
    cupoMaximo: 12,
    dificultad: "alta"
  },
  {
    id: "EXP002",
    nombre: "Lago Llanquihue",
    tipo: "kayak",
    duracionDias: 3,
    precioBase: 195000,
    cupoMaximo: 8,
    dificultad: "media"
  },
  {
    id: "EXP003",
    nombre: "Torres del Paine",
    tipo: "trekking",
    duracionDias: 7,
    precioBase: 450000,
    cupoMaximo: 10,
    dificultad: "alta"
  },
  {
    id: "EXP004",
    nombre: "Río Futaleufú",
    tipo: "rafting",
    duracionDias: 2,
    precioBase: 150000,
    cupoMaximo: 15,
    dificultad: "alta"
  },
  {
    id: "EXP005",
    nombre: "Reserva Nonguén",
    tipo: "trekking",
    duracionDias: 1,
    precioBase: 45000,
    cupoMaximo: 20,
    dificultad: "baja"
  },
  {
    id: "EXP006",
    nombre: "Volcán Villarrica",
    tipo: "escalada",
    duracionDias: 2,
    precioBase: 320000,
    cupoMaximo: 6,
    dificultad: "alta"
  },
  {
    id: "EXP007",
    nombre: "Lago Conguillio",
    tipo: "kayak",
    duracionDias: 2,
    precioBase: 130000,
    cupoMaximo: 10,
    dificultad: "baja"
  },
  {
    id: "EXP008",
    nombre: "Atacama Extremo",
    tipo: "trekking",
    duracionDias: 6,
    precioBase: 520000,
    cupoMaximo: 8,
    dificultad: "alta"
  }
];

// Reservas realizadas
let reservas = [
  {
    id: "RES001",
    expedicionId: "EXP001",
    cliente: "Carlos Mendoza",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES002",
    expedicionId: "EXP003",
    cliente: "Ana Torres",
    personas: 4,
    estado: "confirmada",
    metodoPago: "transferencia"
  },
  {
    id: "RES003",
    expedicionId: "EXP001",
    cliente: "Pedro Soto",
    personas: 3,
    estado: "cancelada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES004",
    expedicionId: "EXP005",
    cliente: "María González",
    personas: 1,
    estado: "confirmada",
    metodoPago: "efectivo"
  },
  {
    id: "RES005",
    expedicionId: "EXP002",
    cliente: "Juan Pérez",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES006",
    expedicionId: "EXP006",
    cliente: "Sofía Ramírez",
    personas: 2,
    estado: "confirmada",
    metodoPago: "transferencia"
  },
  {
    id: "RES007",
    expedicionId: "EXP003",
    cliente: "Diego Fuentes",
    personas: 3,
    estado: "pendiente",
    metodoPago: "tarjeta"
  },
  {
    id: "RES008",
    expedicionId: "EXP008",
    cliente: "Valentina Cruz",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES009",
    expedicionId: "EXP001",
    cliente: "Andrés Morales",
    personas: 4,
    estado: "confirmada",
    metodoPago: "transferencia"
  },
  {
    id: "RES010",
    expedicionId: "EXP004",
    cliente: "Lucía Vega",
    personas: 5,
    estado: "confirmada",
    metodoPago: "efectivo"
  },
  {
    id: "RES011",
    expedicionId: "EXP005",
    cliente: "Roberto Silva",
    personas: 3,
    estado: "cancelada",
    metodoPago: "tarjeta"
  },
  {
    id: "RES012",
    expedicionId: "EXP007",
    cliente: "Camila Herrera",
    personas: 2,
    estado: "confirmada",
    metodoPago: "tarjeta"
  }
];
```

---

## Lo que debe hacer el sistema

### MÓDULO 1 — Catálogo de Expediciones

**1.1** Lista todas las expediciones de tipo `"trekking"` ordenadas por precio de menor a mayor.

**1.2** Encuentra la expedición más cara y la más económica del catálogo completo.

**1.3** Calcula el precio promedio de todas las expediciones.

**1.4** Lista las expediciones con dificultad `"alta"` que duren 3 días o menos.

---

### MÓDULO 2 — Análisis de Reservas

**2.1** Separa las reservas en tres grupos: confirmadas, pendientes y canceladas.

**2.2** Calcula el ingreso total generado por reservas confirmadas.

> El ingreso de una reserva = `precioBase` de la expedición × `personas` de la reserva.
> Para esto necesitas conectar cada reserva con su expedición.

**2.3** Cuenta cuántas personas en total participarán en expediciones confirmadas.

**2.4** Encuentra cuál es el método de pago más usado en reservas confirmadas.

---

### MÓDULO 3 — Estado de Ocupación

**3.1** Para cada expedición, calcula cuántos cupos están ocupados (suma de personas en reservas confirmadas de esa expedición).

**3.2** Identifica qué expediciones tienen el 50% o más de su cupo ocupado.

**3.3** Identifica qué expediciones no tienen ninguna reserva confirmada.

---

### MÓDULO 4 — Reporte de Gerencia

Genera este reporte con un único `console.log` al final:

```
=== TERRAMATER PRO — REPORTE EJECUTIVO ===

📋 CATÁLOGO
Expediciones disponibles: 8
Precio promedio: $261.250
Más cara: Atacama Extremo ($520.000)
Más económica: Reserva Nonguén ($45.000)
Expediciones de trekking: 4

💰 INGRESOS
Reservas confirmadas: 9
Ingresos totales: $[calcular]
Personas confirmadas: [calcular]
Método de pago más usado: tarjeta

📊 OCUPACIÓN
Expediciones con 50%+ de ocupación: [calcular]
Expediciones sin reservas confirmadas: [calcular]

🏆 TOP EXPEDICIÓN
[nombre de la expedición con más ingresos generados]
Ingresos: $[monto]
```

---

## Requisitos técnicos

```
✅ Usar filter, map y reduce donde corresponda
✅ Conectar reservas con expediciones usando find o filter
✅ Usar Object.entries o Object.keys cuando sea necesario
✅ Precios con .toLocaleString("es-CL")
✅ Funciones para lógica reutilizable (no repetir código)
✅ Código organizado — cada módulo claramente separado con comentarios
❌ No hardcodear valores que deberían calcularse
❌ No usar bucles for para lo que puede hacerse con map/filter/reduce
```

---

## Criterios de aprobación

```
□ El programa corre sin errores
□ Módulo 1 completo y correcto
□ Módulo 2 completo — especialmente la conexión reserva → expedición
□ Módulo 3 completo — ocupación por expedición calculada correctamente
□ Módulo 4 — reporte final con todos los valores correctos
□ Código organizado y legible
□ Subido a GitHub con commit descriptivo
```

---

## La parte más desafiante

El punto **2.2** y el **3.1** requieren conectar dos arrays distintos — `reservas` y `expediciones` — usando el `expedicionId`. Eso es algo nuevo que no apareció en ningún proyecto semanal anterior.

Es la parte que más se parece al trabajo real: raramente los datos que necesitas están todos en un mismo lugar.

---

_Proyecto Integrador Mes 1 — TerraMater Pro_
_Integra: Semanas 1 + 2 + 3 + 4_
_Experimento — pendiente de evaluación tras completarlo_
