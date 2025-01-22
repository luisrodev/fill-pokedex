import { Button, Card } from "pixel-retroui";
import {
  usePokedex,
  usePokedexActions,
  useSelectedPokedex,
} from "~/stores/pokedexStore";

type PokedexHeaderProps = {
  onChangePokedex?: () => void;
};

export default function PokedexHeader(props: PokedexHeaderProps) {
  const selectedPokedex = useSelectedPokedex();
  const pokedex = usePokedex();
  const { selectPokedex } = usePokedexActions();

  const currentPokedex = pokedex.find(
    (currPokedex) => currPokedex.generation === selectedPokedex
  );

  const handleNext = () => {
    if (!selectedPokedex) return;

    const nextPokedex = selectedPokedex + 1;

    if (nextPokedex > pokedex.length) {
      selectPokedex(pokedex[0].generation);
      props.onChangePokedex?.();
      return;
    }
    selectPokedex(nextPokedex);
    props.onChangePokedex?.();
  };

  const handlePrev = () => {
    if (!selectedPokedex) return;

    const nextPokedex = selectedPokedex - 1;

    if (nextPokedex <= 0) {
      selectPokedex(pokedex[pokedex.length - 1].generation);
      props.onChangePokedex?.();
      return;
    }

    selectPokedex(nextPokedex);
    props.onChangePokedex?.();
  };

  return (
    <>
      <Button className="mr-1.5" onClick={handlePrev}>
        {"<<"}
      </Button>
      <Card className="text-center text-lg w-full">
        {currentPokedex?.region} Pokedex
      </Card>
      <Button className="ml-1" onClick={handleNext}>
        {">>"}
      </Button>
    </>
  );
}
