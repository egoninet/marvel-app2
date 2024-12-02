import { format } from "date-fns";

function CharacterDetail({ character = {} }) {
  // Si le personnage n'est pas défini, afficher un message par défaut
  if (!character || Object.keys(character).length === 0) {
    return <div>No character</div>;
  }

  // Formater la date de modification
  const formattedDate = character.modified
    ? format(new Date(character.modified), "dd MMM yyyy")
    : "Unknown date";

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{character.name}</h2>
      {/* Afficher l'image du personnage si elle existe */}
      {character.thumbnail && (
        <img
          src={`${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`}
          alt={character.name}
          style={{ width: "150px", height: "150px", borderRadius: "10px" }}
        />
      )}
      {/* Description avec un texte par défaut si elle est vide */}
      <p>
        <strong>Description:</strong>{" "}
        {character.description || "No description available."}
      </p>
      {/* Date de modification formatée */}
      <p>
        <strong>Last modified:</strong> {formattedDate}
      </p>
    </div>
  );
}

export default CharacterDetail;
