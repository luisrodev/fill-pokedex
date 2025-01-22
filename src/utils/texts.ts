const POKEMONS_OVERRIDE = [
  {
    original: "mr-mime",
    correctOptions: ["Mr.Mime", "MrMime", "Mr Mime"],
  },
  {
    original: "nidoran-f",
    correctOptions: ["Nidoran"],
  },
  {
    original: "nidoran-m",
    correctOptions: ["Nidoran"],
  },
  {
    original: "ho-oh",
    correctOptions: ["ho oh", "hooh"],
  },
  {
    original: "deoxys-normal",
    correctOptions: ["deoxys", "deoxys normal", "deoxysnormal"],
  },
];

export function pokemonNameCorrect(original: string, given: string) {
  const pokemonName = given.toLocaleLowerCase();

  if (pokemonName === original) return true;

  const correctOptions = POKEMONS_OVERRIDE.find((x) => x.original === original);

  if (!correctOptions) return false;

  return correctOptions?.correctOptions
    .map((x) => x.toLowerCase())
    .includes(pokemonName);
}

export function formatPokemonCode(code: number) {
  return String(code).padStart(3, "0");
}
