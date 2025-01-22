import fs from "node:fs";
import { cwd } from "node:process";
import type { GeneratePokedexPokemon, GeneratePokedex } from "../src/types";

const POKEDEX_FILE_NAME = "pokedex.json";
const DIRECTORY_PATH = "/src/data";

(async function () {
  const directoryPath = cwd() + DIRECTORY_PATH;

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  const wantedPokedexs = [
    {
      generation: 1,
      region: "Kanto",
    },
    {
      generation: 2,
      region: "Johto",
    },
    {
      generation: 3,
      region: "Hoenn",
    },
  ];

  const pokedexs: GeneratePokedex[] = [];

  for (const { generation, region } of wantedPokedexs) {
    console.log(
      `Generating pokemons from ${region} (Generation ${generation})`
    );

    const pokemons = await getPokemonsFromGeneration(generation);

    const sortedPokemons = pokemons.sort((a, b) => a.code - b.code);

    const pokedex: GeneratePokedex = {
      region,
      generation,
      pokemons: sortedPokemons,
    };

    pokedexs.push(pokedex);

    console.log(
      `Finish generate pokemons [${pokedex.pokemons.length}] from ${region} (Generation ${generation})`
    );
  }

  fs.writeFileSync(
    directoryPath + "/" + POKEDEX_FILE_NAME,
    JSON.stringify(pokedexs, null, 2)
  );
})();

async function getPokemonsFromGeneration(generation: number) {
  const genResponse = await fetch(
    `https://pokeapi.co/api/v2/generation/${generation}/`
  );
  const genData = await genResponse.json();

  const pokemonSpeciesList = genData.pokemon_species;

  const pokemonDataWithImages: GeneratePokedexPokemon[] = await Promise.all(
    pokemonSpeciesList.map(async (species) => {
      let pokemonName = species.name;

      if (pokemonName.toLowerCase() === "deoxys") {
        pokemonName = "deoxys-normal";
      }

      // Fetch detailed Pokémon data to get images
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
      );

      const pokemonData = await pokemonResponse.json().catch((err) => {
        console.log(pokemonResponse);
        console.log(`error getting data from pokemon:${pokemonName}`);
        console.log(err);
      });

      const spriteUrl = pokemonData.sprites.front_default;

      const artworkUrl =
        pokemonData.sprites.other["official-artwork"].front_default;

      return {
        name: pokemonName,
        code: pokemonData.id,
        sprite: spriteUrl,
        artwork: artworkUrl,
      };
    })
  );

  return pokemonDataWithImages;
}
