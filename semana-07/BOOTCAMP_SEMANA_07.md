# 📘 BOOTCAMP SEMANA 07
## Git Profesional · Ramas · Merge · Rebase · Pull Requests · Flujo de Trabajo

---

> **Antes de empezar:** Lee la `CHEATSHEET_SEMANA_07.md` completa.
> **Recuerda:** Cuando termines cada día, avísame para validar antes de continuar.
>
> **Nota sobre esta semana:** Git no es JavaScript — es una herramienta de trabajo.
> Los ejercicios son más cortos que semanas anteriores porque lo importante
> es la práctica real en tu terminal, no escribir código.
> Todos los ejercicios se hacen en la terminal de Cursor.

---

## 🗓 DÍA 1 — RAMAS: EL CONCEPTO MÁS IMPORTANTE DE GIT

### 🎯 Objetivo
Entender qué son las ramas, por qué existen y dominar los comandos básicos para trabajarlas.

---

### 📖 El problema que resuelven las ramas

Imagina que estás trabajando en el proyecto NexusHR de la Semana 4. Tienes el código funcionando en `main`. Tu jefe te pide dos cosas simultáneamente:

1. Agregar un filtro por departamento al reporte
2. Corregir un bug en el cálculo de salarios

Si haces ambos cambios directamente en `main`, mezclas dos tareas distintas en el mismo historial. Si algo sale mal, no puedes revertir solo uno de los cambios.

Las ramas resuelven esto: cada tarea vive en su propio espacio independiente.

```
main:                  A → B → C
                              ↓
feature/filtro:               D → E → F
                              ↓
fix/calculo-salario:          G → H
```

Cuando cada tarea está lista y probada, se une a `main`. El código principal nunca se ve afectado por trabajo en progreso.

---

### 📖 Cómo funciona una rama internamente

Una rama no es una copia del código — es simplemente un puntero a un commit específico. Cuando haces un commit en una rama, el puntero avanza al nuevo commit.

Esto hace que crear y cambiar ramas sea casi instantáneo, independientemente del tamaño del proyecto.

---

### 📖 Los comandos esenciales

```bash
# Ver en qué rama estás y qué ramas existen
git branch

# Crear una rama nueva
git branch feature/nueva-funcionalidad

# Cambiar a una rama existente
git switch feature/nueva-funcionalidad
# (el comando antiguo que también funciona: git checkout feature/nueva-funcionalidad)

# Crear y cambiar en un solo paso — lo más común
git switch -c feature/nueva-funcionalidad

# Eliminar una rama (después de hacer merge)
git branch -d feature/nueva-funcionalidad

# Ver el historial con las ramas visualizadas
git log --oneline --graph --all
```

---

### 📖 La convención de nombres

En empresas profesionales, los nombres de ramas siguen un patrón:

```
feature/descripcion-corta    → nueva funcionalidad
fix/descripcion-del-bug      → corrección de error
hotfix/descripcion           → corrección urgente en producción
refactor/descripcion         → mejora de código sin nueva funcionalidad
chore/descripcion            → mantenimiento (actualizar dependencias, etc.)
```

Ejemplos reales:
```
feature/filtro-por-departamento
fix/calculo-iva-incorrecto
refactor/extraer-funcion-validacion
chore/actualizar-dependencias
```

---

### 🔗 Conexión con Next.js

En cualquier proyecto Next.js profesional, nunca trabajarás directamente en `main`. El flujo estándar es exactamente lo que aprendes hoy: crear una rama para cada feature o fix, desarrollar ahí, y luego integrar al código principal.

---

### 🛠 EJERCICIOS DÍA 1

Todos los ejercicios se hacen en la terminal de Cursor dentro de tu repositorio `bootcamp-fullstack`.

**Ejercicio 1**

Crea la siguiente estructura de ramas y verifica con `git log --oneline --graph --all`:

