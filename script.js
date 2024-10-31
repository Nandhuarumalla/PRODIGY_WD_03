const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const xMovesDisplay = document.getElementById('x-moves');
const oMovesDisplay = document.getElementById('o-moves');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xMoves = 0;
let oMoves = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = clickedCell.getAttribute('data-index');

  if (boardState[clickedIndex] !== '' || !gameActive) return;

  updateCell(clickedCell, clickedIndex);
  checkWinner();
}

function updateCell(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Update move count
  if (currentPlayer === 'X') {
    xMoves++;
    xMovesDisplay.textContent = xMoves;
  } else {
    oMoves++;
    oMovesDisplay.textContent = oMoves;
  }
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.textContent = "Player " + currentPlayer + " Wins!";
    gameActive = false;
    return;
  }

  if (!boardState.includes('')) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  xMoves = 0;
  oMoves = 0;
  
  document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
  message.textContent = '';
  
  // Reset move displays
  xMovesDisplay.textContent = xMoves;
  oMovesDisplay.textContent = oMoves;
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
