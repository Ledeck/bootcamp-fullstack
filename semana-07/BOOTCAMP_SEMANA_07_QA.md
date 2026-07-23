# BOOTCAMP SEMANA 07 — REPORTE DE QA
## Documento interno — No es material de estudio

---

## FASE 0 — Delimitación Curricular

**Entra esta semana:**
- Repaso de comandos básicos (add, commit, push, pull, status, log)
- Ramas: crear (branch), cambiar (switch/checkout), listar, eliminar
- Convenciones de nombres de ramas (feature/, fix/, hotfix/, refactor/, chore/)
- Merge: fast-forward y merge commit, diferencia entre ambos
- Resolución de conflictos de merge: marcadores, resolución manual, git add + commit
- git stash: push, pop, apply, list, drop, clear
- Comandos de inspección: log con flags, show, diff, blame, log -S
- Rebase básico: actualizar rama desde main
- Rebase interactivo: squash, reword, drop
- Regla crítica del rebase: nunca en ramas compartidas
- Conventional Commits: formato y tipos principales
- Pull Requests: concepto, flujo, cómo escribir una buena descripción
- Flujo profesional completo: main → rama → desarrollo → PR → merge → limpieza

**Queda explícitamente fuera:**
- Cherry-pick (avanzado — seleccionar commits específicos entre ramas)
- Bisect (avanzado — encontrar el commit que introdujo un bug)
- Submodules (avanzado — repositorios anidados)
- Git hooks en profundidad (mención en FLUJO.md, no se profundiza)
- GitHub Actions (Semana 11 — CI/CD)
- GitLab / Bitbucket como alternativas (se menciona que existen, no se enseñan)
- Signed commits / GPG (innecesario para el nivel actual)
- Git LFS (Large File Storage — fuera del alcance)

**Competencias futuras que dependen de este conocimiento:**
- Flujo de ramas → forma de trabajar en cualquier empresa desde el primer día
- Pull Requests → proceso estándar de code review en equipos profesionales
- Conventional Commits → base para changelogs automáticos y CI/CD
- Rebase → mantener historial limpio en proyectos largos como Nexus
- git stash → indispensable cuando llegan interrupciones durante el desarrollo

---

## FASE 1 — Investigación

**Fuentes consultadas:**
- Documentación oficial de Git (git-scm.com)
- GitHub Docs — Pull Requests
- Conventional Commits specification (conventionalcommits.org)

**Hallazgos relevantes:**

1. **git switch vs git checkout**: `git switch` fue introducido en Git 2.23 (2019) como alternativa más clara a `git checkout` para cambiar de rama. `git checkout` sigue funcionando y es ampliamente conocido. El material presenta `git switch` como el comando moderno y menciona `git checkout` como alternativa para reconocerlo en tutoriales más antiguos. Git 2.23 está disponible en cualquier instalación reciente — no hay riesgo de compatibilidad.

2. **Fast-forward merge**: Confirmado que Git hace fast-forward automáticamente cuando es posible (cuando la rama destino no avanzó desde que se creó la rama origen). La flag `--no-ff` fuerza un merge commit. Ambos comportamientos están correctamente documentados.

3. **Conflictos de merge**: Los marcadores `<<<<<<<`, `=======`, `>>>>>>>` son estándar de Git. La resolución manual (editar, eliminar marcadores, git add, git commit) es el proceso correcto. Se documenta también `git merge --abort` para cancelar.

4. **git stash -u**: La flag `-u` (o `--include-untracked`) es necesaria para incluir archivos nuevos que aún no están tracked. Sin ella, solo se guardan archivos tracked con cambios. Se incluye en el material porque es un error frecuente cuando se crean archivos nuevos.

5. **Rebase interactivo en editor**: El editor que abre `git rebase -i` depende de la configuración de Git (por defecto vim en sistemas Unix). En Windows con Cursor configurado como editor, puede abrirse en Cursor. Se agrega nota implícita al mencionar que "abre un editor".

