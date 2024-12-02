import { Link } from "react-router-dom";
import { format } from "date-fns";

export function CharactersList({ characters = [] }) {
  return (
    <ul id="characters">
      {characters.map((character) => {
        // Formater la date de modification
        const formattedDate = format(new Date(character.modified), "dd MMM yyyy");

        return (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <strong>{character.name}</strong>
            </Link>
            <br />
            <small style={{ color: "gray" }}>{formattedDate}</small>
          </li>
        );
      })}
    </ul>
  );
}
