import React from 'react';

interface GameOverProps {
  userName: string;
  errors: number;
  successes: number;
  moves: number;
  timeSeconds: number;
  onRestart: () => void;
  onExit: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  userName,
  errors,
  successes,
  moves,
  timeSeconds,
  onRestart,
  onExit,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ¡Felicitaciones!
          </h1>
          <p className="text-xl text-gray-600">{userName}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-green-100 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-700">Aciertos:</span>
            <span className="text-2xl font-bold text-green-600">{successes}</span>
          </div>
          <div className="bg-red-100 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-700">Errores:</span>
            <span className="text-2xl font-bold text-red-600">{errors}</span>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-700">Total de Movimientos:</span>
            <span className="text-2xl font-bold text-blue-600">{moves}</span>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-700">Tiempo:</span>
            <span className="text-2xl font-bold text-purple-600">
              {formatTime(timeSeconds)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Jugar Nuevamente
          </button>
          <button
            onClick={onExit}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
