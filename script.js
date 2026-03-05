const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => cellClicked(cell, index));
});

function cellClicked(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let win = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      win = true;
      break;
    }
  }

  if (win) {
    showResult(`Player ${currentPlayer} Wins! 🎉`);
    return;
  }

  if (!board.includes("")) {
    showResult("It's a Draw 😐");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function showResult(message) {
  gameActive = false;
  gameScreen.style.display = "none";
  resultScreen.style.display = "block";
  resultText.textContent = message;
}

function newGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";

  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
}