1. Asegúrate de estar en `main` con `git status`
2. Crea la rama `feature/experimento-ramas`
3. Cámbiala con `git switch feature/experimento-ramas`
4. Crea un archivo `experimento.txt` con cualquier contenido
5. Haz `git add .` y `git commit -m "chore: agregar archivo de experimento"`
6. Vuelve a `main` con `git switch main`
7. Verifica que `experimento.txt` NO existe en `main`
8. Ejecuta `git log --oneline --graph --all` y observa cómo se visualizan las ramas

---

**Ejercicio 2**

Practica el flujo completo de rama:

1. Desde `main`, crea y cambia a `feature/saludo-personalizado`
2. Crea el archivo `semana-07/saludo.js` con una función que reciba un nombre y retorne un saludo según la hora del día
3. Haz commit con mensaje descriptivo siguiendo Conventional Commits
4. Agrega una segunda función al mismo archivo que valide que el nombre no esté vacío
5. Haz un segundo commit — nota que tienes dos commits en esta rama
6. Ejecuta `git log --oneline` — deberías ver tus dos commits
7. Cambia a `main` y verifica que el archivo no está ahí

---

**Ejercicio 3**

Simula el escenario de trabajo en paralelo:

1. Desde `main`, crea `feature/calculadora`
2. Agrega `semana-07/calculadora.js` con funciones de suma y resta
3. Haz commit
4. Vuelve a `main` sin eliminar la rama
5. Desde `main`, crea `fix/corregir-saludo`
6. En esa rama, modifica `semana-07/saludo.js` cambiando algo menor
7. Haz commit
8. Ejecuta `git log --oneline --graph --all` — deberías ver tres ramas distintas

---

**Cuando termines avísame — valido el Día 1.** ✅

---

## 🗓 DÍA 2 — MERGE Y RESOLUCIÓN DE CONFLICTOS

### 🎯 Objetivo
Unir ramas correctamente y resolver conflictos cuando dos ramas modificaron el mismo archivo.

---

### 📖 Merge — unir el trabajo

Cuando una feature está lista, la integras a `main` con merge:

```bash
# Paso 1: posicionarte en la rama que RECIBE los cambios
git switch main

# Paso 2: traer los cambios de la otra rama
git merge feature/calculadora
```

El merge siempre se hace desde la rama destino, no desde la rama origen.

---

### 📖 Fast-forward vs Merge commit

Si `main` no avanzó mientras trabajabas en tu rama, Git hace un **fast-forward** — simplemente mueve el puntero de `main` hacia adelante. No crea un commit nuevo, el historial queda lineal.

```
Antes del merge:
main:        A → B
feature:         → C → D

Después (fast-forward):
main:        A → B → C → D
```

Si `main` sí avanzó mientras trabajabas (alguien más hizo commits), Git necesita crear un **merge commit** que une los dos historiales:

```
Antes del merge:
main:        A → B → E
feature:         → C → D

Después (merge commit M):
main:        A → B → E → M
                 ↑       ↑
                 └─ C → D ┘
```

Para forzar un merge commit aunque no sea necesario (para tener registro de cuándo se integró cada feature):

```bash
git merge --no-ff feature/calculadora
```

---

### 📖 Conflictos — cuándo ocurren y cómo resolverlos

Un conflicto ocurre cuando dos ramas modificaron **la misma línea** del mismo archivo. Git no puede decidir cuál versión conservar — te pide que decidas tú.

Cuando hay conflicto, el archivo afectado muestra marcadores:

```
<<<<<<< HEAD
función saludar con el código de main
=======
función saludar con el código de feature/corregir-saludo
>>>>>>> fix/corregir-saludo
```

Para resolver:
1. Abres el archivo en Cursor
2. Decides qué código conservar (puede ser uno, el otro, o una combinación)
3. Eliminas los marcadores `<<<<<<<`, `=======` y `>>>>>>>`
4. `git add archivo-resuelto.js`
5. `git commit` — Git genera el mensaje automáticamente

