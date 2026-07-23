let post1 =
  "La tecnología avanza rápido. Cada línea de código que escribes construye el futuro. #Tech #Code";

let post2 = "";

let post3 =
  "La programación es una habilidad que se domina con mucha práctica y paciencia. Cada error es una oportunidad para aprender y crecer hoy. No te desanimes si algo no funciona a la primera vez, sigue intentándolo con toda tu fuerza y verás cómo poco a poco todo empieza a tener sentido. #Programación!";

let post4 =
  "Escribir código limpio es una forma de arte que siempre debemos practicar. #JS #Code #Dev #Tech #Web #Programacion #HTML";

let post5 =
  "El desarrollo de software requiere paciencia, lógica y creatividad. Aprender a programar es un viaje sin destino final, donde cada línea de código te acerca a la solución. No temas equivocarte jamás, los errores son los verdaderos maestros. #Programacion #JS #NodeJS #CSS #HTML5";

function contarHashtags(texto) {
  let contador = 0;

  for (let i = 0; i < texto.length; i++)
    if (texto[i] === "#") {
      contador += 1;
    }
  return contador;
}

function obtenerEstado(texto, hashtags) {
  if (texto.length === 0) {
    return "❌ INVÁLIDO — El post no puede estar vacío";
  } else if (texto.length > 280) {
    let excesoTexto = texto.length - 280;
    return `❌ INVÁLIDO — Excede el límite de caracteres por ${excesoTexto}`;
  } else if (hashtags > 5) {
    let excesoHashtags = hashtags - 5;
    return `❌ INVÁLIDO — Excede el límite de hashtags por ${excesoHashtags}`;
  }
  return "✅ VÁLIDO";
}

function recortarTexto(texto) {
  if (texto.length > 50) {
    return texto.slice(0, 50) + "...";
  }
  return texto;
}

function analizarPost(texto, numeroPost) {
  let textoRecortado = recortarTexto(texto);
  let hashtags = contarHashtags(texto);
  let estadoPost = obtenerEstado(texto, hashtags);

  return `
Post${numeroPost}: ${textoRecortado}
Caracteres: ${texto.length}/280
Hashtags: ${hashtags}/5
Estado: ${estadoPost}`;
}

console.log(`
=== ANÁLISIS DE POSTS — PocketFeed ===
${analizarPost(post1, 1)}

${analizarPost(post2, 2)}

${analizarPost(post3, 3)}

${analizarPost(post4, 4)}

${analizarPost(post5, 5)}`);
