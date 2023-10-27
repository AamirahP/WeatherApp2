import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherApp from './WeatherApp';

test('renders WeatherApp component', () => {
  render(<WeatherApp />);
  const searchInput = screen.getByPlaceholderText('Search');
  expect(searchInput).toBeInTheDocument();
});

test('displays location after searching', async () => {
  render(<WeatherApp />);
  const searchInput = screen.getByPlaceholderText('Search');
  const searchButton = screen.getByAltText('Search icon');

  fireEvent.change(searchInput, { target: { value: 'London' } });
  fireEvent.click(searchButton);

  
  await screen.findByText('London');

  
});