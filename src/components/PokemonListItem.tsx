import { Pokemon } from "~/types";
import { formatPokemonCode } from "~/utils/texts";
import { cn } from "~/utils/ui";

const UNFOUND_POKEMON_PLACEHOLDER = "---";

type PokemonListItemProps = {
  pokemon: Pokemon;
  onClick?: () => void;
  isOwned: boolean;
  isSelected: boolean;
};

export default function PokemonListItem(props: PokemonListItemProps) {
  const { pokemon, isOwned, isSelected } = props;

  const pokemonCode = formatPokemonCode(pokemon.code);

  return (
    <li
      key={pokemon.code}
      onClick={() => props.onClick?.()}
      className={cn(
        "pr-1 flex gap-1 items-center text-gray-400 hover:bg-gray-200",
        {
          "text-gray-900": isOwned,
          "py-1 text-black -px-1": isSelected,
        }
      )}
    >
      {isSelected ? <AnimatedArrow /> : null}

      <div className="flex gap-2">
        <p>{pokemonCode}</p>
        <p className="capitalize">
          {isOwned ? pokemon.name : UNFOUND_POKEMON_PLACEHOLDER}
        </p>
      </div>
    </li>
  );
}

function AnimatedArrow() {
  return (
    <p className="animate-bounce-right font-black selected-pokemon">{">"}</p>
  );
}
