import { useState } from "react";
import { LabelContainer } from "~/components/LabelContainer";
import type { Pokemon } from "~/types";
import { PokemonNameForm } from "~/components/PokemonNameForm";
import { usePokedexActions, useSelectedPokedex } from "~/stores/pokedexStore";

type PokemonDetailHeaderProps = {
  pokemon: Pokemon | null;
};

export default function PokemonDetailHeader(props: PokemonDetailHeaderProps) {
  const { catchPokemon } = usePokedexActions();
  const selectedPokedex = useSelectedPokedex();

  const pokemonName = props.pokemon?.name;

  const [pokemonTitle, setPokemonTitle] = useState(() => {
    let title: string | null = "---";

    if (props.pokemon && props.pokemon.code && pokemonName) {
      title = props.pokemon.owned ? pokemonName : null;
    }
    return title;
  });

  if (!selectedPokedex) return;

  if (pokemonTitle === null && pokemonName) {
    return (
      <PokemonNameForm
        expectedPokemonName={pokemonName}
        onCorrect={() => {
          if (!props.pokemon) return;
          catchPokemon(selectedPokedex, props.pokemon);
          setPokemonTitle(pokemonName);
        }}
      />
    );
  }

  return (
    <LabelContainer>
      <h2 className="text-xl capitalize">{pokemonTitle}</h2>
    </LabelContainer>
  );
}
