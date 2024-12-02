import { format } from "date-fns";

function CharacterDetail({ character = {} }) {
  if (!character || Object.keys(character).length === 0) {
    return <div style={{ textAlign: "left", margin: "20px" }}>No character</div>;
  }

  const formattedDate = character.modified
    ? format(new Date(character.modified), "dd MMM yyyy")
    : "Unknown date";

  return (
    <div style={{ margin: "20px", maxWidth: "800px" }}>
      <h2 style={{ textAlign: "left" }}>{character.name}</h2>
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
      <p style={{ textAlign: "left", minHeight: "20px", clear: "both" }}>
        {character.description ? (
          <>
            <strong>Description:</strong> {character.description}
          </>
        ) : (
          " " // Ligne vide pour éviter que tout remonte
        )}
      </p>
      <p style={{ textAlign: "left", fontWeight: "bold" }}>{formattedDate}</p>
    </div>
  );
}

export default CharacterDetail;