Si te arrepientes y quieres cancelar el merge:
```bash
git merge --abort
```

---

### 📖 Después del merge — limpieza

Una vez que la rama fue integrada, ya no la necesitas:

```bash
git branch -d feature/calculadora    # elimina la rama local
git push origin --delete feature/calculadora  # elimina la rama remota si la subiste
```

---

### 🛠 EJERCICIOS DÍA 2

**Ejercicio 1 — Merge sin conflicto**

1. Desde `main`, verifica que `feature/calculadora` existe con `git branch`
2. Haz merge de `feature/calculadora` en `main`
3. Verifica que los archivos de la rama ahora están en `main`
4. Elimina la rama `feature/calculadora`
5. Ejecuta `git log --oneline --graph --all` y observa el resultado

---

**Ejercicio 2 — Crear un conflicto intencional y resolverlo**

Este ejercicio es el más importante del día.

1. Asegúrate de estar en `main`
2. Modifica la primera línea de `semana-07/saludo.js` — agrega un comentario al inicio: `// Versión main`
3. Haz commit: `git commit -am "docs: agregar comentario versión main"`
4. Cambia a `fix/corregir-saludo` con `git switch fix/corregir-saludo`
5. Modifica la misma primera línea de `semana-07/saludo.js` — pero con otro texto: `// Versión feature`
6. Haz commit: `git commit -am "docs: agregar comentario versión feature"`
7. Vuelve a `main`: `git switch main`
8. Intenta hacer merge: `git merge fix/corregir-saludo`
9. Git reportará un conflicto — ábrelo en Cursor y resuélvelo
10. Completa el merge con `git add .` y `git commit`

---

**Ejercicio 3**

Haz merge de `feature/saludo-personalizado` en `main`. Antes de hacerlo, predice: ¿habrá conflicto? ¿Por qué sí o no?

---

**Cuando termines avísame — valido el Día 2.** ✅

---

## 🗓 DÍA 3 — GIT STASH Y COMANDOS DE INSPECCIÓN

### 🎯 Objetivo
Usar git stash para manejar trabajo incompleto y aprender a inspeccionar el historial con detalle.

---

### 📖 El problema que resuelve git stash

Estás trabajando en `feature/nueva-funcionalidad` con varios archivos modificados. De repente llega un bug urgente en producción — necesitas cambiar a `main` inmediatamente.

No puedes cambiar de rama con cambios sin commitear (Git te lo impide o te lo advierte). Tienes dos opciones:

1. Hacer un commit de trabajo incompleto — ensucia el historial
2. Usar `git stash` — guarda los cambios temporalmente y deja el directorio limpio

```bash
# Guarda todos los cambios actuales
git stash

# Tu directorio queda limpio — puedes cambiar de rama
git switch main
# ... resuelves el bug urgente ...
git switch feature/nueva-funcionalidad

# Recuperas tus cambios donde los dejaste
git stash pop
```

---

### 📖 Los comandos de stash

```bash
git stash                        # guarda cambios (tracked files)
git stash -u                     # guarda también archivos nuevos (untracked)
git stash push -m "descripción"  # guarda con descripción útil

git stash list                   # lista todos los stashes guardados
# stash@{0}: descripción más reciente
# stash@{1}: descripción anterior

git stash pop                    # recupera el más reciente y lo elimina de la lista
git stash apply stash@{1}        # recupera uno específico sin eliminarlo
git stash drop stash@{0}         # elimina un stash sin recuperarlo
git stash clear                  # elimina todos los stashes
```

---

### 📖 Comandos de inspección — entender el historial

