import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./homepage.css";

const HomePage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonInfo(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setPokemonInfo(null);
      });
  };

  return (
    <>
      <div className="homePage">
        <Navbar />
        <div className="middlePart">
          <br />
          <center>
            <h2 className="text-3xl text-white font-bold">
              PokeDex: your pokeinfo club!
            </h2>
            <br />
            <div className="inputRow flex flex-row justify-center items-center">
              <input
                type="text"
                value={pokemonName}
                onChange={handleChange}
                className="w-[300px] border-2 border-2-white rounded-lg outline-none p-2 text-white"
                placeholder="Enter pokemon name"
              />
              <button
                onClick={handleSubmit}
                className="ml-4 bg-blue-400 p-2 rounded-lg"
              >
                Submit!
              </button>
            </div>
            <br />
            <br />
            {error && <p className="text-red-500">{error}</p>}
            {pokemonInfo && (
              <div className="pokeInfoCard">
                <div className="pokeInfoCardContent">
                  <table className="text-white border-2 border-2-separate">
                    <tbody>
                      <tr className="border-2">
                        <td className="border-2 p-2">Name:</td>
                        <td className="border-2 p-2">{pokemonInfo.name}</td>
                      </tr>
                      <tr className="border-2">
                        <td className="border-2 p-2">Type:</td>
                        <td className="border-2 p-2">
                          {pokemonInfo.types
                            .map((type) => type.type.name)
                            .join(", ")}
                        </td>
                      </tr>
                      <tr className="border-2">
                        <td className="border-2 p-2">Weight:</td>
                        <td className="border-2 p-2">
                          {pokemonInfo.weight} lbs
                        </td>
                      </tr>
                      <tr className="border-2">
                        <td className="border-2 p-2">Height:</td>
                        <td className="border-2 p-2">{pokemonInfo.height}</td>
                      </tr>

                      <tr className="border-2">
                        <td className="border-2 p-2">Abilities:</td>
                        <td className="border-2 p-2">
                          <ul>
                            {pokemonInfo.abilities.map((ability, index) => (
                              <li key={index}>{ability.ability.name}, </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </center>
        </div>
      </div>
    </>
  );
};

export default HomePage;
