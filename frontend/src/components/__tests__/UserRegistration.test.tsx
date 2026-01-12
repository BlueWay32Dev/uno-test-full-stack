import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserRegistration } from '../UserRegistration';
import { apiService } from '../../services/api.service';

jest.mock('../../services/api.service');

describe('UserRegistration', () => {
  const mockOnUserRegistered = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders registration form', () => {
    render(<UserRegistration onUserRegistered={mockOnUserRegistered} />);

    expect(screen.getByText('Memory Game')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RUN/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Comenzar Juego/i })).toBeInTheDocument();
  });

  it('validates empty name', async () => {
    render(<UserRegistration onUserRegistered={mockOnUserRegistered} />);

    const submitButton = screen.getByRole('button', { name: /Comenzar Juego/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
    });
  });

  it('validates invalid RUN format', async () => {
    render(<UserRegistration onUserRegistered={mockOnUserRegistered} />);

    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/RUN/i), {
      target: { value: 'invalid' },
    });

    const submitButton = screen.getByRole('button', { name: /Comenzar Juego/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/El RUT debe tener el formato XXXXXXXX-X/i)
      ).toBeInTheDocument();
    });
  });

  it('submits valid form', async () => {
    const mockUser = {
      id: '123',
      name: 'John Doe',
      run: '12345678-9',
      createdAt: '2024-01-01',
    };

    (apiService.getUserByRun as jest.Mock).mockRejectedValue({ response: { status: 404 } });
    (apiService.createUser as jest.Mock).mockResolvedValue(mockUser);

    render(<UserRegistration onUserRegistered={mockOnUserRegistered} />);

    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/RUN/i), {
      target: { value: '12345678-9' },
    });

    const submitButton = screen.getByRole('button', { name: /Comenzar Juego/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUserRegistered).toHaveBeenCalledWith(mockUser);
    });
  });

  it('handles duplicate RUN error', async () => {
    (apiService.getUserByRun as jest.Mock).mockRejectedValue({ response: { status: 404 } });
    (apiService.createUser as jest.Mock).mockRejectedValue({
      response: { status: 409 },
    });

    render(<UserRegistration onUserRegistered={mockOnUserRegistered} />);

    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/RUN/i), {
      target: { value: '12345678-9' },
    });

    const submitButton = screen.getByRole('button', { name: /Comenzar Juego/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Este RUT ya está registrado')).toBeInTheDocument();
    });
  });
});
