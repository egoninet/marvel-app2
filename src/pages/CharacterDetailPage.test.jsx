import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useLoaderData } from 'react-router';
import CharacterDetailPage from './CharacterDetailPage';

// Mock the useLoaderData hook
jest.mock('react-router', () => ({
    useLoaderData: jest.fn(),
}));

// Mock d3 pour éviter les erreurs de parsing
jest.mock('d3', () => ({
    select: jest.fn(() => ({
        append: jest.fn(() => ({
            attr: jest.fn(),
            style: jest.fn(),
            text: jest.fn(),
        })),
    })),
}));

describe('CharacterDetailPage', () => {
    const baseCharacter = {
        name: 'Thor',
        description: 'God of Thunder',
        modified: '2023-10-01',
        thumbnail: { path: 'path/to/image', extension: 'jpg' },
        capacities: {
            force: 5,
            intelligence: 8,
            durability: 6,
            energy: 6,
            speed: 1,
            fighting: 3,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all character details correctly', () => {
        useLoaderData.mockReturnValue(baseCharacter);
        render(<CharacterDetailPage />);

        // Vérification du titre de la page
        expect(document.title).toBe(`${baseCharacter.name} | Marvel App`);

        // Vérification du nom, description et date
        expect(screen.getByText(baseCharacter.name)).toBeInTheDocument();
        expect(screen.getByText(baseCharacter.description)).toBeInTheDocument();
        expect(screen.getByText(baseCharacter.modified)).toBeInTheDocument();

        // Vérification de l'image
        const imageElement = screen.getByAltText(baseCharacter.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute(
            'src',
            `${baseCharacter.thumbnail.path}/standard_large.${baseCharacter.thumbnail.extension}`
        );

        // Vérification des capacités
        expect(screen.getByRole('heading', { level: 2, name: 'Capacities' })).toBeInTheDocument();

        // Vérification des sections graphiques
        expect(screen.getByRole('heading', { level: 3, name: 'Using D3' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 3, name: 'Using Recharts' })).toBeInTheDocument();
        expect(document.getElementById('pie-container')).toBeInTheDocument();
        expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });

    test('renders fallback UI when description is missing', () => {
        const characterWithoutDescription = { ...baseCharacter, description: '' };
        useLoaderData.mockReturnValue(characterWithoutDescription);

        render(<CharacterDetailPage />);
        expect(screen.getByText('No description available.')).toBeInTheDocument();
    });

    test('renders fallback UI when thumbnail is missing', () => {
        const characterWithoutThumbnail = { ...baseCharacter, thumbnail: null };
        useLoaderData.mockReturnValue(characterWithoutThumbnail);

        render(<CharacterDetailPage />);
        expect(screen.queryByAltText(baseCharacter.name)).not.toBeInTheDocument();
    });

    test('renders fallback UI when capacities are missing', () => {
        const characterWithoutCapacities = { ...baseCharacter, capacities: null };
        useLoaderData.mockReturnValue(characterWithoutCapacities);

        render(<CharacterDetailPage />);
        expect(screen.getByText('No capacities available.')).toBeInTheDocument();
    });

    test('handles missing character gracefully', () => {
        useLoaderData.mockReturnValue(null);

        render(<CharacterDetailPage />);
        expect(screen.getByText('Character not found')).toBeInTheDocument();
    });

    test('handles minimal character data gracefully', () => {
        const minimalCharacter = { name: 'Loki', modified: '2023-10-01' };
        useLoaderData.mockReturnValue(minimalCharacter);

        render(<CharacterDetailPage />);

        // Vérification des données minimales
        expect(screen.getByText('Loki')).toBeInTheDocument();
        expect(screen.getByText('2023-10-01')).toBeInTheDocument();
        expect(screen.queryByText('No description available.')).toBeInTheDocument();
        expect(screen.queryByText('No capacities available.')).toBeInTheDocument();
    });
});
