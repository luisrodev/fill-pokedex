import { pokemonNameCorrect } from "./texts";

describe("pokemonNameCorrect", () => {
  describe("base cases", () => {
    test("pikachu", () => {
      const isPokemonNameCorrect = pokemonNameCorrect("pikachu", "pikachu");
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("Pikachu", () => {
      const isPokemonNameCorrect = pokemonNameCorrect("pikachu", "Pikachu");
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("pokemon dont exists", () => {
      const isPokemonNameCorrect = pokemonNameCorrect("pikachu", "pitochu");
      expect(isPokemonNameCorrect).toEqual(false);
    });

    test("PiKaChu", () => {
      const isPokemonNameCorrect = pokemonNameCorrect("pikachu", "PiKaChu");
      expect(isPokemonNameCorrect).toEqual(true);
    });
  });

  describe("nidoran-f", () => {
    const pokemonOriginal = "nidoran-f";

    test("should correct original name: `nidoran-f`", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        pokemonOriginal
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct nidoran", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "nidoran"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });
  });

  describe("nidoran-m", () => {
    const pokemonOriginal = "nidoran-m";

    test("should correct original name: `nidoran-m`", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        pokemonOriginal
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct nidoran", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "nidoran"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });
  });

  describe("mr-mime pokemon name", () => {
    const pokemonOriginal = "mr-mime";

    test("should correct original name: `mr-mime`", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        pokemonOriginal
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should incorrect Mr._Mime", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "Mr._Mime"
      );
      expect(isPokemonNameCorrect).toEqual(false);
    });

    test("should correct Mr.Mime", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "Mr.Mime"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct MrMime", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "MrMime"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct Mr Mime", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "Mr Mime"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });
  });

  describe("deoxys", () => {
    const pokemonOriginal = "deoxys-normal";

    test("should correct original name: `deoxys-normal`", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        pokemonOriginal
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct deoxys", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "deoxys"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct deoxys normal", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        "deoxys normal"
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });
  });

  describe("ho-oh", () => {
    const pokemonOriginal = "ho-oh";

    test("should correct original name: `ho-oh`", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(
        pokemonOriginal,
        pokemonOriginal
      );
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct ho oh", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(pokemonOriginal, "ho oh");
      expect(isPokemonNameCorrect).toEqual(true);
    });

    test("should correct hooh", () => {
      const isPokemonNameCorrect = pokemonNameCorrect(pokemonOriginal, "hooh");
      expect(isPokemonNameCorrect).toEqual(true);
    });
  });
});
