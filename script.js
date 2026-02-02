let paso = 0;
let cardsVistas = 0;
let cofreAbierto = false;

let musicaFondo = new Audio("sounds/background.mp3");
musicaFondo.loop = true;
musicaFondo.volume = 1;


const sonidoClick = new Audio("sounds/click.wav");

//function flip(card) {
  //card.classList.toggle("flipped");}
function playClick() {
  sonidoClick.currentTime = 0;
  sonidoClick.volume = 0.1;
  sonidoClick.play();
}
function playMusica() {
  if (!musicaFondo) {
    musicaFondo = new Audio("sounds/background.mp3");
    musicaFondo.loop = true;
    musicaFondo.volume = 1;}
  

  musicaFondo.play().catch(err => {
    console.log("Audio bloqueado:", err);
  });
}


function lanzarCorazones(cantidad = 8) {
  const contenedor = document.querySelector(".container");

  for (let i = 0; i < cantidad; i++) {
    const corazon = document.createElement("div");
    corazon.className = "corazon-flotante";

    // posición random dentro del panel
    corazon.style.left = Math.random() * 80 + 10 + "%";
    corazon.style.bottom = "20px";

    // delay random
    corazon.style.animationDelay = Math.random() * 0.6 + "s";

    contenedor.appendChild(corazon);

    // limpiar
    setTimeout(() => corazon.remove(), 3000);
  }
}



function flip(card) {
  // contar solo la primera vez
  if (!card.classList.contains("vista")) {
    card.classList.add("vista");
    cardsVistas++;
  }

  card.classList.toggle("flipped");

  // cuando se vieron todas → mostrar botón
  if (cardsVistas === 4) {
    mostrarBotonSeguir();
  }
}
function mostrarBotonSeguir() {
  const botones = document.getElementById("botones");

  // evitar duplicarlo
  if (!document.getElementById("btnSeguir")) {
    botones.innerHTML += `
      <div class="seguir-wrapper">
        <button id="btnSeguir" onclick="siguiente()">Seguir</button>
      </div>
    `;
  }
}

function activarEscapeNo() {
  const btn = document.querySelector("#recompensa .no");
  const cont = document.getElementById("recompensa");

  if (!btn || !cont) return;

  btn.addEventListener("mouseenter", () => {
    const maxX = cont.clientWidth - btn.offsetWidth;
    const maxY = cont.clientHeight - btn.offsetHeight;

    btn.style.left = Math.random() * maxX + "px";
    btn.style.top  = Math.random() * maxY + "px";
  });
}


function ocultarRecompensa() {
  const r = document.getElementById("recompensa");
  if (r) r.style.display = "none";
}
function ocultarSubtexto() {
  const sub = document.getElementById("subtexto");
  sub.style.display = "none";
  sub.innerHTML = "";
}

function setBotones(html, columnas = false) {
  botones.className = columnas ? "botones-columnas" : "";
  botones.innerHTML = html;
}

function aceptar() {
	if (musicaFondo.paused) {
    musicaFondo.play().catch(() => {});
  }
	playClick();
  const panel = document.querySelector(".container");
  

  // salir del modo inicio
  panel.classList.remove("inicio");

  document.getElementById("titulo").style.display = "none";
  document.getElementById("startBtn").style.display = "none";

  // NO fuerces imagen acá
  document.getElementById("texto").style.display = "block";

  paso = 1;
  mostrarPaso();
}

function mostrarCofre() {
  document.getElementById("cofre-panel").style.display = "block";
  document.getElementById("recompensa-final").style.display = "none";

  const img = document.getElementById("cofre-img");
  img.src = "img/cofre-cerrado.png";
  
}

function abrirCofre() {
	playClick();
	if (cofreAbierto) return;
	

  cofreAbierto = true;
	const cofreImg = document.getElementById("cofre-img");
  const recompensaImg = document.getElementById("recompensa-img");
  const botones = document.getElementById("botones");
  
  cofreImg.src = "img/cofre-abierto.png";
  recompensaImg.style.display = "block";

 
  
  document.getElementById("recompensa-final").style.display = "block";

  // evitar múltiples clicks
  document.getElementById("cofre").onclick = null;
  //botones.innerHTML = `<button onclick="siguiente()">Seguir ▶</button>`;

  
}


function siguiente(opcion) {
  playClick(); 
  paso++;
  mostrarPaso(opcion);
  
}

