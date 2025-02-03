import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import analytics from "~/lib/analytics";
import type { Generation, Pokedex, Pokemon } from "~/types";

type PokedexStoreActions = {
  loadPokedex: (pokedex: Pokedex[]) => void;
  selectPokedex: (generation: Generation) => void;
  selectPokemon: (pokemon: Pokemon) => void;
  resetPokedex: (generation: Generation) => void;
  catchPokemon: (generation: Generation, pokemon: Pokemon) => void;
};

type PokedexStore = {
  pokedex: Pokedex[]; //List of all available pokedex
  selectedPokedex: Generation | null; // Current selected pokedex
  selectedPokemon: Pokemon | null;

  actions: PokedexStoreActions;
};

const INITIAL_STORE_STATE = {
  pokedex: [],
  selectedPokedex: null,
  selectedPokemon: null,
};

const store: StateCreator<PokedexStore> = (set, get): PokedexStore => ({
  ...INITIAL_STORE_STATE,
  actions: {
    loadPokedex: (pokedex) =>
      set({
        pokedex: pokedex,
        selectedPokedex: pokedex[0].generation,
        selectedPokemon: pokedex[0].pokemons[0],
      }),
    selectPokedex: (generation) =>
      set({
        selectedPokedex: generation,
        selectedPokemon: get().pokedex.find(
          (currentPokedex) => currentPokedex.generation === generation
        )?.pokemons[0],
      }),
    selectPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
    resetPokedex: (generation) => {
      const currentPokedex = get().pokedex.find(
        (currentPokedex) => currentPokedex.generation === generation
      );
      if (currentPokedex) {
        set((state) => ({
          pokedex: state.pokedex.map((currentPokedex) =>
            currentPokedex.generation === generation
              ? { ...currentPokedex, pokemons: [] }
              : currentPokedex
          ),
        }));
      }
    },
    catchPokemon: (generation, pokemon) => {
      set((state) => {
        const currentPokedex = state.pokedex.find(
          (currentPokedex) => currentPokedex.generation === generation
        );
        if (!currentPokedex) {
          return state;
        }

        const updatedPokemons = currentPokedex.pokemons.map((currentPokemon) =>
          currentPokemon.code === pokemon.code
            ? { ...currentPokemon, owned: true }
            : currentPokemon
        );

        const currentIndex = updatedPokemons.findIndex(
          (currentPokemon) => currentPokemon.code === pokemon.code
        );

        const nextPokemon =
          currentIndex >= 0 && currentIndex + 1 < updatedPokemons.length
            ? updatedPokemons[currentIndex + 1]
            : pokemon;

        const allPokemonCatched = updatedPokemons.every((p) => p.owned);

        if (allPokemonCatched) {
          analytics.sendEvent("catched_pokemons_from_generation", {
            generation: generation,
            last_catched_pokemon: nextPokemon.name,
          });
        }

        return {
          pokedex: state.pokedex.map((currentPokededx) =>
            currentPokededx.generation === generation
              ? { ...currentPokededx, pokemons: updatedPokemons }
              : currentPokededx
          ),
          selectedPokemon: nextPokemon,
        };
      });
    },
  },
});

const pokedexStore = create(
  persist(store, {
    name: "pokedex",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) =>
      Object.fromEntries(
        Object.keys(INITIAL_STORE_STATE).map((key) => [
          key,
          state[key as keyof typeof state],
        ])
      ),
  })
);

export const usePokedex = () => pokedexStore((state) => state.pokedex);
export const useSelectedPokedex = () =>
  pokedexStore((state) => state.selectedPokedex);
export const usePokedexActions = () => pokedexStore((state) => state.actions);
export const usePokemons = () =>
  pokedexStore((state) =>
    state.pokedex.find((x) => x.generation === state.selectedPokedex)
  )?.pokemons;
export const useSelectedPokemon = () =>
  pokedexStore((state) => state.selectedPokemon);
