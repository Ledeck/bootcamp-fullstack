let empleados = [
  { id: 1, nombre: "Ana", departamento: "Desarrollo", salario: 1800000, activo: true },
  { id: 2, nombre: "Pedro", departamento: "Diseño", salario: 1500000, activo: true },
  { id: 3, nombre: "María", departamento: "Desarrollo", salario: 2100000, activo: false },
  { id: 4, nombre: "Juan", departamento: "Marketing", salario: 1300000, activo: true },
  { id: 5, nombre: "Sofía", departamento: "Desarrollo", salario: 1950000, activo: true },
  { id: 6, nombre: "Carlos", departamento: "Diseño", salario: 1600000, activo: false },
  { id: 7, nombre: "Lucía", departamento: "Marketing", salario: 1400000, activo: true }
];

let empleadosActivos = empleados.filter(function (empleado) {
  return empleado.activo;
});

console.log(empleadosActivos);

let deptoDesarrollo = empleados.filter(function (empleado) {
  return empleado.departamento === "Desarrollo";
});
console.log(deptoDesarrollo);

let activosMayor = empleados.filter(function (empleado) {
  return empleado.activo && empleado.salario > 1600000;
});
console.log(activosMayor);
