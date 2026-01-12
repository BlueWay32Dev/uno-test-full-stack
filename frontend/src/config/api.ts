export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  GAMES: `${API_BASE_URL}/games`,
  IMAGES_DECK: `${API_BASE_URL}/images/deck`,
  GAMES_BY_RUN: (run: string) => `${API_BASE_URL}/games/by-run/${run}`,
};
