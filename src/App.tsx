import { useState } from "react";
import "./App.css";

// Imagem para X (substitua pelo seu próprio arquivo ou URL)
const X_IMAGE = "https://img.icons8.com/color/96/close-window.png"; // Imagem para X

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  backgroundColor: string;
}

function Square({ value, onSquareClick, backgroundColor }: SquareProps) {
  return (
    <button
      className="w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center border-2 border-gray-800 rounded-lg bg-white/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
      onClick={onSquareClick}
      style={{ backgroundColor }}
    >
      {value === "X" && <img src={X_IMAGE} alt="X" className="w-16 h-16" />}
      {value === "O" && (
        <span className="text-5xl font-bold text-green-600">O</span>
      )}
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
    status = "Ganhador: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "Deu Velha! Reinicie o jogo.";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-500 to-indigo-600 relative overflow-hidden">
      {/* Detalhes do fundo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {/* Linhas do tabuleiro */}
        <div className="w-full h-full grid grid-cols-3 gap-2 sm:gap-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="border-2 border-gray-800/30 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
      {/* Símbolos "X" e "O" espalhados */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="text-9xl text-white/30 absolute top-10 left-10">
          X
        </span>
        <span className="text-9xl text-white/30 absolute top-10 right-10">
          O
        </span>
        <span className="text-9xl text-white/30 absolute bottom-10 left-10">
          O
        </span>
        <span className="text-9xl text-white/30 absolute bottom-10 right-10">
          X
        </span>
      </div>

      {/* Conteúdo principal */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl relative z-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 text-center">
          Jogo da Velha
        </h1>
        <div className="text-xl sm:text-3xl font-semibold text-white mb-6 text-center">
          {status}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {squares.map((square, index) => (
            <Square
              key={index}
              value={square}
              onSquareClick={() => handleClick(index)}
              backgroundColor={
                square === "X"
                  ? "rgba(255, 71, 87, 0.8)"
                  : square === "O"
                  ? "rgba(46, 213, 115, 0.8)"
                  : "rgba(255, 255, 255, 0.8)"
              }
            />
          ))}
        </div>
        <button
          className="mt-8 w-full px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-800"
          onClick={() => {
            setSquares(Array(9).fill(null));
            setXIsNext(true);
          }}
        >
          Reiniciar Jogo
        </button>
      </div>
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
