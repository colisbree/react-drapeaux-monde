import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

const Countries = () => {
  const [data, setData] = useState([]); // ceci est une déclaration de variable moderne en React
  const [rangeValue, setRangeValue] = useState(36); // 36 parce que c'est un multiple de 12 qui est lui meme un multiple de 1 2 3 4 6
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]; // variable classique en js

  // le useEffect se joue lorsque le composant est monté
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>

      {/* n'apparait que si selectedRadio === true . Ceci est possible grace au state qui surveille en permanence ce qu'il se passe */}
      {/* si selectedRadio est true alors tu affiches le bouton d'annulation */}
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler le filre des continents
        </button>
      )}

      <ul>
        {data
          // d'abord on filre, puis on trie, puis on coupe ce que l'on veut et enfin on affiche
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            // <li key={index}>{country.translations.fra.common}</li>
            <Cards key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
