import { useState } from "react";

const Square = ({ value, onSquare }) => {
  return (
    <button className="square" onClick={onSquare}>
      {value}
    </button>
  );
};

export default function Board() {
  const [nextPlayer, setNextPlayer] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function reset() {
    setSquares(Array(9).fill(null));
    setNextPlayer(true);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquare = squares.slice();
    if (nextPlayer) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }

    setSquares(nextSquare);
    setNextPlayer(!nextPlayer);
  }

  let status;

  if (calculateWinner(squares)) {
    status = `Winner:  ${calculateWinner(squares)} !!!`;
  } else {
    status = "Player: " + (nextPlayer ? "X" : "O");
  }

  return (
    <>
      <div className="game-board">
        <h2>Tic Tac Toe!</h2>
        <div className="status">{status}</div>
        <div className="tic-tac-toe">
          <div className="board-row">
            <Square onSquare={() => handleClick(0)} value={squares[0]} />
            <Square onSquare={() => handleClick(1)} value={squares[1]} />
            <Square onSquare={() => handleClick(2)} value={squares[2]} />
          </div>
          <div className="board-row">
            <Square onSquare={() => handleClick(3)} value={squares[3]} />
            <Square onSquare={() => handleClick(4)} value={squares[4]} />
            <Square onSquare={() => handleClick(5)} value={squares[5]} />
          </div>
          <div className="board-row">
            <Square onSquare={() => handleClick(6)} value={squares[6]} />
            <Square onSquare={() => handleClick(7)} value={squares[7]} />
            <Square onSquare={() => handleClick(8)} value={squares[8]} />
          </div>
          <button onClick={() => reset()} className="reset">
            Reset <ion-icon name="sync-circle"></ion-icon>
          </button>
        </div>
      </div>
    </>
  );
}

const calculateWinner = (squares) => {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
