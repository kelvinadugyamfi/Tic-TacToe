const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('[data-cell]');
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
let currentPlayer = 'X';
let isGameActive = true;

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (!isGameActive || cell.textContent !== '') return;

  placeMark(cell, index);
  if (checkWin()) {
    isGameActive = false;
    alert(`${currentPlayer} wins!`);
  } else if (isBoardFull()) {
    isGameActive = false;
    alert("It's a draw!");
  } else {
    togglePlayer();
  }
}

function placeMark(cell, index) {
  cell.textContent = currentPlayer;
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].textContent === currentPlayer);
  });
}

function isBoardFull() {
  return [...cells].every(cell => cell.textContent !== '');
}

