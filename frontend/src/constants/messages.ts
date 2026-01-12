export const ERROR_MESSAGES = {
  USER_REGISTRATION_FAILED:
    "Error al registrar el usuario. Favor volver a intentar",
  RUN_ALREADY_REGISTERED: "Este RUT ya está registrado",
  NETWORK_ERROR: "Error de conexión. Por favor, intenta nuevamente",
  GENERIC_ERROR: "Ha ocurrido un error inesperado",
} as const;

export const SUCCESS_MESSAGES = {
  USER_REGISTERED: "Usuario registrado exitosamente",
  GAME_COMPLETED: "¡Felicitaciones! Has completado el juego",
} as const;

export const UI_TEXT = {
  WELCOME_TITLE: "Memory Game",
  WELCOME_SUBTITLE: "Bienvenido a tu desafío de concentración",
  START_GAME: "Comenzar Juego",
  LOADING: "Cargando...",
  REGISTERING: "Registrando...",
  PLAY_AGAIN: "Jugar Nuevamente",
  EXIT: "Salir",
  POWERED_BY: "Creado por",
} as const;

export const FORM_LABELS = {
  FULL_NAME: "Nombre Completo",
  RUN: "RUN",
  NAME_PLACEHOLDER: "Ingresa tu nombre",
  RUN_PLACEHOLDER: "12345678-9",
  RUN_FORMAT: "Formato: XXXXXXXX-X",
} as const;
