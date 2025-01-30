import { usePokemons } from "~/stores/pokedexStore";
import type { Pokemon } from "~/types";
import { formatPokemonCode } from "~/utils/texts";
import { LabelContainer } from "~/components/LabelContainer";
import PokemonDetailHeader from "~/components/PokemonDetailHeader";
import {
  PokemonSprite,
  PokemonSpritePlaceholder,
} from "~/components/PokemonSprite";

type PokemonDetailProps = {
  pokemon: Pokemon | null;
};

export default function PokemonDetail(props: PokemonDetailProps) {
  const pokemons = usePokemons();

  const catchedPokemons =
    pokemons?.filter((currentPokemon) => currentPokemon.owned).length || 0;

  const pokemonElement = props.pokemon ? (
    <PokemonSprite
      key={props.pokemon.code}
      code={props.pokemon.code}
      url={props.pokemon.spriteURL}
    />
  ) : (
    <PokemonSpritePlaceholder />
  );

  return (
    <>
      <PokemonDetailHeader key={props.pokemon?.code} pokemon={props.pokemon} />
      <section className="flex items-center justify-center p-2 py-10 desktop:py-0">
        {pokemonElement}
      </section>
      <section className="flex flex-col">
        <LabelContainer>
          Catched: {formatPokemonCode(catchedPokemons)}/{pokemons?.length}
        </LabelContainer>
      </section>
    </>
  );
}
