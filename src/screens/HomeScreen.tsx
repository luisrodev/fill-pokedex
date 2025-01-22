import { Button, Card } from "pixel-retroui";
import Container from "~/components/Container";
import PokemonList from "~/components/PokemonList";
import PokemonDetail from "~/components/PokemonDetail";
import PokedexHeader from "~/components/PokedexHeader";
import type { Pokemon } from "~/types";
import { Footer } from "~/components/Footer";
import {
  usePokedexActions,
  usePokemons,
  useSelectedPokemon,
} from "~/stores/pokedexStore";

export default function HomeScreen() {
  const pokemons = usePokemons();
  const selectedPokemon = useSelectedPokemon();
  const { selectPokemon: setSelectedPokemon } = usePokedexActions();

  function handlePokemonListClick(pokemon: Pokemon) {
    setSelectedPokemon(pokemon);
  }

  function handleNext() {
    if (!pokemons) return;

    if (!selectedPokemon) {
      setSelectedPokemon(pokemons[0]);
      return;
    }

    const currentPokemonCode = selectedPokemon.code + 1;
    const nextPokemon = pokemons.find((p) => p.code === currentPokemonCode);
    if (!nextPokemon) {
      return;
    }

    const el = document.querySelector(".selected-pokemon");
    el?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setSelectedPokemon(nextPokemon);
  }

  function handlePrevious() {
    if (!pokemons) return;

    if (!selectedPokemon) {
      setSelectedPokemon(pokemons[0]);
      return;
    }

    const currentPokemonCode = selectedPokemon.code - 1;
    const nextPokemon = pokemons.find((p) => p.code === currentPokemonCode);
    if (!nextPokemon) return;

    const el = document.querySelector(".selected-pokemon");
    el?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setSelectedPokemon(nextPokemon);
  }

  function handlePokedexChange() {
    const pokemonListFirstElement = document.querySelector("ul li:first-child");

    pokemonListFirstElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Container>
      <div className="w-[768px] bg-slate-300 p-1 rounded-md foreground">
        <div className="flex gap-1 justify-evenly">
          <PokedexHeader onChangePokedex={handlePokedexChange} />
        </div>
        <div className="flex flex-col desktop:flex-row gap-0.5  ">
          <div className="flex flex-col justify-between desktop:basis-1/2">
            <PokemonDetail pokemon={selectedPokemon} />
          </div>
          <Card className="desktop:basis-1/2 overflow-auto pokemon-list-container desktop:max-h-[300px]">
            <PokemonList
              selectedPokemon={selectedPokemon}
              pokemons={pokemons || []}
              onPokemonClick={handlePokemonListClick}
            />
          </Card>
        </div>
        <div className="flex items-center justify-between">
          <Footer />
          <div className="flex justify-end">
            <Button onClick={handlePrevious}>{"<< "}</Button>
            <Button onClick={handleNext}>{" >>"}</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