```bash
# Historial básico
git log --oneline

# Historial con ramas visualizadas
git log --oneline --graph --all

# Ver qué cambió en un commit específico
git show abc1234

# Ver diferencias entre el working directory y staging
git diff

# Ver diferencias entre staging y el último commit
git diff --staged

# Ver diferencias entre dos ramas
git diff main..feature/nueva-funcionalidad

# Ver quién modificó cada línea de un archivo
git blame semana-07/saludo.js

# Buscar en el historial el commit que introdujo un texto
git log -S "texto que buscas"
```

---

### 📖 git blame — para qué sirve realmente

`git blame` muestra, línea por línea, en qué commit fue modificada cada línea y por quién. En proyectos de equipo, es la herramienta para entender por qué una línea de código existe:

```bash
git blame semana-07/saludo.js
```

Output:
```
abc1234 (Oscar 2026-07-01) function saludar(nombre) {
def5678 (Oscar 2026-07-02)     if (!nombre) return "Hola"
abc1234 (Oscar 2026-07-01)     return `Hola, ${nombre}`
```

El nombre es irónico — no es para "culpar" sino para entender la historia de cada línea.

---

### 🛠 EJERCICIOS DÍA 3

**Ejercicio 1 — git stash**

1. Desde `main`, crea la rama `feature/nuevo-modulo` y cámbiate a ella
2. Crea el archivo `semana-07/modulo.js` y escribe algo de código (no hagas commit)
3. Modifica también `semana-07/saludo.js` sin hacer commit
4. Ejecuta `git status` — verifica que tienes cambios sin commitear
5. Ejecuta `git stash -u` para guardar todo incluyendo archivos nuevos
6. Ejecuta `git status` — el directorio debe estar limpio
7. Cambia a `main` y verifica que los archivos no están ahí
8. Vuelve a `feature/nuevo-modulo`
9. Ejecuta `git stash pop` y verifica que tus cambios volvieron

---

**Ejercicio 2 — Inspección del historial**

1. Ejecuta `git log --oneline --graph --all` y examina el historial completo de la semana
2. Toma nota del hash de un commit de hace dos días
3. Ejecuta `git show [hash]` y lee los cambios de ese commit
4. Ejecuta `git diff main..feature/nuevo-modulo` — ¿qué diferencias muestra?
5. Ejecuta `git blame semana-07/saludo.js` y lee el output

---

**Cuando termines avísame — valido el Día 3.** ✅

---

## 🗓 DÍA 4 — REBASE Y CONVENTIONAL COMMITS

### 🎯 Objetivo
Entender cuándo y cómo usar rebase para mantener un historial limpio, y adoptar el estándar de Conventional Commits.

---

### 📖 El problema que resuelve rebase

Llevas varios días trabajando en `feature/nuevo-modulo`. Mientras tanto, `main` recibió tres commits nuevos. Tu rama está "desactualizada":

```
main:               A → B → C → D → E
feature/nuevo-modulo:    → F → G
```

Si haces merge ahora, habrá un merge commit que "ensucia" el historial. Rebase reescribe tus commits para que partan desde el `main` más reciente:

```
Antes del rebase:
main:               A → B → C → D → E
feature/nuevo-modulo:    → F → G

Después del rebase:
main:               A → B → C → D → E
feature/nuevo-modulo:                → F' → G'
```

F' y G' son los mismos commits que F y G, pero "replantados" sobre E. El historial queda limpio y lineal.

```bash
# Estás en feature/nuevo-modulo
git rebase main
```

---

### 📖 La regla de oro del rebase

**Nunca hagas rebase en ramas que otros están usando.**

Rebase reescribe el historial — cambia los hashes de los commits. Si otra persona tiene esa rama, su historial quedará inconsistente con el tuyo y causará problemas serios.

```
✅ Rebase en tu rama local antes de abrir un PR
✅ Rebase en ramas que solo tú usas
❌ Rebase en main
❌ Rebase en ramas ya pusheadas que otros pueden estar usando
```

---

### 📖 Rebase interactivo — limpiar commits

Antes de abrir un PR, puedes limpiar tu historial con rebase interactivo:

