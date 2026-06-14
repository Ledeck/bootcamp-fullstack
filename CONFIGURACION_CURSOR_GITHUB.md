# 🛠️ GUÍA DE CONFIGURACIÓN — CURSOR + GITHUB
## Tu plataforma de desarrollo, configurada correctamente desde el día 1

---

> **Para:** Óscar
> **Objetivo:** Configurar Cursor como tu editor principal, conectado a GitHub, sin pagar nada
> **Tiempo total estimado:** 45-60 minutos
> **Resultado final:** Un flujo de trabajo donde escribes código → guardas → subes a GitHub, sin fricción

---

## 📋 ANTES DE EMPEZAR — Revisión de lo que ya tienes

Basado en lo que me contaste, ya tienes:

```
✅ VS Code instalado
✅ Algunos plugins en VS Code (Prettier, ESLint, GitLens probablemente)
✅ Git configurado con tu nombre y email
✅ Cuenta de GitHub creada
✅ Primer repositorio (mi-primer-proyecto) ya en GitHub
✅ Cursor instalado
⬜ Cursor configurado y listo para trabajo diario
```

Vamos a completar lo que falta. 💪

---

## 🗓 PARTE 1 — IMPORTAR TU CONFIGURACIÓN DE VS CODE A CURSOR

### 🎯 Objetivo
Que Cursor tenga las mismas extensiones y configuraciones que ya tenías en VS Code, sin reinstalar nada manualmente.

---

### Paso 1.1 — Verificar si ya importaste la configuración

1. Abre **Cursor**
2. Presiona `Ctrl + Shift + X` para abrir el panel de extensiones
3. Mira si aparecen: **Prettier**, **ESLint**, **GitLens**

**Si aparecen** → ya se importaron, salta a la Parte 2 ✅
**Si NO aparecen** → continúa al Paso 1.2

---

### Paso 1.2 — Importar manualmente

1. En Cursor, presiona `Ctrl + Shift + P` (abre la paleta de comandos)
2. Escribe: `Import VS Code Settings`
3. Selecciona la opción que aparece
4. Cursor importará extensiones, temas y configuraciones automáticamente

> 💡 **Nota:** Si esta opción no aparece, no te preocupes — instalaremos manualmente las 3 extensiones esenciales en la Parte 3. Es rápido.

---

### ⚠️ Error común
> "No veo el ícono de extensiones"

En Cursor el ícono puede estar oculto. Usa siempre el atajo `Ctrl + Shift + X` — funciona sin importar la configuración visual.

---

## 🗓 PARTE 2 — CONFIGURAR GIT EN CURSOR

### 🎯 Objetivo
Verificar que Cursor puede comunicarse con Git y GitHub correctamente.

---

### Paso 2.1 — Verificar que Git está configurado

1. Abre la terminal en Cursor: `` Ctrl + ` ``
2. Escribe:
```bash
git config --global user.name
```
3. Debe mostrarte tu nombre (el que configuraste antes)

4. Escribe:
```bash
git config --global user.email
```
5. Debe mostrarte tu email de GitHub

**Si ambos muestran tu información** ✅ → continúa al Paso 2.2
**Si no muestran nada** → configura de nuevo:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@gmail.com"
```

---

### Paso 2.2 — Verificar el panel de Source Control

1. En Cursor, mira la barra vertical del lado izquierdo
2. Busca un ícono que parece **tres círculos conectados por líneas** (es el ícono de Git/Source Control)
3. También puedes abrirlo con `Ctrl + Shift + G`

Si abres una carpeta que tiene `git init` ejecutado, este panel mostrará los cambios de archivos.

> 💡 **Nota interesante:** Este panel es la versión visual de los comandos `git add`, `git commit` y `git push` que ya conoces. Vas a usar ambos — terminal para comandos rápidos, panel visual para revisar cambios antes de subirlos.

---

## 🗓 PARTE 3 — INSTALAR LAS 4 EXTENSIONES ESENCIALES

### 🎯 Objetivo
Tener exactamente las herramientas que necesitas, ni más ni menos. Nada de instalar 30 extensiones que nunca usarás.

---

### Cómo instalar una extensión (el proceso es igual para las 4)

1. `Ctrl + Shift + X`
2. Escribe el nombre en la barra de búsqueda
3. Click en **"Install"**
4. Listo

---

### Extensión 1 — Prettier - Code formatter

**Busca:** `Prettier - Code formatter`
**Autor:** Prettier
**Para qué sirve:** Formatea tu código automáticamente — indentación, comillas, espacios. Nunca más te preocupas por el formato.

---

### Extensión 2 — ESLint

**Busca:** `ESLint`
**Autor:** Microsoft
**Para qué sirve:** Detecta errores y malas prácticas en tu código antes de ejecutarlo.

---

### Extensión 3 — Live Server

**Busca:** `Live Server`
**Autor:** Ritwick Dey
**Para qué sirve:** Abre tus archivos HTML en el navegador automáticamente, y se actualiza cada vez que guardas. Esencial para cuando tu código use `alert`, `prompt`, `confirm`, o cualquier HTML.

