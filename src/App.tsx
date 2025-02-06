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
      className={`w-24 h-24 text-3xl font-bold border-2 border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-300`}
      onClick={onSquareClick}
      style={{ backgroundColor }}
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
  } else if (squares.every((square) => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Jogo da Velha</h1>
      <div className="text-2xl font-semibold text-gray-800 mb-6">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleClick(index)}
            backgroundColor={
              square === "X"
                ? "#ff4757"
                : square === "O"
                ? "#2ed573"
                : "#ffffff"
            }
          />
        ))}
      </div>
      <button
        className="mt-8 px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300"
        onClick={() => {
          setSquares(Array(9).fill(null));
          setXIsNext(true);
        }}
      >
        Reiniciar Jogo
      </button>
    </div>
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
