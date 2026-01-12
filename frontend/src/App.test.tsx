import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders memory game app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Memory Game/i);
  expect(titleElement).toBeInTheDocument();
});