```bash
# Los últimos 3 commits
git rebase -i HEAD~3
```

Abre un editor con algo así:

```
pick abc1234 feat: agregar función de saludo
pick def5678 fix: corregir typo
pick ghi9012 fix: otro typo pequeño
```

Puedes cambiar `pick` por:
- `reword` — cambiar solo el mensaje
- `squash` — combinar con el commit anterior (los dos typos se convierten en uno)
- `drop` — eliminar el commit

Resultado después de hacer squash de los dos últimos:

```
pick abc1234 feat: agregar función de saludo
pick def5678 fix: corregir typos en saludo
```

Un historial más limpio antes de que otros lo vean.

---

### 📖 Conventional Commits — el estándar de la industria

Los mensajes de commit siguen un formato que cualquier developer reconoce inmediatamente:

```
tipo(alcance opcional): descripción corta en minúsculas

Ejemplos:
feat: agregar filtro por departamento en reporte de empleados
fix: corregir cálculo de IVA cuando precio es 0
docs: actualizar README con instrucciones de instalación
refactor: extraer validación de email a función separada
test: agregar tests para función calcularDescuento
chore: actualizar dependencias a versiones más recientes
style: aplicar formato prettier a archivos de semana 4
```

Por qué importa:
- El historial se convierte en documentación legible
- Herramientas pueden generar changelogs automáticamente
- En tu primer trabajo, tus commits revelan tu nivel profesional

---

### 🛠 EJERCICIOS DÍA 4

**Ejercicio 1 — Actualizar rama con rebase**

1. Asegúrate de que `feature/nuevo-modulo` tiene al menos 2 commits
2. Cambia a `main` y haz un commit nuevo cualquiera (simula que alguien más trabajó)
3. Vuelve a `feature/nuevo-modulo`
4. Ejecuta `git rebase main`
5. Ejecuta `git log --oneline --graph --all` y observa cómo quedó el historial

---

**Ejercicio 2 — Rebase interactivo**

1. En `feature/nuevo-modulo`, haz 3 commits pequeños:
   - `git commit -m "wip: inicio de modulo"` (con cualquier cambio)
   - `git commit -m "wip: mas cambios"` (con cualquier cambio)
   - `git commit -m "wip: casi listo"` (con cualquier cambio)
2. Ejecuta `git rebase -i HEAD~3`
3. Combina los tres commits en uno con `squash`
4. Escribe un mensaje final con Conventional Commits: `feat: implementar módulo de utilidades`
5. Verifica con `git log --oneline` — los 3 commits se convirtieron en 1

---

**Ejercicio 3 — Revisión de mensajes**

Revisa el historial completo de tu repositorio con `git log --oneline`. Identifica los commits con mensajes poco descriptivos y anótalos — en el siguiente ejercicio los mejorarás.

---

**Cuando termines avísame — valido el Día 4.** ✅

---

## 🗓 DÍA 5 — PULL REQUESTS Y FLUJO PROFESIONAL

### 🎯 Objetivo
Entender el flujo completo de trabajo en equipo usando Pull Requests en GitHub.

---

### 📖 Qué es un Pull Request

Un Pull Request (PR) es una propuesta formal de cambio. Le dices al equipo: "terminé esta feature, revísenla antes de integrarla al código principal."

El nombre viene de la acción: le pides a los demás que "halen" (pull) tus cambios hacia la rama principal.

En proyectos personales, el PR es la oportunidad de revisar tu propio código con ojos frescos antes de integrarlo. Es un hábito profesional que vale la pena desarrollar aunque trabajes solo.

---

### 📖 El flujo completo

