const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
let currentPlayer = 'X';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    cell.removeEventListener('click', handleClick);

    if (checkWin(currentPlayer)) {
        gameStatus.textContent = `${currentPlayer} thắng cuộc!`;
        endGame();
    } else if (isDraw()) {
        gameStatus.textContent = 'Hòa!';
        endGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