---

### Extensión 4 — GitLens

**Busca:** `GitLens`
**Autor:** GitKraken
**Para qué sirve:** Te muestra quién cambió cada línea de código y cuándo — útil para ver tu propio historial de cambios.

---

### ⚠️ Error común
> "Instalé una extensión con nombre similar pero de otro autor"

Siempre verifica el **autor** antes de instalar. Hay imitaciones con nombres casi idénticos. Los autores correctos están listados arriba.

---

## 🗓 PARTE 4 — CONFIGURAR FORMATEO AUTOMÁTICO AL GUARDAR

### 🎯 Objetivo
Que cada vez que presiones `Ctrl + S`, tu código se formatee solo. Cero esfuerzo manual.

---

### Paso 4.1 — Abrir configuración de Cursor

1. `Ctrl + Shift + P`
2. Escribe: `Preferences: Open User Settings (JSON)`
3. Selecciona esa opción
4. Se abre un archivo llamado `settings.json`

---

### Paso 4.2 — Agregar la configuración

Dentro de las llaves `{ }`, agrega estas líneas:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.autoSave": "onFocusChange"
}
```

> 💡 Si ya hay contenido dentro de las llaves, agrega una coma `,` después de la última línea existente antes de pegar las nuevas.

---

### Paso 4.3 — Guardar el archivo

`Ctrl + S` en el archivo `settings.json`. Listo.

---

### Lo que esto significa para ti

```
Antes:  escribes código desordenado → te preocupas por el formato
Ahora:  escribes código → Ctrl+S → Cursor lo ordena automáticamente
```

---

## 🗓 PARTE 5 — TU FLUJO DE TRABAJO DIARIO COMPLETO

### 🎯 Objetivo
El procedimiento exacto que usarás cada día, desde abrir Cursor hasta subir tu código a GitHub.

---

### 📁 Paso 5.1 — Crear tu carpeta de trabajo principal

Esta será la carpeta donde vivirán TODOS tus proyectos del bootcamp.

1. Abre la terminal en Cursor (o en Windows: tecla `Windows` → escribe `cmd` → Enter)
2. Navega a donde quieras crear tu carpeta de trabajo, por ejemplo tu Escritorio:
```bash
cd Desktop
```
3. Crea la carpeta principal:
```bash
mkdir bootcamp-fullstack
cd bootcamp-fullstack
```
4. Inicializa Git:
```bash
git init
```

---

### 📁 Paso 5.2 — Crear el repositorio en GitHub

1. Ve a **github.com**
2. Click en **"New"** (botón verde) o el **"+"** arriba a la derecha
3. Configura:
```
Repository name: bootcamp-fullstack
Description: Mi camino a Full Stack Developer - 13 meses
Public ✅ (importante para tu portfolio)
NO marcar "Add a README"
```
4. Click **"Create repository"**

---

### 📁 Paso 5.3 — Conectar tu carpeta local con GitHub

GitHub te mostrará comandos. Cópialos y pégalos en tu terminal (van a verse parecidos a esto):

```bash
git remote add origin https://github.com/Ledeck/bootcamp-fullstack.git
git branch -M main
```

---

### 📁 Paso 5.4 — Abrir la carpeta en Cursor

1. En Cursor: `File` → `Open Folder`
2. Selecciona tu carpeta `bootcamp-fullstack`
3. Ahora Cursor tiene esta carpeta como tu espacio de trabajo

> 💡 **Desde ahora, SIEMPRE abres Cursor con esta carpeta.** Todos tus proyectos van adentro, organizados por semana.

---

### 📁 Paso 5.5 — Estructura de carpetas recomendada

Dentro de `bootcamp-fullstack`, crea una carpeta por semana:

```bash
mkdir semana-01
mkdir semana-02
mkdir semana-03
```

Tu estructura final se verá así:

```
bootcamp-fullstack/
├── semana-01/
│   ├── kiosco_doite.js
│   ├── CHECKPOINT_SEMANA_01.md
│   └── REGISTRO_SEMANA_01.md
├── semana-02/
│   ├── dia01_ejercicio01.js
│   ├── dia01_ejercicio02.js
│   ├── ...
│   └── cotizador_terramater.js
└── semana-03/
    └── ...
