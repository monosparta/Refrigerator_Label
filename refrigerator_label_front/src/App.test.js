import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/雲端智慧標籤系統/i);
  expect(linkElement).toBeInTheDocument();
});
