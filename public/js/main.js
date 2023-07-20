// select the necessary elements from the HTML document using the 
// getElementById and querySelectorAll methods and store them in variables.
const gameBoard = document.querySelector('#gameBoard');
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('resetButton');
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let currentPlayer = 'X';
let isGameActive = true;

cells.forEach(cell => cell.addEventListener ('click',handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(c){
    const cell = c.target;
    const index = Array.from(cells).indexOf(cell);

    if (!isGameActive || cell.textContent !== '') return;

    placeMark(cell, index);
    if(checkWinner()){
        isGameActive = false;
        alert(`Player ${currentPlayer} wins!`);
    } else if (fullBoard()){
        isGameActive = false;
        alert('Its a draw game');
    }else {
        switchPlayer()
    }
}

// creating the function to check winner
function placeMark(cell,index){
    cell.textContent = currentPlayer;
}

// creating function to switch players
function switchPlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

// creating function to check winner
function checkWinner(){
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === currentPlayer);
    })
}

// creating a function to show full Board
function fullBoard() {
    return [...cells].every(cell => cell.textContent !== '');
}

// creating function to reset the game 
function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    isGameActive = true;
  }


