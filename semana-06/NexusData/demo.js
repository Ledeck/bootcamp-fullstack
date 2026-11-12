import { cargarDashboard, obtenerReporteGuia } from "./nexus.js";
import { listarCache } from "./cache.js";

const dashboard = await cargarDashboard();

const guiasRegistrados = dashboard.guias.length;
const reportesTotales = dashboard.reportes.length;
const tareasPendientes = dashboard.tareasPendientes.length;

const guia = await obtenerReporteGuia(1);

const nombre = guia.datosGuia.name;
const reportes = guia.reportesGuia.length;

const listaUrlActivas = await listarCache();

console.log(
  `=== NEXUS DATA — REPORTE DEL SISTEMA ===

📊 Dashboard cargado:
   Guías registrados: ${guiasRegistrados}
   Reportes totales: ${reportesTotales}
   Tareas pendientes: ${tareasPendientes} 

👤 Reporte guía ID 1:
   Nombre: ${nombre}
   Reportes: ${reportes}

💾 Estado de caché:
   Entradas activas: ${listaUrlActivas.length}
   ${listaUrlActivas}
`
);
