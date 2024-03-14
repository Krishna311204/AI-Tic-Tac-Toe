document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const message = document.getElementById('message');
  const restartButton = document.getElementById('restart-btn');

  let currentPlayer = 'X';
  let winner = null;
  let aiPlayer = 'O';

  // Function to check for a win
  const checkWin = (player) => {
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

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (cells[a].innerText === player && cells[b].innerText === player && cells[c].innerText === player) {
        return true;
      }
    }

    return false;
  };

  // Function to check for a draw
  const checkDraw = () => {
    return [...cells].every(cell => cell.innerText !== '');
  };

  // Function to handle cell click
  const handleCellClick = (index) => {
    if (!cells[index].innerText && !winner) {
      cells[index].innerText = currentPlayer;
      if (checkWin(currentPlayer)) {
        message.innerText = `${currentPlayer} wins!`;
        winner = currentPlayer;
      } else if (checkDraw()) {
        message.innerText = `It's a draw!`;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === aiPlayer) {
          playAI();
        }
      }
    }
  };

  // Function to let the AI make a move
  const playAI = () => {
    let emptyCells = [];
    cells.forEach((cell, index) => {
      if (cell.innerText === '') {
        emptyCells.push(index);
      }
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleCellClick(emptyCells[randomIndex]);
  };

  // Function to handle restart
  const restartGame = () => {
    cells.forEach(cell => {
      cell.innerText = '';
    });
    currentPlayer = 'X';
    winner = null;
    message.innerText = '';
    if (currentPlayer === aiPlayer) {
      playAI();
    }
  };

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
  });

  restartButton.addEventListener('click', restartGame);
});
