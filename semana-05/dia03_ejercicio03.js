// 1. Escribe `sumarTodo(...numeros)` que sume cualquier cantidad de números

let sumarTodo = (...numeros) => numeros.reduce((total, n) => total + n, 0);

// 2. Escribe `primeroYResto(primero, ...resto)` que muestre el primer elemento y el array del resto

let primeroYResto = (primero, ...resto) => console.log(`${primero}`, resto);

// 3. Escribe `crearExpedicion(nombre, tipo, ...guias)` que retorne un objeto con nombre, tipo y un array de guías

let crearExpedicion = (nombre, tipo, ...guias) => ({ nombre, tipo, guias });
