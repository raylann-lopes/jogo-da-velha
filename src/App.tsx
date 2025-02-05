import { useState } from "react";
import "./App.css";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  backgroundColor: string; // Nova propriedade para a cor de fundo
}

function Square({ value, onSquareClick, backgroundColor }: SquareProps) {
  return (
    <button
      className="square w-25 h-20 gap-2"
      onClick={onSquareClick}
      style={{ backgroundColor }} // Define a cor de fundo
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return; // Square is already occupied
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status text-5xl py-14"> {status}</div>
      <div className="board-row grid grid-cols-3 gap-2 text-3xl text-red-700">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleClick(index)}
            backgroundColor={
              square === "X" ? "blue" : square === "O" ? "pink" : "white"
            } // Define a cor com base no valor
          />
        ))}
      </div>
    </>
  );
}

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
