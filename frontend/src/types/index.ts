export interface Card {
  id: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface User {
  id: string;
  name: string;
  run: string;
  createdAt: string;
}

export interface Game {
  id: string;
  errors: number;
  successes: number;
  totalMoves: number;
  timeSeconds?: number;
  createdAt: string;
  user: User;
}

export interface CreateUserRequest {
  name: string;
  run: string;
}

export interface CreateGameRequest {
  run: string;
  errors: number;
  successes: number;
  totalMoves: number;
  timeSeconds?: number;
}
