import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CharactersList } from './CharactersList';

test('renders characters with names and formatted dates', () => {
  const characters = [
    {
      id: '1',
      name: 'Iron Man',
      modified: '2024-12-01T12:00:00Z',
    },
    {
      id: '2',
      name: 'Captain America',
      modified: '2020-04-04T19:01:59Z',
    },
  ];

  render(
    <MemoryRouter>
      <CharactersList characters={characters} />
    </MemoryRouter>
  );

  // Vérification des noms
  expect(screen.getByText('Iron Man')).toBeInTheDocument();
  expect(screen.getByText('Captain America')).toBeInTheDocument();

  // Vérification des dates formatées
  expect(screen.getByText('01 Dec 2024')).toBeInTheDocument();
  expect(screen.getByText('04 Apr 2020')).toBeInTheDocument();

  // Vérification des liens
  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveAttribute('href', '/characters/1');
  expect(links[1]).toHaveAttribute('href', '/characters/2');
});
