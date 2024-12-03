import { Link } from "react-router-dom";
import { format } from "date-fns";

export function CharactersList({ characters = [] }) {
  return (
    <ul id="characters" style={{ listStyleType: "none", padding: 0 }}>
      {characters.map((character) => {
        // Formater la date de modification
        const formattedDate = format(new Date(character.modified), "dd MMM yyyy");

        return (
          <li key={character.id} style={{ marginBottom: "10px" }}>
            {/* Lien vers le détail avec nom et date sur la même ligne */}
            <Link to={`/characters/${character.id}`} style={{ textDecoration: "none", color: "black" }}>
              <strong>{character.name}</strong> - <small style={{ color: "gray" }}>{formattedDate}</small>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
