import React from 'react';
import { Game } from '../types';

interface GameHistoryProps {
  games: Game[];
  loading: boolean;
}

export const GameHistory: React.FC<GameHistoryProps> = React.memo(({ games, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Partidas</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Partidas</h2>
        <p className="text-gray-500 text-center py-8">
          No hay partidas registradas aún. ¡Juega tu primera partida!
        </p>
      </div>
    );
  }

  const formatTime = (seconds?: number): string => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const bestGame = games.reduce((best, game) => {
    if (!best || game.errors < best.errors) return game;
    if (game.errors === best.errors && game.timeSeconds && best.timeSeconds) {
      return game.timeSeconds < best.timeSeconds ? game : best;
    }
    return best;
  }, games[0]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Partidas</h2>

      {bestGame && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg mb-4 border-2 border-yellow-400">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏆</span>
            <h3 className="font-bold text-gray-800">Mejor Partida</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Errores:</span>
              <span className="font-bold text-red-600 ml-1">{bestGame.errors}</span>
            </div>
            <div>
              <span className="text-gray-600">Aciertos:</span>
              <span className="font-bold text-green-600 ml-1">{bestGame.successes}</span>
            </div>
            <div>
              <span className="text-gray-600">Tiempo:</span>
              <span className="font-bold text-purple-600 ml-1">{formatTime(bestGame.timeSeconds)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {games.slice(0, 10).map((game, index) => (
          <div
            key={game.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">{formatDate(game.createdAt)}</span>
              {game.id === bestGame.id && (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                  Mejor
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="text-center">
                <div className="text-xs text-gray-600">Aciertos</div>
                <div className="font-bold text-green-600">{game.successes}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600">Errores</div>
                <div className="font-bold text-red-600">{game.errors}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600">Movimientos</div>
                <div className="font-bold text-blue-600">{game.totalMoves}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600">Tiempo</div>
                <div className="font-bold text-purple-600">{formatTime(game.timeSeconds)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {games.length > 10 && (
        <p className="text-xs text-gray-500 text-center mt-4">
          Mostrando las últimas 10 partidas de {games.length} totales
        </p>
      )}
    </div>
  );
});

GameHistory.displayName = 'GameHistory';
