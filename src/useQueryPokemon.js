import { useEffect, useState } from "react";

export function useQueryPokemon(query) {
  const [onePokemon, setOnePokemon] = useState(query);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //////////////////////////////////////
  // Buscando pokémon por medio de query
  useEffect(() => {
    const controller = new AbortController();

    const getPokemon = async function () {
      try {
        setIsLoading(true);
        setError("");

        const txt = query.toLowerCase();
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${txt}/`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Pokémon not found! 😢");

        const data = await res.json();

        setOnePokemon([data]);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("💥ERROR: ", err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setOnePokemon(null);
      setError("");

      return;
    }

    getPokemon();

    // Cleaning up data fetching
    return () => controller.abort();
  }, [query]);

  return { onePokemon, isLoading, error };
}
