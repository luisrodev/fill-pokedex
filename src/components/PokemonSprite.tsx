import { useState } from "react";
import useSound from "use-sound";
import { cn } from "~/utils/ui";

type PokemonSpriteProps = {
  url: string;
  code: number;
};

const SPRITE_SIZE = 144;

export function PokemonSprite(props: PokemonSpriteProps) {
  const [jumped, setJumped] = useState(false);
  const [play] = useSound(
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${props.code}.ogg`
  );
  play();

  return (
    <img
      src={props.url}
      width={SPRITE_SIZE}
      height={SPRITE_SIZE}
      className={cn("desktop:size-36 size-40 border-0 drop-shadow-xl", {
        "animate-wiggle-jump": jumped,
      })}
      onLoad={() => {
        setJumped(true);
      }}
    />
  );
}

export function PokemonSpritePlaceholder() {
  return <div className="size-36"></div>;
}
