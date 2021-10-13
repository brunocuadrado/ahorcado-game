var listaCiudades = [
    "paris",
    "londres",
    "madrid",
    "praga",
    "amsterdam",
    "berlin",
    "roma",
    "budapest",
    "lisboa",
    "barcelona",
    "bruselas",
    "viena",
    "copenhague",
    "florencia",
    "venecia",
    "dublin",
    "cracovia",
    "estocolmo",
    "atenas",
    "estambul",
    "tallin",
    "sevilla",
    "varsovia"
]

localStorage.setItem('miArreglo', JSON.stringify(listaCiudades));


var ciudadesEuropa = localStorage.getItem('miArreglo');
ciudadesEuropa = JSON.parse(ciudadesEuropa);



let respuesta = '';
let maxErrores = 6;
let errores = 0;
let correctas = [];
let estadoPalabra = null;

function palabraRandom() {
  respuesta = ciudadesEuropa[Math.floor(Math.random() * ciudadesEuropa.length)];
}

function generarBotones() {
  let botonesHTML = 'abcdefghijklmnñopqrstuvwxyz'.split('').map(letra =>
    `
      <button
        class="btn btn-lg btn-dark m-2"
        id='` + letra + `'
        onClick="manejoCorrectas('` + letra + `')"
      >
        ` + letra + `
      </button>
    `).join('');

  document.getElementById('teclado').innerHTML = botonesHTML;
}

function manejoCorrectas(letraElegida) {
  correctas.indexOf(letraElegida) === -1 ? correctas.push(letraElegida) : null;
  document.getElementById(letraElegida).setAttribute('disabled', true);

  if (respuesta.indexOf(letraElegida) >= 0) {
    palabraCorrecta();
    juegoGanadoCheck();
  } else if (respuesta.indexOf(letraElegida) === -1) {
    errores++;
    actualizarErrores();
    juegoPerdidoCheck();
    actualizarFoto();
  }
}

function actualizarFoto() {
  document.getElementById('fotoAhorcado').src = './images/' + errores + '.jpg';
}

function juegoGanadoCheck() {
  if (estadoPalabra === respuesta) {
    document.getElementById('teclado').innerHTML = 'GANASTE!!!';
  }
}

function juegoPerdidoCheck() {
  if (errores === maxErrores) {
    document.getElementById('palabraDestacada').innerHTML = 'La respuesta era: ' + respuesta;
    document.getElementById('teclado').innerHTML = 'PERDISTE!!!';
  }
}

function palabraCorrecta() {
  estadoPalabra = respuesta.split('').map(letra => (correctas.indexOf(letra) >= 0 ? letra : " _ ")).join('');

  document.getElementById('palabraDestacada').innerHTML = estadoPalabra;
}

function actualizarErrores() {
  document.getElementById('errores').innerHTML = errores;
}

function reiniciar() {
  errores = 0;
  correctas = [];
  document.getElementById('fotoAhorcado').src = './images/0.jpg';

  palabraRandom();
  palabraCorrecta();
  actualizarErrores();
  generarBotones();
}

document.getElementById('maxErrores').innerHTML = maxErrores;

palabraRandom();
generarBotones();
palabraCorrecta();