```bash
# 1. Sincronizar con main antes de empezar
git switch main
git pull origin main

# 2. Crear rama descriptiva
git switch -c feature/sistema-notificaciones

# 3. Desarrollar — commits frecuentes y descriptivos
git add .
git commit -m "feat: implementar cola de notificaciones"
git add .
git commit -m "feat: agregar tipos de notificación (email, sms, push)"
git add .
git commit -m "test: verificar que las notificaciones se envían correctamente"

# 4. Actualizar con los cambios de main (si main avanzó)
git rebase main

# 5. Subir la rama al remoto
git push origin feature/sistema-notificaciones

# 6. En GitHub: abrir el Pull Request
# 7. Esperar review → hacer cambios si se piden → merge
# 8. Limpiar
git switch main
git pull origin main
git branch -d feature/sistema-notificaciones
```

---

### 📖 Cómo escribir un buen Pull Request

La descripción de un PR es tan importante como el código. Una buena descripción incluye:

**Título:** Claro y descriptivo, mismo formato que Conventional Commits.
```
feat: implementar sistema de notificaciones para reservas de expediciones
```

**Descripción:**
```markdown
## ¿Qué hace este PR?
Implementa el módulo de notificaciones que envía confirmaciones
automáticas cuando una reserva es confirmada, modificada o cancelada.

## ¿Por qué?
Los clientes reportaban no recibir confirmación de sus reservas.
Issue #47

## ¿Cómo probarlo?
1. Crear una reserva nueva
2. Verificar que llega email de confirmación
3. Cancelar la reserva y verificar email de cancelación

## Cambios principales
- Cola de notificaciones con reintentos automáticos
- Plantillas de email para cada tipo de evento
- Logs de notificaciones enviadas
```

---

### 📖 Diferencia entre merge y merge con PR

Sin PR — directo:
```bash
git switch main
git merge feature/algo
git push origin main
```

Con PR — el flujo profesional:
```
Push de la rama → PR en GitHub → Review → Aprobación → Merge desde GitHub
```

La diferencia no es técnica — es de proceso. El PR crea un punto de revisión antes de integrar. En equipos, esto evita que código con bugs llegue a producción.

---

### 🛠 EJERCICIOS DÍA 5

**Ejercicio 1 — PR en tu propio repositorio**

1. Desde `main`, crea `feature/modulo-reportes`
2. Crea `semana-07/reportes.js` con al menos 3 funciones relacionadas con reportes
3. Haz commits descriptivos con Conventional Commits
4. Haz push de la rama: `git push origin feature/modulo-reportes`
5. Ve a github.com → tu repositorio → aparecerá un banner "Compare & pull request"
6. Abre el PR con:
   - Título descriptivo
   - Descripción explicando qué hace el módulo
7. Revisa el PR tú mismo — lee cada línea como si fuera de otra persona
8. Haz merge desde la interfaz de GitHub
9. En tu terminal: `git switch main` y `git pull origin main`
10. Verifica que los cambios están en tu `main` local

---

**Ejercicio 2 — Revisar el resultado final**

Ejecuta `git log --oneline --graph --all` y documenta en un comentario al inicio de `semana-07/reportes.js` el flujo que seguiste esta semana:

```javascript
/*
Flujo de trabajo seguido en semana-07:
1. Creé las ramas: ...
2. Hice merges de: ...
3. Resolví conflictos en: ...
4. Usé stash para: ...
5. El PR que abrí fue: ...
*/
```

---

**Cuando termines avísame — valido el Día 5.** ✅

---

## 🗓 DÍA 6 — PROYECTO FINAL

### 🏆 NexusFlow — Flujo de Trabajo Profesional

> El equipo de Nexus está creciendo y necesita estandarizar cómo trabajan con Git.
> Tu tarea es implementar tres features del sistema usando el flujo profesional completo:
> rama → desarrollo → commits descriptivos → PR → merge.
>
> Este proyecto no evalúa la calidad del código JavaScript — evalúa que dominas
> el flujo de trabajo con Git que usarás en tu primer trabajo.

---

### 📋 Las tres features a implementar

Cada feature se desarrolla en su propia rama, con su propio PR, siguiendo el flujo completo.

