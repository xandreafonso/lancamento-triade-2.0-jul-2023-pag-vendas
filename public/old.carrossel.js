window.addEventListener("DOMContentLoaded", (event) => {
  iniciarSlides();
  adicionarEventos();
});

function adicionarEventos() {
  document.querySelector(".carrossel__seta--direita").addEventListener("click", (event) => {
    event.preventDefault();

    irParaSlideDireito();
  });

  document.querySelector(".carrossel__seta--esquerda").addEventListener("click", (event) => {
    event.preventDefault();

    irParaSlideEsquerdo();
  });
}

const SLIDE_ATIVO = 1;

function iniciarSlides() {
  const slides = document.querySelectorAll(".carrossel__moldura-slide");
  
  // slides.forEach((slide, i) => {
  //   var numSlide = i;
    
  //   if (numSlide < (slides.length - 1)) {      
  //     slide.style.order = numSlide + 1;
  //   } else {
  //     slide.style.order = 0;
  //   }
  // });

  slides.forEach((slide, i) => {
    var numSlide = i;

    slide.style.order = numSlide + SLIDE_ATIVO;

    if(SLIDE_ATIVO == numSlide) {
      slide.classList.add("slide-ativo");
    }
  });

  for(var i = 0; i < SLIDE_ATIVO; i++) {
    const ultimoIndice = slides.length - 1;

    slides[ultimoIndice - i].style.order = SLIDE_ATIVO - 1 - i;
  }

  const setas = document.querySelector(".carrossel__setas");
  setas.style.left = "calc((var(--LARGURA-SLIDES) * " + SLIDE_ATIVO + ") - 2rem)";

  deixarTransparente();
}

function deixarTransparente() {
  const slides = document.querySelectorAll(".carrossel__moldura-slide");

  slides.forEach((slide, i) => {
    slide.classList.remove("slide-ativo");

    var numSlide = +slide.style.order;

    if (numSlide == 0) { 
      slide.style.opacity = 0.05;
    } else if (numSlide == SLIDE_ATIVO) {      
      slide.classList.add("slide-ativo");
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = (100 / (numSlide * 5)) / 100;
    }
  });

  const slideUltimo = document.querySelector(".slide-ultimo");
  var numSlideUltimo = +slideUltimo.style.order;
  const setaEsquerda = document.querySelector(".carrossel__seta--esquerda");
  if (numSlideUltimo == SLIDE_ATIVO - 1) {
    setaEsquerda.style.visibility = "hidden";
  } else {
    setaEsquerda.style.visibility = "visible";
  }
}

function irParaSlideDireito() {
  const slides = document.querySelectorAll(".carrossel__moldura-slide");
  
  slides.forEach((slide, i) => {
    var numSlide = +slide.style.order;
    
    if (numSlide == 0) {
      slide.style.order = slides.length - 1;
    } else {
      slide.style.order = numSlide - 1;
    }
  });

  deixarTransparente();
}

function irParaSlideEsquerdo() {
  const slides = document.querySelectorAll(".carrossel__moldura-slide");
  
  slides.forEach((slide, i) => {
    var numSlide = +slide.style.order;
    
    if (numSlide == (slides.length - 1)) {
      slide.style.order = 0;
    } else {
      slide.style.order = numSlide + 1;
    }
  });

  deixarTransparente();
}


