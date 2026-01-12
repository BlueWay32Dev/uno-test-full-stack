import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { Card, User, Game, CreateUserRequest, CreateGameRequest } from '../types';

export const apiService = {
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await axios.post<User>(API_ENDPOINTS.USERS, userData);
    return response.data;
  },

  async getUserByRun(run: string): Promise<User> {
    const response = await axios.get<User>(`${API_ENDPOINTS.USERS}/${run}`);
    return response.data;
  },

  async getDeck(pairs: number = 8): Promise<Card[]> {
    const response = await axios.get<Card[]>(API_ENDPOINTS.IMAGES_DECK, {
      params: { pairs },
    });
    return response.data;
  },

  async createGame(gameData: CreateGameRequest): Promise<Game> {
    const response = await axios.post<Game>(API_ENDPOINTS.GAMES, gameData);
    return response.data;
  },

  async getGamesByRun(run: string): Promise<Game[]> {
    const response = await axios.get<Game[]>(API_ENDPOINTS.GAMES_BY_RUN(run));
    return response.data;
  },
};
