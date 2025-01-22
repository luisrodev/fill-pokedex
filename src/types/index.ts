export type Pokemon = {
  name: string;
  code: number;
  spriteURL: string;
  owned: boolean;
};

export type Generation = number;
export type Region = string;

export type Pokedex = {
  region: Region;
  generation: Generation;
  pokemons: Pokemon[];
};

export type GeneratePokedexPokemon = {
  name: string;
  code: number;
  sprite: string;
  artwork: string;
};

export type GeneratePokedex = Omit<Pokedex, "pokemons"> & {
  pokemons: GeneratePokedexPokemon[];
};
