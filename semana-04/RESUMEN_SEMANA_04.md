# ✅ RESUMEN SEMANA 04 — APROBADA
## Objetos · Propiedades · Métodos · Arrays de Objetos

---

> **Alumno:** Óscar
> **Fecha de aprobación:** Julio 2026
> **Veredicto:** ✅ APROBADO — listo para avanzar al Proyecto Integrador Mes 1

---

## Temas dominados

**Objetos fundamentales:**
- ✅ Crear objeto con propiedades de distintos tipos
- ✅ Acceso con punto vs corchetes — distinción precisa y cuándo usar cada uno
- ✅ Modificar, agregar y eliminar propiedades (`delete`)
- ✅ Propiedad inexistente → `undefined`, no error
- ✅ Operador `in` — diferencia con comparar contra `undefined`
- ✅ Métodos en objetos — funciones como valores de propiedades

**Object.keys / values / entries:**
- ✅ `Object.keys()` → array de claves
- ✅ `Object.values()` → array de valores
- ✅ `Object.entries()` → array de pares `[clave, valor]`
- ✅ Cuándo usar cada uno — según si necesitas clave, valor, o ambos
- ✅ `.join("\n")` para convertir array de strings en string con saltos de línea

**Arrays de objetos:**
- ✅ `filter` sobre arrays de objetos — retorna objetos completos, no valores
- ✅ `map` sobre arrays de objetos — extrae lo que retornes
- ✅ `reduce` con acumulador número — totales y promedios
- ✅ `reduce` con acumulador objeto completo — encontrar máximo/mínimo
- ✅ `reduce` con acumulador objeto vacío `{}` — contador dinámico por categoría (`acc[clave]`)
- ✅ Cuándo encadenar vs separar — encadenar si el resultado se usa una vez, separar si se reutiliza

**Patrones avanzados:**
- ✅ Contador dinámico con `acc[variable]` — sin hardcodear categorías
- ✅ Reutilizar variables calculadas (ej: `empleadosActivos` como base del reduce de departamentos)
- ✅ Construir texto dinámico con `Object.entries() + map + join("\n")`

---

## Proyecto completado

**NexusHR — Reporte de Equipo** ✅

```
✅ Total empleados con .length
✅ Activos e inactivos con filter
✅ Masa salarial total con reduce
✅ Salario promedio calculado
✅ Salario más alto y más bajo con reduce (acumulador objeto)
✅ Empleados activos por departamento con reduce dinámico
✅ Reporte de departamentos dinámico con Object.entries + map + join
✅ Empleados con más de 2 años de antigüedad con filter
✅ Reporte completo en un solo console.log
✅ Formato chileno con toLocaleString("es-CL")
```

---

## Mini-entrevista — resultados

| Pregunta | Resultado |
|---|---|
| Objeto vs array | ✅ distinción clara con contexto real |
| Object.entries() — definición y uso | ✅ completo y conectado al proyecto |
| map retorna array de strings | ✅ con corrección menor (pensó array de arrays) |
| Por qué usar empleadosActivos como base | ✅ razonamiento correcto |

---

## Convenciones profesionales incorporadas

- ✅ Sin caracteres especiales (ñ, tildes) en nombres de variables
- ✅ Nombres de parámetros descriptivos del elemento, no del filtro
- ✅ `return empleado.activo` en vez de `return empleado.activo === true`
- ✅ `!empleado.activo` en vez de `empleado.activo === false`
- ✅ Separar cálculos intermedios cuando se reutilizan

---

## Observaciones del tutor

Óscar completó la semana más técnicamente densa hasta ahora. El patrón de contador dinámico con `acc[clave]` requirió trabajo — no salió solo — pero lo comprendió a fondo con preguntas de primer principio. Demuestra el patrón consistente de no avanzar hasta entender el mecanismo completo. Identificó solo cuándo encadenar vs separar `filter + reduce`. 💪

**Pendiente de practicar:** el patrón `acc[clave]` con ejemplos variados hasta que salga sin referencia. Acordado para antes del Proyecto Integrador.

---

*Semana 04 completada y aprobada*
*Próximo: Práctica del patrón acc[clave] → Proyecto Integrador Mes 1 → Semana 05*
