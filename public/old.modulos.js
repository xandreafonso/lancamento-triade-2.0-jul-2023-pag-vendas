window.addEventListener("DOMContentLoaded", (event) => {
  iniciarModulos();
  adicionarEventosSetasModulos();
});

function adicionarEventosSetasModulos() {
  document.querySelector(".por-dentro__modulos-seta--direita").addEventListener("click", (event) => {
    event.preventDefault();

    irParaModuloDireito();
  });

  document.querySelector(".por-dentro__modulos-seta--esquerda").addEventListener("click", (event) => {
    event.preventDefault();

    irParaModuloEsquerdo();
  });
}

const MODULO_ATIVO = 1;

function iniciarModulos() {
  const slides = document.querySelectorAll(".por-dentro__modulo");
  //console.log(slides.length)

  slides.forEach((slide, i) => {
    var numSlide = i;

    slide.style.order = numSlide + MODULO_ATIVO;

    if(MODULO_ATIVO == numSlide) {
      slide.classList.add("modulo-ativo");
    }
  });

  for(var i = 0; i < MODULO_ATIVO; i++) {
    const ultimoIndice = slides.length - 1;

    slides[ultimoIndice - i].style.order = MODULO_ATIVO - 1 - i;
  }

  const setas = document.querySelector(".por-dentro__modulos-setas");
  setas.style.left = "calc(((var(--LARGURA-MODULO) + 1rem) * " + MODULO_ATIVO + ") - 2rem)";

  deixarModuloTransparente();
}

function deixarModuloTransparente() {
  const slides = document.querySelectorAll(".por-dentro__modulo");

  slides.forEach((slide, i) => {
    slide.classList.remove("modulo-ativo");

    var numSlide = +slide.style.order;

    if (numSlide == 0) { 
      slide.style.opacity = 0.05;
    } else if (numSlide == MODULO_ATIVO) {      
      slide.classList.add("modulo-ativo");
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = (100 / (numSlide * 5)) / 100;
    }
  });
}

function irParaModuloDireito() {
  const slides = document.querySelectorAll(".por-dentro__modulo");
  
  slides.forEach((slide, i) => {
    var numSlide = +slide.style.order;
    
    if (numSlide == 0) {
      slide.style.order = slides.length - 1;
    } else {
      slide.style.order = numSlide - 1;
    }
  });

  deixarModuloTransparente();
}

function irParaModuloEsquerdo() {
  const slides = document.querySelectorAll(".por-dentro__modulo");
  
  slides.forEach((slide, i) => {
    var numSlide = +slide.style.order;
    
    if (numSlide == (slides.length - 1)) {
      slide.style.order = 0;
    } else {
      slide.style.order = numSlide + 1;
    }
  });

  deixarModuloTransparente();
}


