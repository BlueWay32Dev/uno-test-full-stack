import React, { useState, useEffect } from "react";
import { Card as CardComponent } from "./Card";
import { GameStats } from "./GameStats";
import { GameOver } from "./GameOver";
import { GameHistory } from "./GameHistory";
import { apiService } from "../services/api.service";
import { useGameHistory } from "../hooks/useGameHistory";
import { Card as CardType, User } from "../types";

interface GameBoardProps {
  user: User;
  onRestart: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ user, onRestart }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [errors, setErrors] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [loading, setLoading] = useState(true);
  const [showingPreview, setShowingPreview] = useState(true);
  const [previewCountdown, setPreviewCountdown] = useState(3);
  const [loadError, setLoadError] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);

  const { games, loading: historyLoading, refreshGames } = useGameHistory(user.run);

  useEffect(() => {
    loadDeck();
  }, []);

  useEffect(() => {
    if (!loading && showingPreview && previewCountdown > 0) {
      const timer = setTimeout(() => {
        setPreviewCountdown(previewCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (previewCountdown === 0 && showingPreview) {
      setShowingPreview(false);
      const hiddenCards = cards.map(c => ({ ...c, isFlipped: false }));
      setCards(hiddenCards);
      setStartTime(Date.now());
    }
  }, [loading, showingPreview, previewCountdown, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs === 8 && cards.length > 0) {
      handleGameComplete();
    }
  }, [matchedPairs]);

  const loadDeck = async () => {
    try {
      setLoadError('');
      const deck = await apiService.getDeck(8);
      const previewDeck = deck.map(card => ({ ...card, isFlipped: true }));
      setCards(previewDeck);
      setShowingPreview(true);
      setPreviewCountdown(3);
    } catch (error) {
      setLoadError('Error al cargar las cartas. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card: CardType) => {
    if (showingPreview || isChecking || flippedCards.length >= 2) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);
  };

  const checkForMatch = () => {
    setIsChecking(true);
    setMoves(moves + 1);

    const [first, second] = flippedCards;

    if (first.imageUrl === second.imageUrl) {
      setTimeout(() => {
        const updatedCards = cards.map((c) =>
          c.imageUrl === first.imageUrl ? { ...c, isMatched: true } : c
        );
        setCards(updatedCards);
        setMatchedPairs(matchedPairs + 1);
        setSuccesses(successes + 1);
        setFlippedCards([]);
        setIsChecking(false);
      }, 600);
    } else {
      setTimeout(() => {
        const updatedCards = cards.map((c) =>
          c.id === first.id || c.id === second.id
            ? { ...c, isFlipped: false }
            : c
        );
        setCards(updatedCards);
        setErrors(errors + 1);
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const handleGameComplete = async () => {
    const timeSeconds = Math.floor((Date.now() - startTime) / 1000);

    try {
      await apiService.createGame({
        run: user.run,
        errors,
        successes,
        totalMoves: moves,
        timeSeconds,
      });
      await refreshGames();
      setGameOver(true);
    } catch (error) {
      setGameOver(true);
    }
  };

  const handleRestart = async () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs(0);
    setErrors(0);
    setSuccesses(0);
    setMoves(0);
    setGameOver(false);
    setShowingPreview(true);
    setPreviewCountdown(3);
    setLoading(true);
    await loadDeck();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 mb-4">
            Cargando juego...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-center mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Error al cargar el juego
          </h2>
          <p className="text-gray-600 mb-4 text-center">{loadError}</p>
          <button
            onClick={loadDeck}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <GameOver
        userName={user.name}
        errors={errors}
        successes={successes}
        moves={moves}
        timeSeconds={Math.floor((Date.now() - startTime) / 1000)}
        onRestart={handleRestart}
        onExit={onRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  Bienvenido, {user.name}!
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 lg:hidden"
                  >
                    {showHistory ? 'Ocultar' : 'Historial'}
                  </button>
                  <button
                    onClick={onRestart}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition duration-200"
                  >
                    Salir del juego
                  </button>
                </div>
              </div>
              <GameStats errors={errors} successes={successes} moves={moves} />
            </div>

            {showHistory && (
              <div className="mb-6 lg:hidden">
                <GameHistory games={games} loading={historyLoading} />
              </div>
            )}

            {showingPreview && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 text-center">
                  <h2 className="text-3xl font-bold text-purple-600 mb-4">
                    ¡Memoriza las cartas!
                  </h2>
                  <div className="text-6xl font-bold text-purple-500">
                    {previewCountdown}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              {cards.map((card) => (
                <CardComponent
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  disabled={isChecking || showingPreview}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <GameHistory games={games} loading={historyLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