6. **Conventional Commits**: El estándar está en conventionalcommits.org. Los tipos principales documentados son correctos. Hay tipos adicionales (perf, ci, build, etc.) que se omiten por Mínima Suficiencia.

7. **PR desde GitHub**: El merge desde la interfaz de GitHub es la práctica correcta en equipos — permite squash merge, rebase merge o merge commit desde la UI. El material indica "merge desde GitHub" sin especificar el tipo para no agregar complejidad innecesaria.

---

## FASE 4 — Hallazgos de Revisión Técnica

**Correcciones realizadas:**

1. **`git commit -am`**: Se usa en el ejercicio de conflictos. Esta combinación de flags hace `git add` de archivos tracked y `git commit` en un solo paso. Es correcta pero solo funciona para archivos ya tracked — no para archivos nuevos. Se usa en el contexto correcto (modificando archivos existentes).

2. **`git push origin --delete`**: Confirmado como la sintaxis correcta para eliminar ramas remotas. Alternativa: `git push origin :nombre-rama` (sintaxis más antigua, menos clara).

3. **`git log -S`**: Confirmado que busca commits que introducen o eliminan el texto especificado (pickaxe search). Es case-sensitive por defecto.

4. **Rebase interactivo HEAD~3**: Confirmado que `HEAD~3` referencia los últimos 3 commits (HEAD, HEAD~1, HEAD~2). La tilde `~` indica "ancestro".

---

## FASE 7 — Hallazgos de Auditoría Adversarial

**Modelos mentales verificados:**

1. **"Una rama es una copia del proyecto"** — Riesgo de modelo mental incorrecto. El material explica explícitamente que una rama es un puntero a un commit, no una copia. Esto es importante para entender por qué crear ramas es instantáneo. ✅

2. **"Merge siempre crea un commit nuevo"** — Riesgo de modelo mental incorrecto. El material explica fast-forward vs merge commit con diagramas textuales. ✅

3. **"Rebase es igual que merge pero más limpio"** — Riesgo de modelo mental incorrecto. El material enfatiza la regla crítica: rebase reescribe el historial y no debe usarse en ramas compartidas. ✅

4. **"git stash guarda todo automáticamente"** — Riesgo de modelo mental parcialmente incorrecto. Sin `-u`, el stash no guarda archivos nuevos (untracked). Se documenta explícitamente con la flag `-u`. ✅

5. **"El PR es solo una formalidad para hacer merge"** — Riesgo de modelo mental que subestima el proceso. El material enfatiza que el PR es una conversación y que la descripción importa tanto como el código. ✅

6. **Punto detectado y corregido**: El ejercicio de conflicto intencional usaba `git commit -am` que no funciona si el archivo `saludo.js` aún no está tracked. Se verificó que en el contexto del ejercicio (el archivo ya existe desde el Día 1), el comando es correcto.

---

## FASE 8 — Checklist de Calidad

```
✅ Comandos verificados contra documentación oficial de Git
✅ Sin contradicciones internas
✅ Toda la sintaxis revisada
✅ Ejemplos ejecutables en la terminal
✅ Sin malas prácticas (rebase en main marcado como ❌)
✅ Terminología consistente (rama, merge, commit, PR)
✅ Progresión pedagógica lógica (ramas → merge → stash → rebase → PR → flujo completo)
✅ Sin conceptos sin contexto (cherry-pick, bisect explícitamente fuera del alcance)
✅ Explicaciones suficientes para el nivel actual de Óscar
✅ Coherencia con el roadmap (el flujo de esta semana es el que usará en Nexus)
✅ Carga cognitiva adecuada (un concepto por día, práctica real en terminal)
✅ Recomendaciones alineadas con industria 2026 (Conventional Commits, PR flow)
✅ Modelos mentales correctos y transferibles (verificados en Fase 7)
✅ Principio de Mínima Suficiencia respetado (cherry-pick, bisect, hooks excluidos)
✅ Sin tablas Markdown — comparaciones en prosa y bloques de código
```

---

*QA completado — Semana 07 lista para entrega*
*Julio 2026*
