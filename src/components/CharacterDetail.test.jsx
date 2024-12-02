import { render, screen } from '@testing-library/react';
import CharacterDetail from './CharacterDetail';

test('renders character with description and date', () => {
  const character = {
    name: 'Beast',
    description: 'A strong mutant.',
    modified: '2023-06-15T10:30:00Z',
    thumbnail: {
      path: 'http://example.com/beast',
      extension: 'jpg',
    },
  };
  render(<CharacterDetail character={character} />);
  expect(screen.getByText('Beast')).toBeInTheDocument();
  expect(screen.getByText('A strong mutant.')).toBeInTheDocument();
  expect(screen.getByText('15 Jun 2023')).toBeInTheDocument();
  expect(screen.getByAltText('Beast')).toHaveAttribute('src', 'http://example.com/beast/standard_large.jpg');
});

test('renders character without description', () => {
  const character = { name: 'Beast', modified: '2023-06-15T10:30:00Z' };
  render(<CharacterDetail character={character} />);
  expect(screen.getByText('Beast')).toBeInTheDocument();
  expect(screen.getByText('15 Jun 2023')).toBeInTheDocument();
  expect(screen.queryByText(/description:/i)).not.toBeInTheDocument();
});

test('renders no character message', () => {
  render(<CharacterDetail character={null} />);
  expect(screen.getByText('No character')).toBeInTheDocument();
});
