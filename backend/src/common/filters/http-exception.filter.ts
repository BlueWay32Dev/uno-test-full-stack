import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = this.translateMessage(exceptionResponse);
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        message = this.translateMessage(
          Array.isArray(responseObj.message) ? responseObj.message[0] : responseObj.message,
        );
        error = responseObj.error || 'Error';
      }
    } else if (exception instanceof Error) {
      this.logger.error(`Error: ${exception.message}`, exception.stack);
      message = this.translateErrorMessage(exception.message);
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
    };

    this.logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse));

    response.status(status).json(errorResponse);
  }

  private translateMessage(message: string): string {
    const translations: Record<string, string> = {
      // Validation errors
      'name should not be empty': 'El nombre es requerido',
      'name must be a string': 'El nombre debe ser texto',
      'run should not be empty': 'El RUN es requerido',
      'run must be a string': 'El RUN debe ser texto',
      'errors must be a number': 'Los errores deben ser un número',
      'successes must be a number': 'Los aciertos deben ser un número',
      'totalMoves must be a number': 'Los movimientos deben ser un número',
      'timeSeconds must be a number': 'El tiempo debe ser un número',

      'User not found': 'Usuario no encontrado',
      'Game not found': 'Juego no encontrado',
      'Not Found': 'No encontrado',

      'User with this RUN already exists': 'Este RUN ya está registrado',
      Conflict: 'Conflicto',

      'Bad Request': 'Solicitud incorrecta',
      'Validation failed': 'Validación fallida',

      'Internal server error': 'Error interno del servidor',
      'Service Unavailable': 'Servicio no disponible',
    };

    return translations[message] || message;
  }

  private translateErrorMessage(message: string): string {
    if (message.includes('relation') && message.includes('does not exist')) {
      return 'Error de base de datos: tabla no encontrada';
    }

    if (message.includes('ECONNREFUSED')) {
      return 'Error de conexión con la base de datos';
    }

    if (message.includes('duplicate key')) {
      return 'Este registro ya existe';
    }

    if (message.includes('Connection')) {
      return 'Error de conexión. Por favor, intenta nuevamente';
    }

    return 'Error interno del servidor. Por favor, contacta al administrador';
  }
}
