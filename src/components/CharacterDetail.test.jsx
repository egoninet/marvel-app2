import { render, screen } from '@testing-library/react';
import CharacterDetail from './CharacterDetail';

test('renders character details with name, description, date, and image', () => {
  const character = {
    name: 'Spider-Man',
    description: 'A friendly neighborhood superhero.',
    modified: '2023-06-15T10:30:00Z',
    thumbnail: {
      path: 'http://example.com/spider-man',
      extension: 'jpg',
    },
  };

  render(<CharacterDetail character={character} />);

  // Vérification du nom
  expect(screen.getByText('Spider-Man')).toBeInTheDocument();

  // Vérification de la description
  expect(screen.getByText('A friendly neighborhood superhero.')).toBeInTheDocument();

  // Vérification de la date formatée
  expect(screen.getByText('15 Jun 2023')).toBeInTheDocument();

  // Vérification de l'image
  const image = screen.getByAltText('Spider-Man');
  expect(image).toHaveAttribute('src', 'http://example.com/spider-man/standard_large.jpg');
});

test('renders "No character" when character is missing', () => {
  render(<CharacterDetail character={null} />);

  // Vérification du message par défaut
  expect(screen.getByText('No character')).toBeInTheDocument();
});
