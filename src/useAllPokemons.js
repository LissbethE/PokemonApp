import { useEffect, useState } from "react";

const urlPokemons = "https://pokeapi.co/api/v2/pokemon?limit=649&offset=0";
//const urlPokeApi5 = "https://pokeapi.co/api/v2/pokemon?limit=5";

export function useAllPokemons() {
  const [allPokemons, setAllPokemons] = useState([]);

  //////////////////////////////////////
  useEffect(() => {
    const controller = new AbortController();

    const fetchPokemons = async function () {
      try {
        const res = await fetch(urlPokemons, { signal: controller.signal });

        if (!res.ok)
          throw new Error("💥Something went wrong with fetching pokémon");

        const data = await res.json();

        const pokemons = await Promise.all(
          data.results.map(async (poke) => {
            const url = `https://pokeapi.co/api/v2/pokemon/${poke.name}/`;
            const res = await fetch(url, { signal: controller.signal });
            if (!res.ok) throw new Error("Pokémon not found! 😢");

            const data = await res.json();
            return data;
          })
        );

        setAllPokemons(pokemons);
      } catch (err) {
        if (err.name !== "AbortError" || err.message !== "DOMException") {
          console.error("💥ERROR: ", err.message);
        }
      }
    };

    fetchPokemons();

    // Cleaning up data fetching
    return () => controller.abort();
  }, []);

  return { allPokemons };
}