```

---

### 🔄 Paso 5.6 — EL FLUJO DIARIO (memorízalo)

Cada vez que termines de trabajar:

```bash
git add .
git commit -m "Descripción de lo que hiciste"
git push
```

**La primera vez** que hagas push, usa:
```bash
git push -u origin main
```
Después de la primera vez, solo `git push` es suficiente.

---

### 📝 Ejemplos de buenos mensajes de commit

```bash
git commit -m "Completa ejercicios dia 1 - bucles semana 2"
git commit -m "Agrega cotizador TerraMater - proyecto final semana 2"
git commit -m "Resuelve checkpoint semana 2"
git commit -m "Fix: corrige calculo de descuento en cotizador"
```

> 💡 **Nota interesante:** Los mensajes de commit en inglés son el estándar en la industria, pero al inicio escribirlos en español está perfectamente bien. Lo importante es que sean descriptivos. Cuando llegues a Mes 4-5, empieza a escribirlos en inglés para practicar.

---

## 🗓 PARTE 6 — CÓMO CORRER TUS PROGRAMAS (REPASO + EXPANSIÓN)

### Para archivos `.js` puros (sin alert/prompt/confirm)

```bash
node nombre-archivo.js
```

Ejemplo:
```bash
cd semana-03
node dia01_ejercicio01.js
```

---

### Para archivos con `alert`, `prompt`, `confirm`, o HTML

1. Crea un `index.html` en la misma carpeta:
```html
<!DOCTYPE html>
<html>
<body>
  <script src="tu-archivo.js"></script>
</body>
</html>
```

2. Click derecho en `index.html` → **"Open with Live Server"**

3. El navegador se abre solo y muestra el resultado

---

### ⚠️ Error común
> "node no se reconoce como comando"

Esto significa que Node.js no está instalado o no está en el PATH. Verifica con:
```bash
node --version
```
Si no muestra una versión, reinstala Node.js desde nodejs.org (versión LTS).

---

## 🗓 PARTE 7 — ATAJOS DE TECLADO ESENCIALES

| Atajo | Qué hace |
|---|---|
| `` Ctrl + ` `` | Abrir/cerrar terminal |
| `Ctrl + S` | Guardar (y formatear automáticamente) |
| `Ctrl + P` | Buscar y abrir archivo rápido |
| `Ctrl + Shift + E` | Panel de archivos |
| `Ctrl + Shift + G` | Panel de Git/Source Control |
| `Ctrl + Shift + X` | Panel de extensiones |
| `Ctrl + /` | Comentar/descomentar línea de código |
| `Alt + ↑ / ↓` | Mover línea de código arriba/abajo |
| `Ctrl + D` | Seleccionar siguiente ocurrencia de la palabra |

> 💡 No memorices todos ahora. `` Ctrl + ` ``, `Ctrl + S` y `Ctrl + P` son los que usarás constantemente desde el día 1.

---

## ✅ CHECKLIST FINAL DE CONFIGURACIÓN

Marca cada uno cuando lo completes:

- [ ] Extensiones importadas o instaladas (Prettier, ESLint, Live Server, GitLens)
- [ ] `git config --global user.name` muestra tu nombre
- [ ] `git config --global user.email` muestra tu email
- [ ] `formatOnSave` configurado en `settings.json`
- [ ] Carpeta `bootcamp-fullstack` creada
- [ ] Repositorio `bootcamp-fullstack` creado en GitHub
- [ ] Carpeta local conectada con GitHub (`git remote add origin...`)
- [ ] Carpetas `semana-01`, `semana-02`, `semana-03` creadas
- [ ] Primer `git push` exitoso desde esta nueva carpeta
- [ ] Probaste correr un archivo `.js` con `node`
- [ ] Probaste abrir un `.html` con Live Server

---

## 🚫 SOBRE LA IA EN CURSOR — TU DECISIÓN ES CORRECTA

Mencionaste que no quieres pagar por IA en Cursor al principio. Esa decisión es acertada por estas razones:

```
1. Ya tienes tutor ilimitado (yo) sin costo extra
2. La IA de Cursor sin pagar tiene límites diarios pero funciona
3. Depender de IA para escribir código en Mes 1 = no aprendes los fundamentos
4. El plan completo de Mes 1-3 NO requiere IA generativa de código
```

**Cuándo reconsiderar:** Mes 4-5, cuando empieces Next.js y el volumen de código aumente. Ahí la IA de Cursor (con su plan gratuito limitado) puede ayudarte a entender errores más rápido. Pero ni siquiera ahí es obligatorio — yo sigo disponible. 😄

---

## 🎯 RESUMEN — TU NUEVO FLUJO DE TRABAJO

```
1. Abrir Cursor
2. La carpeta bootcamp-fullstack ya está abierta (Cursor recuerda la última carpeta)
3. Crear/abrir archivo dentro de la carpeta de la semana correspondiente
4. Escribir código
5. Ctrl+S (se formatea solo)
6. node archivo.js  O  Live Server si usa alert/prompt/confirm
7. Al terminar la sesión:
   git add .
   git commit -m "mensaje descriptivo"
   git push
```

Ese es tu ciclo. Para siempre. Desde Mes 1 hasta Mes 13. 💪

---

## 🚀 SIGUIENTE PASO

Una vez completado este checklist, estás 100% listo para:

1. Mover los archivos de Semana 1 y Semana 2 (si ya los hiciste) a esta nueva estructura
2. Continuar con Semana 2 si no la terminaste
3. Avanzar a Semana 3

Y cuando quieras, seguimos con la mejora de calidad de los próximos bootcamps que discutimos. 😄

---

*Guía generada específicamente para Óscar — Full Stack Developer en formación 🇨🇱*
*Configuración: Cursor + Git + GitHub — sin costos adicionales*
