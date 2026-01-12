import React from 'react';

interface GameStatsProps {
  errors: number;
  successes: number;
  moves: number;
}

export const GameStats: React.FC<GameStatsProps> = React.memo(({ errors, successes, moves }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-600">{successes}</div>
        <div className="text-sm text-gray-600">Aciertos</div>
      </div>
      <div className="bg-red-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-red-600">{errors}</div>
        <div className="text-sm text-gray-600">Errores</div>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-600">{moves}</div>
        <div className="text-sm text-gray-600">Total de Movimientos</div>
      </div>
    </div>
  );
});

GameStats.displayName = 'GameStats';
