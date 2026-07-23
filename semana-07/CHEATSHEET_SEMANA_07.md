# CHEAT SHEET — SEMANA 07
## Git Profesional · Ramas · Merge · Rebase · Pull Requests · Flujo de Trabajo

> Lee esto ANTES de empezar los ejercicios.
> Git es la herramienta que usarás todos los días de tu carrera.
> Esta semana pasa de "guardar cambios" a "trabajar como un profesional".

---

## REPASO — LOS COMANDOS QUE YA CONOCES

```bash
git init                    # inicializar repositorio
git add .                   # agregar todos los cambios al staging
git add archivo.js          # agregar un archivo específico
git commit -m "mensaje"     # guardar snapshot con mensaje
git push origin main        # subir cambios al remoto
git pull origin main        # traer cambios del remoto
git status                  # ver estado actual
git log --oneline           # historial resumido
```

---

## RAMAS (BRANCHES)

Una rama es una línea de desarrollo independiente. Permite trabajar en una feature sin afectar el código principal.

```bash
# Crear una rama
git branch nombre-rama

# Crear y cambiar a la nueva rama en un solo comando
git checkout -b nombre-rama
# Equivalente moderno:
git switch -c nombre-rama

# Cambiar a una rama existente
git checkout nombre-rama
git switch nombre-rama          # comando moderno

# Ver todas las ramas
git branch                      # ramas locales
git branch -a                   # locales y remotas

# Eliminar una rama (después de hacer merge)
git branch -d nombre-rama       # seguro — falla si hay cambios sin merge
git branch -D nombre-rama       # forzado — elimina aunque haya cambios

# Subir una rama al remoto
git push origin nombre-rama
```

**Convenciones de nombres:**
```
feature/nombre-feature    → nueva funcionalidad
fix/descripcion-bug       → corrección de error
hotfix/descripcion        → corrección urgente en producción
chore/tarea               → tareas de mantenimiento
refactor/descripcion      → refactorización sin nueva funcionalidad
```

**Idea mental:** Las ramas son como universos paralelos del mismo proyecto. Puedes experimentar en una rama sin romper el universo principal.

---

## MERGE — UNIR RAMAS

```bash
# Primero: posicionarte en la rama que RECIBE los cambios
git checkout main

# Luego: traer los cambios de otra rama
git merge nombre-rama
```

**Dos tipos de merge:**

```
Fast-forward (sin divergencia):
main:    A → B
feature:         → C → D
resultado: A → B → C → D
(No crea commit de merge — el historial queda lineal)

Merge commit (con divergencia):
main:    A → B → E
feature:     → C → D
resultado: A → B → E → M (M es el commit de merge)
           ↑       ↑   ↑
           └── C → D ──┘
```

**Forzar merge commit (para tener registro):**
```bash
git merge --no-ff nombre-rama
```

---

## CONFLICTOS DE MERGE

Un conflicto ocurre cuando dos ramas modificaron la misma línea del mismo archivo:

```
<<<<<<< HEAD
código de tu rama actual (main)
=======
código de la otra rama (feature)
>>>>>>> feature/nueva-funcionalidad
```

**Para resolver:**
1. Editar el archivo — elegir qué código conservar (o combinarlo)
2. Eliminar los marcadores `<<<<<<<`, `=======`, `>>>>>>>`
3. `git add archivo-resuelto.js`
4. `git commit` (sin -m — Git genera el mensaje automáticamente)

**Para abortar un merge en proceso:**
```bash
git merge --abort
```

---

## GIT STASH — GUARDAR TRABAJO TEMPORAL

Guarda los cambios actuales sin hacer commit, para poder cambiar de rama:

```bash
git stash                   # guarda cambios en pila
git stash push -m "mensaje" # guarda con descripción
git stash list              # ver los stashes guardados
git stash pop               # recuperar el más reciente y eliminarlo de la pila
git stash apply stash@{0}   # recuperar sin eliminarlo de la pila
git stash drop stash@{0}    # eliminar un stash específico
git stash clear             # eliminar todos los stashes
```

**Cuándo usarlo:** Estás trabajando en algo, llega un bug urgente, necesitas cambiar de rama pero no quieres hacer commit de trabajo incompleto.

**Idea mental:** El stash es como un cajón donde guardas el trabajo temporalmente para tener el escritorio limpio.

---

## REBASE — REESCRIBIR HISTORIAL

Rebase mueve los commits de una rama para que partan desde el punto más reciente de otra:

```bash
# Estás en feature/nueva-funcionalidad
git rebase main
# Tus commits se "replantean" sobre el main más reciente
```

**Rebase interactivo — limpiar commits antes de merge:**
```bash
git rebase -i HEAD~3    # los últimos 3 commits

# Abre un editor con opciones:
# pick   → mantener el commit tal cual
# reword → mantener pero cambiar el mensaje
# squash → combinar con el commit anterior
# drop   → eliminar el commit
```

**Regla crítica — NUNCA hacer rebase en ramas compartidas:**
```
❌ git rebase en main (si otros trabajan en main)
❌ git rebase en ramas que ya pusheaste y otros usan

✅ git rebase solo en tu rama local antes de hacer merge/PR
```

**Cuándo usar merge vs rebase:**
```
merge  → cuando quieres historial completo de cómo se desarrolló el trabajo
rebase → cuando quieres historial limpio y lineal antes de integrar
```

