# 🏢 NEXUS — DISEÑO NARRATIVO DEL PROYECTO
## El sistema que construirás durante 13 meses

> **Versión:** Prototipo narrativo — sin decisiones técnicas de implementación
> **Estado:** En evaluación — sujeto a ajustes a medida que avanza el roadmap

---

## ¿QUÉ ES NEXUS?

**Nexus** es una plataforma SaaS chilena de gestión de operaciones para empresas de turismo aventura y expediciones.

Resuelve un problema real y específico: las empresas de turismo aventura en Chile (desde operadores pequeños hasta empresas medianas) gestionan sus reservas, clientes, guías y pagos con hojas de cálculo, WhatsApp y correo electrónico. Nexus centraliza todo eso en una sola plataforma.

**Cliente objetivo de Nexus:** Empresas como TerraMater, Cascada Expediciones, Altué Expediciones — operadores de turismo aventura con 5 a 50 empleados.

---

## EL PRODUCTO COMPLETO

Nexus tiene cuatro grandes áreas:

```
1. GESTIÓN DE EXPEDICIONES
   Catálogo de expediciones, disponibilidad, cupos, precios

2. GESTIÓN DE RESERVAS Y CLIENTES
   Reservas online, historial de clientes, comunicaciones

3. GESTIÓN DE OPERACIONES
   Asignación de guías, equipamiento, logística

4. REPORTES Y ANALYTICS
   Dashboard con métricas de negocio, ingresos, ocupación
```

---

## CÓMO SE DIVIDE EN 13 MESES

### 📍 MES 1 — El Motor de Datos (JavaScript Puro)
**Lo que construyes:** El cerebro del sistema — lógica pura sin interfaz.

```
Módulo: Analizador de Expediciones
- Procesar catálogo de expediciones
- Analizar reservas y calcular ingresos
- Generar reportes de ocupación
- Conectar datos de múltiples fuentes (reservas ↔ expediciones)
```

**Por qué tiene sentido aquí:** Con solo JavaScript, puedes construir toda la lógica de negocio. En el mundo real, esta lógica vive en el backend — estás aprendiendo a pensar como un backend developer antes de tener las herramientas de backend.

**Resultado visible al final del mes:** Un programa que procesa datos reales y genera reportes ejecutivos en consola.

---

### 📍 MES 2 — JavaScript Moderno y Asincronía
**Lo que construyes:** El sistema aprende a comunicarse con el mundo exterior.

```
Módulo: Conector de Datos Externos
- Consumir una API pública de clima (para alertas de expediciones)
- Consumir una API de tipo de cambio (para precios en USD)
- Manejar errores de red y datos incompletos
- Procesar respuestas asíncronas con async/await
```

**Por qué tiene sentido aquí:** Las expediciones dependen del clima. Nexus necesita datos en tiempo real. Este módulo conecta la lógica del Mes 1 con datos del mundo real.

**Resultado visible:** El sistema puede consultar si hay alertas climáticas antes de confirmar una expedición.

---

### 📍 MES 3 — TypeScript
**Lo que construyes:** El sistema gana robustez y seguridad.

```
Módulo: Refactorización tipada del Motor de Datos
- Tipar todos los objetos del Mes 1 (Expedicion, Reserva, Cliente)
- Detectar errores de datos antes de que ocurran
- Crear interfaces que documentan el sistema
- El mismo sistema, pero imposible de romper por error de tipo
```

**Por qué tiene sentido aquí:** Refactorizar código existente con TypeScript es exactamente lo que hacen los equipos profesionales cuando migran un proyecto. Aprendes TypeScript en contexto real, no en ejercicios artificiales.

**Resultado visible:** El mismo sistema del Mes 1, pero con errores detectados en el editor antes de correr el código.

---

### 📍 MES 4 — React y Componentes
**Lo que construyes:** El sistema tiene cara por primera vez.

