import { cargarDashboard, obtenerReporteGuia } from "./nexus.js";

const dashboard = await cargarDashboard();

const guiasRegistrados = dashboard.guias.length;
const reportesTotales = dashboard.reportes.length;
const tareasPendientes = dashboard.tareasPendientes.length;

const guia = await obtenerReporteGuia(1);

const nombre = guia.datosGuia.name;
const reportes = guia.reportesGuia.length;

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
   Entradas activas: 
   [lista de URLs en caché con tiempo restante]

`
);
