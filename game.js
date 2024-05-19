const images = ['./assets/csharp.png', './assets/excel.png', './assets/html.png', './assets/illustrator.png', './assets/js.png', './assets/photoshop.png', './assets/pp.png', './assets/premiere.png', './assets/win11.png', './assets/word.png'];

let cards = images.concat(images); // Duplica as imagens para formar os pares
let flippedCards = [];
let matchedCards = [];
let timer; // Variável para armazenar o contador
let lockBoard = false; // Variável para bloquear o tabuleiro enquanto as cartas são verificadas

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  cards = shuffle(cards);
  const grid = document.querySelector('.memory-grid');
  grid.innerHTML = ''; // Limpa qualquer conteúdo anterior

  cards.forEach((card, index) => {
    const square = document.createElement('div');
    square.classList.add('memory-square');
    square.setAttribute('data-index', index);
    square.addEventListener('click', () => flipCard(square));

    // Adiciona a parte de trás da carta com a imagem da logo
    const back = document.createElement('div');
    back.classList.add('back');
    square.appendChild(back);

    // Adiciona a parte da frente da carta com a imagem do par
    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url(${card})`;
    square.appendChild(front);

    grid.appendChild(square);
  });

  // Inicia o contador regressivo
  startTimer();
}

function flipCard(card) {
  if (lockBoard) return; // Bloqueia o tabuleiro se estiver em processo de verificação
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      lockBoard = true; // Bloqueia o tabuleiro enquanto verifica as cartas
      setTimeout(checkMatch, 225); // Ajuste o tempo conforme necessário
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (cards[firstCard.dataset.index] === cards[secondCard.dataset.index]) {
    matchedCards.push(firstCard, secondCard);
    flippedCards = [];
    lockBoard = false; // Desbloqueia o tabuleiro após verificar as cartas

    if (matchedCards.length === cards.length) {
      clearInterval(timer); // Para o contador quando o jogo é vencido

      localStorage.setItem('current_matchedCards', matchedCards.length);
      localStorage.setItem('current_time', (60 - parseInt(document.querySelector('.time-circle p').textContent.split('s')[0])))

      window.location.href = 'pontos.html';
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false; // Desbloqueia o tabuleiro após desvirar as cartas
    }, 225); // Ajuste o tempo conforme necessário
  }
}

function startTimer() {
  let seconds = 60; // Tempo inicial de 60 segundos

  timer = setInterval(() => {
    seconds--;
    document.querySelector('.time-circle p').textContent = `${seconds}s`;

    if (seconds === 0) {
      clearInterval(timer); // Para o contador quando o tempo acabar

      localStorage.setItem('current_matchedCards', matchedCards.length);
      localStorage.setItem('current_time', (60 - parseInt(document.querySelector('.time-circle p').textContent.split('s')[0])))

      // Redireciona para a página de pontos
      window.location.href = 'pontos.html';
    }
  }, 1000);
}

function preloadImages(imageArray, callback) {
  let loadedImages = 0;
  const totalImages = imageArray.length;

  imageArray.forEach((imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };
    img.onerror = img.onabort = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };
  });
}

// Pré-carrega as imagens antes de iniciar o jogo
preloadImages(images, startGame);