```
Módulo: Dashboard de Expediciones (versión 1)
- Mostrar el catálogo de expediciones en tarjetas
- Filtrar expediciones por tipo, dificultad y precio
- Ver el detalle de una expedición
- Interfaz limpia, sin base de datos todavía (datos en memoria)
```

**Por qué tiene sentido aquí:** La lógica del Mes 1 se convierte en componentes React. El `filter` y `map` que ya dominas son exactamente lo que usa React para renderizar listas.

**Resultado visible:** Una interfaz web real donde puedes ver y filtrar expediciones.

---

### 📍 MES 5 — Next.js y Routing
**Lo que construyes:** El dashboard se convierte en una aplicación web completa.

```
Módulo: Aplicación Nexus v1
- Página de inicio con resumen de expediciones
- Página de detalle por expedición (/expediciones/[id])
- Página de reservas
- Navegación entre páginas
- Diseño con Tailwind CSS
```

**Por qué tiene sentido aquí:** React te da los componentes, Next.js te da la estructura de la aplicación completa — rutas, páginas, navegación.

**Resultado visible:** Una aplicación web deployada en Vercel, accesible desde cualquier navegador.

---

### 📍 MES 6 — Formularios y Validación
**Lo que construyes:** Los usuarios pueden interactuar con el sistema.

```
Módulo: Sistema de Reservas Online
- Formulario de nueva reserva con validación
- Formulario de registro de cliente
- Validación de disponibilidad en tiempo real
- Mensajes de error claros y útiles
```

**Por qué tiene sentido aquí:** Una plataforma SaaS sin formularios es solo un catálogo. Este módulo convierte Nexus en una herramienta real donde los clientes pueden hacer reservas.

**Resultado visible:** Un usuario puede completar una reserva end-to-end desde el formulario.

---

### 📍 MES 7 — Estado Global
**Lo que construyes:** El sistema recuerda lo que el usuario hace.

```
Módulo: Carrito de Reservas y Sesión de Usuario
- Carrito de reservas que persiste entre páginas
- Notificaciones globales (reserva confirmada, error, etc.)
- Preferencias del usuario guardadas
- Estado compartido entre componentes lejanos
```

**Por qué tiene sentido aquí:** Sin estado global, cada página del dashboard es una isla. Este módulo conecta todas las páginas en una experiencia coherente.

**Resultado visible:** El usuario puede agregar expediciones al carrito desde cualquier página y el carrito persiste.

---

### 📍 MES 8 — Base de Datos y ORM
**Lo que construyes:** El sistema tiene memoria permanente.

```
Módulo: Persistencia de Datos
- Los datos de expediciones viven en PostgreSQL (no en memoria)
- Las reservas se guardan en la base de datos
- Los clientes tienen historial persistente
- Las consultas son eficientes y seguras
```

**Por qué tiene sentido aquí:** Hasta este punto, los datos se pierden al recargar la página. Este módulo da a Nexus memoria real — es el salto de "prototipo" a "aplicación real".

**Resultado visible:** Las reservas se guardan aunque cierres el navegador.

---

### 📍 MES 9 — API y Backend
**Lo que construyes:** El sistema puede hablar con el mundo exterior.

```
Módulo: API REST de Nexus
- Endpoints para expediciones, reservas y clientes
- Validación de datos en el servidor
- Manejo de errores HTTP
- El frontend consume la API en vez de datos en memoria
```

**Por qué tiene sentido aquí:** Separar frontend y backend es cómo se construyen las aplicaciones reales. Este módulo hace a Nexus una aplicación de arquitectura profesional.

**Resultado visible:** La API de Nexus puede ser consumida desde cualquier cliente — web, móvil, o Postman.

---

### 📍 MES 10 — Autenticación
**Lo que construyes:** El sistema sabe quién es cada usuario.

```
Módulo: Sistema de Usuarios y Permisos
- Registro e inicio de sesión
- Roles: administrador, guía, cliente
- Cada usuario ve solo lo que le corresponde
- Rutas protegidas
```