---

## COMANDOS DE INSPECCIÓN

```bash
# Ver historial con más detalle
git log --oneline --graph --all    # visual con ramas
git log --author="Oscar"           # commits de un autor
git log --since="2 weeks ago"      # commits recientes

# Ver qué cambió en un commit
git show abc1234                   # cambios del commit con ese hash

# Ver diferencias
git diff                           # cambios no en staging
git diff --staged                  # cambios en staging
git diff main..feature             # diferencias entre dos ramas

# Ver quién modificó cada línea
git blame archivo.js               # autor de cada línea

# Buscar un texto en el historial
git log -S "texto a buscar"        # commits que introducen ese texto
```

---

## FLUJO DE TRABAJO PROFESIONAL

### El flujo estándar en empresas:

```
1. Sincronizar con main
   git checkout main
   git pull origin main

2. Crear rama para la feature
   git checkout -b feature/nombre-descriptivo

3. Desarrollar y hacer commits frecuentes
   git add .
   git commit -m "feat: descripción clara del cambio"

4. Mantener la rama actualizada (si main avanzó)
   git rebase main

5. Subir la rama al remoto
   git push origin feature/nombre-descriptivo

6. Abrir Pull Request en GitHub

7. Code review → aprobación → merge

8. Eliminar la rama
   git branch -d feature/nombre-descriptivo
```

### Conventional Commits — mensajes estándar:

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato (sin cambios de lógica)
refactor: refactorización sin cambios funcionales
test: agregar o modificar tests
chore: tareas de mantenimiento
```

**Ejemplos:**
```
feat: agregar filtro por categoría en catálogo de expediciones
fix: corregir cálculo de IVA en checkout
docs: actualizar README con instrucciones de instalación
refactor: extraer lógica de validación a función separada
```

---

## PULL REQUESTS

Un Pull Request (PR) es una propuesta de cambio — le pides al equipo que "jale" (pull) tus cambios hacia la rama principal.

**El flujo:**
```
1. Subiste tu rama al remoto (git push origin feature/mi-feature)
2. En GitHub: "Compare & pull request"
3. Escribes:
   - Título descriptivo
   - Descripción: qué hiciste, por qué, cómo probarlo
   - Referencia a issues si corresponde (#123)
4. El equipo revisa el código
5. Puede pedir cambios → haces commits adicionales en la misma rama
6. Aprobado → merge → se elimina la rama
```

**En proyectos personales/solo:** El PR es la oportunidad de revisar tu propio código antes de mergearlo. Es un hábito profesional.

---

## ERRORES FRECUENTES

```bash
# ❌ Hacer push a main directamente (en proyectos de equipo)
git push origin main  # evitar — usar PR

# ❌ Mensaje de commit vago
git commit -m "cambios"    # ❌
git commit -m "arreglos"   # ❌
git commit -m "fix: corregir validación de email en formulario de reserva"  # ✅

# ❌ Hacer rebase en rama compartida
git rebase main  # mientras estás en main — peligroso si otros trabajan en main

# ❌ Olvidar sincronizar antes de crear rama
git checkout -b feature/algo  # sin hacer pull primero
# Tu rama parte desde un main desactualizado → conflictos innecesarios

# ✅ Siempre sincronizar primero
git checkout main
git pull origin main
git checkout -b feature/algo
```

---

## CHECKLIST DE DOMINIO

```
□ Puedo crear, cambiar y eliminar ramas
□ Entiendo la diferencia entre merge fast-forward y merge commit
□ Puedo resolver un conflicto de merge manualmente
□ Sé cuándo usar git stash y cómo recuperar el trabajo
□ Entiendo qué hace rebase y cuándo NO usarlo
□ Uso Conventional Commits en mis mensajes
□ Puedo abrir y describir un Pull Request
□ Sigo el flujo: main → rama → desarrollar → PR → merge
□ Puedo inspeccionar el historial con git log y git diff
```

---

## 🔥 LAS 5 IDEAS QUE JAMÁS DEBES OLVIDAR

**1. Nunca hagas rebase en ramas que otros están usando**
Rebase reescribe el historial. Si otros tienen esa rama, su historial quedará inconsistente con el tuyo. Rebase solo en ramas locales que no has compartido, o en tu rama de feature antes de hacer el PR.

**2. Los commits son para el futuro — mensajes descriptivos siempre**
"cambios" no le dice nada a tu yo del futuro ni a tus compañeros. Un buen mensaje de commit es una carta para quien lea el historial en 6 meses — puede ser tú mismo.

**3. El flujo correcto siempre empieza con git pull**
Antes de crear una rama, antes de hacer merge, antes de cualquier cosa — sincroniza con el remoto. Evita el 80% de los conflictos innecesarios.

**4. Una rama = una funcionalidad o tarea**
No acumules varias features en una sola rama. Si la rama se abandona o necesita revertirse, pierdes todo. Ramas pequeñas y enfocadas son más fáciles de revisar y de revertir.

**5. Los Pull Requests son conversaciones, no solo código**
La descripción del PR importa tanto como el código. Explica qué hiciste, por qué lo hiciste así, y cómo probarlo. En tu primer trabajo, la calidad de tus PRs dirá tanto sobre ti como la calidad del código.

---

*Cheat Sheet Semana 07 — Git Profesional*
*Leer antes de los ejercicios — consultar durante la semana*
