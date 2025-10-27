function mostrarSeccion(id) {
  const secciones = document.querySelectorAll("main section");
  secciones.forEach(sec => sec.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");

  if (id === "prueba") iniciarQuiz();
}

// ==================== QUIZ INTERACTIVO ====================
const preguntas = [
  {
    texto: "🔐 ¿Qué significa 'Phishing'?",
    opciones: ["Un ataque para robar datos personales", "Un antivirus", "Una app segura"],
    correcta: 0
  },
  {
    texto: "📱 Si recibes un mensaje sospechoso con un enlace, ¿qué haces?",
    opciones: ["Hacer clic rápido", "Ignorarlo o reportarlo", "Compartirlo con amigos"],
    correcta: 1
  },
  {
    texto: "💬 ¿Qué es la verificación en dos pasos?",
    opciones: ["Una medida extra de seguridad", "Un mensaje automático", "Un tipo de contraseña débil"],
    correcta: 0
  },
  {
    texto: "🧩 ¿Qué deberías hacer si una red WiFi pública no tiene contraseña?",
    opciones: ["Conectarte igual", "Evitar enviar información sensible", "Compartir tus datos bancarios"],
    correcta: 1
  },
  {
    texto: "🧠 ¿Qué tipo de contraseña es más segura?",
    opciones: ["123456", "Tu fecha de nacimiento", "Combinación de letras, números y símbolos"],
    correcta: 2
  }
];

let indice = 0;
let puntaje = 0;

function iniciarQuiz() {
  indice = 0;
  puntaje = 0;
  mostrarPregunta();
}

function mostrarPregunta() {
  const preguntaCont = document.getElementById("pregunta");
  const opcionesCont = document.getElementById("opciones");
  const resultado = document.getElementById("resultado");
  const final = document.getElementById("final");

  final.innerHTML = "";
  resultado.textContent = "";

  if (indice < preguntas.length) {
    const actual = preguntas[indice];
    preguntaCont.textContent = actual.texto;
    opcionesCont.innerHTML = "";

    actual.opciones.forEach((op, i) => {
      const btn = document.createElement("button");
      btn.textContent = op;
      btn.onclick = () => verificarRespuesta(i);
      opcionesCont.appendChild(btn);
    });
  } else {
    mostrarResultadoFinal();
  }
}

function verificarRespuesta(opcionSeleccionada) {
  const actual = preguntas[indice];
  const resultado = document.getElementById("resultado");

  if (opcionSeleccionada === actual.correcta) {
    resultado.textContent = "✅ ¡Correcto! +1 punto 🎯";
    resultado.style.color = "green";
    puntaje++;
  } else {
    resultado.textContent = "❌ Incorrecto... sigue aprendiendo 📚";
    resultado.style.color = "red";
  }

  indice++;
  setTimeout(mostrarPregunta, 1500);
}

function mostrarResultadoFinal() {
  const preguntaCont = document.getElementById("pregunta");
  const opcionesCont = document.getElementById("opciones");
  const final = document.getElementById("final");

  preguntaCont.textContent = "🎉 ¡Excelente! Has terminado la prueba.";
  opcionesCont.innerHTML = "";

  // Mensaje personalizado según el puntaje
  let mensaje = "";
  if (puntaje <= 2) {
    mensaje = "😅 Necesitas mejorar tu seguridad digital. ¡Sigue aprendiendo con Lupak! 💪";
  } else if (puntaje === 3 || puntaje === 4) {
    mensaje = "🧠 ¡Muy bien! Tienes buenos conocimientos de seguridad digital 🔒";
  } else if (puntaje === 5) {
    mensaje = "🦸‍♂️ ¡Excelente guardián digital! Eres un verdadero experto en ciberseguridad 🛡️🔥";
  }

  final.innerHTML = `
    <p style="font-size:1.3rem; margin-top:10px;">
      Tu puntaje final es: <b>${puntaje}/${preguntas.length}</b> 🏆
    </p>
    <div id="estrellas" style="margin:10px 0; font-size:2rem; color:#ffd700;"></div>
    <p style="font-size:1.1rem; animation: aparecer 1.2s ease-in-out;">${mensaje}</p>
    <button onclick="iniciarQuiz()" style="margin-top:15px; padding:10px 20px; border:none; border-radius:10px; background-color:#2c5eff; color:white; font-weight:bold; cursor:pointer;">🔄 Volver a Intentar</button>
  `;

  animarEstrellas(puntaje);
}

function animarEstrellas(puntos) {
  const total = 5;
  const contenedor = document.getElementById("estrellas");
  contenedor.textContent = "";
  let i = 0;

  const animacion = setInterval(() => {
    contenedor.textContent += i < puntos ? "⭐" : "☆";
    i++;
    if (i === total) clearInterval(animacion);
  }, 400); // Velocidad de animación (ms)
}
