import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameStats } from '../GameStats';

describe('GameStats', () => {
  it('renders all stats correctly', () => {
    render(<GameStats errors={5} successes={8} moves={13} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('13')).toBeInTheDocument();

    expect(screen.getByText('Aciertos')).toBeInTheDocument();
    expect(screen.getByText('Errores')).toBeInTheDocument();
    expect(screen.getByText('Total de Movimientos')).toBeInTheDocument();
  });

  it('renders zero stats correctly', () => {
    render(<GameStats errors={0} successes={0} moves={0} />);

    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(3);
  });

  it('updates when props change', () => {
    const { rerender } = render(<GameStats errors={0} successes={0} moves={0} />);

    expect(screen.getAllByText('0')).toHaveLength(3);

    rerender(<GameStats errors={3} successes={5} moves={8} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});
