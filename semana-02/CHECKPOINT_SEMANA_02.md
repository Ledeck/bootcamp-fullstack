¿Cuál es la diferencia entre `for` y `while`?
R: El for se utiliza generalemente para bucles ya determinados. En cambio el while, se utiliza para bucles por determinar

¿Cuándo usarías cada uno? 2. ¿Qué es un bucle infinito? Da un ejemplo y explica por qué ocurre. 3. ¿Qué hace el operador `%`? Da 3 ejemplos.

**Funciones:** 4. ¿Cuál es la diferencia entre `console.log` dentro de una función y `return`? 5. ¿Qué pasa si una función no tiene `return`? ¿Qué devuelve? 6. ¿Cuántos `return` puede tener una función?

**Scope:** 7. ¿Qué es el scope? Explícalo con la analogía de las habitaciones. 8. ¿Puede una función acceder a variables definidas fuera de ella? ¿Y al revés?

**Conexión con Next.js:** 9. Esta semana viste 3 veces una sección "Conexión con Next.js". En tus propias palabras, ¿cuál fue la conexión que más te ayudó a entender hacia dónde vas? ¿Por qué?

**Código:** 10. Explica línea por línea qué hace este código:

```javascript
function esPar(numero) {
  return numero % 2 === 0;
}

for (let i = 1; i <= 10; i++) {
  if (esPar(i)) {
    console.log(i + " es par");
  }
}
```

11. Sin ejecutarlo: ¿qué mostrará en consola?
