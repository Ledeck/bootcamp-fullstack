let empleados = [
  { nombre: "Ana", salario: 1800000, depto: "Dev", activo: true },
  { nombre: "Pedro", salario: 1500000, depto: "Diseño", activo: true },
  { nombre: "María", salario: 2100000, depto: "Dev", activo: false },
  { nombre: "Juan", salario: 1300000, depto: "Marketing", activo: true },
  { nombre: "Sofía", salario: 1950000, depto: "Dev", activo: true }
];

//1. Filtra solo los empleados activos

let empleadosActivos = empleados.filter((empleado) => empleado.activo);

//2. Obtén un array con solo los nombres de los activos

let nombreEmpleadosActivos = empleadosActivos.map((empleado) => empleado.nombre);

// 3. Calcula el salario promedio de los activos

let sumaSalarioActivos = empleadosActivos.reduce((acc, empleado) => acc + empleado.salario, 0);

let promedioSalarioActivos = sumaSalarioActivos / empleadosActivos.length;

//4. Encuentra el empleado activo con mayor salario

let empleadoActivoMayorSalario = empleadosActivos.reduce((acc, empleado) => {
  if (acc.salario < empleado.salario) return empleado;
  return acc;
}, empleadosActivos[0]);
