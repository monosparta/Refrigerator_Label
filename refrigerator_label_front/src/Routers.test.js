import { render, screen } from '@testing-library/react';
import Routers from './Routers';

test('renders learn react link', () => {
  render(<Routers />);
  const linkElement = screen.getByText(/Cloud Smart Label System/i);
  expect(linkElement).toBeInTheDocument();
});
