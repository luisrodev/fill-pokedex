import { useEffect, useState } from "react";
import HomeScreen from "~/screens/HomeScreen";
import { usePokedex, usePokedexActions } from "./stores/pokedexStore";
import pokedexGenerator from "~/lib/pokedexGenerator";

export default function App() {
  const [isInit, setInit] = useState(false);
  const pokedex = usePokedex();
  const { loadPokedex } = usePokedexActions();

  useEffect(() => {
    if (pokedex.length === 0) {
      pokedexGenerator.loadFullPokedex().then((data) => {
        loadPokedex(data);
        setInit(true);
      });
    } else {
      setInit(true);
    }
  }, [pokedex, loadPokedex]);

  if (!isInit) {
    <div className="flex items-center justify-center h-screen text-white text-2xl">
      Loading
    </div>;
  }

  return <HomeScreen />;
}
