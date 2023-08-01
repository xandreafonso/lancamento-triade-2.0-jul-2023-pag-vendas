const DATA_HORA_FIM = mudarFusoHorario(new Date('2023/07/15 21:00:00'), 'America/Sao_Paulo');
const DATA_HORA_FIM_14 = mudarFusoHorario(new Date('2023/07/14 21:00:00'), 'America/Sao_Paulo');
const DATA_HORA_FIM_13 = mudarFusoHorario(new Date('2023/07/13 21:00:00'), 'America/Sao_Paulo');
const DATA_HORA_AGORA_SERVIDOR = mudarFusoHorario(new Date(horaDoServidor()), 'America/Sao_Paulo');

var dataContador = new Date(DATA_HORA_AGORA_SERVIDOR);
const elementoDias = document.querySelector("#dia");
const elementoHora = document.querySelector("#hora");
const elementoMinuto = document.querySelector("#minuto");
const elementoSegundo = document.querySelector("#segundo");

const elementoBotaoDia13 = document.querySelector("#dia13");
const elementoBotaoDia14 = document.querySelector("#dia14");
const elementoBotaoDia15 = document.querySelector("#dia15");

setInterval(() => {
  dataContador.setSeconds(dataContador.getSeconds() + 1);

  let diasRestantes = 0;
  let horasRestantes = 0;
  let minutosRestantes = 0;
  let segundosRestantes = 0;

  let diferenca = DATA_HORA_FIM.getTime() - dataContador.getTime();

  if(diferenca > 0) {
    diferenca = diferenca / 1000; // transformando em segundos

    if (diferenca > 60) { // tem mais de um minuto
        segundosRestantes = diferenca % 60;

        diferenca = (diferenca - (diferenca % 60)) / 60; // transformando em minutos

        if (diferenca > 60) { // tem mais de uma hora
            minutosRestantes = diferenca % 60;

            diferenca = (diferenca - (diferenca % 60)) / 60; // transformando em horas

            if(diferenca > 24) { // tem mais de um dia
              horasRestantes = diferenca % 24;

              diasRestantes = Math.floor(diferenca / 24); // já pego os dias aqui, pois não há unidade mais abrangente
            } else {
              horasRestantes = diferenca;
            }
        } else {
            minutosRestantes = diferenca;
        }
    } else {
        segundosRestantes = diferenca;
    }
  }

  elementoDias.innerHTML = diasRestantes;
  elementoHora.innerHTML = horasRestantes;
  elementoMinuto.innerHTML = minutosRestantes;
  elementoSegundo.innerHTML = segundosRestantes;

  const diferencaParaDia13 = DATA_HORA_FIM_13.getTime() - dataContador.getTime();
  const diferencaParaDia14 = DATA_HORA_FIM_14.getTime() - dataContador.getTime();
  //const diferencaParaDia15 = já foi calculada acima

  if (diferencaParaDia13 > 0) {
    elementoBotaoDia13.classList.remove("oferta__lote-botao--proximo-lote");
    elementoBotaoDia13.classList.remove("oferta__lote-botao--expirou");

    elementoBotaoDia14.classList.add("oferta__lote-botao--proximo-lote");
    elementoBotaoDia15.classList.add("oferta__lote-botao--proximo-lote");
  } else if(diferencaParaDia14 > 0) {
    elementoBotaoDia14.classList.remove("oferta__lote-botao--proximo-lote");
    elementoBotaoDia14.classList.remove("oferta__lote-botao--expirou");

    elementoBotaoDia13.classList.add("oferta__lote-botao--expirou");
    elementoBotaoDia15.classList.add("oferta__lote-botao--proximo-lote");
  } else if (diferenca > 0) {
    elementoBotaoDia15.classList.remove("oferta__lote-botao--proximo-lote");
    elementoBotaoDia15.classList.remove("oferta__lote-botao--expirou");

    elementoBotaoDia13.classList.add("oferta__lote-botao--expirou");
    elementoBotaoDia14.classList.add("oferta__lote-botao--expirou");    
  }

  const fazerInscricaoDisable = document.querySelectorAll(".oferta__lote-botao--expirou a, .oferta__lote-botao--proximo-lote a");
  fazerInscricaoDisable.forEach(function(a) {
    a.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}, 1000);





/* **************************************************
SLIDES CARROSSEL
*************************************************** */
const SLIDES = [
  "Carrossel-Slide-01-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-02-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-03-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-04-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-05-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-06-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-07-Pag-vendas-Triade-2.png",
  "Carrossel-Slide-08-Pag-vendas-Triade-2.png",
];

window.addEventListener('load', function () {
  const preloadImage = (url) => {
    var img = new Image();
    img.src = url;
  }

  SLIDES.forEach(preloadImage);
});

const setaSlideDireito = document.querySelector("#slide-direito");
const setaSlideEsquerdo = document.querySelector("#slide-esquerdo");
const imgSlide = document.querySelector("#slide");

var slideAtual = 0;

setaSlideDireito.addEventListener("click", function(event){
  event.preventDefault();

  var ehUltimo = (SLIDES.length - 1) == slideAtual;

  if (ehUltimo) {
    slideAtual = 0;
    setaSlideEsquerdo.style.visibility = "hidden";
  } else {
    slideAtual++;
    setaSlideEsquerdo.style.visibility = "visible";
  }

  imgSlide.setAttribute("src", SLIDES[slideAtual]);
  setaSlideEsquerdo.style.visibility = "hidden";
  setaSlideDireito.style.visibility = "hidden";
});

setaSlideEsquerdo.addEventListener("click", function(event){
  event.preventDefault();

  var ehPrimeiro = 0 == slideAtual;

  if (ehPrimeiro) {
    slideAtual = SLIDES.length - 1;
  } else {
    slideAtual--;
  }
  
  if (slideAtual == 0) { // verifico se é o primeiro, mas apos o processamento
    setaSlideEsquerdo.style.visibility = "hidden";
  }

  imgSlide.setAttribute("src", SLIDES[slideAtual]);

  setaSlideEsquerdo.style.visibility = "hidden";
  setaSlideDireito.style.visibility = "hidden";
});

imgSlide.addEventListener("load", (e) => {
  setaSlideDireito.style.visibility = "visible";

  if (slideAtual != 0) {
    setaSlideEsquerdo.style.visibility = "visible";
  }
});


/* **************************************************
DEPOIMENTOS
*************************************************** */
const setaDepoimentoDireito = document.querySelector("#depoimento-direito");
const setaDepoimentoEsquerdo = document.querySelector("#depoimento-esquerdo");
const imgDepoimento = document.querySelector("#depoimento");
const DEPOIMENTOS = [
  "Depoimento-Chaiene-Luz-Triade-2.png",
  "Depoimento-Jessica-Renata-Triade-2.png",
  "Depoimento-Bruna-Triade-2.png",
  "Depoimento-Sheila-Simoes-Triade-2.png",
  "Depoimento-Anielly-Santana-Triade-2.png",
  "Depoimento-Denise-Santorato-Triade-2.png",
  "Depoimento-Emílio-Parmegiani-Triade-2.png",
  "Depoimento-Fatima-de-Melo-Triade-2.png",
  "Depoimento-Gabriela-Aguida-Triade-2.png",
  "Depoimento-Mayara-Rangel-Triade-2.png",
];
var slideAtual = 0;

setaDepoimentoDireito.addEventListener("click", function(event){
  event.preventDefault();

  var ehUltimo = (DEPOIMENTOS.length - 1) == slideAtual;

  if (ehUltimo) {
    slideAtual = 0;
  } else {
    slideAtual++;
  }

  imgDepoimento.setAttribute("src", DEPOIMENTOS[slideAtual]);

  setaDepoimentoEsquerdo.style.visibility = "hidden";
  setaDepoimentoDireito.style.visibility = "hidden";
});

setaDepoimentoEsquerdo.addEventListener("click", function(event){
  event.preventDefault();

  var ehPrimeiro = 0 == slideAtual;

  if (ehPrimeiro) {
    slideAtual = DEPOIMENTOS.length - 1;
  } else {
    slideAtual--;
  }

  imgDepoimento.setAttribute("src", DEPOIMENTOS[slideAtual]);
  setaDepoimentoEsquerdo.style.visibility = "hidden";
  setaDepoimentoDireito.style.visibility = "hidden";
});

imgDepoimento.addEventListener("load", (e) => {
  setaDepoimentoEsquerdo.style.visibility = "visible";
  setaDepoimentoDireito.style.visibility = "visible";
});



















function horaDoServidor(){
  try {
      //FF, Opera, Safari, Chrome
      xmlHttp = new XMLHttpRequest();
  }
  catch (err1) {
      //IE
      try {
          xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
      }
      catch (err2) {
          try {
              xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
          }
          catch (eerr3) {
              //AJAX not supported, use CPU time.
              alert("AJAX not supported");
          }
      }
  }
  xmlHttp.open('HEAD', window.location.href.toString(), false);
  xmlHttp.setRequestHeader("Content-Type", "text/html");
  xmlHttp.send('');

  return xmlHttp.getResponseHeader("Date");
}

function mudarFusoHorario(date, timeZone) {
  if (typeof date === 'string') {
      return new Date(
          new Date(date).toLocaleString('en-US', {
              timeZone,
          }),
      );
  }

  return new Date(
      date.toLocaleString('en-US', {
          timeZone,
      }),
  );
}

