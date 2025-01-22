import pokedexJSON from "~/data/pokedex.json";
import type { Pokemon, Pokedex, GeneratePokedexPokemon } from "~/types";

class PokedexGenerator {
  loadFullPokedex() {
    return new Promise<Pokedex[]>((resolve) => {
      const mapped = pokedexJSON.map((currentPokedex) => {
        return {
          ...currentPokedex,
          pokemons: currentPokedex.pokemons.map(this.mapPokedex),
        };
      });

      resolve(mapped as Pokedex[]);
    });
  }

  private mapPokedex(pokemon: GeneratePokedexPokemon): Pokemon {
    return {
      name: pokemon.name,
      code: pokemon.code,
      spriteURL: pokemon.sprite,
      owned: false,
    };
  }
}

export default new PokedexGenerator();
