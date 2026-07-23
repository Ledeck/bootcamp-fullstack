for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) continue;
  console.log(i);
}

let i = 1;
while (i <= 20) {
  if (i % 2 === 0) {
    console.log(i);
  }
  i++;
}