**Feature 1 — `feature/validador-expediciones`**

Archivo: `semana-07/validador-expediciones.js`

Implementa estas funciones:
- `validarNombreExpedicion(nombre)` → true si tiene entre 3 y 50 caracteres
- `validarPrecio(precio)` → true si es número positivo mayor a 0
- `validarCupo(cupo)` → true si es número entero entre 1 y 100
- `validarExpedicion(expedicion)` → valida el objeto completo, retorna `{ valido, errores[] }`

---

**Feature 2 — `feature/formateador-reportes`**

Archivo: `semana-07/formateador-reportes.js`

Implementa estas funciones:
- `formatearMoneda(monto)` → retorna string con formato `$XX.XXX`
- `formatearFecha(fecha)` → recibe Date, retorna `"DD/MM/YYYY"`
- `formatearPorcentaje(valor, total)` → retorna `"XX.X%"`
- `generarLineaReporte(etiqueta, valor)` → retorna `"Etiqueta: valor"` con padding para alinear

---

**Feature 3 — `feature/gestor-estado`**

Archivo: `semana-07/gestor-estado.js`

Implementa un gestor de estado simple:
- `crearEstado(estadoInicial)` → retorna un objeto con métodos `get()`, `set(nuevoEstado)` y `reset()`
- `get()` → retorna el estado actual
- `set(cambios)` → actualiza el estado (spread — no reemplaza todo, solo lo que cambia)
- `reset()` → vuelve al estado inicial

---

### 📋 Requisitos del flujo Git

```
Para cada feature:
✅ Crear rama desde main actualizado
✅ Al menos 2 commits por feature con Conventional Commits
✅ Push de la rama al remoto
✅ PR abierto con título y descripción descriptivos
✅ Merge desde GitHub
✅ Rama eliminada después del merge

Requisitos globales:
✅ git log --oneline --graph final debe mostrar los 3 PRs integrados
✅ main siempre sincronizado antes de crear la siguiente rama
✅ Usar git stash al menos una vez durante el proceso
```

---

### 📋 El entregable final

Además del código, crea `semana-07/FLUJO.md` con:

```markdown
# Flujo de trabajo Semana 07

## Ramas creadas
[lista]

## Pull Requests abiertos
[lista con URLs de GitHub]

## Dónde usé git stash
[descripción]

## Conflictos encontrados
[ninguno / descripción de cómo lo resolví]

## git log --oneline --graph (copia el output aquí)
[output]
```

---

### ✅ Criterios de aprobación

```
□ Las tres features están implementadas y funcionan
□ Cada feature tuvo su propia rama
□ Los mensajes de commit siguen Conventional Commits
□ Los tres PRs fueron abiertos en GitHub con descripción
□ El merge se hizo desde GitHub (no desde terminal)
□ main está actualizado con las tres features
□ FLUJO.md documenta el proceso
□ git stash fue usado al menos una vez
```

---

**Cuando termines el proyecto, avísame. Haremos la validación semanal interactiva.** 🎯

---

## 🗂 ARCHIVOS A ENTREGAR

```
📁 semana-07/
├── saludo.js                    (de los ejercicios)
├── calculadora.js               (de los ejercicios)
├── modulo.js                    (de los ejercicios)
├── reportes.js                  (ejercicio PR)
├── validador-expediciones.js    (feature 1)
├── formateador-reportes.js      (feature 2)
├── gestor-estado.js             (feature 3)
└── FLUJO.md                     (documentación del proceso)
```

---

> ### 📘 PRÓXIMA SEMANA
> **Semana 08:** HTML y CSS — Estructura, semántica, Flexbox, Grid, diseño responsive

---

*Semana 07 — Git Profesional*
*Formato v4 — Bootcamp autocontenido con Protocolo QA aplicado*
*Óscar — Full Stack Developer en formación 🇨🇱*
