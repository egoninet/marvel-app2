import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CharactersPage from './CharactersPage';  // Importation correcte du composant par défaut
import { BrowserRouter } from 'react-router-dom';

// Mock des données de personnages
const characters = [
    {
        id: "1",
        name: "Thor"
    },
    {
        id: "2",
        name: "Captain America"
    }
];

// Mock du hook `useLoaderData` de react-router
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'), // Utilisation de l'implémentation réelle pour le reste
    useLoaderData: () => {
        return characters;
    },
}));

describe('CharactersPage', () => {
    test('render CharactersPage component', () => {
        // Quand le composant est rendu
        render(<CharactersPage />, { wrapper: BrowserRouter });

        // Vérification du titre du document
        expect(document.title).toBe('Marvel App');

        // Vérification du titre de la page
        const h2Element = screen.getByRole('heading', { level: 2, name: "Marvel Characters" });
        expect(h2Element).toBeInTheDocument();

        // Vérification de la présence du personnage Thor
        const thorElement = screen.getByText(characters[0].name);
        expect(thorElement).toBeInTheDocument();

        // Vérification de la présence du personnage Captain America
        const captainAmericaElement = screen.getByText(characters[1].name);
        expect(captainAmericaElement).toBeInTheDocument();

        // Vérification du texte indiquant le nombre de personnages
        const numberOfCharactersElement = screen.getByText(`There is ${characters.length} characters`);
        expect(numberOfCharactersElement).toBeInTheDocument();
    });
});
