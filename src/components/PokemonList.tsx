import type { Pokemon } from "~/types";
import PokemonListItem from "./PokemonListItem";

type PokemonListProps = {
  pokemons: Pokemon[];
  onPokemonClick?: (pokemon: Pokemon) => void;
  selectedPokemon: Pokemon | null;
};

export default function PokemonList(props: PokemonListProps) {
  return (
    <ul className="pokemon-list">
      {props.pokemons.map((pokemon) => {
        const isPokemonOwned = pokemon.owned;
        const isPokemonSelected = props.selectedPokemon?.code === pokemon.code;

        return (
          <PokemonListItem
            key={pokemon.code}
            onClick={() => props.onPokemonClick?.(pokemon)}
            pokemon={pokemon}
            isOwned={isPokemonOwned}
            isSelected={isPokemonSelected}
          />
        );
      })}
    </ul>
  );
}
