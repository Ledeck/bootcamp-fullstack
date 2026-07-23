let empresa = {
  nombre: "StartupMetrics",
  fundacion: 2020,
  sede: {
    pais: "Chile",
    ciudad: "Santiago",
    oficinas: 3
  },
  equipo: {
    total: 24,
    desarrolladores: 12,
    diseñadores: 4,
    marketing: 8
  },
  productos: ["Analytics Pro", "Dashboard Lite", "API Connect"]
};

console.log(`${empresa.nombre} se fundó en ${empresa.fundacion}, es una empresa con sede en ${empresa.sede.pais} la cual se ubica en ${empresa.sede.ciudad}.
El equipo cuanta con ${empresa.equipo.desarrolladores} desarrolladores`);
console.log(`El segundo producto de la lista es: ${empresa.productos[1]}
Productos totales: ${empresa.productos.length}`);
