import { useState } from "react";
import { Button, Input } from "pixel-retroui";
import { cn } from "~/utils/ui";
import { pokemonNameCorrect } from "~/utils/texts";
import { useMediaQuery } from "@uidotdev/usehooks";

type FormState = {
  value: string;
  error: string | null;
};

const defaultFormState = {
  value: "",
  error: null,
};

type PokemonNameFormProps = {
  expectedPokemonName: string;
  onCorrect: () => void;
};

export const PokemonNameForm = ({
  expectedPokemonName,
  onCorrect,
}: PokemonNameFormProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [formState, setFormState] = useState<FormState>(defaultFormState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isPokemonCorrect = pokemonNameCorrect(
      expectedPokemonName,
      formState.value
    );

    // TODO: Replace this with logger debug
    // console.log({
    //   isPokemonCorrect,
    //   expected: expectedPokemonName,
    //   given: formState.value,
    // });

    if (!isPokemonCorrect) {
      setFormState((prev) => ({
        ...prev,
        error: "incorrect pokemon name",
      }));
      return;
    }

    onCorrect();
    setFormState(defaultFormState);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <Input
        placeholder="Enter pokemon name"
        className="ml-2 w-full mt-2 mb-1.5"
        borderColor={cn("", {
          red: formState.error,
        })}
        textColor={cn({
          red: formState.error,
        })}
        name="name"
        value={formState.value}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            value: e.target.value,
            error: null,
          }))
        }
        autoFocus={isDesktop}
        autoComplete="off"
      />
      <Button className="mr-1.5">{"Catch"}</Button>
    </form>
  );
};
