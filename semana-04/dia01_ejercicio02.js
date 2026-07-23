let tienda = {
  nombre: "TerraMater Expediciones",
  ciudad: "Concepción",
  anioFundacion: 2015,
  envioGratis: false
};

tienda.envioGratis = true;
tienda.telefono = "961308978";
tienda.categorias = ["Trekking", "Escalada", "Kayak"];
delete tienda.anioFundacion;

console.log(tienda);
