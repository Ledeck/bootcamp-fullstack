let participantes = [
  "Carlos",
  "Ana",
  "Pedro",
  "María",
  "Juan",
  "Sofía",
  "Diego",
];

let cuatroLetras = participantes.find(function (name) {
  return name.length > 4;
});
console.log(cuatroLetras);

console.log(
  participantes.findIndex(function (indexParticipante) {
    return indexParticipante === `María`;
  }),
);

if (participantes.includes(`Roberto`)) {
  console.log("Roberto si esta incluido :)");
} else {
  console.log(`Roberto no esta incluido >:(`);
}
