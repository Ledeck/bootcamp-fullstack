// Hecho y validado con claude...

function obtenerExpediciones(callback) {
  setTimeout(() => {
    callback([
      { id: 1, nombre: "Cruce Los Andes" },
      { id: 2, nombre: "Torres del Paine" }
    ]);
  }, 200);
}

function verificarDisponibilidad(expedicionId, callback) {
  setTimeout(() => {
    callback({ disponible: true, cupos: 5 });
  }, 300);
}

function confirmarReserva(datos, callback) {
  setTimeout(() => {
    callback({ confirmado: true, codigo: "RES-001" });
  }, 100);
}

// El "callback hell" — código que va hacia la derecha
obtenerExpediciones(function (expediciones) {
  verificarDisponibilidad(expediciones[0].id, function (disponibilidad) {
    if (disponibilidad.disponible) {
      confirmarReserva({ expedicionId: expediciones[0].id }, function (confirmacion) {
        console.log("Reserva confirmada:", confirmacion.codigo);
        // Y si necesitas otro paso... agrega otro nivel
      });
    }
  });
});
