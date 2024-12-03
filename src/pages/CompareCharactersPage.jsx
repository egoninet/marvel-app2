import React, { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import charactersData from "../data/characters.json"; // Importer le fichier JSON

const CompareCharactersPage = () => {
  const [characters] = useState(charactersData); // Charger les données depuis le fichier JSON

  // Vérifiez s'il y a au moins deux personnages
  if (characters.length < 2) {
    return <div>Not enough characters available for comparison.</div>;
  }

  // Options pour la liste déroulante
  const options = characters.map((character, index) => ({
    value: index,
    label: character.name,
  }));

  const [option1, setOption1] = useState(options[0]);
  const [option2, setOption2] = useState(options[1]);

  const selectedCharacters = [characters[option1.value], characters[option2.value]];

  // Fonction utilitaire pour obtenir une capacité ou 0 si absente
  const getCapacity = (character, capacity) => character.capacities?.[capacity] || 0;

  // Données pour le graphique radar
  const data = [
    {
      attribute: "Force",
      [selectedCharacters[0].name]: getCapacity(selectedCharacters[0], "force"),
      [selectedCharacters[1].name]: getCapacity(selectedCharacters[1], "force"),
    },
    {
      attribute: "Intelligence",
      [selectedCharacters[0].name]: getCapacity(selectedCharacters[0], "intelligence"),
      [selectedCharacters[1].name]: getCapacity(selectedCharacters[1], "intelligence"),
    },
    {
      attribute: "Durability",
      [selectedCharacters[0].name]: getCapacity(selectedCharacters[0], "durability"),
      [selectedCharacters[1].name]: getCapacity(selectedCharacters[1], "durability"),
    },
    {
      attribute: "Energy",
      [selectedCharacters[0].name]: getCapacity(selectedCharacters[0], "energy"),
      [selectedCharacters[1].name]: getCapacity(selectedCharacters[1], "energy"),
    },
    {
      attribute: "Speed",
      [selectedCharacters[0].name]: getCapacity(selectedCharacters[0], "speed"),
      [selectedCharacters[1].name]: getCapacity(selectedCharacters[1], "speed"),
    },
    {
      attribute: "Fighting Skills",
      [selectedCharacters[0].name]: getCapacity(selectedCharacters[0], "fighting"),
      [selectedCharacters[1].name]: getCapacity(selectedCharacters[1], "fighting"),
    },
  ];

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Compare Characters</h2>

      <div style={{ margin: "20px" }}>
        <select
          data-testid="select-character-1"
          value={option1.value}
          onChange={(e) => setOption1(options[e.target.value])}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        &nbsp;with&nbsp;

        <select
          data-testid="select-character-2"
          value={option2.value}
          onChange={(e) => setOption2(options[e.target.value])}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Graphique et légende */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <RadarChart outerRadius={150} width={500} height={480} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="attribute" />
          <PolarRadiusAxis />
          <Radar
            name={selectedCharacters[0].name}
            dataKey={selectedCharacters[0].name}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name={selectedCharacters[1].name}
            dataKey={selectedCharacters[1].name}
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          {/* Légende avec style personnalisé */}
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ marginTop: 40 }} // Augmenté pour baisser la légende
          />
        </RadarChart>
      </div>
    </div>
  );
};

export default CompareCharactersPage;
