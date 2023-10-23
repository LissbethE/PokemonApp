import { useEffect, useState } from "react";
import NavBar from "./components/Nav/NavBar.jsx";
import Pokemon from "./components/Poke/Pokemon.jsx";
import PokemonList from "./components/Poke/PokemonList.jsx";
import Container from "./components/Reusability/Container.jsx";
import Logo from "./components/Reusability/Logo.jsx";
import PokemonDetails from "./components/Poke/PokemonDetails.jsx";
import PokemonFavorites from "./components/Poke/PokemonFavorites.jsx";
import Btn from "./components/Reusability/Btn.jsx";

//////////////////////////////////////
const urlPokemons = "https://pokeapi.co/api/v2/pokemon?limit=649&offset=0";
const urlPoke2 = "https://pokeapi.co/api/v2/pokemon?limit=5";

//////////////////////////////////////
function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [onePokemon, setOnePokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [addFavorite, setAddFavorite] = useState([]);

  //////////////////////////////////////
  // Seleccionando pokemon - component list
  const handleSelection = function (poke) {
    setSelectedPokemon((Pokemon) => (Pokemon?.id === poke.id ? null : poke));
  };

  // Agregando y eliminando pokemon
  const handleAddFavorite = (poke) =>
    setAddFavorite((pokemons) => [...pokemons, poke]);

  const handleDeleteFavorite = (id) =>
    setAddFavorite((pokemons) => pokemons.filter((poke) => poke.id !== id));

  /////////////////
  // Mostrando y cerrando cada componente
  const handleShowDetails = () => {
    setShowDetails(true);
    setShowFavorites(false);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setShowDetails(false);
  };

  const handleCloseView = () => {
    setShowDetails(false);
    setShowFavorites(false);
  };

  //////////////////////////////////////
  useEffect(() => {
    const controller = new AbortController();

    const fetchPokemons = async function () {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(urlPoke2);
        if (!res.ok)
          throw new Error("💥Something went wrong with fetching pokémon");

        const data = await res.json();

        const pokemons = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${poke.name}/`,
              { signal: controller.signal }
            );
            if (!res.ok) throw new Error("Pokémon not found! 😢");

            const data = await res.json();
            return data;
          })
        );

        setAllPokemons(pokemons);
        setError("");
      } catch (err) {
        console.log("💥ERROR: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();

    // Cleaning up data fetching
    return () => controller.abort();
  }, []);

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
          console.log("💥ERROR: ", err.message);
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

  const isThereOnePokemon = onePokemon ? onePokemon : allPokemons;

  console.log(addFavorite);

  //////////////////////////////////////
  return (
    <div className="app">
      <NavBar>
        <Logo onCloseView={handleCloseView} />
        <Btn classBtn="btn" onClick={handleShowFavorites}>
          My Favorites 💖{addFavorite.length > 0 ? addFavorite.length : ""}
        </Btn>
      </NavBar>

      {/* H O M E  P A G E */}
      {!showDetails && !showFavorites && (
        <Container>
          <PokemonList
            data={isThereOnePokemon}
            selectedPokemon={selectedPokemon}
            onSelection={handleSelection}
            setQuery={setQuery}
            query={query}
            error={error}
            isLoading={isLoading}
          />

          {selectedPokemon && (
            <Pokemon
              data={selectedPokemon}
              onShowDetails={handleShowDetails}
              onAddFavorite={handleAddFavorite}
              addFavorite={addFavorite}
              onDeleteFavorite={handleDeleteFavorite}
              btnTxt="🔮 More Details"
            />
          )}
        </Container>
      )}

      {/* P O K É M O N  D E T A I L S  P A G E  */}
      {!showFavorites && showDetails && (
        <Container>
          <Pokemon
            data={selectedPokemon}
            btnTxt="💖 Add to my favorites"
            addFavorite={addFavorite}
            onAddFavorite={handleAddFavorite}
            onDeleteFavorite={handleDeleteFavorite}
          />

          <PokemonDetails data={selectedPokemon} />
        </Container>
      )}

      {/* P O K É M O N  F A V O R I T E S  P A G E  */}
      {!showDetails && showFavorites && <PokemonFavorites data={addFavorite} />}
    </div>
  );
}

export default App;
