window.addEventListener("DOMContentLoaded", (event) => {
  iniciarDepoimentos();
  adicionarEventosSetasDepoimentos();
});

function adicionarEventosSetasDepoimentos() {
  document.querySelector(".triaders__depoimentos-seta--direita").addEventListener("click", (event) => {
    event.preventDefault();

    irParaDepoimentoDireito();
  });

  document.querySelector(".triaders__depoimentos-seta--esquerda").addEventListener("click", (event) => {
    event.preventDefault();

    irParaDepoimentoEsquerdo();
  });
}

const DEPOIMENTO_ATIVO = 1;

function iniciarDepoimentos() {
  const slides = document.querySelectorAll(".triaders__depoimento");
  //console.log(slides.length)

  slides.forEach((slide, i) => {
    var numSlide = i;

    slide.style.order = numSlide + DEPOIMENTO_ATIVO;

    if(DEPOIMENTO_ATIVO == numSlide) {
      slide.classList.add("depoimento-ativo");
    }
  });

  for(var i = 0; i < DEPOIMENTO_ATIVO; i++) {
    const ultimoIndice = slides.length - 1;

    slides[ultimoIndice - i].style.order = DEPOIMENTO_ATIVO - 1 - i;
  }

  const setas = document.querySelector(".triaders__depoimentos-setas");
  setas.style.left = "calc((var(--LARGURA-DEPOIMENTOS) * " + DEPOIMENTO_ATIVO + ") - 2rem)";

  deixarDepoimentoTransparente();
}

function deixarDepoimentoTransparente() {
  const slides = document.querySelectorAll(".triaders__depoimento");

  slides.forEach((slide, i) => {
    slide.classList.remove("depoimento-ativo");

    var numSlide = +slide.style.order;

    if (numSlide == 0) { 
      slide.style.opacity = 0.05;
    } else if (numSlide == DEPOIMENTO_ATIVO) {      
      slide.classList.add("depoimento-ativo");
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = (100 / (numSlide * 5)) / 100;
    }
  });
}

function irParaDepoimentoDireito() {
  const slides = document.querySelectorAll(".triaders__depoimento");
  
  slides.forEach((slide, i) => {
    var numSlide = +slide.style.order;
    
    if (numSlide == 0) {
      slide.style.order = slides.length - 1;
    } else {
      slide.style.order = numSlide - 1;
    }
  });

  deixarDepoimentoTransparente();
}

function irParaDepoimentoEsquerdo() {
  const slides = document.querySelectorAll(".triaders__depoimento");
  
  slides.forEach((slide, i) => {
    var numSlide = +slide.style.order;
    
    if (numSlide == (slides.length - 1)) {
      slide.style.order = 0;
    } else {
      slide.style.order = numSlide + 1;
    }
  });

  deixarDepoimentoTransparente();
}


