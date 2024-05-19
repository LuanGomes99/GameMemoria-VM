function submitScore() {
  const playerName = document.getElementById('player-name').value;
  const current_time = parseInt(localStorage.getItem('current_time'));
  const matched_pairs = parseInt(localStorage.getItem('current_matchedCards'));

  if (matched_pairs >= 0 && current_time && playerName !== "") {
    console.log('depois');
    console.log(localStorage.getItem('current_time'));
    console.log(localStorage.getItem('current_matchedCards'));
    console.log(playerName);

    const current_score = (matched_pairs * 20) + (60 - current_time);

    localStorage.setItem('currentPlayerName', playerName);
    localStorage.setItem('currentPlayerScore', current_score);

    const user_score = JSON.parse(localStorage.getItem('scores')) || [];
    user_score.push({ name: playerName, score: current_score });

    user_score.sort((a, b) => b.score - a.score);
    localStorage.setItem('scores', JSON.stringify(user_score));
    console.log(`Pontos atuais: ${user_score}`);

    window.location.href = 'ranking.html';
  } else {
    alert('Por favor, insira seu nome.');
  }
}
