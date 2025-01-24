let players = [];
let currentPlayerIndex = 0;
let spinning = false;

const truthQuestions = [
  "What is your most embarrassing moment?", 
  "Who was your first crush?", 
  /* ... add 48 more truth questions ... */
];

const dares = [
  "Do 20 push-ups.", 
  "Sing your favorite song loudly.", 
  /* ... add 48 more dares ... */
];

// Initialize game
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('spin-button').addEventListener('click', spinWheel);
document.getElementById('truth-button').addEventListener('click', () => showTask('truth'));
document.getElementById('dare-button').addEventListener('click', () => showTask('dare'));
document.getElementById('next-button').addEventListener('click', nextTurn);

function startGame() {
  const playerNamesInput = document.getElementById('player-names').value.trim();
  if (!playerNamesInput) {
    alert('Please enter player names.');
    return;
  }
  players = playerNamesInput.split(',').map(name => name.trim()).filter(name => name);
  if (players.length < 2) {
    alert('Please enter at least two players.');
    return;
  }
  document.getElementById('setup-section').classList.add('hidden');
  document.getElementById('game-section').classList.remove('hidden');
  showCurrentPlayer();
}

function showCurrentPlayer() {
  const currentPlayer = players[currentPlayerIndex];
  document.getElementById('current-player').textContent = `It's ${currentPlayer}'s turn!`;
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  const wheel = document.getElementById('wheel');
  const randomDegree = Math.floor(Math.random() * 360) + 7200;
  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  setTimeout(() => {
    spinning = false;
    document.getElementById('task-section').classList.remove('hidden');
  }, 4000);
}

function showTask(type) {
  const taskList = type === 'truth' ? truthQuestions : dares;
  const task = taskList[Math.floor(Math.random() * taskList.length)];
  document.getElementById('task-output').textContent = task;
  document.getElementById('truth-button').classList.add('hidden');
  document.getElementById('dare-button').classList.add('hidden');
  document.getElementById('next-button').classList.remove('hidden');
}

function nextTurn() {
  document.getElementById('task-section').classList.add('hidden');
  document.getElementById('truth-button').classList.remove('hidden');
  document.getElementById('dare-button').classList.remove('hidden');
  document.getElementById('task-output').textContent = '';
  document.getElementById('next-button').classList.add('hidden');
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  showCurrentPlayer();
}