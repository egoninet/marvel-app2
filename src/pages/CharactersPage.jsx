import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useLoaderData } from 'react-router';
import CharacterDetailPage from './CharacterDetailPage';

// Mock the useLoaderData hook
jest.mock('react-router', () => ({
    useLoaderData: jest.fn(),
}));

describe('CharacterDetailPage', () => {
    const character = {
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
            fighting: 3
        }
    };

    beforeEach(() => {
        useLoaderData.mockReturnValue(character);
    });

    test('renders CharacterDetailPage component', () => {
        render(<CharacterDetailPage />);
        
        // Verifies that the page title is correct
        expect(document.title).toBe('Thor | Marvel App');

        // Verifies that the character's name is displayed
        const nameElement = screen.getByText(character.name);
        expect(nameElement).toBeInTheDocument();

        // Verifies that the character's description is displayed
        const descriptionElement = screen.getByText(character.description);
        expect(descriptionElement).toBeInTheDocument();

        // Verifies that the modified date is displayed
        const modifiedElement = screen.getByText(character.modified);
        expect(modifiedElement).toBeInTheDocument();

        // Verifies that the character's image is displayed with the correct path
        const imageElement = screen.getByAltText(character.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'path/to/image/standard_large.jpg');
    });
});