function mostrarPaso(opcion) {
  const titulo = document.getElementById("titulo");
  const texto = document.getElementById("texto");
  const subtexto = document.getElementById("subtexto");
  const botones = document.getElementById("botones");
  const imagen = document.getElementById("imagen");
  const panel = document.querySelector(".container");
  const areaContenido = document.getElementById("area-contenido");
  const level = document.getElementById("level");
  const heart = document.getElementById("heart");
  //const stickerSparkle = document.getElementById("stickerSparkle");
  const btn = document.querySelector(".recompensa .no");
  

 


 
 ocultarSubtexto();
 ocultarRecompensa();
 botones.className = "";
 if (!(paso === 10 && cofreAbierto)) {
  botones.innerHTML = "";
}
 texto.innerHTML = "";
texto.style.display = "block";
imagen.style.display = "block";


areaContenido.classList.remove("layout-horizontal");


  
  
// PASO 1 — feedback según elección
  if (paso === 1) {
	  imagen.src = "";
      imagen.classList.remove("con-marco");
      imagen.style.display = "none";
      if (level) level.style.opacity = 0;
      if (heart) heart.style.opacity = 0;
      
      texto.style.display = "block";
      
  texto.innerHTML = `
  <h1 class="titulo-reglas">REGLAS</h1>
  <p class="reglas">1. Se presentarán preguntas multiple-choice aumentando dificultad a medida que pasas de nivel.</p>
  <p class="reglas">2.Solo una respuesta es correcta, si respondés mal <strong>GAME OVER</strong>.</p>
  
  `;
    
    botones.className = "";
    botones.innerHTML =
      `<button onclick="siguiente()">LET'S PLAY</button>`;
  }
  // PASO 2 — primera decisión
  if (paso === 2) {
	  imagen.src = "";
      imagen.classList.remove("con-marco");
      imagen.style.display = "none";
      if (level) level.style.opacity = 0;
      if (heart) heart.style.opacity = 0;
	 
    texto.innerHTML =
      `<h1 class="titulo-nivel">NIVEL 1</h1>
      <p>"¿Qué es lo que más me gusta de Tomi?"<p>` ;

setBotones(`
      <button onclick="siguiente('ojos')">Sus ojos</button>
      <button onclick="siguiente('rulos')">Sus rulos</button>
      <button onclick="siguiente('altura')">Su altura</button>
      <button onclick="siguiente('sonrisa')">Su sonrisa</button>
`, true);
    
  }
  

  // PASO 3 — feedback según elección
  if (paso === 3) {
	  imagen.src = "";
      imagen.classList.remove("con-marco");
      imagen.style.display = "none";
      if (level) level.style.opacity = 0;
       if (heart) heart.style.opacity = 0;
       
      texto.innerHTML = `
       <div class="panel-error">
      <h2 class="titulo-error">¡ERROR!</h2>
      <p class="texto-panel">
        Obviamente me gusta absolutamente tooooodo.
      </p>
    </div>`;
       
    
    botones.className = "";
    botones.innerHTML =
      `<button onclick="siguiente()">Seguir</button>`;
  }

  //PASO 4 — segunda decisión
  if (paso === 4) {
    imagen.src = "img/risa.png";
    imagen.classList.add("con-marco");
    imagen.style.display = "block";
    if (level) level.style.opacity = 0;
    if (heart) heart.style.opacity = 0;
  
  
    texto.innerHTML =
      "Me gusta cuando sonreís así";

areaContenido.classList.add("layout-horizontal");
    botones.innerHTML = `
      <button onclick="siguiente()">Seguir</button>`;
  }

  // PASO 5 — segunda elección
  if (paso === 5) {
      imagen.src = "img/dormir.png";
      texto.innerHTML =  " También cuando dormis";
      subtexto.style.display = "block";
      subtexto.innerHTML = "(ocupando toda la cama)";
      if (level) level.style.opacity = 0;
    if (heart) heart.style.opacity = 0;
    
areaContenido.classList.add("layout-horizontal");
    botones.innerHTML =
      `<button onclick="siguiente()">Seguir</button>`;
  }
  
 // PASO 6 — segunda elección
  if (paso === 6) {
      imagen.src = "img/loco.png";
      texto.innerHTML =  " También me gustas pelado";
      subtexto.style.display = "block";
      
      if (level) level.style.opacity = 0;
    if (heart) heart.style.opacity = 0;
    
areaContenido.classList.add("layout-horizontal");
    botones.innerHTML =
      `<button onclick="siguiente()">Seguir</button>`;
  }
  // PASO 7 — 
  if (paso === 7) {
	  imagen.src = "img/enojado.png";
    if (level) level.style.opacity = 0;
    if (heart) heart.style.opacity = 0;
    texto.innerHTML =
      "Y mira que lindo sos cuando te enojas" ;

areaContenido.classList.add("layout-horizontal");
    botones.innerHTML = `<button onclick="siguiente()">Seguir</button>`;
  }
  
// PASO 8 — 
  if (paso === 8) {
    imagen.src = "img/chiquito.png";
    if (level) level.style.opacity = 0;
    if (heart) heart.style.opacity = 0;
    
    texto.innerHTML = "Aunque de chico no eras tan lindo." ;
      subtexto.style.display = "block";
      subtexto.innerHTML = "(jodaaaaaa)";

areaContenido.classList.add("layout-horizontal");
    //botones.innerHTML = "";
    botones.innerHTML = `<button onclick="siguiente()">Seguir</button>`;
  }
 
 // PASO 9 — 
  if (paso === 9) {
    imagen.src = "";
      imagen.classList.remove("con-marco");
      imagen.style.display = "none";
      if (heart) heart.style.opacity = 0;
      
      if (level) {
      level.style.opacity = 1;
      level.style.position = "static"; // Rompe el absolute para que se comporte como texto
      level.style.display = "block";
      level.style.top = "20px"; 
      level.style.left = "50%";
    level.style.transform = "translateX(-50%)"; // Lo compensa para que el centro sea exacto
    }
    
    texto.innerHTML = 
    `<h1 class="titulo-nivel">LEVEL UP</h1>
      <div id="contenedor-sticker"></div> <p>Get reward</p>
      ` ;
     
     document.getElementById("contenedor-sticker").appendChild(level);
     
    botones.innerHTML = "";
    document.getElementById("recompensa").style.display = "block";
  activarEscapeNo();
  }
  
// PASO 10 — 
  if (paso === 10) {
	  if (heart) heart.style.opacity = 0;
    const imagen = document.getElementById("imagen");
  const botones = document.getElementById("botones");

  imagen.style.display = "none";
  //botones.innerHTML = "";

  texto.innerHTML = `
    <h1 class="titulo-nivel titulo-reward glow">¡REWARD!</h1>
    <p>Abrí el cofre para ver tu premio </p>
  `;
  botones.innerHTML = `
    <button onclick="siguiente()">Seguir</button>`;

  mostrarCofre();
}
  

 // PASO 11
  if (paso === 11) {
	  cardsVistas = 0;
	  imagen.src = "";
      imagen.classList.remove("con-marco");
      imagen.style.display = "none";
      if (level) level.style.opacity = 0;
      if (heart) heart.style.opacity = 0;
      document.getElementById("cofre-panel").style.display = "none";
      
    texto.innerHTML =
     `<h1 class="titulo-nivel">NIVEL 2</h1>
      <p>"¿Qué es lo que NO me gusta de Tomi?"<p>` ;

   botones.className = "botones-columnas";
  botones.innerHTML = `
    <div class="card" onclick="flip(this)">
      <div class="card-inner">
        <div class="card-front">Siempre llega tarde</div>
        <div class="card-back">Ahora solo llegas 5' tarde en lugar de 10'</div>
      </div>
    </div>

    <div class="card" onclick="flip(this)">
      <div class="card-inner">
        <div class="card-front">Nunca me dice cosas lindas</div>
        <div class="card-back">Pero cuando lo haces, vale doble</div>
      </div>
    </div>

    <div class="card" onclick="flip(this)">
      <div class="card-inner">
        <div class="card-front">Le cuesta comunicarse</div>
        <div class="card-back">Pero cada vez te cuesta menos</div>
      </div>
    </div>

    <div class="card" onclick="flip(this)">
      <div class="card-inner">
        <div class="card-front">No es bueno para regalos</div>
        <div class="card-back">Y aún así me gusta todo lo q me diste</div>
      </div>
    </div>
    

  `;
}
// PASO 12 — 
  if (paso === 12) {
	
    imagen.src = "img/nosotros.png";
    imagen.style.display = "block";
    imagen.style.width = "400px";
imagen.style.maxWidth = "90%";
imagen.style.height = "auto";
imagen.style.margin = "20px auto";

    //if (heart) {
  //heart.classList.add("inline");
  //heart.style.opacity = 1;
   //   heart.style.position = "static"; // Rompe el absolute para que se comporte como texto
       


texto.innerHTML = "Te quiero mucho pichu y aprecio el esfuerzo";
   
      

    botones.className = "";
    botones.innerHTML = `<button onclick="siguiente()">Seguir</button>`;
    
lanzarCorazones(20);
  }
  

  
 // PASO 13 —  
if (paso === 13) {
  const panel = document.querySelector(".container");
  const titulo = document.getElementById("titulo");
  const texto = document.getElementById("texto");
  const subtexto = document.getElementById("subtexto");
  const imagen = document.getElementById("imagen");
  const botones = document.getElementById("botones");

  // 1. Cambiamos el look del contenedor
  panel.classList.add("final");

  // 2. Mostramos el título principal que estaba oculto
  titulo.style.display = "block";
  titulo.innerHTML = "GAME OVER";

  // 3. Limpiamos el resto
  texto.style.display = "none"; 
  imagen.style.display = "none";
  botones.innerHTML = "";
  if (heart) heart.style.opacity = 0;
  
  // Opcional: un botón para reiniciar
  botones.innerHTML = `<button onclick="location.reload()">PLAY AGAIN</button>`;
}



}




















