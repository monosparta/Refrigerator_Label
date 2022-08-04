import { render, screen } from '@testing-library/react';
import Routers from './Routers';

test('renders learn react link', () => {
  render(<Routers />);
  const linkElement = screen.getByText(/雲端智慧標籤系統/i);
  expect(linkElement).toBeInTheDocument();
});
