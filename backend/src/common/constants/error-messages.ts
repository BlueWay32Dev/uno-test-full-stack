export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: 'User not found',
    RUN_ALREADY_EXISTS: 'User with this RUN already exists',
    INVALID_RUN_FORMAT: 'Invalid RUN format',
  },
  GAME: {
    NOT_FOUND: 'Game not found',
    INVALID_DATA: 'Invalid game data',
  },
  IMAGES: {
    FETCH_FAILED: 'Failed to fetch images from external API',
    INVALID_PAIRS: 'Invalid number of pairs requested',
  },
  GENERIC: {
    INTERNAL_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
  },
} as const;

export const VALIDATION_MESSAGES = {
  RUN: {
    REQUIRED: 'RUN is required',
    FORMAT: 'RUN must follow format: XXXXXXXX-X',
  },
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: 'Name must be at least 2 characters long',
  },
  GAME: {
    ERRORS_REQUIRED: 'Errors count is required',
    SUCCESSES_REQUIRED: 'Successes count is required',
    TOTAL_MOVES_REQUIRED: 'Total moves is required',
    TIME_REQUIRED: 'Time in seconds is required',
  },
} as const;
