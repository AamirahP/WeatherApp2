import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherApp from './WeatherApp';

test('renders default city and temperature', () => {
  render(<WeatherApp />);
  const defaultCity = screen.getByText(/London/i);
  const defaultTemp = screen.getByText(/\d+°C/); // Matches any temperature format like "18°C"
  expect(defaultCity).toBeInTheDocument();
  expect(defaultTemp).toBeInTheDocument();
});
