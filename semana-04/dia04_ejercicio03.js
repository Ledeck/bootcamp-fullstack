let empleados = [
  { id: 1, nombre: "Ana", departamento: "Desarrollo", salario: 1800000, activo: true },
  { id: 2, nombre: "Pedro", departamento: "Diseño", salario: 1500000, activo: true },
  { id: 3, nombre: "María", departamento: "Desarrollo", salario: 2100000, activo: false },
  { id: 4, nombre: "Juan", departamento: "Marketing", salario: 1300000, activo: true },
  { id: 5, nombre: "Sofía", departamento: "Desarrollo", salario: 1950000, activo: true },
  { id: 6, nombre: "Carlos", departamento: "Diseño", salario: 1600000, activo: false },
  { id: 7, nombre: "Lucía", departamento: "Marketing", salario: 1400000, activo: true }
];

let totalSalarios = empleados.reduce(function (acc, empleado) {
  return acc + empleado.salario;
}, 0);

console.log(`Total Salarios: ${totalSalarios}`);

let empleadoMejorPagado = empleados.reduce(function (acc, empleado) {
  if (acc.salario > empleado.salario) {
    return acc;
  }
  return empleado;
}, empleados[0]);

console.log(`${empleadoMejorPagado.nombre}: ${empleadoMejorPagado.salario}`);

let empleadosxDepartamento = empleados.reduce(function (acc, empleado) {
  let depto = empleado.departamento;
  if (acc[depto] === undefined) {
    acc[depto] = 0;
  }
  acc[depto] += 1;
  return acc;
}, {});

console.log(empleadosxDepartamento);