**Por qué tiene sentido aquí:** Sin autenticación, cualquiera puede ver y modificar cualquier dato. Este módulo convierte Nexus en una plataforma multi-usuario real.

**Resultado visible:** Un administrador ve el dashboard completo. Un cliente solo ve sus reservas.

---

### 📍 MES 11 — Testing y Calidad
**Lo que construyes:** El sistema puede verificarse a sí mismo.

```
Módulo: Suite de Tests de Nexus
- Tests unitarios de la lógica de negocio (Mes 1-3)
- Tests de integración de la API (Mes 9)
- Tests de componentes React (Mes 4-5)
- Pipeline de CI básico
```

**Por qué tiene sentido aquí:** Nexus ya es lo suficientemente complejo para que un cambio en un módulo rompa otro sin que te des cuenta. Los tests dan confianza para seguir desarrollando.

**Resultado visible:** Puedes hacer cambios en Nexus con confianza de que no rompiste nada.

---

### 📍 MES 12 — Optimización y Producción
**Lo que construyes:** El sistema está listo para usuarios reales.

```
Módulo: Nexus en Producción
- Optimización de rendimiento
- SEO básico
- Monitoreo de errores
- Variables de entorno y configuración de producción
- Deploy profesional en Vercel + Railway
```

**Por qué tiene sentido aquí:** Hay una diferencia enorme entre "funciona en mi máquina" y "funciona para 100 usuarios simultáneos". Este módulo cierra esa brecha.

**Resultado visible:** Nexus está disponible en una URL pública, rápido y estable.

---

### 📍 MES 13 — Proyecto Estrella
**Lo que construyes:** Tu versión de Nexus, diferenciada.

```
Módulo: Feature diferenciadora
- Una feature que tú eliges y diseñas
- Candidatos: integración con IA (Vercel AI SDK), 
  app móvil básica, sistema de pagos, reportes avanzados
- Presentación del proyecto completo
- README profesional
- Portfolio listo para entrevistas
```

**Por qué tiene sentido aquí:** El Mes 13 no es "más contenido" — es demostrar que puedes tomar decisiones de producto y técnicas por ti mismo. Eso es lo que diferencia a un developer junior contratado de uno que no consigue trabajo.

**Resultado visible:** Un proyecto completo, deployado, con una feature propia, en tu GitHub.

---

## EL ARCO NARRATIVO COMPLETO

```
Mes 1-2   → "Soy un programador que procesa datos"
Mes 3-4   → "Soy un developer que construye interfaces"
Mes 5-6   → "Soy un fullstack developer que construye aplicaciones"
Mes 7-9   → "Soy un developer que construye sistemas"
Mes 10-11 → "Soy un developer que construye con calidad profesional"
Mes 12-13 → "Soy un developer listo para trabajar"
```

---

## LO QUE ESTE DISEÑO NO DEFINE (INTENCIONALMENTE)

```
❌ Qué librería de autenticación (Clerk, NextAuth, Auth.js)
❌ Estructura exacta de la base de datos
❌ Decisiones de arquitectura de la API
❌ Stack exacto de testing
❌ La feature del Mes 13
```

Estas decisiones se toman cuando llegues a ese mes — con el criterio que habrás desarrollado para entonces.

---

## UNA ADVERTENCIA HONESTA

Este diseño narrativo asume que el roadmap se completa sin interrupciones mayores. En la práctica:

```
✅ La narrativa de Nexus es flexible — cada módulo puede ajustarse
✅ Si un mes toma más tiempo, el módulo siguiente se adapta
✅ Si cambias una decisión técnica, solo afecta los módulos siguientes
❌ Si abandonas el bootcamp a mitad, el sistema queda incompleto
   — pero eso aplica a cualquier diseño, no solo a este
```

---

*Nexus — Diseño narrativo del proyecto*
*Prototipo — Julio 2026*
*Sujeto a ajustes basados en evidencia real del aprendizaje*
