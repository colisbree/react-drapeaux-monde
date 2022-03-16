import React from "react";

// en faisant "const Cards = ({ country })"" on destructure via le javascript les datas et on accède en direct à la donnée désirée
// et c'est ainsi qu'un composant parent passe les datas à un composant enfant
const Cards = ({ country }) => {
  // console.log(country);
  return (
    <li className="card">
      <img
        src={country.flags.svg}
        alt={"drapeau " + country.translations.fra.common}
      />
      <div className="infos">
        <h2>{country.translations.fra.common}</h2>
        <h4>{country.capital}</h4>
        <p>Pop. {country.population.toLocaleString()}</p>
      </div>
    </li>
  );
};

export default Cards;
