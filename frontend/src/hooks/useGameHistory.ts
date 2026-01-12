import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';
import { Game } from '../types';

export const useGameHistory = (run: string | null) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!run) {
      setGames([]);
      return;
    }

    const fetchGames = async () => {
      setLoading(true);
      setError('');

      try {
        const fetchedGames = await apiService.getGamesByRun(run);
        setGames(fetchedGames.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (err: any) {
        if (err.response?.status !== 404) {
          setError('Error al cargar el historial de partidas');
        }
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [run]);

  const refreshGames = async () => {
    if (!run) return;

    try {
      const fetchedGames = await apiService.getGamesByRun(run);
      setGames(fetchedGames.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (err) {
      console.error('Error refreshing games:', err);
    }
  };

  return {
    games,
    loading,
    error,
    refreshGames,
  };
};
