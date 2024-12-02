import { format } from "date-fns";

function CharacterDetail({ character = {} }) {
  // Si le personnage n'est pas défini, afficher un message par défaut
  if (!character || Object.keys(character).length === 0) {
    return <div style={{ textAlign: "left", margin: "20px" }}>No character</div>;
  }

  // Formater la date de modification
  const formattedDate = character.modified
    ? format(new Date(character.modified), "dd MMM yyyy")
    : "Unknown date";

  return (
    <div style={{ margin: "20px", maxWidth: "800px" }}>
      <h2 style={{ textAlign: "left" }}>{character.name}</h2>
      {/* Afficher l'image du personnage si elle existe */}
      {character.thumbnail && (
        <img
          src={`${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`}
          alt={character.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "10px",
            float: "left",
            marginRight: "15px",
          }}
        />
      )}
      {/* Description : rendre une ligne vide si absente */}
      <p style={{ textAlign: "left", clear: "both", minHeight: "20px" }}>
        {character.description ? (
          <>
            <strong>Description:</strong> {character.description}
          </>
        ) : (
          " " // Affiche un espace vide
        )}
      </p>
      {/* Date formatée uniquement en gras */}
      <p style={{ textAlign: "left", fontWeight: "bold" }}>{formattedDate}</p>
    </div>
  );
}

export default CharacterDetail;
