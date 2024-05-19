document.addEventListener('DOMContentLoaded', function () {
  // Função para carregar os scores do localStorage e exibi-los no ranking
  function loadScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Ordena os scores em ordem decrescente
    scores.sort((a, b) => b.score - a.score);

    // Salva o ranking completo para referência
    const fullRanking = [...scores];

    // Se houver mais de 10 scores, mantém apenas os 10 melhores
    const top10Scores = scores.slice(0, 10);

    const table = document.querySelector('.table');
    table.innerHTML = ''; // Limpa qualquer conteúdo anterior

    top10Scores.forEach((score, index) => {
      const row = document.createElement('div');
      row.classList.add('row');

      const placeCell = document.createElement('div');
      placeCell.classList.add('cell');
      placeCell.textContent = `${index + 1}º`;
      row.appendChild(placeCell);

      const nameCell = document.createElement('div');
      nameCell.classList.add('cell');
      nameCell.textContent = score.name;
      row.appendChild(nameCell);

      const scoreCell = document.createElement('div');
      scoreCell.classList.add('cell');
      scoreCell.textContent = score.score;
      row.appendChild(scoreCell);

      table.appendChild(row);
    });

    // Verifica se o jogador atual está fora do top 10 e exibe sua posição
    const currentPlayerName = localStorage.getItem('currentPlayerName');
    const currentPlayerScore = parseInt(localStorage.getItem('currentPlayerScore'), 10); // Adicionado base 10 para o parseInt

    if (currentPlayerName && !isNaN(currentPlayerScore)) {
      const currentPlayerPosition = fullRanking.findIndex(score => score.name === currentPlayerName && score.score === currentPlayerScore) + 1;

      if (currentPlayerPosition > 10) {
        const row = document.createElement('div');
        row.classList.add('row');

        const placeCell = document.createElement('div');
        placeCell.classList.add('cell');
        placeCell.textContent = `${currentPlayerPosition}º`;
        row.appendChild(placeCell);

        const nameCell = document.createElement('div');
        nameCell.classList.add('cell');
        nameCell.textContent = currentPlayerName;
        row.appendChild(nameCell);

        const scoreCell = document.createElement('div');
        scoreCell.classList.add('cell');
        scoreCell.textContent = currentPlayerScore;
        row.appendChild(scoreCell);

        table.appendChild(row);
      }
    } else if (currentPlayerName && currentPlayerScore && currentPlayerScore > 0) {
      const currentPlayerPosition = fullRanking.findIndex(score => score.name === currentPlayerName && score.score === currentPlayerScore) + 1;

      if (currentPlayerPosition <= 10) {
        const row = document.createElement('div');
        row.classList.add('row');

        const placeCell = document.createElement('div');
        placeCell.classList.add('cell');
        placeCell.textContent = `${currentPlayerPosition}º`;
        row.appendChild(placeCell);

        const nameCell = document.createElement('div');
        nameCell.classList.add('cell');
        nameCell.textContent = currentPlayerName;
        row.appendChild(nameCell);

        const scoreCell = document.createElement('div');
        scoreCell.classList.add('cell');
        scoreCell.textContent = currentPlayerScore;
        row.appendChild(scoreCell);

        table.appendChild(row);
      }
    }
  }

  // Função para adicionar o jogador ao ranking
  function addPlayerToRanking() {
    const playerName = localStorage.getItem('currentPlayerName');
    const playerScore = parseInt(localStorage.getItem('currentPlayerScore'), 10); // Adicionado base 10 para o parseInt

    if (playerName && !isNaN(playerScore) && playerScore > 0) {
      let scores = JSON.parse(localStorage.getItem('scores')) || [];

      // Verifica se o jogador já está no ranking para evitar duplicatas
      const playerIndex = scores.findIndex(score => score.name === playerName && score.score === playerScore);
      if (playerIndex === -1) {
        scores.push({ name: playerName, score: playerScore });

        // Ordena os scores em ordem decrescente
        scores.sort((a, b) => b.score - a.score);

        // Salva os scores de volta no localStorage
        localStorage.setItem('scores', JSON.stringify(scores));

        // Remove os dados do jogador atual do localStorage
        localStorage.removeItem('currentPlayerName');
        localStorage.removeItem('currentPlayerScore');
      }
    }

    loadScores();
  }

  addPlayerToRanking();
  loadScores();
});
