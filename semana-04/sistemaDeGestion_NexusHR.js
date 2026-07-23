let equipo = [
  {
    id: 1,
    nombre: "Ana Martínez",
    cargo: "Dev Senior",
    depto: "Ingeniería",
    salario: 2800000,
    aniosEmpresa: 4,
    activo: true
  },
  {
    id: 2,
    nombre: "Pedro Rojas",
    cargo: "Designer UX",
    depto: "Diseño",
    salario: 2100000,
    aniosEmpresa: 2,
    activo: true
  },
  {
    id: 3,
    nombre: "María González",
    cargo: "Dev Junior",
    depto: "Ingeniería",
    salario: 1500000,
    aniosEmpresa: 1,
    activo: true
  },
  {
    id: 4,
    nombre: "Juan Pérez",
    cargo: "Dev Senior",
    depto: "Ingeniería",
    salario: 2900000,
    aniosEmpresa: 6,
    activo: false
  },
  {
    id: 5,
    nombre: "Sofía Torres",
    cargo: "Mkt Manager",
    depto: "Marketing",
    salario: 2300000,
    aniosEmpresa: 3,
    activo: true
  },
  {
    id: 6,
    nombre: "Carlos Vega",
    cargo: "Dev Mid",
    depto: "Ingeniería",
    salario: 2000000,
    aniosEmpresa: 2,
    activo: true
  },
  {
    id: 7,
    nombre: "Lucía Morales",
    cargo: "Data Analyst",
    depto: "Datos",
    salario: 2400000,
    aniosEmpresa: 3,
    activo: true
  },
  {
    id: 8,
    nombre: "Diego Fuentes",
    cargo: "Designer UX",
    depto: "Diseño",
    salario: 2000000,
    aniosEmpresa: 1,
    activo: false
  },
  {
    id: 9,
    nombre: "Valentina Cruz",
    cargo: "Dev Junior",
    depto: "Ingeniería",
    salario: 1600000,
    aniosEmpresa: 1,
    activo: true
  },
  {
    id: 10,
    nombre: "Andrés Soto",
    cargo: "Mkt Analyst",
    depto: "Marketing",
    salario: 1800000,
    aniosEmpresa: 2,
    activo: true
  }
];

// total empleados: .length

let totalEmpleados = equipo.length;

// empleados activos e inactivos: .filter

let empleadosActivos = equipo.filter(function (empleado) {
  return empleado.activo;
});

let empleadosInactivos = equipo.filter(function (empleado) {
  return !empleado.activo;
});

// masa salarial total(activos) : .reduce

let masaSalarialActivos = empleadosActivos.reduce(function (acc, empleado) {
  return acc + empleado.salario;
}, 0);

// salario promedio (activos):

let salarioPromedioActivos = masaSalarialActivos / empleadosActivos.length;

// salario más alto: .reduce

let salarioMasAlto = equipo.reduce(function (acc, empleado) {
  if (acc.salario > empleado.salario) return acc;
  return empleado;
}, equipo[0]);

// salario más bajo: .reduce

let salarioMasBajo = equipo.reduce(function (acc, empleado) {
  if (acc.salario < empleado.salario) return acc;
  return empleado;
}, equipo[0]);

// empleados activos por departamento: .filter .reduce

let empleadosActivosPorDepto = empleadosActivos.reduce(function (acc, empleado) {
  let departamento = empleado.depto;
  if (acc[departamento] === undefined) {
    acc[departamento] = 0;
  }
  acc[departamento] += 1;
  return acc;
}, {});

console.log(empleadosActivosPorDepto);

let deptoTexto = Object.entries(empleadosActivosPorDepto)
  .map(function (entrada) {
    return `   ${entrada[0]}: ${entrada[1]} activos`;
  })
  .join("\n");

// empleados con más de 2 años en la empresa (activos):

let empleadosMasDosAniossAntiguedad = empleadosActivos.filter(function (empleado) {
  return empleado.aniosEmpresa > 2;
});

console.log(`
=== NEXUSHR — REPORTE DE EQUIPO ===
👥 Total empleados: ${totalEmpleados}
✅ Empleados activos: ${empleadosActivos.length}
❌ Empleados inactivos: ${empleadosInactivos.length}
 
💰 Masa salarial total (activos): $${masaSalarialActivos.toLocaleString("es-CL")}
📊 Salario promedio (activos): $${salarioPromedioActivos.toLocaleString("es-CL")}
🏆 Salario más alto: $${salarioMasAlto.salario.toLocaleString("es-CL")}
📉 Salario más bajo:$${salarioMasBajo.salario.toLocaleString("es-CL")}

🏢 Empleados por departamento:

${deptoTexto}

⭐ Empleados con más de 2 años en la empresa (activos): ${empleadosMasDosAniosAntiguedad.length}`);
