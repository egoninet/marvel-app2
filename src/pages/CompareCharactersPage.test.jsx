import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CompareCharactersPage from './CompareCharactersPage';

const mockCharacters = [
  {
    name: 'Iron Man',
    capacities: { force: 5, intelligence: 10, durability: 8, energy: 9, speed: 7, fighting: 6 },
  },
  {
    name: 'Captain America',
    capacities: { force: 7, intelligence: 7, durability: 7, energy: 4, speed: 6, fighting: 9 },
  },
];

describe('CompareCharactersPage', () => {
  test('renders comparison page with dropdowns', () => {
    render(<CompareCharactersPage characters={mockCharacters} />);

    // Vérifie que le titre est présent
    expect(screen.getByText('Compare Characters')).toBeInTheDocument();

    // Vérifie que deux listes déroulantes sont présentes
    expect(screen.getAllByRole('combobox').length).toBe(2);
  });

  test('allows selecting characters', () => {
    render(<CompareCharactersPage characters={mockCharacters} />);

    // Simule les sélections
    fireEvent.change(screen.getByTestId('select-character-1'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('select-character-2'), { target: { value: '0' } });

    // Cible uniquement la légende
    const legend = document.querySelector('.recharts-legend-wrapper');

    // Vérifie que les noms des personnages apparaissent dans la légende
    expect(legend).toHaveTextContent('Captain America');
    expect(legend).toHaveTextContent('Iron Man');
  });

  test('renders radar chart', () => {
    render(<CompareCharactersPage characters={mockCharacters} />);

    // Vérifie que le graphique est rendu
    expect(screen.getByText('Compare Characters')).toBeInTheDocument();
    expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
  });
});
