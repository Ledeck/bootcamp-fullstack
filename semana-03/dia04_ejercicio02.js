let emails = [
  "oscar@gmail.com",
  "ana@empresa.cl",
  "pedro@gmail.com",
  "maria@hotmail.com",
  "juan@empresa.cl",
  "sofia@gmail.com",
];

let gmail = emails.filter(function (correo) {
  return correo.includes("gmail");
});
console.log(gmail);

let cl = emails.filter(function (correo) {
  return correo.includes(".cl");
});
console.log(cl);
